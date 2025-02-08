from flask import Flask, render_template, Response, request, jsonify
import joblib
import cv2
import mediapipe as mp
import numpy as np
import threading

app = Flask(__name__)

# Load models
alphabet_model_file = joblib.load('./model_alphabets.joblib')
alphabet_model = alphabet_model_file['model']

number_model_file = joblib.load('./model_numbers.joblib')
number_model = number_model_file['model']

# Mediapipe initialization
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
hands = mp_hands.Hands(static_image_mode=True, min_detection_confidence=0.3)

# Labels for predictions
alphabet_labels = {i: chr(65 + i) for i in range(26)}  # A-Z
number_labels = {i: str(i) for i in range(10)}         # 0-9

predicted_result = "Unknown"  # Initial value
predicted_result_lock = threading.Lock()  # Lock for thread-safe access


def generate_frames(model, labels):
    global predicted_result
    cam = cv2.VideoCapture(0)

    while True:
        success, frame = cam.read()
        if not success:
            break

        height, width, _ = frame.shape
        img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        final_images = hands.process(img_rgb)

        # Draw fixed bounding box of 150x150px in the top-left corner
        top_left_x, top_left_y = 50, 75
        bottom_right_x = top_left_x + 250
        bottom_right_y = top_left_y + 250
        cv2.rectangle(frame, (top_left_x, top_left_y), (bottom_right_x, bottom_right_y), (255, 255, 255), 4)
        cv2.putText(frame, "Place right hand here", 
            (top_left_x + (bottom_right_x - top_left_x - cv2.getTextSize("Place right hand here", cv2.FONT_HERSHEY_SIMPLEX, 0.8, 2)[0][0]) // 2 , 
             top_left_y - 10), 
            cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)

        if final_images.multi_hand_landmarks:
            for hand_landmarks in final_images.multi_hand_landmarks:
                mp_drawing.draw_landmarks(
                    frame,
                    hand_landmarks,
                    mp_hands.HAND_CONNECTIONS,
                    mp_drawing_styles.get_default_hand_landmarks_style(),
                    mp_drawing_styles.get_default_hand_connections_style()
                )

                # Extract landmarks and normalize them
                main_data = []
                x_ = [landmark.x for landmark in hand_landmarks.landmark]
                y_ = [landmark.y for landmark in hand_landmarks.landmark]

                x_min, y_min = min(x_), min(y_)
                for landmark in hand_landmarks.landmark:
                    main_data.append(landmark.x - x_min)
                    main_data.append(landmark.y - y_min)

                # Ensure data matches model input dimension
                if len(main_data) == 42:
                    prediction = model.predict([np.asarray(main_data)])
                    new_predicted_result = labels[int(prediction[0])]

                    # Safely update the global predicted result
                    with predicted_result_lock:
                        predicted_result = new_predicted_result

                    # Draw bounding box around the hand landmarks
                    x1 = int(min(x_) * width) - 10
                    y1 = int(min(y_) * height) - 10
                    x2 = int(max(x_) * width) + 10
                    y2 = int(max(y_) * height) + 10

                    cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 128, 0), 4)
                    cv2.putText(frame, predicted_result, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 1.3, (0, 0, 0), 3,
                                cv2.LINE_AA)

        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    cam.release()


@app.route('/get_prediction', methods=['GET'])
def get_prediction():
    # Safely return the predicted result
    with predicted_result_lock:
        return jsonify({'predicted_result': predicted_result})


@app.route('/alphabets')
def alphabets():
    return render_template('alphabets.html')


@app.route('/numbers')
def numbers():
    return render_template('numbers.html')


@app.route('/video_feed_alphabets')
def video_feed_alphabets():
    return Response(generate_frames(alphabet_model, alphabet_labels),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/video_feed_numbers')
def video_feed_numbers():
    return Response(generate_frames(number_model, number_labels),
                    mimetype='multipart/x-mixed-replace; boundary=frame')



@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, port=8001)
