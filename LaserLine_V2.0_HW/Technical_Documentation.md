# Linear Laser v2.0 - Technical Documentation

## Document Information
- **Version:** 2.0
- **Target Audience:** Electronics Engineers, Embedded Software Developers
- **Last Updated:** 2025

---

## Table of Contents
1. [Hardware Technical Documentation](#hardware-technical-documentation)
2. [Firmware / Embedded Software Documentation](#firmware--embedded-software-documentation)
3. [System Integration](#system-integration)

---

## Hardware Technical Documentation

### System Block Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Linear Laser v2.0 System                  │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐      ┌──────────────┐                      │
│  │   ESP32      │      │   MCP4822    │                      │
│  │ Microcontroller│ SPI │ 12-bit DAC  │                      │
│  │              │◄────►│             │                      │
│  └──────┬───────┘      └──────┬───────┘                      │
│         │                     │                              │
│         │ GPIO                │ Analog Output                │
│         │                     │                              │
│  ┌──────▼───────┐      ┌──────▼───────┐                      │
│  │   Relay      │      │   Galvo      │                      │
│  │   Control    │      │   Driver     │                      │
│  │   Circuit    │      │   Circuit    │                      │
│  └──────┬───────┘      └──────┬───────┘                      │
│         │                     │                              │
│         │                     │                              │
│  ┌──────▼───────┐      ┌──────▼───────┐                      │
│  │   Laser      │      │   Galvo      │                      │
│  │   Module     │      │   Motors     │                      │
│  │              │      │   (X & Y)    │                      │
│  └──────────────┘      └──────────────┘                      │
│                                                               │
│  ┌──────────────────────────────────────┐                     │
│  │      Power Supply Unit               │                     │
│  │  (Separate PCB - LM2596 based)       │                     │
│  └──────────────────────────────────────┘                     │
│                                                               │
│  ┌──────────────────────────────────────┐                     │
│  │      WiFi Communication              │                     │
│  │      (TCP Server Port 8088)         │                     │
│  │      (HTTP Server Port 80 - OTA)    │                     │
│  └──────────────────────────────────────┘                     │
└─────────────────────────────────────────────────────────────┘
```

### Microcontroller Selection and Pin Mapping

#### Microcontroller: ESP32
- **Model:** ESP32 (Dual-core Xtensa LX6)
- **Operating Frequency:** 240 MHz (default)
- **Flash Memory:** Configurable (typically 4MB+)
- **RAM:** 520 KB SRAM
- **WiFi:** 802.11 b/g/n (Station and Access Point modes)
- **Communication:** SPI, I2C, UART, WiFi, TCP/IP

#### Pin Mapping

| Function | GPIO Pin | Direction | Description |
|----------|----------|-----------|-------------|
| MCP4822 CS | GPIO 5 | Output | SPI Chip Select for DAC |
| MCP4822 SPI | GPIO 18, 19, 23 | I/O | SPI MOSI, MISO, CLK (default ESP32 SPI) |
| Laser Relay | GPIO 32 | Output | Controls laser module power |
| Galvo Controller 1 Relay | GPIO 33 | Output | Controls X-axis galvo power |
| Galvo Controller 2 Relay | GPIO 25 | Output | Controls Y-axis galvo power |
| Main Controller Relay | GPIO 26 | Output | Controls main system power |
| PC Controller Relay | GPIO 27 | Output | Controls PC/computer power |
| Status LED | GPIO 32 | Output | Shared with Laser Relay |
| Status LED 2 | GPIO 26 | Output | Shared with Main Controller Relay |
| Serial Debug | GPIO 1, 3 | I/O | UART0 (USB Serial) |
| Serial2 (Optional) | Configurable | I/O | Secondary UART for configuration |

**Note:** GPIO 32 and GPIO 26 are shared between relay control and LED indication in some firmware variants.

### Galvanometer Motor Drive Circuitry

The system uses two galvanometer motors (galvos) for X and Y axis control. The galvo drive circuitry consists of:

1. **DAC Output Stage:**
   - MCP4822 dual-channel 12-bit DAC
   - Resolution: 4096 steps (0-4095)
   - Output voltage range: 0-4.096V (high gain mode)
   - Channel A: X-axis control signal
   - Channel B: Y-axis control signal

2. **Signal Conditioning:**
   - DAC outputs are fed to operational amplifier stages (ILDA Opamp circuit)
   - Amplification and offset adjustment for galvo driver compatibility
   - Filtering to reduce noise and ensure smooth motion

3. **Galvo Driver Interface:**
   - Analog voltage control inputs (typically ±5V or ±10V range)
   - Separate power supply for galvo drivers (via relay control)
   - Galvo drivers convert analog signals to motor current

4. **Relay Control:**
   - Independent relay control for each galvo driver
   - Allows power sequencing and safety shutdown
   - GPIO 33 (Galvo Controller 1) and GPIO 25 (Galvo Controller 2)

### Laser Driver Design

1. **Laser Module Control:**
   - Relay-based power control (GPIO 32)
   - Laser module receives power through relay contacts
   - Enables/disables laser output for safety

2. **Power Sequencing:**
   - Galvo controllers must be powered before laser activation
   - Prevents laser operation without galvo control
   - Controlled via firmware logic

3. **Safety Considerations:**
   - Hardware relay provides physical power isolation
   - Software can disable laser independently
   - Emergency shutdown capability

### Power Supply and Protection Circuits

#### Main Power Supply (Separate PCB)
- **Regulator:** LM2596-based switching regulator
- **Input:** AC/DC adapter (voltage range per design specifications)
- **Outputs:** Multiple regulated outputs for:
  - ESP32 (3.3V)
  - Galvo drivers
  - Laser module
  - Control circuits

#### Protection Features:
1. **Overcurrent Protection:** Fuses or current limiting
2. **Reverse Polarity Protection:** Diode protection on input
3. **Voltage Regulation:** Stable outputs for sensitive components
4. **Power Sequencing:** Controlled via relay outputs

### Signal Generation (DAC / PWM) and Filtering

#### MCP4822 DAC Configuration

**SPI Interface:**
- **Chip Select (CS):** GPIO 5
- **SPI Mode:** Mode 0 (CPOL=0, CPHA=0)
- **Clock Speed:** Typically 1-10 MHz (ESP32 default SPI speed)
- **Data Format:** 16-bit words per channel

**DAC Specifications:**
- **Resolution:** 12 bits (4096 levels)
- **Channels:** 2 independent channels (A and B)
- **Gain Setting:** High gain (2x) - Output range 0-4.096V
- **Update Rate:** Limited by SPI speed and firmware loop timing
- **Typical Update Frequency:** Several kHz (depends on trajectory algorithm)

**Channel Configuration:**
```cpp
// Channel A: X-axis galvo control
dac.setGainA(MCP4822::High);  // 0-4.096V output
dac.turnOnChannelA();

// Channel B: Y-axis galvo control  
dac.setGainB(MCP4822::High);  // 0-4.096V output
dac.turnOnChannelB();
```

**Signal Filtering:**
- Low-pass filtering in op-amp stage (ILDA Opamp circuit)
- Reduces high-frequency noise from DAC switching
- Ensures smooth galvo motion
- Typical cutoff frequency: Several kHz to tens of kHz

### PCB Layout Considerations

#### Controller PCB Specifications:
- **Board Size:** 134.874mm × 101.473mm
- **Layers:** 2-layer design
- **Components:** 141 components
- **Routing Completion:** 99.38% (323 of 325 connections routed)
- **Via Count:** 127 plated vias (0.7112mm diameter)

#### Layout Guidelines:
1. **Analog/Digital Separation:**
   - DAC and analog signal paths isolated from digital noise
   - Ground plane separation where possible
   - Careful routing of SPI signals near analog sections

2. **Power Distribution:**
   - Adequate trace widths for power rails
   - Decoupling capacitors near ICs
   - Star grounding for analog sections

3. **Signal Integrity:**
   - Controlled impedance for high-speed signals (SPI)
   - Short traces for analog signals
   - Minimize loop areas for noise reduction

4. **Thermal Management:**
   - Adequate copper pour for heat dissipation
   - Component spacing for airflow
   - Consideration for relay heat generation

### Laser Safety and Electrical Protection Considerations

#### Laser Safety:
1. **Class Compliance:** System must comply with applicable laser safety classes (typically Class 3R or 4)
2. **Interlock Systems:** Hardware/software interlocks prevent unsafe operation
3. **Beam Control:** Galvo system ensures controlled beam direction
4. **Emergency Shutdown:** Multiple shutdown paths (software and hardware)
5. **Warning Labels:** Appropriate laser warning labels required on enclosure

#### Electrical Protection:
1. **Galvanic Isolation:** Relay-based isolation for high-power sections
2. **Overvoltage Protection:** TVS diodes or similar on sensitive inputs
3. **ESD Protection:** ESD protection on exposed connectors
4. **Ground Fault Protection:** Proper grounding and isolation
5. **Fuse Protection:** Appropriate fusing on power inputs

---

## Firmware / Embedded Software Documentation

### Firmware Architecture Overview

#### Main Firmware Variants:
1. **LaserLine_OTA_TCP:** Single-core implementation with TCP control
2. **LaserLine_OTA_TCP_MultiCore:** Dual-core implementation (trajectory on Core 1, TCP on Core 0)
3. **Linear_Laser_ControllerV2:** Web dashboard variant with ESP-Dash

#### Core Components:
- **WiFi Communication:** TCP server (port 8088) and HTTP server (port 80)
- **DAC Control:** MCP4822 SPI interface
- **Relay Control:** GPIO-based power management
- **Trajectory Generation:** Line and circle drawing algorithms
- **OTA Updates:** Over-the-air firmware updates via HTTP

### Galvo Control and Trajectory Generation Algorithms

#### Line Drawing Algorithm

**Principle:**
The line drawing algorithm generates a linear trajectory by incrementing X and Y coordinates proportionally.

**Implementation:**
```cpp
// Line drawing variables
float voltage = 0;      // Y-axis DAC value
float voltage2 = 1;     // X-axis DAC value (starting point)
int Time = 0;           // Y-axis position (0-2500 range)
float Time2 = 1;        // X-axis end position (calculated from length)

// Line drawing loop
void Draw_Line(void) {
    dac.setVoltageA(voltage2);        // X-axis
    dac.setVoltageB(voltage * 2);    // Y-axis (scaled)
    dac.updateDAC();
    
    if (voltage2 * 2 >= Time2) {
        voltage2 = Start_Point;       // Reset to start position
    }
    
    voltage = Time;                   // Set Y position
    voltage2 = voltage2 + 3.2;       // Increment X position
}
```

**Lookup Tables:**
The firmware uses predefined lookup tables for line length and start point calibration:

```cpp
// Line length lookup table (in arbitrary units)
float Line_Data[15] = {0, 160, 266, 344, 398, 440, 474, 500, 522, 540, 556, 570, 582, 592};

// Start point lookup table
float Point_Data[15] = {0, 160, 270, 340, 398, 440, 472, 498, 520, 540, 554, 568, 580, 590};
```

**Length Calculation:**
```cpp
Time2 = (Line_Data[Length] * 8.2);  // Convert lookup value to DAC range
Start_Point = ((Point_Data[Start_Pointt] / 2) * 8.2);  // Start position
```

#### Circle Drawing Algorithm

**Principle:**
Circle generation uses trigonometric functions (sine and cosine) to calculate X and Y coordinates for each angle step.

**Implementation:**
```cpp
float pi = 3.14159265;
int valx = 2040;  // Center X coordinate (midpoint of 12-bit DAC)
int valy = 2040;  // Center Y coordinate

// Circle drawing loop
for (int times = 0; times < 15; times++) {  // Repeat 15 times
    for (int grad = 0; grad < 360; grad += 5) {  // 5-degree steps
        float rad = 2 * pi * (grad / 360.0);  // Convert to radians
        valx = cos(rad) * 270 + 2040;        // X = radius*cos(angle) + center
        valy = sin(rad) * 2000 + 2040;      // Y = radius*sin(angle) + center
        dac.setVoltageA(valx);
        dac.setVoltageB(valy);
        dac.updateDAC();
    }
}
```

**Parameters:**
- **Radius X:** 270 DAC units (horizontal)
- **Radius Y:** 2000 DAC units (vertical) - elliptical circle
- **Center:** 2040 (approximately midpoint of 0-4095 range)
- **Step Size:** 5 degrees (72 points per circle)
- **Repetitions:** 15 complete circles

### Timing, Resolution, and Calibration Methods

#### Timing Characteristics:
- **DAC Update Rate:** Limited by SPI speed and loop execution time
- **Line Drawing Speed:** Variable based on increment value (typically 3.2 DAC units per iteration)
- **Circle Drawing:** ~72 points × 15 repetitions = 1080 total points
- **Loop Execution:** Microsecond to millisecond range depending on mode

#### Resolution:
- **DAC Resolution:** 12 bits (4096 levels)
- **Effective Resolution:** Limited by galvo driver characteristics and mechanical precision
- **Coordinate Range:** 0-4095 for each axis
- **Center Position:** ~2040 (midpoint)

#### Calibration:
1. **Lookup Table Calibration:**
   - `Line_Data[]` and `Point_Data[]` arrays contain calibrated values
   - Measured and adjusted for specific hardware configuration
   - Different values for different line lengths and start positions

2. **Scaling Factors:**
   - Multiplier 8.2 converts lookup table values to DAC range
   - Y-axis scaling factor of 2 in line drawing
   - Circle radius values (270, 2000) calibrated for desired projection size

3. **Center Calibration:**
   - Center value 2040 represents optical center
   - May require adjustment based on galvo mounting and optical alignment

### TCP Communication Protocol and Command Structure

#### TCP Server Configuration:
- **Port:** 8088
- **Protocol:** TCP (connection-oriented)
- **Data Format:** ASCII text commands
- **Packet Structure:** Fixed format with delimiters

#### Command Format:

All commands follow the pattern: `[CMD]#[PARAM],...,[PARAM]*[TERM]`

Where:
- `[CMD]` = Command identifier (1 character)
- `#` = Command separator
- `[PARAM]` = Parameter values (4 digits each)
- `*` = Parameter terminator
- `,` = Parameter separator and packet terminator

#### Command Set:

**1. Device On/Off Control:**
```
Format: O#[N|F]*,,
Example: O#N*,  (Device On)
         O#F*,  (Device Off)
```
- **O#N*,** - Turns on: Galvo Controller 1, Galvo Controller 2, Laser
- **O#F*,** - Turns off: Galvo Controller 1, Galvo Controller 2, Laser

**2. Line Configuration:**
```
Format: C#L,XXXX,YYYY*,
Example: C#L,0010,0005*,
```
- **C#L** - Line command
- **XXXX** - Length index (0-13, corresponds to Line_Data array)
- **YYYY** - Start point index (0-13, corresponds to Point_Data array)
- Response: Echoes command and sends calculated Time2 and voltage2 values

**3. Dash Line Configuration:**
```
Format: C#D,XXXX,YYYY*,
Example: C#D,0010,0005*,
```
- **C#D** - Dash line command
- **XXXX** - Length index
- **YYYY** - Start point value
- Similar to line but with dashed pattern (laser modulation)

**4. Settings Configuration:**
```
Format: S#HXXXX,DYYYY*,
Example: S#H0100,D0200*,
```
- **S#H** - Settings command with Height parameter
- **XXXX** - Height value (4 digits)
- **D** - Distance parameter separator
- **YYYY** - Distance value (4 digits)
- Currently stored but not actively used in trajectory generation

#### Command Parsing:

```cpp
// Command validation
if(data[0] == 'O' && data[1] == '#' && data[13] == '*' && data[14] == ',') {
    // Process On/Off command
}

if(data[0] == 'C' && data[1] == '#' && data[13] == '*' && data[14] == ',') {
    if(data[2] == 'L' && data[3] == ',' && data[8] == ',') {
        // Process Line command
        // Extract parameters from positions 4-7 and 9-12
    }
}

if(data[0] == 'S' && data[1] == '#' && data[13] == '*' && data[14] == ',') {
    // Process Settings command
}
```

#### Response Format:
- **Success:** Echo of command or status message (e.g., "Device On")
- **Error:** "Bad Request" for invalid commands
- **Data:** Additional lines for calculated values (Time2, voltage2)

### Connection to Server-Side Application

#### TCP Client Connection:
1. **Server Setup:**
   - ESP32 acts as TCP server
   - Listens on port 8088
   - Accepts incoming connections

2. **Connection Handling:**
   ```cpp
   WiFiServer server2(8088);
   server2.begin();
   
   WiFiClient client = server2.available();
   if (client) {
       while (client.connected()) {
           // Process commands
       }
   }
   ```

3. **Client Requirements:**
   - Connect to ESP32 IP address on port 8088
   - Send commands in specified format
   - Receive responses
   - Handle connection drops gracefully

#### Network Configuration:
- **WiFi Mode:** Station (STA) mode - connects to existing network
- **SSID/Password:** Configured in firmware (currently hardcoded)
- **IP Address:** Obtained via DHCP
- **Connection Status:** Monitored via `WiFi.status()`

### Firmware Update Mechanism (OTA)

#### Over-The-Air Update Implementation:

**Library:** AsyncElegantOTA

**HTTP Server:**
- **Port:** 80
- **Endpoint:** `/update` (POST)
- **Method:** Multipart form data upload

**Update Process:**
1. Client connects to ESP32 HTTP server
2. Uploads firmware binary file via POST to `/update`
3. ESP32 receives file in chunks
4. Writes to flash memory
5. Validates and reboots with new firmware

**Implementation:**
```cpp
#include <AsyncElegantOTA.h>

AsyncWebServer server(80);

void setup() {
    // ... WiFi setup ...
    
    server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
        request->send(200, "text/plain", 
            "Sedna Laser Line V1 \r\nSupport: Info@sednasmartsolution.com");
    });
    
    AsyncElegantOTA.begin(&server);
    server.begin();
}
```

**Update Procedure:**
1. Compile firmware to `.bin` file
2. Access ESP32 IP address in web browser
3. Navigate to OTA update page (if web interface implemented)
4. Upload `.bin` file
5. Wait for upload completion
6. Device reboots automatically

**Safety Features:**
- Update validation before reboot
- Rollback capability (if bootloader supports)
- Connection timeout handling

### Error Handling and Recovery

#### Error Types and Handling:

1. **WiFi Connection Failures:**
   - Retry mechanism in setup
   - Status monitoring
   - Graceful degradation (local operation if WiFi fails)

2. **TCP Connection Errors:**
   - Client disconnection detection
   - Connection state monitoring
   - Automatic cleanup on disconnect

3. **Command Parsing Errors:**
   - Invalid command detection
   - "Bad Request" response
   - Continues operation despite errors

4. **DAC Communication Errors:**
   - SPI communication failures (handled by library)
   - No explicit error checking in current implementation

5. **Memory Errors:**
   - Buffer overflow protection (fixed-size buffers)
   - String handling with length checks

#### Recovery Mechanisms:
- **Watchdog Timer:** ESP32 hardware watchdog (if enabled)
- **Automatic Reboot:** On critical errors (if implemented)
- **State Persistence:** Limited (most state is volatile)

### Firmware Build, Flashing, and Debugging Procedures

#### Build Environment:
- **Platform:** Arduino IDE or PlatformIO
- **Board:** ESP32 Dev Module (or compatible)
- **Core Version:** ESP32 Arduino Core (version as per project requirements)
- **Partition Scheme:** Default or custom (for OTA support)

#### Required Libraries:
```cpp
#include <WiFi.h>                    // ESP32 WiFi
#include <AsyncTCP.h>                // Async TCP for ESP32
#include <ESPAsyncWebServer.h>       // Async web server
#include <AsyncElegantOTA.h>         // OTA updates
#include <MCP48xx.h>                 // MCP4822 DAC library
```

#### Build Steps:
1. Install ESP32 board support in Arduino IDE
2. Install required libraries via Library Manager
3. Open firmware `.ino` file
4. Configure WiFi credentials (if needed)
5. Select board: "ESP32 Dev Module"
6. Select partition scheme (if OTA: "Huge APP" or custom)
7. Compile (Verify)
8. Upload via USB or OTA

#### Flashing Procedures:

**Via USB (Serial):**
1. Connect ESP32 via USB cable
2. Select correct COM port
3. Press and hold BOOT button (if required)
4. Click Upload in Arduino IDE
5. Release BOOT button when upload starts

**Via OTA:**
1. Ensure device is on same network
2. Access OTA update interface
3. Upload compiled `.bin` file
4. Wait for completion and reboot

#### Debugging:

**Serial Debug Output:**
- **Baud Rate:** 115200
- **Port:** USB Serial (UART0)
- **Debug Messages:** Command processing, status updates, errors

**Debugging Tips:**
1. Enable Serial output for command tracing
2. Monitor TCP connections and data
3. Check WiFi connection status
4. Verify DAC output values via oscilloscope
5. Use logic analyzer for SPI communication analysis

**Common Issues:**
- **WiFi Connection:** Check SSID/password, signal strength
- **TCP Connection:** Verify IP address, firewall settings
- **DAC Output:** Check SPI wiring, CS pin configuration
- **Relay Control:** Verify GPIO pin assignments, relay power

---

## System Integration

### Hardware-Firmware Interface

#### SPI Communication:
- **MCP4822 Library:** Handles SPI protocol details
- **CS Pin Management:** Automatic via library
- **Data Format:** 16-bit words for DAC commands

#### GPIO Control:
- **Relay Outputs:** Direct GPIO control (HIGH/LOW)
- **No PWM:** Simple digital on/off control
- **Current Sourcing:** ESP32 GPIO can source/sink limited current (check specifications)

### Performance Characteristics

#### Update Rates:
- **Line Drawing:** ~100-1000 updates/second (depends on increment and loop timing)
- **Circle Drawing:** ~72 points per circle, multiple repetitions
- **TCP Response:** Millisecond range (network dependent)

#### Latency:
- **Command Processing:** <10ms typically
- **DAC Update:** Microsecond range (SPI speed dependent)
- **Network Latency:** Variable (WiFi dependent)

### System Limitations

1. **Single Client TCP:** One connection at a time
2. **No Command Queue:** Commands processed immediately
3. **Fixed Command Format:** Limited flexibility
4. **No Persistent Storage:** Settings not saved across reboots
5. **Limited Error Recovery:** Basic error handling

---

## Appendix

### Pin Assignment Summary

| GPIO | Function | Notes |
|------|----------|-------|
| 5 | MCP4822 CS | SPI Chip Select |
| 18 | SPI MOSI | Default ESP32 SPI |
| 19 | SPI MISO | Default ESP32 SPI |
| 23 | SPI CLK | Default ESP32 SPI |
| 25 | Galvo Controller 2 Relay | Y-axis galvo power |
| 26 | Main Controller Relay | Main system power |
| 27 | PC Controller Relay | PC/computer power |
| 32 | Laser Relay | Laser module power |
| 33 | Galvo Controller 1 Relay | X-axis galvo power |

### Lookup Table Reference

**Line Length Table (Line_Data):**
```
Index:  0    1    2    3    4    5    6    7    8    9   10   11   12   13
Value:  0   160  266  344  398  440  474  500  522  540  556  570  582  592
```

**Start Point Table (Point_Data):**
```
Index:  0    1    2    3    4    5    6    7    8    9   10   11   12   13
Value:  0   160  270  340  398  440  472  498  520  540  554  568  580  590
```

### Command Examples

**Turn device on:**
```
O#N*,
```

**Configure line (length index 10, start point index 5):**
```
C#L,0010,0005*,
```

**Configure dash line:**
```
C#D,0010,0005*,
```

**Set height and distance:**
```
S#H0100,D0200*,
```

---

**End of Technical Documentation**

