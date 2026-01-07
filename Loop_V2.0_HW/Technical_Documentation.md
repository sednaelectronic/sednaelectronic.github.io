# Laser Loop v2.0 - Technical Documentation

## Table of Contents
1. [System Overview](#system-overview)
2. [Hardware Technical Documentation](#hardware-technical-documentation)
3. [Firmware / Embedded Software Documentation](#firmware--embedded-software-documentation)
4. [Build and Development Instructions](#build-and-development-instructions)

---

## System Overview

Laser Loop v2.0 is a wireless vehicle detection system designed for traffic monitoring and management applications. The system consists of distributed sensor units that detect vehicles using laser distance measurement and a central master/receiver unit that aggregates data from up to 16 sensor units.

### System Architecture

```
┌─────────────────┐         ┌─────────────────┐
│  Sensor Unit 1  │         │  Sensor Unit 2  │
│  (ESP32)        │         │  (ESP32)        │
│  - TFMini       │         │  - TFMini       │
│  - LoRa E32     │         │  - LoRa E32     │
│  - Bluetooth    │         │  - Bluetooth    │
└────────┬────────┘         └────────┬────────┘
         │                           │
         │      LoRa (433MHz)        │
         │      Channel 0x19         │
         │                           │
         └───────────┬───────────────┘
                     │
         ┌───────────▼───────────┐
         │   Master/Receiver     │
         │   (ESP32/ESP8266)     │
         │   - LoRa E32          │
         │   - Serial Output     │
         │   - Digital Outputs   │
         └───────────────────────┘
```

---

## Hardware Technical Documentation

### A. System-Level Block Diagram

#### Sensor Unit Block Diagram

```
                    ┌──────────────┐
                    │   ESP32      │
                    │  Microcontroller│
                    └───┬──────┬───┘
                        │      │
        ┌───────────────┘      └───────────────┐
        │                                      │
┌───────▼────────┐                   ┌────────▼──────┐
│  TFMini Sensor │                   │  LoRa E32    │
│  (UART)        │                   │  Module      │
│  Serial @115200│                   │  Serial2     │
└────────────────┘                   │  @9600       │
                                     └──────────────┘
                                             │
                                     ┌───────▼───────┐
                                     │  Bluetooth    │
                                     │  (ESP32 BLE)  │
                                     └───────────────┘
```

#### Master Unit Block Diagram

```
                    ┌──────────────┐
                    │ ESP32/ESP8266│
                    │ Microcontroller│
                    └───┬──────────┘
                        │
        ┌───────────────┘
        │
┌───────▼────────┐
│  LoRa E32     │
│  Module       │
│  Serial2      │
└───────┬───────┘
        │
┌───────▼───────┐      ┌──────────────┐
│ Serial Output │      │ Digital I/O  │
│ (USB/UART)    │      │ (16 channels)│
└───────────────┘      └──────────────┘
```

### B. Sensor Unit Hardware Design

#### Core Components

1. **ESP32 Microcontroller**
   - Model: ESP32-WROOM-32D (or compatible)
   - Operating Voltage: 3.3V
   - Features:
     - Dual-core 32-bit processor
     - Integrated Bluetooth (BLE/Classic)
     - Multiple UART interfaces
     - EEPROM emulation support
   - Pin Assignments:
     - Serial (UART0): TFMini sensor communication
     - Serial2 (UART2): LoRa E32 module
       - RX: GPIO 25
       - TX: GPIO 26
       - AUX: GPIO 27
       - M0: GPIO 26 (shared with TX)
       - M1: GPIO 27 (shared with AUX)

2. **TFMini Distance Sensor**
   - Type: LiDAR distance measurement sensor
   - Communication: UART (Serial)
   - Baud Rate: 115200 bps
   - Protocol: 9-byte packet format
   - Measurement Range: Typically 0.3m to 12m
   - Accuracy: ±5cm (typical)
   - Power: 5V or 3.3V (depending on module variant)

3. **LoRa E32-TTL-100 Module**
   - Frequency: 433MHz
   - Operating Voltage: 3.3V - 5V
   - Communication: UART
   - Baud Rate: 9600 bps
   - Transmission Power: 17dBm (configurable)
   - Air Data Rate: 4.8kbps
   - Range: Up to several kilometers (line of sight)
   - Pin Connections:
     - VCC: 3.3V/5V
     - GND: Ground
     - TX: ESP32 Serial2 RX (GPIO 25)
     - RX: ESP32 Serial2 TX (GPIO 26)
     - AUX: GPIO 27
     - M0: GPIO 26 (optional, for configuration mode)
     - M1: GPIO 27 (optional, for configuration mode)

4. **Bluetooth Interface**
   - Integrated in ESP32
   - Protocol: Bluetooth Serial (SPP)
   - Device Name: "Loop_Sensor_1" (configurable)
   - PIN: "123456789" (default, configurable)
   - Used for: Configuration and monitoring

5. **EEPROM**
   - Type: Emulated in ESP32 flash memory
   - Size: 128 bytes
   - Storage:
     - Address 1: Base distance value
     - Address 10: Device LoRa address

6. **Power Supply**
   - Input: 5V DC (via USB or external supply)
   - On-board regulation to 3.3V for ESP32
   - Current consumption:
     - Idle: ~80mA
     - Active: ~240mA (peak during LoRa transmission)

#### PCB Layout Considerations

- Board Size: 60.056mm × 50.038mm (from PCB files)
- Layer Count: 2-layer design
- Component Count: 39 components
- Routing: 100% completion, 105 connections
- Key Design Features:
  - Separate power planes for analog and digital sections
  - Proper grounding for RF section (LoRa module)
  - Decoupling capacitors near power pins
  - Antenna placement considerations for LoRa module

### C. Master Unit Hardware Design

#### Core Components

1. **ESP32 or ESP8266 Microcontroller**
   - ESP32 variant (recommended for better performance):
     - Same specifications as sensor unit
   - ESP8266 variant (alternative):
     - Single-core 32-bit processor
     - WiFi capability (not used in this application)
     - Limited UART interfaces (may require SoftwareSerial)

2. **LoRa E32-TTL-100 Module**
   - Same specifications as sensor unit
   - Configuration:
     - Address: Broadcast (0x00/0x00) or specific address
     - Channel: 0x19 (435MHz)
     - Mode: Transparent transmission

3. **Serial Communication Interface**
   - USB-to-Serial converter (on-board or external)
   - Baud Rate: 115200 bps (default)
   - Protocol: ASCII text-based
   - Used for: Data output to external systems

4. **Digital Output Channels** (Optional)
   - 16 digital output channels
   - Logic levels: 3.3V (high), 0V (low)
   - Current capability: Per GPIO specifications (typically 12mA)
   - Mapping: One channel per sensor unit (1-16)

### D. Component Selection and Justification

#### Microcontroller Selection: ESP32

**Justification:**
- Integrated Bluetooth eliminates need for external BT module
- Multiple hardware UARTs support concurrent sensor and LoRa communication
- Sufficient processing power for real-time distance processing
- Low power consumption suitable for battery operation (if needed)
- Extensive GPIO for future expansion
- Cost-effective solution

#### Distance Sensor: TFMini

**Justification:**
- Compact form factor suitable for embedded applications
- UART interface simplifies integration
- Fast update rate (100Hz typical)
- Good accuracy for vehicle detection applications
- Weather-resistant design (depending on variant)
- Cost-effective compared to other LiDAR solutions

#### LoRa Module: E32-TTL-100

**Justification:**
- Long-range communication (up to several km)
- Low power consumption
- License-free ISM band (433MHz)
- Built-in error correction and addressing
- TTL-level interface (no level conversion needed)
- Fixed transmission mode supports addressing for multi-sensor systems

### E. Power Supply and Protection Circuits

#### Sensor Unit Power Supply

```
External 5V ──► [Voltage Regulator] ──► 3.3V ──► ESP32
                      │
                      └──► 3.3V ──► LoRa E32
                      └──► 5V ──► TFMini (if 5V variant)
```

**Protection Features:**
- Input reverse polarity protection (diode or MOSFET)
- Overvoltage protection (TVS diode)
- Decoupling capacitors (100nF ceramic + 10µF tantalum)
- Ferrite beads on power lines to reduce noise

#### Master Unit Power Supply

Similar to sensor unit with additional considerations:
- Higher current capacity for multiple digital outputs
- Optional backup power for continuous operation
- Power monitoring capability

### F. Connectors and Pin Mapping

#### Sensor Unit Connectors

**TFMini Sensor Connector:**
- VCC: 5V (or 3.3V depending on module)
- GND: Ground
- TX: ESP32 Serial RX (GPIO 3)
- RX: ESP32 Serial TX (GPIO 1)

**LoRa E32 Connector:**
- VCC: 3.3V/5V
- GND: Ground
- TX: ESP32 Serial2 RX (GPIO 25)
- RX: ESP32 Serial2 TX (GPIO 26)
- AUX: GPIO 27
- M0: GPIO 26 (optional)
- M1: GPIO 27 (optional)

**Power Connector:**
- VCC: 5V DC input
- GND: Ground

**Programming Connector:**
- USB Type-C or Micro-USB (for ESP32 development boards)
- Provides power and programming interface

#### Master Unit Connectors

**LoRa E32 Connector:**
- Same as sensor unit

**Serial Output Connector:**
- TX: ESP32 Serial TX (GPIO 1)
- RX: ESP32 Serial RX (GPIO 3) - optional
- GND: Ground
- VCC: 5V (if external device requires power)

**Digital Output Connector:**
- 16 GPIO pins (mapped to sensor addresses 1-16)
- Common ground
- Optional: 3.3V power output for external devices

---

## Firmware / Embedded Software Documentation

### A. Microcontroller Overview

#### ESP32 Development Environment

- **IDE**: Arduino IDE or PlatformIO
- **Core**: ESP32 Arduino Core
- **Framework**: Arduino Framework
- **Compiler**: GCC for Xtensa architecture

#### Key Libraries Used

1. **LoRa_E32.h**: LoRa E32 module communication library
2. **BluetoothSerial.h**: ESP32 Bluetooth Serial interface
3. **TFMini.h**: TFMini sensor library (or custom implementation)
4. **EEPROM.h**: Non-volatile storage
5. **Arduino.h**: Core Arduino functions

### B. Firmware Architecture

#### Sensor Unit Firmware Structure

```
Main Loop (loop())
├── Distance Measurement
│   └── getTFminiData()
├── Bluetooth Command Processing
│   ├── Get_Dist,* command
│   ├── Set_Base,XXXX,* command
│   ├── Get_Base,* command
│   ├── Set_Dadd,XXXX,* command
│   └── Get_Dadd,* command
├── Detection Algorithm
│   ├── Compare distance to base value
│   ├── Debounce logic (40ms delay)
│   └── State management (alarmActive flag)
└── LoRa Transmission
    └── sendFixedMessage() when state changes
```

#### Master Unit Firmware Structure

```
Main Loop (loop())
├── LoRa Reception
│   └── receiveMessage()
├── Packet Parsing
│   ├── Validate packet format
│   ├── Extract sensor address
│   ├── Extract vehicle detection status
│   └── Update internal state array
└── Output Generation
    ├── Serial output (standardized format)
    └── Digital output control (optional)
```

### C. Distance Measurement and Processing Algorithm

#### TFMini Data Reception

The TFMini sensor outputs distance data via UART in a 9-byte packet format:

```
Byte 0: 0x59 (Header byte 1)
Byte 1: 0x59 (Header byte 2)
Byte 2: Distance Low byte
Byte 3: Distance High byte
Byte 4: Strength Low byte
Byte 5: Strength High byte
Byte 6: Temperature Low byte
Byte 7: Temperature High byte
Byte 8: Checksum (sum of bytes 0-7, modulo 256)
```

**Processing Algorithm:**

```cpp
void getTFminiData(int* distance, int* strength)
{
  static char i = 0;
  char j = 0;
  int checksum = 0;
  static int rx[9];
  
  if (Serial.available())
  {
    rx[i] = Serial.read();
    
    // Validate header
    if (rx[0] != 0x59) i = 0;
    else if (i == 1 && rx[1] != 0x59) i = 0;
    
    // Process complete packet
    else if (i == 8)
    {
      // Verify checksum
      for (j = 0; j < 8; j++)
        checksum += rx[j];
      
      if (rx[8] == (checksum % 256))
      {
        *distance = rx[2] + rx[3] * 256;
        *strength = rx[4] + rx[5] * 256;
        temp = rx[6] + rx[7] * 256;
      }
      i = 0;
    }
    else i++;
  }
}
```

#### Vehicle Detection Algorithm

The detection algorithm compares the measured distance to a stored base (reference) distance:

```cpp
if(distance - 5 < base_dist) {
  // Vehicle detected (distance decreased by more than 5cm)
  if (!alarmActive) {
    unsigned long currentMillis = millis();
    if (currentMillis - previousMillis >= alarmDelay) { // 40ms debounce
      alarmActive = true;
      // Transmit: car=1
      sprintf(str, "#ch=4,add=%02d,car=%02d*\n", Device_Lora_Add, 1);
      e32ttl100.sendFixedMessage(0, Device_Lora_Add, 0x04, str);
    }
  }
}
else {
  // No vehicle (distance returned to normal)
  if (alarmActive) {
    unsigned long currentMillis2 = millis();
    if (currentMillis2 - previousMillis2 >= alarmDelay) { // 40ms debounce
      alarmActive = false;
      // Transmit: car=0
      sprintf(str, "#ch=4,add=%02d,car=%02d*\n", Device_Lora_Add, 0);
      e32ttl100.sendFixedMessage(0, Device_Lora_Add, 0x04, str);
    }
  }
}
```

**Key Features:**
- Hysteresis: 5cm threshold to prevent oscillation
- Debouncing: 40ms delay to filter noise
- State tracking: `alarmActive` flag prevents duplicate transmissions
- Only transmits on state changes (vehicle arrival or departure)

### D. Wireless Communication Implementation

#### LoRa Configuration

**Default LoRa E32 Settings:**
- Address High (ADDH): Device address (1-16)
- Address Low (ADDL): 0x00
- Channel (CHAN): 0x19 (435MHz)
- UART Baud Rate: 9600 bps
- Air Data Rate: 4.8kbps
- Parity: 8N1 (8 data bits, no parity, 1 stop bit)
- Transmission Mode: Transparent transmission
- FEC: Off
- Transmission Power: 17dBm
- Wake-up Time: 1250ms
- IO Drive Mode: Push-pull with pull-ups

**Configuration Function:**

```cpp
void Lora_Config(int add) {
  e32ttl100.begin();
  ResponseStructContainer c;
  c = e32ttl100.getConfiguration();
  Configuration configuration = *(Configuration*) c.data;
  
  configuration.ADDL = 0x0;
  configuration.ADDH = add;  // Device address
  configuration.CHAN = 0x19; // Channel 25 (435MHz)
  
  configuration.OPTION.fec = FEC_0_OFF;
  configuration.OPTION.fixedTransmission = FT_TRANSPARENT_TRANSMISSION;
  configuration.OPTION.ioDriveMode = IO_D_MODE_PUSH_PULLS_PULL_UPS;
  configuration.OPTION.transmissionPower = POWER_17;
  configuration.OPTION.wirelessWakeupTime = WAKE_UP_1250;
  
  configuration.SPED.airDataRate = AIR_DATA_RATE_011_48;
  configuration.SPED.uartBaudRate = UART_BPS_9600;
  configuration.SPED.uartParity = MODE_00_8N1;
  
  ResponseStatus rs = e32ttl100.setConfiguration(configuration, WRITE_CFG_PWR_DWN_LOSE);
  c.close();
}
```

#### Bluetooth Communication

**Bluetooth Setup:**
- Device Name: "Loop_Sensor_1" (configurable)
- PIN: "123456789" (default, should be changed for security)
- Protocol: Serial Port Profile (SPP)

**Command Protocol:**

Commands are ASCII strings terminated with `*`:

1. **Get Distance**: `Get_Dist,*`
   - Response: `[distance] cm      strength: [strength]`

2. **Set Base Distance**: `Set_Base,XXXX,*`
   - XXXX: 4-digit base distance value (0-9999)
   - Response: `Base\n[value]`

3. **Get Base Distance**: `Get_Base,*`
   - Response: `Base\n[value]`

4. **Set Device Address**: `Set_Dadd,XXXX,*`
   - XXXX: 4-digit device address (1-10, limited in firmware)
   - Response: `Set Device Address\n[address]` or error if > 10

5. **Get Device Address**: `Get_Dadd,*`
   - Response: `Get Device Address\n[address]`

### E. Configuration Handling

#### EEPROM Storage

**Memory Map:**
- Address 1: Base distance value (1 byte, 0-255 cm)
- Address 10: Device LoRa address (1 byte, 1-16)

**EEPROM Operations:**

```cpp
// Read base distance
base_dist = EEPROM.read(base_add);  // base_add = 1

// Write base distance
EEPROM.write(base_add, base_dist);
EEPROM.commit();  // Required for ESP32

// Read device address
Device_Lora_Add = EEPROM.read(add_Device_Lora_Add);  // add_Device_Lora_Add = 10

// Write device address
EEPROM.write(add_Device_Lora_Add, Device_Lora_Add);
EEPROM.commit();
```

**Initialization:**
- On startup, firmware reads stored values from EEPROM
- If EEPROM is uninitialized, default values are used:
  - Base distance: 0
  - Device address: 1

### F. Data Packet Structure and Communication Protocol

#### Sensor-to-Master Packet Format

**LoRa Packet Structure:**
```
Format: #ch=4,add=XX,car=YY*\n

Where:
  #     : Start delimiter
  ch=4  : Channel identifier (fixed)
  add=XX: Device address (2 digits, 01-16)
  car=YY: Vehicle status (2 digits, 00 or 01)
  *     : End delimiter
  \n    : Newline character
```

**Example Packets:**
- Vehicle detected on sensor 1: `#ch=4,add=01,car=01*\n`
- Vehicle cleared on sensor 1: `#ch=4,add=01,car=00*\n`
- Vehicle detected on sensor 5: `#ch=4,add=05,car=01*\n`

**Packet Length:** Approximately 20-25 bytes

#### Master-to-External System Packet Format

**Serial Output Format:**
```
Format: SP3XX[Z1][Z2][Z3]...[Z16]E

Where:
  SP    : Start prefix
  3     : PC/System ID (configurable)
  XX    : Master ID (2 digits)
  Z1-Z16: Zone status (1 byte each, '0' or '1')
  E     : End delimiter
```

**Example Output:**
- Sensor 1 active, others inactive: `SP3121000000000000000E`
- Sensors 1, 3, 5 active: `SP3121010100000000000E`

**Packet Parsing in Master Unit:**

```cpp
if(message[3] == '#' && message[22] == '*') {
  // Valid packet format
  if (message[9]=='a' && message[10]=='d' && message[11]=='d' && message[12]=='=') {
    char value[2];
    value[0] = message[13];
    value[1] = message[14];
    zone_id = atoi(value);  // Extract sensor address
    
    if (message[16]=='c' && message[17]=='a' && message[18]=='r' && message[19]=='=') {
      value[0] = message[20];
      value[1] = message[21];
      car_value = atoi(value);  // Extract vehicle status
      
      // Update internal state
      Send_Packet[5 + zone_id] = (car_value == 1) ? '1' : '0';
    }
  }
}
```

### G. Master Unit Logic for Handling 16 Sensors

#### State Management

The master unit maintains an internal state array for 16 sensor zones:

```cpp
char Send_Packet[27];  // Output packet buffer

// Initialize all zones to '0'
for (int j = 5; j <= 20; j++) {
  Send_Packet[j] = '0';
}

// Update zone based on received packet
if (zone_id >= 1 && zone_id <= 16) {
  Send_Packet[5 + zone_id] = (car_value == 1) ? '1' : '0';
}
```

#### Reception and Processing Flow

1. **LoRa Reception:**
   - Master unit listens continuously on configured channel
   - Uses transparent transmission mode to receive from any address

2. **Packet Validation:**
   - Check start delimiter (`#`)
   - Check end delimiter (`*`)
   - Verify packet structure

3. **Data Extraction:**
   - Parse sensor address (add=XX)
   - Parse vehicle status (car=YY)
   - Validate address range (1-16)

4. **State Update:**
   - Update corresponding zone in state array
   - Maintain timestamp for each zone (optional, for timeout)

5. **Output Generation:**
   - Format serial output packet
   - Update digital outputs (if implemented)
   - Transmit to external system

#### Serial Output Control

The master unit can be triggered to output data via serial:

```cpp
if (Serial.available() > 0) {
  char incomingChar = Serial.read();
  if (incomingChar != '\n') {
    Rec_Packet += String(incomingChar);
    if (incomingChar == 'E') {
      // Check if request matches system ID
      if (Rec_Packet[2] == Send_Packet[2]) {
        // Output current state
        Serial.println(Send_Packet);
      }
    }
  }
}
```

### H. Serial Output Format and Digital Output Control

#### Serial Output Specifications

- **Interface:** UART (USB-to-Serial)
- **Baud Rate:** 115200 bps (default, configurable)
- **Data Format:** 8N1 (8 data bits, no parity, 1 stop bit)
- **Protocol:** ASCII text-based
- **Line Termination:** Newline character (`\n`)

#### Digital Output Control

**Implementation Notes:**
- Each sensor zone (1-16) maps to one digital output channel
- Output state: HIGH (3.3V) = vehicle detected, LOW (0V) = no vehicle
- GPIO pins should be configured as outputs during initialization

**Example Implementation:**

```cpp
// Initialize digital outputs
for (int i = 0; i < 16; i++) {
  pinMode(outputPins[i], OUTPUT);
  digitalWrite(outputPins[i], LOW);
}

// Update outputs based on state
void updateDigitalOutputs() {
  for (int i = 0; i < 16; i++) {
    int state = (Send_Packet[5 + i] == '1') ? HIGH : LOW;
    digitalWrite(outputPins[i], state);
  }
}
```

**GPIO Pin Mapping (Example):**
- Zone 1: GPIO 2
- Zone 2: GPIO 4
- Zone 3: GPIO 5
- ... (continue for all 16 zones)

---

## Build and Development Instructions

### A. Development Environment Setup

#### Required Software

1. **Arduino IDE**
   - Version: 1.8.x or 2.x
   - Download: https://www.arduino.cc/en/software

2. **ESP32 Arduino Core**
   - Installation via Arduino IDE Board Manager
   - URL: https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
   - Package: "esp32" by Espressif Systems

3. **Required Libraries**
   - **LoRa_E32**: LoRa E32 module library
     - Install via Library Manager or manual installation
   - **TFMini**: TFMini sensor library (if using library, otherwise custom implementation)

#### Arduino IDE Configuration

1. Open Arduino IDE
2. Go to File → Preferences
3. Add ESP32 board manager URL (if not already added)
4. Go to Tools → Board → Boards Manager
5. Search for "ESP32" and install
6. Select board: Tools → Board → ESP32 Arduino → "ESP32 Dev Module" (or appropriate variant)

#### Board Settings

**For Sensor Unit (ESP32):**
- Board: "ESP32 Dev Module"
- Upload Speed: 115200
- CPU Frequency: 240MHz
- Flash Frequency: 80MHz
- Flash Mode: QIO
- Flash Size: 4MB
- Partition Scheme: Default
- Core Debug Level: None
- PSRAM: Disabled

**For Master Unit:**
- Same settings as sensor unit (if using ESP32)
- Or select appropriate ESP8266 board if using ESP8266

### B. Firmware Compilation

#### Sensor Unit Firmware

1. Open `Program/Loop_Sensor_V1/Loop_Sensor_V1.ino` (or BTPass variant)
2. Verify all required libraries are installed
3. Configure pin assignments if using different hardware:
   ```cpp
   LoRa_E32 e32ttl100(&Serial2, 25, 26, 27); // RX, AUX, M0, M1
   ```
4. Adjust Bluetooth device name if needed:
   ```cpp
   String device_name = "Loop_Sensor_1";
   ```
5. Click "Verify" to compile
6. Fix any compilation errors

#### Master Unit Firmware

1. Open `Program/Reciver_New/ESP32/Recive/Recive.ino` (or ESP8266 variant)
2. Verify LoRa_E32 library is installed
3. Configure LoRa module pins if different:
   ```cpp
   LoRa_E32 e32ttl(&Serial2, 25, 26, 27);
   ```
4. Click "Verify" to compile

### C. Flashing Instructions

#### Using Arduino IDE

1. Connect ESP32 to computer via USB cable
2. Select correct COM port: Tools → Port → [COM port]
3. For sensor unit:
   - Open sensor firmware
   - Click "Upload" button
   - Wait for compilation and upload to complete
4. For master unit:
   - Open receiver firmware
   - Click "Upload" button
   - Wait for completion

#### Using esptool (Command Line)

```bash
# Install esptool
pip install esptool

# Flash firmware
esptool.py --port COM3 --baud 115200 write_flash 0x1000 firmware.bin
```

#### Boot Mode

- **Normal Operation:** GPIO0 = HIGH (or floating)
- **Download Mode:** GPIO0 = LOW during reset
- Most development boards handle this automatically via USB-to-Serial chip

### D. Debugging Instructions

#### Serial Monitor

1. Open Serial Monitor: Tools → Serial Monitor
2. Configure settings:
   - Baud Rate: 115200 (for sensor unit), 9600 or 115200 (for master)
   - Line ending: Both NL & CR (or Newline)
3. Monitor output for:
   - LoRa configuration status
   - Distance measurements
   - Detection events
   - Error messages

#### Debug Output

**Sensor Unit Debug Points:**
- Distance and strength values (via Bluetooth or Serial)
- LoRa transmission status
- Configuration read/write operations
- Detection state changes

**Master Unit Debug Points:**
- Received LoRa packets (raw)
- Parsed sensor data
- State array updates
- Serial output packets

#### Common Issues and Solutions

1. **LoRa Module Not Responding:**
   - Check wiring connections
   - Verify power supply (3.3V or 5V)
   - Check baud rate settings
   - Ensure M0/M1 pins are in correct state (usually both LOW for normal operation)

2. **TFMini Not Providing Data:**
   - Verify serial connection (TX/RX swapped?)
   - Check baud rate (115200)
   - Ensure power supply is adequate
   - Check sensor alignment and target distance

3. **Bluetooth Not Connecting:**
   - Verify Bluetooth is enabled in ESP32 configuration
   - Check device name and PIN
   - Ensure BluetoothSerial library is properly included

4. **EEPROM Issues:**
   - Call `EEPROM.begin(size)` before read/write operations
   - Always call `EEPROM.commit()` after writes on ESP32
   - Check address ranges (0-127 for 128-byte EEPROM)

5. **Compilation Errors:**
   - Verify all required libraries are installed
   - Check ESP32 board package version compatibility
   - Ensure correct board selection in IDE

### E. Testing Procedures

#### Sensor Unit Testing

1. **Distance Measurement Test:**
   - Connect TFMini sensor
   - Open Serial Monitor
   - Send Bluetooth command: `Get_Dist,*`
   - Verify distance reading is reasonable

2. **Base Distance Configuration:**
   - Send: `Set_Base,0150,*` (set to 150cm)
   - Send: `Get_Base,*`
   - Verify stored value

3. **Device Address Configuration:**
   - Send: `Set_Dadd,0003,*` (set to address 3)
   - Send: `Get_Dadd,*`
   - Verify address and check LoRa reconfiguration

4. **Detection Test:**
   - Set appropriate base distance
   - Place object in sensor field
   - Monitor Bluetooth output for "Detect..." messages
   - Verify LoRa transmission (use master unit or LoRa sniffer)

#### Master Unit Testing

1. **LoRa Reception Test:**
   - Configure master unit
   - Power on sensor unit
   - Monitor Serial output for received packets
   - Verify packet parsing

2. **Multi-Sensor Test:**
   - Configure multiple sensor units with different addresses (1, 2, 3...)
   - Power on all sensors
   - Trigger detections on different sensors
   - Verify master unit correctly updates state for each zone

3. **Serial Output Test:**
   - Connect external system or serial monitor
   - Trigger sensor detections
   - Verify output packet format matches specification

### F. Configuration Management

#### Initial Configuration Procedure

1. **Sensor Unit:**
   - Flash firmware
   - Connect via Bluetooth
   - Set base distance: `Set_Base,XXXX,*`
   - Set device address: `Set_Dadd,XXXX,*`
   - Verify configuration: `Get_Base,*` and `Get_Dadd,*`

2. **Master Unit:**
   - Flash firmware
   - Verify LoRa configuration (channel 0x19, transparent mode)
   - Test reception with known sensor unit

#### Field Configuration

- Configuration can be changed in the field via Bluetooth (sensor units)
- EEPROM stores configuration persistently
- LoRa configuration is updated automatically when device address changes

---

## Appendix

### A. Pin Reference Tables

#### ESP32 Sensor Unit Pin Mapping

| Function | GPIO Pin | Notes |
|----------|----------|-------|
| TFMini TX | GPIO 3 (Serial RX) | UART0 RX |
| TFMini RX | GPIO 1 (Serial TX) | UART0 TX |
| LoRa E32 RX | GPIO 25 | Serial2 RX |
| LoRa E32 TX | GPIO 26 | Serial2 TX |
| LoRa E32 AUX | GPIO 27 | Status pin |
| LoRa E32 M0 | GPIO 26 | Optional, config mode |
| LoRa E32 M1 | GPIO 27 | Optional, config mode |

### B. Communication Protocol Reference

#### LoRa Packet Format Details

- **Start Delimiter:** `#` (0x23)
- **Channel Field:** `ch=4` (fixed, may represent channel 4 or identifier)
- **Address Field:** `add=XX` (XX = 01-16, zero-padded)
- **Status Field:** `car=YY` (YY = 00 or 01)
- **End Delimiter:** `*` (0x2A)
- **Terminator:** `\n` (0x0A)

#### Serial Output Packet Details

- **Start Prefix:** `SP` (0x53 0x50)
- **System ID:** Single digit (0-9)
- **Master ID:** Two digits (00-99)
- **Zone Data:** 16 bytes, each '0' or '1'
- **End Delimiter:** `E` (0x45)

### C. Default Configuration Values

| Parameter | Default Value | Range |
|-----------|---------------|-------|
| Base Distance | 0 cm | 0-255 cm |
| Device Address | 1 | 1-16 |
| LoRa Channel | 0x19 (435MHz) | 0x00-0x1F |
| LoRa Power | 17dBm | 0-17dBm |
| LoRa Air Rate | 4.8kbps | Various |
| Bluetooth PIN | "123456789" | Any string |
| Bluetooth Name | "Loop_Sensor_1" | Any string |

---

**Document Version:** 1.0  
**Last Updated:** Based on Loop_V2.0.1 codebase analysis  
**Author:** Technical Documentation Team

