# Linear Laser v1.0 - Technical Documentation

## Document Information
- **Project**: Linear Laser v1.0
- **Version**: 1.0
- **Target Audience**: Electronics Engineers and Embedded Developers
- **Date**: 2025

---

## Table of Contents
1. [Hardware Technical Documentation](#hardware-technical-documentation)
2. [Firmware / Embedded Software Documentation](#firmware--embedded-software-documentation)
3. [System Specifications](#system-specifications)

---

## Hardware Technical Documentation

### A. System Block Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Linear Laser v1.0 System                 │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐      ┌──────────────┐                      │
│  │   Power      │      │  ESP32      │                      │
│  │   Supply     │──────│ Micro-      │                      │
│  │   (LM2596)   │      │ controller  │                      │
│  └──────────────┘      └──────┬──────┘                      │
│                               │                              │
│                    ┌──────────┴──────────┐                  │
│                    │                     │                  │
│              ┌─────▼─────┐         ┌─────▼─────┐            │
│              │  MCP4822  │         │  Relay    │            │
│              │   DAC     │         │  Control  │            │
│              │  (SPI)    │         │  Board    │            │
│              └─────┬─────┘         └─────┬─────┘            │
│                    │                     │                  │
│         ┌───────────┴───────────┐        │                  │
│         │                       │        │                  │
│    ┌────▼────┐            ┌────▼────┐  │                  │
│    │ Galvo   │            │ Galvo   │  │                  │
│    │ Motor X │            │ Motor Y │  │                  │
│    │ Driver  │            │ Driver  │  │                  │
│    └────┬────┘            └────┬────┘  │                  │
│         │                       │        │                  │
│    ┌────▼────┐            ┌────▼────┐  │                  │
│    │ Mirror  │            │ Mirror  │  │                  │
│    │   X     │            │   Y     │  │                  │
│    └─────────┘            └─────────┘  │                  │
│         │                       │        │                  │
│         └───────────┬───────────┘        │                  │
│                     │                    │                  │
│              ┌──────▼───────┐           │                  │
│              │   Laser      │◄───────────┘                  │
│              │   Diode      │                                │
│              │   Module     │                                │
│              └──────────────┘                                │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### B. Galvanometer Motor Control Circuitry

The system uses two independent galvanometer motors (galvos) for X and Y axis control. Each galvo motor is driven by a dedicated driver circuit that receives analog control signals from the DAC.

#### Control Signal Path:
1. **ESP32 Microcontroller** → Generates digital control data
2. **MCP4822 DAC** → Converts digital data to analog voltage (0-4.096V in high gain mode)
3. **Signal Conditioning** → Amplifies/conditions DAC output for galvo driver
4. **Galvo Driver Circuit** → Converts control voltage to motor current
5. **Galvanometer Motor** → Rotates mirror based on control signal

#### Key Components:
- **MCP4822-E/SN**: 12-bit dual-channel DAC
  - Channel A: X-axis control
  - Channel B: Y-axis control
  - SPI interface (CS pin: GPIO 5)
  - High gain mode: 0-4.096V output range
  - Resolution: 12-bit (4096 steps)

#### Galvo Power Supply:
- **±15V Power Rails**: Required for galvo driver circuits
- Separate power supplies for each galvo controller
- Power controlled via relay modules

### C. Laser Driver Circuit Design

The laser module is controlled through a relay-based switching system:

#### Laser Control:
- **Relay Control**: GPIO 32 (Laser_Relay)
- **Function**: ON/OFF control of laser power supply
- **Safety**: Relay provides electrical isolation
- **Control Method**: Digital HIGH/LOW signal from ESP32

#### Laser Power Supply:
- External power supply module
- Controlled via relay contact closure
- No intensity modulation implemented in v1.0 (binary ON/OFF only)

### D. Microcontroller Selection and Pin Mapping

#### Microcontroller: ESP32
- **Model**: ESP32 (ESP8266 compatible code also available)
- **Architecture**: 32-bit dual-core Xtensa LX6
- **Clock Speed**: 240 MHz (default)
- **Flash Memory**: External (varies by module)
- **RAM**: 520 KB SRAM
- **WiFi**: 802.11 b/g/n (2.4 GHz)
- **GPIO**: Multiple configurable pins

#### Pin Mapping:

| Function | GPIO Pin | Direction | Description |
|----------|----------|-----------|-------------|
| Laser Relay | 32 | OUTPUT | Laser ON/OFF control |
| Galvo Controller 1 Relay | 33 | OUTPUT | X-axis galvo power |
| Galvo Controller 2 Relay | 25 | OUTPUT | Y-axis galvo power |
| Main Controller Relay | 26 | OUTPUT | Main system power |
| PC Controller Relay | 27 | OUTPUT | PC power control |
| DAC Chip Select (CS) | 5 | OUTPUT | SPI CS for MCP4822 |
| SPI MOSI | 23 | OUTPUT | SPI data line (default) |
| SPI SCK | 18 | OUTPUT | SPI clock (default) |
| Serial TX | 1 | OUTPUT | UART transmit |
| Serial RX | 3 | INPUT | UART receive |

#### SPI Configuration:
- **Protocol**: SPI (Serial Peripheral Interface)
- **Mode**: Mode 0 (CPOL=0, CPHA=0)
- **Clock Speed**: Determined by ESP32 SPI library defaults
- **Bit Order**: MSB first
- **Chip Select**: GPIO 5 (active LOW)

### E. Power Supply Design and Protection

#### Power Supply Architecture:

1. **Main Power Supply PCB**
   - **Regulator**: LM2596 switching regulator
   - **Input**: External DC input (voltage range depends on LM2596 variant)
   - **Output**: Multiple regulated voltages for system components

2. **Voltage Rails**:
   - **+5V**: ESP32, MCP4822 DAC, relay coils
   - **+15V**: Galvo driver circuits (positive rail)
   - **-15V**: Galvo driver circuits (negative rail)
   - **Laser Power**: External supply via relay

3. **Protection Features**:
   - Relay-based power switching for safety
   - Separate power control for each subsystem
   - Electrical isolation between control and power circuits

#### Power Control Relays:
- **Laser Relay** (GPIO 32): Controls laser power supply
- **Galvo Controller 1 Relay** (GPIO 33): X-axis galvo power
- **Galvo Controller 2 Relay** (GPIO 25): Y-axis galvo power
- **Main Controller Relay** (GPIO 26): Main system power
- **PC Controller Relay** (GPIO 27): PC power control

### F. Signal Conditioning and DAC/PWM Usage

#### DAC Implementation:
- **Device**: MCP4822 12-bit dual-channel DAC
- **Interface**: SPI (3-wire: MOSI, SCK, CS)
- **Resolution**: 12-bit (4096 discrete levels)
- **Output Range**: 
  - Low gain: 0-2.048V
  - High gain: 0-4.096V (used in firmware)
- **Update Rate**: Limited by SPI speed and firmware loop timing

#### Signal Conditioning:
- DAC output may require amplification/buffering before galvo drivers
- Galvo drivers typically require ±10V or ±15V input range
- Op-amp circuits (ILDA standard) may be used for signal conditioning
- PCB includes ILDA op-amp section for signal processing

#### Coordinate System:
- **Center Point**: 2040 (DAC value, approximately mid-scale)
- **X-axis Range**: Center ± 270 steps (circle mode)
- **Y-axis Range**: Center ± 2000 steps (circle mode)
- **Line Mode**: Continuous voltage sweep from 0 to maximum

### G. PCB Layout Considerations

#### Board Specifications:
- **Board Size**: 134.874mm × 101.473mm
- **Layer Count**: 2 layers (Top and Bottom)
- **Components**: 134 total components
- **Vias**: 114 plated vias (0.7112mm diameter)
- **Copper Coverage**: 
  - Top layer: 68% (9267.544 mm²)
  - Bottom layer: 16% (2170.219 mm²)

#### Layout Features:
- **Power Planes**: Dedicated power distribution
- **Ground Planes**: Continuous ground for signal integrity
- **Signal Routing**: 
  - Analog signals (DAC outputs) separated from digital
  - SPI signals kept short with proper termination
  - Power traces sized appropriately for current requirements

#### Component Placement:
- **Controller Section**: ESP32 and supporting components
- **Galvo Controller Section**: Separate area for galvo driver circuits
- **ILDA Op-amp Section**: Signal conditioning circuits
- **Power Supply Section**: Regulators and filtering

### H. Safety Considerations for Laser Hardware

#### Laser Safety:
1. **Class Compliance**: Ensure laser module meets appropriate safety class (typically Class 3R or Class 4)
2. **Eye Protection**: Always use appropriate laser safety glasses
3. **Interlock Systems**: Consider adding hardware interlocks for safety
4. **Power Limiting**: Relay control allows emergency shutdown
5. **Beam Enclosure**: Laser beam should be enclosed or properly terminated

#### Electrical Safety:
1. **Isolation**: Relay-based control provides electrical isolation
2. **Grounding**: Proper grounding of all metal chassis components
3. **Power Ratings**: Ensure all components rated for maximum operating conditions
4. **Fusing**: Appropriate fusing on power supply inputs
5. **Ventilation**: Adequate cooling for power components

#### Operational Safety:
1. **Startup Sequence**: Controlled power-up sequence via relays
2. **Emergency Stop**: Ability to disable all systems quickly
3. **Warning Labels**: Appropriate warning labels on laser output
4. **Access Control**: Prevent unauthorized access during operation

---

## Firmware / Embedded Software Documentation

### A. Firmware Architecture

#### Development Platform:
- **IDE**: Arduino IDE
- **Framework**: Arduino/ESP32 Core
- **Language**: C++ (Arduino-style)
- **Libraries Used**:
  - `MCP48xx.h`: MCP4822 DAC control library
  - `WiFi.h`: ESP32 WiFi functionality
  - `ESPAsyncWebServer.h`: Async web server
  - `ESPDash.h`: Web dashboard interface

#### Code Structure:
```
LaserController.ino
├── Includes and Library Declarations
├── Hardware Pin Definitions
├── Global Variables
├── setup()
│   ├── GPIO Configuration
│   ├── Serial Initialization
│   ├── DAC Initialization
│   └── WiFi/Web Server Setup
└── loop()
    ├── Shape Generation Logic
    ├── DAC Update
    └── Web Dashboard Callbacks
```

#### Firmware Versions:
1. **Linear_Laser_ControllerV1**: Basic line generation
2. **Linear_Laser_ControllerV1(dashed line)**: Dashed line mode with timing
3. **Linear_Laser_Controller(Circule)**: Circle generation only
4. **Linear_Laser_ControllerV2**: Multi-mode (line, dashed line, circle)

### B. Galvo Control Algorithms

#### Coordinate System:
- **Origin**: DAC value 2040 (center position)
- **X-axis**: Channel A of MCP4822
- **Y-axis**: Channel B of MCP4822
- **Resolution**: 12-bit (0-4095 DAC values)

#### Control Method:
1. **Digital Calculation**: Compute desired X/Y coordinates
2. **DAC Update**: Write values to MCP4822 via SPI
3. **Continuous Loop**: Update at maximum rate for smooth motion

#### Update Process:
```cpp
dac.setVoltageA(x_value);  // Set X-axis position
dac.setVoltageB(y_value);  // Set Y-axis position
dac.updateDAC();           // Send to DAC via SPI
```

### C. Line and Circle Trajectory Generation Logic

#### Line Generation (Mode 0):
```cpp
// X-axis: Linear sweep
voltage2 = voltage2 + 3.8;  // Increment X
if (voltage2 * 2 >= Time2) {
    voltage2 = 1;  // Reset to start
}

// Y-axis: Controlled by slider
voltage = Time;  // Y position from slider (0-2500)
```

**Algorithm**:
- X-axis sweeps continuously from 1 to Time2/2
- Y-axis position controlled by user slider (0-100 → 0-2500)
- Creates horizontal line pattern
- Update rate: Limited by loop() execution speed

#### Dashed Line Generation (Mode 1):
Similar to line mode but with periodic delays:
```cpp
flag = flag + 1;
if (flag == 100 || flag == 200 || ...) {
    delay(5);  // Create gaps in line
}
if (flag == 600) {
    flag = 0;  // Reset
}
```

**Algorithm**:
- Same X/Y sweep as line mode
- Periodic delays create dashed effect
- Flag counter controls dash pattern

#### Circle Generation (Mode 3):
```cpp
for (times = 0; times < 15; times++) {
    for (int grad = 0; grad < 360; grad = grad + 5) {
        float rad = 2 * pi * (grad / 360.0);
        valx = cos(rad) * 270 + 2040;  // X: ±270 steps
        valy = sin(rad) * 2000 + 2040; // Y: ±2000 steps
        dac.setVoltageA(valx);
        dac.setVoltageB(valy);
        dac.updateDAC();
    }
}
```

**Algorithm**:
- Parametric circle equation using trigonometry
- 72 points per circle (360° / 5° steps)
- 15 complete circles per execution
- Elliptical shape: 270 steps X, 2000 steps Y
- Center: 2040 (mid-scale)

### D. Timing, Resolution, and Calibration Approach

#### Timing Characteristics:
- **Loop Execution**: Variable, depends on WiFi processing
- **DAC Update**: ~microseconds per SPI transaction
- **Circle Points**: 72 points × 15 repetitions = 1080 updates
- **Line Sweep**: Continuous, no fixed timing
- **WiFi Processing**: Async, non-blocking

#### Resolution:
- **DAC Resolution**: 12-bit (4096 levels)
- **Effective Resolution**: Limited by galvo driver characteristics
- **Angular Resolution**: Depends on galvo motor specifications
- **Spatial Resolution**: Depends on projection distance and galvo angle

#### Calibration:
**Current Implementation**:
- Hard-coded center point: 2040
- Hard-coded circle radius: 270 (X), 2000 (Y)
- No automatic calibration in firmware

**Recommended Calibration Process**:
1. **Center Calibration**: 
   - Set both axes to 2040
   - Adjust galvo mirrors to center beam
   - Fine-tune if needed

2. **Scale Calibration**:
   - Measure actual beam deflection vs. DAC value
   - Calculate scaling factors
   - Adjust circle/line parameters

3. **Linearity Check**:
   - Verify linear response across full range
   - Compensate for non-linearity if present

### E. Motor Control Signals and Update Rates

#### Signal Characteristics:
- **Format**: Analog voltage (0-4.096V)
- **Source**: MCP4822 DAC output
- **Update Method**: SPI write to DAC
- **Refresh Rate**: Variable, typically 1-10 kHz depending on mode

#### Update Rates by Mode:
- **Line Mode**: Continuous sweep, ~1-5 kHz effective rate
- **Circle Mode**: 72 points per circle, ~1-10 kHz per point
- **Dashed Line**: Similar to line mode with interruptions

#### Signal Path Latency:
1. Firmware calculation: <1 μs
2. SPI transfer to DAC: ~10-50 μs
3. DAC settling time: <10 μs
4. Signal conditioning: <1 μs
5. Galvo driver response: Depends on driver (typically <1 ms)
6. **Total**: <2 ms typical end-to-end

### F. Laser On/Off and Intensity Control

#### Laser Control:
- **Method**: Relay-based ON/OFF switching
- **Control Pin**: GPIO 32
- **Logic**: 
  - HIGH = Laser ON
  - LOW = Laser OFF

#### Current Implementation:
- **Intensity**: Binary only (ON/OFF)
- **No PWM**: No pulse-width modulation for intensity
- **No Analog Control**: No variable intensity

#### Control Methods:
1. **Web Dashboard**: Button control via ESP-Dash
2. **Serial Command**: Commented out in code (can be enabled)
3. **Programmatic**: Direct GPIO control in firmware

#### Future Enhancement Possibilities:
- PWM-based intensity control
- Analog intensity modulation
- Blanking control for precise timing

### G. Firmware Build, Flashing, and Debugging Procedures

#### Build Requirements:
1. **Arduino IDE**: Version 1.8.x or 2.x
2. **ESP32 Board Support**:
   - Add ESP32 board manager URL
   - Install ESP32 board package
3. **Required Libraries**:
   - MCP48xx (for DAC control)
   - ESPAsyncWebServer
   - ESPDash
   - AsyncTCP (ESP32)

#### Build Steps:
1. Open `LaserController.ino` in Arduino IDE
2. Select board: **Tools → Board → ESP32 Dev Module**
3. Select port: **Tools → Port → [COM port]**
4. Configure settings:
   - Upload Speed: 115200
   - CPU Frequency: 240 MHz
   - Flash Frequency: 80 MHz
   - Flash Size: As per your module
5. Click **Verify** to compile
6. Click **Upload** to flash

#### Flashing Procedure:
1. **Hardware Setup**:
   - Connect ESP32 via USB
   - Ensure proper drivers installed
   - Put ESP32 in download mode (if required)

2. **Software Steps**:
   - Select correct COM port
   - Click Upload in Arduino IDE
   - Wait for compilation and upload
   - Monitor serial output at 115200 baud

3. **Verification**:
   - Open Serial Monitor (115200 baud)
   - Check for "Pc on" message
   - Verify WiFi AP "Laser" appears
   - Connect to web dashboard at 192.168.4.1

#### Debugging:

**Serial Debugging**:
```cpp
Serial.begin(115200);
Serial.println("Debug message");
```

**Common Issues**:
1. **DAC not responding**: Check SPI connections, CS pin
2. **WiFi not starting**: Check antenna connection, power
3. **Relays not switching**: Check GPIO pin assignments, power supply
4. **Shapes not appearing**: Check galvo power, DAC output, mirror alignment

**Debugging Tools**:
- Serial Monitor: Text output
- Web Dashboard: Real-time control and status
- Oscilloscope: Verify DAC output signals
- Multimeter: Check power rails and signals

#### Configuration:
- **WiFi SSID**: "Laser" (default)
- **WiFi Password**: "123456789" (V1) or "987654321" (V2)
- **IP Address**: 192.168.4.1 (AP mode)
- **Web Server Port**: 80

---

## System Specifications

### Electrical Specifications:
- **Operating Voltage**: 5V (ESP32, DAC, relays)
- **Galvo Power**: ±15V
- **Laser Power**: External supply (via relay)
- **Current Consumption**: 
  - ESP32: ~80-240 mA (depending on WiFi activity)
  - DAC: ~1-5 mA
  - Relays: ~20-50 mA per relay coil
  - Total: ~200-500 mA typical

### Performance Specifications:
- **DAC Resolution**: 12-bit (4096 steps)
- **DAC Output Range**: 0-4.096V (high gain)
- **Update Rate**: 1-10 kHz (variable)
- **Coordinate Range**: 
  - X: Center ± 270 steps
  - Y: Center ± 2000 steps
- **Circle Points**: 72 points per circle
- **Line Sweep**: Continuous, user-controlled

### Mechanical Specifications:
- **PCB Size**: 134.874mm × 101.473mm
- **Mounting**: Standard PCB mounting holes
- **Connectors**: Various connectors for power, signals, galvo drivers

### Environmental Specifications:
- **Operating Temperature**: 0-40°C (typical for ESP32)
- **Storage Temperature**: -20 to 70°C
- **Humidity**: Non-condensing

---

## References

- MCP4822 Datasheet: Microchip Technology
- ESP32 Technical Reference Manual: Espressif Systems
- LM2596 Datasheet: Texas Instruments / ON Semiconductor
- ILDA Standard: International Laser Display Association
- Arduino ESP32 Core Documentation

---

**End of Technical Documentation**

