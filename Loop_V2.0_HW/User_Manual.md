# Laser Loop v2.0 - User Manual

## Table of Contents
1. [Introduction](#introduction)
2. [Package Contents](#package-contents)
3. [System Overview](#system-overview)
4. [Hardware Assembly](#hardware-assembly)
5. [Installation and Setup](#installation-and-setup)
6. [Configuration](#configuration)
7. [Operation](#operation)
8. [Maintenance](#maintenance)
9. [Troubleshooting](#troubleshooting)
10. [Safety Precautions](#safety-precautions)

---

## Introduction

### Welcome

Thank you for choosing Laser Loop v2.0, a wireless vehicle detection system designed for traffic monitoring and management applications. This manual provides step-by-step instructions for installing, configuring, and operating your Laser Loop system.

### What is Laser Loop v2.0?

Laser Loop v2.0 is a two-part system consisting of:

1. **Sensor Units**: Compact devices that use laser distance measurement to detect vehicles. Each sensor unit can be placed at a traffic lane or detection point.

2. **Master/Receiver Unit**: A central unit that receives data from up to 16 sensor units and provides output to traffic control systems or monitoring equipment.

### System Capabilities

- Wireless communication over long distances (up to several kilometers)
- Support for up to 16 sensor units per master unit
- Real-time vehicle detection and status reporting
- Configurable detection thresholds
- Bluetooth configuration interface
- Serial data output for integration with external systems

---

## Package Contents

### Sensor Unit Package

Each sensor unit package should contain:

- [ ] 1x Sensor unit PCB/board (ESP32-based)
- [ ] 1x TFMini distance sensor module
- [ ] 1x LoRa E32 wireless module
- [ ] 1x Power supply (5V DC adapter or USB cable)
- [ ] 1x Mounting bracket/hardware (if included)
- [ ] 1x Quick start guide
- [ ] 1x Warranty card

### Master Unit Package

Each master unit package should contain:

- [ ] 1x Master/receiver unit (ESP32 or ESP8266-based)
- [ ] 1x LoRa E32 wireless module
- [ ] 1x Power supply (5V DC adapter or USB cable)
- [ ] 1x Serial/USB cable (for data output)
- [ ] 1x Mounting hardware (if included)
- [ ] 1x Quick start guide

### Optional Accessories

- Additional mounting brackets
- Extension cables
- Antenna extensions (for LoRa modules)
- Weatherproof enclosures
- Backup power supplies

**Note:** Verify all items are present before proceeding with installation. Contact your supplier if any items are missing.

---

## System Overview

### How It Works

1. **Detection**: Each sensor unit continuously measures the distance to the road surface using a laser distance sensor (TFMini).

2. **Processing**: The sensor compares the measured distance to a stored "base" (reference) distance. When a vehicle passes over the sensor, the distance decreases, triggering a detection.

3. **Transmission**: When a vehicle is detected (or when it leaves), the sensor unit transmits a wireless signal via LoRa to the master unit.

4. **Aggregation**: The master unit receives signals from all connected sensor units and maintains the status of up to 16 detection zones.

5. **Output**: The master unit provides the detection status via:
   - Serial communication (USB/UART) for connection to computers or traffic control systems
   - Digital output channels (optional) for direct control of traffic lights or other equipment

### System Components

#### Sensor Unit Components

- **Microcontroller**: ESP32 (handles processing and communication)
- **Distance Sensor**: TFMini laser distance sensor
- **Wireless Module**: LoRa E32 (433MHz long-range radio)
- **Bluetooth**: Built into ESP32 (for configuration)
- **Power**: 5V DC input

#### Master Unit Components

- **Microcontroller**: ESP32 or ESP8266
- **Wireless Module**: LoRa E32 (433MHz receiver)
- **Serial Interface**: USB or UART for data output
- **Digital Outputs**: 16 channels (optional, for direct control)
- **Power**: 5V DC input

### Typical Installation Layout

```
                    Sensor Unit 1
                    (Lane 1)
                          │
                          │ LoRa
                          │
Sensor Unit 2 ────────────┼─────────── Master Unit ────► Traffic Control System
(Lane 2)                 │            (Central)
                          │
Sensor Unit 3 ────────────┘
(Lane 3)
```

---

## Hardware Assembly

### Prerequisites

Before assembly, ensure you have:
- Basic knowledge of electronics and wiring
- Appropriate tools (screwdriver, wire strippers, multimeter)
- Clean, well-lit workspace
- Anti-static precautions (if handling bare PCBs)

### Sensor Unit Assembly

#### Step 1: Prepare Components

1. Unpack all components and verify they match the package contents list.
2. Inspect the PCB for any visible damage or defects.
3. Check that all connectors are clean and undamaged.

#### Step 2: Connect TFMini Sensor

1. Locate the TFMini sensor connector on the PCB.
2. Connect the TFMini sensor using the provided cable or direct connection:
   - **VCC** (Red wire) → 5V or 3.3V power (check sensor specifications)
   - **GND** (Black wire) → Ground
   - **TX** (Yellow/White wire) → ESP32 Serial RX pin
   - **RX** (Green wire) → ESP32 Serial TX pin

3. Ensure connections are secure and properly seated.

#### Step 3: Connect LoRa E32 Module

1. Locate the LoRa E32 module connector on the PCB.
2. Connect the LoRa module:
   - **VCC** → 3.3V or 5V (check module specifications)
   - **GND** → Ground
   - **TX** → ESP32 Serial2 RX pin (typically GPIO 25)
   - **RX** → ESP32 Serial2 TX pin (typically GPIO 26)
   - **AUX** → ESP32 GPIO 27 (optional, for status)
   - **M0** and **M1** → Can be left unconnected for normal operation

3. Verify all connections are correct before applying power.

#### Step 4: Power Connection

1. Connect the 5V DC power supply:
   - **Positive (+)**: VCC input on PCB
   - **Negative (-)**: GND input on PCB

2. **Do not apply power yet** - wait until all connections are verified.

#### Step 5: Final Inspection

1. Double-check all connections against the wiring diagram.
2. Ensure no short circuits between power and ground.
3. Verify that all modules are properly seated.
4. Check that the antenna (if external) is connected to the LoRa module.

### Master Unit Assembly

#### Step 1: Connect LoRa E32 Module

1. Connect the LoRa E32 module to the master unit PCB using the same pin assignments as the sensor unit.

2. Ensure the module is configured for reception (transparent mode).

#### Step 2: Connect Serial Output

1. If using USB output:
   - Connect USB cable to the master unit's USB port
   - Connect the other end to your computer or traffic control system

2. If using UART output:
   - Connect TX pin to the receiving device's RX pin
   - Connect GND to common ground
   - Connect RX pin if bidirectional communication is needed

#### Step 3: Connect Digital Outputs (Optional)

1. If using digital outputs:
   - Connect each of the 16 output channels to your control equipment
   - Ensure proper voltage levels (3.3V logic)
   - Use appropriate current-limiting resistors if driving LEDs or relays

#### Step 4: Power Connection

1. Connect the 5V DC power supply to the master unit.
2. Verify power indicator LED (if present) illuminates.

### Mounting Considerations

#### Sensor Unit Mounting

- **Location**: Mount sensor units above or beside traffic lanes at an appropriate height (typically 2-5 meters).
- **Orientation**: Ensure the TFMini sensor is pointing downward toward the road surface.
- **Angle**: Sensor should be perpendicular to the road surface for accurate measurements.
- **Protection**: Use weatherproof enclosures if exposed to elements.
- **Stability**: Ensure mounting is secure and vibration-resistant.

#### Master Unit Mounting

- **Location**: Install in a central location with good line-of-sight to all sensor units.
- **Environment**: Protect from weather, dust, and extreme temperatures.
- **Access**: Ensure access for configuration and maintenance.
- **Antenna**: Position LoRa antenna for optimal coverage.

---

## Installation and Setup

### Pre-Installation Checklist

Before installation, complete the following:

- [ ] All hardware is assembled and tested
- [ ] Firmware is loaded on all units (see Configuration section)
- [ ] Installation locations are selected and approved
- [ ] Power sources are available and tested
- [ ] Mounting hardware is prepared
- [ ] Safety equipment is ready (if working at height)

### Sensor Unit Installation

#### Step 1: Physical Installation

1. Mount the sensor unit at the selected location using appropriate hardware.
2. Ensure the unit is securely fastened and will not move due to wind or vibration.
3. Position the TFMini sensor to point at the detection zone on the road.

#### Step 2: Power Connection

1. Connect the power supply to the sensor unit.
2. Verify the unit powers on (check for indicator LEDs or use a multimeter).
3. Ensure power supply provides stable 5V DC.

#### Step 3: Initial Power-On Test

1. Power on the sensor unit.
2. Wait approximately 10-15 seconds for initialization.
3. The unit should be ready for configuration (see Configuration section).

### Master Unit Installation

#### Step 1: Physical Installation

1. Mount the master unit in the selected location.
2. Ensure adequate ventilation and protection from elements.
3. Position the LoRa antenna for optimal reception.

#### Step 2: Power and Data Connections

1. Connect the power supply.
2. Connect the serial output cable to your monitoring/control system.
3. Verify all connections are secure.

#### Step 3: Initial Power-On Test

1. Power on the master unit.
2. Wait for initialization (10-15 seconds).
3. Connect to the serial interface and verify communication (see Operation section).

### System Integration

#### Connecting to Traffic Control Systems

1. **Serial Connection:**
   - Connect master unit serial output to your traffic control system's serial input.
   - Configure baud rate: 115200 bps (default)
   - Set data format: 8N1 (8 data bits, no parity, 1 stop bit)

2. **Digital Output Connection:**
   - If using digital outputs, connect each channel to the corresponding input on your control system.
   - Verify voltage levels are compatible (3.3V logic).

3. **Software Integration:**
   - Configure your traffic control software to parse the serial data format (see Technical Documentation).
   - Test data reception and processing.

---

## Configuration

### Overview

Sensor units can be configured via Bluetooth using a smartphone, tablet, or computer with Bluetooth capability. The master unit typically requires minimal configuration (firmware handles most settings).

### Bluetooth Connection Setup

#### Step 1: Enable Bluetooth on Your Device

1. On your smartphone/tablet, enable Bluetooth in settings.
2. Ensure Bluetooth is discoverable/scanning for devices.

#### Step 2: Connect to Sensor Unit

1. Power on the sensor unit.
2. Wait 10-15 seconds for Bluetooth to initialize.
3. On your device, scan for Bluetooth devices.
4. Look for device named "Loop_Sensor_1" (or similar).
5. Select the device to pair.
6. When prompted for PIN, enter: **123456789** (default PIN)
7. Complete the pairing process.

#### Step 3: Open Serial Terminal App

1. Install a Bluetooth serial terminal app on your device:
   - **Android**: "Serial Bluetooth Terminal", "Bluetooth Terminal"
   - **iOS**: "Serial", "BLE Scanner" (if using BLE)
   - **Windows/Mac**: Use built-in serial terminal or third-party app

2. Open the app and connect to "Loop_Sensor_1".

### Configuration Commands

All commands must end with `*` (asterisk). Commands are case-sensitive.

#### 1. Get Current Distance Reading

**Command:** `Get_Dist,*`

**Purpose:** Read the current distance measurement from the TFMini sensor.

**Response Example:**
```
150 cm      strength: 5000
```

**Use Case:** Verify sensor is working and check current distance to road surface.

#### 2. Set Base Distance

**Command:** `Set_Base,XXXX,*`

**Where XXXX is a 4-digit number (0000-9999) representing the base distance in centimeters.**

**Purpose:** Set the reference distance used for vehicle detection. When measured distance is 5cm or more below this value, a vehicle is detected.

**Example:**
```
Set_Base,0150,*
```

This sets the base distance to 150 cm.

**Response:**
```
Base
150
```

**Important Notes:**
- Set the base distance when no vehicle is present in the detection zone.
- The base distance should be the normal distance from sensor to road surface.
- Typical values: 100-300 cm depending on installation height.

#### 3. Get Base Distance

**Command:** `Get_Base,*`

**Purpose:** Read the currently stored base distance value.

**Response Example:**
```
Base
150
```

#### 4. Set Device Address

**Command:** `Set_Dadd,XXXX,*`

**Where XXXX is a 4-digit number (0001-0016) representing the sensor unit address.**

**Purpose:** Assign a unique address (1-16) to this sensor unit. Each sensor in a system must have a unique address.

**Example:**
```
Set_Dadd,0003,*
```

This sets the device address to 3.

**Response:**
```
Set Device Address
3
```

**Important Notes:**
- Address must be between 1 and 16.
- Each sensor unit must have a unique address.
- The address is stored in EEPROM and persists after power cycle.
- Changing the address causes the LoRa module to reconfigure automatically.

#### 5. Get Device Address

**Command:** `Get_Dadd,*`

**Purpose:** Read the currently assigned device address.

**Response Example:**
```
Get Device Address
3
```

### Configuration Procedure

#### Initial Sensor Unit Setup

1. **Power on the sensor unit** and wait for initialization.

2. **Connect via Bluetooth** using the steps above.

3. **Verify sensor operation:**
   - Send: `Get_Dist,*`
   - Verify you receive a reasonable distance reading (not 0 or extremely large values).

4. **Set base distance:**
   - Ensure no vehicle is in the detection zone.
   - Send: `Get_Dist,*` to read current distance.
   - Send: `Set_Base,XXXX,*` where XXXX is the distance reading (e.g., if reading is 150 cm, send `Set_Base,0150,*`).

5. **Set device address:**
   - Send: `Set_Dadd,XXXX,*` where XXXX is the desired address (0001-0016).
   - Verify with: `Get_Dadd,*`

6. **Test detection:**
   - Place an object (or vehicle) in the detection zone.
   - You should see "Detect..." messages in the Bluetooth terminal.
   - Remove the object and verify detection clears.

7. **Repeat for all sensor units**, assigning unique addresses to each.

#### Master Unit Configuration

The master unit typically requires minimal configuration:

1. **Verify LoRa settings:**
   - Master unit should be configured to receive on channel 0x19 (435MHz).
   - This is usually set in firmware and doesn't require user configuration.

2. **Test reception:**
   - Power on configured sensor units.
   - Monitor serial output from master unit.
   - Verify packets are received and parsed correctly.

### Configuration Best Practices

1. **Document Settings:**
   - Keep a record of each sensor unit's address and base distance.
   - Label each sensor unit with its address for easy identification.

2. **Base Distance Calibration:**
   - Calibrate during normal conditions (no vehicles, normal weather).
   - Recalibrate if sensor is moved or if environmental conditions change significantly.

3. **Address Assignment:**
   - Use sequential addresses (1, 2, 3...) for easy management.
   - Match sensor addresses to physical locations (e.g., Lane 1 = Address 1).

4. **Testing:**
   - Test each sensor unit individually before deploying the full system.
   - Verify master unit receives data from all sensors.

---

## Operation

### Normal Operation

Once configured and installed, the Laser Loop system operates automatically:

1. **Continuous Monitoring:**
   - Sensor units continuously measure distance and compare to base value.
   - When a vehicle is detected, the sensor transmits a detection signal.
   - When the vehicle leaves, the sensor transmits a clear signal.

2. **Data Transmission:**
   - Detection signals are transmitted wirelessly via LoRa to the master unit.
   - Transmission occurs only when detection state changes (to conserve power and bandwidth).

3. **Master Unit Processing:**
   - Master unit receives signals from all sensor units.
   - Updates internal status for each zone (1-16).
   - Outputs status via serial communication.

4. **Output Format:**
   - Serial output format: `SP3XX[Z1][Z2]...[Z16]E`
   - Each zone (Z1-Z16) shows '1' for vehicle detected, '0' for no vehicle.

### Monitoring System Status

#### Via Bluetooth (Sensor Units)

1. Connect to a sensor unit via Bluetooth.
2. Send `Get_Dist,*` periodically to monitor current distance.
3. Observe "Detect..." messages when vehicles are detected.

#### Via Serial (Master Unit)

1. Connect to master unit serial output (USB or UART).
2. Monitor incoming data packets.
3. Parse packets to determine status of each zone.

**Example Serial Output:**
```
SP3121000000000000000E  (Sensor 1 active)
SP3120000000000000000E  (All sensors clear)
SP3121010100000000000E  (Sensors 1, 3, 5 active)
```

### Understanding Detection Behavior

#### Detection Logic

- **Vehicle Arrival:** When distance decreases by 5cm or more below base distance, detection is triggered after a 40ms delay (debounce).
- **Vehicle Departure:** When distance returns to normal (above base - 5cm), detection clears after a 40ms delay.

#### Typical Detection Scenarios

1. **Normal Vehicle Passage:**
   - Vehicle approaches → Distance decreases → Detection triggered → Vehicle passes → Distance returns → Detection clears

2. **Slow or Stopped Vehicle:**
   - Vehicle stops in zone → Detection remains active → Vehicle moves → Detection clears

3. **Multiple Vehicles:**
   - First vehicle detected → Second vehicle enters → Detection remains active → Both vehicles leave → Detection clears

### System Performance

#### Expected Response Times

- **Detection Delay:** ~40-100ms (debounce + processing)
- **Transmission Time:** ~50-200ms (LoRa transmission)
- **Total Latency:** ~100-300ms from vehicle arrival to master unit output

#### Range and Reliability

- **LoRa Range:** Up to several kilometers (line of sight)
- **Reliability:** High (LoRa includes error correction)
- **Interference:** Minimal (433MHz ISM band, license-free)

### Operational Considerations

1. **Weather Conditions:**
   - System operates in most weather conditions.
   - Heavy rain or fog may affect distance sensor accuracy.
   - Monitor system during extreme weather and recalibrate if needed.

2. **Maintenance Windows:**
   - Schedule regular maintenance during low-traffic periods.
   - Coordinate with traffic management if system is critical.

3. **Power Interruptions:**
   - System resumes operation automatically after power restoration.
   - Configuration is stored in EEPROM and persists through power cycles.
   - Allow 10-15 seconds for initialization after power-on.

---

## Maintenance

### Regular Maintenance Schedule

#### Weekly Checks

- [ ] Verify all sensor units are powered and operational
- [ ] Check master unit serial output for expected data
- [ ] Inspect physical mounting for security
- [ ] Clean sensor lenses (TFMini) if dirty

#### Monthly Maintenance

- [ ] Test each sensor unit individually via Bluetooth
- [ ] Verify base distance calibration (may drift over time)
- [ ] Check power supply voltages
- [ ] Inspect cables and connections for damage
- [ ] Review system logs (if available)

#### Quarterly Maintenance

- [ ] Recalibrate base distances if needed
- [ ] Test LoRa communication range
- [ ] Update firmware if new versions are available
- [ ] Comprehensive system test with all sensors
- [ ] Document any changes or issues

### Cleaning Procedures

#### TFMini Sensor Lens

1. **Power off the sensor unit** (safety precaution).
2. Use a soft, lint-free cloth to gently clean the sensor lens.
3. Avoid using harsh chemicals or abrasives.
4. Ensure lens is completely dry before powering on.

#### General Unit Cleaning

1. Power off all units.
2. Use compressed air to remove dust from PCBs and connectors.
3. Wipe exterior surfaces with a damp cloth (if weatherproof).
4. Ensure all units are completely dry before powering on.

### Calibration Procedures

#### When to Recalibrate

- After physical relocation of sensor units
- If detection becomes unreliable
- After significant environmental changes
- As part of regular maintenance

#### Recalibration Steps

1. **Ensure no vehicles in detection zone.**
2. Connect to sensor unit via Bluetooth.
3. Send `Get_Dist,*` to read current distance.
4. If distance is stable and reasonable, send `Set_Base,XXXX,*` with current reading.
5. Test detection with a known object or vehicle.
6. Adjust base distance if needed (slightly higher = less sensitive, lower = more sensitive).

### Firmware Updates

#### When to Update

- When new features are needed
- To fix known bugs or issues
- To improve performance or reliability

#### Update Procedure

1. **Obtain latest firmware** from manufacturer or authorized source.
2. **Backup current configuration:**
   - Note device addresses and base distances
   - These will need to be reconfigured after update
3. **Follow firmware flashing instructions** (see Technical Documentation).
4. **Reconfigure all sensor units** after update.
5. **Test system thoroughly** before returning to service.

### Troubleshooting Records

Keep a maintenance log with:
- Date and time of maintenance
- Issues found and resolved
- Configuration changes made
- Parts replaced
- Firmware updates applied

---

## Troubleshooting

### Common Issues and Solutions

#### Sensor Unit Issues

##### Problem: Sensor unit does not power on

**Possible Causes:**
- Power supply not connected or faulty
- Incorrect voltage (should be 5V DC)
- Short circuit or wiring fault

**Solutions:**
1. Check power supply connection and voltage with multimeter.
2. Verify power supply provides adequate current (minimum 500mA).
3. Inspect wiring for shorts or loose connections.
4. Try a different power supply if available.

##### Problem: Bluetooth connection fails

**Possible Causes:**
- Bluetooth not enabled on your device
- Wrong PIN entered
- Sensor unit Bluetooth not initialized
- Out of range

**Solutions:**
1. Ensure Bluetooth is enabled on your device.
2. Verify PIN is "123456789" (default) or check configured PIN.
3. Wait 10-15 seconds after power-on for Bluetooth initialization.
4. Move closer to sensor unit (Bluetooth range is typically 10 meters).
5. Restart sensor unit if problem persists.

##### Problem: Distance reading is 0 or incorrect

**Possible Causes:**
- TFMini sensor not connected properly
- Sensor pointing at invalid target (too close, too far, or reflective surface)
- Sensor malfunction

**Solutions:**
1. Check TFMini sensor connections (TX/RX may be swapped).
2. Verify sensor is pointing at a valid target (road surface).
3. Check sensor distance range (typically 30cm to 12m).
4. Ensure sensor lens is clean.
5. Test sensor with known distance target.

##### Problem: Vehicle detection not working

**Possible Causes:**
- Base distance not set or set incorrectly
- Sensor not properly aligned
- Detection threshold too high or too low

**Solutions:**
1. Verify base distance is set: Send `Get_Base,*`
2. Recalibrate base distance (see Calibration Procedures).
3. Check sensor alignment (should be perpendicular to road).
4. Test with `Get_Dist,*` while vehicle is present to verify distance changes.
5. Adjust base distance if needed (lower value = more sensitive).

##### Problem: LoRa transmission not working

**Possible Causes:**
- LoRa module not connected properly
- Incorrect device address
- Master unit not receiving (check master unit)

**Solutions:**
1. Check LoRa module connections and power.
2. Verify device address is set correctly: `Get_Dadd,*`
3. Check master unit is powered and configured.
4. Verify LoRa module antenna is connected.
5. Test with LoRa range tester or monitor master unit serial output.

#### Master Unit Issues

##### Problem: Master unit not receiving data from sensors

**Possible Causes:**
- LoRa module not connected
- Incorrect channel configuration
- Sensors out of range
- Sensor addresses not configured

**Solutions:**
1. Verify LoRa module is connected and powered.
2. Check that master unit and sensors are on same channel (0x19 / 435MHz).
3. Verify sensor units are powered and transmitting.
4. Check sensor device addresses are set correctly.
5. Test range (move master unit closer to sensors for testing).
6. Monitor master unit serial output for any received packets.

##### Problem: Serial output not working

**Possible Causes:**
- Serial cable not connected properly
- Incorrect baud rate on receiving device
- USB driver issues

**Solutions:**
1. Check serial/USB cable connections.
2. Verify baud rate is set to 115200 bps on receiving device.
3. Test with serial terminal software (e.g., PuTTY, Arduino Serial Monitor).
4. Check USB drivers if using USB connection.
5. Try different USB port or cable.

##### Problem: Incorrect zone status in output

**Possible Causes:**
- Sensor addresses not matching zone numbers
- Packet parsing error
- Sensor transmitting incorrect data

**Solutions:**
1. Verify sensor addresses match expected zone numbers.
2. Check master unit serial output for raw received packets.
3. Verify sensor units are detecting correctly (test individually).
4. Check for packet format errors in serial output.

#### System-Wide Issues

##### Problem: Intermittent detection or communication

**Possible Causes:**
- Power supply issues
- LoRa interference
- Environmental factors (weather, obstacles)

**Solutions:**
1. Check power supply stability (use multimeter to monitor voltage).
2. Verify LoRa antennas are properly positioned.
3. Check for sources of RF interference.
4. Test during different weather conditions.
5. Verify line-of-sight between sensors and master unit.

##### Problem: False detections

**Possible Causes:**
- Base distance set incorrectly
- Environmental changes (temperature, humidity)
- Debris or objects in sensor field

**Solutions:**
1. Recalibrate base distance.
2. Check sensor field for obstructions.
3. Adjust base distance slightly higher to reduce sensitivity.
4. Clean sensor lens.
5. Verify sensor alignment hasn't shifted.

### Diagnostic Procedures

#### Sensor Unit Diagnostic

1. **Power Test:**
   - Measure voltage at power input (should be 5V ±0.25V).
   - Check current consumption (typically 80-240mA).

2. **Bluetooth Test:**
   - Connect via Bluetooth.
   - Send `Get_Dist,*` - should receive distance reading.
   - Send `Get_Base,*` - should receive stored base distance.
   - Send `Get_Dadd,*` - should receive device address.

3. **Detection Test:**
   - Send `Get_Dist,*` with no vehicle - note distance.
   - Place object in detection zone.
   - Send `Get_Dist,*` again - distance should decrease.
   - Verify detection triggers (observe "Detect..." messages).

#### Master Unit Diagnostic

1. **Power Test:**
   - Measure voltage at power input.
   - Verify stable power supply.

2. **Serial Test:**
   - Connect serial terminal (115200 bps).
   - Power on master unit - should see initialization messages.
   - Monitor for received packets when sensors transmit.

3. **Reception Test:**
   - Power on known-good sensor unit.
   - Trigger detection on sensor.
   - Verify master unit receives and parses packet.
   - Check serial output format.

### Getting Additional Help

If problems persist after trying the solutions above:

1. **Document the Issue:**
   - Note exact symptoms and error messages.
   - Record configuration settings (addresses, base distances).
   - Take photos of connections if helpful.

2. **Check Documentation:**
   - Review Technical Documentation for detailed specifications.
   - Check for firmware updates or known issues.

3. **Contact Support:**
   - Provide detailed problem description.
   - Include system configuration and diagnostic results.
   - Contact information should be in your package or warranty card.

---

## Safety Precautions

### Electrical Safety

1. **Power Off Before Working:**
   - Always power off units before making connections or modifications.
   - Disconnect power supply before handling PCBs or components.

2. **Voltage Levels:**
   - System uses 5V DC (low voltage, but still exercise caution).
   - Do not exceed specified voltage ratings.
   - Use only approved power supplies.

3. **Short Circuit Prevention:**
   - Double-check all connections before applying power.
   - Ensure no bare wires can contact each other or metal surfaces.
   - Use proper wire insulation and strain relief.

### Installation Safety

1. **Working at Height:**
   - Use appropriate safety equipment (harness, hard hat, etc.).
   - Follow local safety regulations for working at height.
   - Have a spotter or assistant when working above ground level.

2. **Traffic Safety:**
   - Coordinate with traffic management when installing in active roadways.
   - Use proper traffic control measures (cones, signs, flaggers).
   - Work during low-traffic periods when possible.
   - Wear high-visibility clothing.

3. **Environmental Hazards:**
   - Be aware of weather conditions (avoid working in severe weather).
   - Watch for overhead power lines.
   - Ensure stable mounting to prevent units from falling.

### Operational Safety

1. **System Reliability:**
   - This system is for monitoring and detection only.
   - Do not rely solely on this system for safety-critical applications without redundancy.
   - Regular maintenance is essential for reliable operation.

2. **RF Exposure:**
   - LoRa modules operate at low power levels.
   - Maintain normal operating distances (no special precautions needed).
   - Follow local regulations for RF transmission equipment.

3. **Data Security:**
   - Change default Bluetooth PIN from "123456789" for security.
   - Be aware that LoRa transmissions are not encrypted by default.
   - Consider security implications for your specific application.

### Maintenance Safety

1. **Power Off:**
   - Always power off before cleaning or maintenance.
   - Allow time for capacitors to discharge.

2. **Component Handling:**
   - Handle PCBs with care to avoid static discharge.
   - Use anti-static precautions when handling components.
   - Do not touch components while powered.

3. **Cleaning:**
   - Use only approved cleaning methods and materials.
   - Ensure units are completely dry before powering on.
   - Do not use water or liquids near powered equipment.

### Disposal

- Follow local regulations for electronic waste disposal.
- Do not dispose of in regular trash.
- Contact local e-waste recycling facilities.
- Remove batteries (if any) before disposal and dispose separately.

---

## Appendix

### A. Command Reference Quick Guide

| Command | Purpose | Example |
|--------|---------|---------|
| `Get_Dist,*` | Read current distance | Response: `150 cm strength: 5000` |
| `Set_Base,XXXX,*` | Set base distance | `Set_Base,0150,*` (sets to 150cm) |
| `Get_Base,*` | Read base distance | Response: `Base\n150` |
| `Set_Dadd,XXXX,*` | Set device address | `Set_Dadd,0003,*` (sets to address 3) |
| `Get_Dadd,*` | Read device address | Response: `Get Device Address\n3` |

### B. Serial Output Format Reference

**Format:** `SP3XX[Z1][Z2][Z3]...[Z16]E`

**Example:** `SP3121000000000000000E`
- `SP`: Start prefix
- `3`: System ID
- `12`: Master ID
- `1`: Zone 1 active (vehicle detected)
- `0`: Zones 2-16 inactive
- `E`: End delimiter

### C. Default Settings

| Parameter | Default Value |
|-----------|---------------|
| Base Distance | 0 cm |
| Device Address | 1 |
| Bluetooth PIN | 123456789 |
| Bluetooth Name | Loop_Sensor_1 |
| Serial Baud Rate | 115200 bps |

### D. Specifications Summary

| Parameter | Value |
|-----------|-------|
| Number of Sensors | Up to 16 per master |
| Detection Range | 30cm - 12m (TFMini) |
| LoRa Range | Up to several km (line of sight) |
| LoRa Frequency | 433MHz (ISM band) |
| Power Consumption | 80-240mA @ 5V |
| Operating Temperature | -10°C to +60°C (typical) |

---

**Document Version:** 1.0  
**Last Updated:** Based on Loop_V2.0.1 system  
**For Technical Details:** See Technical_Documentation.md

---

## Quick Start Checklist

Use this checklist for initial setup:

**Sensor Unit Setup:**
- [ ] Assemble hardware (TFMini, LoRa module)
- [ ] Connect power supply
- [ ] Power on and wait 15 seconds
- [ ] Connect via Bluetooth
- [ ] Test distance reading: `Get_Dist,*`
- [ ] Set base distance: `Set_Base,XXXX,*`
- [ ] Set device address: `Set_Dadd,XXXX,*`
- [ ] Test detection with object
- [ ] Mount at installation location

**Master Unit Setup:**
- [ ] Assemble hardware (LoRa module)
- [ ] Connect serial output
- [ ] Connect power supply
- [ ] Power on and verify initialization
- [ ] Test reception with sensor unit
- [ ] Verify serial output format
- [ ] Mount at installation location

**System Integration:**
- [ ] Configure all sensor units with unique addresses
- [ ] Verify master unit receives from all sensors
- [ ] Connect to traffic control system
- [ ] Test end-to-end operation
- [ ] Document configuration settings
- [ ] Begin normal operation

---

**End of User Manual**

