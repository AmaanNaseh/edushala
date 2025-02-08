from flask import Flask, render_template, request, jsonify, Response
import os
import cv2
import imutils
import numpy as np
import csv
from imutils import paths
from sklearn.preprocessing import LabelEncoder
from sklearn.svm import SVC
import pickle
from collections.abc import Iterable
from datetime import datetime

app = Flask(__name__)

# Ensure folders exist
os.makedirs('dataset', exist_ok=True)
os.makedirs('output', exist_ok=True)


def flatten(itemlist):
    for item in itemlist:
        if isinstance(item, Iterable) and not isinstance(item, str):
            for x in flatten(item):
                yield x
        else:
            yield item


embedding_file = "output/embeddings.pickle"
embedding_model = "model/openface_nn4.small2.v1.t7"
recognizer_file = "output/recognizer.pickle"
labelEncoder_file = "output/le.pickle"
conf = 0.5
prototxt = "model/deploy.prototxt"
model = "model/res10_300x300_ssd_iter_140000.caffemodel"

dnndetector = cv2.dnn.readNetFromCaffe(prototxt, model)
dnnembedder = cv2.dnn.readNetFromTorch(embedding_model)

recognizer = pickle.loads(open(recognizer_file, "rb").read())
le = pickle.loads(open(labelEncoder_file, "rb").read())

opRoll_Number = ""
box = []

# Ensure folders exist
os.makedirs('dataset', exist_ok=True)
os.makedirs('output', exist_ok=True)

@app.route('/')
def index():
    return render_template('index.html')  # Frontend for capturing images and starting processes


@app.route('/register', methods=['POST'])
def register():
    data = request.json
    name = data['name']
    roll_number = data['roll_number']
    student_class = data['class']  # New field for class

    with open('registration.csv', 'a', newline='') as f:
        writer = csv.writer(f)
        writer.writerow([name, roll_number, student_class])  # Save class as well

    return jsonify({"message": "Registration successful!"}), 200


@app.route('/capture_feed', methods=['GET'])
def capture_feed():
    # Stream video feed to the webpage
    def generate_frames():
        cap = cv2.VideoCapture(0)
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            _, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        cap.release()

    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/capture_images', methods=['POST'])
def capture_images():
    # Capture 50 images for the registered user
    data = request.json
    name = data['name']

    # Create a directory for the user if it doesn't exist
    dataset_path = os.path.join('dataset', name)
    if not os.path.exists(dataset_path):
        os.makedirs(dataset_path)

    # Initialize the webcam
    cap = cv2.VideoCapture(0)
    count = 0

    # Capture 50 images
    while count < 50:
        ret, frame = cap.read()
        if not ret:
            break

        # Resize the frame to make sure all images are consistent in size
        frame = imutils.resize(frame, width=400)

        # Save the image with the format Name_1, Name_2, ..., Name_50
        file_path = os.path.join(dataset_path, f"{name}_{count + 1}.png")  # name_1, name_2, ...
        cv2.imwrite(file_path, frame)

        # Increment the count
        count += 1

    # Release the video capture object
    cap.release()

    return jsonify({"message": f"Captured 50 images for {name}"}), 200


@app.route('/train', methods=['POST'])
def train_model():
    # Define paths
    dataset_path = "dataset"
    embedding_file = "output/embeddings.pickle"
    recognizer_file = "output/recognizer.pickle"
    label_encoder_file = "output/le.pickle"
    prototxt_path = "model/deploy.prototxt"
    model_path = "model/res10_300x300_ssd_iter_140000.caffemodel"
    embedding_model_path = "model/openface_nn4.small2.v1.t7"

    # Load models
    dnndetector = cv2.dnn.readNetFromCaffe(prototxt_path, model_path)
    dnnembedder = cv2.dnn.readNetFromTorch(embedding_model_path)

    # Initialize data structures
    image_paths = list(paths.list_images(dataset_path))
    known_embeddings = []
    known_names = []
    conf_threshold = 0.5
    total = 0

    # Process images
    for (i, image_path) in enumerate(image_paths):
        print(f"Processing image {i + 1}/{len(image_paths)}")
        student_name = image_path.split(os.path.sep)[-2]
        image = cv2.imread(image_path)
        image = imutils.resize(image, width=600)
        (h, w) = image.shape[:2]

        # Prepare the image for face detection
        blob = cv2.dnn.blobFromImage(cv2.resize(image, (300, 300)), 1.0, (300, 300), (104.0, 177.0, 123.0), swapRB=False, crop=False)
        dnndetector.setInput(blob)
        detections = dnndetector.forward()

        if len(detections) > 0:
            # Get the detection with the highest confidence
            i = np.argmax(detections[0, 0, :, 2])
            confidence = detections[0, 0, i, 2]

            if confidence > conf_threshold:
                # Extract the face region
                box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
                (startX, startY, endX, endY) = box.astype("int")
                face_only = image[startY:endY, startX:endX]
                (fH, fW) = face_only.shape[:2]

                # Ensure the face is large enough
                if fW < 20 or fH < 20:
                    continue

                # Prepare the face for embedding extraction
                face_blob = cv2.dnn.blobFromImage(face_only, 1.0 / 255, (96, 96), (0, 0, 0), swapRB=True, crop=False)
                dnnembedder.setInput(face_blob)
                vec = dnnembedder.forward()

                # Save the embedding and name
                known_names.append(student_name)
                known_embeddings.append(vec.flatten())
                total += 1

    print(f"Total embeddings: {total}")

    # Save embeddings and names
    data = {"embeddings": known_embeddings, "names": known_names}
    os.makedirs(os.path.dirname(embedding_file), exist_ok=True)
    with open(embedding_file, "wb") as f:
        pickle.dump(data, f)

    # Train the SVM model
    label_encoder = LabelEncoder()
    labels = label_encoder.fit_transform(known_names)
    recognizer = SVC(C=1.0, kernel="linear", probability=True)
    recognizer.fit(known_embeddings, labels)

    # Save the trained models
    with open(recognizer_file, "wb") as f:
        pickle.dump(recognizer, f)
    with open(label_encoder_file, "wb") as f:
        pickle.dump(label_encoder, f)

    print("Training process completed.")
    return jsonify({"message": "Model trained successfully"}), 200

attendance_recorded = False
recognized_user = None  # Store the recognized user

@app.route('/recognize')
def recognize():
    global attendance_recorded, recognized_user
    attendance_recorded = False  # Reset for a new session
    recognized_user = None
    return render_template('recognize.html')

def generate_frames():
    global recognized_user
    cap = cv2.VideoCapture(0)

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        frame = imutils.resize(frame, width=600)
        (h, w) = frame.shape[:2]
        blob = cv2.dnn.blobFromImage(cv2.resize(frame, (300, 300)), 1.0, (300, 300), 
                                     (104.0, 177.0, 123.0), swapRB=False, crop=False)
        dnndetector.setInput(blob)
        detections = dnndetector.forward()

        recognized_face = False  # Track if a face is detected

        for i in range(detections.shape[2]):
            confidence = detections[0, 0, i, 2]
            if confidence > conf:
                recognized_face = True
                box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
                (startX, startY, endX, endY) = box.astype("int")
                faceOnly = frame[startY:endY, startX:endX]
                (fH, fW) = faceOnly.shape[:2]

                if fW < 20 or fH < 20:
                    continue

                faceBlob = cv2.dnn.blobFromImage(faceOnly, 1.0 / 255, (96, 96), (0, 0, 0), swapRB=True, crop=False)
                dnnembedder.setInput(faceBlob)
                vec = dnnembedder.forward()

                preds = recognizer.predict_proba(vec)[0]
                j = np.argmax(preds)
                proba = preds[j]
                name = le.classes_[j]

                recognized_user = name  # Store user for button click

                # Draw box and name
                text = f"{name} ({proba * 100:.2f}%)"
                y = startY - 10 if startY - 10 > 10 else startY + 10
                cv2.rectangle(frame, (startX, startY), (endX, endY), (0, 255, 0), 2)
                cv2.putText(frame, text, (startX, y), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)

        if not recognized_face:
            recognized_user = None  # Reset if no face detected

        _, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    cap.release()
    cv2.destroyAllWindows()

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/mark_attendance', methods=['POST'])
def mark_attendance():
    global recognized_user, attendance_recorded

    if recognized_user and not attendance_recorded:
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        attendance_file = 'attendance.csv'
        file_exists = os.path.exists(attendance_file)

        roll_number = "Unknown"
        student_class = "Unknown"

        with open('registration.csv', 'r') as csv_file:
            reader = csv.reader(csv_file)
            for row in reader:
                if row and len(row) >= 3:
                    if recognized_user == row[0]:
                        roll_number = row[1]
                        student_class = row[2]
                        break

        with open(attendance_file, 'a', newline='') as f:
            writer = csv.writer(f)
            if not file_exists:
                writer.writerow(['Name', 'Roll Number', 'Class', 'Timestamp'])
            writer.writerow([recognized_user, roll_number, student_class, timestamp])

        attendance_recorded = True
        return jsonify({"status": "success", "message": "Attendance recorded successfully!"})

    return jsonify({"status": "error", "message": "No recognized face detected!"})


@app.route('/view-attendance')
def view_attendance():
    attendance_file = 'attendance.csv'
    attendance_data = []

    if os.path.exists(attendance_file):
        with open(attendance_file, 'r') as f:
            reader = csv.DictReader(f)
            attendance_data = list(reader)

    return render_template('view_attendance.html', attendance_data=attendance_data)


if __name__ == '__main__':
    app.run(debug=True, port=8000)
