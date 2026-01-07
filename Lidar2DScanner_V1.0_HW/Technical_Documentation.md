# LADAR v1 - Technical Documentation

## Table of Contents
1. [Hardware Technical Documentation](#hardware-technical-documentation)
2. [Firmware / Embedded Software Documentation](#firmware--embedded-software-documentation)

---

## Hardware Technical Documentation

### System Block Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    LADAR v1 System                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐    ┌──────────────┐    ┌─────────────┐ │
│  │   STM32F105  │◄───►│  ESP8266/    │◄───►│   Web       │ │
│  │  Microcontroller│    │  HLK RM04   │    │  Interface  │ │
│  └──────┬───────┘    └──────────────┘    └─────────────┘ │
│         │                                                  │
│         ├──► USART2 (1Mbps) ──► LiDAR Distance Sensor      │
│         ├──► I2C1 ──► MPU6050 IMU                          │
│         ├──► I2C1 ──► AT24Cxx EEPROM                      │
│         ├──► GPIO ──► DRV8825 Stepper Driver (Theta)     │
│         ├──► GPIO ──► DRV8825 Stepper Driver (Phi)       │
│         ├──► GPIO ──► Optocoupler Home Sensors            │
│         └──► GPIO ──► Digital Output Signals              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Two-Axis Scanning Mechanism Overview

The LADAR v1 system implements a two-axis scanning mechanism:

1. **Theta Axis (Horizontal/Azimuth)**: 
   - Controls horizontal rotation (azimuth angle)
   - Full range: 0 to 32000 steps (approximately 360°)
   - Uses DRV8825 stepper motor driver
   - Home position detected via optocoupler sensor on PB3

2. **Phi Axis (Vertical/Elevation)**:
   - Controls vertical rotation (elevation angle)
   - Range: 0 to 1800+ steps (configurable)
   - Uses DRV8825 stepper motor driver
   - Home position detected via optocoupler sensor on PB4

**Mechanical Configuration:**
- Stepper motors are driven by DRV8825 drivers
- Microstepping modes: 1, 2, 4, 8, 16, 32 (configurable per axis)
- Optocoupler sensors provide home position reference
- Scanning pattern: Raster scan (theta sweeps, phi increments)

### Distance Sensor Selection and Interfacing

**Sensor Type:** LiDAR Distance Sensor (TF-Luna or compatible)

**Interface Specifications:**
- **Communication:** UART (USART2)
- **Baud Rate:** 1,000,000 bps (1 Mbps)
- **Data Format:** 
  - Header: 0x59 0x59
  - Distance: 2 bytes (little-endian), units in cm
  - Strength: 2 bytes (signal strength)
  - Checksum: 1 byte (sum of first 8 bytes, LSB)
  - Total packet: 9 bytes

**Data Processing:**
- Distance readings are averaged over 4 samples for noise reduction
- Invalid readings (>18000 cm) are filtered
- Distance values stored in cm

**Pin Mapping:**
- USART2_TX: PA2
- USART2_RX: PA3

### Microcontroller Selection and Pin Mapping

**MCU:** STM32F105RC (ARM Cortex-M3, 72 MHz)

**Key Peripherals:**

| Peripheral | Function | Pins |
|------------|----------|------|
| USART1 | Communication/Web Interface | PB6 (TX), PB7 (RX), 115200 baud |
| USART2 | LiDAR Sensor | PA2 (TX), PA3 (RX), 1000000 baud |
| I2C1 | MPU6050, EEPROM | PB8 (SCL), PB9 (SDA) |
| TIM5 | Microsecond delay timer | - |
| TIM7 | System tick timer | - |
| GPIO | Motor control, sensors, outputs | See detailed mapping below |

**GPIO Pin Mapping:**

**Motor Control - Theta Axis:**
- PC4: DIR1 (Direction)
- PC5: STP1 (Step pulse)
- PB13: M10 (Microstep mode bit 0)
- PB14: M11 (Microstep mode bit 1)
- PB15: M12 (Microstep mode bit 2)
- PC10: M1_RST (Reset/Enable)

**Motor Control - Phi Axis:**
- PB0: DIR2 (Direction)
- PB1: STP2 (Step pulse)
- PC7: M20 (Microstep mode bit 0)
- PC8: M21 (Microstep mode bit 1)
- PC9: M22 (Microstep mode bit 2)
- PC6: ME2 (Enable)
- PA15: M2_RST (Reset)

**Sensors:**
- PB3: Opto1 (Theta home sensor, active high)
- PB4: Opto2 (Phi home sensor, active high)
- PB5: GY_PWR (MPU6050 power control)

**Status/Control:**
- PC13: LEDOnBoard (Status LED)
- PB11: Digital output control (GPIO_PIN_11)
- PC1: Laser control (optional)

### Power Supply Design and Protection

**Power Requirements:**
- Main supply: External DC power supply (voltage not specified in code, typical 12-24V for stepper motors)
- MCU supply: 3.3V (likely from onboard regulator)
- Motor drivers: Separate power domain for DRV8825 drivers

**Protection Features:**
- Reset pins (M1_RST, M2_RST) for motor driver protection
- Enable/Disable control for motor drivers
- Power control for MPU6050 (GY_PWR)

**Power Management:**
- Motor drivers can be disabled via `Drv_Dinit()` function
- Individual axis enable/disable available

### Communication Interfaces

**1. USART1 - Main Communication Interface**
- **Baud Rate:** 115200
- **Purpose:** Command interface, data output, web interface bridge
- **Protocol:** ASCII-based command protocol (see Firmware section)
- **Format:** Commands are 9 bytes: `[CMD][OP][VAL][VAL][VAL][VAL][VAL][*][,]`
- **Connection:** Typically connected to ESP8266 or HLK RM04 module for web interface

**2. USART2 - LiDAR Sensor Interface**
- **Baud Rate:** 1,000,000 (1 Mbps)
- **Purpose:** High-speed distance measurement data
- **Protocol:** Binary protocol (see Distance Sensor section)

**3. I2C1 - Sensor and Storage Interface**
- **Clock Speed:** Standard mode (100 kHz typical)
- **Devices:**
  - MPU6050 (Address: 0xD0)
  - AT24Cxx EEPROM (Address: 0xA0)

### Digital Output Circuitry (0/1 Logic)

**Digital Outputs:**
- **PB11:** General purpose digital output (GPIO_PIN_11)
  - Logic 0: GPIO_PIN_RESET
  - Logic 1: GPIO_PIN_SET
  - Used for external control systems (relays, indicators, etc.)

**Output Control:**
- Controlled via `HAL_GPIO_WritePin()` function
- Can be toggled via `HAL_GPIO_TogglePin()`
- Standard 3.3V CMOS logic levels

### PCB Layout Considerations

**Board Structure:**
- **Up_Board:** Main control board with STM32F105, motor drivers, sensors
- **Down_Board:** Power supply and auxiliary circuits

**Key Layout Considerations:**
- Motor driver power traces should be wide and isolated
- Digital and analog grounds should be separated
- High-speed UART2 traces should be kept short
- I2C pull-up resistors required (typically 4.7kΩ)
- Stepper motor step pulses require clean signal integrity
- Optocoupler sensors need proper pull-up configuration

**Component Placement:**
- Motor drivers (DRV8825) should be positioned near stepper motor connectors
- Heat sinking may be required for motor drivers
- MCU should be positioned to minimize trace lengths to critical peripherals
- EEPROM and MPU6050 can be placed near MCU for short I2C traces

---

## Firmware / Embedded Software Documentation

### Firmware Architecture

**Development Environment:**
- **IDE:** Keil MDK-ARM (µVision)
- **Framework:** STM32 HAL (Hardware Abstraction Layer)
- **RTOS:** FreeRTOS (in V2_RTOS version)
- **MCU:** STM32F105RC
- **Clock Configuration:** 72 MHz system clock (HSE with PLL)

**Code Structure:**

```
DGS_Scanner_RTOS_V1/
├── Core/
│   ├── Inc/          # Header files (main.h, gpio.h, usart.h, etc.)
│   └── Src/          # Source files (main.c, gpio.c, usart.c, etc.)
├── Drivers/          # STM32 HAL drivers
├── Middlewares/      # FreeRTOS middleware
├── Drv2855/          # Motor driver control module
├── Mpu6050/          # IMU sensor driver
├── AT24Cxx/          # EEPROM driver
├── UartConfig/       # UART communication utilities
└── RealTime/         # RTC time functions
```

**Version Information:**
- **DRV8825_V1:** Initial version (non-RTOS)
- **DRV8825_V2:** Enhanced version (non-RTOS)
- **V2_RTOS:** FreeRTOS-based version (recommended)

### Scanning and Distance Acquisition Algorithm

**Distance Reading Process:**

1. **Single Reading (`Read_Range()`):**
   ```c
   - Receive 10 bytes from USART2
   - Verify header (0x59 0x59)
   - Calculate checksum
   - Extract distance (bytes 2-3, little-endian)
   - Extract strength (bytes 4-5)
   - Filter invalid readings (>18000 cm)
   ```

2. **Averaged Reading (`Get_Dist()`):**
   ```c
   - Perform 4 sequential Read_Range() calls
   - Average the 4 distance values
   - Return averaged distance
   ```

**Scanning Algorithm:**

The system performs raster scanning:
1. Initialize to home position (both axes)
2. Set starting angles (theta_start, phi_start)
3. For each phi position:
   - Sweep theta from theta_start to theta_end
   - At each theta step:
     - Read distance measurement
     - Compare with base/reference value
     - Detect presence if threshold exceeded
     - Output data via USART1
   - Increment phi by dande_phi steps
4. Repeat scanning cycle

**Scanning Parameters:**
- `theta_start`: Starting theta position (default: 4000)
- `theta_end`: Ending theta position (default: 32000, ~360°)
- `phi_start`: Starting phi position (default: 1800)
- `phi_end`: Ending phi position (configurable)
- `dande_theta`: Theta step size (default: 5)
- `dande_phi`: Phi step size (default: 2)

### Coordinate Handling and Detection Logic

**Coordinate System:**
- **Spherical Coordinates:** (R, θ, φ)
  - R: Distance (cm) from LiDAR sensor
  - θ: Theta angle (azimuth, horizontal)
  - φ: Phi angle (elevation, vertical)

**Coordinate Conversion:**
- Theta steps to angle: `angle = (theta_steps / 32000) * 360°`
- Phi steps to angle: `angle = (phi_steps / 22400) * 360°` (approximate)
- Spherical to Cartesian conversion (for visualization):
  ```python
  x = R * cos(θ)
  y = R * sin(θ)
  z = R * sin(φ)  # if 3D conversion needed
  ```

**Detection Algorithm:**

1. **Base/Reference Acquisition:**
   - Command: `S#BASE *`
   - Scans empty area to establish baseline distances
   - Stores reference distance map

2. **Scanning and Comparison:**
   - Command: `S#SCAN *`
   - At each scan point:
     - Read current distance
     - Compare with stored base value
     - Calculate difference: `Δ = |current - base|`
     - If `Δ > threshold`: Presence detected
     - Set digital output accordingly

3. **Threshold Parameters:**
   - `Delta_Z`: Distance threshold (default: 10 cm)
   - `Dteta`: Theta threshold (default: 1500 steps)
   - Configurable via UART commands

**Presence Detection:**
- When distance deviation exceeds threshold, system triggers:
  - Digital output signal (PB11)
  - Data output via USART1
  - Optional alert flag

### Web Server / Web Interface Implementation

**Architecture:**
The web interface is provided through an external module (ESP8266 or HLK RM04) that bridges UART to Ethernet/WiFi.

**Communication Flow:**
```
Web Browser ←→ ESP8266/HLK RM04 ←→ USART1 (115200) ←→ STM32F105
```

**Protocol:**
The STM32 communicates via ASCII commands over USART1. The bridge module translates HTTP requests to UART commands and vice versa.

**Data Format:**
- Commands: 9-byte ASCII strings
- Responses: Variable-length ASCII strings
- Data output: CSV format `theta,distance\n`

### Configuration Parameters (Threshold, Base Value)

**Configuration Storage:**
- **EEPROM:** AT24Cxx (I2C address 0xA0)
- **Storage Locations:**
  - Address 4900-4901: Zinstall (installation height)
  - Address 5000-5001: jj (phi calibration offset)
  - Address 5100-5101: phi_end (ending phi position)

**Configurable Parameters:**

| Parameter | Command | Description | Default |
|-----------|---------|-------------|---------|
| Zinstall | `Z#<val>*` | Installation height (cm) | Stored in EEPROM |
| phi_end | `O#<val>*` | Ending phi position | Stored in EEPROM |
| jj (calibration) | `J#<val>*` | Phi calibration offset | Stored in EEPROM |
| Delta_Z | `W#<val>*` | Distance threshold (cm) | 10 |
| Dteta | `U#<val>*` | Theta threshold (steps) | 1500 |
| theta_start | `T#<val>*` | Starting theta position | 4000 |
| theta_end | `P#<val>*` | Ending theta position | 32000 |
| phi_start | `A#<val>*` | Starting phi position | 1800 |
| dande_theta | `D#<val>*` | Theta step size | 5 |
| dande_phi | `d#<val>*` | Phi step size | 2 |

**Query Commands:**
- Append `?` instead of `#` to query current value
- Example: `Z?*****` returns current Zinstall value

### Data Format and Web Communication Protocol

**Command Format:**
```
[CMD][OP][VAL][VAL][VAL][VAL][VAL][*][,]
 │     │    │                        │  │
 │     │    └─ 5-digit value        │  └─ Terminator
 │     │                             └─ Separator
 │     └─ Operation (# = set, ? = query)
 └─ Command letter
```

**Example Commands:**
- `H+00100*` - Move theta +100 steps
- `V-00050*` - Move phi -50 steps
- `S#START*` - Start scanning
- `GOHOME *` - Go to home position
- `QIST*****` - Query instant distance
- `Z#01234*` - Set Zinstall to 1234
- `Z?*****` - Query Zinstall value

**Data Output Format:**
- **Scan Data:** `theta,distance\n`
  - Example: `1500,1234\n`
- **Status Messages:** Plain text with `\r\n` termination
- **Error Handling:** Error messages returned as text

**Response Format:**
- Successful command: Echo of command + `\n`
- Query response: Value as 5-digit number
- Data stream: Continuous `theta,distance\n` pairs

### Digital Output Control Logic

**Output Pin:** PB11 (GPIO_PIN_11)

**Control Functions:**
```c
// Set output HIGH (logic 1)
HAL_GPIO_WritePin(GPIOB, GPIO_PIN_11, GPIO_PIN_SET);

// Set output LOW (logic 0)
HAL_GPIO_WritePin(GPIOB, GPIO_PIN_11, GPIO_PIN_RESET);

// Toggle output
HAL_GPIO_TogglePin(GPIOB, GPIO_PIN_11);
```

**Control Logic:**
- Output is set HIGH when presence is detected
- Output is set LOW when no presence detected
- Can be manually controlled via commands
- Used for external systems (relays, PLCs, etc.)

### Firmware Build, Flashing, and Debugging Procedures

**Build Environment Setup:**

1. **Install Keil MDK-ARM:**
   - Download and install Keil MDK-ARM (version 5.x or later)
   - Install STM32F1xx Device Family Pack (DFP)

2. **Open Project:**
   - Navigate to: `Code/Scanner_Code/V2_RTOS/Scanner/DGS_Scanner_RTOS_V1/MDK-ARM/`
   - Open `DGS_Scanner_RTOS_V1.uvprojx`

3. **Build Configuration:**
   - Select target: STM32F105RC
   - Build mode: Release or Debug
   - Compiler: ARM Compiler v5/v6

4. **Build Process:**
   - Project → Build Target (F7)
   - Output: `DGS_Scanner_RTOS_V1.hex` or `.bin`

**Flashing Procedure:**

1. **Hardware Connection:**
   - Connect ST-Link or compatible programmer
   - Connect to SWD interface (SWDIO, SWCLK, GND, 3.3V)

2. **Using Keil:**
   - Flash → Download (F8)
   - Verify flash after programming

3. **Using ST-Link Utility:**
   - Open ST-Link Utility
   - Connect to target
   - Load `.hex` or `.bin` file
   - Program & Verify

4. **Using OpenOCD:**
   ```bash
   openocd -f interface/stlink.cfg -f target/stm32f1x.cfg
   # In another terminal:
   telnet localhost 4444
   > flash write_image erase DGS_Scanner_RTOS_V1.hex
   > reset
   ```

**Debugging:**

1. **Keil Debugger:**
   - Debug → Start/Stop Debug Session (F5)
   - Set breakpoints in code
   - View variables, registers, memory
   - Step through code (F10, F11)

2. **ST-Link Debugger:**
   - Use ST-Link Utility or GDB
   - Configure for SWD interface
   - Set breakpoints and watchpoints

3. **Serial Debug Output:**
   - Connect to USART1 (PB6/PB7)
   - Configure terminal: 115200, 8N1
   - Monitor command responses and data

**Common Issues:**

1. **Build Errors:**
   - Verify all source files are included
   - Check include paths in project settings
   - Ensure HAL library is properly linked

2. **Flash Errors:**
   - Verify ST-Link connection
   - Check target power supply
   - Ensure boot mode is correct (BOOT0 = 0)

3. **Runtime Issues:**
   - Check system clock configuration
   - Verify peripheral initialization order
   - Monitor serial output for error messages
   - Use debugger to step through initialization

**Version Control:**
- Recommended firmware: V2_RTOS (FreeRTOS version)
- Provides better real-time performance
- Supports concurrent tasks (scanning + communication)

---

## Appendix

### Command Reference

| Command | Format | Description |
|---------|--------|-------------|
| Horizontal Move | `H+<steps>*` or `H-<steps>*` | Move theta axis |
| Vertical Move | `V+<steps>*` or `V-<steps>*` | Move phi axis |
| Start Scan | `S#START*` | Begin scanning operation |
| Base Scan | `S#BASE *` | Acquire baseline reference |
| Go Home | `GOHOME *` | Return to home position |
| Query Distance | `QIST*****` | Get instant distance reading |
| Set Zinstall | `Z#<val>*` | Set installation height |
| Query Zinstall | `Z?*****` | Get installation height |
| Set phi_end | `O#<val>*` | Set ending phi position |
| Set Delta_Z | `W#<val>*` | Set distance threshold |
| Set Dteta | `U#<val>*` | Set theta threshold |
| Set theta_start | `T#<val>*` | Set starting theta |
| Set theta_end | `P#<val>*` | Set ending theta |
| Set phi_start | `A#<val>*` | Set starting phi |
| Set dande_theta | `D#<val>*` | Set theta step size |
| Set dande_phi | `d#<val>*` | Set phi step size |
| Reset | `RRRRRR*` | System reset |
| Get Time | `GETTIME*` | Get RTC time |
| Get ADXL | `GETADXL*` | Get MPU6050 data |
| Laser Toggle | `LASERPT*` | Toggle laser |
| Driver Disable | `DRVDINI*` | Disable motor drivers |

### Pin Reference Summary

**Motor Control:**
- Theta: PC4 (DIR), PC5 (STEP), PB13-15 (MODE), PC10 (RST)
- Phi: PB0 (DIR), PB1 (STEP), PC7-9 (MODE), PC6 (EN), PA15 (RST)

**Sensors:**
- PB3: Theta home sensor
- PB4: Phi home sensor

**Communication:**
- USART1: PB6 (TX), PB7 (RX) - 115200 baud
- USART2: PA2 (TX), PA3 (RX) - 1000000 baud
- I2C1: PB8 (SCL), PB9 (SDA)

**Outputs:**
- PB11: Digital output signal
- PC13: Status LED

