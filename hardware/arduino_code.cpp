#include <Keypad.h>

// Define the keypad's row and column pins
const byte ROW_NUM = 4; // Four rows
const byte COLUMN_NUM = 4; // Four columns
char keys[ROW_NUM][COLUMN_NUM] = {
  {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'*','0','#','D'}
};
byte pin_rows[ROW_NUM] = {2, 3, 4, 5};  // Connect to the row pinouts of the keypad
byte pin_column[COLUMN_NUM] = {6, 7, 8, 9};  // Connect to the column pinouts of the keypad

Keypad keypad = Keypad(makeKeymap(keys), pin_rows, pin_column, ROW_NUM, COLUMN_NUM);

// Joystick pin setup
int joystickX = A0; // X-axis of the joystick
int joystickY = A1; // Y-axis of the joystick
int joystickButton = 10; // Joystick button

void setup() {
  Serial.begin(9600); // Start serial communication
  pinMode(joystickButton, INPUT_PULLUP); // Joystick button as input
}

void loop() {
  // Handle Keypad functionality
  keypadLoop();
  
  // Handle Joystick functionality
  joystickLoop();
}

// Keypad handling loop
void keypadLoop() {
  char key = keypad.getKey();
  
  if (key) {
    int xValue = analogRead(joystickX); // Read joystick X-axis value
    int yValue = analogRead(joystickY); // Read joystick Y-axis value
    int buttonState = digitalRead(joystickButton); // Read joystick button state

    // Send the key and joystick data to the serial monitor
    Serial.print(key);  
    Serial.print(",");
    Serial.print(xValue);  // Send joystick X-axis value
    Serial.print(",");
    Serial.print(yValue);  // Send joystick Y-axis value
    Serial.print(",");
    Serial.println(buttonState); // Send joystick button state
  }
}

// Joystick handling loop
void joystickLoop() {
  int xValue = analogRead(joystickX); // Read joystick X-axis value
  int yValue = analogRead(joystickY); // Read joystick Y-axis value
  int buttonState = digitalRead(joystickButton); // Read joystick button state

  // Send joystick data to the serial monitor
  Serial.print(xValue);
  Serial.print(",");
  Serial.print(yValue);
  Serial.print(",");
  Serial.println(buttonState);
  
  delay(100); // Delay for stability
}
