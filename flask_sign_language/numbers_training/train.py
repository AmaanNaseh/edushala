import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, confusion_matrix
import numpy as np

import matplotlib.pyplot as plt
import seaborn as sns


preprocessed_data = joblib.load('./preprocess_numbers.joblib')

data = np.asarray(preprocessed_data['data'])
labels = np.asarray(preprocessed_data['labels'])

X_train, X_test, y_train, y_test = train_test_split(data, labels, test_size=0.2, shuffle=True, stratify=labels)

model = RandomForestClassifier()
model.fit(X_train, y_train)

y_pred = model.predict(X_test)

accuracy = accuracy_score(y_pred, y_test)

print("Accuracy of the model is : {0} %".format(accuracy*100))

cm = confusion_matrix(y_test, y_pred)
print(cm)
sns.heatmap(cm, annot=True)
plt.title("Confusion Matrix for Sign Language - Alphabets\nAccuracy of the model is : {0} %".format(accuracy*100))
plt.savefig("cm_numbers.jpg")

joblib.dump({'model': model}, 'model_numbers.joblib')