# Laser Loop v1

A two-part laser-based vehicle detection system designed for traffic monitoring and intersection management.

## Overview

Laser Loop v1 is a distributed vehicle detection system that uses LiDAR distance measurement sensors to detect vehicle presence and wirelessly transmit detection data to a central master unit. The system is designed for traffic control applications, providing reliable vehicle detection for traffic lights, traffic monitoring, and access control systems.

### System Purpose

The Laser Loop v1 system enables:
- **Vehicle Presence Detection**: Real-time detection of vehicles in designated zones
- **Traffic Density Estimation**: Monitor traffic flow and vehicle counts
- **Traffic Control Logic**: Provide input signals for traffic light controllers
- **Intersection Management**: Coordinate multiple detection points at intersections
- **Access Control**: Gate and barrier control based on vehicle detection

### Key Features

- **Wireless Communication**: NRF24L01 2.4GHz radio modules for sensor-to-master communication
- **LiDAR Distance Measurement**: TFMini sensors provide accurate distance measurements (0.3m to 12m range)
- **Multi-Sensor Support**: Master unit can receive from up to 16 sensor units simultaneously
- **Configurable Detection**: Adjustable base values and thresholds for different installation scenarios
- **Web-Based Configuration**: Easy setup and monitoring via WiFi web interface
- **Digital Output Control**: 16 independent digital output channels for external system control
- **Real-Time Operation**: Low-latency detection and response (< 1 second typical)

## System Architecture

```
                    ┌─────────────┐
                    │ Sensor Unit │
                    │  (ESP8266)  │
                    │  - TFMini   │
                    │  - NRF24L01 │
                    └──────┬──────┘
                           │
                    ┌──────┴──────┐
                    │             │
         ┌──────────▼──────────┐  │
         │   Master Unit      │  │
         │  (STM32F030K6Tx)   │  │
         │  - NRF24L01 Rx     │  │
         │  - 16 GPIO Outputs│  │
         └─────────────────────┘  │
                    │             │
         ┌──────────▼──────────┐  │
         │  External Control   │  │
         │      Systems        │  │
         └─────────────────────┘  │
```

### Components

#### 1. Sensor / Client Units
- **Microcontroller**: ESP8266 (ESP-12E module)
- **Distance Sensor**: TFMini LiDAR sensor
- **Wireless Module**: NRF24L01+ 2.4GHz transceiver
- **Configuration**: WiFi web interface
- **Function**: Measure distance, detect vehicles, transmit data wirelessly

#### 2. Receiver / Master Unit
- **Microcontroller**: STM32F030K6Tx
- **Wireless Module**: NRF24L01+ 2.4GHz receiver
- **Output Channels**: 16 digital GPIO outputs
- **Function**: Receive sensor data, control output channels

## Repository Structure

```
Loop_V1.0.1/
│
├── PCB/                          # Hardware design files
│   ├── Master/                   # Master unit PCB design
│   │   └── Master/               # Altium Designer project files
│   │       ├── Master.SchDoc    # Main schematic
│   │       ├── Microcontroller.SchDoc
│   │       ├── NRF24l01.SchDoc
│   │       ├── OUT.SchDoc       # Output channels
│   │       ├── PowerSupply.SchDoc
│   │       └── Master_PCB1.PcbDoc # PCB layout
│   │
│   ├── Slave1/                   # Sensor unit PCB design (variant 1)
│   └── Slave2/                   # Sensor unit PCB design (variant 2)
│       └── Esp8266_12E.SchDoc   # ESP8266 schematic
│       └── NRF24l01.SchDoc      # NRF24L01 schematic
│       └── PowerSupply.SchDoc   # Power supply schematic
│
├── Program/                      # Firmware source code
│   ├── ESP/                      # ESP8266 firmware (sensor units)
│   │   ├── loop_terminal/        # Main sensor unit firmware
│   │   │   └── loop_terminal.ino
│   │   ├── loop_master/          # Alternative master firmware (ESP8266)
│   │   └── NRF/                  # NRF24L01 test/demo code
│   │
│   └── STM/                      # STM32 firmware (master unit)
│       ├── Core/                 # Main application code
│       │   ├── Inc/              # Header files
│       │   │   └── main.h        # Pin definitions, includes
│       │   └── Src/              # Source files
│       │       └── main.c        # Main application logic
│       ├── NRF24L01-master/      # NRF24L01 driver library
│       │   ├── NRF24L01.h
│       │   └── NRF24L01.c
│       └── MDK-ARM/              # Keil project files
│           └── Program.uvprojx  # Keil project
│
├── Technical_Documentation.md    # Technical documentation for engineers
├── User_Manual.md                # User manual for installers/operators
└── README.md                     # This file
```

## Quick Start

### For Developers

1. **Hardware Setup**:
   - Review PCB designs in `PCB/` directory
   - Order PCBs or use existing boards
   - Assemble components per schematics

2. **Firmware Development**:
   - **Sensor Units**: Open `Program/ESP/loop_terminal/loop_terminal.ino` in Arduino IDE
   - **Master Unit**: Open `Program/STM/MDK-ARM/Program.uvprojx` in Keil MDK-ARM
   - See [Technical_Documentation.md](Technical_Documentation.md) for detailed build instructions

3. **System Integration**:
   - Flash firmware to sensor units and master unit
   - Configure sensor units via WiFi
   - Test wireless communication
   - Verify output channel operation

### For Installers

1. **Hardware Installation**:
   - Mount sensor units at appropriate locations (3-5m height typical)
   - Mount master unit in central, protected location
   - Connect power supplies
   - Route output cables from master unit

2. **Configuration**:
   - Connect to sensor WiFi (SSID: "esp", Password: "123456789")
   - Access web interface
   - Configure base values and sensor numbers
   - See [User_Manual.md](User_Manual.md) for detailed instructions

3. **Operation**:
   - System begins detection automatically
   - Monitor via web interface
   - Verify output channel responses

## Documentation

### For Engineers and Developers

**[Technical_Documentation.md](Technical_Documentation.md)** provides comprehensive technical information including:
- Hardware design details and component selection
- Firmware architecture and algorithms
- Communication protocols and packet structures
- Build, flashing, and debugging procedures
- Pin mappings and interface specifications

### For Installers, Technicians, and Operators

**[User_Manual.md](User_Manual.md)** provides practical guidance including:
- System overview and operation
- Hardware assembly instructions
- Installation procedures
- Configuration steps
- Maintenance guidelines
- Troubleshooting guide

## Key Specifications

### Sensor Unit
- **Microcontroller**: ESP8266 (80 MHz, 4 MB Flash)
- **Distance Sensor**: TFMini (0.3m - 12m range)
- **Wireless**: NRF24L01+ (2.4 GHz, up to 100m range)
- **Power**: 5V or 12V DC (~200mA)
- **Configuration**: WiFi web interface

### Master Unit
- **Microcontroller**: STM32F030K6Tx (8 MHz, 32 KB Flash)
- **Wireless**: NRF24L01+ receiver
- **Outputs**: 16 digital channels (3.3V logic)
- **Power**: 12V DC (~50mA)
- **Communication**: Serial output (optional)

## Use Cases

### Traffic Light Control
- Vehicle detection at intersection approaches
- Trigger traffic light phase changes
- Coordinate multiple detection points

### Traffic Monitoring
- Vehicle counting and classification
- Traffic flow analysis
- Density estimation

### Access Control
- Gate and barrier control
- Parking lot management
- Restricted area monitoring

### Intersection Management
- Multi-lane detection
- Turn lane monitoring
- Pedestrian crossing coordination

## System Requirements

### Hardware Requirements
- Sensor units: TFMini LiDAR sensors, NRF24L01 modules
- Master unit: STM32F030K6Tx development board or custom PCB
- Power supplies: Appropriate DC power supplies for each unit
- Mounting hardware: Brackets and fasteners for installation

### Software Requirements
- **Sensor Units**: Arduino IDE with ESP8266 board support
- **Master Unit**: Keil MDK-ARM or STM32CubeIDE
- **Libraries**: See Technical Documentation for complete list

## Configuration Parameters

Each sensor unit requires configuration of:
- **Base Value**: Baseline distance measurement (typically 800-2000 cm)
- **Sensor Number**: Unique identifier (1-16)
- **NRF24L01 Channel**: RF channel for wireless communication (typically channel 10)

Configuration is performed via WiFi web interface. See User Manual for detailed instructions.

## Communication Protocol

### Wireless Communication (NRF24L01)
- **Frequency**: 2.4 GHz ISM band
- **Data Rate**: 2 Mbps
- **Range**: Up to 100m (line of sight)
- **Packet Format**: String-based commands (e.g., "i1", "o1", "p1")

### Sensor to Master Messages
- `"i1"` - Vehicle entered, sensor 1
- `"o1"` - Vehicle exited, sensor 1
- `"p1"` - Vehicle passing, sensor 1

### Master Output Control
- 16 digital output channels (OUT1 through OUT16)
- Logic HIGH (3.3V) when vehicle detected
- Logic LOW (0V) when no vehicle

## Development Status

This project includes:
- ✅ Complete hardware designs (PCB schematics and layouts)
- ✅ Sensor unit firmware (ESP8266)
- ✅ Master unit firmware (STM32)
- ✅ NRF24L01 communication drivers
- ✅ Web-based configuration interface

**Note**: Some features may require additional development or customization for specific applications.

## Known Limitations

1. **Master Unit GPIO Mapping**: Current firmware has a bug where all output commands control the same pin. This should be fixed for production use.

2. **No Packet Acknowledgment**: Wireless communication does not include automatic retransmission or acknowledgment.

3. **Fixed Addresses**: Sensor units use hardcoded NRF24L01 addresses. Multi-sensor networks may require address configuration.

4. **Limited Error Handling**: Minimal error handling for communication failures.

## Contributing

This is a hardware and embedded firmware project. Contributions should focus on:
- Firmware improvements and bug fixes
- Hardware design enhancements
- Documentation improvements
- Testing and validation

## License

See [LICENSE](LICENSE) file for license information.

## Support

For technical support, please refer to:
- **Technical Documentation**: [Technical_Documentation.md](Technical_Documentation.md)
- **User Manual**: [User_Manual.md](User_Manual.md)
- Contact your system integrator or supplier

## Version History

- **v1.0.1**: Current version
  - Initial release with complete hardware and firmware
  - Web-based configuration interface
  - Support for up to 16 sensor units

---

**Project**: Laser Loop v1  
**Version**: 1.0.1  
**Last Updated**: Based on project files analysis

For detailed information, please refer to the [Technical Documentation](Technical_Documentation.md) and [User Manual](User_Manual.md).
