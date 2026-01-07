# User Manual - Rasad (Metro) v1.0

## Table of Contents
1. [System Overview](#system-overview)
2. [Package Contents](#package-contents)
3. [Hardware Installation](#hardware-installation)
4. [Software Installation and Setup](#software-installation-and-setup)
5. [Initial System Configuration](#initial-system-configuration)
6. [Normal Operation](#normal-operation)
7. [Safety Precautions](#safety-precautions)
8. [Maintenance and Inspection](#maintenance-and-inspection)
9. [Troubleshooting](#troubleshooting)

---

## System Overview

The Rasad (Metro) v1.0 system is a safety monitoring solution designed for metro platforms. It automatically detects:

- **Train Movement**: When trains enter or exit tunnels
- **Passenger Safety Violations**: When passengers cross the yellow safety line
- **Unauthorized Access**: When people enter restricted tunnel areas

The system provides real-time visual and audio alerts to station operators, helping ensure passenger safety.

### System Components

1. **Tunnel Sensors** (2 units) - Installed inside metro tunnels to detect train movement
2. **Yellow Line Sensors** (2 units) - Installed along platform edges to detect line violations
3. **Receiver Unit** (1 unit) - Receives data from all sensors and connects to the computer
4. **Computer Software** - Displays system status and generates alerts
5. **Power Supplies** (5 units) - 12V power adapters for each device

---

## Package Contents

### Hardware Components

- [ ] 2 × Tunnel Sensor Units (ESP8266-based with LiDAR)
- [ ] 2 × Yellow Line Sensor Units (ESP8266-based with IR detection)
- [ ] 1 × Receiver Unit (ESP32 with USB connection)
- [ ] 5 × 12V/3A Power Adapters
- [ ] 5 × Power Cables
- [ ] 1 × USB Cable (for receiver to computer connection)
- [ ] Mounting brackets and screws
- [ ] Installation documentation

### Software Components

- [ ] Python Application (`My_App.exe` or `My_App.py`)
- [ ] Web Server Files (PHP-based dashboard)
- [ ] Database Schema File (`rasad_metro.sql`)
- [ ] Driver Configuration File (`Driver.dda`)
- [ ] Installation documentation

---

## Hardware Installation

### Pre-Installation Checklist

Before beginning installation, ensure you have:

- [ ] All hardware components from package
- [ ] Appropriate tools (screwdrivers, drill, measuring tape)
- [ ] Access to 12V power source at each installation location
- [ ] Computer with USB port for receiver connection
- [ ] Network access for web interface (if using remote monitoring)

### Tunnel Sensor Installation

**Location Requirements:**
- Inside metro tunnel, approximately 1-2 meters from tunnel entrance
- Mounted on tunnel wall at height of 1.5-2 meters
- Clear line of sight to train path
- Protected from direct exposure to moving trains

**Installation Steps:**

1. **Select Mounting Location:**
   - Choose a stable wall surface
   - Ensure sensor faces train path
   - Verify 12V power is available nearby

2. **Mount Sensor Unit:**
   - Use provided mounting brackets
   - Secure with appropriate screws for wall material
   - Ensure sensor is level and stable

3. **Connect Power:**
   - Connect 12V power adapter to sensor unit
   - Plug adapter into wall outlet or power distribution
   - Verify power LED illuminates (if present)

4. **Verify Sensor Orientation:**
   - LiDAR sensor should point toward train path
   - Ensure no obstructions in sensor field of view
   - Check that sensor can "see" trains at expected distance

5. **Label Sensor:**
   - Mark sensor as "Tunnel 1" or "Tunnel 2" as appropriate
   - Record sensor location for configuration

**Important Notes:**
- Tunnel sensors must be calibrated after installation (see Configuration section)
- Ensure sensor is not exposed to direct sunlight or extreme temperatures
- Protect sensor from dust and moisture

### Yellow Line Sensor Installation

**Location Requirements:**
- Along the yellow safety line at platform edge
- Mounted at platform level or slightly above (10-30cm)
- Positioned to detect when passengers step over the line
- Protected from accidental damage by passengers

**Installation Steps:**

1. **Select Mounting Location:**
   - Identify yellow safety line position
   - Choose mounting point along line
   - Ensure sensor can detect line violations

2. **Mount Sensor Unit:**
   - Use provided mounting brackets or adhesive
   - Secure sensor unit near platform edge
   - Position IR sensor to monitor yellow line area

3. **Connect Power:**
   - Connect 12V power adapter
   - Verify power connection
   - Check for power indicator

4. **Test Detection:**
   - Temporarily test sensor by crossing yellow line
   - Verify sensor responds to violations
   - Adjust sensor position if needed

5. **Label Sensor:**
   - Mark sensor as "Yellow Line 1" or "Yellow Line 2"
   - Record sensor location

**Important Notes:**
- Yellow line sensors are sensitive to lighting conditions
- Ensure sensor is not affected by platform lighting changes
- Test sensor during different times of day

### Receiver Installation

**Location Requirements:**
- Near the monitoring computer
- Within wireless range of all sensors (typically 50-100 meters)
- Protected location (control room or office)
- Access to USB port on computer

**Installation Steps:**

1. **Select Location:**
   - Choose location near computer
   - Ensure good wireless signal to all sensors
   - Provide stable mounting surface

2. **Mount Receiver Unit:**
   - Place receiver on desk or mount on wall
   - Ensure LCD display is visible (if present)
   - Keep unit away from metal obstructions

3. **Connect Power:**
   - Connect 12V power adapter
   - Verify power LED

4. **Connect to Computer:**
   - Connect USB cable from receiver to computer
   - Verify computer recognizes USB device
   - Note the COM port number (Windows) or device path (Linux)

5. **Verify Wireless Communication:**
   - Check LCD display for received messages
   - Verify sensors are transmitting
   - Check signal strength indicators (if available)

---

## Electrical Wiring and Power Connections

### Power Requirements

- **Voltage**: 12V DC
- **Current**: 3A maximum per unit
- **Power Consumption**: 
  - Tunnel Sensor: ~200-300mA
  - Yellow Line Sensor: ~150-200mA
  - Receiver: ~250-350mA

### Power Connection Procedure

1. **Verify Power Adapter:**
   - Check adapter output: 12V DC, 3A
   - Verify adapter is appropriate for your region (110V/220V input)

2. **Connect Power Cable:**
   - Connect power cable to sensor/receiver unit
   - Ensure polarity is correct (positive/negative)
   - Secure connection to prevent disconnection

3. **Connect to Power Source:**
   - Plug adapter into wall outlet or power distribution panel
   - Verify power indicator LED (if present)
   - Check for any error indicators

4. **Test Power:**
   - Verify unit powers on
   - Check for normal operation indicators
   - Monitor for any power-related issues

### Safety Warnings

⚠️ **IMPORTANT SAFETY PRECAUTIONS:**

- Always disconnect power before making wiring changes
- Use only provided or approved power adapters
- Do not exceed rated current capacity
- Ensure proper grounding of power supplies
- Protect power cables from damage
- Do not expose electrical connections to moisture
- Follow local electrical codes and regulations

---

## Software Installation and Setup

### System Requirements

**Computer Requirements:**
- Operating System: Windows 10/11, Linux, or macOS
- USB Port: Available for receiver connection
- RAM: Minimum 4GB
- Storage: 500MB free space
- Network: For web interface access (optional)

**Software Requirements:**
- Python 3.x (if using Python version)
- Web Browser: Chrome, Firefox, or Edge (latest versions)
- MySQL Database Server (for web interface)

### Python Application Installation

**Option 1: Using Executable (Recommended)**

1. **Locate Installation Files:**
   - Find `My_App.exe` in software package
   - Copy to desired installation location

2. **Configure Receiver Connection:**
   - Connect receiver to computer via USB
   - Open Device Manager (Windows) or check `/dev/` (Linux)
   - Note the COM port or device path

3. **Create Driver Configuration:**
   - Create file named `Driver.dda` in same folder as `My_App.exe`
   - Open Device Manager → Ports (COM & LPT)
   - Right-click receiver device → Properties → Details
   - Select "Hardware Ids" and copy first 21 characters
   - Paste into `Driver.dda` file and save

4. **Configure Database (if needed):**
   - Edit `My_App.py` if using Python version
   - Update database credentials:
     - Host: 'localhost'
     - User: 'Ha3k'
     - Password: 'Ven7975006'
     - Database: 'rasad_metro'

5. **Run Application:**
   - Double-click `My_App.exe`
   - Application will start and connect to receiver
   - Check for connection status messages

**Option 2: Using Python Script**

1. **Install Python:**
   - Download Python 3.x from python.org
   - Install with "Add to PATH" option enabled

2. **Install Dependencies:**
   ```bash
   pip install PyQt5 pymysql pyserial
   ```

3. **Configure and Run:**
   - Follow steps 2-5 from Option 1
   - Run: `python My_App.py`

### Web Server Installation

**Prerequisites:**
- Web server (Apache or Nginx)
- PHP 7.3 or higher
- MySQL 5.7 or higher

**Installation Steps:**

1. **Install Web Server:**
   - Install Apache/Nginx and PHP
   - Install MySQL database server
   - Verify all services are running

2. **Deploy Web Files:**
   - Copy `webServer/metro2/` folder to web server document root
   - Example: `C:\xampp\htdocs\metro2\` (Windows) or `/var/www/html/metro2/` (Linux)

3. **Create Database:**
   - Open MySQL command line or phpMyAdmin
   - Create new database: `rasad_metro`
   - Import schema from `rasad_metro.sql` file

4. **Configure Database Connection:**
   - Edit `fileatt/public/connection.php`
   - Update database credentials:
     ```php
     $etesal=mysqli_connect('localhost', 'Ha3k', 'Ven7975006' , 'rasad_metro');
     ```

5. **Set Permissions:**
   - Ensure web server has read/write access to web files
   - Set appropriate file permissions (Linux: chmod 755)

6. **Access Web Interface:**
   - Open web browser
   - Navigate to: `http://localhost/metro2/`
   - Default login: Username: `Admin`, Password: `123456`

---

## Initial System Configuration

### Sensor Configuration

**Tunnel Sensor Configuration:**

1. **Access Sensor Web Terminal:**
   - Connect to sensor WiFi network (if configured)
   - Or use serial terminal at 115200 baud
   - Access web terminal interface

2. **Set Tunnel Number:**
   - Send command: `1#` for tunnel 1, or `2#` for tunnel 2
   - Verify sensor acknowledges setting

3. **Calibrate Distance Thresholds:**
   - Set TRDIST1 (train entry): Send `1[value]#` (e.g., `186#` for 86cm)
   - Set TRDIST2 (train exit): Send `2[value]#` (e.g., `2380#` for 380cm)
   - Set detection area: Send `a[value]#` for area, `A[value]#` for area2
   - Set counter threshold: Send `c[value]#` (e.g., `c30#` for 30 counts)

4. **Calibrate Midpoint:**
   - Send `,[value]#` to set calibration midpoint
   - This is the reference distance for detection zones

**Yellow Line Sensor Configuration:**

1. **Test Sensor Response:**
   - Cross yellow line and observe sensor output
   - Verify sensor detects violations correctly

2. **Adjust Sensitivity (if needed):**
   - Modify analog threshold in firmware (requires reprogramming)
   - Or adjust sensor position for optimal detection

### Software Configuration

**Database Initial Setup:**

1. **Verify Database Tables:**
   - Check that all tables exist: `alarm`, `alarm_settime`, `users`, `logs`, etc.
   - Verify default data is present

2. **Configure Alarm Delays:**
   - Access web interface → Alarms page
   - Set delays for each event type:
     - Yellow Line: 10 seconds (default)
     - Train Entry: 10 seconds (default)
     - Train Exit: 10 seconds (default)
     - Person Detection: 10 seconds (default)

3. **Create User Accounts:**
   - Access Users page (Admin only)
   - Create operator accounts as needed
   - Set appropriate user roles

4. **Configure Voice Alerts:**
   - Access Voice Control panel
   - Enable/disable specific voice alerts
   - Test audio playback

### System Verification

**Testing Checklist:**

- [ ] All sensors powered on and operational
- [ ] Receiver receiving messages from all sensors
- [ ] Python application connected and updating database
- [ ] Web interface displaying sensor status
- [ ] Train detection working correctly
- [ ] Yellow line detection working correctly
- [ ] Audio alerts playing when events occur
- [ ] Visual indicators updating in real-time

---

## Normal Operation

### Daily Startup Procedure

1. **Power On System:**
   - Turn on receiver unit
   - Verify receiver connects to computer
   - Start Python application (`My_App.exe`)
   - Verify "connected" status

2. **Access Web Interface:**
   - Open web browser
   - Navigate to monitoring dashboard
   - Log in with user credentials
   - Verify all sensors show "connected" status

3. **Verify System Status:**
   - Check tunnel sensors are detecting properly
   - Verify yellow line sensors are active
   - Confirm no error messages displayed

### Monitoring Dashboard

**Main Display Elements:**

1. **Train Status:**
   - Green indicators: Train present in tunnel
   - Red indicators: Person detected in tunnel
   - Animated train icons show train position

2. **Yellow Line Status:**
   - Green bar: Safe (no violations)
   - Yellow bar: Warning state
   - Red bar: Violation detected

3. **Door Status:**
   - Green icon: Door closed
   - Red spinner: Door open

4. **Alert Messages:**
   - Visual alerts appear when events occur
   - Audio alerts play automatically
   - Alert duration based on configured delays

### Alert Behavior

**Train Entry Alert:**
- Visual: Green indicator appears, train icon animates
- Audio: "Train entering" message plays
- Duration: Configurable (default 10 seconds)

**Train Exit Alert:**
- Visual: Yellow indicator, train icon moves out
- Audio: "Train exiting" message plays
- Duration: Configurable (default 10 seconds)

**Yellow Line Violation:**
- Visual: Red progress bar appears
- Audio: "Please step back from yellow line" message
- Duration: Configurable (default 10 seconds)

**Person in Tunnel:**
- Visual: Red spinner in tunnel indicator
- Audio: "Person detected in tunnel" message
- Duration: Configurable (default 10 seconds)

### Responding to Alerts

**Yellow Line Violations:**
1. Alert appears on dashboard
2. Audio message plays automatically
3. Station staff should monitor situation
4. Alert clears automatically after timeout

**Person in Tunnel:**
1. Immediate alert appears
2. Audio warning plays
3. Station staff should investigate immediately
4. Take appropriate safety measures

**Train Movement:**
1. System automatically tracks train position
2. Alerts play for train entry/exit
3. Visual indicators update in real-time
4. No action required unless anomaly detected

---

## Safety Precautions

### Installation Safety

⚠️ **CRITICAL SAFETY WARNINGS:**

- **Electrical Safety:**
  - Always disconnect power before installation or maintenance
  - Use only approved power adapters
  - Follow local electrical codes
  - Ensure proper grounding

- **Installation Location:**
  - Do not install sensors in areas with moving trains during operation
  - Ensure installation does not obstruct passenger pathways
  - Protect sensors from physical damage
  - Follow metro station safety protocols

- **Working at Height:**
  - Use appropriate safety equipment when installing at height
  - Follow fall protection procedures
  - Have assistance available during installation

### Operational Safety

- **System Limitations:**
  - This system is a monitoring tool, not a replacement for human supervision
  - Always maintain proper station staff presence
  - Do not rely solely on automated alerts
  - Verify alerts before taking action

- **Emergency Procedures:**
  - In case of system failure, station staff must monitor manually
  - Have backup monitoring procedures in place
  - Know how to disable system if needed
  - Maintain emergency contact information

- **Maintenance Safety:**
  - Always power off before maintenance
  - Do not attempt repairs unless qualified
  - Contact technical support for major issues
  - Keep maintenance logs

---

## Maintenance and Inspection

### Daily Inspections

**Visual Checks:**
- [ ] All sensors appear operational on dashboard
- [ ] No error messages displayed
- [ ] Power indicators showing normal status
- [ ] No physical damage to sensor units

**Functional Tests:**
- [ ] Test yellow line detection (if safe to do so)
- [ ] Verify train detection is working
- [ ] Check audio alerts are playing
- [ ] Confirm web interface is accessible

### Weekly Maintenance

**Tasks:**
1. **Clean Sensor Units:**
   - Wipe sensor lenses with soft cloth
   - Remove dust and debris
   - Check for obstructions

2. **Check Power Connections:**
   - Verify all power adapters are secure
   - Check for damaged cables
   - Test power indicators

3. **Review System Logs:**
   - Check for error messages
   - Review alarm history
   - Verify system performance

4. **Test Communication:**
   - Verify all sensors are communicating
   - Check receiver status
   - Test database updates

### Monthly Maintenance

**Tasks:**
1. **Comprehensive System Test:**
   - Test all sensor functions
   - Verify all alerts working
   - Check database integrity

2. **Physical Inspection:**
   - Inspect all mounting hardware
   - Check for loose connections
   - Verify sensor alignment

3. **Software Updates:**
   - Check for firmware updates
   - Update software if available
   - Backup configuration settings

4. **Documentation:**
   - Update maintenance logs
   - Note any issues or changes
   - Document calibration adjustments

### Calibration Procedures

**When to Recalibrate:**
- After sensor relocation
- If false alarms increase
- After maintenance that affects sensor position
- Periodically (every 6 months recommended)

**Tunnel Sensor Calibration:**
1. Access sensor configuration interface
2. Measure actual distances to train path
3. Adjust TRDIST1 and TRDIST2 thresholds
4. Test detection accuracy
5. Fine-tune as needed

**Yellow Line Sensor Calibration:**
1. Test sensor with known violations
2. Adjust sensor position if needed
3. Verify detection accuracy
4. Document calibration settings

---

## Troubleshooting

### Common Issues and Solutions

#### Problem: Sensor Not Detecting Trains

**Possible Causes:**
- Sensor misaligned
- Distance thresholds incorrect
- Sensor obstructed
- Power issue

**Solutions:**
1. Check sensor alignment and position
2. Verify distance thresholds are correct
3. Clean sensor lens
4. Check power connection
5. Recalibrate sensor if needed

#### Problem: Yellow Line Sensor False Alarms

**Possible Causes:**
- Lighting conditions changed
- Sensor too sensitive
- Obstruction in sensor view
- Sensor misaligned

**Solutions:**
1. Adjust sensor position
2. Check for obstructions
3. Test during different lighting conditions
4. Recalibrate if necessary

#### Problem: Receiver Not Receiving Data

**Possible Causes:**
- Wireless range exceeded
- nRF24L01 module issue
- Power problem
- Interference

**Solutions:**
1. Check receiver power
2. Verify sensors are within range
3. Check for wireless interference
4. Restart receiver unit
5. Check LCD display for error messages

#### Problem: Python Application Not Connecting

**Possible Causes:**
- Wrong COM port
- USB cable issue
- Driver not installed
- Receiver not powered

**Solutions:**
1. Verify receiver is powered on
2. Check USB cable connection
3. Verify COM port in Device Manager
4. Update `Driver.dda` file with correct hardware ID
5. Restart Python application

#### Problem: Web Interface Not Updating

**Possible Causes:**
- Database connection issue
- Python application not running
- Web server problem
- Browser cache issue

**Solutions:**
1. Verify Python application is running
2. Check database connection
3. Clear browser cache
4. Restart web server
5. Check browser console for errors

#### Problem: Audio Alerts Not Playing

**Possible Causes:**
- Audio files missing
- Browser audio disabled
- Volume muted
- Permission issue

**Solutions:**
1. Check audio files exist in `uploads/` folder
2. Enable browser audio
3. Check system volume
4. Verify browser permissions for audio

### Getting Help

**If problems persist:**

1. **Document the Issue:**
   - Note error messages
   - Record when problem occurs
   - Take screenshots if possible

2. **Check Logs:**
   - Review Python application console
   - Check web server error logs
   - Review database logs

3. **Contact Support:**
   - Provide detailed problem description
   - Include system configuration
   - Share relevant log files

### Emergency Procedures

**System Failure:**
- Station staff must monitor manually
- Document all incidents
- Contact technical support immediately
- Do not attempt unauthorized repairs

**False Alarm Issues:**
- Temporarily disable affected sensor if needed
- Document false alarm frequency
- Schedule calibration/maintenance
- Contact support for assistance

---

## Appendix

### Default Login Credentials

- **Username**: Admin
- **Password**: 123456
- **Note**: Change password after first login

### Contact Information

For technical support, installation assistance, or maintenance requests, contact your system administrator or the technical support team.

### Warranty and Service

Refer to your purchase agreement for warranty information and service terms.

---

**Document Version:** 1.0  
**Last Updated:** Based on project files analysis  
**Intended Audience:** Installers, Technicians, and Operators

