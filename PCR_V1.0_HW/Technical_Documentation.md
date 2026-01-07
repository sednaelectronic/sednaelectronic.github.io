# PCR v1.0 - Technical Documentation

## Document Information
- **Project**: PCR v1.0 (Polymerase Chain Reaction Controller)
- **Version**: 1.0
- **Target Audience**: Electronics Engineers and Embedded Developers
- **Last Updated**: Based on current codebase analysis

---

## A. Hardware-Oriented Technical Documentation

### A.1 Supported Development Boards

The project currently supports the following development boards:

#### Arduino Platform
- **Arduino Mega 2560**
  - ATmega2560 microcontroller
  - Operating voltage: 5V
  - Digital I/O pins: 54 (of which 15 provide PWM output)
  - Serial ports: 4 (Serial, Serial1, Serial2, Serial3)
  - Clock speed: 16 MHz

#### ESP Platform
- **ESP8266** (NodeMCU or compatible)
  - Tensilica L106 32-bit processor
  - Operating voltage: 3.3V
  - Digital I/O pins: 17
  - WiFi: 802.11 b/g/n
  - Clock speed: 80 MHz (default) or 160 MHz

- **ESP32** (compatible code exists)
  - Dual-core Tensilica LX6 processor
  - Operating voltage: 3.3V
  - Digital I/O pins: 34
  - WiFi: 802.11 b/g/n
  - Bluetooth: BLE 4.2
  - Clock speed: 240 MHz

### A.2 Implied Hardware Components and Peripherals

#### Temperature Sensing
- **OneWire Temperature Sensor** (DS18B20 or compatible)
  - Interface: OneWire protocol
  - Temperature range: -55°C to +125°C
  - Accuracy: ±0.5°C (typical)
  - Power: 3.0V to 5.5V
  - Connection: Requires pull-up resistor (typically 4.7kΩ)

#### Relay Modules
- **4-Channel Relay Module** (for ESP8266 implementations)
  - Control voltage: 3.3V or 5V (depending on module)
  - Relay contacts: Typically 10A @ 250VAC or 10A @ 30VDC
  - Isolation: Optocoupler isolation between control and load circuits

#### Communication Interfaces
- **UART/Serial Communication**
  - Used for inter-board communication (Arduino ↔ ESP)
  - Baud rate: 115200 bps (standard across implementations)
  - Voltage levels: 5V TTL (Arduino Mega) / 3.3V TTL (ESP8266)
  - **Note**: Level shifting required between 5V Arduino and 3.3V ESP8266

- **WiFi Interface** (ESP8266/ESP32 only)
  - Protocol: IEEE 802.11 b/g/n
  - Mode: Access Point (AP) mode
  - Security: WPA2-PSK (password protected)
  - Default IP: 192.168.4.1 (typical for ESP AP mode)

### A.3 Pin Usage and Mapping

#### Arduino Mega 2560 Implementation

| Pin | Function | Direction | Notes |
|-----|----------|-----------|-------|
| 2 | OneWire Bus (Temperature Sensor) | INPUT | Requires pull-up resistor (4.7kΩ to VCC) |
| 3 | Digital Input | INPUT | Purpose not explicitly defined in code |
| 4 | Control Output 1 | OUTPUT | Pulse control signal |
| 5 | Control Output 2 | OUTPUT | Main operation control |
| 6 | Control Output 3 | OUTPUT | Stop/Reset signal |
| 0 (RX) | Serial RX | - | USB Serial communication |
| 1 (TX) | Serial TX | - | USB Serial communication |
| 18 (TX1) | Serial1 TX | - | Hardware UART TX |
| 19 (RX1) | Serial1 RX | - | Hardware UART RX |

#### ESP8266 Implementation (NodeMCU Pin Mapping)

| Pin | Function | Direction | Notes |
|-----|----------|-----------|-------|
| D0 (GPIO16) | Relay1 / LED1 | OUTPUT | Active LOW relay control |
| D1 (GPIO5) | Relay2 / LED2 | OUTPUT | Active LOW relay control |
| D2 (GPIO4) | Relay3 | OUTPUT | Active LOW relay control |
| D3 (GPIO0) | Relay4 | OUTPUT | Active LOW relay control |
| GPIO2 | OneWire Bus (Temperature Sensor) | INPUT | Requires pull-up resistor (4.7kΩ to 3.3V) |
| GPIO16 | LED1 (in some implementations) | OUTPUT | Alternative pin assignment |

**Note**: ESP8266 pin mapping uses NodeMCU D-pin notation. Actual GPIO numbers differ.

#### ESP32 Implementation

| Pin | Function | Direction | Notes |
|-----|----------|-----------|-------|
| GPIO16 | LED1 | OUTPUT | Control output |
| GPIO5 | LED2 | OUTPUT | Control output |
| GPIO2 | OneWire Bus (Temperature Sensor) | INPUT | Requires pull-up resistor (4.7kΩ to 3.3V) |

### A.4 Power and Voltage Assumptions

#### Arduino Mega 2560
- **Operating Voltage**: 5V DC
- **Input Voltage (recommended)**: 7-12V DC
- **Input Voltage (limits)**: 6-20V DC
- **Digital I/O Voltage**: 5V logic levels
- **Current Consumption**: ~50-100mA (board only, excluding peripherals)

#### ESP8266
- **Operating Voltage**: 3.3V DC
- **Input Voltage (USB)**: 5V DC (on-board regulator to 3.3V)
- **Digital I/O Voltage**: 3.3V logic levels (NOT 5V tolerant)
- **Current Consumption**: 
  - Active: ~80-170mA
  - WiFi TX: ~170mA
  - Deep Sleep: ~20µA

#### ESP32
- **Operating Voltage**: 3.3V DC
- **Input Voltage (USB)**: 5V DC (on-board regulator to 3.3V)
- **Digital I/O Voltage**: 3.3V logic levels
- **Current Consumption**: 
  - Active: ~80-240mA
  - WiFi TX: ~240mA
  - Deep Sleep: ~10µA

#### Power Supply Considerations
- **Level Shifting Required**: When connecting Arduino Mega (5V) to ESP8266/ESP32 (3.3V), use level shifters or voltage dividers
- **Relay Module Power**: Verify relay module operating voltage (3.3V or 5V compatible)
- **Temperature Sensor**: Can operate on 3.3V or 5V (verify sensor specifications)

### A.5 Communication Interfaces

#### Serial/UART Communication
- **Protocol**: Asynchronous serial (UART)
- **Baud Rate**: 115200 bps
- **Data Format**: 8 data bits, no parity, 1 stop bit (8N1)
- **Usage**: 
  - Command reception on Arduino Mega
  - Inter-board communication
  - Debug output via Serial Monitor

#### OneWire Protocol
- **Protocol**: Dallas OneWire
- **Physical Layer**: Single data line with pull-up resistor
- **Data Rate**: Variable (typically 15.4 kbps)
- **Devices**: DS18B20 temperature sensors
- **Library**: DallasTemperature (Arduino) / OneWire (Arduino)

#### WiFi (ESP8266/ESP32)
- **Standard**: IEEE 802.11 b/g/n
- **Mode**: Access Point (AP) mode
- **Security**: WPA2-PSK
- **Default SSID**: Various (e.g., "Sedna", "Wifi 4Load", "ESPWebServer")
- **Default Password**: Various (e.g., "123456789", "87654321", "12345678")
- **IP Address**: Typically 192.168.4.1 (ESP AP mode default)
- **Port**: 80 (HTTP)

#### HTTP Protocol
- **Method**: GET requests
- **Server**: ESP8266WebServer or ESPAsyncWebServer
- **Content Type**: text/html, text/plain
- **Endpoints**: 
  - `/` - Main web interface
  - `/temp` - Temperature reading (AJAX endpoint)
  - `/status` - System status (AJAX endpoint)
  - `/get` - Command submission
  - `/L1on`, `/L1off`, etc. - Relay control

#### EEPROM (ESP8266)
- **Size**: 512 bytes (typical)
- **Usage**: State persistence for relay states
- **Addresses**: 
  - Address 1: Relay1 state
  - Address 2: Relay2 state
  - Address 3: Relay3 state
  - Address 4: Relay4 state

### A.6 Notes for Future Custom PCB Design

#### Critical Considerations
1. **Voltage Level Compatibility**
   - Implement level shifters between 5V Arduino and 3.3V ESP sections
   - Or standardize on 3.3V logic throughout

2. **Power Supply Design**
   - Provide separate power domains for digital logic and relay coils
   - Include proper decoupling capacitors (100nF ceramic + 10µF tantalum per IC)
   - Consider power sequencing if using multiple voltage rails

3. **OneWire Bus Design**
   - Include 4.7kΩ pull-up resistor on OneWire data line
   - Route OneWire bus away from high-speed digital signals
   - Consider ESD protection on external sensor connection

4. **Relay Driver Circuitry**
   - Use optocouplers for isolation between microcontroller and relay coils
   - Include flyback diodes across relay coils
   - Consider using dedicated relay driver ICs (e.g., ULN2003, ULN2803)

5. **Serial Communication**
   - Include proper termination resistors if long traces
   - Consider RS-232 or RS-485 if long-distance communication needed
   - Add ESD protection on external serial connections

6. **WiFi Antenna**
   - For ESP8266/ESP32: Ensure proper antenna matching network
   - Keep antenna area clear of ground planes and metal
   - Consider external antenna connector for better range

7. **Thermal Management**
   - Consider heat sinking for power components
   - Ensure adequate spacing for temperature sensor accuracy

8. **EMC Considerations**
   - Add ferrite beads on power lines
   - Proper grounding strategy
   - Shielding for sensitive analog sections

---

## B. Firmware / Software Technical Documentation

### B.1 Firmware Architecture Overview

The PCR v1.0 firmware consists of multiple implementations targeting different hardware platforms:

#### Architecture Variants

1. **Arduino Mega 2560 Standalone**
   - File: `mega2560_macrowave/mega2560_macrowave.ino`
   - Purpose: Core timing and control logic
   - Communication: Serial/UART for command reception

2. **ESP8266 Web Server Variants**
   - Files: Multiple implementations in `web/` directory
   - Purpose: Web-based control interface
   - Communication: WiFi (AP mode), Serial (to Arduino)

3. **Hybrid Architecture** (Inferred)
   - ESP8266 handles web interface and WiFi
   - Arduino Mega handles precise timing and control
   - Serial communication bridges the two

### B.2 Main Program Flow and State Machines

#### Arduino Mega 2560 Implementation Flow

```
Initialization:
├── Serial.begin(115200)
├── Serial1.begin(115200)
├── Initialize OneWire temperature sensor
├── Configure GPIO pins (2=INPUT, 3=INPUT, 4-6=OUTPUT)
├── Set initial output states (4=LOW, 5=LOW, 6=HIGH then LOW)
└── Ready state

Main Loop:
├── Check Serial1.available() for commands
├── Check Serial.available() for commands
├── Parse comma-delimited timing value
├── Validate timing value (minimum 450ms)
├── If valid command received:
│   ├── Send confirmation message
│   ├── Pulse output 4 (200ms HIGH)
│   ├── Wait 1000ms
│   ├── Send "START" message
│   ├── Pulse output 5 (200ms HIGH) - Begin operation
│   ├── Enter timing loop:
│   │   ├── Read temperature every 300ms
│   │   ├── Transmit temperature via Serial/Serial1
│   │   └── Continue for (H-400) milliseconds
│   ├── Send "STOP" message
│   ├── Pulse output 6 (200ms HIGH) - End operation
│   ├── Calculate and transmit elapsed time
│   └── Reset command variable
└── Repeat
```

**State Machine** (Simplified):
- **IDLE**: Waiting for command
- **CONFIRMED**: Command received and validated
- **RUNNING**: Operation in progress (output 5 active)
- **COMPLETE**: Operation finished, returning to IDLE

#### ESP8266 Web Server Flow

```
Initialization:
├── Serial.begin(115200)
├── Initialize WiFi in AP mode
├── Configure relay/LED GPIO pins
├── Initialize EEPROM and read saved states
├── Initialize OneWire temperature sensor (if present)
├── Set up HTTP server routes
└── Start web server on port 80

Main Loop:
├── server.handleClient() - Process HTTP requests
├── Update relay states based on EEPROM values
├── Read temperature (if sensor present)
└── Repeat
```

**HTTP Request Handling**:
- **GET /** → Send main HTML interface
- **GET /temp** → Return current temperature (AJAX)
- **GET /status** → Return system status (AJAX)
- **GET /get?input1=...** → Process command parameters
- **GET /L1on, /L1off, etc.** → Toggle relay states

### B.3 Core Algorithms and Logic

#### Timing Control Algorithm (Arduino Mega)

```cpp
// Command format: "XXXXX," (5 digits + comma)
// Value represents milliseconds

1. Receive characters until comma delimiter
2. Extract 5-digit number (H)
3. Validate: H must be >= 450ms
4. If invalid, set H = 452ms (minimum)
5. Calculate operation duration: (H - 400)ms
6. Execute operation with temperature monitoring
```

**Timing Precision**:
- Uses `millis()` for timing (millisecond resolution)
- Temperature readings every 300ms during operation
- 400ms overhead subtracted from total time
- Minimum operation time: 50ms (452ms - 400ms)

#### Temperature Reading Algorithm

```cpp
1. Request temperature conversion (sensors.requestTemperatures())
2. Read temperature by sensor index (getTempCByIndex(0))
3. Validate reading (check for DEVICE_DISCONNECTED_C)
4. Format and transmit via Serial/Serial1
5. Handle error case (transmit "Error")
```

**Error Handling**:
- Checks for `DEVICE_DISCONNECTED_C` constant (-127°C)
- Transmits error message if sensor disconnected
- Continues operation even if temperature read fails

#### Command Parsing Algorithm

**Arduino Mega**:
```cpp
String readstring;
char c;

if (Serial.available()) {
    c = Serial.read();
    if (c == ',') {
        // Delimiter found
        readstring = readstring.substring(0, 5); // Limit to 5 digits
        H = readstring.toInt(); // Convert to integer
        readstring = ""; // Clear buffer
    } else {
        readstring += c; // Accumulate characters
    }
}

// Timeout handling: Clear buffer if no data for 1000ms
if ((millis() - mil) > 1000) {
    readstring = "";
    c = 0;
}
```

**ESP8266** (Web Interface):
```cpp
// Parse HTTP GET parameters
if (request->hasParam(PARAM_INPUT_1)) {
    inputMessage = request->getParam(PARAM_INPUT_1)->value();
    // Process command
}

// Format for Serial transmission to Arduino
String command = "#" + value1 + "," + value2 + "," + value3 + ",@";
Serial.println(command);
```

#### Relay State Management (ESP8266)

```cpp
// Relay states stored in EEPROM
// 0 = ON (active LOW relay)
// 1 = OFF

1. Read EEPROM on startup
2. Apply saved states to relays
3. On web command:
   a. Update state variable (0 or 1)
   b. Write to EEPROM
   c. Commit EEPROM changes
   d. Update relay output
   e. Send updated HTML page
```

### B.4 Configuration Parameters

#### Arduino Mega 2560

| Parameter | Value | Description |
|-----------|-------|-------------|
| Serial Baud Rate | 115200 | USB Serial communication |
| Serial1 Baud Rate | 115200 | Hardware UART communication |
| ONE_WIRE_BUS | 2 | Temperature sensor pin |
| Minimum Timing | 450ms | Minimum valid command value |
| Default Timing | 452ms | Fallback if invalid command |
| Overhead Time | 400ms | Subtracted from total operation time |
| Temperature Read Interval | 300ms | During operation |
| Command Timeout | 1000ms | Clear buffer if no delimiter received |
| Pulse Duration | 200ms | Control signal pulse width |
| Start Delay | 1000ms | Delay between confirmation and start |

#### ESP8266 Web Server

| Parameter | Value | Description |
|-----------|-------|-------------|
| Serial Baud Rate | 115200 | Debug and Arduino communication |
| WiFi Mode | AP (Access Point) | Network mode |
| HTTP Port | 80 | Web server port |
| EEPROM Size | 512 bytes | Non-volatile storage |
| Temperature Read Interval | 500-2000ms | Varies by implementation |
| AJAX Update Interval | 700-2000ms | Web page refresh rate |

**WiFi Configuration** (varies by implementation):
- SSID: "Sedna", "Wifi 4Load", "ESPWebServer", etc.
- Password: "123456789", "87654321", "12345678", etc.
- IP Address: 192.168.4.1 (typical for AP mode)

#### ESP32/ESP8266 AsyncWebServer

| Parameter | Value | Description |
|-----------|-------|-------------|
| LED1 Pin | GPIO16 | Primary control output |
| LED2 Pin | GPIO5 | Secondary control output |
| ONE_WIRE_BUS | GPIO2 | Temperature sensor pin |
| Temperature Default | 30.00°C | Initial/fallback temperature |

### B.5 Communication Protocols

#### Serial Command Protocol (Arduino Mega)

**Command Format**:
```
"XXXXX,"
```
- `XXXXX`: 5-digit number representing milliseconds (00000-99999)
- `,`: Comma delimiter
- Example: "01000," = 1000 milliseconds

**Response Format**:
```
"confirm X.XXX sec"
"START"
"Temp is: XX.XX"
"STOP"
"end in X.XXX sec"
```

**Error Handling**:
- Invalid commands (non-numeric, too short) → H set to 452ms
- Timeout (no comma within 1000ms) → Buffer cleared
- Sensor error → "Error" message transmitted

#### HTTP Protocol (ESP8266)

**Request Format**:
```
GET /get?input1=value1&input2=value2&input3=value3 HTTP/1.1
Host: 192.168.4.1
```

**Response Format**:
- HTML page with current status
- AJAX endpoints return plain text:
  - `/temp` → Temperature value (e.g., "24.37")
  - `/status` → Status string (e.g., "ON")

**Command Encoding** (ESP to Arduino):
```
"#value1,value2,value3,@"
```
- `#`: Start marker
- `value1, value2, value3`: Comma-separated values
- `@`: End marker

**Stop Command**:
```
"MicroOFF*"
```
- `*`: Stop marker

#### Temperature Data Protocol (Serial)

**Format from Arduino**:
```
"tXXXXX,"
```
- `t`: Temperature prefix
- `XXXXX`: Temperature in hundredths of degree (e.g., 2437 = 24.37°C)
- `,`: Delimiter

**Status Protocol (Serial)**:
```
"sXXXXXXXX%"
```
- `s`: Status prefix
- `XXXXXXXX`: Status string
- `%`: Delimiter

### B.6 Error Handling and Edge Cases

#### Arduino Mega Implementation

1. **Invalid Command Handling**
   - Non-numeric characters: Ignored, buffer cleared on timeout
   - Too short command: H set to 0, then validated to minimum 452ms
   - No delimiter: Buffer cleared after 1000ms timeout

2. **Temperature Sensor Errors**
   - Disconnected sensor: Returns `DEVICE_DISCONNECTED_C` (-127°C)
   - Error message transmitted: "Error"
   - Operation continues despite temperature read failure

3. **Timing Edge Cases**
   - Minimum value enforcement: H < 450 → H = 452
   - Millis() overflow: Not explicitly handled (occurs after ~49 days)
   - Operation duration: (H - 400)ms, minimum 50ms

4. **Serial Buffer Overflow**
   - No explicit buffer size limits
   - String concatenation could cause memory issues with very long inputs
   - Timeout mechanism helps prevent infinite accumulation

#### ESP8266 Implementation

1. **WiFi Connection Failures**
   - AP mode: No connection required, always available
   - STA mode (commented out): Would fail silently if WiFi unavailable

2. **EEPROM Errors**
   - No validation of EEPROM reads
   - Default state if EEPROM uninitialized: Undefined (could be 255)
   - No error checking on EEPROM.commit()

3. **Web Server Errors**
   - 404 handler for unknown routes
   - No timeout handling for long-running requests
   - No connection limit enforcement

4. **Temperature Sensor Errors**
   - Similar to Arduino: Checks for `DEVICE_DISCONNECTED_C`
   - Returns last valid reading or default value
   - Web interface may display stale data

5. **Memory Management**
   - String concatenation in HTML generation could cause heap fragmentation
   - No explicit memory cleanup
   - PROGMEM used for HTML templates (good practice)

### B.7 Build, Upload, and Debugging Instructions

#### Arduino Mega 2560

**Required Software**:
- Arduino IDE 1.8.x or 2.x
- Arduino AVR Boards package (included by default)

**Required Libraries**:
- OneWire (by Paul Stoffregen)
- DallasTemperature (by Miles Burton)

**Installation Steps**:
1. Open Arduino IDE
2. Install libraries via Library Manager:
   - Sketch → Include Library → Manage Libraries
   - Search "OneWire" → Install
   - Search "DallasTemperature" → Install
3. Select board: Tools → Board → Arduino AVR Boards → Arduino Mega or Mega 2560
4. Select port: Tools → Port → [COM port for your board]
5. Upload: Sketch → Upload (or Ctrl+U)

**Debugging**:
- Open Serial Monitor: Tools → Serial Monitor
- Set baud rate to 115200
- Monitor Serial and Serial1 outputs
- Check pin states with multimeter or oscilloscope

**Common Issues**:
- **Upload fails**: Check USB cable, drivers, port selection
- **No serial output**: Verify baud rate (115200)
- **Temperature sensor not working**: Check wiring, pull-up resistor (4.7kΩ)
- **Commands not received**: Verify Serial/Serial1 connection, baud rate

#### ESP8266

**Required Software**:
- Arduino IDE 1.8.x or 2.x
- ESP8266 Board Support Package

**Board Package Installation**:
1. File → Preferences
2. Add to "Additional Board Manager URLs":
   ```
   https://arduino.esp8266.com/stable/package_esp8266com_index.json
   ```
3. Tools → Board → Boards Manager
4. Search "ESP8266" → Install "esp8266 by ESP8266 Community"
5. Select board: Tools → Board → ESP8266 Boards → NodeMCU 1.0 (ESP-12E Module) or appropriate variant

**Required Libraries**:
- ESP8266WiFi (included with board package)
- ESP8266WebServer (included with board package)
- ESPAsyncWebServer (for async implementations)
- ESPAsyncTCP (dependency for ESPAsyncWebServer)
- OneWire (by Paul Stoffregen)
- DallasTemperature (by Miles Burton)
- EEPROM (included with board package)

**Library Installation**:
- ESPAsyncWebServer and ESPAsyncTCP: Install via Library Manager or GitHub
- OneWire and DallasTemperature: Same as Arduino Mega

**Upload Settings**:
- Board: NodeMCU 1.0 (ESP-12E Module) or your specific board
- Upload Speed: 115200 (or 921600 for faster uploads)
- CPU Frequency: 80 MHz or 160 MHz
- Flash Size: 4MB (typical)
- Port: Select appropriate COM port

**Upload Steps**:
1. Connect ESP8266 via USB
2. Select correct board and port
3. Upload: Sketch → Upload
4. **Note**: Some boards require holding BOOT button during upload

**Debugging**:
- Serial Monitor at 115200 baud
- Connect to WiFi AP: SSID and password as configured
- Access web interface: http://192.168.4.1
- Check Serial output for IP address and status messages

**Common Issues**:
- **Upload fails**: Hold BOOT button, try different upload speed, check drivers (CH340, CP2102)
- **WiFi AP not visible**: Check SSID/password in code, verify ESP8266 is running
- **Web page not loading**: Verify IP address (check Serial Monitor), try different browser
- **Relay not working**: Check relay module voltage (3.3V vs 5V), verify GPIO pin mapping

#### ESP32

**Required Software**:
- Arduino IDE 1.8.x or 2.x
- ESP32 Board Support Package

**Board Package Installation**:
1. File → Preferences
2. Add to "Additional Board Manager URLs":
   ```
   https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
   ```
3. Tools → Board → Boards Manager
4. Search "ESP32" → Install "esp32 by Espressif Systems"
5. Select board: Tools → Board → ESP32 Arduino → Your ESP32 board variant

**Required Libraries**:
- WiFi (included with board package)
- AsyncTCP (for ESP32)
- ESPAsyncWebServer
- OneWire
- DallasTemperature

**Upload Settings**:
- Similar to ESP8266, but select ESP32 board variant
- May require different drivers (check board manufacturer)

**Debugging**:
- Similar to ESP8266
- Serial Monitor at 115200 baud
- Web interface access same as ESP8266

#### Hybrid System (Arduino + ESP)

**Setup**:
1. Upload firmware to both boards separately
2. Connect Serial1 (Arduino) to Serial (ESP8266) with level shifter
3. Power both boards appropriately
4. Connect temperature sensor to Arduino pin 2
5. Connect control outputs as needed

**Communication Verification**:
- Monitor Serial on both boards
- Send test commands from ESP web interface
- Verify Arduino receives and processes commands
- Check timing accuracy

**Troubleshooting**:
- **No communication**: Check wiring, baud rates (both 115200), level shifting
- **Garbled data**: Voltage level mismatch, check level shifter
- **Commands not working**: Verify command format, check Serial buffer

---

## Document Revision History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | Current | Initial documentation based on codebase analysis | Generated from code analysis |

---

## Notes and Limitations

1. **Code Analysis Based**: This documentation is derived solely from source code analysis. Hardware implementation details are inferred and may require verification.

2. **Multiple Implementations**: The project contains multiple firmware variants. This document covers the most complete implementations.

3. **Assumptions Made**:
   - Temperature sensor is DS18B20 (most common OneWire sensor)
   - Relay modules are active LOW (common configuration)
   - Level shifting required between 5V and 3.3V systems

4. **Future Development**: This documentation should be updated as the project evolves and custom PCB designs are implemented.

