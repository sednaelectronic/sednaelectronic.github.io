# DepoGraph V1.0 User Manual

## Table of Contents

1. [System Overview](#system-overview)
2. [Package Contents](#package-contents)
3. [Mechanical Assembly Instructions](#mechanical-assembly-instructions)
4. [Electrical Wiring and Power Connections](#electrical-wiring-and-power-connections)
5. [Sensor Alignment and Calibration](#sensor-alignment-and-calibration)
6. [Software Installation and Setup](#software-installation-and-setup)
7. [Running a Scan](#running-a-scan)
8. [Interpreting Point Cloud Output](#interpreting-point-cloud-output)
9. [Safety Precautions](#safety-precautions)
10. [Maintenance and Care](#maintenance-and-care)
11. [Basic Troubleshooting](#basic-troubleshooting)

---

## System Overview

DepoGraph V1.0 is a 3D scanning system designed to create detailed point cloud representations of indoor environments. The system uses a laser distance sensor mounted on a two-axis mechanical gimbal to scan the surrounding area systematically.

### Key Features

- **Two-Axis Scanning**: Horizontal (Theta) and vertical (Phi) rotation for complete coverage
- **High Precision**: Sub-millimeter distance measurement accuracy
- **Web-Based Control**: Easy-to-use web interface for configuration and operation
- **Automatic Processing**: Converts raw scan data to 3D point clouds automatically
- **Multiple Export Formats**: OBJ format for compatibility with 3D software

### System Components

- **Scanning Head**: Contains laser distance sensor and camera
- **Control Board**: STM32 microcontroller board for motion control
- **Stepper Motors**: Two motors for precise angular positioning
- **Raspberry Pi**: Computer for data processing and web interface
- **Power Supply**: Custom power board for system power

---

## Package Contents

### Hardware Components

1. **Main Control Board** (1x)
   - STM32F105 microcontroller
   - Motor drivers
   - Sensor interfaces

2. **Power Supply Board** (1x)
   - 12V/24V motor power
   - 5V and 3.3V logic power

3. **Stepper Motors** (2x)
   - Theta axis motor
   - Phi axis motor

4. **LiDAR Sensor** (1x)
   - TFmini distance sensor

5. **Accelerometer Module** (1x)
   - ADXL345 sensor

6. **Optocoupler Sensors** (2x)
   - Home position detection

7. **Cables and Connectors**
   - Motor cables
   - Sensor cables
   - Power cables

8. **Raspberry Pi** (1x)
   - Pre-configured with software

### Software Components

- Pre-installed Python software
- Web interface files
- Configuration database

---

## Mechanical Assembly Instructions

### Step 1: Base Assembly

1. **Mount Control Board**
   - Secure the main control board to the base plate using provided screws
   - Ensure board is level and secure

2. **Mount Power Supply**
   - Install power supply board in designated location
   - Ensure adequate ventilation

3. **Install Stepper Motors**
   - Mount Theta axis motor to base
   - Mount Phi axis motor to Theta axis bracket
   - Ensure motors are properly aligned

### Step 2: Scanning Head Assembly

1. **Mount LiDAR Sensor**
   - Secure TFmini sensor to scanning head bracket
   - Ensure sensor is level and pointing forward
   - Connect sensor cable to control board

2. **Mount Camera** (Optional)
   - Install ESP32-CAM module if included
   - Position for center view of scan area
   - Connect power and data cables

3. **Install Home Position Sensors**
   - Mount optocoupler for Theta axis (horizontal)
   - Mount optocoupler for Phi axis (vertical)
   - Adjust sensor positions for accurate home detection

### Step 3: Mechanical Calibration

1. **Check Motor Alignment**
   - Manually rotate both axes to ensure smooth movement
   - Verify no binding or excessive friction

2. **Verify Home Position**
   - Ensure optocouplers trigger at correct positions
   - Adjust sensor positions if necessary

3. **Test Range of Motion**
   - Verify Theta axis can rotate 180 degrees
   - Verify Phi axis can rotate 90 degrees
   - Check for mechanical interference

---

## Electrical Wiring and Power Connections

### Power Supply Connections

**WARNING**: Always disconnect power before making connections.

1. **Main Power Input**
   - Connect 12V/24V DC power supply to power board input
   - Verify polarity (red = positive, black = negative)
   - Check voltage with multimeter before connecting

2. **Motor Power**
   - Connect motor power cables to power board motor outputs
   - Theta motor: Connect to Motor 1 output
   - Phi motor: Connect to Motor 2 output

3. **Logic Power**
   - 3.3V and 5V outputs are automatically regulated
   - Verify voltages with multimeter

### Control Board Connections

1. **Motor Connections**
   - Theta Motor:
     - Connect motor wires to Theta motor driver terminals
     - Verify correct phase connections
   - Phi Motor:
     - Connect motor wires to Phi motor driver terminals
     - Verify correct phase connections

2. **Sensor Connections**
   - **LiDAR Sensor**:
     - Connect UART cable to USART2 connector
     - Connect power cable to Laser Power pin
   - **Accelerometer**:
     - Connect I2C cable to I2C1 connector
     - Connect power to ADXL Power pin
   - **Home Sensors**:
     - Connect Theta home sensor to PB3
     - Connect Phi home sensor to PB4

3. **Communication Connections**
   - **Raspberry Pi UART**:
     - Connect to USART1 connector (TX to RX, RX to TX)
     - Connect ground wire
   - **Reset Connection**:
     - Connect Raspberry Pi GPIO 13 to Reset pin (if available)

### Raspberry Pi Connections

1. **Serial Connection**
   - Connect UART cable to Raspberry Pi GPIO pins:
     - TX (GPIO 14) to STM32 RX
     - RX (GPIO 15) to STM32 TX
     - Ground to Ground

2. **Power Connection**
   - Connect Raspberry Pi power supply (5V, 2.5A minimum)
   - Use official power supply or equivalent

3. **Network Connection**
   - Connect Ethernet cable for network access
   - Or configure WiFi if available

### Final Checks

1. **Visual Inspection**
   - Check all connections are secure
   - Verify no loose wires
   - Ensure no short circuits

2. **Power-On Test**
   - Connect power supply
   - Verify LED indicators on control board
   - Check Raspberry Pi boots correctly

---

## Sensor Alignment and Calibration

### LiDAR Sensor Alignment

1. **Physical Alignment**
   - Ensure sensor is mounted perpendicular to scanning plane
   - Check sensor is level (use bubble level)
   - Verify sensor points straight ahead at home position

2. **Distance Calibration**
   - Place known target at measured distance (e.g., 1 meter)
   - Use "Get Distance" function in web interface
   - Verify reading matches actual distance
   - Adjust if necessary (may require firmware modification)

### Home Position Calibration

1. **Theta Home Position**
   - Manually rotate Theta axis to desired home position
   - Adjust optocoupler sensor position to trigger at this point
   - Test by sending "Go Home" command
   - Verify motor stops at correct position

2. **Phi Home Position**
   - Manually rotate Phi axis to desired home position (typically vertical)
   - Adjust optocoupler sensor position to trigger at this point
   - Test by sending "Go Home" command
   - Verify motor stops at correct position

### Benchmark Point Calibration

Benchmark points are used to align the coordinate system. You need to set three benchmark points:

1. **Benchmark 1** (Origin Point):
   - Position scanner to point at a known reference point
   - This point will become (0, 0, 0) in the coordinate system
   - Use "Set 1st bench mark" button in web interface
   - Enter known X, Y, Z coordinates if available

2. **Benchmark 2** (X-Axis Alignment):
   - Position scanner to point at a point along the X-axis from Benchmark 1
   - Use "Set 2nd bench mark" button
   - Enter known coordinates

3. **Benchmark 3** (Z-Axis Alignment):
   - Position scanner to point at a point along the Z-axis from Benchmark 1
   - Use "Set 3rd bench mark" button
   - Enter known coordinates

### Scan Area Definition

Define the scan area using four corner points:

1. **Point 1** (Bottom-Left):
   - Position scanner to point at bottom-left corner of scan area
   - Use "Set 1st scan position" button
   - System will record R, θ, φ coordinates

2. **Point 2** (Bottom-Right):
   - Position scanner to point at bottom-right corner
   - Use "Set 2nd scan position" button

3. **Point 3** (Top-Left):
   - Position scanner to point at top-left corner
   - Use "Set 3rd scan position" button

4. **Point 4** (Top-Right):
   - Position scanner to point at top-right corner
   - Use "Set 4th scan position" button

---

## Software Installation and Setup

### Prerequisites

- Raspberry Pi (Model 3B+ or newer recommended)
- MicroSD card (32GB minimum, Class 10)
- Raspberry Pi OS (Raspbian) installed

### Installation Steps

1. **Update System**
   ```bash
   sudo apt update
   sudo apt upgrade -y
   ```

2. **Install Python Dependencies**
   ```bash
   sudo apt install python3-pip python3-venv -y
   pip3 install flask pyserial requests pandas tqdm RPi.GPIO
   ```

3. **Enable Serial Interface**
   ```bash
   sudo raspi-config
   ```
   - Navigate to "Interfacing Options"
   - Select "Serial Port"
   - Enable serial interface
   - Disable serial console (if prompted)

4. **Set Serial Port Permissions**
   ```bash
   sudo usermod -a -G dialout $USER
   sudo chmod 666 /dev/serial0
   ```

5. **Copy Software Files**
   - Copy `Software/RPI_CODE/Depo-New Class 02-03-10/` to Raspberry Pi
   - Place in home directory: `~/DepoGraph/`

6. **Configure Network** (if using WiFi)
   - Edit `/etc/wpa_supplicant/wpa_supplicant.conf`
   - Add WiFi credentials

7. **Set Up Auto-Start** (Optional)
   ```bash
   sudo nano /etc/systemd/system/depograph.service
   ```
   Add:
   ```ini
   [Unit]
   Description=DepoGraph Scanner Service
   After=network.target

   [Service]
   Type=simple
   User=pi
   WorkingDirectory=/home/pi/DepoGraph
   ExecStart=/usr/bin/python3 /home/pi/DepoGraph/run.py
   Restart=always

   [Install]
   WantedBy=multi-user.target
   ```
   Enable service:
   ```bash
   sudo systemctl enable depograph.service
   sudo systemctl start depograph.service
   ```

### Initial Configuration

1. **Start Web Server**
   ```bash
   cd ~/DepoGraph
   python3 run.py
   ```

2. **Access Web Interface**
   - Open web browser
   - Navigate to: `http://raspberry-pi-ip:60000`
   - Default page redirects to control interface

3. **Create First Project**
   - Click "Dashboard" (requires login)
   - Default credentials: Check with administrator
   - Create new scanner configuration
   - Enter project name and zone name

---

## Running a Scan

### Pre-Scan Checklist

- [ ] Power connected and verified
- [ ] All sensors connected and working
- [ ] Home position calibrated
- [ ] Benchmark points set
- [ ] Scan area points defined
- [ ] Web interface accessible
- [ ] Scanner can move to home position

### Manual Control

1. **Access Control Interface**
   - Navigate to `http://raspberry-pi-ip:60000/control`

2. **Test Movement**
   - Use directional buttons to move scanner
   - Adjust "gear" value to change movement speed
   - Verify smooth movement in all directions

3. **Test Distance Reading**
   - Click "Get Distance" button
   - Verify distance reading appears
   - Test at known distances

4. **Go to Home Position**
   - Click "Go Home" button
   - Wait for motors to reach home position
   - Verify correct position

### Configuration

1. **Set Scan Parameters**
   - **Project Name**: Enter project identifier
   - **Zone Name**: Enter zone/area identifier
   - **Scanner ID**: Enter unique scanner ID
   - **Distance between cloud points**: Set point spacing (mm)
   - **Distance between mesh segments**: Set mesh resolution (mm)
   - **Initial volume**: Set base volume for calculations (m³)

2. **Set Benchmark Points**
   - Position scanner at Benchmark 1 location
   - Enter known X, Y, Z coordinates
   - Click "Set 1st bench mark"
   - Repeat for Benchmarks 2 and 3

3. **Set Scan Area**
   - Position scanner at each corner point
   - Click corresponding "Set scan position" button
   - Verify all four points are set

### Starting a Scan

1. **Final Verification**
   - Click "Go Home" to return to home position
   - Verify all settings are correct
   - Ensure scan area is clear

2. **Start Scan**
   - Click "Quick Start" button
   - Scanner will:
     - Move to home position
     - Move to start position
     - Begin scanning pattern
     - Transmit data to Raspberry Pi

3. **Monitor Progress**
   - Watch web interface for status updates
   - Monitor serial output (if available)
   - Scan time depends on area size and resolution

4. **Scan Completion**
   - Scanner returns to home position
   - "Scan End" message appears
   - Data processing begins automatically

### Automatic Scanning

1. **Enable Auto-Scan**
   - Toggle auto-scan button (green = enabled)
   - Set scan time (24-hour format, e.g., "14:30")
   - System will start scan at specified time

2. **Monitor Auto-Scans**
   - Check Dashboard for scan history
   - Review scan results
   - Download point cloud files

---

## Interpreting Point Cloud Output

### Output Files

After scanning, the following files are generated:

1. **raw.txt**: Raw serial data from scanner
   - Format: `distance,strength,phi` and `theta*`
   - Used for debugging and reprocessing

2. **RTPS.txt**: Processed spherical coordinates
   - Format: `R theta phi strength`
   - Radius, angles in degrees, signal strength

3. **point_Cloud.obj**: 3D point cloud in OBJ format
   - Cartesian coordinates (X, Y, Z)
   - Can be opened in 3D software (Blender, MeshLab, etc.)

4. **meshed.obj**: Triangulated mesh
   - Point cloud converted to mesh with faces
   - Includes volume calculation data

### Viewing Point Clouds

**Using MeshLab**:
1. Open MeshLab
2. File → Import Mesh
3. Select `point_Cloud.obj`
4. Points will be displayed
5. Use navigation tools to explore

**Using Blender**:
1. Open Blender
2. File → Import → Wavefront (.obj)
3. Select `point_Cloud.obj`
4. Points appear in 3D viewport

**Using CloudCompare**:
1. Open CloudCompare
2. File → Open
3. Select `point_Cloud.obj`
4. Advanced visualization and analysis tools available

### Understanding Coordinates

- **X-axis**: Horizontal (left-right)
- **Y-axis**: Vertical (up-down, negative is upward)
- **Z-axis**: Depth (forward-backward)
- **Origin**: Located at Benchmark 1 position

### Point Cloud Quality

**Good Quality Indicators**:
- Dense, uniform point distribution
- Clear object boundaries
- Minimal noise or outliers
- Consistent point spacing

**Poor Quality Indicators**:
- Sparse or missing areas
- Excessive noise
- Incorrect distances
- Distorted shapes

### Volume Calculation

The mesh file includes volume calculation:
- Volume is calculated relative to initial volume
- Result is stored in database
- Displayed in web interface after scan

---

## Safety Precautions

### Electrical Safety

1. **Power Off Before Connections**
   - Always disconnect power before making or changing connections
   - Verify power is off with multimeter

2. **Correct Voltage**
   - Verify power supply voltage matches system requirements
   - Check polarity before connecting

3. **No Exposed Wires**
   - Ensure all connections are properly insulated
   - Use appropriate wire gauges
   - Secure all connections

4. **Grounding**
   - Ensure proper grounding
   - Connect ground wires correctly

### Mechanical Safety

1. **Clearance**
   - Ensure adequate clearance for motor movement
   - Remove obstacles from scan area
   - Keep hands away from moving parts during operation

2. **Secure Mounting**
   - Verify all components are securely mounted
   - Check mounting hardware regularly
   - Ensure stability of base

3. **Motor Limits**
   - Do not force motors beyond mechanical limits
   - Respect home position sensors
   - Stop operation if binding occurs

### Laser Safety

1. **Eye Protection**
   - TFmini uses Class 1 laser (eye-safe)
   - Do not stare directly into laser beam
   - Keep laser away from eyes

2. **Laser Power**
   - Laser is automatically controlled by system
   - Do not modify laser power settings
   - Turn off laser when not in use

### Operational Safety

1. **Supervision**
   - Monitor scanner during operation
   - Be prepared to stop scan if issues occur
   - Keep emergency stop accessible

2. **Environment**
   - Ensure stable, level mounting surface
   - Protect from moisture and dust
   - Maintain adequate ventilation

3. **Maintenance**
   - Power off before maintenance
   - Allow system to cool after extended use
   - Follow maintenance schedule

---

## Maintenance and Care

### Regular Maintenance

**Daily**:
- Visual inspection of all components
- Check for loose connections
- Verify home position accuracy
- Clean sensor lenses (if needed)

**Weekly**:
- Test all motor movements
- Verify distance sensor accuracy
- Check power supply voltages
- Inspect cables for damage

**Monthly**:
- Clean all components
- Lubricate mechanical parts (if applicable)
- Check mounting hardware tightness
- Review scan quality and calibration

### Cleaning

1. **Sensor Lenses**
   - Use lens cleaning cloth
   - Gently wipe LiDAR sensor lens
   - Avoid scratching lens surface
   - Clean camera lens if installed

2. **Mechanical Components**
   - Wipe down motors and brackets
   - Remove dust and debris
   - Check for corrosion

3. **Circuit Boards**
   - Use compressed air to remove dust
   - Do not use liquids
   - Ensure boards are dry before power-on

### Storage

1. **Short-Term** (Days to Weeks):
   - Cover scanner to protect from dust
   - Keep in dry location
   - Disconnect power

2. **Long-Term** (Months):
   - Disassemble if necessary
   - Store components in protective cases
   - Keep in climate-controlled environment
   - Protect from moisture

### Calibration Maintenance

1. **Home Position**
   - Verify home position accuracy monthly
   - Recalibrate if drift detected
   - Check sensor alignment

2. **Benchmark Points**
   - Recalibrate if scanner is moved
   - Verify after maintenance
   - Update if reference points change

3. **Distance Sensor**
   - Test accuracy with known distances
   - Compare readings over time
   - Recalibrate if necessary

---

## Basic Troubleshooting

### Scanner Not Responding

**Symptoms**: No movement, no response to commands

**Possible Causes**:
- Power not connected
- Serial communication failure
- Motor drivers not enabled

**Solutions**:
1. Check power connections
2. Verify power supply is on
3. Check serial cable connection
4. Verify serial port permissions: `ls -l /dev/serial0`
5. Test serial communication: `sudo minicom -D /dev/serial0 -b 115200`
6. Check motor enable signals

### Inaccurate Distance Readings

**Symptoms**: Distance readings don't match actual distances

**Possible Causes**:
- Sensor misalignment
- Dirty sensor lens
- Sensor calibration drift
- Target surface issues (reflective, transparent)

**Solutions**:
1. Clean sensor lens
2. Verify sensor alignment
3. Test with known distances
4. Check target surface (avoid mirrors, glass)
5. Recalibrate if necessary

### Motor Not Moving

**Symptoms**: Motor doesn't rotate when commanded

**Possible Causes**:
- Motor not connected
- Motor driver not enabled
- Incorrect wiring
- Mechanical binding

**Solutions**:
1. Check motor connections
2. Verify motor driver enable signal
3. Test motor manually (disconnect and test)
4. Check for mechanical binding
5. Verify step and direction signals

### Home Position Not Detected

**Symptoms**: Scanner doesn't find home position

**Possible Causes**:
- Optocoupler sensor not connected
- Sensor misaligned
- Sensor failure
- Wiring issue

**Solutions**:
1. Check sensor connections
2. Verify sensor alignment
3. Test sensor with multimeter
4. Adjust sensor position
5. Replace sensor if faulty

### Web Interface Not Accessible

**Symptoms**: Cannot access web interface

**Possible Causes**:
- Raspberry Pi not running
- Network connection issue
- Web server not started
- Firewall blocking

**Solutions**:
1. Check Raspberry Pi power and status
2. Verify network connection
3. Check if web server is running: `ps aux | grep python`
4. Restart web server: `python3 run.py`
5. Check firewall settings
6. Verify IP address: `hostname -I`

### Scan Data Missing or Incomplete

**Symptoms**: Point cloud has gaps or missing areas

**Possible Causes**:
- Scan area too large
- Resolution too high
- Communication errors
- Target surface issues

**Solutions**:
1. Reduce scan area
2. Increase point spacing (deltapoint)
3. Check serial communication during scan
4. Verify target surfaces are scannable
5. Re-run scan with adjusted parameters

### Point Cloud Distorted

**Symptoms**: Point cloud doesn't match actual geometry

**Possible Causes**:
- Incorrect benchmark calibration
- Scanner movement during scan
- Coordinate transformation error
- Mechanical misalignment

**Solutions**:
1. Recalibrate benchmark points
2. Verify scanner is stable during scan
3. Check mechanical alignment
4. Verify coordinate transformations
5. Re-run calibration procedure

### System Reset Issues

**Symptoms**: System resets unexpectedly

**Possible Causes**:
- Power supply issues
- Overcurrent protection
- Software crash
- Hardware fault

**Solutions**:
1. Check power supply voltage and current
2. Verify power supply capacity
3. Check for short circuits
4. Review system logs
5. Test with reduced load

### Getting Help

If problems persist:

1. **Document the Issue**:
   - Note symptoms
   - Record error messages
   - Take photos if applicable
   - Note when issue occurs

2. **Check Logs**:
   - Review web interface logs
   - Check system logs: `journalctl -u depograph`
   - Review serial output

3. **Contact Support**:
   - Provide detailed problem description
   - Include system configuration
   - Share relevant logs and files

---

## Quick Reference

### Web Interface URLs

- Control Page: `http://raspberry-pi-ip:60000/control`
- Dashboard: `http://raspberry-pi-ip:60000/Dashboard`
- Login: `http://raspberry-pi-ip:60000/admin`

### Important Commands

**Start Web Server**:
```bash
cd ~/DepoGraph
python3 run.py
```

**Check Serial Port**:
```bash
ls -l /dev/serial0
sudo chmod 666 /dev/serial0
```

**Test Serial Communication**:
```bash
sudo minicom -D /dev/serial0 -b 115200
```

**Check Service Status**:
```bash
sudo systemctl status depograph
```

### File Locations

- Software: `~/DepoGraph/`
- Output Files: `~/DepoGraph/FTP/`
- Database: `~/DepoGraph/db.sqlite3`
- Logs: System journal

### Contact Information

For technical support or questions, refer to the Technical Documentation or contact your system administrator.

---

**Document Version**: 1.0  
**Last Updated**: 2025  
**Intended Audience**: Technicians, Operators, Installers

