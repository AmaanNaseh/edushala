from flask import Flask, render_template, request
import joblib

# Load the saved Random Forest model
model = joblib.load('quiz_model_rf.joblib')

# Function to predict based on input score
def predict_score(score):
    prediction = model.predict([[score]])
    return prediction[0]

# Initialize Flask app
app = Flask(__name__)

# Route for the home page
@app.route('/')
def index():
    return render_template('index.html')


# Route for making a prediction
@app.route('/predict', methods=['GET', 'POST'])
def predict():
    try:
        # Get the input score from the form
        score = float(request.form['score'])

        # Predict using the model
        result = predict_score(score)

        # Map the numeric result to the labels
        if result == 0:
            prediction_label = 'Weak'
        elif result == 1:
            prediction_label = 'Average'
        else:
            prediction_label = 'Strong'

        return render_template('index.html', prediction=prediction_label)
    except Exception as e:
        return render_template('index.html', prediction="Error: Invalid input. Please enter a valid number.")

if __name__ == "__main__":
    app.run(debug=True, port=8002)
