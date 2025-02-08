import joblib  # for loading the model

# Load the saved model
model = joblib.load('quiz_model_rf.pkl')

# Function to predict based on input score
def predict_score(score):
    prediction = model.predict([[score]])
    return prediction[0]

# Get input from user and predict
score = float(input("Enter a score: "))
result = predict_score(score)

print(f"The predicted output for score {score} is: {result}")
