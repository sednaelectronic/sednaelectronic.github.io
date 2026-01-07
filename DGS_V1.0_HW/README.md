# DGS V1.0.0 - Aircraft Docking Guidance System

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/your-repo/DGS_V1.0.0)
[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](LICENSE)

## Overview

The **DGS (Aircraft Docking Guidance System)** is an automated guidance system designed to assist aircraft during docking operations at airport gates. The system uses advanced laser scanning technology combined with computer vision to detect aircraft position in real-time and provide accurate guidance information to ground marshals and pilots.

### Purpose

The DGS system helps ensure:
- **Accurate positioning** of aircraft at gate parking positions
- **Safety** by providing precise distance and direction information
- **Efficiency** by reducing docking time and manual guidance errors
- **Documentation** through automated recording of docking operations

### Key Features

- 🎯 **Real-time Aircraft Detection** - Laser scanning detects aircraft front wheel position
- 📊 **Precise Distance Calculation** - Calculates lateral and forward distances to stop point
- 🧭 **Direction Guidance** - Provides LEFT/CENTER/RIGHT guidance for alignment
- 📹 **Video Recording** - Records docking operations for analysis
- 🌡️ **Environmental Monitoring** - Monitors temperature, humidity, and light conditions
- 🌐 **Web-based Interface** - Easy-to-use web interface for control and monitoring
- 📱 **Marshal Display** - Real-time display for ground marshals

---

## Repository Structure

```
DGS_V1.0.0/
│
├── Software/                    # All software components
│   ├── RPI/                    # Raspberry Pi main application
│   │   └── DGS 12-8/          # Flask web application and core logic
│   └── UI_Panel/               # User interface applications
│       ├── DGS_UI H_A/        # Camera viewer and person detection
│       └── New-digitizer/     # Digitizer UI components
│
├── Program/                     # Firmware and embedded code
│   ├── MicroController/        # Microcontroller firmware
│   │   ├── V1_Bermetal/       # Controller firmware (bare metal)
│   │   │   └── Controller/    # Main controller code
│   │   └── V2_RTOS/           # Scanner firmware (FreeRTOS)
│   │       └── Scanner/       # Scanner board firmware
│   └── Python/                 # Python utilities
│       └── RS485_UI/          # RS485 communication UI
│
├── PCB/                         # Hardware design files
│   ├── Controller/             # Controller board designs
│   │   ├── AirPlan_Controller_PCB_Project/
│   │   ├── Up_Controller_PCB_Project/
│   │   └── Down_Controller_PCB_Project/
│   ├── Up_Board/               # Scanner board design
│   │   └── PCB/DepoGraph(new)/
│   └── Down_Board/             # Additional board designs
│
├── Docs/                        # Existing documentation
│   ├── Technical Documentation Main Controller .pdf
│   ├── Technical Documentation Scanner Board.pdf
│   └── ... (other documentation files)
│
├── Technical_Documentation.md   # Comprehensive technical documentation
├── User_Manual.md               # User manual for technicians
└── README.md                    # This file
```

---

## System Architecture

### Hardware Components

1. **Scanner Unit**
   - STM32F105RB microcontroller
   - Dual-axis stepper motor system (DRV8825 drivers)
   - LiDAR distance sensor
   - MPU6050 gyroscope/accelerometer
   - Optocouplers for position sensing

2. **Controller Units**
   - STM32F105RB microcontroller
   - Temperature sensors (DS18B20, DHT22)
   - Light sensor (LDR)
   - Door switch monitoring
   - Relay outputs for fan/heater control
   - RS485 communication

3. **Computer System**
   - Raspberry Pi 4 (or compatible)
   - Web server (Flask)
   - Database (SQLite)
   - Camera interfaces

4. **Peripheral Devices**
   - IP cameras (RTSP)
   - Display screens
   - Network infrastructure

### Software Components

1. **Raspberry Pi Application**
   - Flask web framework
   - Real-time data processing
   - Coordinate conversion algorithms
   - TCP/IP communication
   - Database management

2. **Firmware**
   - Scanner firmware (FreeRTOS-based)
   - Controller firmware (bare metal)
   - Communication protocols
   - Motor control algorithms

3. **User Interfaces**
   - Web-based control interface
   - Marshal display interface
   - Camera viewer application
   - RS485 monitoring tool

---

## Quick Start

### Prerequisites

**Hardware:**
- Scanner unit (assembled)
- Controller units (as required)
- Raspberry Pi 4 (4GB RAM minimum)
- Power supplies (12V DC)
- Network infrastructure
- IP cameras (optional)

**Software:**
- Raspberry Pi OS (latest version)
- Python 3.7 or higher
- Network connectivity

### Installation Steps

1. **Hardware Setup**
   - Mount scanner unit above gate (4-6 meters high)
   - Install controller units in weatherproof enclosures
   - Connect all power and communication cables
   - Verify all connections are secure

2. **Software Installation**
   ```bash
   # Clone or copy repository to Raspberry Pi
   cd /home/pi/
   
   # Navigate to application directory
   cd DGS_V1.0.0/Software/RPI/DGS\ 12-8/DGS\ 12-8/
   
   # Install Python dependencies
   pip3 install flask sqlite3 opencv-python numpy RPi.GPIO requests pyserial
   
   # Set serial port permissions
   sudo chmod 666 /dev/serial0
   sudo chmod 666 /dev/ttyAMA4
   ```

3. **Configuration**
   - Access web interface: `http://<raspberry-pi-ip>:60000`
   - Login to admin panel
   - Configure aircraft types
   - Set up centerline parameters
   - Configure system parameters

4. **Start System**
   ```bash
   # Run application
   python3 run.py
   
   # Or use systemd service (if configured)
   sudo systemctl start dgs.service
   ```

### First-Time Setup

1. **Access Web Interface**
   - Open browser: `http://<raspberry-pi-ip>:60000`
   - Navigate to admin panel: `/admin`

2. **Configure Aircraft Types**
   - Go to Dashboard → Aircraft
   - Add aircraft types (A320, B777, etc.)
   - Enter parameters: nose height, wheel width, stop points

3. **Configure Centerline**
   - Go to Dashboard → Centerline
   - Define start and end points
   - Set tolerance width

4. **Test System**
   - Test scanner communication
   - Verify sensor readings
   - Perform test scan

For detailed installation instructions, see the [User Manual](User_Manual.md).

---

## Documentation

This repository includes comprehensive documentation:

### 📘 [Technical Documentation](Technical_Documentation.md)

**For:** Engineers and Developers

**Contents:**
- Hardware architecture and PCB design
- Electronic components and specifications
- Microcontroller pin mapping and configuration
- Firmware architecture and algorithms
- Software architecture and modules
- Communication protocols
- Build and deployment procedures
- System integration details

### 📗 [User Manual](User_Manual.md)

**For:** Technicians and End Users

**Contents:**
- System overview in simple language
- Safety information and warnings
- Required tools and equipment
- Hardware installation procedures
- Wiring and connection instructions
- Software installation guide
- Initial setup and configuration
- Normal operation procedures
- Maintenance schedules
- Troubleshooting guide

### 📙 Existing Documentation

Additional documentation available in the `Docs/` directory:
- Technical Documentation Main Controller
- Technical Documentation Scanner Board
- Technical Documentation Scanner Program
- RS485 Communication Documentation

---

## System Requirements

### Hardware Requirements

**Scanner Unit:**
- Power: 12V DC, 5-10A
- Operating Temperature: -20°C to +60°C
- Mounting Height: 4-6 meters above ground
- Clear line of sight to parking area

**Controller Units:**
- Power: 12V DC, 1A
- Operating Temperature: -20°C to +60°C
- Weatherproof enclosure required

**Raspberry Pi:**
- Model: Raspberry Pi 4 (4GB RAM minimum)
- Storage: 32GB SD card minimum
- Network: Ethernet or WiFi
- Operating System: Raspberry Pi OS (latest)

### Software Requirements

**Raspberry Pi:**
- Python 3.7 or higher
- Flask web framework
- OpenCV (for camera processing)
- NumPy (for calculations)
- SQLite3 (database)
- RPi.GPIO (hardware control)

**Development (Optional):**
- STM32CubeMX (for firmware development)
- Keil MDK-ARM or STM32CubeIDE
- Python development tools

---

## Communication Protocols

### UART Protocol
- **Baud Rate:** 115200
- **Data Format:** 8N1 (8 data bits, no parity, 1 stop bit)
- **Scanner ↔ Raspberry Pi:** Custom command protocol
- **Controller ↔ Raspberry Pi:** Command/response protocol

### RS485 Protocol
- **Baud Rate:** 115200
- **Multi-drop:** Up to 32 devices
- **Termination:** 120Ω resistors at bus ends

### TCP/IP Protocol
- **Port:** 65432 (data transmission)
- **Port:** 60000 (web interface)
- **Format:** Plain text or JSON

### RTSP Protocol
- **Port:** 554 (standard)
- **Cameras:** IP-based RTSP streaming

---

## Key Features and Capabilities

### Aircraft Detection
- Detects front wheel position using laser scanning
- Identifies aircraft type by nose height
- Calculates wheel center position
- Projects position onto centerline

### Guidance Calculation
- **Lateral Distance:** Distance from centerline (left/right)
- **Forward Distance:** Distance to stop point
- **Direction:** LEFT, CENTER, or RIGHT guidance

### Data Processing
- Real-time coordinate conversion (spherical to Cartesian)
- Centerline projection algorithms
- Distance calculations
- Aircraft type validation

### Monitoring and Control
- Environmental monitoring (temperature, humidity, light)
- Door status monitoring
- Battery voltage monitoring
- Fan/heater control
- System status monitoring

---

## Usage Examples

### Starting a Docking Operation

1. **Select Aircraft Type**
   - Choose from dropdown on control interface
   - System loads appropriate parameters

2. **Start Scanning**
   - Click "Start Scan" button
   - Scanner moves to start position
   - Scanning begins automatically

3. **Monitor Guidance**
   - Watch marshal display for real-time guidance
   - Information updates continuously
   - System stops automatically at stop point

### Web Interface Access

- **Main Control:** `http://<ip>:60000/control`
- **Admin Panel:** `http://<ip>:60000/admin`
- **Dashboard:** `http://<ip>:60000/Dashboard`
- **Marshal Display:** `http://<ip>:60000/Marshal`

---

## Development

### Building Firmware

**Scanner Firmware:**
```bash
# Open project in STM32CubeMX
# Load: DGS_Scanner_RTOS_V1.ioc
# Generate code
# Build in Keil MDK-ARM or STM32CubeIDE
```

**Controller Firmware:**
```bash
# Open project in STM32CubeMX
# Load: TEST_Controller.ioc
# Generate code
# Build in Keil MDK-ARM or STM32CubeIDE
```

### Software Development

**Setting up Development Environment:**
```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt
```

**Running Tests:**
```bash
# Run application in development mode
python3 run.py

# Access web interface
# http://localhost:60000
```

---

## Maintenance

### Regular Maintenance

- **Daily:** System status checks
- **Weekly:** Connection verification, sensor checks
- **Monthly:** Cleaning, calibration verification
- **Quarterly:** Full system inspection, software updates

See [User Manual - Maintenance Section](User_Manual.md#maintenance) for detailed procedures.

### Backup Procedures

**Database Backup:**
```bash
cp db.sqlite3 db.sqlite3.backup.$(date +%Y%m%d)
```

**Configuration Backup:**
- Export configuration from web interface
- Store in secure location

---

## Troubleshooting

### Common Issues

**Scanner Not Responding:**
- Check power supply and connections
- Verify UART communication
- Check firmware is loaded

**Web Interface Not Accessible:**
- Verify network connectivity
- Check Flask service is running
- Verify port 60000 is not blocked

**Incorrect Guidance:**
- Recalibrate centerline
- Verify aircraft parameters
- Check scanner alignment

For detailed troubleshooting, see the [User Manual - Troubleshooting Section](User_Manual.md#troubleshooting).

---

## Safety and Compliance

### Safety Warnings

⚠️ **IMPORTANT SAFETY INFORMATION:**
- Do not look directly into the laser scanner
- Disconnect power before maintenance
- Follow all electrical safety procedures
- Ensure proper grounding
- Keep clear of moving parts during operation

See [User Manual - Safety Information](User_Manual.md#safety-information) for complete safety guidelines.

### Environmental Considerations

- Operating Temperature: -20°C to +60°C
- Weatherproof enclosures required for outdoor components
- Proper ventilation for electronic components
- Protection from vibration and shock

---

## Support and Contact

### Documentation

- **Technical Questions:** See [Technical Documentation](Technical_Documentation.md)
- **Installation Help:** See [User Manual](User_Manual.md)
- **Quick Reference:** See this README

### Getting Help

1. Check documentation for your issue
2. Review troubleshooting sections
3. Check system logs for errors
4. Contact your system administrator
5. Contact technical support with:
   - Detailed problem description
   - System configuration
   - Relevant logs
   - Error messages

---

## Version History

### Version 1.0.0 (Current)
- Initial release
- Scanner system with dual-axis control
- Controller system with environmental monitoring
- Web-based interface
- Camera integration
- Database configuration system

---

## License

This is proprietary software. All rights reserved.

---

## Acknowledgments

Developed for aircraft docking guidance applications.

---

## Quick Links

- 📘 [Technical Documentation](Technical_Documentation.md) - For engineers and developers
- 📗 [User Manual](User_Manual.md) - For technicians and end users
- 📁 [PCB Designs](PCB/) - Hardware design files
- 💻 [Software Source](Software/) - Application source code
- 🔧 [Firmware Source](Program/) - Embedded firmware code
- 📚 [Additional Docs](Docs/) - Additional documentation

---

**Last Updated:** 2025  
**Version:** 1.0.0  
**System:** DGS - Aircraft Docking Guidance System
