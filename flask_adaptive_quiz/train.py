import pandas as pd  # useful for loading the dataset
import numpy as np  # to perform array operations
from matplotlib import pyplot as plt  # for plotting
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier  # Import RandomForestClassifier
import joblib  # for saving the model
from sklearn.metrics import log_loss  # for calculating loss

# Load dataset
dataset = pd.read_csv('quiz_data.csv')

# Check shape and preview the data
print(dataset.shape)
print(dataset.head(5))

# Prepare features (X) and target (Y)
X = dataset["score"].values.reshape(-1, 1)  # Reshaping to 2D array
Y = dataset["output"]

# Split data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.25, random_state=0)

# Initialize RandomForestClassifier model
model = RandomForestClassifier(n_estimators=100, random_state=0)

# Train the model
model.fit(X_train, y_train)

# Save the model to disk
joblib.dump(model, 'quiz_model_rf.joblib')

print("Model saved to quiz_model_rf.joblib")

# Make predictions on test set
y_pred = model.predict(X_test)

# Calculate accuracy
accuracy = np.mean(y_pred == y_test)
print(f'Accuracy: {accuracy}')

# For loss, we can use log loss (as an example) from sklearn.metrics
# RandomForestClassifier gives class predictions, so we use `predict_proba` for log_loss
y_prob = model.predict_proba(X_test)
loss = log_loss(y_test, y_prob)
print(f'Log Loss: {loss}')

# Plot accuracy and loss
fig, ax = plt.subplots()
ax.bar(['Accuracy', 'Loss'], [accuracy, loss], color=['blue', 'red'])

ax.set_ylabel('Scores')
ax.set_title('Accuracy and Loss')

# Save the plot as an image
plt.savefig('accuracy_loss_curve_rf.png')  # Save image instead of showing it
print("Plot saved as accuracy_loss_curve_rf.png")
