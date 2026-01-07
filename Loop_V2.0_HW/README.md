# Laser Loop v2.0

A wireless vehicle detection and traffic monitoring system using laser distance sensors and LoRa communication.

## Overview

Laser Loop v2.0 is a distributed hardware system designed for vehicle detection and traffic flow management in traffic intersections and roadways. The system consists of multiple sensor units that detect vehicles using laser distance measurement and a central master/receiver unit that aggregates data from up to 16 sensor units.

### Key Features

- **Wireless Vehicle Detection**: Laser-based distance measurement for accurate vehicle detection
- **Long-Range Communication**: LoRa wireless technology (433MHz) for communication over several kilometers
- **Scalable Architecture**: Support for up to 16 sensor units per master unit
- **Flexible Configuration**: Bluetooth and web-based configuration interfaces
- **Real-Time Monitoring**: Continuous detection and status reporting
- **Standard Outputs**: Serial communication and digital I/O for integration with traffic control systems

### Use Cases

- **Traffic Intersection Monitoring**: Detect vehicles at multiple lanes simultaneously
- **Vehicle Counting**: Monitor traffic flow and vehicle counts
- **Traffic Light Control**: Provide input signals for adaptive traffic light systems
- **Parking Management**: Detect vehicle presence in parking spaces
- **Traffic Flow Analysis**: Collect data for traffic pattern analysis
- **Congestion Management**: Monitor traffic density and manage flow

## System Architecture

The Laser Loop v2.0 system consists of two main components:

### 1. Sensor/Client Units

Each sensor unit includes:
- **ESP32 Microcontroller**: Processing and communication control
- **TFMini Distance Sensor**: Laser-based distance measurement (LiDAR)
- **LoRa E32 Module**: Long-range wireless communication (433MHz)
- **Bluetooth Interface**: Configuration and monitoring
- **EEPROM Storage**: Persistent configuration storage

**Functionality:**
- Continuously measures distance to road surface
- Compares measured distance to stored base (reference) value
- Detects vehicles when distance decreases significantly
- Transmits detection status wirelessly to master unit
- Configurable parameters: base distance, device address, LoRa channel

### 2. Receiver/Master Unit

The master unit includes:
- **ESP32/ESP8266 Microcontroller**: Data aggregation and processing
- **LoRa E32 Module**: Receives data from all sensor units
- **Serial Interface**: Standardized data output
- **Digital Output Channels**: 16 channels for direct control (optional)

**Functionality:**
- Receives data from up to 16 sensor units
- Maintains status for each detection zone
- Outputs standardized data via serial communication
- Controls digital output channels based on sensor status
- Provides interface for traffic control system integration

## Repository Structure

```
Loop_V2.0.1/
│
├── PCB/                          # Hardware design files
│   ├── ESP32/                    # ESP32-based designs
│   │   └── Slave2/              # Sensor unit PCB files
│   │       ├── *.SchDoc         # Schematic files
│   │       ├── *.PcbDoc         # PCB layout files
│   │       └── *.pdf            # PCB documentation
│   ├── ESP8266/                 # ESP8266-based designs
│   └── New_Reciver/             # Master/receiver unit designs
│
├── Program/                      # Firmware source code
│   ├── Loop_Sensor_V1/          # Main sensor unit firmware
│   │   └── Loop_Sensor_V1.ino
│   ├── Loop_Sensor_V1_BTPass/   # Sensor firmware with Bluetooth
│   ├── Reciver_New/             # Master unit firmware
│   │   ├── ESP32/               # ESP32 version
│   │   └── Esp8266/             # ESP8266 version
│   ├── E32_Lora_GetConfig/       # LoRa configuration utility
│   ├── E32_Lora_SetConfig/      # LoRa configuration utility
│   ├── Web_Tfmini/              # Web interface firmware
│   └── [Other test/demo programs]
│
├── Document/                     # Reference documentation
│   ├── E32-433T30D_Usermanual_*.pdf  # LoRa module manual
│   ├── DS_SX1276-7-8-9_*.pdf    # LoRa chip datasheet
│   ├── AN1200_*.pdf             # LoRa application notes
│   └── Traffic Laser Sensor System*.pdf  # System documentation
│
├── Technical_Documentation.md    # Detailed technical documentation
├── User_Manual.md                # User and installation guide
└── README.md                     # This file
```

## Quick Start

### Prerequisites

- Arduino IDE (1.8.x or 2.x) with ESP32 board support
- LoRa_E32 library for Arduino
- TFMini sensor library (or custom implementation)
- USB cable for programming
- 5V DC power supplies
- Bluetooth-capable device (smartphone/tablet) for configuration

### Basic Setup

1. **Hardware Assembly:**
   - Connect TFMini sensor to ESP32 Serial pins
   - Connect LoRa E32 module to ESP32 Serial2 pins
   - Connect 5V power supply

2. **Firmware Installation:**
   - Open `Program/Loop_Sensor_V1/Loop_Sensor_V1.ino` in Arduino IDE
   - Install required libraries
   - Select ESP32 board and COM port
   - Upload firmware to sensor unit

3. **Initial Configuration:**
   - Power on sensor unit
   - Connect via Bluetooth (device name: "Loop_Sensor_1", PIN: "123456789")
   - Set base distance: `Set_Base,0150,*` (adjust for your installation)
   - Set device address: `Set_Dadd,0001,*` (unique for each sensor)

4. **Master Unit Setup:**
   - Upload receiver firmware to master unit
   - Connect serial output to monitoring system
   - Verify reception from sensor units

For detailed instructions, see the [User Manual](User_Manual.md).

## Documentation

### For End Users and Installers

- **[User Manual](User_Manual.md)**: Complete guide for installation, configuration, operation, and maintenance
  - Hardware assembly instructions
  - Installation procedures
  - Configuration via Bluetooth
  - Normal operation
  - Troubleshooting guide
  - Safety precautions

### For Engineers and Developers

- **[Technical Documentation](Technical_Documentation.md)**: Comprehensive technical reference
  - Hardware design details
  - Firmware architecture
  - Communication protocols
  - Algorithm descriptions
  - Build and development instructions
  - API and interface specifications

## System Specifications

### Sensor Unit

| Parameter | Specification |
|-----------|---------------|
| Microcontroller | ESP32-WROOM-32D |
| Distance Sensor | TFMini LiDAR |
| Communication | LoRa E32 (433MHz) |
| Configuration | Bluetooth Serial |
| Power | 5V DC, ~80-240mA |
| Detection Range | 30cm - 12m |
| Operating Temp | -10°C to +60°C |

### Master Unit

| Parameter | Specification |
|-----------|---------------|
| Microcontroller | ESP32 or ESP8266 |
| Communication | LoRa E32 (433MHz) |
| Output | Serial (115200 bps), 16x Digital I/O |
| Max Sensors | 16 units |
| Power | 5V DC |
| Range | Up to several km (line of sight) |

### Communication

| Parameter | Specification |
|-----------|---------------|
| Protocol | LoRa (433MHz ISM band) |
| Channel | 0x19 (435MHz) |
| Data Rate | 4.8kbps (air), 9600 bps (UART) |
| Power | 17dBm (configurable) |
| Range | Several kilometers (line of sight) |
| Packet Format | ASCII text-based |

## Communication Protocol

### Sensor-to-Master Packet Format

```
#ch=4,add=XX,car=YY*\n

Where:
  XX = Sensor address (01-16)
  YY = Vehicle status (00 = no vehicle, 01 = vehicle detected)
```

**Example:**
- Vehicle detected on sensor 1: `#ch=4,add=01,car=01*\n`
- Vehicle cleared: `#ch=4,add=01,car=00*\n`

### Master Serial Output Format

```
SP3XX[Z1][Z2][Z3]...[Z16]E

Where:
  XX = Master ID
  Z1-Z16 = Zone status ('0' or '1')
```

**Example:**
- Sensors 1, 3, 5 active: `SP3121010100000000000E`

## Configuration Commands

All commands sent via Bluetooth must end with `*`:

| Command | Purpose | Example |
|---------|---------|---------|
| `Get_Dist,*` | Read current distance | Response: `150 cm strength: 5000` |
| `Set_Base,XXXX,*` | Set base distance (cm) | `Set_Base,0150,*` |
| `Get_Base,*` | Read base distance | Response: `Base\n150` |
| `Set_Dadd,XXXX,*` | Set device address (1-16) | `Set_Dadd,0003,*` |
| `Get_Dadd,*` | Read device address | Response: `Get Device Address\n3` |

## Applications

### Traffic Intersection Monitoring

Deploy sensor units at each lane approach to detect vehicles waiting at intersections. The master unit aggregates data for traffic light control systems.

### Vehicle Counting

Install sensors at entry/exit points to count vehicles passing through specific locations. Data can be logged for traffic analysis.

### Parking Management

Place sensors in parking spaces to detect vehicle presence. Master unit provides status to parking management systems.

### Traffic Flow Analysis

Monitor multiple detection points along a roadway to analyze traffic patterns, speeds, and congestion levels.

## Development

### Building Firmware

1. Install Arduino IDE and ESP32 board support
2. Install required libraries (LoRa_E32, etc.)
3. Open firmware file in Arduino IDE
4. Select appropriate board (ESP32 Dev Module)
5. Configure COM port
6. Compile and upload

See [Technical Documentation](Technical_Documentation.md) for detailed build instructions.

### Hardware Development

PCB design files are provided in Altium Designer format (.SchDoc, .PcbDoc). Refer to PCB folder structure for schematic and layout files.

## License

See [LICENSE](LICENSE) file for license information.

## Support and Resources

### Documentation

- **User Manual**: Installation, configuration, and operation guide
- **Technical Documentation**: Detailed technical specifications and development guide
- **Reference Documents**: LoRa module manuals and datasheets in `Document/` folder

### Getting Help

1. Review documentation (User Manual and Technical Documentation)
2. Check troubleshooting sections
3. Verify configuration settings
4. Contact support with detailed problem description

## Version Information

- **Version**: 2.0.1
- **Firmware**: Based on Loop_Sensor_V1 and Reciver_New
- **Hardware**: ESP32-based sensor units, ESP32/ESP8266 master units
- **Last Updated**: Based on current codebase analysis

## Contributing

This is a hardware and embedded software project. Contributions should focus on:
- Firmware improvements and bug fixes
- Hardware design enhancements
- Documentation updates
- Testing and validation

## Acknowledgments

- ESP32 platform by Espressif Systems
- LoRa E32 modules by Ebyte
- TFMini distance sensors
- LoRa_E32 library contributors

---

## Quick Links

- [User Manual](User_Manual.md) - Start here for installation and setup
- [Technical Documentation](Technical_Documentation.md) - Detailed technical reference
- [PCB Designs](PCB/) - Hardware design files
- [Firmware Source](Program/) - Embedded software source code

---

**Laser Loop v2.0** - Wireless Vehicle Detection System for Traffic Management
