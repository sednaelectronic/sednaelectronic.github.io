# Linear Laser v2.0 - User Manual

## Document Information
- **Version:** 2.0
- **Target Audience:** Installers, Technicians, Operators
- **Last Updated:** 2025

---

## Table of Contents
1. [System Overview](#system-overview)
2. [Package Contents](#package-contents)
3. [Mechanical Assembly and Mirror Alignment](#mechanical-assembly-and-mirror-alignment)
4. [Electrical Wiring and Power Connections](#electrical-wiring-and-power-connections)
5. [Network Configuration](#network-configuration)
6. [Initial Setup and Calibration](#initial-setup-and-calibration)
7. [Operating Modes](#operating-modes)
8. [Firmware Update Procedure](#firmware-update-procedure)
9. [Laser Safety Warnings and Precautions](#laser-safety-warnings-and-precautions)
10. [Maintenance Guidelines](#maintenance-guidelines)
11. [Basic Troubleshooting](#basic-troubleshooting)

---

## System Overview

### What is Linear Laser v2.0?

Linear Laser v2.0 is a precision laser projection system that uses two galvanometer motors (galvos) with mirrors to control a laser beam and draw geometric shapes. The system can project straight lines and circles onto surfaces for various applications including construction alignment, leveling, and marking.

### Key Features

- **Straight Line Generation:** Projects straight laser lines with adjustable length and position
- **Circle Generation:** Projects circular laser patterns
- **Remote Control:** TCP-based network control for integration with computer systems
- **Firmware Updates:** Over-the-air (OTA) firmware update capability
- **Power Management:** Relay-controlled power sequencing for safe operation

### System Components

1. **Controller Board:** Main electronic control unit with ESP32 microcontroller
2. **Power Supply Board:** Provides regulated power to all system components
3. **Galvanometer Motors:** Two motors with mirrors for X and Y axis beam control
4. **Laser Module:** Laser diode/module that produces the visible beam
5. **Galvo Drivers:** Electronic drivers that control the galvo motors
6. **Enclosure:** Protective housing for electronics and optics

---

## Package Contents

Upon receiving your Linear Laser v2.0 system, verify that the following items are included:

- [ ] Controller PCB assembly
- [ ] Power Supply PCB assembly
- [ ] Two galvanometer motors with mirrors
- [ ] Laser module
- [ ] Galvo driver modules (2 units)
- [ ] Mounting hardware and brackets
- [ ] Power adapter/cable
- [ ] Interconnect cables
- [ ] User manual (this document)
- [ ] Technical documentation (if applicable)

**Note:** If any items are missing or damaged, contact your supplier immediately.

---

## Mechanical Assembly and Mirror Alignment

### Mounting the System

1. **Choose Installation Location:**
   - Select a stable, vibration-free mounting surface
   - Ensure adequate clearance for laser beam projection
   - Consider access for maintenance and adjustments

2. **Mount Controller and Power Supply:**
   - Secure PCBs in designated mounting locations
   - Ensure adequate ventilation and heat dissipation
   - Protect from moisture and dust

3. **Install Galvanometer Motors:**
   - Mount X-axis galvo motor securely
   - Mount Y-axis galvo motor perpendicular to X-axis
   - Ensure mirrors are properly attached to motor shafts
   - Check for smooth, unrestricted mirror movement

4. **Install Laser Module:**
   - Position laser module to align with galvo mirrors
   - Secure mounting to prevent vibration
   - Ensure laser beam path is clear

### Mirror Alignment Procedure

**WARNING:** Never look directly into the laser beam or its reflections. Always use appropriate laser safety eyewear.

1. **Initial Alignment:**
   - Power on the system (see Electrical Wiring section)
   - Enable laser output via control software
   - Observe laser spot position on target surface

2. **X-Axis Alignment:**
   - Adjust X-axis galvo mirror angle
   - Move laser spot horizontally to desired position
   - Secure mirror position

3. **Y-Axis Alignment:**
   - Adjust Y-axis galvo mirror angle
   - Move laser spot vertically to desired position
   - Secure mirror position

4. **Fine Adjustment:**
   - Test line drawing mode
   - Verify line is straight and properly oriented
   - Make final adjustments as needed

5. **Verification:**
   - Test circle drawing mode
   - Verify circle is round and centered
   - Document alignment settings for future reference

---

## Electrical Wiring and Power Connections

### Power Requirements

- **Input Voltage:** As specified by power supply design (typically 12V DC or AC adapter)
- **Power Consumption:** Varies with operating mode (check specifications)
- **Fuse Rating:** Use appropriate fuse as specified in technical documentation

### Connection Steps

**WARNING:** Always disconnect power before making or modifying electrical connections.

1. **Power Supply Connections:**
   - Connect input power to power supply board
   - Verify correct polarity
   - Check voltage levels before proceeding

2. **Controller Board Connections:**
   - Connect power supply outputs to controller board
   - Verify voltage levels (typically 3.3V, 5V, etc.)
   - Check all connections are secure

3. **Galvo Driver Connections:**
   - Connect galvo driver power from controller relays
   - Connect analog control signals from DAC outputs
   - Verify signal ground connections

4. **Laser Module Connection:**
   - Connect laser module power through relay
   - Verify polarity and voltage requirements
   - Check current rating compatibility

5. **Network Connection:**
   - Connect WiFi antenna (if external)
   - Ensure antenna is properly positioned
   - Check antenna connection is secure

### Power-On Sequence

1. **Initial Power-Up:**
   - Apply input power to power supply
   - Verify power supply LEDs (if present) indicate normal operation
   - Check controller board receives power

2. **System Initialization:**
   - ESP32 will boot and initialize
   - WiFi will attempt to connect (if configured)
   - System will be ready for commands after ~10-30 seconds

3. **Verification:**
   - Check status LEDs (if present)
   - Verify network connectivity (see Network Configuration)
   - Test basic functions

---

## Network Configuration

### WiFi Setup

The system connects to a WiFi network for remote control via TCP. Network configuration is typically set in the firmware.

**Current Configuration (as implemented):**
- **WiFi Mode:** Station (connects to existing network)
- **SSID:** Configured in firmware (contact technical support for changes)
- **Password:** Configured in firmware (contact technical support for changes)

### Finding the Device IP Address

1. **Via Serial Monitor:**
   - Connect USB cable to ESP32
   - Open serial monitor at 115200 baud
   - Device will print IP address on startup

2. **Via Network Scanner:**
   - Use network scanning tool
   - Look for device with hostname "esp32" (if mDNS enabled)
   - Or scan for device on port 8088

3. **Via Router Admin:**
   - Check router's connected devices list
   - Look for ESP32 or device MAC address

### TCP Connection Setup

**Server Information:**
- **Protocol:** TCP
- **Port:** 8088
- **IP Address:** Device's assigned IP address (obtained from methods above)

**Client Connection:**
- Use TCP client software or custom application
- Connect to device IP address on port 8088
- Send commands in specified format (see Operating Modes)

### Network Troubleshooting

- **Cannot Connect:** Verify WiFi credentials, signal strength, IP address
- **Connection Drops:** Check WiFi signal stability, interference
- **No Response:** Verify correct IP and port, check firewall settings

---

## Initial Setup and Calibration

### First-Time Setup

1. **Physical Installation:**
   - Complete mechanical assembly (see Mechanical Assembly section)
   - Complete electrical wiring (see Electrical Wiring section)
   - Verify all connections

2. **Power-On:**
   - Apply power following Power-On Sequence
   - Wait for system initialization
   - Verify no error indicators

3. **Network Connection:**
   - Verify WiFi connection (see Network Configuration)
   - Note device IP address
   - Test TCP connection

4. **Basic Function Test:**
   - Send "Device On" command (see Operating Modes)
   - Verify galvo motors activate
   - Verify laser activates
   - Test line drawing mode
   - Test circle drawing mode

### Calibration Procedure

**Note:** Calibration may require technical expertise. Contact support if unsure.

1. **Center Calibration:**
   - Send line command with center start point
   - Observe laser line position
   - Adjust if necessary (may require firmware parameter changes)

2. **Length Calibration:**
   - Test different line length indices
   - Measure actual line length on target surface
   - Document length vs. index relationship
   - Adjust lookup table values if needed (requires firmware modification)

3. **Circle Calibration:**
   - Test circle drawing mode
   - Verify circle is round (not elliptical)
   - Adjust radius parameters if needed (requires firmware modification)

4. **Position Calibration:**
   - Test start point variations
   - Verify line position accuracy
   - Document calibration settings

---

## Operating Modes

### Mode Overview

The system supports the following operating modes:

1. **Line Drawing Mode:** Projects a straight laser line
2. **Dash Line Mode:** Projects a dashed laser line
3. **Circle Drawing Mode:** Projects a circular laser pattern
4. **Standby Mode:** System powered but laser and galvos off

### Control Commands

All commands are sent via TCP connection to port 8088. Commands use ASCII text format.

#### Device Control Commands

**Turn Device On:**
```
Send: O#N*,
Response: Device On
```
This command activates:
- Galvo Controller 1 (X-axis)
- Galvo Controller 2 (Y-axis)
- Laser module

**Turn Device Off:**
```
Send: O#F*,
Response: Device Off
```
This command deactivates all components.

#### Line Configuration

**Set Line Parameters:**
```
Send: C#L,XXXX,YYYY*,
```
Where:
- **XXXX** = Length index (0000-0013)
- **YYYY** = Start point index (0000-0013)

**Example:**
```
Send: C#L,0010,0005*,
Response: C#L,10,5*,
         [calculated values]
```

**Length Index Reference:**
- 0 = No line (0 units)
- 1-13 = Increasing line lengths
- Higher index = longer line

**Start Point Index:**
- 0 = Leftmost/starting position
- 1-13 = Different starting positions
- Higher index = further from start

#### Dash Line Configuration

**Set Dash Line Parameters:**
```
Send: C#D,XXXX,YYYY*,
```
Format is identical to line command but produces dashed pattern.

#### Settings Configuration

**Set Height and Distance:**
```
Send: S#HXXXX,DYYYY*,
```
Where:
- **XXXX** = Height value (4 digits)
- **YYYY** = Distance value (4 digits)

**Note:** This command stores values but may not be actively used in current firmware version.

### Operating Procedure

1. **Establish Connection:**
   - Connect TCP client to device IP:8088
   - Verify connection established

2. **Power On System:**
   - Send: `O#N*,`
   - Wait for "Device On" response
   - Verify galvos and laser activate

3. **Configure Line:**
   - Send: `C#L,0010,0005*,` (adjust indices as needed)
   - System begins drawing line immediately

4. **Change Configuration:**
   - Send new configuration command
   - System updates in real-time

5. **Switch to Circle Mode:**
   - Circle mode may be firmware-controlled
   - Check firmware version for circle mode activation method

6. **Power Off:**
   - Send: `O#F*,`
   - Wait for "Device Off" response
   - Verify all components deactivate

### Command Response Codes

- **Success:** Echo of command or status message
- **Error:** "Bad Request" - Invalid command format
- **No Response:** Connection issue or device not responding

---

## Firmware Update Procedure

### Overview

The system supports Over-The-Air (OTA) firmware updates via HTTP. This allows updating firmware without physical access to the device.

### Prerequisites

- Device connected to WiFi network
- Device IP address known
- New firmware `.bin` file available
- Web browser or OTA update tool

### Update Steps

#### Method 1: Web Browser (if web interface available)

1. **Access Update Page:**
   - Open web browser
   - Navigate to: `http://[device-ip-address]`
   - Look for firmware update section

2. **Upload Firmware:**
   - Click "Choose File" or similar button
   - Select firmware `.bin` file
   - Click "Update" or "Upload"
   - Wait for upload progress

3. **Completion:**
   - Wait for "Update Success" message
   - Device will reboot automatically
   - Verify new firmware version

#### Method 2: OTA Update Tool

1. **Use OTA Update Tool:**
   - Use ESP32 OTA update utility
   - Enter device IP address
   - Select firmware `.bin` file
   - Start update process

2. **Monitor Progress:**
   - Watch upload progress bar
   - Do not interrupt process
   - Wait for completion

3. **Verification:**
   - Device reboots automatically
   - Test system functions
   - Verify firmware version

### Important Notes

- **Do Not Interrupt:** Never power off or disconnect during update
- **Stable Connection:** Ensure stable WiFi connection during update
- **Backup:** Note current settings before update (if applicable)
- **Rollback:** Contact support if update fails and device becomes unresponsive

### Recovery from Failed Update

If update fails and device becomes unresponsive:

1. **Serial Recovery:**
   - Connect USB cable to ESP32
   - Enter download mode (hold BOOT button during reset)
   - Flash firmware via serial/USB

2. **Contact Support:**
   - Provide error details
   - Request recovery firmware
   - Follow support instructions

---

## Laser Safety Warnings and Precautions

### ⚠️ CRITICAL SAFETY WARNINGS

**LASER RADIATION HAZARD:**
- **NEVER** look directly into the laser beam
- **NEVER** point laser at people, animals, or vehicles
- **ALWAYS** use appropriate laser safety eyewear when working with the system
- **ALWAYS** ensure laser is properly enclosed and beam path is controlled

### Laser Classification

This system may use Class 3R or Class 4 laser modules depending on power output. Check laser module label for classification.

**Class 3R:** Can cause eye injury if viewed directly. Use with caution.
**Class 4:** Can cause serious eye and skin injury. Requires strict safety measures.

### Safety Precautions

1. **Personal Protection:**
   - Wear appropriate laser safety eyewear
   - Ensure eyewear matches laser wavelength
   - Check eyewear for damage before use

2. **Installation Safety:**
   - Install in controlled access area
   - Use warning signs and labels
   - Ensure beam path is clearly marked
   - Prevent unauthorized access

3. **Operational Safety:**
   - Never operate without proper safety measures
   - Keep laser off when not in use
   - Use interlock systems if available
   - Follow local laser safety regulations

4. **Maintenance Safety:**
   - Power off laser before maintenance
   - Disconnect power before opening enclosure
   - Use appropriate tools and procedures
   - Follow lockout/tagout procedures

### Emergency Procedures

**If laser exposure occurs:**
1. Immediately look away from beam
2. Do not rub eyes
3. Seek medical attention if eye exposure suspected
4. Report incident to supervisor

**If fire or smoke occurs:**
1. Power off system immediately
2. Disconnect power source
3. Use appropriate fire extinguisher
4. Evacuate area if necessary
5. Contact emergency services

### Regulatory Compliance

- Ensure compliance with local laser safety regulations
- Obtain necessary permits/licenses if required
- Follow workplace safety procedures
- Maintain safety documentation

---

## Maintenance Guidelines

### Regular Maintenance Schedule

**Daily:**
- Visual inspection of system
- Check for loose connections
- Verify proper operation
- Clean external surfaces (if needed)

**Weekly:**
- Inspect galvo mirrors for cleanliness
- Check laser output quality
- Verify network connectivity
- Test all operating modes

**Monthly:**
- Thorough cleaning of optical components
- Check all electrical connections
- Verify power supply operation
- Inspect mounting hardware

**Quarterly:**
- Professional inspection (if available)
- Calibration verification
- Firmware update check
- Complete system test

### Cleaning Procedures

**WARNING:** Always power off and disconnect power before cleaning.

1. **External Surfaces:**
   - Use soft, lint-free cloth
   - Dampen with appropriate cleaner
   - Avoid harsh chemicals
   - Dry thoroughly

2. **Optical Components (Mirrors):**
   - Use optical cleaning supplies
   - Follow manufacturer recommendations
   - Avoid scratching surfaces
   - Handle with care

3. **Electronic Components:**
   - Use compressed air for dust removal
   - Avoid liquid cleaners on PCBs
   - Check for corrosion or damage
   - Verify connections after cleaning

### Component Replacement

**When to Replace:**
- Laser output significantly degraded
- Galvo motors not responding properly
- Power supply failure
- Physical damage to components

**Replacement Procedure:**
1. Power off and disconnect power
2. Document current configuration
3. Remove old component
4. Install replacement component
5. Verify connections
6. Power on and test
7. Recalibrate if necessary

### Storage

**If system will be unused for extended period:**
1. Power off completely
2. Disconnect power source
3. Clean and protect components
4. Store in dry, temperature-controlled environment
5. Protect from dust and moisture
6. Document storage conditions

---

## Basic Troubleshooting

### Problem: System Will Not Power On

**Possible Causes:**
- No input power
- Blown fuse
- Power supply failure
- Wiring issue

**Solutions:**
1. Check input power connection
2. Verify power supply LED (if present)
3. Check fuse (replace if blown)
4. Verify all wiring connections
5. Test power supply output voltages
6. Contact support if problem persists

### Problem: WiFi Connection Fails

**Possible Causes:**
- Incorrect SSID/password
- Weak WiFi signal
- Network configuration issue
- Firmware problem

**Solutions:**
1. Verify WiFi credentials in firmware
2. Check signal strength at device location
3. Verify router/access point is operational
4. Check device is in range
5. Try resetting WiFi connection
6. Check firmware version
7. Contact support if needed

### Problem: TCP Connection Cannot Be Established

**Possible Causes:**
- Incorrect IP address
- Firewall blocking connection
- Device not on network
- Port conflict

**Solutions:**
1. Verify device IP address (check serial output)
2. Ping device IP address
3. Check firewall settings
4. Verify correct port (8088)
5. Test with different client software
6. Check network connectivity

### Problem: Laser Does Not Turn On

**Possible Causes:**
- Relay not activated
- Laser module failure
- Power issue
- Command not received

**Solutions:**
1. Verify "Device On" command was sent and acknowledged
2. Check relay operation (may require technical expertise)
3. Verify laser module power connection
4. Check laser module specifications
5. Test with known good laser module (if available)
6. Contact support

### Problem: Galvos Not Moving / Line Not Drawing

**Possible Causes:**
- Galvo drivers not powered
- DAC signal issue
- Galvo motor failure
- Configuration problem

**Solutions:**
1. Verify galvo drivers are powered (check relays)
2. Verify "Device On" command activated galvos
3. Check DAC output signals (requires oscilloscope)
4. Test galvo motors independently
5. Verify line configuration command format
6. Check firmware is running correctly
7. Contact support

### Problem: Line is Not Straight / Circle is Not Round

**Possible Causes:**
- Mirror misalignment
- Calibration issue
- Mechanical problem
- Galvo driver issue

**Solutions:**
1. Re-align mirrors (see Mirror Alignment section)
2. Check mechanical mounting
3. Verify galvo motors move smoothly
4. Check calibration settings
5. Test with different configurations
6. Contact support for recalibration

### Problem: Firmware Update Fails

**Possible Causes:**
- Unstable network connection
- Incorrect firmware file
- Insufficient memory
- Update process interrupted

**Solutions:**
1. Ensure stable WiFi connection
2. Verify firmware file is correct for this device
3. Check available flash memory
4. Do not interrupt update process
5. Try update again
6. Use serial recovery method if needed
7. Contact support

### Problem: Device Becomes Unresponsive

**Possible Causes:**
- Firmware crash
- Power issue
- Hardware failure
- Network problem

**Solutions:**
1. Power cycle the device
2. Check power supply
3. Check serial output for error messages
4. Try reset button (if available)
5. Attempt serial recovery
6. Contact support

### Getting Additional Help

If problems persist after trying these solutions:

1. **Document the Issue:**
   - Note exact symptoms
   - Record error messages
   - Note when problem occurs
   - Document any changes made

2. **Contact Support:**
   - Provide device information
   - Describe problem in detail
   - Include troubleshooting steps already tried
   - Provide serial output logs if available

3. **Support Information:**
   - Email: Info@sednasmartsolution.com
   - Include device model and serial number
   - Attach photos if helpful

---

## Appendix

### Command Quick Reference

| Command | Format | Description |
|---------|--------|-------------|
| Device On | `O#N*,` | Activates galvos and laser |
| Device Off | `O#F*,` | Deactivates all components |
| Line Config | `C#L,XXXX,YYYY*,` | Sets line length and start point |
| Dash Line | `C#D,XXXX,YYYY*,` | Sets dash line parameters |
| Settings | `S#HXXXX,DYYYY*,` | Sets height and distance |

### Length Index Reference

| Index | Relative Length |
|-------|----------------|
| 0 | No line |
| 1-5 | Short lines |
| 6-10 | Medium lines |
| 11-13 | Long lines |

### Safety Checklist

Before operating system:
- [ ] Laser safety eyewear available and checked
- [ ] Warning signs posted
- [ ] Beam path clear and controlled
- [ ] All connections secure
- [ ] Power supply verified
- [ ] Network connection established
- [ ] Emergency procedures understood

---

**End of User Manual**

