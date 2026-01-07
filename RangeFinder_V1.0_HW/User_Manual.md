# Range Finder v1.0 - User Manual

## Document Information
**Version:** 1.0  
**Target Audience:** Installers, Technicians, Operators  
**Last Updated:** Based on repository analysis

---

## Table of Contents
1. [System Overview](#system-overview)
2. [Package Contents](#package-contents)
3. [Hardware Assembly and Mounting](#hardware-assembly-and-mounting)
4. [Electrical Wiring and Power Connections](#electrical-wiring-and-power-connections)
5. [Initial Setup and Calibration](#initial-setup-and-calibration)
6. [Normal Operation](#normal-operation)
7. [Safety Notes](#safety-notes)
8. [Maintenance Guidelines](#maintenance-guidelines)
9. [Basic Troubleshooting](#basic-troubleshooting)

---

## System Overview

The Range Finder v1.0 is a laser-based distance measurement system that accurately measures the distance to objects using advanced phase-detection technology. The system continuously measures distance and outputs the results via a serial communication interface.

**Key Features:**
- High-speed distance measurements (approximately 60 measurements per second)
- High accuracy (1-10 mm depending on conditions)
- Continuous measurement output
- Simple serial interface for integration
- Compact design

**Typical Applications:**
- Industrial automation
- Robotics and navigation
- Construction and surveying
- Research and development
- Quality control systems

---

## Package Contents

When you receive the Range Finder v1.0 system, verify that you have:

1. **Main Module** - The range finder module containing:
   - Laser emitter
   - Light sensor (APD)
   - Control electronics
   - Communication interface

2. **Cables and Connectors** (if included):
   - Power supply cable
   - Communication cable (UART/Serial)
   - Mounting hardware

3. **Documentation**:
   - This User Manual
   - Technical Documentation (for engineers)
   - Safety information

**Note:** Specific contents may vary depending on your purchase configuration. Contact your supplier if any items are missing.

---

## Hardware Assembly and Mounting

### Physical Installation

#### Mounting Location Selection

Choose a mounting location that:
- Provides a clear line of sight to measurement targets
- Minimizes vibration and movement
- Allows access for maintenance
- Protects the sensor from direct sunlight and weather (if outdoor use)
- Keeps the APD sensor board shielded from external light

#### Mounting Procedure

1. **Prepare Mounting Surface**:
   - Ensure surface is flat and stable
   - Use appropriate mounting hardware for your application
   - Consider vibration isolation if needed

2. **Position Module**:
   - Orient the laser emitter toward the measurement area
   - Ensure the APD (light sensor) has a clear view of reflected light
   - Avoid mounting where external light can directly enter the APD

3. **Secure Module**:
   - Use appropriate screws or mounting brackets
   - Do not overtighten mounting hardware
   - Ensure module is firmly attached to prevent movement

4. **Shield APD Sensor**:
   - **Important**: The small APD sensor board must be shielded from external light
   - Use provided shielding or create a light-tight enclosure
   - External light will interfere with measurements

#### Alignment Considerations

- **Laser Beam**: The laser beam should be aligned perpendicular to typical target surfaces for best results
- **Sensor View**: Ensure the APD sensor can receive reflected light from targets
- **Distance Range**: Consider the expected measurement range when positioning the module

---

## Electrical Wiring and Power Connections

### Power Supply Requirements

**Power Specifications:**
- Voltage: Check module-specific requirements (typically 3.3V or 5V DC)
- Current: Sufficient current capacity for module operation
- Regulation: Stable, regulated power supply recommended

**Important Safety Notes:**
- Always use the correct voltage for your module variant
- Ensure power supply polarity is correct
- Use appropriate fusing or protection circuits
- Do not exceed specified voltage limits

### Power Connection Steps

1. **Verify Power Supply**:
   - Check voltage output with multimeter
   - Ensure power supply is OFF before connecting

2. **Connect Power Cables**:
   - Connect positive (+) wire to positive terminal
   - Connect negative (-) or ground wire to ground terminal
   - Double-check polarity before applying power

3. **Apply Power**:
   - Turn on power supply
   - Verify module powers up (check for LED indicators if present)
   - Monitor for any unusual behavior

### Communication Interface Wiring

#### UART/Serial Connection

**Connection Parameters:**
- **Baud Rate**: 256,000 baud
- **Data Format**: 8 data bits, no parity, 1 stop bit (8N1)
- **Voltage Levels**: 3.3V logic levels (TTL)

**Pin Connections:**
- **TX (Transmit)**: Module output pin - connect to your system's RX
- **RX (Receive)**: Module input pin - connect to your system's TX
- **GND (Ground)**: Common ground - must be connected

**Wiring Steps:**
1. Identify TX, RX, and GND pins on the module
2. Connect module TX to your system RX
3. Connect module RX to your system TX
4. Connect common ground between module and your system
5. Use appropriate cable length (keep under 1-2 meters for best results)

**Note:** Some modules may require level shifting if connecting to 5V systems. Consult Technical Documentation for details.

### Connection Verification

After wiring:
1. Verify all connections are secure
2. Check for short circuits with multimeter
3. Verify power supply voltage is correct
4. Test communication (see Initial Setup section)

---

## Initial Setup and Calibration

### First-Time Setup

#### Pre-Calibration Checklist

Before performing calibration, ensure:
- [ ] Module is properly mounted and secured
- [ ] Power supply is connected and stable
- [ ] Communication interface is connected and working
- [ ] APD sensor is shielded from external light
- [ ] A white, reflective target is available (paper or white surface)
- [ ] Target can be placed 10-50 cm from the laser

#### Communication Test

1. **Connect to Module**:
   - Open serial terminal program (e.g., PuTTY, Tera Term, Arduino Serial Monitor)
   - Configure: 256,000 baud, 8N1
   - Connect to appropriate COM port

2. **Verify Communication**:
   - Module should output "Start\r\n" on power-up
   - If no output, check:
     - Baud rate is correct (256,000)
     - TX/RX connections are correct
     - Module is powered on
     - Cable is not damaged

### Zero Distance Calibration

**Why Calibration is Required:**
Calibration establishes a reference point for accurate distance measurements. It must be performed:
- On first use
- After firmware updates
- If measurements become inaccurate
- After extended periods of non-use

#### Calibration Procedure

1. **Prepare Target**:
   - Use a white, matte surface (white paper or cardboard works well)
   - Place target 10-50 cm (4-20 inches) from the laser emitter
   - Ensure target is perpendicular to the laser beam
   - Ensure target is in a stable position

2. **Shield from External Light**:
   - Cover or shield the APD sensor area from room lighting
   - This is critical for accurate calibration
   - Use a dark cloth or enclosure if needed

3. **Initiate Calibration**:
   - Send the character 'C' via serial interface
   - You can type 'C' in your serial terminal and press Enter
   - Module will respond with "Calib Start [module type]\r\n"

4. **Wait for Completion**:
   - Calibration takes approximately 10-30 seconds
   - Module will output progress messages:
     - "Zero Phase 1: [value]\r\n"
     - "Zero Phase 2: [value]\r\n"
     - "Zero Phase 3: [value]\r\n"
   - Final message: "Calib Done\r\n"

5. **Verify Success**:
   - If calibration fails, you may see: "Calib FAIL: Low Signal\r\n"
   - If this occurs:
     - Move target closer (but >10 cm)
     - Ensure target is white and reflective
     - Check that APD is properly shielded
     - Verify laser is enabled
     - Try again

6. **Test Measurement**:
   - After successful calibration, distance measurements should begin automatically
   - Verify readings are reasonable for your target distance

#### Calibration Tips

- **Best Results**: Use a white, matte surface (not glossy or mirror-like)
- **Distance**: 20-30 cm (8-12 inches) is often optimal
- **Lighting**: Perform calibration in normal room lighting, but shield APD
- **Stability**: Keep target and module stable during calibration
- **Patience**: Allow calibration to complete fully before testing

---

## Normal Operation

### Starting the System

#### Power-Up Sequence

1. **Apply Power**:
   - Turn on power supply
   - Module initializes (takes 1-2 seconds)
   - UART outputs "Start\r\n" message

2. **Enable Measurement**:
   - Send character 'E' via serial interface
   - Laser enables and measurements begin
   - Distance data starts appearing in serial output

#### Reading Distance Values

**Data Format:**
The module continuously outputs distance measurements in this format:
```
DIST;01574;AMP;0993;TEMP;1343;VOLT;082\r\n
```

**Understanding the Data:**
- **DIST;01574**: Distance = 1574 millimeters = 1.574 meters
- **AMP;0993**: Signal amplitude (higher is generally better, indicates good signal)
- **TEMP;1343**: Temperature reading (raw ADC value, for monitoring)
- **VOLT;082**: APD bias voltage = 82 volts (automatically adjusted)

**Example Readings:**
- `DIST;00500` = 500 mm = 0.5 meters = 50 cm
- `DIST;02000` = 2000 mm = 2.0 meters
- `DIST;10000` = 10000 mm = 10.0 meters

**Data Rate:**
- Approximately 60 measurements per second
- Each measurement is a complete line ending with `\r\n`

### Operating Modes

#### Continuous Measurement Mode

**Default Operation:**
- After sending 'E' command, module continuously measures distance
- Data output at ~60 Hz
- Laser remains on
- APD voltage automatically adjusts for optimal signal

**Use Case**: Normal operation for most applications

#### Disable Measurement

**To Stop Measurements:**
- Send character 'D' via serial interface
- Laser turns off
- Measurements stop
- No data output

**Use Case**: 
- Power saving
- When measurements not needed
- Safety (turning off laser)

### Target Requirements

#### Best Results

For accurate measurements, targets should be:
- **Reflective**: White or light-colored surfaces work best
- **Matte Surface**: Avoid mirrors or highly reflective surfaces
- **Perpendicular**: Surface should be roughly perpendicular to laser beam
- **Stable**: Moving targets may reduce accuracy
- **Appropriate Distance**: Within module's measurement range

#### Surface Types

**Good Targets:**
- White paper or cardboard
- Light-colored walls
- White painted surfaces
- Light-colored objects

**Challenging Targets:**
- Dark or black surfaces (low reflectivity)
- Mirrors (may cause multiple reflections)
- Transparent materials (glass, water)
- Very rough surfaces
- Moving targets

### Measurement Accuracy

**Typical Accuracy:**
- **Short Range** (< 5 meters): 1-3 mm accuracy
- **Medium Range** (5-20 meters): 3-7 mm accuracy
- **Long Range** (> 20 meters): 7-10 mm accuracy

**Factors Affecting Accuracy:**
- Target distance
- Target surface reflectivity
- Environmental lighting
- Signal amplitude (check AMP value)
- Temperature stability

**Improving Accuracy:**
- Use white, matte targets
- Shield APD from external light
- Ensure stable mounting
- Maintain consistent temperature
- Keep targets within optimal range

---

## Safety Notes

### Laser Safety

**⚠️ IMPORTANT LASER SAFETY WARNINGS:**

1. **Laser Classification**: This device contains a laser. The specific class depends on the laser diode used, but typically:
   - **Class 1M or Class 3R**: Safe under normal use, but direct viewing may be hazardous
   - **Never look directly into the laser beam**
   - **Never point the laser at people or animals**

2. **Eye Protection**:
   - Do not stare into the laser beam
   - Avoid direct eye exposure
   - Use appropriate laser safety glasses if working with exposed laser

3. **Laser Beam**:
   - The laser beam is invisible (typically infrared or red)
   - Be aware of beam path
   - Ensure beam cannot accidentally point at people

4. **Laser Control**:
   - Use 'D' command to disable laser when not needed
   - Laser automatically enables with 'E' command
   - Power cycling also enables laser (if firmware configured)

### Electrical Safety

1. **High Voltage Warning**:
   - Module contains high-voltage circuits (80-115V) for APD bias
   - **Do not touch exposed circuits when powered**
   - Disconnect power before handling module internals

2. **Power Supply**:
   - Use only specified voltage
   - Ensure proper polarity
   - Use appropriate fusing
   - Do not exceed voltage ratings

3. **General Electrical Safety**:
   - Disconnect power before making connections
   - Use appropriate wire gauge for current
   - Ensure proper grounding
   - Follow local electrical codes

### General Safety

1. **Installation**:
   - Mount securely to prevent falling
   - Ensure adequate ventilation
   - Protect from weather if outdoor use

2. **Operation**:
   - Do not operate if damaged
   - Keep away from flammable materials
   - Follow manufacturer guidelines

3. **Maintenance**:
   - Disconnect power before maintenance
   - Use appropriate tools
   - Follow safety procedures

---

## Maintenance Guidelines

### Regular Maintenance

#### Daily/Weekly Checks

1. **Visual Inspection**:
   - Check for physical damage
   - Verify mounting is secure
   - Check for loose connections
   - Inspect laser window for dirt or damage
   - Verify APD shielding is intact

2. **Performance Check**:
   - Verify distance readings are reasonable
   - Check signal amplitude (AMP value)
   - Monitor for unusual behavior

#### Monthly Maintenance

1. **Cleaning**:
   - Clean laser window with appropriate lens cleaner
   - Use soft, lint-free cloth
   - Do not use abrasive materials
   - Ensure APD area remains shielded

2. **Connection Check**:
   - Verify all electrical connections are tight
   - Check for corrosion on connectors
   - Inspect cables for damage

3. **Calibration Check**:
   - Test measurement accuracy against known distances
   - Recalibrate if accuracy degrades

### Periodic Maintenance

#### Every 3-6 Months

1. **Full System Check**:
   - Complete visual inspection
   - Verify all functions
   - Check measurement accuracy
   - Recalibrate if needed

2. **Environmental Check**:
   - Verify operating temperature is within range
   - Check for moisture or contamination
   - Ensure proper ventilation

#### Annual Maintenance

1. **Comprehensive Inspection**:
   - Full system test
   - Accuracy verification
   - Calibration
   - Documentation update

### Troubleshooting Maintenance Issues

**If Measurements Become Inaccurate:**
1. Clean laser and sensor windows
2. Recalibrate system
3. Check for external light interference
4. Verify target surface quality
5. Check signal amplitude values

**If System Stops Responding:**
1. Check power supply
2. Verify communication connections
3. Power cycle the module
4. Check for error messages in serial output

**If Laser Does Not Enable:**
1. Send 'E' command via serial
2. Check power supply
3. Verify firmware is loaded correctly
4. Check for error messages

---

## Basic Troubleshooting

### Common Issues and Solutions

#### No Distance Output

**Symptoms:**
- No data appearing in serial terminal
- Module powered but silent

**Possible Causes and Solutions:**

1. **Communication Problem**:
   - ✅ Check baud rate is 256,000
   - ✅ Verify TX/RX connections (may be swapped)
   - ✅ Check ground connection
   - ✅ Try different serial port or cable

2. **Measurement Not Enabled**:
   - ✅ Send 'E' command to enable measurements
   - ✅ Verify module responds to commands

3. **Power Issue**:
   - ✅ Check power supply voltage
   - ✅ Verify power connections
   - ✅ Check for power indicator (if present)

#### Incorrect Distance Readings

**Symptoms:**
- Distance values seem wrong
- Measurements inconsistent
- Readings jump around

**Possible Causes and Solutions:**

1. **Calibration Needed**:
   - ✅ Perform zero-distance calibration (send 'C')
   - ✅ Ensure target is 10-50 cm during calibration
   - ✅ Use white, matte target

2. **Target Issues**:
   - ✅ Use white or light-colored target
   - ✅ Ensure target is perpendicular to beam
   - ✅ Check target is not moving
   - ✅ Verify target is within measurement range

3. **External Light Interference**:
   - ✅ Shield APD sensor from room lighting
   - ✅ Avoid direct sunlight on sensor
   - ✅ Check AMP value (should be reasonable, not zero)

4. **Signal Quality**:
   - ✅ Check AMP value in output (higher is better)
   - ✅ Move target closer if signal is weak
   - ✅ Ensure target is reflective enough

#### Calibration Fails

**Symptoms:**
- "Calib FAIL: Low Signal" message
- Calibration does not complete

**Possible Causes and Solutions:**

1. **Target Too Far or Too Close**:
   - ✅ Place target 10-50 cm from laser
   - ✅ 20-30 cm is often optimal

2. **Target Not Reflective Enough**:
   - ✅ Use white paper or white surface
   - ✅ Avoid dark or black targets
   - ✅ Ensure target is clean

3. **External Light**:
   - ✅ Shield APD sensor from room light
   - ✅ Perform calibration in normal lighting (not dark)

4. **Laser Not Enabled**:
   - ✅ Send 'E' command before calibrating
   - ✅ Verify laser is actually on (check for beam if visible)

5. **Hardware Issue**:
   - ✅ Check all connections
   - ✅ Verify power supply
   - ✅ Contact support if problem persists

#### Low Signal Amplitude

**Symptoms:**
- AMP value is very low (< 100)
- Measurements unreliable

**Possible Causes and Solutions:**

1. **Target Distance**:
   - ✅ Move target closer
   - ✅ Check target is within range

2. **Target Reflectivity**:
   - ✅ Use white, reflective target
   - ✅ Ensure target surface is clean

3. **Alignment**:
   - ✅ Check laser and sensor alignment
   - ✅ Ensure target is perpendicular

4. **APD Voltage**:
   - ✅ System should auto-adjust, but check VOLT value
   - ✅ If consistently low, may indicate hardware issue

#### Module Not Responding to Commands

**Symptoms:**
- Commands ('E', 'D', 'C') have no effect
- No response to serial input

**Possible Causes and Solutions:**

1. **Communication Setup**:
   - ✅ Verify baud rate: 256,000
   - ✅ Check TX/RX connections
   - ✅ Ensure ground is connected
   - ✅ Try different serial terminal program

2. **Module State**:
   - ✅ Power cycle the module
   - ✅ Wait for "Start\r\n" message
   - ✅ Try commands again

3. **Firmware Issue**:
   - ✅ Verify firmware is loaded correctly
   - ✅ Check for error messages
   - ✅ May need firmware update

### Getting Help

If troubleshooting does not resolve the issue:

1. **Document the Problem**:
   - Note exact symptoms
   - Record error messages
   - Note when problem occurs

2. **Check Documentation**:
   - Review Technical Documentation
   - Check for similar issues in documentation

3. **Contact Support**:
   - Provide module type and version
   - Describe problem in detail
   - Include any error messages

---

## Quick Reference

### Serial Commands

| Command | Function | Response |
|---------|----------|----------|
| `E` | Enable laser and measurements | Distance data starts |
| `D` | Disable laser and measurements | Measurements stop |
| `C` | Start calibration | Calibration process |

### Data Format

```
DIST;01574;AMP;0993;TEMP;1343;VOLT;082\r\n
```

- DIST: Distance in mm (5 digits)
- AMP: Signal amplitude (4 digits)
- TEMP: Temperature (4 digits, raw)
- VOLT: APD voltage (3 digits)

### Typical Settings

- **Baud Rate**: 256,000
- **Data Format**: 8N1
- **Measurement Rate**: ~60 Hz
- **Calibration Distance**: 10-50 cm
- **Best Target**: White, matte surface

---

**End of User Manual**

