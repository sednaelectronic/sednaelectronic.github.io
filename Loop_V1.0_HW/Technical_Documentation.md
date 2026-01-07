# Laser Loop v1 - Technical Documentation

## Table of Contents
1. [System Overview](#system-overview)
2. [Hardware Technical Documentation](#hardware-technical-documentation)
3. [Firmware / Embedded Software Documentation](#firmware--embedded-software-documentation)
4. [Communication Protocols](#communication-protocols)
5. [Build and Deployment](#build-and-deployment)

---

## System Overview

Laser Loop v1 is a distributed vehicle detection system consisting of sensor/client units and a master/receiver unit. The system uses LiDAR distance measurement sensors to detect vehicle presence and transmits detection data wirelessly to a central master unit for traffic monitoring and control applications.

### System Architecture

```
┌─────────────────┐         ┌─────────────────┐
│  Sensor Unit 1  │         │  Sensor Unit 2  │
│  (ESP8266)      │         │  (ESP8266)      │
│  - TFMini       │         │  - TFMini       │
│  - NRF24L01     │         │  - NRF24L01     │
│  - WiFi         │         │  - WiFi         │
└────────┬────────┘         └────────┬────────┘
         │                            │
         │    NRF24L01 (2.4GHz)       │
         │                            │
         └────────────┬───────────────┘
                      │
         ┌────────────▼────────────┐
         │    Master Unit          │
         │    (STM32F030K6Tx)     │
         │    - NRF24L01 Rx        │
         │    - 16 GPIO Outputs    │
         │    - Serial Output      │
         └─────────────────────────┘
```

---

## Hardware Technical Documentation

### A. Sensor/Client Unit Hardware Design

#### Microcontroller
- **Part**: ESP8266 (ESP-12E module)
- **Architecture**: 32-bit Tensilica L106
- **Clock Speed**: 80 MHz (default), up to 160 MHz
- **Flash Memory**: 4 MB (typical)
- **RAM**: 80 KB user data RAM
- **GPIO**: Multiple configurable I/O pins
- **Justification**: Provides integrated WiFi for web-based configuration, sufficient processing power for distance measurement algorithm, and built-in serial communication for TFMini sensor interface.

#### Distance Measurement Sensor
- **Part**: TFMini LiDAR Distance Sensor
- **Interface**: UART (Serial)
- **Baud Rate**: 115200 bps
- **Measurement Range**: 0.3m to 12m (typical)
- **Update Rate**: Up to 100 Hz
- **Protocol**: 9-byte data frame
  - Header: 0x59, 0x59 (2 bytes)
  - Distance: Low byte, High byte (2 bytes)
  - Strength: Low byte, High byte (2 bytes)
  - Temperature: Low byte, High byte (2 bytes)
  - Checksum: Sum of first 8 bytes modulo 256 (1 byte)
- **Connection**: Connected to ESP8266 hardware Serial (UART0)

#### Wireless Communication Module
- **Part**: NRF24L01+ 2.4GHz Transceiver
- **Interface**: SPI
- **Frequency**: 2.400 - 2.525 GHz (ISM band)
- **Data Rate**: 2 Mbps (configured)
- **Power Output**: 0 dBm (configured)
- **Range**: Up to 100m (line of sight, typical)
- **SPI Connections**:
  - CE (Chip Enable): GPIO 16
  - CSN (Chip Select): GPIO 15
  - MOSI, MISO, SCK: Hardware SPI pins
- **Address**: Configurable 5-byte address (default: "00100")

#### Power Supply
- **Input**: External DC power supply (typically 5V or 12V)
- **Regulation**: On-board voltage regulators for 3.3V and 5V rails
- **Protection**: Reverse polarity protection, overcurrent protection
- **Current Consumption**: 
  - ESP8266: ~80mA active, ~20mA idle
  - NRF24L01: ~13mA TX, ~12mA RX
  - TFMini: ~100mA typical
  - Total: ~200mA typical

#### Configuration Interface
- **WiFi**: ESP8266 integrated WiFi module
  - Access Point mode for initial configuration
  - Station mode for network connectivity
  - Web server on port 80
  - Secure HTTPS update server on port 443
- **Web Terminal**: WiFiTerm library for serial-like web interface
- **EEPROM**: Non-volatile storage for configuration parameters

#### PCB Specifications (Slave Unit)
- **Board Size**: 60.056mm × 50.038mm
- **Layers**: 2-layer PCB
- **Components**: 38 components
- **Connections**: 96 routed connections
- **Via Count**: 34 vias
- **Track Widths**: 0.0152mm to 2.016mm (various signal and power traces)

### B. Master Unit Hardware Design

#### Microcontroller
- **Part**: STM32F030K6Tx
- **Architecture**: ARM Cortex-M0
- **Package**: LQFP32
- **Clock Speed**: 8 MHz (HSE external oscillator)
- **Flash Memory**: 32 KB
- **RAM**: 4 KB
- **GPIO**: 26 I/O pins available
- **Justification**: Low-cost, low-power microcontroller with sufficient I/O for 16 output channels and SPI interface for NRF24L01 communication.

#### Wireless Communication Module
- **Part**: NRF24L01+ 2.4GHz Transceiver
- **Interface**: SPI1
- **SPI Configuration**:
  - Mode: Master, Full Duplex
  - Data Size: 8-bit
  - Baud Rate Prescaler: 4 (2 Mbps at 8 MHz system clock)
  - Clock Polarity: Low (CPOL = 0)
  - Clock Phase: 1 Edge (CPHA = 0)
- **GPIO Connections**:
  - CE (Chip Enable): PA3 (SPI1_CC)
  - CSN (Chip Select): PA4 (SPI1_CS)
  - SCK: PA5 (SPI1_SCK)
  - MISO: PA6 (SPI1_MISO)
  - MOSI: PA7 (SPI1_MOSI)
- **Address**: 0x00, 0xDD, 0xCC, 0xBB, 0xAA (5 bytes)
- **Channel**: Configurable (default: 10)
- **Data Pipe**: Pipe 2 enabled for reception

#### Digital Output Channels
- **Total Channels**: 16
- **Configuration**: Push-pull output, low speed
- **Pin Mapping**:
  - OUT1: PA0
  - OUT2: PA1
  - OUT3: PA2
  - OUT4: PA8
  - OUT5: PA9
  - OUT6: PA10
  - OUT7: PA11
  - OUT8: PA12
  - OUT9: PA15
  - OUT10: PB0
  - OUT11: PB1
  - OUT12: PB3
  - OUT13: PB4
  - OUT14: PB5
  - OUT15: PB6
  - OUT16: PB7
- **Logic Levels**: 
  - Logic 0: 0V (GPIO_PIN_RESET)
  - Logic 1: 3.3V (GPIO_PIN_SET)
- **Current Sourcing**: Each output can source up to 20mA (typical)

#### Serial Communication
- **Interface**: UART (not explicitly configured in current firmware, but available)
- **Purpose**: Output data to external systems
- **Format**: To be defined based on application requirements

#### Power Supply
- **Input**: External DC power supply
- **Regulation**: On-board voltage regulators
- **Protection**: Standard power supply protection circuits
- **Current Consumption**:
  - STM32F030: ~10mA active
  - NRF24L01: ~12mA RX
  - GPIO outputs: Depends on load
  - Total: ~50mA typical (without external loads)

#### PCB Specifications (Master Unit)
- **Board Size**: 94.615mm × 79.629mm
- **Layers**: 2-layer PCB
- **Components**: 92 components
- **Connections**: 176 routed connections
- **Via Count**: 48 vias
- **Track Widths**: 0.0254mm to 2.016mm (various signal and power traces)

### C. Component Selection and Justification

#### ESP8266 Selection
- Integrated WiFi eliminates need for separate WiFi module
- Sufficient processing power for real-time distance measurement processing
- Built-in UART for TFMini sensor communication
- Low cost and wide availability
- Extensive software library support

#### STM32F030K6Tx Selection
- Cost-effective ARM Cortex-M0 microcontroller
- Sufficient I/O pins for 16 output channels plus SPI
- Low power consumption suitable for continuous operation
- HAL library support simplifies development
- Adequate flash and RAM for application requirements

#### NRF24L01+ Selection
- Low-cost 2.4GHz transceiver
- Simple SPI interface
- Configurable channels for multi-sensor networks
- Adequate range for typical traffic monitoring applications
- Low power consumption

#### TFMini Selection
- Compact LiDAR sensor suitable for vehicle detection
- UART interface simplifies integration
- Good measurement range (0.3m to 12m) for traffic applications
- Reliable distance measurement in various lighting conditions

### D. Power Supply Design and Protection

#### Sensor Unit Power Supply
- **Input Protection**: Reverse polarity protection diode
- **Voltage Regulation**: 
  - 5V rail: Linear regulator (if 12V input) or direct (if 5V input)
  - 3.3V rail: Low-dropout regulator for ESP8266 and NRF24L01
- **Decoupling**: Multiple capacitors for noise filtering
- **Current Limiting**: Fuse or polyfuse for overcurrent protection

#### Master Unit Power Supply
- **Input Protection**: Reverse polarity protection
- **Voltage Regulation**: 3.3V LDO regulator
- **Decoupling**: Decoupling capacitors on all power rails
- **Ground Plane**: Dedicated ground plane for noise reduction

### E. Communication Interfaces

#### LoRa / NRF24L01 Wireless Communication
- **Protocol**: Proprietary packet-based protocol
- **Packet Structure**: 
  - Variable length packets (up to 32 bytes)
  - String-based commands (e.g., "i1", "o1", "p1", "D1", "d1")
  - No explicit packet header/checksum in current implementation
- **Channel Selection**: Configurable RF channel (0-125)
- **Addressing**: 5-byte address for network identification
- **Data Rate**: 2 Mbps
- **Reliability**: No automatic retransmission (configured)

#### Bluetooth / WiFi Configuration
- **WiFi Interface**: ESP8266 integrated WiFi
  - Access Point mode: SSID "esp", Password "123456789"
  - Web server on port 80
  - Web terminal interface for configuration
- **Configuration Parameters**:
  - Base value (mid): Stored in EEPROM address 4
  - Tunnel/Sensor number: Stored in EEPROM address 8
  - Configuration via web terminal: Format "XXXX," where XXXX is the value

#### Serial Communication
- **Baud Rate**: 115200 bps (ESP8266 to TFMini)
- **Data Format**: 8 data bits, no parity, 1 stop bit
- **Protocol**: TFMini 9-byte frame protocol

### F. PCB Layout Considerations

#### Sensor Unit (Slave)
- **Component Placement**: 
  - ESP8266 module centrally located
  - TFMini sensor connector near edge for easy mounting
  - NRF24L01 module with antenna clearance
  - Power supply components isolated from sensitive analog sections
- **Routing**:
  - Power traces: 1mm minimum width for main power rails
  - Signal traces: 0.1mm to 0.3mm for digital signals
  - Ground plane: Continuous ground plane on bottom layer
- **Antenna Considerations**: NRF24L01 antenna should have clearance from ground plane and other components

#### Master Unit
- **Component Placement**:
  - STM32F030 centrally located
  - Output connectors arranged for easy wiring
  - NRF24L01 module with proper antenna placement
  - Power supply section isolated
- **Routing**:
  - Power distribution: Star topology for clean power distribution
  - Signal integrity: Short traces for high-speed signals (SPI)
  - Ground plane: Dedicated ground plane

### G. Connectors and Pin Mapping

#### Sensor Unit Connectors
- **Power Input**: DC power connector (typically 2.1mm barrel jack or screw terminal)
- **TFMini Sensor**: UART connector (3-pin: VCC, GND, TX/RX)
- **Programming**: ESP8266 programming header (optional, for firmware updates)

#### Master Unit Connectors
- **Power Input**: DC power connector
- **Output Channels**: 16-pin connector or individual screw terminals
  - OUT1 through OUT16 as defined in pin mapping
- **Serial Output**: UART connector (optional, for external communication)
- **Programming**: SWD connector (PA13: SWDIO, PA14: SWCLK)

---

## Firmware / Embedded Software Documentation

### A. Microcontroller Selection and Overview

#### Sensor Unit Firmware (ESP8266)
- **Platform**: Arduino/ESP8266 Core
- **Main File**: `Program/ESP/loop_terminal/loop_terminal.ino`
- **Key Libraries**:
  - ESP8266WiFi: WiFi connectivity
  - RF24: NRF24L01 communication
  - TFMini: LiDAR sensor interface (custom)
  - WiFiTerm: Web-based terminal interface
  - ESP_EEPROM: Non-volatile configuration storage

#### Master Unit Firmware (STM32F030K6Tx)
- **Platform**: STM32 HAL (STM32Cube)
- **IDE**: Keil MDK-ARM
- **Main File**: `Program/STM/Core/Src/main.c`
- **Key Libraries**:
  - STM32 HAL: Hardware abstraction layer
  - Custom NRF24L01 driver: `Program/STM/NRF24L01-master/`

### B. Firmware Architecture

#### Sensor Unit Architecture
```
┌─────────────────────────────────────┐
│         Main Loop                    │
│  ┌───────────────────────────────┐  │
│  │  Distance Measurement         │  │
│  │  - TFMini Data Acquisition    │  │
│  │  - Checksum Validation        │  │
│  └──────────────┬────────────────┘  │
│                 │                     │
│  ┌──────────────▼────────────────┐  │
│  │  Detection Algorithm          │  │
│  │  - Base Value Comparison     │  │
│  │  - Threshold Logic           │  │
│  │  - State Machine              │  │
│  └──────────────┬────────────────┘  │
│                 │                     │
│  ┌──────────────▼────────────────┐  │
│  │  Wireless Transmission        │  │
│  │  - NRF24L01 Packet Format    │  │
│  │  - Command Generation         │  │
│  └───────────────────────────────┘  │
│                                      │
│  ┌───────────────────────────────┐  │
│  │  Web Server                    │  │
│  │  - Configuration Interface    │  │
│  │  - Terminal Interface         │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

#### Master Unit Architecture
```
┌─────────────────────────────────────┐
│         Main Loop                    │
│  ┌───────────────────────────────┐  │
│  │  NRF24L01 Reception           │  │
│  │  - Data Available Check       │  │
│  │  - Packet Reception           │  │
│  └──────────────┬────────────────┘  │
│                 │                     │
│  ┌──────────────▼────────────────┐  │
│  │  Command Parsing              │  │
│  │  - String Comparison          │  │
│  │  - Channel Identification     │  │
│  └──────────────┬────────────────┘  │
│                 │                     │
│  ┌──────────────▼────────────────┐  │
│  │  GPIO Control                 │  │
│  │  - Output Channel Selection   │  │
│  │  - Logic Level Setting        │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

### C. Distance Measurement and Processing Algorithm

#### TFMini Data Acquisition
The TFMini sensor outputs distance data via UART in a 9-byte frame format:

```c
Frame Structure:
[0x59][0x59][Dist_L][Dist_H][Strength_L][Strength_H][Temp_L][Temp_H][Checksum]

Distance Calculation:
distance = Dist_L + (Dist_H * 256)

Checksum Validation:
checksum = (Sum of bytes 0-7) % 256
```

#### Detection Algorithm
The sensor unit implements a threshold-based detection algorithm:

1. **Base Value (mid)**: Stored baseline distance measurement
   - Configured via web interface
   - Stored in EEPROM address 4
   - Used as reference for vehicle detection

2. **Detection Logic** (from `loop_terminal.ino`):
   ```c
   if (distance < (mid * 200)) {
       if (distance < (mid * 100)) {
           // Vehicle detected below threshold
           // Measure duration
           if (duration > 8000ms) {
               // Long duration: Vehicle entered
               Send "i1" (in) or "i2" (in channel 2)
           } else {
               // Short duration: Passing vehicle
               Send "p1" (passing)
           }
       }
       if (distance > (mid * 100)) {
           // Distance returning to baseline
           if (duration > 8000ms) {
               // Vehicle exited
               Send "o1" (out) or "o2" (out channel 2)
           } else {
               Send "p1" (passing)
           }
       }
   }
   ```

3. **State Machine**:
   - **Flag 0**: No vehicle detected (baseline state)
   - **Flag 1**: Vehicle detected below threshold
   - **Flag 2**: Vehicle in secondary detection zone (mid to mid*2)

4. **Timing Logic**:
   - Duration measurement using `millis()`
   - 8000ms threshold to distinguish stationary vehicles from passing vehicles
   - Prevents false triggers from brief obstructions

### D. Wireless Communication Protocol and Packet Structure

#### Packet Format
Current implementation uses simple string-based commands:

**Transmitted Packets** (from sensor to master):
- Format: 3-byte character array
- Examples:
  - `"i1"` - Vehicle entered, sensor 1
  - `"i2"` - Vehicle entered, sensor 2
  - `"o1"` - Vehicle exited, sensor 1
  - `"o2"` - Vehicle exited, sensor 2
  - `"p1"` - Vehicle passing, sensor 1
  - `"p2"` - Vehicle passing, sensor 2

**Received Packets** (master receives):
- Format: Up to 32 bytes (NRF24L01 payload limit)
- String-based commands for GPIO control:
  - `"D1"` through `"D16"` - Set output channel HIGH
  - `"d1"` through `"d16"` - Set output channel LOW

#### NRF24L01 Configuration
**Transmitter (Sensor Unit)**:
```c
Address: "00100" (5 bytes)
Channel: Configurable (default not explicitly set in code)
Data Rate: 2 Mbps
Power: 0 dBm
Payload Size: Variable (typically 3 bytes)
```

**Receiver (Master Unit)**:
```c
Address: {0x00, 0xDD, 0xCC, 0xBB, 0xAA}
Channel: 10
Data Pipe: Pipe 2
Payload Size: 32 bytes
Auto ACK: Disabled
```

### E. Configuration Handling

#### Configuration Parameters

1. **Base Value (mid)**:
   - **Storage**: EEPROM address 4 (2 bytes, integer)
   - **Range**: 0 to 65535 (distance in cm)
   - **Configuration**: Via web terminal
     - Format: `"XXXX,"` where XXXX is the base value
     - Example: `"1200,"` sets base value to 1200 cm
   - **Purpose**: Baseline distance measurement for vehicle detection threshold

2. **Sensor/Tunnel Number (num)**:
   - **Storage**: EEPROM address 8 (1 byte)
   - **Range**: 1 to 16 (sensor identification)
   - **Configuration**: Via web terminal
     - Format: `"XXXX#"` where XXXX is the sensor number
     - Example: `"0001#"` sets sensor number to 1
   - **Purpose**: Identifies which sensor is transmitting (used in packet format)

3. **LoRa/NRF24L01 Channel**:
   - **Storage**: Not persistently stored (set in code)
   - **Configuration**: Requires firmware modification
   - **Purpose**: RF channel selection for network isolation

4. **Device ID**:
   - **Storage**: Implicit in sensor number
   - **Configuration**: Via sensor number setting
   - **Purpose**: Unique identification in multi-sensor networks

#### Configuration Interface

**Web Terminal Access**:
1. Connect to ESP8266 WiFi access point (SSID: "esp", Password: "123456789")
2. Open web browser to device IP address
3. Access web terminal interface
4. Send configuration commands:
   - Base value: `"XXXX,"` (e.g., `"1200,"`)
   - Sensor number: `"XXXX#"` (e.g., `"0001#"`)

**EEPROM Storage**:
- Library: ESP_EEPROM
- Initialization: `EEPROM.begin(100)` - allocates 100 bytes
- Write: `EEPROM.put(address, value)` followed by `EEPROM.commit()`
- Read: `EEPROM.get(address, variable)`

### F. Master Unit Logic for Handling 16 Sensors

#### Reception Logic
```c
// Check for data availability on pipe 2
if (isDataAvailable(2) == 1) {
    // Receive packet
    NRF24_Receive(RxData);
    
    // Parse command
    Check_Data((char*)RxData);
}
```

#### Command Parsing
The master unit uses string comparison to identify commands:

```c
void Check_Data(char * RxData_Value) {
    // GPIO Set commands (uppercase D)
    if (strcmp(RxData_Value, "D1") == 0) {
        HAL_GPIO_WritePin(GPIOA, GPIO_PIN_0, GPIO_PIN_SET);  // OUT1 HIGH
    }
    if (strcmp(RxData_Value, "d1") == 0) {
        HAL_GPIO_WritePin(GPIOA, GPIO_PIN_0, GPIO_PIN_RESET); // OUT1 LOW
    }
    // ... similar for D2-d2 through D16-d16
}
```

**Note**: Current implementation has a bug - all D1-D16 commands control the same GPIO pin (PA0). This should be fixed to map each command to the correct output channel.

#### Output Channel Mapping
- **OUT1**: PA0 (should respond to "D1"/"d1")
- **OUT2**: PA1 (should respond to "D2"/"d2")
- **OUT3**: PA2 (should respond to "D3"/"d3")
- **OUT4**: PA8 (should respond to "D4"/"d4")
- **OUT5**: PA9 (should respond to "D5"/"d5")
- **OUT6**: PA10 (should respond to "D6"/"d6")
- **OUT7**: PA11 (should respond to "D7"/"d7")
- **OUT8**: PA12 (should respond to "D8"/"d8")
- **OUT9**: PA15 (should respond to "D9"/"d9")
- **OUT10**: PB0 (should respond to "D10"/"d10")
- **OUT11**: PB1 (should respond to "D11"/"d11")
- **OUT12**: PB3 (should respond to "D12"/"d12")
- **OUT13**: PB4 (should respond to "D13"/"d13")
- **OUT14**: PB5 (should respond to "D14"/"d14")
- **OUT15**: PB6 (should respond to "D15"/"d15")
- **OUT16**: PB7 (should respond to "D16"/"d16")

### G. Serial Output Format and Timing

#### Current Implementation
The master unit firmware does not currently implement serial output. The serial interface is available but not configured in the current code.

#### Recommended Serial Output Format
For future implementation, suggested format:

```
Format: <sensor_id>,<event_type>,<timestamp>\r\n

Examples:
1,i,1234567890\r\n    (Sensor 1, vehicle in, timestamp)
1,o,1234567900\r\n    (Sensor 1, vehicle out, timestamp)
2,p,1234567910\r\n    (Sensor 2, vehicle passing, timestamp)
```

**Baud Rate**: 115200 bps (recommended)
**Data Format**: 8N1 (8 data bits, no parity, 1 stop bit)
**Timing**: Asynchronous, event-driven

### H. Digital Output Channel Control Logic

#### Output States
- **Logic HIGH (1)**: 3.3V, GPIO_PIN_SET
- **Logic LOW (0)**: 0V, GPIO_PIN_RESET

#### Control Flow
1. Master receives wireless packet from sensor
2. Packet is parsed to extract command string
3. Command string is compared against known patterns
4. Corresponding GPIO pin is set to HIGH or LOW
5. Output state persists until next command changes it

#### Initialization
All outputs are initialized to LOW (GPIO_PIN_RESET) during system startup in the `Config()` function.

### I. Firmware Build, Flashing, and Debugging Procedures

#### Sensor Unit (ESP8266)

**Build Environment**:
- **IDE**: Arduino IDE or PlatformIO
- **Board**: NodeMCU 1.0 (ESP-12E Module) or Generic ESP8266 Module
- **Core Version**: ESP8266 Core 2.x or 3.x
- **Required Libraries**:
  - ESP8266WiFi
  - RF24 (by TMRh20)
  - WiFiTerm (custom or similar)
  - ESP_EEPROM

**Build Steps**:
1. Install ESP8266 board support in Arduino IDE
2. Install required libraries via Library Manager
3. Open `Program/ESP/loop_terminal/loop_terminal.ino`
4. Configure WiFi credentials if needed (in code)
5. Select correct board and port
6. Compile (Ctrl+R or Sketch → Verify/Compile)
7. Upload (Ctrl+U or Sketch → Upload)

**Flashing**:
1. Connect ESP8266 via USB-to-Serial adapter
2. Put ESP8266 in bootloader mode (hold FLASH button, press RESET, release FLASH)
3. Select correct COM port in Arduino IDE
4. Click Upload
5. Wait for "Done uploading" message

**Debugging**:
- **Serial Monitor**: 115200 bps, view debug messages
- **Web Terminal**: Access via WiFi for runtime debugging
- **Serial Output**: Connect to UART0 (GPIO1/GPIO3) for TFMini communication monitoring

#### Master Unit (STM32F030K6Tx)

**Build Environment**:
- **IDE**: Keil MDK-ARM v5.32
- **Toolchain**: ARM Compiler v5/v6
- **STM32CubeMX**: Used for initial project generation
- **HAL Library**: STM32Cube FW_F0 V1.11.3

**Build Steps**:
1. Open `Program/STM/MDK-ARM/Program.uvprojx` in Keil
2. Ensure all source files are included in project
3. Set target options:
   - Device: STM32F030K6Tx
   - Flash: 32KB
   - RAM: 4KB
4. Build project (F7 or Project → Build Target)
5. Check for compilation errors

**Flashing**:
1. Connect ST-Link v2 programmer to SWD interface:
   - SWDIO: PA13
   - SWCLK: PA14
   - GND: Ground
   - 3.3V: VDD (if not powered externally)
2. In Keil: Flash → Download (F8)
3. Verify successful programming

**Debugging**:
- **SWD Debugger**: Use ST-Link with Keil debugger
- **Breakpoints**: Set in code for step-by-step debugging
- **Watch Variables**: Monitor variables in real-time
- **Serial Output**: Configure UART for debug messages (not currently implemented)

**Hardware Debugging**:
- **Logic Analyzer**: Monitor SPI communication with NRF24L01
- **Oscilloscope**: Verify GPIO output states
- **Multimeter**: Check power supply voltages

---

## Communication Protocols

### NRF24L01 Packet Protocol

#### Transmission (Sensor → Master)
```
Packet Structure:
[Command Byte 1][Command Byte 2][Terminator/Channel]

Examples:
"i1" - Vehicle in, sensor 1
"o1" - Vehicle out, sensor 1  
"p1" - Vehicle passing, sensor 1
```

#### Reception (Master ← Sensor)
```
Expected Format:
"D1" to "D16" - Set output HIGH
"d1" to "d16" - Set output LOW
```

### TFMini Serial Protocol

#### Frame Format
```
Byte 0: 0x59 (Header)
Byte 1: 0x59 (Header)
Byte 2: Distance Low Byte
Byte 3: Distance High Byte
Byte 4: Strength Low Byte
Byte 5: Strength High Byte
Byte 6: Temperature Low Byte
Byte 7: Temperature High Byte
Byte 8: Checksum (Sum of bytes 0-7) % 256
```

#### Data Extraction
```c
distance = Byte2 + (Byte3 * 256)
strength = Byte4 + (Byte5 * 256)
temperature = (Byte6 + (Byte7 * 256)) / 8 - 256
```

---

## Build and Deployment

### System Integration

1. **Sensor Unit Setup**:
   - Flash firmware to ESP8266
   - Connect TFMini sensor to UART
   - Connect NRF24L01 to SPI pins
   - Apply power and configure via WiFi

2. **Master Unit Setup**:
   - Flash firmware to STM32F030
   - Connect NRF24L01 to SPI1
   - Connect output channels to external systems
   - Apply power

3. **Network Configuration**:
   - Configure each sensor with unique sensor number
   - Set appropriate base values for each installation location
   - Ensure all units use same NRF24L01 channel
   - Verify wireless communication range

### Testing Procedures

1. **Sensor Unit Testing**:
   - Verify TFMini distance readings via web terminal
   - Test base value configuration
   - Verify NRF24L01 transmission (use receiver test code)
   - Check WiFi connectivity

2. **Master Unit Testing**:
   - Verify NRF24L01 reception
   - Test GPIO output control with known commands
   - Verify all 16 output channels function correctly
   - Test with multiple sensor units

3. **System Integration Testing**:
   - Deploy sensor units at test locations
   - Configure appropriate base values
   - Verify detection accuracy
   - Test master unit response to sensor events
   - Measure system latency

---

## Appendix

### Pin Reference Tables

#### ESP8266 (Sensor Unit) - Key Pins
| Function | GPIO | Notes |
|----------|------|-------|
| NRF24L01 CE | 16 | Chip Enable |
| NRF24L01 CSN | 15 | Chip Select |
| UART0 TX | GPIO1 | TFMini RX |
| UART0 RX | GPIO3 | TFMini TX |

#### STM32F030K6Tx (Master Unit) - Key Pins
| Function | Pin | GPIO | Notes |
|----------|-----|------|-------|
| OUT1 | 2 | PA0 | Digital Output 1 |
| OUT2 | 3 | PA1 | Digital Output 2 |
| OUT3 | 4 | PA2 | Digital Output 3 |
| SPI1_CE | 5 | PA3 | NRF24L01 CE |
| SPI1_CS | 6 | PA4 | NRF24L01 CSN |
| SPI1_SCK | 7 | PA5 | NRF24L01 SCK |
| SPI1_MISO | 8 | PA6 | NRF24L01 MISO |
| SPI1_MOSI | 9 | PA7 | NRF24L01 MOSI |
| OUT4 | 18 | PA8 | Digital Output 4 |
| OUT5 | 19 | PA9 | Digital Output 5 |
| OUT6 | 20 | PA10 | Digital Output 6 |
| OUT7 | 21 | PA11 | Digital Output 7 |
| OUT8 | 22 | PA12 | Digital Output 8 |
| SWDIO | 23 | PA13 | Debug Interface |
| SWCLK | 24 | PA14 | Debug Interface |
| OUT9 | 25 | PA15 | Digital Output 9 |
| OUT10 | 15 | PB0 | Digital Output 10 |
| OUT11 | 16 | PB1 | Digital Output 11 |
| OUT12 | 26 | PB3 | Digital Output 12 |
| OUT13 | 27 | PB4 | Digital Output 13 |
| OUT14 | 28 | PB5 | Digital Output 14 |
| OUT15 | 29 | PB6 | Digital Output 15 |
| OUT16 | 30 | PB7 | Digital Output 16 |

### Known Issues and Limitations

1. **Master Unit GPIO Mapping Bug**: All D1-D16 commands currently control PA0. This needs to be fixed to map each command to the correct output pin.

2. **No Packet Acknowledgment**: NRF24L01 is configured without auto-ACK, so packet loss may occur without detection.

3. **Limited Error Handling**: Current firmware has minimal error handling for communication failures.

4. **No Serial Output on Master**: Serial communication interface is not implemented in master unit firmware.

5. **Fixed NRF24L01 Address**: Sensor units use hardcoded address "00100". For multi-sensor networks, addresses should be configurable.

### Future Enhancements

1. Implement proper GPIO mapping in master unit command parser
2. Add packet acknowledgment and retry logic
3. Implement serial output on master unit for external system integration
4. Add configurable NRF24L01 addresses per sensor
5. Implement sensor health monitoring and reporting
6. Add encryption for wireless communication
7. Implement time synchronization across sensors
8. Add data logging capabilities

---

*Document Version: 1.0*  
*Last Updated: Based on project files analysis*  
*Project: Laser Loop v1*

