# Rasad (Metro) v1.0 - Railway Safety Monitoring System

## Overview

**Rasad** (also known as **Metro**) v1.0 is a comprehensive railway/metro safety monitoring system designed to enhance passenger safety on metro platforms. The system automatically detects train movement and passenger safety violations, providing real-time alerts to station operators.

### Purpose

The system addresses critical safety concerns in metro operations:

- **Train Detection**: Monitors train entry and exit events in metro tunnels
- **Passenger Safety**: Detects when passengers cross the yellow safety line at platform edges
- **Unauthorized Access**: Identifies when individuals enter restricted tunnel areas
- **Real-time Alerts**: Provides immediate visual and audio warnings to station staff

### Safety Use Cases

1. **Yellow Line Violations**: Automatically detects when passengers step over the yellow safety line and triggers audio warnings instructing them to step back
2. **Train Movement Tracking**: Monitors train positions in tunnels to provide situational awareness
3. **Tunnel Intrusion Detection**: Alerts when unauthorized persons enter tunnel areas
4. **Door Status Monitoring**: Tracks platform door open/close states

---

## System Architecture Summary

The Rasad v1.0 system consists of three main subsystems:

### 1. Sensor Units

**A. Tunnel Sensors (Train Detection)**
- Installed inside metro tunnels
- Use LiDAR (TFMini) technology for distance measurement
- Detect train entry and exit events
- Transmit data wirelessly to receiver

**B. Yellow Line Sensors (Passenger Safety)**
- Installed along the yellow safety line at platform edges
- Use IR (infrared) detection technology
- Detect when passengers cross the safety line
- Trigger safety warnings automatically

**Key Features:**
- Wireless communication (nRF24L01 2.4GHz)
- ESP8266 microcontroller
- Configurable detection thresholds
- Local signal processing

### 2. Receiver Unit

- Receives data from all sensor units via wireless communication
- Aggregates and processes sensor events
- Forwards data to computer system via USB-Serial interface
- Displays system status on LCD screen

### 3. Software System

**Components:**
- **Python Application**: Receives serial data, processes events, updates database
- **Web Dashboard**: Real-time monitoring interface with visual and audio alerts
- **MySQL Database**: Stores alarm states, logs, and configuration

**Features:**
- Real-time status visualization
- Automatic alert generation
- Event logging and history
- User management and access control
- Configurable alarm delays and thresholds

---

## Repository Structure

```
Rasad-Metro-_V1.0/
│
├── PCB/                          # Hardware design files
│   ├── ESP32/                    # ESP32-based sensor designs
│   ├── ESP8266/                  # ESP8266-based sensor designs
│   ├── Metro_V3(Esp8266)/        # Metro V3 sensor PCB designs
│   └── Reciver/                  # Receiver unit PCB designs
│
├── Program/                      # Embedded firmware source code
│   ├── Metro_Code/               # Main tunnel sensor firmware
│   │   └── final/                # Production firmware
│   ├── NewNRF_Reciver/           # Receiver firmware
│   ├── DOOR_IR/                  # Door sensor firmware
│   ├── esp8266_38KHZ/            # 38kHz signal generation
│   ├── arduino38khz/             # Arduino 38kHz timer code
│   ├── IR_Detector/              # IR detection circuit designs
│   └── IR_Trnasmit/              # IR transmission designs
│
├── Software/                     # PC-side software
│   ├── Python/                   # Python applications
│   │   ├── metro-ver2-Final/    # Final Python application
│   │   ├── python-code-metro/    # Python source code
│   │   └── Test_Serial/          # Serial communication test tools
│   └── WEB/                      # Web server files
│       ├── DataBase/             # Database schema (SQL)
│       └── webServer/            # PHP web application
│
├── Documents/                    # Project documentation
│   ├── Design_List.rtf           # Design documentation
│   └── List_Rasad(metro).xlsx   # Component lists
│
├── Technical_Documentation.md    # Technical documentation (engineers/developers)
├── User_Manual.md                # User manual (installers/operators)
└── README.md                     # This file
```

### Key Directories

- **`PCB/`**: Contains Altium Designer schematic and PCB layout files for all hardware components
- **`Program/`**: Contains Arduino/ESP8266/ESP32 firmware source code (.ino files)
- **`Software/Python/`**: Contains Python application for serial communication and database updates
- **`Software/WEB/`**: Contains PHP-based web dashboard for monitoring and control

---

## Quick Start Guide

### Prerequisites

**Hardware:**
- Tunnel sensor units (2×)
- Yellow line sensor units (2×)
- Receiver unit (1×)
- 12V power adapters (5×)
- USB cable for receiver connection

**Software:**
- Windows 10/11, Linux, or macOS
- Python 3.x (optional, if using Python version)
- Web server with PHP 7.3+ and MySQL 5.7+ (for web interface)

### Installation Steps

#### 1. Hardware Setup

1. **Install Sensors:**
   - Mount tunnel sensors in tunnels (see User Manual)
   - Mount yellow line sensors at platform edges
   - Connect 12V power to all units

2. **Install Receiver:**
   - Place receiver near monitoring computer
   - Connect USB cable to computer
   - Connect 12V power

3. **Verify Communication:**
   - Check receiver LCD for incoming messages
   - Verify all sensors are transmitting

#### 2. Software Setup

1. **Python Application:**
   ```bash
   # Option 1: Use executable
   # Run My_App.exe from Software/Python/metro-ver2-Final/
   
   # Option 2: Use Python script
   cd Software/Python/metro-ver2-Final/
   pip install PyQt5 pymysql pyserial
   python My_App.py
   ```

2. **Web Server:**
   ```bash
   # Copy web files to web server
   cp -r Software/WEB/webServer/metro2 /var/www/html/
   
   # Create database
   mysql -u root -p
   CREATE DATABASE rasad_metro;
   USE rasad_metro;
   SOURCE Software/WEB/DataBase/rasad_metro.sql;
   
   # Configure database connection
   # Edit fileatt/public/connection.php with your credentials
   ```

3. **Configuration:**
   - Create `Driver.dda` file with receiver USB hardware ID
   - Update database credentials in Python script
   - Configure sensor thresholds via web terminal

#### 3. Initial Configuration

1. **Access Web Interface:**
   - Open browser: `http://localhost/metro2/`
   - Login: Username `Admin`, Password `123456`

2. **Configure Sensors:**
   - Set tunnel numbers for each sensor
   - Calibrate distance thresholds
   - Test detection accuracy

3. **Configure Alarms:**
   - Set alarm delays in Alarms page
   - Enable/disable voice alerts
   - Test alert system

### Running the System

1. **Start Python Application:**
   - Launch `My_App.exe` or run Python script
   - Verify connection to receiver
   - Check for database connection

2. **Access Web Dashboard:**
   - Open web browser
   - Navigate to monitoring dashboard
   - Monitor real-time status

3. **Verify Operation:**
   - Check all sensors show "connected"
   - Test train detection
   - Test yellow line detection
   - Verify alerts are working

---

## Documentation

This project includes comprehensive documentation:

### 📘 [Technical Documentation](Technical_Documentation.md)

**Intended for:** Electronics engineers, embedded developers, and software developers

**Contents:**
- Hardware architecture and block diagrams
- Sensor hardware design details
- Receiver unit specifications
- Firmware architecture and algorithms
- Communication protocols
- Software architecture
- Database schema
- Build and deployment instructions

### 📗 [User Manual](User_Manual.md)

**Intended for:** Installers, technicians, and operators

**Contents:**
- System overview
- Installation instructions
- Hardware setup procedures
- Software installation
- Configuration guide
- Normal operation procedures
- Maintenance guidelines
- Troubleshooting guide

### 📙 README.md (This File)

**Intended for:** Project overview and quick reference

**Contents:**
- System overview
- Architecture summary
- Repository structure
- Quick start guide
- Documentation references

---

## System Components

### Hardware Components

| Component | Quantity | Description |
|-----------|----------|-------------|
| Tunnel Sensor | 2 | ESP8266 + LiDAR (TFMini) + nRF24L01 |
| Yellow Line Sensor | 2 | ESP8266 + IR Comparator + nRF24L01 |
| Receiver Unit | 1 | ESP32 + nRF24L01 + USB-Serial + LCD |
| Power Adapter | 5 | 12V/3A DC power supplies |

### Software Components

| Component | Technology | Purpose |
|-----------|------------|---------|
| Firmware | Arduino/ESP8266 | Sensor and receiver firmware |
| Python App | Python 3 + PyQt5 | Serial communication and database |
| Web Dashboard | PHP + MySQL | Monitoring and control interface |
| Database | MySQL | Data storage and state management |

---

## Communication Protocol

### Wireless Communication

- **Technology**: nRF24L01 2.4GHz transceiver
- **Address**: "00100" (5-byte address)
- **Data Rate**: 250 kbps
- **Range**: 50-100 meters (line of sight)

### Message Format

**Tunnel Events:**
- `i1,` - Train entering tunnel 1
- `o1,` - Train exiting tunnel 1
- `i2,` - Train entering tunnel 2
- `o2,` - Train exiting tunnel 2
- `p1,` - Person detected in tunnel 1
- `p2,` - Person detected in tunnel 2

**Yellow Line Events:**
- `Y1,` - Yellow line violation sensor 1
- `Y2,` - Yellow line violation sensor 2

**Door Events:**
- `1O` - Door open
- `1C` - Door closed

### Serial Communication

- **Interface**: USB-Serial (CP2102 or similar)
- **Baud Rate**: 115200
- **Format**: 8N1 (8 data bits, no parity, 1 stop bit)

---

## Key Features

✅ **Real-time Monitoring**: Continuous detection and alerting  
✅ **Wireless Communication**: No wired connections between sensors  
✅ **Configurable Thresholds**: Adjustable detection parameters  
✅ **Visual Dashboard**: Web-based monitoring interface  
✅ **Audio Alerts**: Automatic voice warnings  
✅ **Event Logging**: Complete history of all events  
✅ **User Management**: Role-based access control  
✅ **Scalable Design**: Support for multiple tunnels and sensors  

---

## System Requirements

### Hardware Requirements

- **Sensors**: 12V DC power, mounting hardware
- **Receiver**: USB connection to computer, 12V DC power
- **Computer**: USB port, network connection (for web interface)

### Software Requirements

- **Operating System**: Windows 10/11, Linux, or macOS
- **Python**: 3.x (if using Python version)
- **Web Server**: Apache/Nginx with PHP 7.3+
- **Database**: MySQL 5.7+ or MariaDB
- **Browser**: Chrome, Firefox, or Edge (latest versions)

---

## Configuration

### Sensor Configuration

Sensors are configured via web terminal interface or serial commands:

- **Tunnel Number**: `1#` or `2#`
- **Distance Thresholds**: `1[value]#` (TRDIST1), `2[value]#` (TRDIST2)
- **Detection Area**: `a[value]#` (area), `A[value]#` (area2)
- **Counter Threshold**: `c[value]#`

### Software Configuration

- **Database**: Configure in `fileatt/public/connection.php`
- **Serial Port**: Configure in `Driver.dda` file
- **Alarm Delays**: Configure in web interface Alarms page

---

## Troubleshooting

### Common Issues

**Sensor Not Detecting:**
- Check sensor alignment and power
- Verify distance thresholds
- Clean sensor lens

**Receiver Not Receiving:**
- Check wireless range
- Verify power connections
- Check for interference

**Software Not Connecting:**
- Verify USB connection
- Check COM port configuration
- Verify database credentials

For detailed troubleshooting, see the [User Manual](User_Manual.md).

---

## Support and Maintenance

### Regular Maintenance

- **Daily**: Visual inspection, status checks
- **Weekly**: Sensor cleaning, connection verification
- **Monthly**: Comprehensive testing, calibration check

### Getting Help

Refer to:
- [Technical Documentation](Technical_Documentation.md) for technical details
- [User Manual](User_Manual.md) for operational procedures
- Contact your system administrator for support

---

## License

See `LICENSE` file for license information.

---

## Version History

- **v1.0** - Initial release
  - Tunnel sensor detection
  - Yellow line monitoring
  - Web-based dashboard
  - Audio alert system

---

## Acknowledgments

Developed for metro safety monitoring applications. System designed to enhance passenger safety through automated detection and alerting.

---

**For detailed information, please refer to:**
- [Technical Documentation](Technical_Documentation.md) - For engineers and developers
- [User Manual](User_Manual.md) - For installers and operators

---

**Project Status**: Production Release v1.0  
**Last Updated**: Based on project files analysis
