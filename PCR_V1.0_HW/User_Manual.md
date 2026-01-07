# PCR v1.0 - User Manual

## Document Information
- **Project**: PCR v1.0 (Polymerase Chain Reaction Controller)
- **Version**: 1.0
- **Target Audience**: Technicians, Testers, and End Users
- **Last Updated**: Based on current codebase analysis

---

## Table of Contents
1. [System Overview](#1-system-overview)
2. [Supported Boards](#2-supported-boards)
3. [Required Hardware and Modules](#3-required-hardware-and-modules)
4. [Wiring and Connection Instructions](#4-wiring-and-connection-instructions)
5. [Software Setup](#5-software-setup)
6. [Firmware Upload Steps](#6-firmware-upload-steps)
7. [Initial Configuration](#7-initial-configuration)
8. [Normal Operation](#8-normal-operation)
9. [Safety Notes](#9-safety-notes)
10. [Basic Troubleshooting](#10-basic-troubleshooting)

---

## 1. System Overview

PCR v1.0 is an embedded control system designed for temperature-controlled timing operations. The system can operate in two main configurations:

### Configuration A: Arduino Mega 2560 Standalone
- Receives timing commands via serial communication
- Controls output signals based on received commands
- Monitors temperature during operation
- Suitable for direct serial control or integration with other systems

### Configuration B: ESP8266/ESP32 Web-Controlled
- Provides web-based control interface via WiFi
- Can operate standalone or communicate with Arduino Mega
- Displays real-time temperature readings
- Controls multiple relay outputs
- Accessible from any device with a web browser

### Key Features
- Precise timing control (millisecond accuracy)
- Real-time temperature monitoring
- Web-based user interface (ESP versions)
- State persistence (remembers settings after power cycle)
- Serial communication for integration

---

## 2. Supported Boards

### Arduino Mega 2560
- **What it is**: A large Arduino development board with many I/O pins
- **Use case**: Main control logic and timing operations
- **Power**: 7-12V DC input (via barrel jack or USB)
- **USB**: Standard USB-B connector for programming

### ESP8266 (NodeMCU or compatible)
- **What it is**: A WiFi-enabled microcontroller board
- **Use case**: Web interface and WiFi connectivity
- **Power**: 5V via USB or 3.3V direct
- **USB**: Micro-USB connector for programming and power

### ESP32
- **What it is**: A more powerful WiFi-enabled microcontroller
- **Use case**: Web interface with enhanced capabilities
- **Power**: 5V via USB or 3.3V direct
- **USB**: Micro-USB or USB-C (depending on board)

**Note**: You can use either Arduino Mega alone, ESP8266/ESP32 alone, or both together in a hybrid setup.

---

## 3. Required Hardware and Modules

### Essential Components

1. **Development Board**
   - Arduino Mega 2560, OR
   - ESP8266 (NodeMCU), OR
   - ESP32, OR
   - Both Arduino Mega + ESP8266 for hybrid setup

2. **Temperature Sensor**
   - DS18B20 temperature sensor (waterproof version recommended)
   - 4.7kΩ resistor (pull-up resistor for sensor)

3. **Relay Module** (for ESP8266/ESP32 versions)
   - 4-channel relay module
   - 3.3V or 5V compatible (check module specifications)
   - Rated for your load requirements (typically 10A @ 250VAC)

4. **USB Cable**
   - USB-A to USB-B for Arduino Mega
   - USB-A to Micro-USB for ESP8266
   - USB-A to Micro-USB or USB-C for ESP32

5. **Power Supply**
   - For Arduino Mega: 7-12V DC adapter (if not using USB power)
   - For ESP8266/ESP32: Usually powered via USB, or 5V adapter

### Optional Components

6. **Level Shifter** (for hybrid Arduino + ESP setup)
   - 4-channel bidirectional level shifter (5V ↔ 3.3V)
   - Required when connecting Arduino Mega to ESP8266/ESP32

7. **Breadboard and Jumper Wires**
   - For prototyping and connections

8. **Computer**
   - Windows, Mac, or Linux
   - USB port for programming
   - Web browser (for ESP web interface)

---

## 4. Wiring and Connection Instructions

### ⚠️ IMPORTANT: Power Off Before Wiring

Always disconnect power before making or changing connections.

### Arduino Mega 2560 Wiring

#### Temperature Sensor (DS18B20)
```
DS18B20 Pin Layout:
- Red wire (VCC) → 5V on Arduino
- Black wire (GND) → GND on Arduino
- Yellow/White wire (DATA) → Pin 2 on Arduino
- 4.7kΩ resistor: Connect between DATA (Pin 2) and VCC (5V)
```

**Visual Connection**:
```
DS18B20          Arduino Mega 2560
  VCC  ─────────── 5V
  GND  ─────────── GND
  DATA ─────────── Pin 2
         │
         └───[4.7kΩ]─── 5V
```

#### Control Outputs
- **Pin 4**: Control Output 1 (connect to your device)
- **Pin 5**: Control Output 2 (main operation control)
- **Pin 6**: Control Output 3 (stop/reset signal)
- **Pin 3**: Digital Input (if needed for your application)

#### Serial Communication (for hybrid setup)
- **Pin 18 (TX1)**: Connect to ESP8266 RX (via level shifter)
- **Pin 19 (RX1)**: Connect to ESP8266 TX (via level shifter)
- **GND**: Common ground with ESP8266

### ESP8266 (NodeMCU) Wiring

#### Temperature Sensor (DS18B20)
```
DS18B20          ESP8266 (NodeMCU)
  VCC  ─────────── 3.3V
  GND  ─────────── GND
  DATA ─────────── D2 (GPIO4)
         │
         └───[4.7kΩ]─── 3.3V
```

**Note**: ESP8266 operates at 3.3V, not 5V. Use 3.3V power for the sensor.

#### Relay Module
```
Relay Module      ESP8266 (NodeMCU)
  VCC  ─────────── 3.3V or 5V (check module)
  GND  ─────────── GND
  IN1  ─────────── D0 (GPIO16) - Relay 1
  IN2  ─────────── D1 (GPIO5)  - Relay 2
  IN3  ─────────── D2 (GPIO4)  - Relay 3
  IN4  ─────────── D3 (GPIO0)  - Relay 4
```

**Important**: 
- Verify relay module operating voltage (3.3V or 5V)
- Connect relay module power separately if it requires 5V
- Relay outputs connect to your external devices/loads

#### Serial Communication (for hybrid setup)
- **TX (GPIO1)**: Connect to Arduino RX1 (via level shifter)
- **RX (GPIO3)**: Connect to Arduino TX1 (via level shifter)
- **GND**: Common ground with Arduino

### Level Shifter Connection (Arduino ↔ ESP8266)

If connecting Arduino Mega to ESP8266:

```
Level Shifter Connections:
- HV (High Voltage) side: Connect to 5V (Arduino side)
- LV (Low Voltage) side: Connect to 3.3V (ESP8266 side)
- GND: Common ground (both boards)
- HV1 (Arduino TX1) ↔ LV1 (ESP8266 RX)
- HV2 (Arduino RX1) ↔ LV2 (ESP8266 TX)
```

### Complete Hybrid Setup Wiring Summary

1. **Power both boards** (separate power supplies or USB)
2. **Connect grounds together** (common GND)
3. **Connect serial lines through level shifter**
4. **Temperature sensor to Arduino** (Pin 2)
5. **Relay module to ESP8266** (if using relays)
6. **Control outputs from Arduino** (Pins 4, 5, 6)

---

## 5. Software Setup

### Step 1: Install Arduino IDE

1. Download Arduino IDE from: https://www.arduino.cc/en/software
2. Install the software following the installer instructions
3. Launch Arduino IDE

### Step 2: Install Board Support Packages

#### For Arduino Mega 2560
- Arduino AVR Boards are included by default
- No additional installation needed

#### For ESP8266
1. In Arduino IDE: **File → Preferences**
2. In "Additional Board Manager URLs", add:
   ```
   https://arduino.esp8266.com/stable/package_esp8266com_index.json
   ```
3. Click **OK**
4. Go to **Tools → Board → Boards Manager**
5. Search for "ESP8266"
6. Install "**esp8266 by ESP8266 Community**"
7. Wait for installation to complete

#### For ESP32
1. In Arduino IDE: **File → Preferences**
2. In "Additional Board Manager URLs", add:
   ```
   https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
   ```
3. Click **OK**
4. Go to **Tools → Board → Boards Manager**
5. Search for "ESP32"
6. Install "**esp32 by Espressif Systems**"
7. Wait for installation to complete

### Step 3: Install Required Libraries

1. In Arduino IDE: **Sketch → Include Library → Manage Libraries**
2. Search and install the following libraries:

**For Arduino Mega:**
- **OneWire** (by Paul Stoffregen)
- **DallasTemperature** (by Miles Burton)

**For ESP8266/ESP32:**
- **OneWire** (by Paul Stoffregen)
- **DallasTemperature** (by Miles Burton)
- **ESPAsyncWebServer** (by me-no-dev)
- **ESPAsyncTCP** (for ESP8266) or **AsyncTCP** (for ESP32)

### Step 4: Install USB Drivers (if needed)

#### For Arduino Mega
- Usually works without additional drivers on Windows 10/11
- If not recognized: Install Arduino drivers or CH340/CH341 drivers

#### For ESP8266/ESP32
- **CH340 driver**: If your board uses CH340 chip
  - Download from: https://github.com/WCHSoftGroup/ch34xser
- **CP2102 driver**: If your board uses CP2102 chip
  - Download from: https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers

**How to check which driver you need:**
1. Connect your board via USB
2. Open Device Manager (Windows) or check `lsusb` (Linux)
3. Look for "USB Serial" or "COM Port" device
4. Note the chip name (CH340, CP2102, etc.)

---

## 6. Firmware Upload Steps

### Uploading to Arduino Mega 2560

1. **Open the firmware file:**
   - Navigate to: `mega2560_macrowave/mega2560_macrowave.ino`
   - Open in Arduino IDE

2. **Select board and port:**
   - **Tools → Board → Arduino AVR Boards → Arduino Mega or Mega 2560**
   - **Tools → Port → [Select your COM port]**
     - Look for "Arduino Mega" or similar in port name

3. **Upload firmware:**
   - Click **Upload** button (→) or press **Ctrl+U**
   - Wait for "Done uploading" message

4. **Verify upload:**
   - Open **Tools → Serial Monitor**
   - Set baud rate to **115200**
   - You should see "device is ready" message

### Uploading to ESP8266

1. **Open the firmware file:**
   - Choose one of the ESP8266 implementations from `web/` folder
   - Example: `web/server_input1_5112022/server_input1_5112022.ino`
   - Open in Arduino IDE

2. **Select board and port:**
   - **Tools → Board → ESP8266 Boards → NodeMCU 1.0 (ESP-12E Module)**
   - **Tools → Port → [Select your COM port]**

3. **Configure upload settings:**
   - **Upload Speed**: 115200 (or try 921600 if upload fails)
   - **CPU Frequency**: 80 MHz
   - **Flash Size**: 4MB (FS:2MB OTA:~1019KB) - adjust if different

4. **Upload firmware:**
   - **Important**: Some ESP8266 boards require holding the **BOOT** button during upload
   - Click **Upload** button
   - If upload fails, try:
     - Hold BOOT button, click Upload, release BOOT when "Connecting..." appears
     - Try slower upload speed (115200)

5. **Verify upload:**
   - Open Serial Monitor at **115200** baud
   - You should see WiFi AP information and IP address

### Uploading to ESP32

1. **Open the firmware file:**
   - Choose ESP32-compatible implementation
   - Open in Arduino IDE

2. **Select board and port:**
   - **Tools → Board → ESP32 Arduino → [Your ESP32 board variant]**
   - **Tools → Port → [Select your COM port]**

3. **Upload firmware:**
   - Similar process to ESP8266
   - May require holding BOOT button during upload

4. **Verify upload:**
   - Check Serial Monitor for startup messages

### Troubleshooting Upload Issues

**"Port not found" or "Board not found":**
- Check USB cable (data cable, not charge-only)
- Install USB drivers (see Section 5, Step 4)
- Try different USB port
- Restart Arduino IDE

**Upload fails with errors:**
- Hold BOOT button during upload (ESP boards)
- Try slower upload speed
- Check board selection matches your hardware
- Close Serial Monitor before uploading

**"Sketch too big" error:**
- Select larger partition scheme (ESP boards)
- Tools → Partition Scheme → Choose larger option

---

## 7. Initial Configuration

### Arduino Mega 2560 Configuration

**No configuration needed** - the firmware is ready to use after upload.

**To test:**
1. Open Serial Monitor (115200 baud)
2. Send a command: Type `01000,` and press Enter
   - This sends a 1000ms (1 second) timing command
3. Observe the outputs and Serial messages

### ESP8266/ESP32 Configuration

#### WiFi Access Point Settings

The firmware creates a WiFi access point. You may want to change the network name and password:

1. **Open the firmware file** in Arduino IDE
2. **Find these lines** (near the top):
   ```cpp
   const char* ssid = "Sedna";  // Network name
   const char* password = "123456789";  // Password
   ```
3. **Change to your preferred values:**
   ```cpp
   const char* ssid = "MyPCRController";  // Your network name
   const char* password = "MySecurePassword";  // Your password
   ```
4. **Upload the modified firmware**

#### Connecting to the Web Interface

1. **Power on the ESP8266/ESP32 board**
2. **Wait 10-30 seconds** for WiFi AP to start
3. **On your phone/computer:**
   - Open WiFi settings
   - Look for the network name (SSID) you configured
   - Connect using the password
4. **Open a web browser**
5. **Navigate to:** `http://192.168.4.1`
   - Or check Serial Monitor for the actual IP address
6. **You should see the control interface**

#### Initial Relay State (ESP8266 versions with EEPROM)

- On first power-up, relay states are undefined
- After first use, states are saved and restored on next power-up
- To reset: Clear EEPROM or re-upload firmware

---

## 8. Normal Operation

### Using Arduino Mega Standalone

#### Via Serial Monitor

1. **Open Serial Monitor** (Tools → Serial Monitor)
2. **Set baud rate to 115200**
3. **Send timing commands:**
   - Format: `XXXXX,` (5 digits + comma)
   - Example: `01000,` = 1000 milliseconds (1 second)
   - Example: `03000,` = 3000 milliseconds (3 seconds)
   - Minimum: `00452,` (452 milliseconds)

4. **Operation sequence:**
   - You'll see "confirm X.XXX sec" message
   - Then "START" message
   - Temperature readings every 300ms: "Temp is: XX.XX"
   - Finally "STOP" message and elapsed time

#### Via External Serial Device

- Connect external device to Serial1 (pins 18/19)
- Send same command format: `XXXXX,`
- Monitor responses on Serial1

### Using ESP8266/ESP32 Web Interface

#### Accessing the Interface

1. **Connect to WiFi AP** (see Section 7)
2. **Open browser:** `http://192.168.4.1`
3. **You'll see the control page** with:
   - Current temperature display
   - System status
   - Input fields for commands
   - Control buttons

#### Sending Commands

**For temperature-controlled operation:**
1. Enter values in the input fields:
   - **Max Temperature**: Maximum allowed temperature
   - **Min Temperature**: Minimum allowed temperature
   - **Number of Runs**: How many cycles to perform
2. Click **Submit** button
3. Monitor temperature and status on the web page

**For manual control:**
- Click **MicroON** button to start operation
- Click **MicroOFF** button to stop operation
- Some versions have **Micro30** for 30-second operation

#### Monitoring Operation

- **Temperature**: Updates automatically every 1-2 seconds
- **Status**: Shows current operation state
- **Serial Monitor**: Also shows detailed operation logs

### Hybrid Operation (Arduino + ESP8266)

1. **Upload firmware to both boards**
2. **Connect them via serial** (with level shifter)
3. **Use ESP8266 web interface** to send commands
4. **Arduino Mega executes** the timing operations
5. **Temperature data** flows from Arduino to ESP8266
6. **Web interface displays** real-time information

---

## 9. Safety Notes

### ⚠️ Electrical Safety

1. **Power Off Before Wiring**
   - Always disconnect power before making connections
   - Double-check wiring before applying power

2. **Voltage Levels**
   - Arduino Mega uses 5V logic
   - ESP8266/ESP32 use 3.3V logic
   - **Never connect 5V directly to ESP8266/ESP32 pins** - use level shifter
   - Verify relay module voltage compatibility

3. **Power Supply**
   - Use appropriate power supply for your board
   - Don't exceed maximum voltage ratings
   - Ensure adequate current capacity
   - Use quality power supplies to avoid damage

4. **Relay Connections**
   - Relays control high-voltage/high-current loads
   - Ensure proper wiring and insulation
   - Use appropriate wire gauge for load current
   - Follow local electrical codes for high-voltage connections

5. **Temperature Sensor**
   - DS18B20 has maximum temperature limit (125°C)
   - Don't exceed sensor specifications
   - Use appropriate sensor variant (waterproof, etc.) for your application

### ⚠️ Operational Safety

1. **Temperature Monitoring**
   - System monitors temperature but may not have safety limits
   - Monitor operation and intervene if temperatures are abnormal
   - Verify temperature sensor is working correctly

2. **Timing Accuracy**
   - Timing is software-based (millis())
   - May drift slightly over long operations
   - Verify timing meets your requirements

3. **System Reliability**
   - This is a development/prototype system
   - Not intended for critical applications without additional safety systems
   - Always have manual override capability

4. **Data Backup**
   - Settings stored in EEPROM may be lost if power fails during write
   - Keep notes of important configurations

### General Precautions

- **Work in well-ventilated area** if working with high temperatures
- **Keep flammable materials away** from hot components
- **Don't touch components** during operation (may be hot)
- **Follow all safety guidelines** for your specific application

---

## 10. Basic Troubleshooting

### Problem: Board Not Recognized by Computer

**Symptoms:**
- Port doesn't appear in Arduino IDE
- "Port not found" error

**Solutions:**
1. Check USB cable (must be data cable, not charge-only)
2. Try different USB port
3. Install USB drivers (CH340, CP2102, etc.) - see Section 5
4. Check Device Manager for unrecognized devices
5. Restart Arduino IDE
6. Restart computer

### Problem: Upload Fails

**Symptoms:**
- "Upload error" messages
- Board doesn't respond

**Solutions:**
1. **For ESP boards:** Hold BOOT button during upload
2. Close Serial Monitor before uploading
3. Try slower upload speed (115200)
4. Check board selection matches your hardware
5. Try different USB cable
6. Press RESET button on board, then try upload again

### Problem: Temperature Sensor Not Working

**Symptoms:**
- Temperature shows "Error" or wrong values
- No temperature reading

**Solutions:**
1. **Check wiring:**
   - VCC to power (5V for Arduino, 3.3V for ESP)
   - GND to ground
   - DATA to correct pin (Pin 2)
2. **Check pull-up resistor:**
   - Must have 4.7kΩ resistor between DATA and VCC
   - Resistor may be missing or wrong value
3. **Verify sensor:**
   - Test sensor with multimeter
   - Try different sensor
4. **Check pin assignment:**
   - Verify `ONE_WIRE_BUS` definition in code matches your wiring

### Problem: WiFi Access Point Not Visible

**Symptoms:**
- Can't find WiFi network
- ESP8266/ESP32 doesn't create AP

**Solutions:**
1. **Wait longer:** AP may take 10-30 seconds to start
2. **Check Serial Monitor:** Look for error messages
3. **Verify SSID/password in code:** Check firmware settings
4. **Check WiFi mode:** Should be AP mode, not STA mode
5. **Try re-uploading firmware**
6. **Check board:** Verify ESP8266/ESP32 is working (check Serial output)

### Problem: Web Page Not Loading

**Symptoms:**
- Connected to WiFi but browser shows error
- "Can't reach this page" message

**Solutions:**
1. **Check IP address:**
   - Look in Serial Monitor for actual IP address
   - Try that IP instead of 192.168.4.1
2. **Try different browser:** Some browsers cache incorrectly
3. **Clear browser cache:** Ctrl+F5 or clear cache
4. **Check connection:** Verify you're connected to ESP's WiFi AP
5. **Try HTTP (not HTTPS):** Use `http://192.168.4.1`, not `https://`
6. **Check firewall:** Temporarily disable firewall/antivirus

### Problem: Commands Not Working

**Symptoms:**
- Sent command but nothing happens
- No response from system

**Solutions:**
1. **Check Serial Monitor:** Look for error messages
2. **Verify command format:**
   - Arduino: Must be `XXXXX,` (5 digits + comma)
   - Example: `01000,` not `1000` or `1000,`
3. **Check baud rate:** Must be 115200
4. **Check wiring:** Verify serial connections (for hybrid setup)
5. **Check level shifter:** If using Arduino + ESP, verify level shifter connections
6. **Verify firmware:** Make sure correct firmware is uploaded

### Problem: Relay Not Switching

**Symptoms:**
- Click button but relay doesn't change state
- Relay stuck in one position

**Solutions:**
1. **Check relay module power:**
   - Verify VCC and GND connected
   - Check if module needs 5V or 3.3V
2. **Check GPIO connections:**
   - Verify correct pins connected
   - Check pin mapping (D0, D1, etc. vs GPIO numbers)
3. **Test relay module:**
   - Connect relay input directly to 3.3V/5V to test
   - Verify relay clicks
4. **Check relay logic:**
   - Some relays are active LOW (0 = ON, 1 = OFF)
   - Verify code matches your relay module type
5. **Check EEPROM:**
   - Relay state may be saved incorrectly
   - Try re-uploading firmware to reset

### Problem: Serial Communication Issues (Hybrid Setup)

**Symptoms:**
- Arduino and ESP8266 not communicating
- Garbled data or no data

**Solutions:**
1. **Check baud rate:** Both must be 115200
2. **Check level shifter:**
   - Verify HV/LV connections (5V/3.3V)
   - Test level shifter with multimeter
3. **Check wiring:**
   - Arduino TX1 → ESP8266 RX
   - Arduino RX1 → ESP8266 TX
   - Common GND essential
4. **Verify firmware:**
   - Both boards have correct firmware uploaded
   - Serial ports initialized correctly
5. **Test individually:**
   - Test each board's Serial output separately
   - Verify each board works standalone first

### Problem: System Resets or Crashes

**Symptoms:**
- Board resets during operation
- Unexpected behavior

**Solutions:**
1. **Check power supply:**
   - Insufficient power causes resets
   - Use adequate power supply
   - Check for voltage drops
2. **Check wiring:**
   - Short circuits cause resets
   - Verify no accidental connections
3. **Check code:**
   - Memory issues (heap fragmentation)
   - Infinite loops
   - Watchdog timer resets (ESP boards)
4. **Add delays:**
   - Some operations may need delays
   - Check Serial Monitor for error messages

### Getting More Help

If problems persist:

1. **Check Serial Monitor output:**
   - Look for error messages
   - Note any patterns in errors

2. **Verify hardware:**
   - Test components individually
   - Use multimeter to check connections
   - Try known-good components

3. **Review documentation:**
   - Check Technical Documentation for details
   - Verify your setup matches documentation

4. **Community resources:**
   - Arduino forums
   - ESP8266/ESP32 community forums
   - GitHub issues (if applicable)

---

## Appendix: Quick Reference

### Command Format (Arduino)
- Format: `XXXXX,` (5 digits + comma)
- Minimum: `00452,` (452ms)
- Maximum: `99999,` (99999ms = ~100 seconds)
- Example: `01000,` = 1 second

### Default WiFi Settings (ESP8266)
- SSID: "Sedna" (or as configured)
- Password: "123456789" (or as configured)
- IP: 192.168.4.1

### Pin Reference

**Arduino Mega:**
- Pin 2: Temperature sensor
- Pin 4: Control output 1
- Pin 5: Control output 2 (main)
- Pin 6: Control output 3

**ESP8266 (NodeMCU):**
- D2 (GPIO4): Temperature sensor
- D0 (GPIO16): Relay 1
- D1 (GPIO5): Relay 2
- D2 (GPIO4): Relay 3
- D3 (GPIO0): Relay 4

### Serial Monitor Settings
- Baud Rate: 115200
- Line ending: Both NL & CR or Newline

---

**End of User Manual**

For technical details, refer to **Technical_Documentation.md**

