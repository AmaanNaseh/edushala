# EDUSHALA

## Tech stack

![Image](https://github.com/user-attachments/assets/37ac02f2-cf9a-4a3a-bf1e-7243e067cf7a)

## Live Website: <a href="https://edushala.vercel.app" target="_blank" >https://edushala.vercel.app</a>

## Steps to run this project:

Note: Make sure you have installed <a href="https://git-scm.com/downloads" target="_blank" >Git</a>, <a href="https://code.visualstudio.com/download" target="_blank" >VS Code</a>, <a href="https://nodejs.org/en/download" target="_blank" >Node.js</a> and <a href="https://www.python.org/downloads/release/python-3116/" target="_blank" >Python (3.11.6 Recommended)</a> in your system

### 1. Clone the repository:

```bash
git clone https://github.com/AmaanNaseh/edushala.git
```

or

### Code > Download Zip > Extract edushala-master

### 2. Open edushala (cloned folder) or edushala-master (downloaded zip's extracted folder) in VS Code or other code editor

```bash
Ctrl + K + O
```

### 3. Create a Virtual Environment in edushala or edushala-master (Optional but Recommended if Steps 4 (i), 4 (ii) & 4 (iii) shows error)

(i) In VS Code, type following and Python : Select Interpreter

```bash
Ctrl + Shift + P (to select python interpreter)
```

(ii) Create Virtual Environment > VENV > Python 3.11.6 (Recommended or your python version) > Tick all dependencies to Install > OK

(iii) Once done, follow steps below in given sequence

### 4. Open 6 different terminals in VS Code/IDE, install dependencies & run development server

(i) Attendance system backend

```bash
.venv/scripts/activate
```

```bash
set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

```bash
cd flask_attendance_system
```

```bash
pip install -r requirements.txt
```

```bash
python app.py
```

(ii) Sign language system backend

```bash
.venv/scripts/activate
```

```bash
set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

```bash
cd flask_sign_language
```

```bash
pip install -r requirements.txt
```

```bash
python app.py
```

(iii) ML Quiz Analyzer

```bash
.venv/scripts/activate
```

```bash
set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

```bash
cd flask_adaptive_quiz
```

```bash
pip install -r requirements.txt
```

```bash
python app.py
```

(iv) AI Question generator

```bash
cd q_generator
```

```bash
npm install
```

```bash
npm run dev
```

(v) full stack website backend

```bash
cd modern_lms/backend
```

```bash
npm install
```

```bash
npm run dev
```

(vi) full stack website client

```bash
cd modern_lms/client
```

```bash
npm install
```

```bash
npm run dev
```

### 5. Access website (only after running everything above) at: http://localhost:5173

## Preview of our website

![Image](https://github.com/user-attachments/assets/8f7de117-444f-416e-8218-ae0598a3525c)
![Image](https://github.com/user-attachments/assets/2d6f7609-96f8-439f-a763-10e9eb4c7b47)
![Image](https://github.com/user-attachments/assets/e386c2a9-d1d2-455d-8f94-bff89a684b94)
![Image](https://github.com/user-attachments/assets/b475f37b-4672-4b70-a737-34b78f726b9a)
![Image](https://github.com/user-attachments/assets/163bc91a-19f8-42bf-b1ec-40391718b9f4)
![Image](https://github.com/user-attachments/assets/48eb0026-1dc7-4655-baa0-310c06a1dcef)
![Image](https://github.com/user-attachments/assets/be7c5d4c-9b22-4e61-aa41-08c9bd8e3fa5)
![Image](https://github.com/user-attachments/assets/017e9f9b-2154-4816-8e07-9efa17011aad)
![Image](https://github.com/user-attachments/assets/49500737-9b8a-41e4-bd9e-ccb93c994cac)
![Image](https://github.com/user-attachments/assets/64a38514-5e07-424e-a5ea-fe9398b9631a)
![Image](https://github.com/user-attachments/assets/4900a3fd-5379-4df6-9d6b-aa24fdd92439)
![Image](https://github.com/user-attachments/assets/c6b41f00-3cd4-4c1e-9ec2-e32510e9cf4f)
![Image](https://github.com/user-attachments/assets/38f2e42b-d5f4-4f1c-acf2-db80ad70a921)
