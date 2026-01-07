# DepoGraph V1.0 Technical Documentation

## Table of Contents

1. [Hardware & Embedded System Technical Documentation](#hardware--embedded-system-technical-documentation)
   - [System Architecture Overview](#system-architecture-overview)
   - [Mechanical Scanning Concept](#mechanical-scanning-concept)
   - [Sensor Selection and Interfacing](#sensor-selection-and-interfacing)
   - [Motor/Actuator Control](#motoractuator-control)
   - [Microcontroller Selection and Pin Mapping](#microcontroller-selection-and-pin-mapping)
   - [Firmware Architecture and Task Flow](#firmware-architecture-and-task-flow)
   - [Data Acquisition and Transmission Protocol](#data-acquisition-and-transmission-protocol)
   - [Power Management and Protection Circuits](#power-management-and-protection-circuits)
   - [PCB Design Considerations](#pcb-design-considerations)

2. [Software Technical Documentation](#software-technical-documentation)
   - [Software Architecture Overview](#software-architecture-overview)
   - [Communication Interface with Hardware](#communication-interface-with-hardware)
   - [Data Decoding and Synchronization](#data-decoding-and-synchronization)
   - [Point Cloud Generation Pipeline](#point-cloud-generation-pipeline)
   - [Coordinate System and Transformation Logic](#coordinate-system-and-transformation-logic)
   - [Data Visualization](#data-visualization)
   - [Export Formats](#export-formats)
   - [Build, Run, and Deployment Instructions](#build-run-and-deployment-instructions)

---

## Hardware & Embedded System Technical Documentation

### System Architecture Overview

DepoGraph V1.0 is a 3D scanning system that employs a two-axis mechanical scanning mechanism to capture spatial data of the surrounding environment. The system consists of:

- **Embedded Controller**: STM32F105RBT6 microcontroller running motion control and data acquisition firmware
- **Scanning Mechanism**: Two-axis stepper motor system (Theta and Phi axes) for precise angular positioning
- **Distance Sensor**: TFmini LiDAR sensor for distance measurement
- **Inertial Sensor**: ADXL345 accelerometer for orientation monitoring
- **Communication**: UART serial interface (115200 baud) for PC communication
- **Power Management**: Custom power supply board with protection circuits

### Mechanical Scanning Concept

The system performs 3D scanning using a two-axis gimbal mechanism:

1. **Theta Axis (Horizontal)**: Rotates the scanning head horizontally
   - Full range: 0-180 degrees (0-16000 steps, 32000 steps per 360°)
   - Step resolution: Configurable (1, 2, 4, 8, 16, 32 microsteps)
   - Default resolution: 16 microsteps

2. **Phi Axis (Vertical)**: Rotates the scanning head vertically
   - Full range: 0-90 degrees (0-5600 steps, 22400 steps per 360°)
   - Step resolution: Fixed at 16 microsteps

The scanning pattern follows a raster pattern:
- Starts at theta_start, phi_start
- Scans vertically from phi_start to phi_end
- Increments theta by delta_theta
- Scans vertically back from phi_end to phi_start
- Repeats until theta_end is reached

### Sensor Selection and Interfacing

#### TFmini LiDAR Sensor

- **Interface**: UART (USART2 on STM32)
- **Baud Rate**: 115200
- **Data Format**: 9-byte packets
  - Header: 0x59, 0x59
  - Distance: 2 bytes (low, high)
  - Strength: 2 bytes (low, high)
  - Reserved: 2 bytes
  - Checksum: 1 byte
- **Range**: 0.3m - 12m
- **Update Rate**: ~100Hz
- **Power Control**: GPIO-controlled power pin (PA1)

#### ADXL345 Accelerometer

- **Interface**: I2C (I2C1 on STM32)
- **Address**: 0x53 (7-bit address, shifted to 0xA6 for write)
- **Purpose**: Orientation monitoring, pitch/roll/yaw calculation
- **Power Control**: GPIO-controlled power pin (PB5)

#### Temperature Sensor

- **Interface**: Internal ADC (ADC1)
- **Purpose**: System temperature monitoring
- **Conversion**: Linear conversion from ADC value to Celsius

### Motor/Actuator Control

#### Stepper Motor Drivers (DRV8825)

The system uses two DRV8825 stepper motor drivers:

1. **Theta Motor Driver**:
   - Direction Pin: PB0
   - Step Pin: PB1
   - Enable Pin: PC10
   - Mode Pins: PC7, PC8, PC9 (M0, M1, M2)
   - Reset Pin: PC10

2. **Phi Motor Driver**:
   - Direction Pin: PC4
   - Step Pin: PC5
   - Enable Pin: PA15
   - Mode Pins: PB13, PB14, PB15 (M0, M1, M2)
   - Reset Pin: PA15

#### Microstepping Modes

The DRV8825 supports microstepping modes controlled by M0, M1, M2 pins:
- Mode 1: Full step
- Mode 2: Half step
- Mode 4: 1/4 step
- Mode 8: 1/8 step
- Mode 16: 1/16 step (default)
- Mode 32: 1/32 step

#### Home Position Detection

- **Theta Home**: Optocoupler sensor on PB3 (EXTI interrupt)
- **Phi Home**: Optocoupler sensor on PB4 (GPIO polling)

### Microcontroller Selection and Pin Mapping

#### STM32F105RBT6 Specifications

- **Core**: ARM Cortex-M3
- **Clock**: 72 MHz (PLL from HSE)
- **Flash**: 128 KB
- **RAM**: 64 KB
- **Package**: LQFP64

#### Pin Mapping

| Function | Pin | Port | Description |
|----------|-----|------|-------------|
| Theta Direction | PB0 | GPIOB | Stepper direction control |
| Theta Step | PB1 | GPIOB | Stepper pulse output |
| Theta Home | PB3 | GPIOB | Optocoupler input (EXTI) |
| Phi Home | PB4 | GPIOB | Optocoupler input |
| ADXL Power | PB5 | GPIOB | Accelerometer power control |
| Reset Button | PB7 | GPIOB | System reset (EXTI) |
| Laser Power | PA1 | GPIOA | LiDAR power control |
| Camera Power | PC3 | GPIOC | Camera module power |
| Theta Enable | PC10 | GPIOC | Motor enable |
| Phi Enable | PA15 | GPIOA | Motor enable |
| Theta Mode 0 | PC7 | GPIOC | Microstep mode |
| Theta Mode 1 | PC8 | GPIOC | Microstep mode |
| Theta Mode 2 | PC9 | GPIOC | Microstep mode |
| Phi Mode 0 | PB13 | GPIOB | Microstep mode |
| Phi Mode 1 | PB14 | GPIOB | Microstep mode |
| Phi Mode 2 | PB15 | GPIOB | Microstep mode |
| USART1 TX | PA9 | GPIOA | PC communication |
| USART1 RX | PA10 | GPIOA | PC communication |
| USART2 TX | PA2 | GPIOA | LiDAR communication |
| USART2 RX | PA3 | GPIOA | LiDAR communication |
| I2C1 SCL | PB6 | GPIOB | ADXL345 interface |
| I2C1 SDA | PB7 | GPIOB | ADXL345 interface |
| ADC1 | PA0 | GPIOA | Temperature sensor |

### Firmware Architecture and Task Flow

#### Main Loop Structure

The firmware operates in a single-threaded main loop with interrupt-driven peripherals:

```c
main() {
    // Initialization
    HAL_Init();
    SystemClock_Config();
    MX_GPIO_Init();
    MX_USART1_UART_Init();  // PC communication
    MX_USART2_UART_Init();  // LiDAR communication
    MX_I2C1_Init();         // ADXL345
    MX_TIM4_Init();         // Microsecond delay timer
    MX_ADC1_Init();         // Temperature sensor
    MX_TIM7_Init();         // System timer
    
    // Peripheral startup
    HAL_TIM_Base_Start(&htim4);
    HAL_ADC_Start(&hadc1);
    adxl_init();
    
    // Main loop
    while(1) {
        Computer_Reciver();  // Process PC commands
        // Background tasks
    }
}
```

#### Command Processing

The `Computer_Reciver()` function processes 9-byte commands from the PC:

**Command Format**: `[CMD][PARAM][PARAM][PARAM][PARAM][PARAM][PARAM][*][,]`

**Supported Commands**:

| Command | Description | Parameters |
|---------|-------------|------------|
| `GOHOME *` | Move to home position | None |
| `S#START*` | Start scanning sequence | None |
| `H+#####*` | Move Theta positive | 5-digit step count |
| `H-#####*` | Move Theta negative | 5-digit step count |
| `V+#####*` | Move Phi positive | 5-digit step count |
| `V-#####*` | Move Phi negative | 5-digit step count |
| `T######*` | Set Theta start | 5-digit step count |
| `P######*` | Set Theta end | 5-digit step count |
| `A######*` | Set Phi start | 5-digit step count |
| `B######*` | Set Phi end | 5-digit step count |
| `D######*` | Set Theta delta | 5-digit step count |
| `d######*` | Set Phi delta | 5-digit step count |
| `QIST000*` | Query distance | None |
| `GETTEMP*` | Get temperature | None |
| `GETADXL*` | Get accelerometer data | None |
| `LASERPT*` | Toggle laser power | None |
| `GETTIME*` | Get RTC time | None |
| `SETT###*` | Set RTC time | Time parameters |

#### Scanning Algorithm

The scanning sequence (`S#START*`) follows this algorithm:

1. Initialize motors and reset position counters
2. Move to theta_start position
3. **For each theta position**:
   - **Forward pass**: Scan from phi_start to phi_end
     - Read distance and strength from LiDAR
     - Output: `distance,strength,phi\n`
     - Move phi by delta_phi
   - Output theta position: `theta*,\n`
   - Increment theta by delta_theta
   - **Reverse pass**: Scan from phi_end to phi_start
     - Read distance and strength from LiDAR
     - Output: `distance,strength,phi\n`
     - Move phi by -delta_phi
   - Output theta position: `theta*,\n`
   - Increment theta by delta_theta
4. Output "Scan End\n" multiple times
5. System reset

#### Data Output Format

During scanning, data is transmitted in the following format:

```
theta_position*,
distance,strength,phi
distance,strength,phi
...
theta_position*,
distance,strength,phi
...
Scan End
```

Where:
- `theta_position`: Floating point Theta angle in steps
- `distance`: Integer distance in millimeters
- `strength`: Integer signal strength (0-65535)
- `phi`: Integer Phi angle in steps

### Data Acquisition and Transmission Protocol

#### Serial Communication Parameters

- **Interface**: UART (USART1)
- **Baud Rate**: 115200
- **Data Bits**: 8
- **Parity**: None
- **Stop Bits**: 1
- **Flow Control**: None

#### Data Packet Structure

**LiDAR Data Packet (9 bytes)**:
```
[0x59][0x59][Dist_L][Dist_H][Str_L][Str_H][Reserved][Reserved][Checksum]
```

**Command Packet (9 bytes)**:
```
[CMD][PARAM1][PARAM2][PARAM3][PARAM4][PARAM5][PARAM6][*][,]
```

#### Response Format

- **Distance Query**: `distance,strength\n`
- **Temperature**: `##.##\r\n` (floating point)
- **ADXL Data**: `X:###Y:###Z:###pitch:###roll:###yaw:###`
- **Time**: Formatted time string
- **Echo**: Command echo for confirmation

### Power Management and Protection Circuits

#### Power Supply Architecture

The system uses a custom power supply board that provides:

1. **Motor Power**: 12V/24V for stepper motors
2. **Logic Power**: 3.3V for microcontroller and sensors
3. **5V Power**: For peripherals (LiDAR, camera)

#### Protection Features

- **Overcurrent Protection**: Fuses on power rails
- **Reverse Polarity Protection**: Diode protection
- **Voltage Regulation**: Linear and switching regulators
- **Power Sequencing**: Controlled startup sequence

#### Power Control

- **Laser Power**: GPIO-controlled (PA1)
- **Camera Power**: GPIO-controlled (PC3)
- **ADXL Power**: GPIO-controlled (PB5)
- **Motor Enable**: GPIO-controlled (PC10, PA15)

### PCB Design Considerations

#### Board Layout

The PCB design includes multiple schematic sheets:

1. **Master.SchDoc**: Main system connections
2. **STM32f105.SchDoc**: Microcontroller and peripherals
3. **DRV8825.SchDoc**: Stepper motor drivers
4. **Laser.SchDoc**: LiDAR interface
5. **Gy_ADXL345.SchDoc**: Accelerometer interface
6. **Power_Supply.SchDoc**: Power management
7. **OptoCunter.SchDoc**: Home position sensors
8. **Esp8266_12E.SchDoc**: WiFi module (optional)
9. **ESP_CAM.SchDoc**: Camera interface
10. **GPS_NEO6.SchDoc**: GPS module (optional)
11. **NRF24l01.SchDoc**: Wireless module (optional)
12. **Relay.SchDoc**: Relay control
13. **Fan.SchDoc**: Cooling fan control

#### Design Considerations

- **Signal Integrity**: Proper grounding and power plane separation
- **Noise Reduction**: Decoupling capacitors near ICs
- **Thermal Management**: Thermal vias and copper pours
- **EMI Shielding**: Ground planes and filtering
- **Mechanical**: Mounting holes and connector placement

---

## Software Technical Documentation

### Software Architecture Overview

The DepoGraph V1.0 software system is built on a Raspberry Pi running a Flask-based web application. The architecture consists of:

1. **Web Interface**: Flask web server providing control and configuration UI
2. **Serial Communication Module**: Handles UART communication with STM32
3. **Data Processing Module**: Converts raw sensor data to point clouds
4. **Coordinate Transformation Module**: Transforms spherical to Cartesian coordinates
5. **Mesh Generation Module**: Creates 3D mesh from point cloud
6. **Database**: SQLite database for configuration storage

### Communication Interface with Hardware

#### Serial Communication Class

The `Serial` class in `main.py` handles communication:

```python
class Serial:
    def __init__(self):
        self.port = '/dev/serial0'  # Raspberry Pi UART
        self.baudrate = 115200
        self.parity = serial.PARITY_NONE
        self.stopbits = serial.STOPBITS_ONE
        self.bytesize = serial.EIGHTBITS
        self.timeout = 1
```

#### Command Sending

Commands are sent as 9-byte strings:
- Format: `[CMD][PARAM][PARAM][PARAM][PARAM][PARAM][PARAM][*][,]`
- Example: `GOHOME *,` (9 bytes)

#### Data Reception

Data is received line-by-line:
- Distance data: `distance,strength\n`
- Position markers: `theta_position*,\n`
- Status messages: `Scan End\n`

### Data Decoding and Synchronization

#### Raw Data Processing

The `create_raw_RTPS()` function processes the raw serial data:

1. **File Writing**: Raw data is saved to `FTP/raw.txt`
2. **Line Parsing**: Each line is parsed based on format:
   - Theta position: Lines containing `*` (format: `value*,\n`)
   - Distance data: Lines with 3 comma-separated values (format: `R,strength,phi\n`)
3. **Coordinate Conversion**: 
   - Theta: `(360/32000) * theta_steps` → degrees
   - Phi: `(360/22400) * phi_steps` → degrees
   - R: Distance in millimeters (from LiDAR)

#### RTPS Format

The processed data is stored in RTPS (Radius, Theta, Phi, Strength) format:
```
R theta phi strength
R theta phi strength
...
```

### Point Cloud Generation Pipeline

#### Coordinate Transformation

The system converts spherical coordinates (R, θ, φ) to Cartesian coordinates (X, Y, Z):

**Transformation Functions** (from `exclusiveMath.py`):

```python
def Xmaker(R, Teta, Phi):
    X = -R * sin(Phi) * cos(Teta)
    
def Ymaker(R, Teta, Phi):
    Y = -R * cos(Phi)
    
def Zmaker(R, Teta, Phi):
    Z = R * sin(Phi) * sin(Teta)
```

**Coordinate System**:
- X: Horizontal axis (left-right)
- Y: Vertical axis (up-down, negative is up)
- Z: Depth axis (forward-backward)

#### Point Cloud Generation Steps

1. **Read RTPS Data**: Parse RTPS file line by line
2. **Convert to XYZ**: Apply transformation for each point
3. **Filter Points**: Optional filtering based on benchmark boundaries
4. **Store Points**: Create `point_list_XYZ` array

### Coordinate System and Transformation Logic

#### Benchmark-Based Calibration

The system uses three benchmark points for coordinate system alignment:

1. **Benchmark 1**: Origin point (0, 0, 0)
2. **Benchmark 2**: X-axis alignment point
3. **Benchmark 3**: Z-axis alignment point

#### Transformation Sequence

The `create_obj()` function performs the following transformations:

1. **Translation**: Move all points relative to Benchmark 1
   ```python
   point = hammarkaz(point, base1_XYZ)  # Subtract base1
   ```

2. **Y-Axis Rotation**: Align Benchmark 2 with X-axis
   ```python
   base2_degree = zavie(1,0,0, 1,0,0)  # Calculate angle
   point = y_rotate(point, base2_degree)  # Rotate around Y
   ```

3. **Z-Axis Rotation**: Align Benchmark 2 with X-axis in XY plane
   ```python
   base2_degree = zavie(1,0,0, 1,0,0)
   point = z_rotate(point, base2_degree)  # Rotate around Z
   ```

4. **X-Axis Rotation**: Align Benchmark 3 with Z-axis
   ```python
   base3_degree = zavie(0,0,1, 0,0,1)
   point = x_rotate(point, base3_degree)  # Rotate around X
   ```

#### Rotation Functions

- **y_rotate()**: Rotation around Y-axis (affects X and Z)
- **z_rotate()**: Rotation around Z-axis (affects X and Y)
- **x_rotate()**: Rotation around X-axis (affects Y and Z)

### Data Visualization

#### Web Interface

The Flask application provides a web-based control interface:

- **Control Page** (`/control`): Manual control and configuration
- **Dashboard** (`/Dashboard`): System status and project management
- **Project Management**: Add/edit/delete scan configurations

#### Camera Integration

- **ESP32-CAM**: IP camera for visual reference
- **Image Capture**: Captures center image of scan area
- **Video Stream**: Real-time video feed during setup

### Export Formats

#### OBJ File Format

The system exports point clouds in Wavefront OBJ format:

```
###base1XYZ x y z
###base1RTP r theta phi
###base2XYZ x y z
###base2RTP r theta phi
###base3XYZ x y z
###base3RTP r theta phi
v x y z
v x y z
...
```

#### Mesh Generation

The `meshmaker()` function creates a mesh from the point cloud:

1. **Grid Creation**: Creates a regular grid based on `deltamesh` parameter
2. **Point Assignment**: Assigns nearest point to each grid cell
3. **Triangle Generation**: Creates triangles from grid points
4. **Volume Calculation**: Calculates volume using triangular prism method

**Mesh File Format**:
```
#totalXpoint-totalZpoint
v x y z
v x y z
...
f v1 v2 v3
f v1 v2 v3
...
```

#### Export Files

- **raw.txt**: Raw serial data from scanner
- **RTPS.txt**: Processed spherical coordinates
- **point_Cloud.obj**: Cartesian point cloud
- **meshed.obj**: Triangulated mesh with faces

### Build, Run, and Deployment Instructions

#### Software Dependencies

**Python Packages**:
```
flask
pyserial
requests
pandas
tqdm
RPi.GPIO
```

#### Installation Steps

1. **Install Python Dependencies**:
   ```bash
   pip install flask pyserial requests pandas tqdm RPi.GPIO
   ```

2. **Enable Serial Interface** (Raspberry Pi):
   ```bash
   sudo raspi-config
   # Enable Serial Interface
   ```

3. **Configure Serial Port**:
   - Ensure `/dev/serial0` is available
   - Set permissions: `sudo chmod 666 /dev/serial0`

4. **Initialize Database**:
   - The SQLite database (`db.sqlite3`) is created automatically
   - Schema includes `scanner_position_point_base` table

5. **Run Application**:
   ```bash
   python run.py
   ```
   - Web interface: `http://raspberry-pi-ip:60000`
   - Control page: `http://raspberry-pi-ip:60000/control`

#### Configuration

**Database Configuration**:
- Project Name: Identifier for scan project
- Zone Name: Sub-area identifier
- Scanner ID: Unique scanner identifier
- Benchmark Points: 3 calibration points (R, θ, φ and X, Y, Z)
- Scan Points: 4 corner points defining scan area
- Delta Point: Distance between point cloud points (mm)
- Delta Mesh: Distance between mesh segments (mm)
- Initial Volume: Base volume for calculation (m³)

#### Scanning Workflow

1. **Hardware Setup**: Connect scanner to Raspberry Pi via UART
2. **Web Interface**: Access control page
3. **Calibration**: Set benchmark points and scan area
4. **Configuration**: Set scan parameters
5. **Start Scan**: Click "Quick Start" button
6. **Data Processing**: System processes data automatically
7. **Export**: Download OBJ files from FTP directory

#### FTP Upload (Optional)

The system can upload results to an FTP server:
- Server: `sednatech.ir`
- Directory: `./ProjectName/ZoneName/`
- Files: `point_Cloud_ScannerID.obj`, `meshed_ScannerID.obj`, `img_ScannerID.jpg`

---

## Appendix

### Communication Protocol Reference

#### Command Examples

- `GOHOME *,` - Move to home position
- `H+00100*` - Move Theta +100 steps
- `V-00050*` - Move Phi -50 steps
- `T#00000*` - Set Theta start to 0
- `P#16000*` - Set Theta end to 16000 (180°)
- `A#00000*` - Set Phi start to 0
- `B#05600*` - Set Phi end to 5600 (90°)
- `D#00016*` - Set Theta delta to 16 steps
- `d#00016*` - Set Phi delta to 16 steps
- `S#START*` - Start scanning
- `QIST000*` - Query distance
- `GETTEMP*` - Get temperature
- `GETADXL*` - Get accelerometer data

### Coordinate System Reference

- **Spherical to Cartesian**:
  - X = -R × sin(φ) × cos(θ)
  - Y = -R × cos(φ)
  - Z = R × sin(φ) × sin(θ)

- **Step to Degree Conversion**:
  - Theta: 1 step = 360/32000 = 0.01125°
  - Phi: 1 step = 360/22400 = 0.01607°

### File Structure

```
Software/
├── RPI_CODE/
│   └── Depo-New Class 02-03-10/
│       ├── main.py              # Core scanning logic
│       ├── run.py               # Flask web server
│       ├── exclusiveMath.py     # Math functions
│       ├── db.sqlite3           # Configuration database
│       ├── templates/           # HTML templates
│       ├── static/              # CSS/JS assets
│       └── FTP/                 # Output directory
│           ├── raw.txt          # Raw serial data
│           ├── RTPS.txt         # Spherical coordinates
│           ├── point_Cloud.obj # Point cloud
│           └── meshed.obj      # Mesh file
```

---

**Document Version**: 1.0  
**Last Updated**: 2025  
**Author**: DepoGraph Development Team

