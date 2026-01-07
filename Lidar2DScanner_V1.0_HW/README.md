# LADAR v1 - 2D Scanner System

## Overview

LADAR v1 is a single-unit two-axis scanning system designed for open-area people passage detection and access control. The system uses a LiDAR distance sensor mounted on a motorized two-axis gimbal to perform raster scanning of a detection area, analyzing distance measurements to determine presence and passage events.

## Key Features

- **Two-Axis Scanning:** Horizontal (theta/azimuth) and vertical (phi/elevation) motorized scanning
- **LiDAR Distance Measurement:** High-speed distance sensing with configurable range
- **Real-Time Detection:** Automatic presence detection based on distance analysis
- **Web-Based Configuration:** Accessible configuration interface via Ethernet/WiFi
- **Digital Output Signals:** Logic 0/1 outputs for external control systems
- **Configurable Parameters:** Adjustable thresholds, scanning ranges, and detection sensitivity
- **Baseline Calibration:** Automatic reference measurement for accurate detection

## Intended Use Cases

### People Passage Detection
- Monitor entry/exit points
- Detect people movement in open areas
- Track passage events for access control

### Access Control Integration
- Trigger access control systems via digital outputs
- Provide detection data to security systems
- Enable automated access decisions

### Area Monitoring
- Monitor open areas for presence
- Detect unauthorized access
- Provide real-time occupancy information

## System Architecture

### Hardware Components

```
┌─────────────────────────────────────────┐
│         LADAR v1 System                 │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────────┐                      │
│  │  STM32F105   │  Main Controller     │
│  │  MCU         │                      │
│  └──────┬───────┘                      │
│         │                               │
│         ├─► Stepper Motors (2-axis)    │
│         ├─► LiDAR Distance Sensor      │
│         ├─► MPU6050 IMU                 │
│         ├─► EEPROM (Configuration)     │
│         └─► Communication Interface     │
│                                         │
└─────────────────────────────────────────┘
```

**Core Components:**
- **Microcontroller:** STM32F105RC (ARM Cortex-M3, 72 MHz)
- **Stepper Motor Drivers:** DRV8825 (dual-axis control)
- **Distance Sensor:** LiDAR sensor (UART interface, 1 Mbps)
- **IMU:** MPU6050 (orientation and motion sensing)
- **Storage:** AT24Cxx EEPROM (configuration persistence)
- **Communication:** USART1 (115200 baud) for web interface bridge

### Software Architecture

**Firmware Stack:**
- **RTOS:** FreeRTOS (real-time task scheduling)
- **HAL:** STM32 HAL (hardware abstraction)
- **Tasks:**
  - Task1_Scan: Main scanning and communication
  - Task2_Laser: IMU data acquisition

**Key Modules:**
- Motor control (Drv2855)
- Distance acquisition (UART2)
- Communication protocol (UartConfig)
- Configuration management (AT24Cxx)
- IMU processing (Mpu6050)

## Repository Structure

```
Lidar2DScanner_V1.0/
├── Code/                          # Firmware source code
│   ├── Scanner_Code/
│   │   ├── DRV8825_V1/           # Initial firmware version
│   │   ├── DRV8825_V2/           # Enhanced firmware version
│   │   └── V2_RTOS/               # FreeRTOS-based version (recommended)
│   │       └── Scanner/
│   │           └── DGS_Scanner_RTOS_V1/
│   │               ├── Core/      # Core HAL files
│   │               ├── Drivers/   # STM32 drivers
│   │               ├── Middlewares/ # FreeRTOS
│   │               ├── Drv2855/   # Motor driver
│   │               ├── Mpu6050/   # IMU driver
│   │               ├── AT24Cxx/   # EEPROM driver
│   │               ├── UartConfig/ # Communication
│   │               └── RealTime/  # RTC functions
│   └── Scanner_Code2/             # Alternative code versions
│
├── PCB/                           # Hardware design files
│   ├── Up_Board/                  # Main control board
│   │   └── PCB/
│   │       ├── STM32f105.SchDoc   # MCU schematic
│   │       ├── DRV8825.SchDoc     # Motor driver schematic
│   │       ├── Laser.SchDoc       # Sensor interface
│   │       ├── Power_Supply.SchDoc # Power management
│   │       └── [Other schematics]
│   └── Down_Board/                # Power supply board
│
├── ETH/                           # Ethernet/WiFi module resources
│   └── HLK RM04/                  # HLK RM04 module documentation
│
├── Documents/                     # Additional documentation
│
├── Technical_Documentation.md     # Technical documentation
├── User_Manual.md                 # User and installation guide
└── README.md                       # This file
```

## Quick Start

### For Developers

1. **Review Technical Documentation:**
   - See [Technical_Documentation.md](Technical_Documentation.md) for detailed hardware and firmware information
   - Understand system architecture and pin mappings
   - Review firmware structure and build procedures

2. **Set Up Development Environment:**
   - Install Keil MDK-ARM
   - Install STM32F1xx Device Family Pack
   - Open project: `Code/Scanner_Code/V2_RTOS/Scanner/DGS_Scanner_RTOS_V1/MDK-ARM/DGS_Scanner_RTOS_V1.uvprojx`

3. **Build and Flash:**
   - Build project (F7)
   - Connect ST-Link programmer
   - Flash firmware (F8)
   - Verify operation

### For Installers/Operators

1. **Review User Manual:**
   - See [User_Manual.md](User_Manual.md) for installation and operation instructions
   - Understand mounting requirements
   - Review safety precautions

2. **Installation Steps:**
   - Mount scanner unit
   - Connect power supply
   - Connect communication interface
   - Access web configuration interface
   - Perform initial calibration

3. **Configuration:**
   - Set scanning ranges
   - Configure detection thresholds
   - Perform baseline calibration
   - Test detection operation

## System Specifications

### Hardware Specifications

- **Microcontroller:** STM32F105RC (72 MHz, ARM Cortex-M3)
- **Scanning Range:** 
  - Theta: 0-32000 steps (~360°)
  - Phi: 0-1800+ steps (configurable)
- **Distance Sensor:** LiDAR (UART, 1 Mbps)
- **Distance Range:** Up to 18 meters (sensor dependent)
- **Communication:** 
  - USART1: 115200 baud (web interface)
  - USART2: 1000000 baud (LiDAR sensor)
- **Digital Output:** 3.3V logic (PB11)
- **Power:** [Specify voltage/current requirements]

### Software Specifications

- **RTOS:** FreeRTOS
- **Framework:** STM32 HAL
- **Development:** Keil MDK-ARM
- **Language:** C (C99)

## Communication Protocol

The system communicates via ASCII-based commands over USART1 (115200 baud). Commands follow the format:

```
[CMD][OP][VAL][VAL][VAL][VAL][VAL][*][,]
```

**Example Commands:**
- `GOHOME *` - Return to home position
- `S#START*` - Start scanning
- `S#BASE *` - Perform baseline scan
- `QIST*****` - Query instant distance
- `Z#01234*` - Set installation height to 1234

**Data Output:**
- Format: `theta,distance\n`
- Continuous stream during scanning
- CSV format for easy parsing

See [Technical_Documentation.md](Technical_Documentation.md) for complete command reference.

## Configuration Parameters

Key configurable parameters:

- **Distance Threshold (Delta_Z):** Detection sensitivity (default: 10 cm)
- **Scanning Ranges:** Theta and Phi start/end positions
- **Step Sizes:** Scanning resolution (dande_theta, dande_phi)
- **Installation Height (Zinstall):** Vertical mounting distance
- **Base/Reference Values:** Calibrated baseline distances

All parameters are stored in EEPROM and accessible via web interface or serial commands.

## Documentation

### Technical Documentation
Comprehensive technical documentation for electronics engineers and embedded developers:
- **[Technical_Documentation.md](Technical_Documentation.md)**
  - Hardware block diagrams and pin mappings
  - Firmware architecture and algorithms
  - Build, flash, and debugging procedures
  - Complete command reference

### User Manual
Installation and operation guide for installers, technicians, and operators:
- **[User_Manual.md](User_Manual.md)**
  - Mechanical mounting instructions
  - Electrical wiring procedures
  - Web interface access
  - Initial setup and calibration
  - Normal operation procedures
  - Maintenance and troubleshooting

## Building from Source

### Prerequisites

- Keil MDK-ARM (version 5.x or later)
- STM32F1xx Device Family Pack
- ST-Link programmer (or compatible)

### Build Steps

1. **Open Project:**
   ```
   Code/Scanner_Code/V2_RTOS/Scanner/DGS_Scanner_RTOS_V1/MDK-ARM/DGS_Scanner_RTOS_V1.uvprojx
   ```

2. **Select Target:**
   - Target: STM32F105RC
   - Build configuration: Release or Debug

3. **Build:**
   - Project → Build Target (F7)
   - Output: `DGS_Scanner_RTOS_V1.hex`

4. **Flash:**
   - Connect ST-Link
   - Flash → Download (F8)
   - Verify programming

See [Technical_Documentation.md](Technical_Documentation.md) for detailed build and debugging procedures.

## Hardware Design

PCB design files are located in the `PCB/` directory:

- **Up_Board:** Main control board with STM32F105, motor drivers, and sensors
- **Down_Board:** Power supply and auxiliary circuits

Schematic files are in Altium Designer format (`.SchDoc`). PCB layout files (`.PcbDoc`) are also available.

## License

[Specify license information - check LICENSE file if present]

## Support and Contact

For technical support, installation assistance, or questions:

- **Documentation:** Refer to Technical_Documentation.md and User_Manual.md
- **Issues:** [Specify issue tracking system or contact method]
- **Support:** [Provide support contact information]

## Version History

- **v1.0:** Initial release
  - Two-axis scanning system
  - LiDAR distance measurement
  - Web-based configuration
  - FreeRTOS-based firmware

## Contributing

[Specify contribution guidelines if applicable]

## Acknowledgments

[Specify acknowledgments if applicable]

---

**Note:** This project includes hardware design and embedded firmware only. No separate PC or desktop software is provided. The web interface is accessed through an external communication module (ESP8266 or HLK RM04) that bridges UART to Ethernet/WiFi.

For detailed information, please refer to:
- **[Technical_Documentation.md](Technical_Documentation.md)** - For developers and engineers
- **[User_Manual.md](User_Manual.md)** - For installers and operators
