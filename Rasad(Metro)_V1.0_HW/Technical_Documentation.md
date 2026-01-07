# Technical Documentation - Rasad (Metro) v1.0

## Table of Contents
1. [Hardware & Embedded System Documentation](#hardware--embedded-system-documentation)
2. [Software Technical Documentation](#software-technical-documentation)

---

## Hardware & Embedded System Documentation

### System Architecture Overview

The Rasad (Metro) v1.0 system consists of three main hardware components:

1. **Tunnel Sensor Units** - Detect train movement in metro tunnels
2. **Yellow Line Sensor Units** - Detect passenger violations at platform edges
3. **Receiver Unit** - Aggregates sensor data and forwards to PC

All sensor units communicate wirelessly with the receiver using the nRF24L01 2.4GHz transceiver module.

### System Block Diagram

```
┌─────────────────┐         ┌─────────────────┐
│ Tunnel Sensor   │         │ Yellow Line     │
│ (ESP8266)       │         │ Sensor (ESP8266)│
│                 │         │                 │
│ - LiDAR (TFMini)│         │ - IR Comparator │
│ - NRF24L01      │         │ - NRF24L01      │
└────────┬────────┘         └────────┬────────┘
         │                            │
         │    nRF24L01 (2.4GHz)       │
         │                            │
         └────────────┬───────────────┘
                      │
         ┌─────────────▼─────────────┐
         │   Receiver Unit (ESP32)   │
         │                           │
         │ - NRF24L01 (Receiver)     │
         │ - USB-Serial Interface    │
         │ - LCD Display (I2C)       │
         └─────────────┬─────────────┘
                      │
         ┌────────────▼──────────────┐
         │   PC Software System      │
         │   (Python + Web Server)   │
         └───────────────────────────┘
```

### Tunnel Sensor Hardware Design

#### Components
- **Microcontroller**: ESP8266 (ESP-12E module)
- **Distance Sensor**: TFMini LiDAR (Time-of-Flight laser rangefinder)
- **Wireless Communication**: nRF24L01 2.4GHz transceiver
- **Power Supply**: 12V input with onboard regulator
- **PCB Dimensions**: 84.582mm × 57.658mm (Metro_V3)

#### Pin Mapping (ESP8266)
- **Pin 16 (D0)**: nRF24L01 CE (Chip Enable)
- **Pin 15 (D8)**: nRF24L01 CSN (Chip Select)
- **Pin 5 (D1)**: Status LED output
- **Serial (UART)**: TFMini LiDAR communication (115200 baud)

#### Signal Processing Approach

The tunnel sensor uses a dual-threshold detection system:

1. **TRDIST1** (Default: 86cm): Train entry detection threshold
   - When distance < TRDIST1, train is entering
   - Counter increments while distance is in range [TRDIST1, TRDIST1+area]
   - When counter > CNT (default: 30), train entry confirmed → sends 'i' (in) or 'o' (out)

2. **TRDIST2** (Default: 380cm): Train exit detection threshold
   - When distance < mid (calibration point) and distance > TRDIST2+area2+10, person detected
   - Counter increments while distance is in range [TRDIST2, TRDIST2+area2]
   - When counter > CNT, train exit confirmed → sends opposite direction message

3. **Person Detection**:
   - Detects when distance < TRDIST1-2 (person too close)
   - Detects when distance > TRDIST2+area2+10 (person in exit zone)
   - Sends 'p' (person) message

#### TFMini LiDAR Protocol

The sensor communicates with TFMini using a 9-byte packet format:
- **Header**: 0x59, 0x59 (2 bytes)
- **Distance Low**: Byte 2
- **Distance High**: Byte 3
- **Strength Low**: Byte 4
- **Strength High**: Byte 5
- **Temperature Low**: Byte 6
- **Temperature High**: Byte 7
- **Checksum**: Byte 8 (sum of bytes 0-7, modulo 256)

Distance calculation: `distance = uart[2] + uart[3] * 256` (in cm)

### Yellow Line Sensor Hardware Design

#### Components
- **Microcontroller**: ESP8266 (ESP-12E module)
- **IR Detection**: LM358 comparator-based IR receiver circuit
- **Wireless Communication**: nRF24L01 2.4GHz transceiver
- **Additional Input**: Analog sensor on A0, Digital input on Pin 5
- **Power Supply**: 12V input with onboard regulator

#### Pin Mapping (ESP8266)
- **Pin 16 (D0)**: nRF24L01 CE
- **Pin 15 (D8)**: nRF24L01 CSN
- **Pin 5 (D1)**: Digital input (pull-up enabled)
- **A0**: Analog input for IR sensor

#### Detection Logic

The yellow line sensor detects when passengers cross the safety line:

1. **IR Detection**: 
   - Digital input (Pin 5) = LOW OR Analog (A0) ≤ 50 → Yellow line violation
   - Sends 'Y1,' or 'Y2,' message

2. **Debouncing**: 
   - Minimum 1 second between detections (millis() - t1 > 1000)

### Receiver Unit Hardware Design

#### Components
- **Microcontroller**: ESP32 or ESP8266
- **Wireless Communication**: nRF24L01 2.4GHz receiver
- **Display**: I2C LCD (16×2, address 0x27)
- **USB-Serial Interface**: CP2102 or similar USB-to-UART bridge
- **Power Supply**: 12V input with onboard regulator
- **PCB Dimensions**: 85.09mm × 101.6mm

#### Pin Mapping (ESP32/ESP8266)
- **Pin 16**: nRF24L01 CE
- **Pin 15**: nRF24L01 CSN
- **I2C Bus**: SDA/SCL for LCD display
- **USB-Serial**: Connected to PC via USB cable

#### Functionality

1. **Wireless Reception**: Listens on nRF24L01 address "00100"
2. **Data Forwarding**: Forwards received messages to PC via Serial (115200 baud)
3. **Display**: Shows received data and connection status on LCD
4. **Protocol**: Receives 3-4 byte messages and forwards as-is to serial port

### Communication Protocol

#### nRF24L01 Configuration
- **Address**: "00100" (5-byte address)
- **Data Rate**: 250 kbps (RF24_250KBPS)
- **Power Level**: Maximum (RF24_PA_MAX)
- **Channel**: Default (2.4GHz ISM band)

#### Message Format

**Tunnel Sensor Messages:**
- `'i1,'` - Train entering tunnel 1
- `'o1,'` - Train exiting tunnel 1
- `'i2,'` - Train entering tunnel 2
- `'o2,'` - Train exiting tunnel 2
- `'p1,'` - Person detected in tunnel 1
- `'p2,'` - Person detected in tunnel 2

**Yellow Line Sensor Messages:**
- `'Y1,'` - Yellow line violation detected (sensor 1)
- `'Y2,'` - Yellow line violation detected (sensor 2)

**Door Sensor Messages:**
- `'1O'` - Door open
- `'1C'` - Door closed

**Message Structure:**
- Format: `[event][tunnel_number][terminator]`
- Example: `'i1,'` = train in, tunnel 1, comma terminator
- Messages are sent 5 times with 40ms delay between transmissions for reliability

### Power Supply Design

#### Specifications
- **Input**: 12V DC, 3A maximum
- **Output**: 3.3V for ESP8266/ESP32, 5V for peripherals
- **Protection**: Reverse polarity protection, overcurrent protection
- **Regulation**: Switching regulator for efficiency

#### Power Consumption
- **Tunnel Sensor**: ~200-300mA @ 12V (active)
- **Yellow Line Sensor**: ~150-200mA @ 12V (active)
- **Receiver**: ~250-350mA @ 12V (active)

### Firmware Architecture

#### Tunnel Sensor Firmware (`loop_terminal041322.ino`)

**Main Functions:**
- `setup()`: Initializes NRF24L01, TFMini, WiFi, EEPROM, loads configuration
- `loop()`: Continuous distance measurement, train/person detection, data transmission
- `rangfinder()`: Reads TFMini LiDAR data via Serial
- `senddata(char g)`: Transmits event messages via nRF24L01
- `terM()`: Handles web terminal interface

**Configuration Parameters (EEPROM):**
- Address 6: Tunnel number (1 or 2)
- Address 10: TRDIST1 (train entry threshold, default 86cm)
- Address 13: TRDIST2 (train exit threshold, default 380cm)
- Address 16: CNT (counter threshold, default 30)
- Address 20: area (detection area for TRDIST1, default 100cm)
- Address 24: area2 (detection area for TRDIST2, default 100cm)
- Address 2: mid (calibration midpoint distance)

**Detection Algorithm:**
1. Continuously read distance from TFMini
2. Check if distance is in train entry zone [TRDIST1, TRDIST1+area]
3. Increment counter while in zone
4. If counter > CNT and timeout conditions met → send train entry/exit message
5. Check for person violations (distance too close or in exit zone)
6. Send person detection messages with debouncing

#### Yellow Line Sensor Firmware (`Metro_Esp_Test.ino`)

**Main Functions:**
- `setup()`: Initializes NRF24L01, configures pins
- `loop()`: Reads IR sensor, detects violations, transmits messages

**Detection Logic:**
- Digital input (Pin 5) LOW OR Analog (A0) ≤ 50 → violation detected
- Sends 'Y1,' or 'Y2,' message with 1-second debouncing

#### Receiver Firmware (`Receiver.ino`)

**Main Functions:**
- `setup()`: Initializes NRF24L01 receiver, Serial, LCD
- `loop()`: Receives messages, displays on LCD, forwards to Serial

**Data Flow:**
1. Receive message from nRF24L01
2. Display on LCD (address portion and message)
3. Forward to PC via Serial.println()
4. Display time since last message

### PCB Design Notes

#### Metro_V3 (Tunnel/Yellow Line Sensor)
- **Layers**: 2-layer PCB
- **Board Size**: 84.582mm × 57.658mm
- **Components**: 63 components
- **Connections**: 150 routed connections
- **Via Count**: 63 vias
- **Track Widths**: 0.02mm to 2.016mm (various signal and power traces)

#### Receiver PCB
- **Layers**: 2-layer PCB
- **Board Size**: 85.09mm × 101.6mm
- **Components**: 64 components
- **Connections**: 162 routed connections
- **Via Count**: 81 vias

#### Design Considerations
- Power and ground planes for noise reduction
- Decoupling capacitors near ICs
- Proper trace routing for RF signals (nRF24L01)
- Thermal vias for heat dissipation
- Keep-out zones for mounting holes

---

## Software Technical Documentation

### Software Architecture Overview

The software system consists of three main components:

1. **Python Serial Interface** - Receives data from receiver, updates database
2. **MySQL Database** - Stores alarm states, logs, user data
3. **Web Interface** - PHP-based dashboard for monitoring and control

### Communication Interface

#### Serial Communication Protocol

**Connection Parameters:**
- **Baud Rate**: 115200
- **Data Bits**: 8
- **Parity**: None
- **Stop Bits**: 1
- **Timeout**: 1 second

**Device Identification:**
- Python application identifies receiver by hardware ID stored in `Driver.dda` file
- Hardware ID format: First 21 characters of USB device hardware ID
- Example: `USB VID:PID=10C4:EA60`

**Data Format:**
- Messages received as newline-terminated strings
- Format: `[event][tunnel][terminator]\r\n`
- Examples:
  - `'i1,\r\n'` - Train entering tunnel 1
  - `'o2,\r\n'` - Train exiting tunnel 2
  - `'Y1,\r\n'` - Yellow line violation sensor 1
  - `'1O\r\n'` - Door open

### Data Format and Protocol Decoding

#### Python Application (`My_App.py`)

**Main Components:**
- Serial port detection and connection
- Database connection (MySQL via pymysql)
- Message parsing and event classification
- Database update logic with debouncing

**Event Classification:**

1. **Train Events:**
   - `'i1,\r\n'` → Train entering tunnel 1
   - `'o1,\r\n'` → Train exiting tunnel 1
   - `'i2,\r\n'` → Train entering tunnel 2
   - `'o2,\r\n'` → Train exiting tunnel 2

2. **Person Events:**
   - `'p1,\r\n'` → Person detected in tunnel 1
   - `'p2,\r\n'` → Person detected in tunnel 2

3. **Yellow Line Events:**
   - `'Y1,\r\n'` → Yellow line violation sensor 1
   - `'Y2,\r\n'` → Yellow line violation sensor 2

4. **Door Events:**
   - `'1O\r\n'` → Door open
   - `'1C\r\n'` → Door closed

**Debouncing Logic:**
- Each event type has a configurable delay in `alarm_settime` table
- Events are only processed if: `current_timestamp > last_update + delay + last_read`
- Prevents duplicate processing of rapid-fire events

### Database Schema

#### Table: `alarm`
Stores current alarm states and timestamps.

**Columns:**
- `p1_update`, `p1_read` - Person in tunnel 1 (update timestamp, read timestamp)
- `i1_update`, `i1_read` - Train in tunnel 1 (update timestamp, read timestamp)
- `o1_update`, `o1_read` - Train out tunnel 1 (update timestamp, read timestamp)
- `y1_update`, `y1_read` - Yellow line sensor 1 (update timestamp, read timestamp)
- `p2_update`, `p2_read` - Person in tunnel 2
- `i2_update`, `i2_read` - Train in tunnel 2
- `o2_update`, `o2_read` - Train out tunnel 2
- `y2_update`, `y2_read` - Yellow line sensor 2
- `door` - Door state ('open' or 'close')

**Update Mechanism:**
- Python application updates `*_update` fields when events occur
- Web interface reads `*_read` fields and compares with `*_update`
- When mismatch detected, alarm is triggered and `*_read` is updated

#### Table: `alarm_settime`
Stores debouncing delays for each event type.

**Columns:**
- `line` - Yellow line alarm delay (seconds, default: 10)
- `inTrain` - Train entry alarm delay (seconds, default: 10)
- `outTrain` - Train exit alarm delay (seconds, default: 10)
- `inPerson` - Person detection alarm delay (seconds, default: 10)
- `id` - Primary key

#### Table: `logs`
Stores user activity logs.

**Columns:**
- `user` - Username
- `log` - Log message
- `date` - Timestamp (auto-generated)
- `id` - Primary key (auto-increment)

#### Table: `users`
Stores user accounts and permissions.

**Columns:**
- `user` - Username (primary key)
- `pass` - MD5 hashed password
- `role` - User role ('operator' or 'SuperUser')
- `ID` - Auto-increment ID

#### Table: `voicelogs`
Stores voice alert playback logs.

**Columns:**
- `user` - Username
- `log` - Log message
- `date` - Timestamp
- `id` - Primary key

#### Table: `voice_permission`
Controls which voice alerts are enabled.

**Columns:**
- `yellow_line` - Enable yellow line alerts ('yes'/'no')
- `person_in` - Enable person detection alerts ('yes'/'no')
- `train_in` - Enable train entry alerts ('yes'/'no')
- `train_out` - Enable train exit alerts ('yes'/'no')

### Event Detection and Classification Logic

#### Python Application Event Processing

**Algorithm:**
1. Read line from serial port
2. Check message format and length
3. Get current timestamp
4. Query `alarm_settime` for delay values
5. Query `alarm` table for last read timestamps
6. Calculate: `should_process = (current_time > delay + last_read + last_update)`
7. If condition met, update corresponding `*_update` field
8. Commit transaction

**Example Processing:**
```python
# Train entering tunnel 1
if (x=='i1,\r\n') and (int(time_stamp)>int(delay['inTrain'])+int(read['i1_read'])):
    comm1="""UPDATE `alarm` SET `i1_update`='"""+str(time_stamp)+"""' """
    c.execute(comm1)
    connection.commit()
```

### Alert and Warning Generation Mechanisms

#### Web Interface Alert System

**Visual Alerts:**
1. **Train Position Indicators:**
   - Green spinner for tunnel 1/2 when train present
   - Red spinner when person detected in tunnel
   - Animated train icons showing position

2. **Yellow Line Alerts:**
   - Progress bar changes color:
     - Red: Violation detected
     - Yellow: Warning state
     - Green: Safe state

3. **Door Status:**
   - Green door icon when closed
   - Red spinner when open

**Audio Alerts:**
- JavaScript-based audio playback system
- Queue management for multiple alerts
- Audio files:
  - `yellow_line.mp3` - Yellow line violation
  - `person_in.mp3` - Person in tunnel
  - `train_in.mp3` - Train entering
  - `train_out.mp3` - Train exiting

**Alert Timing:**
- Alerts are displayed for duration specified in `alarm_settime` table
- Visual indicators reset after timeout period
- Audio alerts play sequentially from queue

### User Interface Overview

#### Web Dashboard (`home.php`)

**Main Components:**
1. **Metro Station Visualization:**
   - Animated train icons
   - Tunnel indicators
   - Yellow line progress bars
   - Door status indicator

2. **Real-time Status Updates:**
   - AJAX polling every 1 second
   - Checks for new alarm events
   - Updates visual indicators
   - Triggers audio alerts

3. **CCTV Module Placeholder:**
   - Camera integration area (currently inactive)

4. **Voice Control Panel:**
   - Enable/disable specific voice alerts
   - Configure alert permissions

#### Alarm Configuration Page (`alarms.php`)

**Features:**
- Configure debouncing delays for each event type
- Set alarm thresholds
- View current alarm states
- Admin-only access

#### User Management (`users.php`)

**Features:**
- Create/edit user accounts
- Set user roles (operator/SuperUser)
- View user activity logs

#### Logs Pages
- **User Logs** (`userlogs.php`): System activity logs
- **Voice Logs** (`voicelogs.php`): Voice alert playback history

### Logging and Data Storage

#### Logging System

**Python Application Logging:**
- Serial data received logged to console
- Database errors logged with rollback
- Connection status monitored

**Web Interface Logging:**
- User actions logged to `logs` table
- Voice alert plays logged to `voicelogs` table
- Timestamps automatically generated

**Database Logging:**
- All alarm state changes timestamped
- User authentication attempts logged
- Configuration changes tracked

### Build, Run, and Deployment Instructions

#### Python Application Setup

**Requirements:**
- Python 3.x
- PyQt5
- pymysql
- pyserial

**Installation:**
```bash
pip install PyQt5 pymysql pyserial
```

**Configuration:**
1. Create `Driver.dda` file with receiver USB hardware ID
2. Update database credentials in `My_App.py`:
   - Host: 'localhost'
   - User: 'Ha3k'
   - Password: 'Ven7975006'
   - Database: 'rasad_metro'

**Running:**
```bash
python My_App.py
```

Or use compiled executable:
```bash
My_App.exe
```

#### Web Server Setup

**Requirements:**
- Apache/Nginx web server
- PHP 7.3+
- MySQL 5.7+

**Installation:**
1. Copy `webServer/metro2/` to web server document root
2. Import database schema from `rasad_metro.sql`
3. Update database credentials in `fileatt/public/connection.php`

**Database Configuration:**
```php
$etesal=mysqli_connect('localhost', 'Ha3k', 'Ven7975006' , 'rasad_metro');
```

**Access:**
- URL: `http://localhost/metro2/`
- Default admin: Username: `Admin`, Password: `123456` (MD5: e10adc3949ba59abbe56e057f20f883e)

#### Deployment Checklist

1. **Hardware:**
   - Install sensor units in tunnels and platform edges
   - Install receiver unit near PC
   - Connect power supplies (12V)
   - Verify nRF24L01 communication range

2. **Firmware:**
   - Upload tunnel sensor firmware to ESP8266 units
   - Upload yellow line sensor firmware
   - Upload receiver firmware
   - Configure sensor IDs and thresholds via web terminal

3. **Software:**
   - Install Python dependencies
   - Configure `Driver.dda` with receiver hardware ID
   - Set up MySQL database
   - Deploy web server files
   - Configure database credentials

4. **Testing:**
   - Verify serial communication
   - Test sensor detection
   - Verify database updates
   - Test web interface alerts
   - Verify audio alerts

### System Integration

**Data Flow:**
1. Sensor detects event → nRF24L01 transmission
2. Receiver receives message → Serial output
3. Python application reads Serial → Database update
4. Web interface polls database → Visual/Audio alert

**Synchronization:**
- Timestamp-based event processing prevents duplicate alerts
- Database acts as central state repository
- Web interface provides real-time visualization

---

## Appendix

### Pin Reference Tables

#### ESP8266 Pin Functions
| Pin | Function | Description |
|-----|----------|-------------|
| D0 (16) | nRF24L01 CE | Chip Enable |
| D8 (15) | nRF24L01 CSN | Chip Select |
| D1 (5) | GPIO | Status LED / Digital Input |
| A0 | ADC | Analog Input (IR sensor) |
| TX/RX | UART | TFMini LiDAR / Serial Debug |

#### nRF24L01 Connections
| nRF24L01 Pin | ESP8266 Pin | Function |
|--------------|-------------|----------|
| CE | D0 (16) | Chip Enable |
| CSN | D8 (15) | Chip Select |
| MOSI | MOSI | SPI Data Out |
| MISO | MISO | SPI Data In |
| SCK | SCK | SPI Clock |
| VCC | 3.3V | Power |
| GND | GND | Ground |

### Message Protocol Reference

| Message | Event | Direction |
|---------|-------|-----------|
| i1, | Train entering tunnel 1 | Sensor → Receiver |
| o1, | Train exiting tunnel 1 | Sensor → Receiver |
| i2, | Train entering tunnel 2 | Sensor → Receiver |
| o2, | Train exiting tunnel 2 | Sensor → Receiver |
| p1, | Person in tunnel 1 | Sensor → Receiver |
| p2, | Person in tunnel 2 | Sensor → Receiver |
| Y1, | Yellow line violation 1 | Sensor → Receiver |
| Y2, | Yellow line violation 2 | Sensor → Receiver |
| 1O | Door open | Sensor → Receiver |
| 1C | Door closed | Sensor → Receiver |

### Default Configuration Values

| Parameter | Default | EEPROM Address | Description |
|----------|---------|----------------|-------------|
| Tunnel Number | 1 | 6 | Sensor tunnel assignment |
| TRDIST1 | 86 | 10 | Train entry threshold (cm) |
| TRDIST2 | 380 | 13 | Train exit threshold (cm) |
| CNT | 30 | 16 | Detection counter threshold |
| area | 100 | 20 | Detection area for TRDIST1 (cm) |
| area2 | 100 | 24 | Detection area for TRDIST2 (cm) |
| mid | 0 | 2 | Calibration midpoint (cm) |

---

**Document Version:** 1.0  
**Last Updated:** Based on project files analysis  
**Author:** Technical Documentation Team

