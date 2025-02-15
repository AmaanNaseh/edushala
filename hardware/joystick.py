import serial
import pyautogui
import time
import webbrowser  # Import webbrowser module

# Connect to Arduino (Change COM port if needed)
ser = serial.Serial('COM4', 9600)

# Sensitivity for cursor movement
sensitivity = 3

# Get screen size
screen_width, screen_height = pyautogui.size()

# Disable PyAutoGUI fail-safe
pyautogui.FAILSAFE = False  

button_pressed = False  # Track button state

print("Joystick Started")

while True:
    try:
        # Read data from Arduino
        data = ser.readline().decode().strip()
        x, y, button = map(int, data.split(','))

        # Convert joystick values to cursor movement
        move_x = (x - 512) // sensitivity
        move_y = (y - 512) // sensitivity

        # Get current cursor position
        current_x, current_y = pyautogui.position()

        # Prevent cursor from moving to (0,0)
        new_x = max(10, min(screen_width - 10, current_x + move_x))
        new_y = max(10, min(screen_height - 10, current_y - move_y)) 

        # Move the cursor instantly
        pyautogui.moveTo(new_x, new_y, duration=0.01)

        # Open the website only when button is pressed (once per click)
        if button == 0 and not button_pressed:
            button_pressed = True  # Mark button as pressed
            print("Button Pressed: Opening Website...")
            webbrowser.open('https://edushala.vercel.app')  # Open website in the default browser
            time.sleep(0.5)  # Short delay to prevent multiple triggers

        # Reset button state when released
        if button == 1:
            button_pressed = False

    except Exception as e:
        print("Error:", e)
        break
