import joblib
import cv2
import mediapipe as mp
import numpy as np

# Load the trained model
model_file = joblib.load('./model_numbers.joblib')
model = model_file['model']

# Initialize webcam
cam = cv2.VideoCapture(0)

# Initialize Mediapipe hands
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
hands = mp_hands.Hands(static_image_mode=True, min_detection_confidence=0.3)

# Labels for prediction
labels = {0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9'}

while True:
    # Read frame from the webcam
    main_data = []
    x_ = []
    y_ = []

    _, img = cam.read()
    height, width, _ = img.shape

    # Convert the frame to RGB
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    # Process the frame using Mediapipe
    final_images = hands.process(img_rgb)

    if final_images.multi_hand_landmarks:
        for hand_landmarks in final_images.multi_hand_landmarks:
            # Draw landmarks on the frame
            mp_drawing.draw_landmarks(
                img,
                hand_landmarks,
                mp_hands.HAND_CONNECTIONS,
                mp_drawing_styles.get_default_hand_landmarks_style(),
                mp_drawing_styles.get_default_hand_connections_style()
            )

            # Extract landmarks and normalize them
            x_ = [landmark.x for landmark in hand_landmarks.landmark]
            y_ = [landmark.y for landmark in hand_landmarks.landmark]

            x_min, y_min = min(x_), min(y_)
            for landmark in hand_landmarks.landmark:
                main_data.append(landmark.x - x_min)
                main_data.append(landmark.y - y_min)

            # Ensure the data length matches the model's input dimension
            if len(main_data) == 42:
                prediction = model.predict([np.asarray(main_data)])
                predicted_result = labels[int(prediction[0])]

                # Draw bounding box and label
                x1 = int(min(x_) * width) - 10
                y1 = int(min(y_) * height) - 10
                x2 = int(max(x_) * width) + 10
                y2 = int(max(y_) * height) + 10

                cv2.rectangle(img, (x1, y1), (x2, y2), (255, 255, 255), 4)
                cv2.putText(img, predicted_result, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 1.3, (0, 0, 0), 3,
                            cv2.LINE_AA)
            else:
                print(f"Unexpected input dimension: {len(main_data)}")

    # Display the frame
    cv2.imshow('Sign Language Numbers', img)

    # Break the loop if the Escape key is pressed
    key = cv2.waitKey(10)
    if key == 27:
        break

# Release resources
cam.release()
cv2.destroyAllWindows()
