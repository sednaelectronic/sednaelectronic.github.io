# Laser Loop v1 - User Manual

## Table of Contents
1. [Introduction](#introduction)
2. [Package Contents](#package-contents)
3. [System Overview](#system-overview)
4. [Hardware Assembly](#hardware-assembly)
5. [Installation](#installation)
6. [Initial Configuration](#initial-configuration)
7. [Operation](#operation)
8. [Maintenance](#maintenance)
9. [Troubleshooting](#troubleshooting)
10. [Safety and Precautions](#safety-and-precautions)

---

## Introduction

Welcome to the Laser Loop v1 vehicle detection system. This manual provides step-by-step instructions for installing, configuring, and operating the system. The Laser Loop v1 is designed for traffic monitoring and intersection management applications, providing reliable vehicle detection using LiDAR distance measurement technology.

### What is Laser Loop v1?

Laser Loop v1 is a wireless vehicle detection system that consists of:
- **Sensor Units**: Measure vehicle presence using laser distance sensors
- **Master Unit**: Receives data from up to 16 sensor units and controls output signals

The system is ideal for:
- Traffic light control at intersections
- Vehicle counting and traffic flow monitoring
- Parking lot management
- Access control systems
- Traffic density estimation

---

## Package Contents

### Sensor Unit Package
- 1x Sensor unit PCB with ESP8266 microcontroller
- 1x TFMini LiDAR distance sensor
- 1x NRF24L01 wireless module
- 1x Power supply cable/connector
- 1x Mounting hardware (brackets, screws)
- 1x Quick start guide

### Master Unit Package
- 1x Master unit PCB with STM32 microcontroller
- 1x NRF24L01 wireless module
- 1x Power supply cable/connector
- 1x Output connector/terminal block
- 1x Mounting hardware
- 1x Quick start guide

### Additional Items (if ordered)
- Spare sensors
- Extension cables
- Weatherproof enclosures
- Additional mounting brackets

**Note**: Verify all items are present before beginning installation. Contact your supplier if any items are missing.

---

## System Overview

### How It Works

1. **Sensor Units** are placed at strategic locations (e.g., above traffic lanes)
2. Each sensor continuously measures the distance to the road surface using a laser
3. When a vehicle passes, the distance measurement changes
4. The sensor processes this change and determines if a vehicle is present
5. Detection information is transmitted wirelessly to the **Master Unit**
6. The Master Unit receives data from all sensors and controls output signals accordingly

### System Components

#### Sensor Unit (Client)
- **Size**: Approximately 60mm × 50mm PCB
- **Power**: 5V or 12V DC (check your specific model)
- **Range**: Detects vehicles up to 12 meters away
- **Wireless Range**: Up to 100 meters to master unit (line of sight)
- **Configuration**: Via WiFi web interface

#### Master Unit (Receiver)
- **Size**: Approximately 95mm × 80mm PCB
- **Power**: 12V DC (typical)
- **Outputs**: 16 digital output channels
- **Wireless**: Receives from up to 16 sensor units
- **Communication**: Serial output available (optional)

---

## Hardware Assembly

### Sensor Unit Assembly

#### Step 1: Prepare Components
1. Unpack all sensor unit components
2. Verify TFMini sensor is undamaged (check lens is clean)
3. Verify NRF24L01 module antenna is intact
4. Check PCB for any visible damage

#### Step 2: Install TFMini Sensor
1. Locate the TFMini connector on the PCB (labeled or near edge)
2. Connect TFMini sensor cable:
   - **Red wire**: Power (VCC) - typically 5V
   - **Black wire**: Ground (GND)
   - **Yellow/White wire**: Signal (TX/RX)
3. Ensure secure connection (check for loose wires)
4. **Important**: Do not reverse power connections - this will damage the sensor

#### Step 3: Install NRF24L01 Module
1. Locate NRF24L01 connector on PCB
2. Align module with connector (check pin orientation)
3. Press module firmly into connector
4. Verify module is seated correctly
5. Ensure antenna is not obstructed

#### Step 4: Power Connection
1. Identify power input connector on PCB
2. Connect power supply cable:
   - **Positive (+)** to VCC terminal
   - **Negative (-)** to GND terminal
3. Verify polarity is correct before applying power
4. **Do not apply power yet** - wait for installation instructions

### Master Unit Assembly

#### Step 1: Prepare Components
1. Unpack all master unit components
2. Verify PCB is undamaged
3. Check output connector/terminal block

#### Step 2: Install NRF24L01 Module
1. Locate NRF24L01 connector on PCB
2. Align module with connector
3. Press module firmly into place
4. Verify secure connection

#### Step 3: Connect Output Channels
1. Identify output connector or terminal block
2. Connect external control wires to output channels:
   - **OUT1** through **OUT16**: Individual output channels
   - Each output provides 3.3V when active (HIGH)
   - Each output provides 0V when inactive (LOW)
3. **Note**: Check your external system requirements - you may need relays or level shifters for higher voltage systems

#### Step 4: Power Connection
1. Connect 12V DC power supply:
   - **Positive (+)** to VCC terminal
   - **Negative (-)** to GND terminal
2. Verify polarity before applying power
3. **Do not apply power yet** - wait for installation instructions

---

## Installation

### Sensor Unit Installation

#### Location Selection
Choose installation locations based on:
- **Height**: 3-5 meters above road surface (typical)
- **Angle**: Sensor should point downward at road surface
- **Clearance**: Ensure no obstructions in sensor's field of view
- **Wireless Range**: Within 100 meters of master unit (line of sight recommended)
- **Power Access**: Nearby power source available
- **Weather Protection**: Install in weatherproof enclosure if exposed

#### Mounting Procedure
1. **Mark Mounting Location**
   - Use mounting bracket as template
   - Mark hole positions
   - Ensure sensor will point at correct area

2. **Install Mounting Bracket**
   - Drill holes for mounting screws
   - Secure bracket with appropriate screws for your surface (concrete, metal, etc.)
   - Verify bracket is level and secure

3. **Mount Sensor Unit**
   - Attach sensor unit to bracket
   - Adjust angle to point at road surface
   - Secure all mounting hardware
   - Verify sensor is stable and will not move

4. **Route Cables**
   - Route power cable to power source
   - Secure cables to prevent damage
   - Leave some slack for maintenance access
   - Protect cables from weather if exposed

5. **Connect Power**
   - Verify power supply voltage matches sensor requirements
   - Connect power cable to sensor unit
   - **Apply power** - sensor should initialize (LED may indicate status)

#### Initial Power-Up Check
- Sensor unit should initialize within 10-15 seconds
- WiFi access point should become available (SSID: "esp")
- If no response, check power connections and voltage

### Master Unit Installation

#### Location Selection
- **Central Location**: Near center of sensor network for best wireless coverage
- **Protected Environment**: Indoor or weatherproof enclosure
- **Power Access**: Reliable power source
- **Accessibility**: Easy access for maintenance and configuration
- **Ventilation**: Adequate airflow if in enclosure

#### Mounting Procedure
1. **Select Mounting Location**
   - Choose location based on criteria above
   - Ensure adequate space for connections

2. **Mount Master Unit**
   - Use provided mounting hardware
   - Secure to wall or panel
   - Ensure unit is level and secure

3. **Connect Output Wires**
   - Route output wires to external control systems
   - Label each wire for easy identification
   - Secure wires to prevent strain on connections

4. **Connect Power**
   - Verify power supply is 12V DC (check your model)
   - Connect power cable
   - **Apply power** - master unit should initialize

#### Initial Power-Up Check
- Master unit should initialize immediately
- No error indicators should be present
- Output channels should be in LOW state initially

---

## Initial Configuration

### Sensor Unit Configuration

#### Step 1: Connect to Sensor WiFi
1. Power on the sensor unit
2. Wait 15-30 seconds for initialization
3. On your smartphone, tablet, or laptop, open WiFi settings
4. Look for WiFi network named **"esp"**
5. Connect to this network
   - **Password**: `123456789`
6. Wait for connection confirmation

#### Step 2: Access Web Configuration Interface
1. Open a web browser on your connected device
2. Navigate to the sensor's IP address (typically shown in WiFi connection details)
   - Or try: `http://192.168.4.1` (common default)
3. You should see a web terminal interface
4. If prompted, the interface should load automatically

#### Step 3: Configure Base Value (Critical Setting)

The **base value** is the distance measurement when no vehicle is present. This is the most important configuration setting.

**Method 1: Manual Measurement**
1. Ensure no vehicles are in the detection zone
2. In the web terminal, you should see distance readings
3. Note the distance value when road is clear (e.g., 1200 cm)
4. Send command: `XXXX,` where XXXX is your base value
   - Example: For 1200 cm, send: `1200,`
5. Wait for confirmation message
6. Sensor will store this value and use it for detection

**Method 2: Automatic Calibration** (if supported)
1. Ensure detection zone is clear
2. Follow on-screen instructions for auto-calibration
3. System will measure and store base value automatically

**Important Notes**:
- Base value should be measured when road is completely clear
- Recalibrate if sensor is moved or installation height changes
- Typical values: 800-2000 cm depending on installation height

#### Step 4: Configure Sensor Number
Each sensor in your network needs a unique number (1-16).

1. In web terminal, send command: `XXXX#` where XXXX is your sensor number
   - Example: For sensor 1, send: `0001#`
   - Example: For sensor 2, send: `0002#`
2. Wait for confirmation
3. Sensor number is stored and used in wireless transmissions

**Sensor Number Guidelines**:
- Use sequential numbers starting from 1
- Keep a record of which sensor number corresponds to which location
- Each sensor must have a unique number

#### Step 5: Verify Configuration
1. Check that base value is stored: Look for "mid=XXXX" message
2. Check that sensor number is stored: Look for "sensor number=X" message
3. Test detection: Have a vehicle pass through detection zone
4. Observe distance readings change in web terminal
5. Verify wireless transmission (check master unit receives data)

#### Step 6: Disconnect and Complete Setup
1. Configuration is saved automatically
2. Disconnect from sensor WiFi
3. Sensor will continue operating with saved settings
4. Reconnect to your normal WiFi network if needed

### Master Unit Configuration

#### Basic Setup
The master unit typically requires minimal configuration:
1. Power on the master unit
2. Unit automatically enters receive mode
3. No initial configuration required for basic operation

#### Output Channel Testing
1. Use a multimeter or test LED to verify outputs
2. When sensor sends "vehicle in" signal, corresponding output should go HIGH
3. When sensor sends "vehicle out" signal, output should go LOW
4. Test each sensor-to-output mapping

#### Advanced Configuration
- **Serial Output**: If using serial communication, configure baud rate and format per your external system requirements
- **Output Mapping**: Verify which sensor controls which output channel (may require firmware customization)

---

## Operation

### Normal Operation

#### System Startup Sequence
1. **Power On Master Unit First**
   - Master unit initializes and enters receive mode
   - All output channels start in LOW state
   - Unit is ready to receive sensor data

2. **Power On Sensor Units**
   - Each sensor initializes (15-30 seconds)
   - Sensor loads configuration from memory
   - Sensor begins distance measurements
   - Sensor connects to master unit wirelessly

3. **System Ready**
   - All units operational
   - Detection begins automatically
   - Output channels respond to vehicle detection

#### Detection Operation

**Vehicle Detection Process**:
1. Sensor continuously measures distance to road surface
2. When vehicle enters detection zone:
   - Distance measurement decreases
   - Sensor compares to base value
   - If below threshold, vehicle is detected
3. Sensor transmits "vehicle in" signal to master
4. Master unit sets corresponding output HIGH
5. When vehicle exits:
   - Distance returns to baseline
   - Sensor transmits "vehicle out" signal
6. Master unit sets corresponding output LOW

**Detection Zones**:
- **Primary Zone**: Distance < (base value × 100%)
- **Secondary Zone**: Distance between (base value × 100%) and (base value × 200%)

#### Monitoring System Status

**Sensor Unit Status**:
- Access web interface periodically to check:
  - Current distance readings
  - Base value setting
  - Sensor number
  - Detection events
  - Wireless transmission status

**Master Unit Status**:
- Monitor output channel states
- Check for consistent response to sensor events
- Verify power supply voltage

#### Expected Behavior

**Normal Operation Indicators**:
- Sensor units show consistent distance readings when road is clear
- Distance readings change when vehicles pass
- Master unit outputs change state when vehicles detected
- Wireless communication is reliable (no missed detections)

**Detection Accuracy**:
- System should detect vehicles reliably (95%+ accuracy typical)
- False triggers should be minimal
- Response time: < 1 second from vehicle entry to output change

---

## Maintenance

### Regular Maintenance Schedule

#### Weekly Checks
- Visual inspection of sensor units (check for damage, obstructions)
- Verify master unit is powered and operational
- Check for any error indicators

#### Monthly Maintenance
- Clean sensor lenses (TFMini sensors)
  - Use soft, lint-free cloth
  - Gently wipe lens surface
  - Do not use abrasive cleaners
- Check all cable connections
- Verify mounting hardware is secure
- Test detection accuracy with known vehicle passes

#### Quarterly Maintenance
- Comprehensive system test
- Verify base value calibration (recalibrate if needed)
- Check wireless communication range
- Inspect weatherproof enclosures (if used)
- Clean all connectors and contacts

#### Annual Maintenance
- Full system inspection
- Replace any worn components
- Update firmware if available
- Recalibrate all sensors
- Document system performance

### Cleaning Procedures

#### Sensor Lens Cleaning
1. **Power Off** sensor unit (safety)
2. Gently wipe lens with soft, dry cloth
3. If needed, use lens cleaning solution (camera lens cleaner)
4. **Never** use abrasive materials or harsh chemicals
5. Ensure lens is completely dry before powering on

#### PCB Cleaning
1. **Power Off** all units
2. Use compressed air to remove dust
3. Use isopropyl alcohol and soft brush for stubborn dirt
4. Ensure all components are completely dry before powering on
5. **Never** use water or cleaning solutions directly on PCB

### Calibration

#### When to Recalibrate
- After moving sensor unit
- After changing installation height
- If detection accuracy decreases
- After maintenance that may affect sensor position
- Seasonally (if temperature affects measurements significantly)

#### Recalibration Procedure
1. Access sensor web interface
2. Ensure detection zone is completely clear
3. Note current distance reading
4. Send new base value command: `XXXX,`
5. Verify new base value is stored
6. Test detection with known vehicle

---

## Troubleshooting

### Common Issues and Solutions

#### Sensor Unit Issues

**Problem: Sensor unit does not power on**
- **Check**: Power supply voltage and connections
- **Solution**: Verify power supply is correct voltage (5V or 12V as specified)
- **Solution**: Check cable connections are secure
- **Solution**: Test power supply with multimeter

**Problem: Cannot connect to sensor WiFi**
- **Check**: Sensor is powered and initialized
- **Solution**: Wait 30 seconds after power-on for initialization
- **Solution**: Look for "esp" network (not "esp8266" or similar)
- **Solution**: Try forgetting network and reconnecting
- **Solution**: Move closer to sensor unit

**Problem: Web interface does not load**
- **Check**: Connected to correct WiFi network
- **Solution**: Try different web browser
- **Solution**: Clear browser cache
- **Solution**: Try accessing via IP address directly

**Problem: Distance readings are incorrect or erratic**
- **Check**: Sensor lens is clean
- **Check**: No obstructions in sensor's field of view
- **Solution**: Recalibrate base value
- **Solution**: Check sensor mounting is secure
- **Solution**: Verify TFMini sensor connection

**Problem: Sensor does not detect vehicles**
- **Check**: Base value is set correctly
- **Check**: Vehicle is within detection range
- **Solution**: Recalibrate base value
- **Solution**: Check sensor is pointing at correct area
- **Solution**: Verify detection zone is not obstructed

**Problem: Wireless transmission not working**
- **Check**: NRF24L01 module is properly connected
- **Check**: Master unit is powered and in range
- **Solution**: Verify sensor and master are on same channel (may require firmware check)
- **Solution**: Check antenna is not damaged
- **Solution**: Reduce distance between sensor and master

#### Master Unit Issues

**Problem: Master unit does not power on**
- **Check**: Power supply voltage (should be 12V DC)
- **Check**: Power connections
- **Solution**: Test power supply with multimeter
- **Solution**: Verify polarity is correct

**Problem: Output channels do not respond**
- **Check**: Master unit is receiving sensor data
- **Check**: Output connections are correct
- **Solution**: Test outputs with multimeter
- **Solution**: Verify sensor is transmitting correctly
- **Solution**: Check output channel mapping (may require firmware verification)

**Problem: Some sensors not communicating with master**
- **Check**: All sensors are powered
- **Check**: Wireless range
- **Solution**: Verify sensor numbers are unique
- **Solution**: Check NRF24L01 modules are functioning
- **Solution**: Reduce distance or add repeater

#### System-Wide Issues

**Problem: False detections (detects when no vehicle present)**
- **Check**: Base value calibration
- **Check**: Environmental factors (wind, debris)
- **Solution**: Recalibrate base value
- **Solution**: Adjust detection thresholds (may require firmware modification)
- **Solution**: Check for obstructions in sensor field of view

**Problem: Missed detections (does not detect vehicles)**
- **Check**: Base value is too high
- **Check**: Sensor mounting height/angle
- **Solution**: Recalibrate with lower base value
- **Solution**: Adjust sensor angle
- **Solution**: Verify detection zone coverage

**Problem: Inconsistent detection**
- **Check**: Sensor mounting stability
- **Check**: Power supply stability
- **Solution**: Secure mounting hardware
- **Solution**: Check power supply voltage under load
- **Solution**: Recalibrate sensors

### Getting Help

If you cannot resolve an issue:

1. **Document the Problem**:
   - Note exact symptoms
   - Record error messages
   - Note when problem occurs

2. **Check Configuration**:
   - Verify all settings are correct
   - Review installation procedures

3. **Contact Support**:
   - Provide system model numbers
   - Describe problem in detail
   - Include photos if helpful
   - Provide configuration settings

---

## Safety and Precautions

### Electrical Safety

⚠️ **WARNING**: This equipment uses electrical power. Follow all electrical safety procedures.

- **Power Off** before making any connections or modifications
- Use only specified power supplies and voltages
- Verify polarity before connecting power
- Do not exceed specified current ratings
- Use appropriate fuses or circuit breakers
- Ensure proper grounding

### Installation Safety

⚠️ **WARNING**: Installation may require working at height or near traffic.

- Follow all local safety regulations
- Use appropriate safety equipment (hard hats, safety harnesses, etc.)
- Secure work area to prevent accidents
- Work with traffic control if installing near active roadways
- Ensure stable mounting to prevent equipment from falling

### Laser Safety

⚠️ **WARNING**: TFMini sensors use Class 1 laser products.

- **Do not** look directly into sensor lens
- **Do not** point sensor at people or animals
- Class 1 lasers are generally safe, but avoid direct exposure
- Keep sensor lens clean and undamaged
- Replace damaged sensors immediately

### Environmental Considerations

- **Temperature**: Operate within specified temperature ranges
- **Moisture**: Protect from water and moisture unless using weatherproof enclosures
- **Dust**: Keep sensors clean for accurate operation
- **Vibration**: Secure mounting to prevent vibration damage

### Maintenance Safety

- **Power Off** all equipment before maintenance
- Allow time for components to cool if they were operating
- Use appropriate tools for maintenance tasks
- Follow all maintenance procedures exactly
- Do not modify equipment beyond specified procedures

### Disposal

- Dispose of equipment according to local regulations
- Electronic waste should be recycled properly
- Do not dispose of in regular trash

---

## Appendix

### Configuration Quick Reference

#### Sensor Unit Configuration Commands
- **Set Base Value**: `XXXX,` (e.g., `1200,` for 1200 cm)
- **Set Sensor Number**: `XXXX#` (e.g., `0001#` for sensor 1)
- **Firmware Update Mode**: `0099,` (enters update mode)

#### Default Settings
- **WiFi SSID**: "esp"
- **WiFi Password**: "123456789"
- **NRF24L01 Address**: "00100" (sensor), 0x00DDCCBBAA (master)
- **NRF24L01 Channel**: 10 (master), configurable (sensor)

### Technical Specifications Summary

#### Sensor Unit
- **Power**: 5V or 12V DC (model dependent)
- **Current**: ~200mA typical
- **Detection Range**: 0.3m to 12m
- **Wireless Range**: Up to 100m (line of sight)

#### Master Unit
- **Power**: 12V DC
- **Current**: ~50mA (without loads)
- **Output Voltage**: 3.3V HIGH, 0V LOW
- **Output Current**: 20mA per channel (max)

### Contact Information

For technical support, firmware updates, or replacement parts, contact your supplier or system integrator.

---

*User Manual Version: 1.0*  
*Last Updated: Based on project files analysis*  
*System: Laser Loop v1*

