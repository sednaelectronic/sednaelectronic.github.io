# DepoGraph V2.0 - Technical Documentation

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Hardware Specifications](#hardware-specifications)
3. [Software Architecture](#software-architecture)
4. [Communication Protocols](#communication-protocols)
5. [Scanning Algorithm](#scanning-algorithm)
6. [Data Processing Pipeline](#data-processing-pipeline)
7. [Firmware Details](#firmware-details)
8. [Raspberry Pi Application](#raspberry-pi-application)
9. [PCB Design](#pcb-design)
10. [Calibration and Setup](#calibration-and-setup)

---

## System Architecture

### Overview

DepoGraph V2.0 is a 3D laser scanning system that uses a rotating laser rangefinder to capture spatial data. The system consists of:

1. **Mechanical System**: Two-axis gimbal (Theta/Phi) with stepper motors
2. **Sensing System**: TF350 laser distance sensor
3. **Control System**: STM32 microcontroller
4. **Processing System**: Raspberry Pi with web interface
5. **Data System**: Point cloud generation and processing

### System Variants

#### Fixed Version (FIX/)
- **Target**: Permanent installation with network connectivity
- **MCU**: STM32H743VIT6 (480 MHz, Cortex-M7)
- **RTOS**: FreeRTOS for multitasking
- **Communication**: TCP/IP via Ethernet
- **Use Case**: Industrial scanning, automated systems

#### Portable Version (Portable_DepoGraph_V2/)
- **Target**: Field deployment, standalone operation
- **MCU**: STM32F105RBT6 (72 MHz, Cortex-M3)
- **RTOS**: Bare-metal (no RTOS)
- **Communication**: Serial UART to Raspberry Pi
- **Use Case**: Mobile scanning, manual operation

---

## Hardware Specifications

### Main Controller Board

#### STM32H7 (Fixed Version)
- **Part Number**: STM32H743VIT6
- **Core**: ARM Cortex-M7 @ 480 MHz
- **Flash**: 2 MB
- **RAM**: 1 MB
- **Peripherals Used**:
  - USART1: Raspberry Pi communication (115200 baud)
  - USART2: TF350 laser sensor
  - I2C1: DS18B20, DS3231, MPU6050
  - I2C4: MPU6050 (alternative)
  - TIM: Stepper motor PWM generation
  - ADC: Battery voltage monitoring
  - GPIO: Limit switches, enable pins, LEDs

#### STM32F105 (Portable Version)
- **Part Number**: STM32F105RBT6
- **Core**: ARM Cortex-M3 @ 72 MHz
- **Flash**: 128 KB
- **RAM**: 64 KB
- **Peripherals Used**:
  - USART1: Raspberry Pi communication
  - USART2: TF350 laser sensor
  - I2C1: DS18B20, DS3231, ADXL345, AT24CXX
  - TIM: Stepper motor control
  - ADC: Voltage monitoring
  - RTC: Real-time clock

### Stepper Motor Drivers

#### Fixed Version - DRV8825
- **Location**: `Pcb/DepoGraph_Main_V2PCB_Project/Drv8825.SchDoc`
- **Features**:
  - Microstepping up to 1/32
  - Current: Up to 2.5A per phase
  - Voltage: 8.2V to 45V
- **Control Signals**:
  - STEP: Step pulse input
  - DIR: Direction control
  - EN: Enable/disable motor

#### Portable Version - DRV2855
- **Location**: `Portable_DepoGraph_V2/MicroController_Code/DepoGraph_V2_Code/Stm32f105/Drv2855/`
- **Features**:
  - Similar to DRV8825
  - Optimized for portable power consumption

### Sensors

#### TF350 Laser Distance Sensor
- **Type**: Time-of-flight LiDAR
- **Range**: 0.1m to 350m
- **Communication**: UART (9600 baud)
- **Protocol**: Binary (header 0x59)
- **Data**: Distance (mm), Signal Strength
- **Interface**: USART2 on STM32

#### DS18B20 Temperature Sensor
- **Type**: Digital temperature sensor
- **Interface**: OneWire (GPIO)
- **Range**: -55°C to +125°C
- **Resolution**: 0.0625°C
- **Purpose**: System temperature monitoring

#### MPU6050/MPU9250 IMU
- **Type**: 6-axis/9-axis motion sensor
- **Interface**: I2C
- **Features**: Accelerometer, Gyroscope, Magnetometer (MPU9250)
- **Purpose**: Motion detection, vibration monitoring
- **Usage**: Shake detection during scanning

#### DS3231 RTC
- **Type**: Real-time clock with temperature compensation
- **Interface**: I2C
- **Purpose**: Timestamp generation for scans

#### ADXL345 Accelerometer (Portable)
- **Type**: 3-axis digital accelerometer
- **Interface**: I2C
- **Purpose**: Motion detection, system health monitoring

### Raspberry Pi Integration

#### Hardware Connection
- **UART**: GPIO 14 (TX), GPIO 15 (RX) - `/dev/serial0`
- **Baud Rate**: 115200
- **Reset Pin**: GPIO 13 (hardware reset capability)
- **Power**: 5V via USB or dedicated power supply

#### Software Stack
- **OS**: Raspberry Pi OS (Linux)
- **Python**: 3.x
- **Web Server**: Flask
- **Database**: SQLite3

---

## Software Architecture

### STM32 Firmware Structure

#### Fixed Version (RTOS)
```
FIX/Program/Microcontroller/RTOS/
├── Core/
│   ├── Inc/          # Header files
│   │   ├── main.h
│   │   ├── config.h      # Scan parameters
│   │   ├── stepper.h     # Motor control
│   │   ├── tfsensor.h    # Laser sensor
│   │   ├── raspberrypi.h # RPi communication
│   │   ├── scan.h        # Scanning algorithm
│   │   └── ...
│   └── Src/          # Source files
│       ├── main.c        # Main application
│       ├── stepper.c     # Motor driver
│       ├── tfsensor.c    # Sensor interface
│       ├── raspberrypi.c # Command parser
│       ├── scan.c        # Scan implementation
│       └── ...
├── Drivers/          # HAL drivers
└── MDK-ARM/         # Keil project files
```

#### Portable Version
```
Portable_DepoGraph_V2/MicroController_Code/DepoGraph_V2_Code/Stm32f105/Drv2855/DRV2855/
├── Core/
│   ├── Inc/
│   └── Src/
├── Drivers/
├── Drv2855/         # Stepper driver code
├── ADXL345/         # Accelerometer driver
├── AT24Cxx/         # EEPROM driver
├── RealTime/        # RTC functions
└── UartConfig/      # UART configuration
```

### Key Software Modules

#### 1. Stepper Motor Control (`stepper.c/h`)

**Functions**:
- `Tetha_Driver(int16_t STEP, int SPEED)`: Control Theta axis
- `Phi_Driver(int16_t STEP, int SPEED)`: Control Phi axis
- `THETA_HOME()`: Home Theta axis
- `PHI_HOME()`: Home Phi axis

**Parameters**:
- `THETA_MOTOR_SPEED`: Theta axis speed (250 steps/sec)
- `PHI_MOTOR_SPEED`: Phi axis speed (120 steps/sec)
- `THETA_START/END`: Theta scan range (-9500 to +9500 steps)
- `PHI_START/END`: Phi scan range (0 to 6400 steps)

**Step Resolution**:
- Theta: 32000 steps = 360° (88.89 steps/degree)
- Phi: 22400 steps = 360° (62.22 steps/degree)

#### 2. Laser Sensor Interface (`tfsensor.c/h`)

**Functions**:
- `Read_Distance()`: Read distance and strength
- `Read_Range()`: Continuous range reading

**Data Structure**:
```c
typedef struct {
    int Distance;    // Distance in mm
    int Strength;    // Signal strength
} TFS_t;
```

**Protocol**:
- Header: 0x59
- Data: 9 bytes total
- Distance: 2 bytes (low, high)
- Strength: 2 bytes (low, high)

#### 3. Command Parser (`raspberrypi.c/h`)

**Command Format**: `[PREFIX][SIGN][VALUE]*,`

**Commands**:
- `H+[steps]*,`: Move Theta positive
- `H-[steps]*,`: Move Theta negative
- `V+[steps]*,`: Move Phi positive
- `V-[steps]*,`: Move Phi negative
- `T#[steps]*,`: Set Theta start
- `P#[steps]*,`: Set Theta end
- `D#[steps]*,`: Set Theta step size
- `A#[steps]*,`: Set Phi start
- `B#[steps]*,`: Set Phi end
- `d#[steps]*,`: Set Phi step size
- `S#START*,`: Start scanning
- `GOHOME *,`: Go to home position
- `GETTEMP*,`: Get temperature
- `GETADXL*,`: Get accelerometer data
- `QIST000*,`: Query laser distance

#### 4. Scanning Algorithm (`scan.c/h`)

**Process**:
1. Move to Theta start position
2. For each Theta step:
   a. Move Phi from start to end
   b. At each Phi position:
      - Read laser distance
      - Read signal strength
      - Send data: `[Distance],[Strength],[Phi]\n`
   c. Move Phi back to start
   d. Increment Theta
   e. Send Theta position: `[Theta]*,\n`
3. Send completion: `Scan End`

**Optimization**:
- Variable speed based on Phi position
- Motion detection (MPU6050) for error handling
- Temperature monitoring during scan

---

## Communication Protocols

### Serial Protocol (STM32 ↔ Raspberry Pi)

#### Physical Layer
- **Interface**: UART
- **Baud Rate**: 115200
- **Data Bits**: 8
- **Parity**: None
- **Stop Bits**: 1
- **Flow Control**: None

#### Application Layer

**Command Structure**:
```
[PREFIX][SIGN][VALUE][TERMINATOR]
```

- **PREFIX**: Command identifier (H, V, T, P, D, A, B, d, S, G, Q)
- **SIGN**: Direction (+ or -) or parameter (#)
- **VALUE**: 5-digit number (padded with zeros)
- **TERMINATOR**: `*,` (asterisk comma)

**Response Structure**:
- **Data Line**: `[Distance],[Strength],[Phi]\n`
- **Position Line**: `[Theta]*,\n`
- **Status Line**: `[Status]*,\n`
- **Error Line**: `E@[Error]*,\n`

**Example Communication**:
```
RPi → STM32: H+00100*,
STM32 → RPi: H+00100*,
            [motor moves]

RPi → STM32: S#START*,
STM32 → RPi: 1234.5*,
            1234,567,100
            1234,568,120
            ...
            Scan End
```

### Network Protocol (Fixed Version)

#### TCP Socket Connection
- **Port**: Configurable (typically 8080)
- **Protocol**: TCP/IP
- **Data Format**: Same as serial protocol
- **Connection**: Persistent connection during operation

---

## Scanning Algorithm

### Scan Configuration

**Parameters** (from `config.h`):
```c
#define THETA_START -9500    // -95° (half of 190° range)
#define THETA_END   9500     // +95°
#define PHI_START   0        // 0°
#define PHI_END     6400     // ~103°
#define THETA_STERP_CONTROLLER 20  // Step size
#define PHI_STERP_CONTROLLER  20  // Step size
```

### Scan Process

1. **Initialization**:
   - Home both axes
   - Calibrate sensors
   - Set scan parameters

2. **Scanning Loop**:
   ```
   FOR theta = theta_start TO theta_end STEP delta_theta:
       Move to theta position
       FOR phi = phi_start TO phi_end STEP delta_phi:
           Read distance and strength
           Send data: distance,strength,phi
           Move phi one step
       END FOR
       Return phi to start
       Move theta one step
       Send theta position
   END FOR
   ```

3. **Data Collection**:
   - Each measurement: `[Distance],[Strength],[Phi]\n`
   - Theta position marker: `[Theta]*,\n`
   - End marker: `Scan End`

### Coordinate System

**Spherical Coordinates (RTPS)**:
- **R**: Range (distance in mm)
- **T**: Theta (horizontal angle in degrees)
- **P**: Phi (vertical angle in degrees)
- **S**: Strength (signal strength)

**Cartesian Conversion**:
```python
X = R * sin(Phi) * cos(Theta)
Y = R * sin(Phi) * sin(Theta)
Z = R * cos(Phi)
```

---

## Data Processing Pipeline

### Raspberry Pi Processing (`main.py`)

#### 1. Data Acquisition
- Receive raw scan data via serial
- Parse RTPS format
- Store in memory buffer

#### 2. Coordinate Transformation (`exclusiveMath.py`)

**Functions**:
- `Xmaker(R, Teta, Phi)`: Calculate X coordinate
- `Ymaker(R, Teta, Phi)`: Calculate Y coordinate
- `Zmaker(R, Teta, Phi)`: Calculate Z coordinate
- `hammarkaz(point, target)`: Translate point
- `y_rotate(x, y, z, angle)`: Rotate around Y axis
- `z_rotate(x, y, z, angle)`: Rotate around Z axis
- `x_rotate(x, y, z, angle)`: Rotate around X axis

#### 3. Coordinate System Alignment

**Process**:
1. Translate to first benchmark
2. Rotate to align with X axis
3. Rotate to align with Z axis
4. Final rotation for vertical alignment

#### 4. Output Generation

**Formats**:
- **Raw Data** (`raw.txt`): Original RTPS format
- **RTPS** (`RTPS.txt`): Formatted RTPS with newlines
- **OBJ** (`point_Cloud.obj`): 3D point cloud
- **Meshed OBJ** (`meshed.obj`): Mesh generated from points

### MATLAB Processing

**Scripts** (`matlab code/`):
- `ReadRawDataandConvert.m`: Read and convert raw data
- `haval.m`: Additional processing
- `mat.py`: Python-MATLAB bridge

---

## Firmware Details

### Fixed Version (STM32H7 + RTOS)

#### Task Structure
- **Main Task**: System initialization, command processing
- **Scan Task**: Scanning algorithm execution
- **Communication Task**: UART/TCP communication
- **Sensor Task**: Periodic sensor reading

#### Interrupts
- **UART RX**: Command reception
- **Timer**: Stepper motor step generation
- **GPIO**: Limit switch detection
- **ADC**: Voltage monitoring

#### Memory Management
- **Flash**: Code and constants
- **RAM**: Dynamic data, buffers
- **EEPROM**: Configuration storage

### Portable Version (STM32F105)

#### Main Loop Structure
```c
while (1) {
    // Check for commands
    RP_Commands();
    
    // Update sensors
    Read_Distance();
    Temp = ds18b20->Temperature;
    
    // Handle scanning
    if (scan_active) {
        Scan();
    }
    
    // System monitoring
    HAL_Delay(10);
}
```

#### Key Features
- Polling-based command processing
- Direct motor control
- Real-time sensor reading
- EEPROM configuration storage

---

## Raspberry Pi Application

### Web Interface (`run.py`)

#### Routes
- `/`: Redirect to control
- `/admin`: Login page
- `/Dashboard`: Main dashboard
- `/control`: Scanner control interface
- `/myproject`: Project management
- `/VQ/<id>`: View/query operations

#### Control Functions
- `gohome()`: Send home command
- `GetDistanse()`: Query distance
- `laser()`: Control laser pointer
- `thermometer()`: Read temperature
- `rotate()`: Manual axis movement
- `toggleAutoScan()`: Start/stop auto scan
- `Reset()`: Hardware reset

### Scanning Workflow (`main.py`)

#### Class: `Calculations`

**Methods**:
1. `get_data()`: Load scan parameters from database
2. `take_image()`: Capture reference image
3. `config_depot()`: Configure scan parameters
4. `start_scan()`: Execute scanning
5. `create_raw_RTPS()`: Process raw data
6. `create_obj()`: Generate 3D point cloud
7. `FTP_Depot()`: Upload results to server

#### Database Schema (SQLite)

**Table: `scanner_position_point_base`**
- Scan area definition
- Benchmark coordinates
- Scanner position
- Project information

**Table: `users`**
- User authentication

---

## PCB Design

### Main Controller Board

**Location**: `Pcb/DepoGraph_Main_V2PCB_Project/`

**Schematic Sheets**:
- `Main.SchDoc`: Main connections
- `Microcontroller.SchDoc`: STM32H7 circuit
- `Drv8825.SchDoc`: Stepper driver
- `RaspberryPI_Zero.SchDoc`: RPi interface
- `Ethernet.SchDoc`: Network interface
- `PowerSuply.SchDoc`: Power management
- `Display(I2C).SchDoc`: Optional display
- `MPU9250.SchDoc`: IMU sensor
- `RTC(DS3231).SchDoc`: Real-time clock
- `Temp_Sensor.SchDoc`: Temperature sensor
- `Memory(eeprom_Flash).SchDoc`: Storage

### Power Supply Board

**Location**: `Pcb/POWER SUPPLY DEPO/` or `Pcb/Depo-Power-V2/`

**Features**:
- Multiple voltage rails (12V, 5V, 3.3V)
- Battery management (Fixed version)
- Power monitoring

### Phi Controller Board

**Location**: `Pcb/Depo_Phi_Controller/`

**Purpose**: Dedicated Phi axis control (optional separate board)

---

## Calibration and Setup

### Home Position Calibration

1. **Hardware Setup**:
   - Connect limit switches
   - Verify switch wiring (see `Pinout.txt`)

2. **Software Calibration**:
   - Run `GOHOME *,` command
   - System moves to limit switches
   - Position counters reset

3. **Verification**:
   - Manual movement test
   - Position feedback check

### Laser Sensor Calibration

1. **Distance Calibration**:
   - Test at known distances
   - Verify accuracy
   - Adjust if necessary

2. **Signal Strength**:
   - Monitor strength values
   - Filter low-strength readings
   - Set thresholds

### Coordinate System Calibration

1. **Benchmark Setup**:
   - Place 3-4 benchmarks at known positions
   - Measure coordinates
   - Enter in database

2. **Alignment**:
   - Scan benchmarks
   - Calculate transformation matrix
   - Apply to all points

### Motor Calibration

1. **Step Size Verification**:
   - Move known distance
   - Count steps
   - Adjust if needed

2. **Speed Tuning**:
   - Test acceleration
   - Find maximum stable speed
   - Set in `config.h`

---

## Troubleshooting Guide

### Communication Issues

**Problem**: No response from STM32
- Check UART connections
- Verify baud rate (115200)
- Check power supply
- Verify reset pin

**Problem**: Corrupted data
- Check signal integrity
- Verify ground connection
- Check for interference
- Increase timeout values

### Motor Issues

**Problem**: Motor not moving
- Check enable pin
- Verify step/direction signals
- Check power supply voltage
- Verify driver connections

**Problem**: Incorrect position
- Recalibrate home position
- Check limit switches
- Verify step count
- Check for mechanical binding

### Sensor Issues

**Problem**: No distance reading
- Check laser power
- Verify UART connection
- Check sensor initialization
- Verify baud rate (9600 for TF350)

**Problem**: Inaccurate readings
- Clean sensor lens
- Check for interference
- Verify calibration
- Check signal strength

### Software Issues

**Problem**: Web interface not loading
- Check Flask server status
- Verify network connection
- Check firewall settings
- Review error logs

**Problem**: Scan not starting
- Check database connection
- Verify scan parameters
- Check serial communication
- Review command format

---

## Development Notes

### Building STM32 Firmware

1. **STM32CubeIDE**:
   - Import project
   - Configure build settings
   - Build and flash

2. **Keil MDK-ARM**:
   - Open `.uvprojx` file
   - Select target
   - Build and download

### Debugging

- **STM32**: Use ST-Link debugger
- **Raspberry Pi**: Use SSH and Python debugger
- **Serial Monitor**: Use `screen` or `minicom`

### Version Control

- Keep firmware versions separate
- Document changes in code
- Maintain compatibility matrix

---

## Appendix

### Pin Assignments

See `Portable_DepoGraph_V2/Pcb/Pinout.txt` for detailed pin mapping.

### Cable Color Coding

See `Portable_DepoGraph_V2/Pcb/Cable_Color.txt` for cable identification.

### Configuration Files

- `OsConfig.txt`: System configuration
- `config.h`: Firmware parameters
- `Step.txt`: Step motor calibration

---

**Document Version**: 1.0  
**Last Updated**: 2025  
**Maintained By**: DepoGraph Development Team

