# LADAR v1 - User Manual

## Table of Contents
1. [System Overview](#system-overview)
2. [Package Contents](#package-contents)
3. [Mechanical Mounting and Alignment](#mechanical-mounting-and-alignment)
4. [Electrical Wiring and Power Connections](#electrical-wiring-and-power-connections)
5. [Accessing the Web Configuration Interface](#accessing-the-web-configuration-interface)
6. [Initial Setup and Calibration](#initial-setup-and-calibration)
7. [Normal Operation Behavior](#normal-operation-behavior)
8. [Safety Notes and Installation Precautions](#safety-notes-and-installation-precautions)
9. [Maintenance Guidelines](#maintenance-guidelines)
10. [Basic Troubleshooting](#basic-troubleshooting)

---

## System Overview

The LADAR v1 is a two-axis scanning system designed for people passage detection and access control in open areas. The system uses a LiDAR distance sensor mounted on a motorized two-axis gimbal to scan an area and detect the presence of people or objects.

**Key Features:**
- Two-axis scanning (horizontal and vertical)
- Real-time distance measurement
- Web-based configuration interface
- Digital output signals for external control
- Configurable detection thresholds
- Automatic baseline calibration

**Typical Applications:**
- Entry/exit monitoring
- Access control systems
- People counting
- Intrusion detection
- Area monitoring

---

## Package Contents

**Standard Package Includes:**
- LADAR v1 scanning unit (main control board + scanning mechanism)
- Power supply unit (specify voltage/current requirements)
- Mounting hardware (brackets, screws)
- Communication module (ESP8266 or HLK RM04 for web interface)
- USB cable (for initial configuration, if applicable)
- Quick start guide
- Safety information sheet

**Optional Accessories:**
- External antenna (for WiFi module)
- Extension cables
- Mounting pole or bracket
- Weatherproof enclosure (for outdoor installations)

**Before Installation:**
- Verify all components are present
- Check for physical damage
- Ensure power supply matches system requirements
- Review installation location requirements

---

## Mechanical Mounting and Alignment

### Mounting Location Selection

**Requirements:**
- **Height:** Mount at appropriate height for detection area (typically 2-4 meters)
- **Field of View:** Ensure clear line of sight to scanning area
- **Stability:** Mount on solid, vibration-free surface
- **Environment:** Protected from direct weather exposure (unless weatherproof model)
- **Access:** Allow access for maintenance and configuration

**Recommended Mounting:**
- Ceiling mount for downward scanning
- Wall mount for horizontal area coverage
- Pole mount for outdoor installations

### Mounting Procedure

1. **Prepare Mounting Surface:**
   - Mark mounting hole locations
   - Drill holes according to bracket specifications
   - Ensure surface is level and secure

2. **Install Mounting Bracket:**
   - Attach bracket to surface using appropriate fasteners
   - Verify bracket is level using a spirit level
   - Tighten all fasteners securely

3. **Attach Scanner Unit:**
   - Align scanner unit with bracket
   - Secure using provided mounting hardware
   - Ensure unit is firmly attached (no wobble)

4. **Initial Alignment:**
   - Position scanner to face the detection area
   - Ensure scanning range covers desired area
   - Leave access to adjustment mechanisms

### Alignment and Calibration

**Horizontal Alignment:**
- Adjust scanner rotation to cover desired horizontal range
- Use web interface to test scanning pattern
- Verify coverage area matches requirements

**Vertical Alignment:**
- Adjust vertical angle to cover desired elevation range
- Consider mounting height and detection zone
- Test scanning pattern and adjust as needed

**Fine-Tuning:**
- Use web interface to perform test scans
- Adjust mounting angle if coverage is insufficient
- Re-check alignment after initial calibration

---

## Electrical Wiring and Power Connections

### Power Supply Requirements

**Specifications:**
- **Voltage:** [Specify voltage - typically 12V or 24V DC]
- **Current:** [Specify current rating - depends on motor requirements]
- **Power Rating:** [Specify total power - typically 50-100W]
- **Type:** Regulated DC power supply

**Safety Requirements:**
- Use only approved power supplies
- Ensure proper grounding
- Install appropriate fuses/circuit breakers
- Follow local electrical codes

### Power Connection Procedure

1. **Power Supply Installation:**
   - Mount power supply in appropriate location
   - Ensure adequate ventilation
   - Connect AC input (if applicable) following local codes

2. **DC Power Wiring:**
   - Connect positive (+) terminal to scanner unit
   - Connect negative (-) terminal to scanner unit
   - Verify polarity is correct (reverse polarity can damage unit)
   - Use appropriate wire gauge for current requirements

3. **Grounding:**
   - Connect system ground to building ground
   - Ensure proper earth connection
   - Verify continuity

4. **Power Verification:**
   - Check voltage at scanner unit terminals
   - Verify voltage is within specifications
   - Check for proper polarity

### Communication Wiring

**Ethernet/WiFi Module Connection:**
- Connect module to USART1 interface (if external module)
- Follow module-specific wiring instructions
- Ensure proper signal levels (3.3V logic)

**Digital Output Connection:**
- Connect external control system to digital output pin
- Verify signal levels (3.3V logic)
- Use appropriate interface if connecting to higher voltage systems
- Consider optocoupler isolation for safety

**Serial Communication (Optional):**
- Connect to USART1 for direct serial communication
- Use 115200 baud, 8N1 settings
- Use appropriate level converter if needed

### Wiring Safety Checklist

- [ ] All connections are secure and properly tightened
- [ ] Wire gauge is appropriate for current requirements
- [ ] Polarity is correct for all DC connections
- [ ] Ground connections are properly made
- [ ] No exposed conductors
- [ ] All connections are protected from moisture
- [ ] Fuses/circuit breakers are properly sized
- [ ] Wiring follows local electrical codes

---

## Accessing the Web Configuration Interface

### Network Connection

**WiFi Connection (if using ESP8266):**
1. Power on the scanner unit
2. Connect to the scanner's WiFi network (SSID will be displayed or in documentation)
3. Open web browser and navigate to default IP address (typically 192.168.4.1 or as configured)

**Ethernet Connection (if using HLK RM04):**
1. Connect Ethernet cable from scanner to network switch/router
2. Power on the scanner unit
3. Find scanner IP address (check router DHCP table or use discovery tool)
4. Open web browser and navigate to scanner IP address

**Direct Serial Connection:**
1. Connect USB-to-serial adapter to USART1 (PB6/PB7)
2. Configure terminal software: 115200 baud, 8N1, no flow control
3. Send commands directly via serial terminal

### Web Interface Access

1. **Open Web Browser:**
   - Use modern browser (Chrome, Firefox, Edge)
   - Navigate to scanner IP address
   - Wait for interface to load

2. **Login (if required):**
   - Default credentials (if applicable): [Check documentation]
   - Change default password after first login

3. **Interface Overview:**
   - **Status Page:** System status and current readings
   - **Configuration Page:** System parameters and thresholds
   - **Calibration Page:** Setup and calibration tools
   - **Scanning Page:** Manual control and test scanning
   - **Data Output Page:** Real-time data stream

### Initial Web Interface Setup

1. **Network Configuration:**
   - Set static IP (if required)
   - Configure WiFi credentials (if applicable)
   - Set subnet mask and gateway

2. **System Settings:**
   - Set time/date (if RTC is available)
   - Configure detection parameters
   - Set scanning range limits

3. **Save Configuration:**
   - Click "Save" or "Apply" button
   - Wait for confirmation
   - System may restart to apply changes

---

## Initial Setup and Calibration

### Pre-Calibration Checklist

- [ ] Scanner is properly mounted and aligned
- [ ] Power is connected and verified
- [ ] Communication interface is working
- [ ] Web interface is accessible
- [ ] Detection area is clear of people/objects
- [ ] Scanning mechanism moves freely

### Home Position Calibration

1. **Access Calibration Menu:**
   - Open web interface
   - Navigate to "Calibration" or "Setup" page

2. **Perform Home Calibration:**
   - Click "Go Home" or send `GOHOME *` command
   - Wait for motors to reach home positions
   - System will detect optocoupler sensors automatically
   - Verify both axes reach home position

3. **Verify Home Position:**
   - Check that theta axis is at 0° (or configured start)
   - Check that phi axis is at home position
   - Re-run home calibration if positions are incorrect

### Baseline Calibration (Base Scan)

**Purpose:** Establish reference distances for empty detection area

1. **Prepare Area:**
   - Clear detection area of all people and objects
   - Ensure area matches normal operating conditions
   - Close doors/gates if applicable

2. **Start Base Scan:**
   - In web interface, navigate to "Calibration" page
   - Click "Start Base Scan" or send `S#BASE *` command
   - System will perform full scan of area

3. **Monitor Progress:**
   - Watch scanning progress indicator
   - Wait for scan to complete
   - System will store baseline distances

4. **Verify Results:**
   - Review baseline data if available
   - Check for any unexpected readings
   - Re-run base scan if needed

### Installation Height Calibration

1. **Measure Height:**
   - Measure vertical distance from scanner to detection plane
   - Record measurement in centimeters

2. **Set Installation Height:**
   - In configuration page, find "Zinstall" or "Installation Height"
   - Enter measured value
   - Save configuration

3. **Verify Calibration:**
   - Perform test scan
   - Check distance readings match expected values
   - Adjust if necessary

### Scanning Range Configuration

1. **Set Theta Range:**
   - **Theta Start:** Starting horizontal angle (default: 4000 steps)
   - **Theta End:** Ending horizontal angle (default: 32000 steps, ~360°)
   - Adjust to cover desired horizontal range

2. **Set Phi Range:**
   - **Phi Start:** Starting vertical angle (default: 1800 steps)
   - **Phi End:** Ending vertical angle (configurable)
   - Adjust to cover desired vertical range

3. **Set Step Sizes:**
   - **dande_theta:** Horizontal step size (default: 5 steps)
   - **dande_phi:** Vertical step size (default: 2 steps)
   - Smaller steps = higher resolution but slower scanning

4. **Save Configuration:**
   - Apply changes
   - Test scanning pattern
   - Adjust as needed

### Detection Threshold Configuration

1. **Distance Threshold (Delta_Z):**
   - Default: 10 cm
   - Increase for less sensitivity (fewer false alarms)
   - Decrease for more sensitivity (detect smaller objects)

2. **Theta Threshold (Dteta):**
   - Default: 1500 steps
   - Adjust based on detection requirements

3. **Test Thresholds:**
   - Perform test scans with known objects
   - Adjust thresholds until detection works correctly
   - Balance sensitivity vs. false alarm rate

### Final Verification

1. **Test Scanning:**
   - Perform full scan cycle
   - Verify scanning pattern covers desired area
   - Check data output is correct

2. **Test Detection:**
   - Place test object in detection area
   - Verify detection is triggered
   - Check digital output signal

3. **Verify Communication:**
   - Test web interface responsiveness
   - Verify data output is accessible
   - Check digital output connections

---

## Normal Operation Behavior

### Startup Sequence

1. **Power On:**
   - System initializes (LED may blink)
   - Motors move to home position
   - Sensors are calibrated
   - System enters ready state

2. **Normal Operation:**
   - Scanner performs continuous scanning cycles
   - Distance measurements are compared to baseline
   - Detection events trigger digital output
   - Data is available via web interface

### Scanning Operation

**Scanning Pattern:**
- System performs raster scan (horizontal sweeps with vertical increments)
- Each scan point measures distance
- Scan data is compared to baseline
- Detection events are logged

**Scanning Speed:**
- Depends on step sizes and motor speed settings
- Typical full scan: [Specify time - depends on configuration]
- Can be adjusted via configuration

### Detection Behavior

**Normal State (No Detection):**
- Digital output: LOW (0)
- Continuous scanning
- Baseline comparison active

**Detection State:**
- When object detected: Digital output: HIGH (1)
- Detection logged
- Alert may be sent (if configured)
- Output remains HIGH while object present

**Return to Normal:**
- When object leaves detection area
- Digital output returns to LOW (0)
- System continues scanning

### Data Output

**Web Interface:**
- Real-time distance data
- Detection events log
- System status information
- Configuration parameters

**Serial Output:**
- CSV format: `theta,distance\n`
- Continuous data stream during scanning
- Command responses

**Digital Output:**
- Logic 0: No detection
- Logic 1: Detection active
- Can be connected to external systems

### Status Indicators

**LED Indicators:**
- **PC13 LED:** System status
  - Blinking: Normal operation
  - Solid: Error or attention required
  - Off: System off or error

**Web Interface Status:**
- Connection status
- Scanning status
- Detection status
- Error messages (if any)

---

## Safety Notes and Installation Precautions

### Electrical Safety

**Warnings:**
- ⚠️ **HIGH VOLTAGE:** Power supply may deliver dangerous voltages
- ⚠️ **ELECTRIC SHOCK HAZARD:** Disconnect power before servicing
- ⚠️ **POLARITY:** Incorrect polarity can damage equipment
- ⚠️ **GROUNDING:** Proper grounding is essential for safety

**Precautions:**
- Always disconnect power before making connections
- Verify voltage and polarity before connecting
- Use appropriate personal protective equipment
- Follow local electrical codes and regulations
- Ensure proper fusing/circuit protection
- Keep electrical connections dry and protected

### Mechanical Safety

**Warnings:**
- ⚠️ **MOVING PARTS:** Scanner mechanism moves during operation
- ⚠️ **PINCH POINTS:** Keep fingers away from moving parts
- ⚠️ **MOUNTING:** Ensure secure mounting to prevent falling

**Precautions:**
- Keep hands clear during scanning operation
- Do not obstruct scanning mechanism
- Verify mounting is secure before operation
- Use appropriate mounting hardware
- Check for loose connections regularly

### Laser/LiDAR Safety

**Warnings:**
- ⚠️ **LASER RADIATION:** LiDAR sensor may emit laser radiation
- ⚠️ **EYE SAFETY:** Do not look directly into sensor
- ⚠️ **CLASS:** Verify laser safety class (typically Class 1 - safe)

**Precautions:**
- Do not stare into the sensor
- Follow manufacturer's laser safety guidelines
- Ensure sensor is properly installed and aligned
- Do not modify or disassemble sensor

### Environmental Safety

**Operating Conditions:**
- **Temperature:** [Specify range - typically 0°C to 50°C]
- **Humidity:** [Specify range - typically 10% to 90% non-condensing]
- **Protection:** Indoor use or weatherproof enclosure for outdoor

**Precautions:**
- Protect from direct weather exposure
- Ensure adequate ventilation
- Avoid extreme temperatures
- Protect from dust and debris
- Use weatherproof enclosure for outdoor installations

### Installation Precautions

**Before Installation:**
- Read all documentation
- Verify all components are present
- Check for damage
- Plan installation location
- Ensure adequate access for maintenance

**During Installation:**
- Follow installation instructions carefully
- Verify all connections before powering on
- Test operation before finalizing installation
- Document installation details

**After Installation:**
- Verify proper operation
- Test all functions
- Document configuration
- Provide user training if needed

---

## Maintenance Guidelines

### Regular Maintenance

**Daily Checks (if applicable):**
- Visual inspection of unit
- Check for error messages in web interface
- Verify detection is working correctly
- Check status LED

**Weekly Maintenance:**
- Clean scanner lens/sensor (if accessible)
- Check mounting hardware for tightness
- Verify scanning pattern is correct
- Review detection logs for anomalies

**Monthly Maintenance:**
- Perform full system test
- Check all electrical connections
- Verify calibration is still accurate
- Clean unit exterior (if needed)
- Check for software updates

**Quarterly Maintenance:**
- Re-calibrate baseline (if environment changed)
- Check motor operation and lubrication (if applicable)
- Verify optocoupler sensors are functioning
- Review and update configuration if needed
- Check power supply operation

### Cleaning Procedures

**Exterior Cleaning:**
- Power off unit before cleaning
- Use soft, dry cloth for exterior
- Avoid harsh chemicals
- Do not spray liquids directly on unit
- Ensure unit is dry before powering on

**Sensor Cleaning (if applicable):**
- Follow manufacturer's guidelines
- Use appropriate cleaning materials
- Be gentle with sensor surface
- Do not scratch or damage sensor

### Calibration Maintenance

**When to Re-calibrate:**
- After physical relocation
- If detection accuracy degrades
- After environmental changes
- After maintenance that affects alignment
- Periodically (every 6-12 months)

**Re-calibration Procedure:**
- Clear detection area
- Perform new base scan
- Verify calibration results
- Test detection accuracy
- Update configuration if needed

### Software Updates

**Update Procedure:**
- Download latest firmware (if available)
- Backup current configuration
- Follow firmware update instructions
- Verify update was successful
- Restore configuration if needed
- Test all functions after update

**Update Precautions:**
- Do not interrupt update process
- Ensure stable power during update
- Follow update instructions carefully
- Test thoroughly after update

### Troubleshooting Maintenance

**If Issues Occur:**
- Check error logs
- Verify connections
- Test individual components
- Consult troubleshooting section
- Contact support if needed

**Documentation:**
- Keep maintenance log
- Document any changes made
- Note any issues encountered
- Record calibration dates

---

## Basic Troubleshooting

### System Won't Power On

**Symptoms:**
- No LED indicators
- No response to commands
- No communication

**Possible Causes and Solutions:**
1. **No Power:**
   - Check power supply is connected
   - Verify power supply is on
   - Check voltage at unit terminals
   - Verify fuse/circuit breaker

2. **Incorrect Voltage:**
   - Measure voltage at unit
   - Verify voltage matches specifications
   - Check power supply output

3. **Faulty Connection:**
   - Check all power connections
   - Verify wire connections are secure
   - Check for damaged wires

4. **Internal Fault:**
   - Contact support if above don't resolve issue

### Scanner Not Moving

**Symptoms:**
- Motors don't move
- No scanning motion
- Home position not reached

**Possible Causes and Solutions:**
1. **Motors Disabled:**
   - Check if drivers are enabled
   - Send enable command via interface
   - Verify enable signals

2. **Mechanical Obstruction:**
   - Check for physical obstructions
   - Verify mechanism moves freely
   - Remove any blocking objects

3. **Motor Driver Issue:**
   - Check motor driver connections
   - Verify step/direction signals
   - Check power to motor drivers

4. **Configuration Issue:**
   - Verify motor parameters are correct
   - Check step size settings
   - Review motor control configuration

### No Distance Readings

**Symptoms:**
- Distance always shows 0 or invalid
- No data from LiDAR sensor
- Detection not working

**Possible Causes and Solutions:**
1. **Sensor Connection:**
   - Check USART2 connection to sensor
   - Verify baud rate is correct (1 Mbps)
   - Check TX/RX connections

2. **Sensor Power:**
   - Verify sensor is powered
   - Check power connections
   - Measure sensor supply voltage

3. **Sensor Obstruction:**
   - Check sensor lens is clean
   - Verify nothing blocking sensor
   - Check sensor alignment

4. **Sensor Fault:**
   - Test sensor with known good unit
   - Check sensor specifications
   - Contact support if sensor is faulty

### Web Interface Not Accessible

**Symptoms:**
- Can't connect to web interface
- Timeout errors
- No response from unit

**Possible Causes and Solutions:**
1. **Network Connection:**
   - Check Ethernet/WiFi connection
   - Verify IP address is correct
   - Ping scanner IP address
   - Check network settings

2. **Module Issue:**
   - Check ESP8266/RM04 module is powered
   - Verify module connections
   - Check module status LED
   - Reset module if needed

3. **IP Address:**
   - Verify scanner IP address
   - Check for IP conflicts
   - Try different IP address
   - Use discovery tool if available

4. **Firewall/Security:**
   - Check firewall settings
   - Verify port is not blocked
   - Check security software

### False Detections

**Symptoms:**
- Detections when no one present
- Frequent false alarms
- Inconsistent detection

**Possible Causes and Solutions:**
1. **Threshold Too Low:**
   - Increase Delta_Z threshold
   - Adjust detection sensitivity
   - Re-calibrate baseline

2. **Baseline Outdated:**
   - Perform new base scan
   - Clear area before base scan
   - Verify baseline is accurate

3. **Environmental Changes:**
   - Check for new objects in area
   - Verify lighting conditions
   - Check for reflections/interference

4. **Sensor Issues:**
   - Clean sensor lens
   - Check sensor alignment
   - Verify sensor is functioning correctly

### No Detection When Object Present

**Symptoms:**
- Objects not detected
- Digital output stays LOW
- No detection events

**Possible Causes and Solutions:**
1. **Threshold Too High:**
   - Decrease Delta_Z threshold
   - Increase detection sensitivity
   - Check threshold settings

2. **Scanning Range:**
   - Verify object is in scanning range
   - Check scanning pattern covers area
   - Adjust scanning range if needed

3. **Object Too Small:**
   - Verify object is detectable size
   - Adjust sensitivity settings
   - Check detection algorithm parameters

4. **Baseline Issue:**
   - Re-perform base scan
   - Verify baseline is correct
   - Check for baseline corruption

### Digital Output Not Working

**Symptoms:**
- Digital output doesn't change
- No signal on output pin
- External system not triggered

**Possible Causes and Solutions:**
1. **Connection Issue:**
   - Check output wire connections
   - Verify connection to correct pin
   - Check for loose connections

2. **Signal Level:**
   - Verify signal voltage (3.3V)
   - Check if level conversion needed
   - Verify external system compatibility

3. **Configuration:**
   - Check output is enabled
   - Verify detection is working
   - Review output control settings

4. **External System:**
   - Test with multimeter/oscilloscope
   - Verify external system is working
   - Check external system input requirements

### Getting Help

**Before Contacting Support:**
- Review this troubleshooting guide
- Check error logs/messages
- Document symptoms and steps taken
- Note any recent changes

**Information to Provide:**
- System model and version
- Firmware version
- Description of issue
- Steps to reproduce
- Error messages (if any)
- Configuration settings
- Recent changes made

**Support Contact:**
- [Provide support contact information]
- [Provide support hours]
- [Provide preferred contact method]

---

## Appendix

### Quick Reference

**Common Commands:**
- Go Home: `GOHOME *`
- Start Scan: `S#START*`
- Base Scan: `S#BASE *`
- Query Distance: `QIST*****`

**Status Indicators:**
- LED Blinking: Normal operation
- LED Solid: Error/Attention
- LED Off: System off

**Default Settings:**
- Theta Range: 0-32000 steps (~360°)
- Phi Range: 0-1800+ steps
- Distance Threshold: 10 cm
- Step Sizes: Theta=5, Phi=2

### Maintenance Schedule

| Task | Frequency | Notes |
|------|-----------|-------|
| Visual Inspection | Daily | Check for obvious issues |
| Status Check | Daily | Verify operation |
| Cleaning | Weekly | Exterior and sensor |
| Full Test | Monthly | Complete system test |
| Re-calibration | Quarterly | Baseline and alignment |
| Software Update | As needed | When updates available |

### Safety Symbols

- ⚠️ Warning: Potential hazard
- ⚡ Electrical hazard
- 🔧 Maintenance required
- 📋 Important information
- ✅ Safe to proceed

---

*End of User Manual*

