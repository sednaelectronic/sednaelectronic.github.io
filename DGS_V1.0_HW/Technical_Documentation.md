# DGS V1.0.0 Technical Documentation

## Aircraft Docking Guidance System (DGS)

**Version:** 1.0.0  
**Document Type:** Technical Documentation  
**Target Audience:** Engineers and Developers

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Hardware Technical Documentation](#hardware-technical-documentation)
3. [Software Technical Documentation](#software-technical-documentation)
4. [Communication Protocols](#communication-protocols)
5. [System Integration](#system-integration)

---

## System Overview

The DGS (Aircraft Docking Guidance System) is an automated guidance system designed to assist aircraft during docking operations. The system uses laser scanning technology combined with computer vision to detect aircraft position and provide real-time guidance information to ground marshals and pilots.

### System Architecture

The DGS consists of three main subsystems:

1. **Scanner System** - Laser scanning unit with stepper motor control
2. **Controller System** - Environmental monitoring and control boards
3. **Software System** - Web-based interface and data processing

### High-Level Data Flow

```
Aircraft → Laser Scanner → STM32F105 (Scanner Board) → Raspberry Pi → Web Interface → Marshal Display
                                                              ↓
                                                    Database (SQLite)
                                                              ↓
                                                    TCP/IP → External Systems
```

---

## Hardware Technical Documentation

### A. System Architecture Overview

The hardware system is divided into several PCB modules:

#### 1. Scanner Board (Up_Board)
- **Location:** `PCB/Up_Board/PCB/DepoGraph(new)/`
- **Primary Function:** Laser scanning and positioning
- **Key Components:**
  - STM32F105RB microcontroller
  - DRV8825 stepper motor drivers (2x)
  - MPU6050 gyroscope/accelerometer
  - LiDAR sensor (UART interface)
  - Optocouplers for position sensing
  - ESP32-CAM module
  - Power supply circuits

#### 2. Controller Boards

**AirPlan Controller:**
- **Location:** `PCB/Controller/AirPlan_Controller_PCB_Project/`
- **Components:**
  - STM32F105RB microcontroller
  - ESP32 module
  - RS485 transceiver
  - Temperature sensors (DS18B20, DHT22)
  - LDR (Light Dependent Resistor)
  - Door switch inputs
  - Relay outputs for fan control
  - Battery monitoring circuit
  - W25Qxx Flash memory
  - I2C connector
  - TinkerBoard connector

**Up Controller:**
- **Location:** `PCB/Controller/Up_Controller_PCB_Project/`
- Similar to AirPlan Controller with additional ADC inputs

**Down Controller:**
- **Location:** `PCB/Controller/Down_Controller_PCB_Project/`
- **Components:**
  - Relay outputs for fan and heater control
  - Power supply
  - Connector interfaces

### B. PCB Design Explanation

#### Scanner Board Architecture

The scanner board implements a two-axis positioning system:

1. **Theta Axis (Horizontal):**
   - Stepper motor controlled by DRV8825
   - Range: 0-32000 steps (360 degrees)
   - Optocoupler for home position detection
   - Encoder feedback via MPU6050

2. **Phi Axis (Vertical):**
   - Stepper motor controlled by DRV8825
   - Range: 0-22400 steps (360 degrees)
   - Optocoupler for home position detection

#### Controller Board Architecture

The controller boards provide:
- Environmental monitoring (temperature, humidity, light)
- Door status monitoring
- Battery voltage monitoring
- Fan/heater control via relays
- Communication interfaces (UART, RS485, I2C)

### C. Electronic Components Description

#### Microcontrollers

**STM32F105RB:**
- **Architecture:** ARM Cortex-M3
- **Clock Speed:** 72 MHz
- **Flash:** 128 KB
- **RAM:** 64 KB
- **Peripherals Used:**
  - UART1: Communication with Raspberry Pi (115200 baud)
  - UART2: LiDAR sensor interface (115200 baud)
  - I2C1: MPU6050, EEPROM (AT24Cxx)
  - SPI1: Flash memory (W25Qxx)
  - ADC1: LDR, battery voltage monitoring
  - TIM1, TIM5, TIM7: Stepper motor control, delays
  - GPIO: Optocouplers, relays, sensors

#### Stepper Motor Drivers

**DRV8825:**
- **Function:** Bipolar stepper motor driver
- **Current:** Up to 2.5A per coil
- **Microstepping:** Up to 1/32 step
- **Control Signals:** STEP, DIR, ENABLE
- **Two instances:** One for Theta axis, one for Phi axis

#### Sensors

**MPU6050:**
- **Type:** 6-axis motion sensor (gyroscope + accelerometer)
- **Interface:** I2C
- **Function:** Orientation feedback, angle measurement
- **Address:** 0x68 (default)

**DS18B20:**
- **Type:** Digital temperature sensor
- **Interface:** One-Wire
- **Accuracy:** ±0.5°C
- **Range:** -55°C to +125°C
- **Multiple sensors:** Temp1, Temp2, Temp3

**DHT22:**
- **Type:** Temperature and humidity sensor
- **Interface:** Digital (single-wire)
- **Temperature Range:** -40°C to 80°C
- **Humidity Range:** 0-100% RH

**LiDAR Sensor:**
- **Interface:** UART (115200 baud)
- **Protocol:** Custom binary protocol
- **Header:** 0x59 0x59
- **Data:** Distance (2 bytes), Strength (2 bytes)
- **Range:** Up to 18000mm (18 meters)

**LDR (Light Dependent Resistor):**
- **Function:** Ambient light detection
- **Interface:** ADC (0-3.3V)
- **Formula:** Light = Voltage × 150

**Door Switches:**
- **Type:** Digital input (GPIO)
- **Logic:** Active LOW (0 = door closed, 1 = door open)
- **Pins:** GPIOB Pin 8, GPIOB Pin 9

#### Communication Modules

**ESP32:**
- **Function:** WiFi connectivity, camera interface
- **Interface:** UART, SPI
- **Application:** Remote monitoring, data transmission

**RS485 Transceiver:**
- **Standard:** RS485 differential signaling
- **Baud Rate:** 115200
- **Function:** Multi-drop communication with other controllers

#### Memory Devices

**AT24Cxx EEPROM:**
- **Interface:** I2C
- **Function:** Non-volatile parameter storage
- **Address:** 0xA0

**W25Qxx Flash:**
- **Interface:** SPI
- **Function:** Firmware storage, data logging

#### Power Supply

- **Input:** 12V DC (battery or external supply)
- **Regulators:** Multiple LDO regulators for 3.3V, 5V
- **Battery Monitoring:** ADC channel with voltage divider (7.94x scaling)
- **Protection:** Reverse polarity, overvoltage protection

### D. Microcontroller Selection and Pin Mapping

#### STM32F105RB Pin Configuration (Scanner Board)

**UART1 (Raspberry Pi Communication):**
- TX: PA9
- RX: PA10
- Baud: 115200, 8N1

**UART2 (LiDAR):**
- TX: PA2
- RX: PA3
- Baud: 115200, 8N1

**I2C1 (MPU6050, EEPROM):**
- SCL: PB6
- SDA: PB7
- Speed: 400 kHz (fast mode)

**SPI1 (Flash):**
- MOSI: PA7
- MISO: PA6
- SCK: PA5
- CS: PA4

**Stepper Motor Control (DRV8825):**
- Theta STEP: PC6
- Theta DIR: PC7
- Theta ENABLE: PC8
- Phi STEP: PC9
- Phi DIR: PC10
- Phi ENABLE: PC11

**Optocouplers:**
- Theta Home: PB3
- Phi Home: PB4

**GPIO:**
- Status LED: PC13
- Reset: PB5

#### STM32F105RB Pin Configuration (Controller Board)

**UART1 (Raspberry Pi):**
- TX: PA9
- RX: PA10
- Baud: 115200

**UART2 (RS485):**
- TX: PA2
- RX: PA3
- DE/RE: PA1 (driver enable)

**I2C1 (Sensors):**
- SCL: PB6
- SDA: PB7

**ADC1:**
- CH0 (LDR): PA0
- CH1 (Battery): PA1

**One-Wire (DS18B20):**
- Data: PC4, PC5

**DHT22:**
- Data: PC5

**Door Switches:**
- Door1: PB8
- Door2: PB9

**Relays:**
- Fan1: PB5
- Fan2: PB4
- Fan3: PB3
- Fan4: PD2
- Fan5: PC12
- Heater: PA8

### E. Firmware Architecture and Programming Details

#### Scanner Firmware (V2_RTOS)

**Location:** `Program/MicroController/V2_RTOS/Scanner/DGS_Scanner_RTOS_V1/`

**Operating System:** FreeRTOS

**Main Tasks:**
1. **Task1_Scan** - Scanning algorithm and data processing
2. **Task2_Laser** - LiDAR data acquisition and filtering

**Key Functions:**
- `GO_homeTheta()` - Homing sequence for horizontal axis
- `GO_homePhi()` - Homing sequence for vertical axis
- `Read_Range()` - LiDAR distance reading
- `Get_Dist()` - Averaged distance measurement (4 samples)
- `Drv_Motor_Theta()` - Theta axis stepper control
- `Drv_Motor_Phi()` - Phi axis stepper control

**Scanning Algorithm:**
1. Initialize position (theta_start, phi_start)
2. Perform ground height calibration
3. Scan pattern: Theta sweep with Phi increments
4. Detect aircraft wheel position
5. Calculate nose height
6. Send data via UART in format: `R,Theta,Phi` or `N<r>,<theta>,<phi>`

**Coordinate System:**
- **R:** Radial distance (mm) from LiDAR
- **Theta:** Horizontal angle (0-32000 steps = 0-360°)
- **Phi:** Vertical angle (0-22400 steps = 0-360°)

**Conversion Formulas:**
- Theta (radians) = (Theta_steps × 2π) / 32000
- Phi (radians) = (Phi_steps × 2π) / 22400 + π/2

**Cartesian Conversion:**
- X = R × sin(Phi) × cos(Theta)
- Y = R × cos(Phi)
- Z = R × sin(Phi) × sin(Theta)

#### Controller Firmware (V1_Bermetal)

**Location:** `Program/MicroController/V1_Bermetal/Controller/`

**Architecture:** Bare metal (no RTOS)

**Main Loop Functions:**
- `Computer_Reciever()` - UART command processing
- `RS485_Receiver()` - RS485 command processing
- Temperature monitoring (DS18B20, DHT22)
- Fan control based on temperature thresholds
- Door status monitoring
- Battery voltage monitoring
- LDR reading

**Command Protocol:**
Commands follow format: `#<COMMAND>*,\r\n`

**Supported Commands:**
- `#GETTMP*,` - Get all temperatures (Temp1_Temp2_Temp3)
- `#GETTP1*,` - Get temperature 1
- `#GETTP2*,` - Get temperature 2
- `#GETTP3*,` - Get temperature 3
- `#GETHUM*,` - Get humidity
- `#GETBAT*,` - Get battery voltage
- `#GETLDR*,` - Get light level
- `#GETDOR*,` - Get door status
- `#FAN1CC*,` - Toggle fan 1
- `#FAN2CC*,` - Toggle fan 2
- `#FAN3CC*,` - Toggle fan 3
- `#FAN4CC*,` - Toggle fan 4
- `#FAN5CC*,` - Toggle fan 5
- `#RRRRRR*,` - Soft reset

**Temperature Control Logic:**
- Fan2 ON: Temp ≥ 45°C, OFF: Temp ≤ 35°C
- Fan3 ON: Temp ≥ 60°C, OFF: Temp ≤ 50°C
- Fan4 ON: Temp ≥ 70°C, OFF: Temp ≤ 55°C
- Heater ON: Temp ≤ 1°C, OFF: Temp ≥ 15°C

**Battery Monitoring:**
- Low battery threshold: 11.0V
- Formula: Percentage = ((Voltage - 11.5) / 1.8) × 100

### F. Communication Protocols and Interfaces

#### UART Protocol (Scanner ↔ Raspberry Pi)

**Physical:** UART, 115200 baud, 8N1

**Scanner → Raspberry Pi:**
- Format: `R,Theta,Phi` or `N<r>,<theta>,<phi>`
- Example: `1234,<15000>,1800` (wheel detection)
- Example: `N5000,12000,2000` (nose detection)

**Raspberry Pi → Scanner:**
- Format: `#<COMMAND><VALUE>*,\r\n`
- Commands:
  - `O#<value>*` - Set start position
  - `T#<value>*` - Set theta parameter
  - `A#<value>*` - Set altitude parameter
  - `W#<value>*` - Set wheel radius
  - `GOHOME *,` - Go to home position
  - `S#START*,` - Start scanning
  - `H<sign><value>*` - Horizontal rotation
  - `V<sign><value>*` - Vertical rotation

#### RS485 Protocol

**Physical:** RS485 differential, 115200 baud, 8N1

**Multi-drop:** Up to 32 devices on bus

**Command Format:** Same as UART commands

**Addressing:** Device selection via hardware address (future implementation)

#### I2C Protocol

**Devices:**
- MPU6050: Address 0x68
- AT24Cxx EEPROM: Address 0xA0

**Speed:** 400 kHz (fast mode)

#### TCP/IP Protocol

**Server:** Raspberry Pi (port 65432)

**Message Format:** `aircraft_name,direction,Z_distance,x_distance`

**Example:** `A320,left,2.5,15.3`

**Direction Values:**
- `left` - Aircraft is left of centerline
- `center` - Aircraft is on centerline
- `right` - Aircraft is right of centerline

**Distances:**
- `Z_distance`: Lateral offset from centerline (meters)
- `x_distance`: Distance to stop point (meters)

### G. Power Supply and Protection Circuits

#### Power Requirements

**Scanner Board:**
- 12V DC input
- Stepper motors: 2.5A per motor (5A total peak)
- Logic: 3.3V @ 500mA
- Total: ~60W peak

**Controller Board:**
- 12V DC input
- Relays: 12V @ 100mA each
- Logic: 3.3V @ 200mA
- Total: ~5W

#### Protection Circuits

1. **Reverse Polarity Protection:**
   - Diode or MOSFET-based protection
   - Prevents damage from incorrect connection

2. **Overvoltage Protection:**
   - TVS diodes on input
   - Zener clamps on sensitive lines

3. **Current Limiting:**
   - Fuses on power inputs
   - Current sense resistors for monitoring

4. **ESD Protection:**
   - TVS diodes on communication lines
   - Ferrite beads on I/O

---

## Software Technical Documentation

### A. Software Architecture and Module Breakdown

The software system consists of three main components:

#### 1. Raspberry Pi Application (RPI)

**Location:** `Software/RPI/DGS 12-8/DGS 12-8/`

**Technology Stack:**
- Python 3.x
- Flask (web framework)
- SQLite3 (database)
- OpenCV (computer vision)
- NumPy (mathematical operations)
- RPi.GPIO (hardware control)

**Main Modules:**

**main.py:**
- `Serial` class - UART communication with scanner
- `camera` class - RTSP camera streaming and recording
- `TCP_IP` class - TCP server for data transmission
- `Calculations` class - Position calculation and guidance logic
- `Quick_start()` - Main scanning workflow

**run.py:**
- Flask web application
- REST API endpoints
- Database management
- Door monitoring thread
- System reset functions

**exclusiveMath.py:**
- Coordinate conversion functions
- Spherical to Cartesian conversion
- Angle normalization

#### 2. UI Panel Application

**Location:** `Software/UI_Panel/DGS_UI H_A/`

**Components:**
- `camera_viewer.py` - RTSP camera viewer with YOLO person detection
- `client.py` - TCP client for position data
- `Distance Calculation.py` - Distance calculation utilities

**Features:**
- Multi-camera RTSP streaming
- YOLOv8 person detection
- Center line definition and tracking
- Position data logging
- TCP server/client communication

#### 3. RS485 UI Application

**Location:** `Program/Python/RS485_UI/`

**Components:**
- `RS485_UI.py` - Tkinter GUI for controller monitoring
- `Serial.py` - Serial communication module
- `Joystic.py` - Joystick control interface

**Features:**
- Temperature monitoring (3 sensors)
- Humidity monitoring
- Battery voltage display
- Light level display
- Fan control
- Soft reset functionality

### B. Description of Main Algorithms and Logic

#### Scanning Algorithm

**Workflow:**
1. **Initialization:**
   - Connect to scanner via UART
   - Load aircraft parameters from database
   - Load centerline configuration
   - Set scanner parameters (angles, steps, thresholds)

2. **Homing Sequence:**
   - Send `GOHOME *,` command
   - Wait for completion (~35 seconds)
   - Scanner moves to home position

3. **Scanning Loop:**
   - Send `S#START*,` command
   - Continuously read UART data
   - Parse incoming data:
     - Wheel detection: `R,Theta,Phi` with `<` or `>` indicator
     - Nose detection: `N<r>,<theta>,<phi>`

4. **Position Calculation:**
   - Convert spherical coordinates to Cartesian
   - Calculate wheel center position
   - Project wheel onto centerline
   - Calculate lateral offset (Z_distance)
   - Calculate forward distance (x_distance)
   - Determine direction (left/center/right)

5. **Data Transmission:**
   - Format: `aircraft_name,direction,Z_distance,x_distance`
   - Send via TCP/IP to marshal display
   - Log to files

6. **Termination:**
   - Stop when aircraft passes stop point
   - Reset system
   - Save logs

#### Coordinate Conversion Algorithm

**Spherical to Cartesian:**
```python
def x_maker(R, Teta, Phi):
    x = R * sin(Phi) * cos(Teta)
    return x

def z_maker(R, Teta, Phi):
    z = R * sin(Phi) * sin(Teta)
    return z

def y_maker(R, Teta, Phi):
    y = R * cos(Phi)
    return y
```

**Angle Conversion:**
```python
def phi_maker(input):
    output = ((math.pi * 2) / 22400) * input + math.pi / 2
    return output

def teta_maker(input):
    output = ((math.pi * 2) / 32000) * input
    return output
```

#### Centerline Projection Algorithm

1. Calculate centerline start point: `(x_cl_s, z_cl_s)`
2. Calculate centerline end point: `(x_cl_e, z_cl_e)`
3. Calculate slope: `m = (x_cl_e - x_cl_s) / (z_cl_e - z_cl_s)`
4. Project wheel position onto centerline
5. Calculate perpendicular distance
6. Determine if within centerline width threshold

#### Aircraft Detection Algorithm

1. **Wheel Detection:**
   - Look for data with `<` or `>` in Theta value
   - `<` indicates right wheel, `>` indicates left wheel
   - Calculate wheel center accounting for wheel width

2. **Nose Detection:**
   - Look for data starting with `N`
   - Extract R, Theta, Phi values
   - Calculate nose height
   - Compare with expected aircraft nose height
   - Error flag if mismatch > 50mm

3. **Aircraft Type Validation:**
   - If error flag > 4 consecutive readings
   - Set aircraft name to "Error"
   - Stop scanning

### C. Data Flow and System Interaction

#### Data Flow Diagram

```
┌─────────────┐
│   Scanner   │──UART──>┌──────────────┐
│   (STM32)   │         │  Raspberry Pi │
└─────────────┘         │   (Python)    │
                        └───────┬───────┘
                                │
                    ┌───────────┼───────────┐
                    │           │           │
                    ▼           ▼           ▼
            ┌──────────┐  ┌─────────┐  ┌──────────┐
            │ SQLite   │  │  TCP/IP │  │  Camera  │
            │ Database │  │ Server  │  │ Recording│
            └──────────┘  └─────────┘  └──────────┘
                    │           │
                    │           ▼
                    │    ┌──────────────┐
                    │    │ Marshal     │
                    │    │ Display     │
                    │    └──────────────┘
                    │
                    ▼
            ┌──────────────┐
            │  Controller  │──RS485──>┌──────────────┐
            │   (STM32)    │          │ Other Boards │
            └──────────────┘          └──────────────┘
```

#### Database Schema

**myproject_aircraft:**
- `id` - Primary key
- `aircraft_name` - Aircraft type (e.g., "A320", "B777")
- `aircraft_nose_height` - Expected nose height (mm)
- `wheel_width` - Wheel track width (mm)
- `Wheel_radius` - Wheel radius (mm)
- `radius` - Stop point radius (mm)
- `stop_horizontal` - Stop point horizontal angle
- `stop_vertical` - Stop point vertical angle

**myproject_centerline:**
- `id` - Primary key
- `point_start_r` - Start point radius (mm)
- `point_start_vertical` - Start point vertical angle
- `point_start_horizontal` - Start point horizontal angle
- `point_end_r` - End point radius (mm)
- `point_end_vertical` - End point vertical angle
- `point_end_horizontal` - End point horizontal angle
- `width_centerline` - Centerline width tolerance (mm)

**myproject_connection:**
- `id` - Primary key
- `DataBase_URL` - External database URL
- `GATE_Name` - Gate identifier
- `Scaner_Activation` - Scanner enable flag
- `DGS_Height_inistalation` - Installation height (mm)
- `scanner_start_position` - Initial scan position
- `Horisontal_Scan_Detect_Angle` - Horizontal scan angle command
- `Horisontal_Scan_Detect_Step` - Horizontal scan step command
- `Horisontal_Nose_Detect_Angle` - Nose detection angle command
- `Horizontal_Line_Step` - Line scan step command
- `Max_Ground_Angle` - Maximum ground angle command

### D. Configuration Parameters

#### Scanner Parameters

**Location:** Database table `myproject_connection`

**Key Parameters:**
- `Horisontal_Scan_Detect_Angle` - Format: `U#<value>*`
- `Horisontal_Scan_Detect_Step` - Format: `D#<value>*`
- `Horisontal_Nose_Detect_Angle` - Format: `P#<value>*`
- `Horizontal_Line_Step` - Format: `J#<value>*`
- `Max_Ground_Angle` - Format: `O#<value>*`

#### Aircraft Parameters

**Location:** Database table `myproject_aircraft`

**Key Parameters:**
- `aircraft_nose_height` - Used for aircraft type validation
- `wheel_width` - Used for wheel center calculation
- `Wheel_radius` - Used for forward distance calculation
- `stop_horizontal`, `stop_vertical` - Stop point coordinates

#### Centerline Parameters

**Location:** Database table `myproject_centerline`

**Key Parameters:**
- Start and end points define the centerline
- `width_centerline` - Tolerance for "on centerline" detection

### E. Build, Compilation, and Deployment Process

#### Firmware Build Process

**Scanner Firmware (V2_RTOS):**

1. **Prerequisites:**
   - STM32CubeMX
   - Keil MDK-ARM or STM32CubeIDE
   - STM32F1 HAL library

2. **Build Steps:**
   ```bash
   # Open project in STM32CubeMX
   # Load: DGS_Scanner_RTOS_V1.ioc
   # Generate code
   # Open in Keil MDK-ARM
   # Build project
   # Output: DGS_Scanner_RTOS_V1.hex
   ```

3. **Flash Process:**
   - Use ST-Link or J-Link programmer
   - Flash .hex file to STM32F105RB
   - Verify programming

**Controller Firmware (V1_Bermetal):**

1. **Build Steps:**
   ```bash
   # Open: TEST_Controller.ioc in STM32CubeMX
   # Generate code
   # Open in Keil MDK-ARM
   # Build project
   # Output: TEST_Controller.hex
   ```

2. **Flash Process:**
   - Same as scanner firmware

#### Software Deployment Process

**Raspberry Pi Application:**

1. **Prerequisites:**
   - Raspberry Pi OS (Debian-based)
   - Python 3.7+
   - Network connectivity

2. **Installation:**
   ```bash
   # Navigate to application directory
   cd Software/RPI/DGS\ 12-8/DGS\ 12-8/
   
   # Install dependencies
   pip3 install flask sqlite3 opencv-python numpy RPi.GPIO requests
   
   # Initialize database (if not exists)
   # Database will be created automatically on first run
   
   # Configure serial ports
   # /dev/serial0 - Scanner communication
   # /dev/ttyAMA4 - Controller communication
   
   # Set permissions
   sudo chmod 666 /dev/serial0
   sudo chmod 666 /dev/ttyAMA4
   ```

3. **Run Application:**
   ```bash
   # Development mode
   python3 run.py
   
   # Production mode (with systemd service)
   sudo systemctl start dgs.service
   ```

4. **Web Interface:**
   - Access: `http://<raspberry-pi-ip>:60000`
   - Default routes:
     - `/` - Redirects to `/control`
     - `/control` - Main control interface
     - `/admin` - Admin login
     - `/Dashboard` - System dashboard
     - `/Marshal` - Marshal display interface

**UI Panel Application:**

1. **Installation:**
   ```bash
   cd Software/UI_Panel/DGS_UI\ H_A/
   pip install -r requirements.txt
   ```

2. **Run:**
   ```bash
   python camera_viewer.py  # Server
   python client.py          # Client
   ```

**RS485 UI Application:**

1. **Installation:**
   ```bash
   cd Program/Python/RS485_UI/
   pip install pyserial tkinter matplotlib pillow
   ```

2. **Run:**
   ```bash
   python RS485_UI.py
   ```

### F. Interfaces Between Software and Hardware

#### Software → Hardware Interfaces

**Raspberry Pi → Scanner (UART):**
- Physical: GPIO UART pins
- Protocol: Custom command protocol
- Library: `serial` (pyserial)
- Port: `/dev/serial0`
- Baud: 115200

**Raspberry Pi → Controller (UART):**
- Physical: GPIO UART pins
- Protocol: Command protocol (#COMMAND*,)
- Library: `serial` (pyserial)
- Port: `/dev/ttyAMA4`
- Baud: 115200

**Raspberry Pi → Hardware Reset:**
- Physical: GPIO pins (GPIO18, GPIO3)
- Library: `RPi.GPIO`
- Function: Reset scanner and controller boards

**Raspberry Pi → Camera:**
- Physical: Network (RTSP)
- Protocol: RTSP over IP
- Library: `cv2.VideoCapture`
- URLs:
  - Camera 1: `rtsp://admin:123P456q789$@192.168.1.41:554`
  - Camera 2: `rtsp://admin:123P456q789$@192.168.1.42:554`

#### Hardware → Software Interfaces

**Scanner → Raspberry Pi (UART):**
- Data format: `R,Theta,Phi` or `N<r>,<theta>,<phi>`
- Parsing: String splitting and conversion
- Processing: Real-time in `Calculations.start_scan()`

**Controller → Raspberry Pi (UART):**
- Response format: Plain text values
- Examples: `25.50`, `ON`, `OFF`, `12.5_24.3_22.1`

**Camera → Software:**
- Video stream: RTSP
- Processing: OpenCV frame capture
- Recording: MP4 files (XVID codec)

---

## System Integration

### Integration Points

1. **Scanner ↔ Raspberry Pi:**
   - UART communication for scanning commands and data
   - GPIO for hardware reset

2. **Controller ↔ Raspberry Pi:**
   - UART for sensor data and control commands
   - RS485 for multi-controller communication

3. **Raspberry Pi ↔ External Systems:**
   - TCP/IP for marshal display
   - HTTP for web interface
   - Database for configuration storage

4. **Camera System:**
   - RTSP streaming for video recording
   - HTTP API for camera control

### System Startup Sequence

1. **Hardware Initialization:**
   - Scanner: Homing sequence, calibration
   - Controller: Sensor initialization, fan control startup
   - Raspberry Pi: Serial port initialization

2. **Software Initialization:**
   - Database connection
   - Serial port connections
   - Web server startup
   - Camera connections

3. **Ready State:**
   - System waits for aircraft selection
   - Parameters loaded from database
   - Scanner in home position

4. **Scanning Operation:**
   - User selects aircraft type
   - System loads parameters
   - Scanner moves to start position
   - Scanning begins
   - Data processed and transmitted

---

## Appendix

### A. File Structure Reference

```
DGS_V1.0.0/
├── Software/
│   ├── RPI/
│   │   └── DGS 12-8/          # Main Raspberry Pi application
│   └── UI_Panel/               # UI applications
├── Program/
│   ├── MicroController/
│   │   ├── V1_Bermetal/       # Controller firmware
│   │   └── V2_RTOS/           # Scanner firmware (RTOS)
│   └── Python/                 # Python utilities
├── PCB/
│   ├── Controller/             # Controller board designs
│   ├── Up_Board/               # Scanner board design
│   └── Down_Board/             # Additional board designs
└── Docs/                       # Existing documentation
```

### B. Communication Protocol Reference

See sections F (Communication Protocols) for detailed protocol specifications.

### C. Troubleshooting Guide

**Common Issues:**

1. **Scanner not responding:**
   - Check UART connection
   - Verify baud rate (115200)
   - Check power supply
   - Verify firmware is loaded

2. **Controller not responding:**
   - Check UART connection
   - Verify command format
   - Check RS485 termination
   - Verify power supply

3. **Web interface not accessible:**
   - Check Flask is running
   - Verify port 60000 is open
   - Check firewall settings
   - Verify network connectivity

4. **Camera not connecting:**
   - Verify RTSP URL
   - Check network connectivity
   - Verify credentials
   - Check camera power

---

**Document Version:** 1.0  
**Last Updated:** 2025  
**Maintained By:** Development Team

