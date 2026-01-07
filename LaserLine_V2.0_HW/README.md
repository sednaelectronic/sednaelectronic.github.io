# Linear Laser v2.0

## Overview

Linear Laser v2.0 is a precision laser projection and scanning system designed for applications requiring accurate geometric pattern projection. The system utilizes two galvanometer motors (galvos) with mirrors to control a laser beam, enabling the generation of straight lines and circular patterns with high precision.

## System Capabilities

### Core Features

- **Straight Line Generation:** Projects adjustable-length straight laser lines with configurable start positions
- **Circle Generation:** Projects circular laser patterns using trigonometric trajectory algorithms
- **Remote Control:** TCP-based network communication for integration with server-side applications
- **Firmware Updates:** Over-the-air (OTA) firmware update capability via HTTP
- **Power Management:** Relay-controlled power sequencing for safe and efficient operation

### Use Cases

- Construction alignment and leveling
- Industrial marking and layout
- Laser projection displays
- Precision measurement applications
- Alignment and calibration systems

## Architecture Summary

### Hardware Architecture

The system consists of:

- **ESP32 Microcontroller:** Dual-core processor handling WiFi communication, trajectory generation, and system control
- **MCP4822 DAC:** 12-bit dual-channel digital-to-analog converter providing analog control signals for galvo motors
- **Galvanometer Motors:** Two-axis mirror system for precise beam steering
- **Laser Module:** Visible laser source (power and class depend on application)
- **Power Supply:** Regulated power distribution for all system components
- **Relay Control:** Hardware power management for safety and sequencing

### Software Architecture

- **Firmware Platform:** Arduino/ESP32 framework
- **Communication:** 
  - TCP server (port 8088) for control commands
  - HTTP server (port 80) for OTA updates
- **Trajectory Generation:** Embedded algorithms for line and circle drawing
- **Control Protocol:** ASCII-based command structure over TCP

### System Flow

```
Server Application → TCP (Port 8088) → ESP32 → DAC (SPI) → Galvo Drivers → Galvo Motors → Laser Beam
                                                                    ↓
                                                              Relay Control → Laser Module
```

## Repository Structure

```
LaserLine_V2.0/
│
├── Code/                           # Firmware source code
│   ├── Esp32_OTA/                  # OTA-enabled firmware variants
│   │   ├── LaserLine_OTA_TCP/      # Main single-core firmware
│   │   ├── LaserLine_OTA_TCP_MultiCore/  # Dual-core optimized version
│   │   ├── Async_OTA/              # OTA update examples
│   │   └── ...                     # Additional firmware variants
│   │
│   ├── Linear_Laser_ControllerV2/  # Web dashboard variant
│   ├── TCP_Code/                   # TCP communication examples
│   └── ...                         # Additional code examples
│
├── PCB/                            # Hardware design files
│   ├── Controller/                 # Main controller PCB
│   │   └── Controller_PCB_Project/ # Altium Designer project files
│   │       ├── Main.SchDoc         # Main schematic
│   │       ├── Galvo_Controller.SchDoc  # Galvo control circuitry
│   │       ├── Laser_Controller.SchDoc # Laser control circuitry
│   │       ├── ILDA_Opamp.SchDoc   # Signal conditioning
│   │       └── ...                 # Additional schematics
│   │
│   └── PowerSupply/                # Power supply PCB
│       └── Power_SupplyPCB_Project/ # Power supply design files
│
├── Doc/                            # Documentation and references
│   ├── Linear_Laser_TechDoc.docx   # Technical documentation (legacy)
│   └── ...                         # Additional documentation files
│
├── Technical_Documentation.md      # Comprehensive technical documentation
├── User_Manual.md                  # User and operator manual
└── README.md                       # This file
```

## Quick Start Overview

### For Developers

1. **Hardware Setup:**
   - Review `Technical_Documentation.md` for hardware specifications
   - Understand pin mappings and signal connections
   - Verify power supply requirements

2. **Firmware Development:**
   - Open firmware in Arduino IDE or PlatformIO
   - Install required libraries (WiFi, AsyncTCP, ESPAsyncWebServer, AsyncElegantOTA, MCP48xx)
   - Configure WiFi credentials
   - Compile and upload to ESP32

3. **Integration:**
   - Review TCP communication protocol in `Technical_Documentation.md`
   - Implement client application using command format
   - Test connection and command processing

### For Installers/Operators

1. **Installation:**
   - Follow `User_Manual.md` for mechanical assembly
   - Complete electrical wiring per specifications
   - Perform mirror alignment

2. **Configuration:**
   - Configure WiFi network connection
   - Obtain device IP address
   - Test TCP connection

3. **Operation:**
   - Connect control application
   - Send device control commands
   - Configure line/circle parameters
   - Monitor system operation

## Key Specifications

### Hardware

- **Microcontroller:** ESP32 (Dual-core, 240 MHz)
- **DAC:** MCP4822 (12-bit, dual-channel)
- **Communication:** WiFi 802.11 b/g/n
- **Control Interfaces:** TCP (port 8088), HTTP (port 80)
- **Power Control:** 5 relay outputs
- **PCB Size:** 134.874mm × 101.473mm

### Software

- **Platform:** Arduino/ESP32
- **Communication Protocol:** TCP/IP, HTTP
- **Update Method:** OTA via HTTP
- **Trajectory Resolution:** 12-bit (4096 levels per axis)

## Documentation

### Technical Documentation

**File:** `Technical_Documentation.md`

Comprehensive technical documentation for engineers and developers, including:
- Hardware block diagrams and schematics
- Microcontroller pin mapping
- Galvo drive circuitry details
- DAC configuration and signal generation
- Firmware architecture and algorithms
- TCP communication protocol specification
- OTA update mechanism
- Build and debugging procedures

### User Manual

**File:** `User_Manual.md`

Complete user manual for installers, technicians, and operators, including:
- System overview and features
- Mechanical assembly instructions
- Electrical wiring procedures
- Network configuration
- Operating procedures
- Firmware update instructions
- Safety warnings and precautions
- Maintenance guidelines
- Troubleshooting guide

## Communication Protocol

### TCP Command Format

Commands are sent via TCP to port 8088 in ASCII format:

- **Device Control:** `O#N*,` (On) / `O#F*,` (Off)
- **Line Configuration:** `C#L,XXXX,YYYY*,` (Length index, Start point index)
- **Dash Line:** `C#D,XXXX,YYYY*,`
- **Settings:** `S#HXXXX,DYYYY*,` (Height, Distance)

See `Technical_Documentation.md` for complete protocol specification.

## Safety Information

⚠️ **LASER SAFETY WARNING**

This system uses laser radiation that can cause eye injury. Always:
- Use appropriate laser safety eyewear
- Never look directly into the beam
- Follow local laser safety regulations
- Ensure proper beam path control

See `User_Manual.md` for complete safety information.

## Support and Contact

- **Technical Support:** Info@sednasmartsolution.com
- **Documentation:** See `Technical_Documentation.md` and `User_Manual.md`
- **Issues:** Contact support with device information and problem description

## License

This project is licensed under the Apache License 2.0. See `LICENSE` file for details.

## Version History

- **v2.0:** Current version with TCP control and OTA updates
- **v1.0:** Initial release with basic line drawing

## Contributing

This is a hardware and embedded firmware project. For modifications:
1. Review technical documentation
2. Understand hardware constraints
3. Test thoroughly before deployment
4. Document changes

## Acknowledgments

- ESP32 Arduino Core developers
- MCP48xx library contributors
- AsyncTCP and ESPAsyncWebServer developers
- AsyncElegantOTA developers

---

**For detailed information, please refer to:**
- `Technical_Documentation.md` - For technical implementation details
- `User_Manual.md` - For installation, operation, and maintenance

---

**Linear Laser v2.0** - Precision Laser Projection System
