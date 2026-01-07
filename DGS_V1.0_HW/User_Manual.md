# DGS V1.0.0 User Manual

## Aircraft Docking Guidance System (DGS)

**Version:** 1.0.0  
**Document Type:** User Manual  
**Target Audience:** Technicians and End Users

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Safety Information](#safety-information)
3. [Required Tools and Equipment](#required-tools-and-equipment)
4. [Hardware Installation](#hardware-installation)
5. [Wiring and Connections](#wiring-and-connections)
6. [Software Installation](#software-installation)
7. [Initial Setup and Configuration](#initial-setup-and-configuration)
8. [Normal Operation](#normal-operation)
9. [Maintenance](#maintenance)
10. [Troubleshooting](#troubleshooting)

---

## System Overview

The DGS (Aircraft Docking Guidance System) is an automated system that helps guide aircraft to their correct parking position at airport gates. The system uses laser scanning technology to detect the aircraft's position and provides real-time guidance information to ground marshals.

### What the System Does

- **Scans the aircraft** using a laser scanner to detect the position of the aircraft's front wheels
- **Calculates distances** to show how far the aircraft needs to move forward
- **Determines direction** to show if the aircraft needs to move left, right, or is centered
- **Displays guidance** on a screen for the ground marshal to read
- **Records data** for later analysis

### System Components

The DGS system consists of:

1. **Scanner Unit** - The main scanning device mounted above the gate
2. **Controller Units** - Environmental monitoring and control boxes
3. **Computer System** - Raspberry Pi running the control software
4. **Display Screen** - Shows guidance information to the marshal
5. **Cameras** - Record the docking process

---

## Safety Information

### ⚠️ WARNINGS

**ELECTRICAL SAFETY:**
- **Always disconnect power** before working on any electrical connections
- **Use proper grounding** - Ensure all equipment is properly grounded
- **Check voltage** - Verify power supply voltage matches requirements (12V DC)
- **No water exposure** - Keep all electrical components dry
- **Professional installation** - Only qualified technicians should perform installation

**OPERATIONAL SAFETY:**
- **Do not look directly into the laser** - The scanner uses a laser that can damage eyes
- **Keep clear during operation** - Stay away from moving parts during scanning
- **Emergency stop** - Know the location of emergency stop buttons
- **Aircraft clearance** - Ensure no personnel or equipment are in the scanning area during operation

**ENVIRONMENTAL SAFETY:**
- **Temperature range** - System operates between -20°C to +60°C
- **Weather protection** - All outdoor components must be weatherproof
- **Vibration** - Mount securely to prevent vibration damage

### Safety Symbols

- ⚠️ **Warning** - Indicates a potentially hazardous situation
- ⚡ **Electrical Hazard** - Electrical danger present
- 👁️ **Eye Hazard** - Risk of eye injury
- 🔧 **Maintenance Required** - Regular maintenance needed

---

## Required Tools and Equipment

### Tools Needed for Installation

**Basic Tools:**
- Screwdrivers (Phillips and flathead, various sizes)
- Wrenches (metric: 8mm, 10mm, 13mm)
- Wire strippers and crimping tool
- Multimeter (for voltage and continuity testing)
- Cable ties and mounting hardware
- Drill and drill bits (for mounting holes)
- Level (for accurate mounting)

**Electrical Tools:**
- Wire cutters
- Soldering iron (if needed for connections)
- Heat shrink tubing
- Electrical tape
- Cable management clips

**Testing Equipment:**
- Multimeter
- Network cable tester (if using Ethernet)
- Serial port tester (optional)

### Equipment Needed

**Hardware:**
- Scanner unit (complete assembly)
- Controller units (as required)
- Raspberry Pi 4 (or compatible)
- Power supplies (12V DC, sufficient current rating)
- Mounting brackets and hardware
- Network cables (if using wired connection)
- Serial cables (for initial setup)

**Software:**
- Raspberry Pi OS (pre-installed or SD card image)
- DGS software package
- Computer or laptop for configuration

**Consumables:**
- Electrical wire (appropriate gauge for current)
- Fuses (as specified in technical documentation)
- Cable management materials

---

## Hardware Installation

### Step 1: Site Preparation

1. **Choose Installation Location:**
   - Scanner unit should be mounted **above the gate**, typically 4-6 meters high
   - Ensure clear line of sight to the aircraft parking area
   - Avoid obstructions (lights, signs, structures)
   - Consider maintenance access

2. **Measure and Mark:**
   - Mark the exact mounting position
   - Ensure the scanner will point toward the centerline of the parking position
   - Verify mounting surface is strong enough (concrete or steel structure)

3. **Prepare Mounting Surface:**
   - Clean the mounting area
   - Drill mounting holes (if required)
   - Install anchor bolts or mounting brackets

### Step 2: Install Scanner Unit

1. **Mount the Scanner:**
   - Attach mounting bracket to the scanner unit
   - Secure bracket to the mounting surface using appropriate hardware
   - Use a level to ensure the scanner is level
   - Tighten all bolts securely

2. **Verify Position:**
   - Check that the scanner has clear view of the parking area
   - Ensure no obstructions in the scanning path
   - Verify mounting is secure (no movement when gently pushed)

3. **Protect from Weather:**
   - Ensure weatherproof enclosure is properly sealed
   - Check that all cable entry points are sealed
   - Verify drainage (if applicable)

### Step 3: Install Controller Units

1. **Choose Controller Location:**
   - Typically mounted in a weatherproof enclosure near the gate
   - Should be easily accessible for maintenance
   - Protected from direct weather exposure

2. **Mount Controller:**
   - Secure controller box to mounting surface
   - Ensure proper ventilation (if required)
   - Verify door/cover can be opened for maintenance

3. **Install Additional Components:**
   - Mount temperature sensors in appropriate locations
   - Install door switches on gate doors
   - Position light sensor (LDR) for ambient light monitoring

### Step 4: Install Computer System

1. **Mount Raspberry Pi:**
   - Install in a weatherproof, ventilated enclosure
   - Ensure adequate space for heat dissipation
   - Secure to prevent movement

2. **Install Display (if applicable):**
   - Mount display screen in marshal's view
   - Ensure visibility in various lighting conditions
   - Protect from weather if outdoors

3. **Install Cameras:**
   - Position cameras to view the docking area
   - Ensure proper mounting and weather protection
   - Verify network connectivity

---

## Wiring and Connections

### Power Connections

#### Scanner Unit Power

1. **Power Requirements:**
   - Voltage: 12V DC
   - Current: 5A minimum (10A recommended for safety margin)
   - Use appropriate wire gauge (minimum 14 AWG for 5A, 12 AWG for 10A)

2. **Connection Steps:**
   - Run power cable from power supply to scanner unit
   - Connect positive (+) wire to positive terminal
   - Connect negative (-) wire to negative terminal
   - **Verify polarity** - Incorrect connection will damage the unit
   - Secure connections with proper terminals
   - Install fuse in positive line (as specified)

#### Controller Unit Power

1. **Power Requirements:**
   - Voltage: 12V DC
   - Current: 1A minimum
   - Wire gauge: 16 AWG minimum

2. **Connection Steps:**
   - Connect power supply to controller unit
   - Verify polarity
   - Install fuse
   - Test voltage at controller terminals (should read 12V)

#### Raspberry Pi Power

1. **Power Requirements:**
   - Voltage: 5V DC (via USB-C or micro-USB)
   - Current: 3A minimum
   - Use official Raspberry Pi power supply or equivalent

2. **Connection:**
   - Connect power supply to Raspberry Pi
   - Verify power LED illuminates
   - Check that system boots properly

### Communication Connections

#### Scanner to Raspberry Pi (UART)

1. **Cable Requirements:**
   - Use shielded cable for noise immunity
   - Maximum length: 10 meters recommended
   - Wire gauge: 22-24 AWG

2. **Connection:**
   - **Scanner TX** → **Raspberry Pi RX** (GPIO 15)
   - **Scanner RX** → **Raspberry Pi TX** (GPIO 14)
   - **Ground** → **Ground** (common ground)
   - **Do not connect** power lines (use separate power supply)

3. **Verification:**
   - Check continuity with multimeter
   - Verify no short circuits
   - Test communication after software setup

#### Controller to Raspberry Pi (UART)

1. **Connection:**
   - Similar to scanner connection
   - Use different GPIO pins (typically /dev/ttyAMA4)
   - Follow same wiring guidelines

#### RS485 Connections (Multi-Controller)

1. **Cable Requirements:**
   - Use twisted pair cable (RS485 cable)
   - Maximum length: 1200 meters
   - Wire gauge: 22-24 AWG

2. **Connection:**
   - **A+** → **A+** (all devices)
   - **B-** → **B-** (all devices)
   - **Ground** → **Ground** (common ground)
   - Install **120Ω termination resistors** at both ends of the bus

3. **Important:**
   - Only two termination resistors total (one at each end)
   - Do not terminate devices in the middle
   - Verify polarity (A+ and B- must be consistent)

#### Network Connections

1. **Ethernet (if used):**
   - Use Cat5e or Cat6 cable
   - Connect to network switch or router
   - Verify link lights on both ends

2. **WiFi (if used):**
   - Configure during software setup
   - Ensure adequate signal strength

### Sensor Connections

#### Temperature Sensors (DS18B20)

1. **Wiring:**
   - **Red wire** → 3.3V or 5V power
   - **Black wire** → Ground
   - **Yellow/White wire** → Data (to GPIO pin)
   - Install **4.7kΩ pull-up resistor** between data and power

2. **Multiple Sensors:**
   - All sensors share power and ground
   - Each sensor connects to different GPIO pin
   - Or use one-wire bus with unique addresses

#### Door Switches

1. **Wiring:**
   - One terminal → GPIO input pin
   - Other terminal → Ground
   - Install **pull-up resistor** (typically 10kΩ) to 3.3V
   - Switch closes when door is closed (active LOW)

#### Light Sensor (LDR)

1. **Wiring:**
   - Connect to ADC input pin
   - Use voltage divider circuit (LDR + fixed resistor)
   - Connect to appropriate ADC channel

### Grounding

1. **System Ground:**
   - Connect all ground wires together
   - Connect to building ground (if available)
   - Use proper grounding rod for outdoor installations

2. **Shield Grounding:**
   - Connect cable shields to ground at one end only (typically controller end)
   - Prevents ground loops

---

## Software Installation

### Step 1: Prepare Raspberry Pi

1. **Install Operating System:**
   - Download Raspberry Pi OS (latest version)
   - Write to SD card using Raspberry Pi Imager or similar tool
   - Insert SD card into Raspberry Pi
   - Connect keyboard, mouse, and monitor (for initial setup)

2. **Initial Configuration:**
   - Boot Raspberry Pi
   - Complete initial setup wizard
   - Enable SSH (for remote access)
   - Set hostname (e.g., "dgs-controller")
   - Update system: `sudo apt update && sudo apt upgrade`

3. **Enable Serial Port:**
   - Edit config: `sudo nano /boot/config.txt`
   - Ensure `enable_uart=1` is set
   - Reboot: `sudo reboot`

### Step 2: Install DGS Software

1. **Copy Software Files:**
   - Transfer DGS software package to Raspberry Pi
   - Extract to: `/home/pi/DGS/` (or preferred location)
   - Verify all files are present

2. **Install Python Dependencies:**
   ```bash
   cd /home/pi/DGS/Software/RPI/DGS\ 12-8/DGS\ 12-8/
   pip3 install flask sqlite3 opencv-python numpy RPi.GPIO requests pyserial
   ```

3. **Set Permissions:**
   ```bash
   sudo chmod 666 /dev/serial0
   sudo chmod 666 /dev/ttyAMA4
   sudo usermod -a -G dialout pi
   ```

4. **Test Installation:**
   ```bash
   python3 --version  # Should show Python 3.7 or higher
   python3 -c "import flask; print('Flask OK')"
   ```

### Step 3: Configure Network

1. **Static IP (Recommended):**
   - Edit: `sudo nano /etc/dhcpcd.conf`
   - Add:
     ```
     interface eth0
     static ip_address=192.168.1.100/24
     static routers=192.168.1.1
     static domain_name_servers=192.168.1.1
     ```
   - Adjust IP address to match your network
   - Reboot

2. **WiFi (if used):**
   - Use `raspi-config` or edit `/etc/wpa_supplicant/wpa_supplicant.conf`
   - Add network credentials
   - Reboot

### Step 4: Configure Cameras

1. **Camera IP Addresses:**
   - Configure cameras to static IPs:
     - Camera 1: 192.168.1.41
     - Camera 2: 192.168.1.42
   - Set RTSP credentials (username: admin, password: 123P456q789$)
   - Test RTSP stream using VLC or similar

2. **Update Camera URLs:**
   - Edit `main.py` if camera IPs are different
   - Update RTSP URLs in the code

### Step 5: Create System Service (Optional)

1. **Create Service File:**
   ```bash
   sudo nano /etc/systemd/system/dgs.service
   ```

2. **Add Service Content:**
   ```ini
   [Unit]
   Description=DGS Aircraft Docking System
   After=network.target

   [Service]
   Type=simple
   User=pi
   WorkingDirectory=/home/pi/DGS/Software/RPI/DGS 12-8/DGS 12-8/
   ExecStart=/usr/bin/python3 /home/pi/DGS/Software/RPI/DGS\ 12-8/DGS\ 12-8/run.py
   Restart=always
   RestartSec=10

   [Install]
   WantedBy=multi-user.target
   ```

3. **Enable and Start:**
   ```bash
   sudo systemctl enable dgs.service
   sudo systemctl start dgs.service
   sudo systemctl status dgs.service
   ```

---

## Initial Setup and Configuration

### Step 1: Database Initialization

1. **Access Web Interface:**
   - Open web browser
   - Navigate to: `http://<raspberry-pi-ip>:60000`
   - You should see the control interface

2. **Login to Admin Panel:**
   - Navigate to: `http://<raspberry-pi-ip>:60000/admin`
   - Default credentials (change after first login):
     - Username: (check with administrator)
     - Password: (check with administrator)

### Step 2: Configure Aircraft Types

1. **Add Aircraft:**
   - Go to Dashboard → Aircraft
   - Click "Add New"
   - Enter aircraft information:
     - **Aircraft Name:** e.g., "A320", "B777"
     - **Nose Height:** Height of aircraft nose (in mm)
     - **Wheel Width:** Distance between wheels (in mm)
     - **Wheel Radius:** Radius of front wheel (in mm)
     - **Stop Radius:** Distance to stop point (in mm)
     - **Stop Horizontal:** Horizontal angle to stop point
     - **Stop Vertical:** Vertical angle to stop point
   - Click "Save"

2. **Repeat for Each Aircraft Type:**
   - Add all aircraft types that will use this gate
   - Verify all values are correct

### Step 3: Configure Centerline

1. **Define Centerline:**
   - Go to Dashboard → Centerline
   - Click "Add New"
   - Enter centerline parameters:
     - **Start Point R:** Radius to start point (mm)
     - **Start Point Vertical:** Vertical angle to start
     - **Start Point Horizontal:** Horizontal angle to start
     - **End Point R:** Radius to end point (mm)
     - **End Point Vertical:** Vertical angle to end
     - **End Point Horizontal:** Horizontal angle to end
     - **Width:** Tolerance width for centerline (mm)
   - Click "Save"

2. **Calibrate Centerline (Using Scanner):**
   - Use the scanner's bench calibration feature
   - Send commands to set start and end points
   - Verify points are correct

### Step 4: Configure System Parameters

1. **Connection Settings:**
   - Go to Dashboard → Connection
   - Configure:
     - **Database URL:** External database (if used)
     - **Gate Name:** Name of this gate
     - **Scanner Activation:** Enable/disable scanner
     - **DGS Height:** Installation height (mm)
     - **Scanner Start Position:** Initial scan position
     - **Scan Angles:** Horizontal and vertical scan angles
     - **Step Values:** Motor step values
   - Click "Save"

### Step 5: Test System

1. **Test Scanner Communication:**
   - Go to Control interface
   - Click "Get Distance" - should return a value
   - Click "Go Home" - scanner should move to home position

2. **Test Controller Communication:**
   - Check battery status - should show voltage
   - Check temperature - should show sensor readings
   - Check light level - should show LDR reading
   - Check door status - should show ON/OFF

3. **Test Camera:**
   - Verify camera streams are visible
   - Check recording functionality

4. **Test Full System:**
   - Select an aircraft type
   - Start a test scan
   - Verify data appears on marshal display
   - Check that guidance information is correct

---

## Normal Operation

### Daily Startup Procedure

1. **Power On System:**
   - Turn on power supply for scanner unit
   - Turn on power supply for controller units
   - Power on Raspberry Pi (if not always on)
   - Wait for system to boot (approximately 1 minute)

2. **Verify System Status:**
   - Check web interface is accessible
   - Verify all sensors are reading correctly
   - Check that scanner is in home position
   - Verify cameras are streaming

3. **System Ready:**
   - System is ready when:
     - Web interface shows "Ready"
     - Scanner is at home position
     - All sensors show valid readings
     - No error messages displayed

### Operating the System

#### Starting a Docking Operation

1. **Select Aircraft Type:**
   - On the control interface, select the aircraft type from the dropdown
   - System will load the appropriate parameters

2. **Start Scanning:**
   - Click "Start Scan" or use the quick start function
   - System will:
     - Move scanner to start position
     - Begin scanning for aircraft
     - Display guidance information

3. **Monitor Operation:**
   - Watch the marshal display for guidance information
   - Information shows:
     - **Direction:** LEFT, CENTER, or RIGHT
     - **Lateral Distance:** Distance from centerline (meters)
     - **Forward Distance:** Distance to stop point (meters)

4. **Complete Operation:**
   - System automatically stops when aircraft reaches stop point
   - Or manually stop using "Stop" or "Reset" button
   - System returns to home position

#### Reading the Display

**Marshal Display Shows:**
- **Aircraft Type:** Currently detected aircraft
- **Direction:** 
  - **LEFT** - Aircraft needs to move left
  - **CENTER** - Aircraft is correctly aligned
  - **RIGHT** - Aircraft needs to move right
- **Lateral Distance:** Distance from centerline (e.g., "2.5m")
- **Forward Distance:** Distance remaining to stop point (e.g., "15.3m")
- **Status:** Current system status (Scanning, Ready, etc.)

#### Manual Controls

**Available Controls:**
- **Rotate Scanner:** Use horizontal/vertical rotation controls
- **Laser On/Off:** Toggle laser pointer
- **Go Home:** Return scanner to home position
- **Reset:** Reset entire system
- **Force Stop:** Emergency stop

### Shutdown Procedure

1. **Complete Current Operation:**
   - Wait for any active scan to complete
   - Return scanner to home position

2. **Stop Services:**
   - Stop scanning if active
   - Close any active connections

3. **Power Down:**
   - Shut down Raspberry Pi properly: `sudo shutdown -h now`
   - Turn off controller power supplies
   - Turn off scanner power supply

---

## Maintenance

### Regular Maintenance Schedule

#### Daily Checks
- [ ] Verify system powers on correctly
- [ ] Check web interface is accessible
- [ ] Verify scanner moves to home position
- [ ] Check sensor readings are reasonable
- [ ] Verify cameras are working

#### Weekly Maintenance
- [ ] Clean scanner lens (if accessible)
- [ ] Check all connections are secure
- [ ] Verify mounting hardware is tight
- [ ] Check for error logs
- [ ] Test full scanning operation

#### Monthly Maintenance
- [ ] Clean all equipment
- [ ] Check cable condition
- [ ] Verify power supply voltages
- [ ] Test all sensors
- [ ] Review system logs
- [ ] Update software (if updates available)

#### Quarterly Maintenance
- [ ] Calibrate scanner position
- [ ] Verify centerline accuracy
- [ ] Test all aircraft types
- [ ] Check weatherproofing
- [ ] Inspect mounting hardware
- [ ] Backup configuration database

### Cleaning Procedures

1. **Scanner Unit:**
   - Use soft, lint-free cloth
   - Clean lens gently (if accessible)
   - Do not use harsh chemicals
   - Ensure unit is powered off

2. **Controller Units:**
   - Wipe exterior with damp cloth
   - Ensure all seals are intact
   - Check for moisture inside

3. **Display Screen:**
   - Clean with appropriate screen cleaner
   - Use soft cloth
   - Avoid scratching

### Calibration Procedures

#### Scanner Calibration

1. **Homing Calibration:**
   - Use "Go Home" function
   - Verify scanner returns to exact home position
   - Adjust if necessary (requires technical support)

2. **Position Calibration:**
   - Use bench calibration feature
   - Set known reference points
   - Verify accuracy

#### Centerline Calibration

1. **Measure Actual Centerline:**
   - Measure physical centerline on ground
   - Note coordinates

2. **Update Database:**
   - Enter measured values in centerline configuration
   - Save changes
   - Test with known reference

### Backup Procedures

1. **Database Backup:**
   ```bash
   cp db.sqlite3 db.sqlite3.backup.$(date +%Y%m%d)
   ```

2. **Configuration Backup:**
   - Export configuration from web interface
   - Save to secure location
   - Keep multiple backup copies

3. **Software Backup:**
   - Keep original software package
   - Document any custom modifications
   - Version control if possible

---

## Troubleshooting

### Common Problems and Solutions

#### Problem: Scanner Not Responding

**Symptoms:**
- Scanner does not move
- No response to commands
- Error messages in web interface

**Possible Causes and Solutions:**

1. **Power Issue:**
   - Check power supply is on
   - Verify voltage at scanner terminals (should be 12V)
   - Check fuse is not blown
   - Verify power connections are secure

2. **Communication Issue:**
   - Check UART cable connections
   - Verify baud rate is 115200
   - Test with serial terminal program
   - Check for loose connections

3. **Firmware Issue:**
   - Scanner firmware may need reloading
   - Contact technical support

#### Problem: Controller Not Responding

**Symptoms:**
- No sensor readings
- Commands not working
- No response to queries

**Possible Causes and Solutions:**

1. **Power Issue:**
   - Check power supply
   - Verify voltage
   - Check fuse

2. **Communication Issue:**
   - Check UART connections
   - Verify baud rate
   - Test communication

3. **Sensor Issue:**
   - Check sensor connections
   - Verify sensor power
   - Test individual sensors

#### Problem: Web Interface Not Accessible

**Symptoms:**
- Cannot connect to web page
- Connection timeout
- Page not found

**Possible Causes and Solutions:**

1. **Network Issue:**
   - Check Raspberry Pi is on network
   - Verify IP address
   - Ping Raspberry Pi from another computer
   - Check firewall settings

2. **Service Not Running:**
   - Check if Flask service is running: `sudo systemctl status dgs.service`
   - Restart service: `sudo systemctl restart dgs.service`
   - Check logs for errors

3. **Port Issue:**
   - Verify port 60000 is not blocked
   - Check if another service is using the port
   - Try accessing from different device

#### Problem: Camera Not Working

**Symptoms:**
- No video stream
- Camera not connecting
- Black screen

**Possible Causes and Solutions:**

1. **Network Issue:**
   - Verify camera is on network
   - Ping camera IP address
   - Check network cable

2. **Camera Configuration:**
   - Verify RTSP URL is correct
   - Check username and password
   - Test RTSP stream in VLC

3. **Camera Power:**
   - Check camera power supply
   - Verify camera is powered on
   - Check camera status lights

#### Problem: Incorrect Guidance Information

**Symptoms:**
- Wrong direction shown
- Incorrect distances
- Aircraft not detected

**Possible Causes and Solutions:**

1. **Calibration Issue:**
   - Recalibrate centerline
   - Verify aircraft parameters are correct
   - Check scanner position

2. **Aircraft Parameters:**
   - Verify aircraft type is correct
   - Check nose height matches actual aircraft
   - Verify wheel width is correct

3. **Scanner Position:**
   - Check scanner is properly mounted
   - Verify no obstructions
   - Check scanner alignment

#### Problem: System Resets Unexpectedly

**Symptoms:**
- System restarts randomly
- Loss of connection
- Errors in logs

**Possible Causes and Solutions:**

1. **Power Issue:**
   - Check power supply stability
   - Verify adequate current capacity
   - Check for voltage drops
   - Inspect power connections

2. **Overheating:**
   - Check ventilation
   - Verify fans are working
   - Check ambient temperature
   - Clean dust from vents

3. **Software Issue:**
   - Check system logs
   - Look for error messages
   - Update software if available
   - Contact technical support

### Getting Help

If you cannot resolve a problem:

1. **Document the Problem:**
   - Note exact symptoms
   - Record error messages
   - Note when problem occurs
   - Take photos if helpful

2. **Check Logs:**
   - Review system logs
   - Check web interface for error messages
   - Look for patterns

3. **Contact Support:**
   - Provide detailed problem description
   - Include system configuration
   - Share relevant logs
   - Be available for remote assistance if needed

### Emergency Procedures

#### Emergency Stop

1. **Immediate Stop:**
   - Press "Force Stop" button on web interface
   - Or physically disconnect power (if safe to do so)

2. **After Emergency Stop:**
   - Verify system is stopped
   - Check for any damage
   - Document what happened
   - Contact technical support

#### Power Failure

1. **During Operation:**
   - System will stop immediately
   - Scanner may not be in home position
   - Data may be lost

2. **After Power Restored:**
   - System will boot automatically (if configured)
   - Scanner will need to home
   - Verify all systems are operational
   - Check for any errors

---

## Appendix

### A. Quick Reference

**Web Interface URLs:**
- Main Control: `http://<ip>:60000/control`
- Admin Login: `http://<ip>:60000/admin`
- Dashboard: `http://<ip>:60000/Dashboard`
- Marshal Display: `http://<ip>:60000/Marshal`

**Default Ports:**
- Web Interface: 60000
- TCP Data: 65432
- RTSP Camera: 554

**Power Requirements:**
- Scanner: 12V DC, 5-10A
- Controller: 12V DC, 1A
- Raspberry Pi: 5V DC, 3A

### B. Contact Information

For technical support, maintenance, or questions:
- Refer to your system administrator
- Contact the installation technician
- Consult the technical documentation

### C. Glossary

- **Centerline:** The ideal path the aircraft should follow
- **Lateral Distance:** Distance left or right from centerline
- **Forward Distance:** Distance remaining to the stop point
- **Homing:** Process of returning scanner to reference position
- **RTSP:** Real-Time Streaming Protocol (for cameras)
- **UART:** Universal Asynchronous Receiver-Transmitter (serial communication)

---

**Document Version:** 1.0  
**Last Updated:** 2025  
**For:** DGS V1.0.0 System Users

