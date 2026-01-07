# DepoGraph V1.0

A 3D scanning system that scans the surrounding environment along two mechanical axes and produces point cloud output.

## Overview

DepoGraph V1.0 is a precision 3D scanning system designed for creating detailed point cloud representations of indoor environments. The system employs a two-axis mechanical gimbal mechanism with a laser distance sensor to systematically scan and map spatial data.

### Key Features

- **Two-Axis Mechanical Scanning**: Horizontal (Theta) and vertical (Phi) rotation for complete 360° coverage
- **High Precision Distance Measurement**: TFmini LiDAR sensor with sub-millimeter accuracy
- **Automated Scanning**: Configurable scan patterns with automatic data collection
- **Real-Time Processing**: Converts raw sensor data to 3D point clouds in real-time
- **Web-Based Control Interface**: Easy-to-use web interface for configuration and operation
- **Multiple Export Formats**: OBJ format compatible with standard 3D software

## Purpose and Use Cases

DepoGraph V1.0 is designed for:

- **Inventory Management**: 3D mapping of storage facilities and warehouses
- **Volume Calculation**: Accurate volume measurements of storage areas
- **Space Planning**: Creating 3D models for layout optimization
- **Documentation**: Generating point cloud records of spaces
- **Quality Control**: Verifying spatial dimensions and layouts

## System Architecture

### Hardware Components

- **Embedded Controller**: STM32F105RBT6 microcontroller
  - Motion control and data acquisition
  - Stepper motor control (DRV8825 drivers)
  - Sensor interfacing (LiDAR, accelerometer)
  
- **Scanning Mechanism**: Two-axis stepper motor gimbal
  - Theta axis: 0-180° horizontal rotation (32,000 steps/360°)
  - Phi axis: 0-90° vertical rotation (22,400 steps/360°)
  
- **Sensors**:
  - TFmini LiDAR distance sensor (0.3-12m range)
  - ADXL345 accelerometer (orientation monitoring)
  - Optocoupler home position sensors
  
- **Computing Platform**: Raspberry Pi
  - Data processing and storage
  - Web interface hosting
  - Communication with embedded controller

### Software Components

- **Embedded Firmware**: STM32 HAL-based firmware
  - Motion control algorithms
  - Sensor data acquisition
  - Serial communication protocol
  
- **PC Software**: Python-based application
  - Flask web server
  - Serial communication interface
  - Point cloud processing pipeline
  - Coordinate transformation algorithms
  - Mesh generation and volume calculation

## Repository Structure

```
DepoGraphV1.0/
├── Code/                          # Microcontroller firmware
│   └── MicroController_Code/
│       └── DepoGraph_V2_Code/
│           └── Stm32f105/
│               └── Drv2855/
│                   └── DRV2855/   # STM32 project files
│
├── Software/                      # PC-side application software
│   └── RPI_CODE/
│       └── Depo-New Class 02-03-10/
│           ├── main.py            # Core scanning logic
│           ├── run.py             # Flask web server
│           ├── exclusiveMath.py   # Math and transformation functions
│           ├── templates/         # HTML templates
│           ├── static/            # CSS/JS assets
│           └── FTP/               # Output directory
│
├── PCB/                           # Hardware design files
│   └── DepoGraph/
│       └── finish/
│           └── DepoGraph(new)/    # Altium Designer project files
│               ├── Master.SchDoc  # Main schematic
│               ├── STM32f105.SchDoc
│               ├── DRV8825.SchDoc
│               ├── Laser.SchDoc
│               └── ...
│
├── Docs/                          # Existing documentation
│   ├── Technical Documentation RaspberryPi.pdf
│   ├── DepoGraph V1 Circuit.pdf
│   └── ...
│
├── Technical_Documentation.md     # Technical documentation
├── User_Manual.md                 # User manual
└── README.md                      # This file
```

## Quick Start Guide

### Prerequisites

**Hardware**:
- DepoGraph V1.0 scanning system
- Raspberry Pi (Model 3B+ or newer)
- 12V/24V DC power supply
- Ethernet or WiFi connection

**Software**:
- Raspberry Pi OS (Raspbian)
- Python 3.7+
- Required Python packages (see installation)

### Installation

1. **Clone or Extract Repository**
   ```bash
   cd ~
   # Extract or copy DepoGraphV1.0 folder
   ```

2. **Install Dependencies**
   ```bash
   sudo apt update
   sudo apt install python3-pip python3-venv -y
   pip3 install flask pyserial requests pandas tqdm RPi.GPIO
   ```

3. **Enable Serial Interface**
   ```bash
   sudo raspi-config
   # Navigate to: Interfacing Options → Serial Port → Enable
   ```

4. **Set Permissions**
   ```bash
   sudo usermod -a -G dialout $USER
   sudo chmod 666 /dev/serial0
   ```

5. **Navigate to Software Directory**
   ```bash
   cd ~/DepoGraphV1.0/Software/RPI_CODE/Depo-New\ Class\ 02-03-10/
   ```

6. **Start Web Server**
   ```bash
   python3 run.py
   ```

7. **Access Web Interface**
   - Open browser: `http://raspberry-pi-ip:60000`
   - Default page: Control interface

### Basic Usage

1. **Connect Hardware**
   - Connect scanner to Raspberry Pi via UART
   - Connect power supply
   - Verify all connections

2. **Calibrate System**
   - Access web interface
   - Set home position (click "Go Home")
   - Configure benchmark points (3 points)
   - Define scan area (4 corner points)

3. **Configure Scan**
   - Set project name and zone name
   - Adjust point spacing and mesh resolution
   - Set initial volume (if needed)

4. **Start Scan**
   - Click "Quick Start" button
   - Monitor progress in web interface
   - Wait for completion

5. **Access Results**
   - Point cloud files in `FTP/` directory
   - `point_Cloud.obj`: 3D point cloud
   - `meshed.obj`: Triangulated mesh
   - View in MeshLab, Blender, or CloudCompare

## Documentation

### For Developers and Engineers

- **[Technical Documentation](Technical_Documentation.md)**: Comprehensive technical documentation covering:
  - Hardware architecture and design
  - Embedded firmware details
  - Software architecture
  - Communication protocols
  - Coordinate transformations
  - Build and deployment instructions

### For Operators and Technicians

- **[User Manual](User_Manual.md)**: Complete user guide including:
  - System overview and components
  - Assembly instructions
  - Electrical wiring
  - Calibration procedures
  - Operating instructions
  - Troubleshooting guide
  - Maintenance procedures

## System Specifications

### Scanning Performance

- **Angular Resolution**: Configurable (1, 2, 4, 8, 16, 32 microsteps)
- **Distance Range**: 0.3m - 12m
- **Distance Accuracy**: ±2% (typical)
- **Scan Speed**: Variable (depends on resolution)
- **Field of View**: 180° horizontal × 90° vertical

### Electrical Specifications

- **Motor Power**: 12V/24V DC
- **Logic Power**: 3.3V, 5V
- **Communication**: UART @ 115200 baud
- **Current Consumption**: ~2A @ 12V (motors), ~500mA @ 5V (logic)

### Software Requirements

- **Operating System**: Raspberry Pi OS (Linux)
- **Python Version**: 3.7+
- **Web Browser**: Modern browser with JavaScript support
- **Storage**: Minimum 1GB free space per scan

## Communication Protocol

The system uses a custom serial protocol over UART:

- **Baud Rate**: 115200
- **Data Format**: 8N1 (8 data bits, no parity, 1 stop bit)
- **Command Format**: 9-byte ASCII strings
- **Response Format**: Variable-length ASCII strings

Example commands:
- `GOHOME *,` - Move to home position
- `S#START*` - Start scanning
- `H+00100*` - Move Theta +100 steps
- `QIST000*` - Query distance

See [Technical Documentation](Technical_Documentation.md) for complete protocol reference.

## Output Formats

### Point Cloud Files

- **OBJ Format**: Standard Wavefront OBJ format
  - Vertex data: `v x y z`
  - Face data: `f v1 v2 v3` (in mesh files)
  - Compatible with most 3D software

### Data Files

- **raw.txt**: Raw serial data from scanner
- **RTPS.txt**: Processed spherical coordinates (Radius, Theta, Phi, Strength)
- **point_Cloud.obj**: Cartesian coordinate point cloud
- **meshed.obj**: Triangulated mesh with volume calculation

## Development

### Firmware Development

The embedded firmware is built using:
- **IDE**: STM32CubeIDE or Keil MDK-ARM
- **Framework**: STM32 HAL Library
- **Target**: STM32F105RBT6

To build firmware:
1. Open project in STM32CubeIDE
2. Configure project settings
3. Build project
4. Flash to microcontroller

### Software Development

The PC software is Python-based:
- **Framework**: Flask (web server)
- **Libraries**: pyserial, pandas, numpy
- **Database**: SQLite

To modify software:
1. Edit Python files in `Software/RPI_CODE/Depo-New Class 02-03-10/`
2. Test changes locally
3. Deploy to Raspberry Pi

## Troubleshooting

### Common Issues

**Scanner not responding**:
- Check power connections
- Verify serial communication
- Check motor enable signals

**Inaccurate distances**:
- Clean sensor lens
- Verify sensor alignment
- Check target surface properties

**Web interface not accessible**:
- Verify Raspberry Pi is running
- Check network connection
- Ensure web server is started

See [User Manual](User_Manual.md) for detailed troubleshooting guide.

## Safety

⚠️ **Important Safety Information**:

- Always disconnect power before making connections
- Verify correct voltage and polarity
- Keep hands away from moving parts during operation
- Do not stare directly into laser beam
- Ensure stable mounting surface
- Follow all safety precautions in User Manual

## License

See [LICENSE](LICENSE) file for license information.

## Support

For technical support:
1. Review [Technical Documentation](Technical_Documentation.md)
2. Check [User Manual](User_Manual.md) troubleshooting section
3. Review system logs and error messages
4. Contact system administrator or support team

## Version History

- **V1.0**: Initial release
  - Two-axis scanning system
  - Web-based control interface
  - Point cloud generation
  - Mesh creation and volume calculation

## Contributing

This is a proprietary project. For contributions or modifications, contact the project maintainers.

## Acknowledgments

Developed by the DepoGraph development team.

---

**For detailed information, please refer to:**
- [Technical Documentation](Technical_Documentation.md) - For developers and engineers
- [User Manual](User_Manual.md) - For operators and technicians

**Last Updated**: 2025
