# Linear Laser v1.0 - User Manual

## Document Information
- **Project**: Linear Laser v1.0
- **Version**: 1.0
- **Target Audience**: Installers, Technicians, and Operators
- **Date**: 2025

---

## Table of Contents
1. [System Overview](#system-overview)
2. [Package Contents](#package-contents)
3. [Mechanical Assembly and Mirror Alignment](#mechanical-assembly-and-mirror-alignment)
4. [Electrical Wiring and Power Connections](#electrical-wiring-and-power-connections)
5. [Initial Setup and Calibration](#initial-setup-and-calibration)
6. [Operating the System](#operating-the-system)
7. [Laser Safety Warnings and Precautions](#laser-safety-warnings-and-precautions)
8. [Maintenance Guidelines](#maintenance-guidelines)
9. [Basic Troubleshooting](#basic-troubleshooting)

---

## System Overview

### What is Linear Laser v1.0?

Linear Laser v1.0 is a laser projection system that uses two precision mirrors (galvanometer motors) to control a laser beam and draw geometric shapes. The system can generate:

- **Straight lines**: Horizontal lines with adjustable position
- **Circles**: Continuous circular patterns
- **Dashed lines**: Lines with periodic gaps (optional mode)

### How It Works

The system consists of:
1. **Controller Board**: Contains the ESP32 microcontroller and control circuits
2. **Two Galvanometer Motors**: Move mirrors to steer the laser beam in X and Y directions
3. **Laser Module**: Provides the light source
4. **Power Supplies**: Provide power to all components

The controller calculates the desired shape and sends control signals to the galvo motors, which move the mirrors to direct the laser beam and draw the pattern.

---

## Package Contents

When you receive your Linear Laser v1.0 system, you should have:

### Main Components:
- [ ] Controller PCB (main control board)
- [ ] Power Supply PCB (if separate)
- [ ] Two galvanometer motor assemblies with mirrors
- [ ] Laser module/diode
- [ ] Mounting hardware (screws, standoffs)
- [ ] Power supply units (for controller, galvos, and laser)

### Cables and Connectors:
- [ ] Power cables for controller
- [ ] Power cables for galvo motors
- [ ] Power cable for laser module
- [ ] Signal cables (if required)
- [ ] USB cable (for programming/communication)

### Documentation:
- [ ] This User Manual
- [ ] Technical Documentation (for reference)
- [ ] Safety information sheet

**Note**: If any items are missing, contact your supplier immediately.

---

## Mechanical Assembly and Mirror Alignment

### Assembly Steps

#### Step 1: Mount the Controller Board
1. Identify the mounting holes on the controller PCB
2. Use appropriate standoffs to mount the board securely
3. Ensure the board is level and stable
4. Leave adequate space for cooling and cable routing

#### Step 2: Install Galvanometer Motors
1. Mount the X-axis galvo motor first
   - Position it so the mirror can rotate horizontally
   - Secure with provided mounting hardware
   - Ensure the motor can move freely without obstruction

2. Mount the Y-axis galvo motor
   - Position it so the mirror can rotate vertically
   - Place it after the X-axis galvo in the beam path
   - Secure with mounting hardware

**Important**: The laser beam path should be: Laser → X-axis mirror → Y-axis mirror → Projection surface

#### Step 3: Install Laser Module
1. Mount the laser module securely
2. Position it so the beam hits the X-axis mirror first
3. Ensure the laser is properly aligned before tightening

#### Step 4: Mirror Alignment

**Initial Alignment**:
1. **Power OFF** the system
2. Manually adjust the X-axis mirror so it reflects toward the Y-axis mirror
3. Manually adjust the Y-axis mirror so it reflects toward your projection surface
4. Use a low-power laser pointer or visible alignment laser if available

**Fine Alignment** (with system powered):
1. Power ON the controller and galvo motors
2. Connect to the web interface (see Operating section)
3. Set both X and Y sliders to center position (50%)
4. The laser beam should be centered on your projection surface
5. If not centered:
   - Adjust the X-axis mirror mount to center horizontally
   - Adjust the Y-axis mirror mount to center vertically
6. Repeat until beam is centered

**Alignment Tips**:
- Work in a dimly lit room to see the laser beam
- Use a target or screen at your desired projection distance
- Make small adjustments and re-check
- Secure all adjustments once aligned

---

## Electrical Wiring and Power Connections

### ⚠️ Safety Warning
**Always disconnect power before making any electrical connections. Double-check all connections before applying power.**

### Power Supply Requirements

You will need separate power supplies for:
1. **Controller Board**: 5V DC, ~500 mA minimum
2. **X-axis Galvo**: ±15V DC (positive and negative rails)
3. **Y-axis Galvo**: ±15V DC (positive and negative rails)
4. **Laser Module**: As specified by your laser module (typically 5V or 12V)

### Connection Steps

#### Step 1: Controller Power
1. Locate the power input connector on the controller board
2. Connect the 5V power supply:
   - **Positive (+)** to VCC or +5V terminal
   - **Negative (-)** to GND terminal
3. Verify polarity is correct (reversed polarity can damage the board)

#### Step 2: Galvo Motor Power
1. **X-axis Galvo**:
   - Connect +15V to positive power input
   - Connect -15V to negative power input
   - Connect GND to ground/common
   - Connect control signal from controller board

2. **Y-axis Galvo**:
   - Connect +15V to positive power input
   - Connect -15V to negative power input
   - Connect GND to ground/common
   - Connect control signal from controller board

**Note**: Ensure all grounds are connected together (common ground).

#### Step 3: Laser Module Power
1. Connect the laser power supply to the relay output on the controller
2. Follow your laser module's specifications for voltage and current
3. Ensure proper polarity

#### Step 4: Signal Connections
1. **DAC Outputs**: 
   - X-axis signal: From controller DAC Channel A to X-axis galvo driver
   - Y-axis signal: From controller DAC Channel B to Y-axis galvo driver

2. **Relay Connections**:
   - Laser relay: Connected to laser power supply
   - Galvo relays: Connected to galvo power supplies
   - Main relay: Main system power control

#### Step 5: Ground Connections
- Connect all ground points together
- Ensure good electrical contact
- Use appropriate wire gauge for power connections

### Connection Verification

Before powering on:
- [ ] All power supplies are set to correct voltages
- [ ] All polarities are correct
- [ ] All ground connections are made
- [ ] Signal cables are properly connected
- [ ] No loose wires or short circuits
- [ ] Fuses are installed (if required)

---

## Initial Setup and Calibration

### First-Time Setup

#### Step 1: Power-On Sequence
1. **Power ON** the controller board first
2. Wait 5-10 seconds for initialization
3. **Power ON** the galvo motors (via relays or manual switches)
4. **Power ON** the laser module last (for safety)

#### Step 2: Connect to Web Interface
1. On your smartphone, tablet, or computer, open WiFi settings
2. Look for WiFi network named **"Laser"**
3. Connect to it (password: **"123456789"** or **"987654321"** depending on firmware version)
4. Open a web browser
5. Navigate to: **http://192.168.4.1**
6. You should see the control dashboard

#### Step 3: Initial System Check
1. **Check System Status**: Dashboard should show "System Up"
2. **Test Relays**: 
   - Click "Galvo" button - galvo motors should power on
   - Click "Laser" button - laser should turn on (use safety glasses!)
   - Click "Main" button - main system should activate
3. **Test Sliders**: Move X and Y sliders - galvo motors should respond

#### Step 4: Basic Calibration

**Center Calibration**:
1. Set X slider to 50% (center)
2. Set Y slider to 50% (center)
3. Observe laser beam position on projection surface
4. If not centered, adjust mirror mounts (see Mirror Alignment section)

**Range Calibration**:
1. Move X slider from 0% to 100%
2. Observe horizontal beam movement range
3. Move Y slider from 0% to 100%
4. Observe vertical beam movement range
5. Adjust if needed (may require firmware modification for advanced users)

---

## Operating the System

### Web Dashboard Interface

The system is controlled through a web-based dashboard accessible via WiFi.

#### Accessing the Dashboard:
1. Connect to WiFi network "Laser"
2. Open browser to http://192.168.4.1
3. Dashboard will load automatically

#### Dashboard Controls:

**Power Control Buttons**:
- **Laser**: Turn laser ON/OFF
- **Galvo**: Turn galvo motors ON/OFF
- **Main**: Turn main system ON/OFF
- **PC**: Control PC power (if connected)

**Shape Mode Buttons** (V2 firmware):
- **Dash Line**: Enable dashed line mode
- **Circle**: Enable circle drawing mode

**Position Sliders**:
- **X Slider**: Control X-axis position (0-100%)
- **Y Slider**: Control Y-axis position (0-100%)

**Status Indicators**:
- **System Up**: System is running
- **PC Off**: PC status (if applicable)

### Operating Modes

#### Mode 1: Line Drawing
1. Ensure "Galvo" and "Laser" are ON
2. Set desired Y position using Y slider
3. System will automatically draw a horizontal line
4. Adjust X slider to control line length/position
5. Adjust Y slider to move line up/down

#### Mode 2: Circle Drawing (V2 firmware)
1. Ensure "Galvo" and "Laser" are ON
2. Click "Circle" button to enable circle mode
3. System will automatically draw continuous circles
4. Circles will repeat automatically
5. Click "Circle" again to return to line mode

#### Mode 3: Dashed Line (V2 firmware)
1. Ensure "Galvo" and "Laser" are ON
2. Click "Dash Line" button
3. System will draw lines with periodic gaps
4. Click again to return to solid line mode

### Operating Tips

- **Start with low power**: Begin with laser at low intensity if adjustable
- **Use appropriate distance**: Position projection surface at desired distance
- **Monitor temperature**: Ensure adequate cooling during extended operation
- **Check alignment**: Periodically verify beam alignment
- **Save settings**: Note slider positions for repeatable patterns

---

## Laser Safety Warnings and Precautions

### ⚠️ CRITICAL SAFETY INFORMATION

**LASER RADIATION CAN CAUSE PERMANENT EYE DAMAGE. ALWAYS FOLLOW LASER SAFETY PROCEDURES.**

### General Laser Safety Rules

1. **NEVER look directly into the laser beam**
2. **NEVER point the laser at people, animals, or vehicles**
3. **ALWAYS use appropriate laser safety glasses** when the laser is ON
4. **ALWAYS ensure the laser beam is terminated** on a non-reflective surface
5. **NEVER operate the laser without proper beam enclosure** or in uncontrolled areas
6. **ALWAYS post warning signs** in areas where laser is in use

### Laser Classification

Your laser module will have a safety classification (typically Class 3R or Class 4):
- **Class 3R**: Moderate risk, requires caution
- **Class 4**: High risk, requires strict safety measures

**Know your laser's classification and follow appropriate safety measures.**

### Safety Equipment

**Required**:
- Laser safety glasses (appropriate for your laser wavelength)
- Beam stop or termination surface
- Warning signs and labels
- Emergency stop capability

**Recommended**:
- Laser safety curtains or barriers
- Interlock systems
- Beam enclosure
- Safety training for all operators

### Operating Procedures

**Before Operation**:
1. Verify all safety equipment is in place
2. Ensure beam path is clear of people
3. Check that beam termination is secure
4. Put on laser safety glasses
5. Verify emergency stop is accessible

**During Operation**:
1. Never leave laser unattended while ON
2. Monitor for any unusual behavior
3. Keep bystanders away from beam path
4. Be ready to shut down immediately if needed

**After Operation**:
1. Turn OFF laser first
2. Turn OFF galvo motors
3. Turn OFF controller
4. Secure the area

### Emergency Procedures

**If someone is exposed to laser beam**:
1. **IMMEDIATELY** turn OFF the laser
2. Seek medical attention immediately
3. Do not rub eyes
4. Keep affected person calm

**If equipment malfunctions**:
1. Turn OFF all power immediately
2. Do not attempt to repair while powered
3. Contact qualified technician
4. Document the issue

### Legal and Regulatory Compliance

- Ensure compliance with local laser safety regulations
- Obtain necessary permits or licenses if required
- Follow workplace safety guidelines
- Maintain safety documentation

---

## Maintenance Guidelines

### Regular Maintenance Schedule

#### Daily (Before Each Use):
- [ ] Visual inspection of all components
- [ ] Check for loose connections
- [ ] Verify laser beam alignment
- [ ] Test emergency stop function
- [ ] Check for unusual sounds or vibrations

#### Weekly:
- [ ] Clean mirrors (if accessible) with appropriate cleaning materials
- [ ] Check power supply voltages
- [ ] Inspect cables for damage
- [ ] Verify web interface connectivity
- [ ] Test all control functions

#### Monthly:
- [ ] Thorough cleaning of all components
- [ ] Check mounting hardware tightness
- [ ] Inspect PCB for damage or corrosion
- [ ] Verify calibration accuracy
- [ ] Review system logs (if available)

#### Quarterly:
- [ ] Professional inspection (if available)
- [ ] Update firmware (if new versions available)
- [ ] Replace consumables (if any)
- [ ] Document maintenance performed

### Cleaning Procedures

**Mirrors**:
1. Power OFF the system
2. Use compressed air to remove dust
3. Use lens cleaning solution and lint-free cloth
4. Clean gently in circular motions
5. Avoid touching mirror surface with fingers

**Controller Board**:
1. Power OFF and disconnect
2. Use compressed air to remove dust
3. Do not use liquid cleaners directly on board
4. Check for corrosion or damage

**Laser Module**:
- Follow manufacturer's cleaning instructions
- Typically: compressed air only
- Do not disassemble laser module

### Component Replacement

**When to Replace**:
- Components showing physical damage
- Components not functioning properly
- Components exceeding service life
- After electrical faults or damage

**Replacement Procedure**:
1. Power OFF and disconnect all power
2. Document current configuration
3. Remove damaged component
4. Install replacement component
5. Verify connections
6. Test functionality
7. Re-calibrate if needed

### Storage

**When Not in Use**:
- Store in clean, dry environment
- Cover to prevent dust accumulation
- Disconnect power supplies
- Store laser safety equipment properly
- Keep documentation accessible

---

## Basic Troubleshooting

### Problem: System Won't Power On

**Possible Causes**:
- Power supply not connected
- Incorrect voltage
- Blown fuse
- Faulty power supply

**Solutions**:
1. Check all power connections
2. Verify power supply voltage with multimeter
3. Check fuses (if installed)
4. Try different power supply
5. Check for short circuits

### Problem: WiFi Network Not Appearing

**Possible Causes**:
- Controller not powered
- Firmware not loaded
- WiFi antenna issue
- Controller malfunction

**Solutions**:
1. Verify controller is powered (check LEDs if present)
2. Check serial output (115200 baud) for error messages
3. Try resetting controller
4. Re-flash firmware if needed
5. Check antenna connection (if external)

### Problem: Can't Connect to Web Dashboard

**Possible Causes**:
- Wrong WiFi network
- Wrong password
- IP address changed
- Browser issue

**Solutions**:
1. Verify you're connected to "Laser" network
2. Try password: "123456789" or "987654321"
3. Try IP: 192.168.4.1
4. Try different browser or device
5. Clear browser cache

### Problem: Laser Won't Turn On

**Possible Causes**:
- Laser relay not activated
- Laser power supply issue
- Laser module fault
- Wiring problem

**Solutions**:
1. Check "Laser" button status on dashboard
2. Verify relay is clicking when activated
3. Check laser power supply voltage
4. Verify laser module connections
5. Test laser module separately (if possible)

### Problem: Galvo Motors Not Moving

**Possible Causes**:
- Galvo power not connected
- Control signals not reaching galvos
- Galvo drivers not powered
- Faulty galvo motors

**Solutions**:
1. Check "Galvo" button is ON
2. Verify ±15V power to galvo drivers
3. Check control signal connections
4. Test with multimeter/oscilloscope
5. Verify galvo drivers are functioning

### Problem: Shapes Not Appearing Correctly

**Possible Causes**:
- Mirrors not aligned
- Incorrect calibration
- DAC output issue
- Galvo response problem

**Solutions**:
1. Re-align mirrors (see Mirror Alignment section)
2. Re-calibrate center position
3. Check DAC output signals
4. Verify galvo motor response
5. Check for mechanical binding

### Problem: System Crashes or Resets

**Possible Causes**:
- Power supply instability
- Overheating
- Firmware bug
- Electrical interference

**Solutions**:
1. Check power supply stability
2. Ensure adequate cooling
3. Check for loose connections
4. Update firmware if available
5. Check for electrical interference sources

### Problem: Poor Circle Quality

**Possible Causes**:
- Not enough points in circle
- Update rate too slow
- Galvo response too slow
- Mechanical issues

**Solutions**:
1. Verify firmware is using circle mode
2. Check galvo driver settings
3. Ensure adequate power to galvos
4. Check for mechanical binding
5. May require firmware adjustment (advanced)

### Getting Additional Help

If problems persist:
1. Document the issue (symptoms, when it occurs)
2. Check serial output for error messages
3. Review Technical Documentation
4. Contact technical support with:
   - System version
   - Firmware version
   - Detailed problem description
   - Steps already taken

---

## Quick Reference

### Default Settings:
- **WiFi SSID**: Laser
- **WiFi Password**: 123456789 (V1) or 987654321 (V2)
- **IP Address**: 192.168.4.1
- **Serial Baud Rate**: 115200

### Power-On Sequence:
1. Controller
2. Galvo motors
3. Laser (last)

### Power-Off Sequence:
1. Laser (first)
2. Galvo motors
3. Controller

### Emergency Shutdown:
- Turn OFF laser immediately
- Disconnect power if necessary
- Follow emergency procedures

---

**End of User Manual**

