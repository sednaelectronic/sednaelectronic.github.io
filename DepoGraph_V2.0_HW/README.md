# DepoGraph V2.0 - 3D Scanner Project

## Overview

DepoGraph V2.0 is a professional 3D laser scanning system designed for accurate spatial measurement and point cloud generation. The system consists of two main variants: **Fixed** and **Portable**, each optimized for different deployment scenarios.

> **📖 Documentation**: This repository includes comprehensive documentation. See the [Documentation](#documentation) section for links to all available guides and references.

## Project Structure

```
DepoGraphV2.0/
├── FIX/                          # Fixed version scanner
│   └── Program/
│       └── Microcontroller/      # STM32H7 microcontroller code (RTOS)
│
├── Portable_DepoGraph_V1/        # Portable version V1
│   ├── MicroController_Code/    # STM32F105 microcontroller code
│   ├── matlab code/              # MATLAB data processing scripts
│   └── Pcb/                      # PCB schematics and designs
│
├── Portable_DepoGraph_V2/        # Portable version V2 (latest)
│   ├── MicroController_Code/    # STM32F105 microcontroller code
│   ├── matlab code/              # MATLAB data processing scripts
│   └── Pcb/                      # PCB schematics and designs
│
├── Program/
│   ├── RPI_CODE/                 # Raspberry Pi controller code
│   │   ├── ok/                   # Working version (Flask web interface)
│   │   └── Depo-New Class 02-03-10/  # Alternative version
│   ├── STM32/                    # STM32 test and development code
│   └── Depo_Code_V1_Ok/          # Version 1 code archive
│
├── Pcb/                          # PCB designs and schematics
│   ├── DepoGraph_Main_V2PCB_Project/  # Main controller board
│   ├── Depo-Power-V2/            # Power supply board
│   ├── Depo_Phi_Controller/      # Phi axis controller board
│   └── POWER SUPPLY DEPO/        # Power supply schematics
│
├── Documents/                    # Technical documentation
│   ├── Command.pdf               # Command reference
│   └── DepoGraph PCB DOC.pdf     # PCB documentation
│
└── NewDepo_File/                 # Development and test files
    ├── NewDepoGraph/             # New development version
    ├── RTOS_Test/                # RTOS testing code
    └── stmH7_Test/                # STM32H7 test code
```

## System Architecture

### Fixed Version (FIX/)
- **Microcontroller**: STM32H743VIT6 (ARM Cortex-M7)
- **Operating System**: FreeRTOS
- **Communication**: TCP Socket connection to server
- **Control**: Remote server-based control
- **Features**: 
  - High-performance scanning
  - Network-based operation
  - Real-time data transmission

### Portable Version (Portable_DepoGraph_V2/)
- **Microcontroller**: STM32F105RBT6 (ARM Cortex-M3)
- **Communication**: Serial UART to Raspberry Pi
- **Control**: Web-based interface on Raspberry Pi
- **Features**:
  - Standalone operation
  - Web interface for control
  - Local data processing

## Hardware Components

### Main Controller Board
- **MCU**: STM32H7 (Fixed) / STM32F105 (Portable)
- **Stepper Drivers**: DRV8825 (Fixed) / DRV2855 (Portable)
- **Sensors**:
  - TF350 Laser Distance Sensor (LiDAR)
  - DS18B20 Temperature Sensor
  - MPU6050/MPU9250 IMU (motion detection)
  - DS3231 RTC (Real-time clock)
  - ADXL345 Accelerometer (Portable version)
- **Communication**:
  - UART for Raspberry Pi communication
  - Ethernet (Fixed version)
  - RS485 (optional)
- **Storage**: AT24CXX EEPROM, SD Card support

### Raspberry Pi Controller
- **Model**: Raspberry Pi Zero (or compatible)
- **Interface**: Flask web application
- **Functions**:
  - Web-based scanner control
  - Data acquisition and processing
  - Point cloud generation
  - FTP upload to server

## Software Components

### STM32 Firmware
- **Development Environment**: STM32CubeIDE / Keil MDK-ARM
- **HAL Library**: STM32 HAL drivers
- **RTOS**: FreeRTOS (Fixed version)
- **Key Modules**:
  - Stepper motor control (Theta/Phi axes)
  - Laser sensor interface (TF350)
  - Communication protocol handler
  - Scanning algorithm
  - Home position detection

### Raspberry Pi Software
- **Language**: Python 3
- **Framework**: Flask (web interface)
- **Libraries**:
  - `serial` - UART communication
  - `sqlite3` - Database management
  - `RPi.GPIO` - GPIO control
  - `requests` - HTTP requests
  - `ftplib` - FTP upload

### Data Processing
- **MATLAB Scripts**: Point cloud processing and conversion
- **Python Math Module**: Coordinate transformations (RTPS to XYZ)
- **Output Formats**: 
  - Raw data (.txt)
  - RTPS format (Range, Theta, Phi, Strength)
  - OBJ format (3D point cloud)

## Quick Start Guide

> **📚 Need more details?** Check the [Documentation](#documentation) section below for comprehensive guides, or see [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for a quick command reference.

### For Fixed Version

1. **Hardware Setup**:
   - Connect STM32H7 board to power
   - Connect Ethernet cable
   - Connect Raspberry Pi via UART

2. **Firmware Upload**:
   - Open project in STM32CubeIDE
   - Build and flash to STM32H7
   - Location: `FIX/Program/Microcontroller/RTOS/`

3. **Raspberry Pi Setup**:
   - Install Python dependencies
   - Configure TCP socket connection
   - Start server application

### For Portable Version

1. **Hardware Setup**:
   - Connect STM32F105 board to power
   - Connect Raspberry Pi via UART (GPIO pins)
   - Connect stepper motors and sensors

2. **Firmware Upload**:
   - Open project in STM32CubeIDE or Keil
   - Build and flash to STM32F105
   - Location: `Portable_DepoGraph_V2/MicroController_Code/DepoGraph_V2_Code/Stm32f105/Drv2855/DRV2855/`

3. **Raspberry Pi Setup**:
   ```bash
   cd Program/RPI_CODE/ok/Depo-New\ Class\ 02-03-10/
   pip install flask serial RPi.GPIO requests
   python run.py
   ```
   - Access web interface at `http://raspberry-pi-ip:5000`
   - Default credentials: See `OsConfig.txt`

## Communication Protocol

### Command Format
Commands follow the pattern: `[COMMAND][VALUE]*,`

**Example Commands**:
- `H+00100*,` - Move horizontal (Theta) +100 steps
- `V+00500*,` - Move vertical (Phi) +500 steps
- `GOHOME *,` - Return to home position
- `S#START*,` - Start scanning
- `GETTEMP*,` - Get temperature
- `QIST000*,` - Query laser distance

### Response Format
- Distance data: `[Distance],[Strength],[Phi]\n`
- Theta position: `[Theta]*,\n`
- Status: `[Status]*,\n`

## Scanning Process

1. **Configuration**: Set scan parameters (start/end angles, step size)
2. **Calibration**: Home position detection
3. **Scanning**: Automated scanning with laser distance measurement
4. **Data Collection**: Raw data collection via serial
5. **Processing**: Convert RTPS to XYZ coordinates
6. **Output**: Generate OBJ point cloud file
7. **Upload**: FTP upload to server (Fixed version)

## File Descriptions

### Key Directories

- **`FIX/Program/Microcontroller/RTOS/`**: Fixed version STM32H7 firmware with RTOS
- **`Portable_DepoGraph_V2/MicroController_Code/`**: Portable version STM32F105 firmware
- **`Program/RPI_CODE/ok/Depo-New Class 02-03-10/`**: Raspberry Pi web interface
- **`Pcb/DepoGraph_Main_V2PCB_Project/`**: Main controller PCB design files
- **`Documents/`**: Technical documentation and datasheets

### Important Files

- **`main.py`**: Raspberry Pi serial communication and scanning logic
- **`run.py`**: Flask web server for portable version
- **`exclusiveMath.py`**: Mathematical transformations (RTPS to XYZ)
- **`main.c`**: STM32 main application code
- **`scan.c`**: Scanning algorithm implementation
- **`raspberrypi.c`**: Command parser for RPi communication
- **`stepper.c`**: Stepper motor control functions

## Configuration Files

- **`OsConfig.txt`**: Raspberry Pi WiFi and login credentials
- **`config.h`**: STM32 scan parameters and motor speeds
- **`Pinout.txt`**: GPIO pin assignments
- **`Cable_Color.txt`**: Cable color coding reference

## Development Tools

- **STM32CubeIDE**: STM32 firmware development
- **Keil MDK-ARM**: Alternative STM32 IDE
- **Altium Designer**: PCB design (schematic files)
- **MATLAB**: Data processing and analysis
- **Python 3**: Raspberry Pi application development

## Dependencies

### STM32 Firmware
- STM32 HAL Library
- CMSIS Core
- FreeRTOS (Fixed version only)

### Raspberry Pi
- Python 3.x
- Flask
- pyserial
- RPi.GPIO
- requests
- sqlite3

## Troubleshooting

### Common Issues

1. **Serial Communication Failure**:
   - Check UART baud rate (115200)
   - Verify GPIO pin connections
   - Check `/dev/serial0` permissions

2. **Motor Not Moving**:
   - Verify stepper driver connections
   - Check enable pin states
   - Verify step/direction signals

3. **Laser Sensor Not Responding**:
   - Check power supply (12V)
   - Verify UART connection
   - Check sensor initialization

4. **Web Interface Not Loading**:
   - Check Flask server is running
   - Verify network connection
   - Check firewall settings

## Version History

- **V2.0**: Current version with dual variant support
- **V1**: Initial portable version

## License

See `LICENSE` file for details.

## Documentation

### Main Documentation Files

- **[TECHNICAL_DOCS.md](TECHNICAL_DOCS.md)** - Comprehensive technical documentation covering architecture, hardware, software, protocols, and troubleshooting
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Quick reference guide with common commands, file locations, and troubleshooting quick fixes
- **[DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)** - Complete index and navigation guide for all documentation files

### Version-Specific Documentation

- **[FIX/README.md](FIX/README.md)** - Fixed version documentation (STM32H7 + RTOS)
- **[Portable_DepoGraph_V2/README.md](Portable_DepoGraph_V2/README.md)** - Portable version V2 documentation (STM32F105)

### Component Documentation

- **[Program/RPI_CODE/README.md](Program/RPI_CODE/README.md)** - Raspberry Pi controller application documentation
- **[Pcb/README.md](Pcb/README.md)** - PCB design documentation and manufacturing notes

### Additional Resources

- **Command Reference**: `Documents/Command.pdf` - Detailed command protocol reference
- **PCB Documentation**: `Documents/DepoGraph PCB DOC.pdf` - PCB design documentation
- **Component Datasheets**: `Documents/Pdf/` - Datasheets for all components
- **Project Documentation**: `Documents/Project Documentation.pdf` - Additional project details

### Quick Links

- 🚀 **Getting Started**: Start with this README, then check [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
- 🔧 **Technical Details**: See [TECHNICAL_DOCS.md](TECHNICAL_DOCS.md) for in-depth information
- 📋 **Navigation**: Use [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) to find specific topics
- 🔌 **Hardware**: Check [Pcb/README.md](Pcb/README.md) for PCB and hardware details
- 💻 **Software**: See version-specific READMEs for firmware and application details

## Contributors

- Hardware Design: See PCB project files
- Firmware Development: STM32 codebase
- Software Development: Raspberry Pi application

---

**Note**: This is a complex embedded system. Ensure proper understanding of hardware connections and software configuration before operation.
