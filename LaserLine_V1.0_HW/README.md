# Linear Laser v1.0

## Project Overview

Linear Laser v1.0 is a laser projection system designed to generate geometric shapes using two galvanometer motors (galvos) to control mirror positions and steer a laser beam. The system focuses on generating straight lines and circles through embedded firmware algorithms.

## System Purpose and Capabilities

### Primary Functions:
- **Line Generation**: Draw horizontal lines with adjustable Y-axis position
- **Circle Generation**: Draw continuous circular patterns
- **Dashed Line Mode**: Generate lines with periodic gaps (V2 firmware)

### Key Features:
- **Embedded Control**: Self-contained system with ESP32 microcontroller
- **WiFi Interface**: Web-based control dashboard for remote operation
- **Precision Control**: 12-bit DAC resolution for smooth galvo control
- **Multiple Operating Modes**: Line, dashed line, and circle modes
- **Safety Features**: Relay-based power control for safe operation

## Architecture Summary

### Hardware Components:
- **Microcontroller**: ESP32 (32-bit dual-core, WiFi-enabled)
- **DAC**: MCP4822 12-bit dual-channel digital-to-analog converter
- **Control Interface**: SPI communication between ESP32 and DAC
- **Power Management**: Relay-based switching for laser and galvo power
- **Galvo Motors**: Two independent galvanometer motors for X and Y axis control
- **Laser Module**: External laser diode/module with relay control

### Software Architecture:
- **Firmware**: Arduino/ESP32-based embedded code
- **Control Algorithms**: Trigonometric circle generation, linear sweep for lines
- **Web Interface**: ESP-Dash framework for remote control
- **Communication**: WiFi Access Point mode for local network control

### Signal Flow:
```
ESP32 → SPI → MCP4822 DAC → Analog Signals → Galvo Drivers → Galvo Motors → Mirrors → Laser Beam
```

## Repository Structure

```
LaserLine_V1.0/
│
├── Code/                                    # Firmware source code
│   ├── Linear_Laser_ControllerV1/          # Basic line generation
│   │   └── LaserController/
│   │       └── LaserController.ino
│   │
│   ├── Linear_Laser_ControllerV1(dashed line)/  # Dashed line mode
│   │   └── LaserController/
│   │       └── LaserController.ino
│   │
│   ├── Linear_Laser_Controller(Circule)/   # Circle generation only
│   │   └── LaserController/
│   │       └── LaserController.ino
│   │
│   ├── Linear_Laser_ControllerV2/          # Multi-mode (recommended)
│   │   └── LaserController/
│   │       └── LaserController.ino
│   │
│   ├── MCP48x2/                            # DAC test/example code
│   │   └── MCP48x2.ino
│   │
│   └── pwm/                                 # PWM test code
│       └── pwm.ino
│
├── PCB/                                     # Hardware design files
│   ├── Controller/                         # Main controller PCB
│   │   └── Controller_PCB_Project/
│   │       ├── Main.SchDoc                # Main schematic
│   │       ├── Galvo_Controller.SchDoc   # Galvo control circuit
│   │       ├── Laser_Controller.SchDoc   # Laser control circuit
│   │       ├── ILDA_Opamp.SchDoc         # Signal conditioning
│   │       ├── PowerSupply.SchDoc        # Power supply circuit
│   │       └── Controller_Galvo_PCB.PcbDoc  # PCB layout
│   │
│   └── PowerSupply/                        # Power supply PCB
│       └── Power_SupplyPCB_Project/
│           └── Main.SchDoc
│
├── Doc/                                     # Documentation and references
│   ├── Linear_Laser_TechDoc.docx          # Original technical notes
│   ├── lm2596_TI.pdf                      # Power supply IC datasheet
│   └── LM2596-ONSemiconductor.pdf         # Alternative datasheet
│
├── README.md                               # This file
├── Technical_Documentation.md             # Detailed technical documentation
├── User_Manual.md                         # User and operator guide
└── LICENSE                                # Apache License 2.0
```

## Quick Start Overview

### For Developers:

1. **Hardware Setup**:
   - Assemble controller board and connect power supplies
   - Connect galvo motors and laser module
   - Verify all electrical connections

2. **Software Setup**:
   - Install Arduino IDE
   - Install ESP32 board support package
   - Install required libraries (MCP48xx, ESPDash, etc.)
   - Open `Code/Linear_Laser_ControllerV2/LaserController/LaserController.ino`
   - Select ESP32 board and upload

3. **Operation**:
   - Power on system
   - Connect to WiFi network "Laser"
   - Open browser to http://192.168.4.1
   - Use web dashboard to control system

### For Operators:

1. **Initial Setup**: Follow the [User Manual](User_Manual.md) for assembly and wiring
2. **Calibration**: Align mirrors and calibrate center position
3. **Operation**: Use web interface to control laser and select drawing modes
4. **Safety**: Always follow laser safety procedures

## Documentation

### 📘 [Technical Documentation](Technical_Documentation.md)
Comprehensive technical documentation for electronics engineers and embedded developers:
- Hardware design details
- Firmware architecture and algorithms
- Circuit schematics and component specifications
- Calibration and debugging procedures
- System specifications

### 📗 [User Manual](User_Manual.md)
Complete user guide for installers, technicians, and operators:
- System overview and assembly instructions
- Wiring and power connections
- Operating procedures
- Laser safety warnings
- Maintenance and troubleshooting

## System Specifications

### Hardware:
- **Microcontroller**: ESP32
- **DAC**: MCP4822 (12-bit, dual-channel)
- **Control Resolution**: 4096 steps per axis
- **Power Requirements**: 
  - Controller: 5V DC
  - Galvos: ±15V DC
  - Laser: External supply
- **PCB Size**: 134.874mm × 101.473mm

### Software:
- **Platform**: Arduino/ESP32
- **WiFi**: Access Point mode
- **Web Interface**: ESP-Dash framework
- **Update Rate**: 1-10 kHz (variable)

### Performance:
- **Shapes Supported**: Lines, circles, dashed lines
- **Circle Resolution**: 72 points per circle
- **Coordinate Range**: Center ± 2000 steps (Y), ± 270 steps (X)

## Key Components

### Microcontroller:
- **ESP32**: Dual-core 32-bit processor with WiFi
- Provides control logic, web interface, and communication

### DAC (Digital-to-Analog Converter):
- **MCP4822**: 12-bit resolution, SPI interface
- Converts digital coordinates to analog control voltages
- Dual-channel for X and Y axis control

### Galvanometer Motors:
- Two independent galvo motors with mirrors
- Controlled by analog voltage signals from DAC
- Provide precise angular positioning for beam steering

### Laser Module:
- External laser diode/module
- Relay-controlled ON/OFF switching
- Binary intensity control (ON/OFF only in v1.0)

## Firmware Versions

### Recommended: Linear_Laser_ControllerV2
- Multi-mode operation (line, dashed line, circle)
- Full web dashboard interface
- Most complete feature set

### Alternative Versions:
- **V1**: Basic line generation
- **V1 (dashed line)**: Line mode with dashed pattern
- **Circle**: Circle generation only

## Safety Information

⚠️ **IMPORTANT**: This system uses laser radiation which can cause permanent eye damage. Always:
- Use appropriate laser safety glasses
- Never look directly into the beam
- Follow all safety procedures in the User Manual
- Ensure proper beam termination
- Comply with local laser safety regulations

## Development Status

**Version**: 1.0  
**Status**: Hardware and firmware complete  
**Focus**: Line and circle generation

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Support and Contributions

For technical questions, refer to:
- [Technical Documentation](Technical_Documentation.md) for hardware/firmware details
- [User Manual](User_Manual.md) for operation and troubleshooting

## Acknowledgments

- ESP32 platform by Espressif Systems
- MCP4822 DAC by Microchip Technology
- Arduino and ESP32 community libraries

---

**Linear Laser v1.0** - Precision laser projection system for geometric shape generation.
