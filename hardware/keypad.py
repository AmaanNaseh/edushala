import serial
import pyautogui
import time

# Connect to Arduino (Change COM port if needed)
ser = serial.Serial('COM4', 9600, timeout=1)  # Adjust the COM port

# Disable PyAutoGUI fail-safe
pyautogui.FAILSAFE = False

# Keypad to Keyboard mapping
key_mapping = {
    '*': '*',   # '*' maps to *
    '#': ' ',   # '#' maps to Space
    'A': '.',   # 'A' maps to .
    'B': '+',   # 'B' maps to +
    'C': '-',   # 'C' maps to -
    'D': '\n',  # 'D' maps to Enter
}

print("Keypad Started")

while True:
    try:
        # Read data from Arduino
        data = ser.readline().decode().strip()
        
        if data:  # Ensure data exists
            values = data.split(',')
            
            # Ensure there are exactly 4 values: key, x, y, button state
            if len(values) == 4:
                key, x, y, button = values

                if key:  # If a key is pressed
                    # Map the keypad input to the desired output
                    mapped_key = key_mapping.get(key, key)  # Default to the key itself if no mapping exists
                    
                    print(f"Key Pressed: {key} -> Mapped: {mapped_key}")  # Print original and mapped key
                    pyautogui.write(mapped_key)  # Type the mapped key using pyautogui
                    time.sleep(0.5)  # Add a small delay to avoid rapid typing

    except Exception as e:
        print("Error:", e)
        break
