# PCR v1.0 - Polymerase Chain Reaction Controller

## Project Overview

PCR v1.0 is an embedded control system designed for precise timing and temperature-controlled operations. The project is currently implemented at the firmware/software level, targeting off-the-shelf Arduino and ESP development boards. This is a development/prototype stage project with no custom PCB design yet.

### Key Features

- **Precise Timing Control**: Millisecond-accurate timing operations
- **Temperature Monitoring**: Real-time temperature sensing using OneWire DS18B20 sensors
- **Web-Based Interface**: WiFi-enabled control via ESP8266/ESP32 (optional)
- **Flexible Architecture**: Supports standalone Arduino, ESP-only, or hybrid configurations
- **Serial Communication**: Command interface for integration with other systems
- **State Persistence**: Settings saved in EEPROM (ESP versions)

---

## Current Project Status

### ✅ Implemented

- Arduino Mega 2560 firmware with timing control and temperature monitoring
- ESP8266 web server implementations with WiFi Access Point mode
- ESP32-compatible firmware (async web server)
- Serial communication protocol for inter-board communication
- Web-based user interface with real-time temperature display
- Relay control functionality (ESP8266 versions)
- EEPROM-based state persistence

### ⚠️ Limitations

- **No Custom PCB**: Project uses development boards only
- **Prototype Stage**: Not intended for production use without additional safety systems
- **Multiple Implementations**: Various firmware versions exist (evolution of design)
- **Hardware Assumptions**: Some hardware details inferred from code
- **Documentation**: Based on code analysis (hardware not physically verified)

### 🔄 Future Development

- Custom PCB design
- Hardware verification and testing
- Unified firmware architecture
- Enhanced safety features
- Production-ready implementation

---

## Supported Platforms

### Arduino Platform
- **Arduino Mega 2560**
  - Primary implementation for timing control
  - Serial communication interface
  - Temperature sensor support

### ESP Platform
- **ESP8266** (NodeMCU or compatible)
  - Web server implementations
  - WiFi Access Point mode
  - Relay control capabilities

- **ESP32** (compatible code available)
  - Enhanced web server with async support
  - Dual-core processing capabilities

### Hybrid Configuration
- **Arduino Mega 2560 + ESP8266/ESP32**
  - ESP handles web interface and WiFi
  - Arduino handles precise timing
  - Serial communication bridges the two

---

## Repository Structure

```
PCR_V1/
│
├── README.md                          # This file - project overview
├── Technical_Documentation.md         # Technical details for engineers
├── User_Manual.md                     # User guide for technicians
│
├── mega2560_macrowave/                # Arduino Mega 2560 firmware
│   └── mega2560_macrowave.ino        # Main control logic
│
└── web/                               # ESP8266/ESP32 web server implementations
    ├── AP_Server/                     # Basic AP server example
    │   └── AP_Server.ino
    │
    ├── ap_Server2/                    # Relay control with EEPROM
    │   └── ap_Server2.ino
    │
    ├── ap_Server3/                    # Relay control + temperature
    │   └── ap_Server3.ino
    │
    ├── ap_Server4/                    # Relay control (duplicate)
    │   └── ap_Server4.ino
    │
    ├── HttpConnetio/                  # HTTP client example
    │   └── HttpConnetio.ino
    │
    ├── LoopWeb/                       # HTTP GET loop example
    │   └── LoopWeb.ino
    │
    ├── server_input1/                 # Web form input example
    │   └── server_input1.ino
    │
    ├── server_input1_5112022/         # Enhanced web interface
    │   └── server_input1_5112022.ino  # Recommended ESP8266 implementation
    │
    ├── textbox/                       # Text input example
    │   └── textbox.ino
    │
    ├── Webserver/                     # Basic web server
    │   └── Webserver.ino
    │
    ├── index.html                     # Standalone HTML interface
    └── Sedna MircoWave Controller.html # HTML template
```

### Key Files

- **`mega2560_macrowave.ino`**: Core timing and control firmware for Arduino Mega
- **`server_input1_5112022.ino`**: Most complete ESP8266 web server implementation
- **`LoopWeb.ino`**: ESP8266 HTTP client example (for remote data logging)

---

## Quick Start Guide

### Prerequisites

- Arduino IDE (1.8.x or 2.x)
- USB cable for your board
- Required hardware (see User Manual)

### Installation Steps

1. **Install Arduino IDE**
   - Download from: https://www.arduino.cc/en/software

2. **Install Board Support Packages**
   - **For ESP8266**: Add board manager URL: `https://arduino.esp8266.com/stable/package_esp8266com_index.json`
   - **For ESP32**: Add board manager URL: `https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json`
   - Install via Tools → Board → Boards Manager

3. **Install Required Libraries**
   - OneWire (by Paul Stoffregen)
   - DallasTemperature (by Miles Burton)
   - ESPAsyncWebServer (for ESP8266/ESP32 async implementations)
   - ESPAsyncTCP (for ESP8266) or AsyncTCP (for ESP32)

4. **Upload Firmware**
   - Open desired `.ino` file
   - Select correct board and port
   - Click Upload

5. **Connect Hardware**
   - Wire temperature sensor (see User Manual)
   - Connect control outputs/relays as needed
   - Power on the system

### Basic Usage

#### Arduino Mega Standalone
1. Open Serial Monitor (115200 baud)
2. Send command: `01000,` (for 1 second operation)
3. Monitor temperature and status

#### ESP8266 Web Interface
1. Connect to WiFi AP (default: "Sedna" / "123456789")
2. Open browser: `http://192.168.4.1`
3. Use web interface to control system

---

## Documentation

This project includes comprehensive documentation:

### 📘 [Technical Documentation](Technical_Documentation.md)
**For**: Electronics Engineers and Embedded Developers

**Contents**:
- Hardware specifications and pin mappings
- Firmware architecture and algorithms
- Communication protocols
- Build and debugging instructions
- PCB design considerations

### 📗 [User Manual](User_Manual.md)
**For**: Technicians, Testers, and End Users

**Contents**:
- System overview and setup
- Wiring instructions
- Software installation
- Operation procedures
- Troubleshooting guide

### 📙 README.md (This File)
**For**: All Users

**Contents**:
- Project overview
- Quick start guide
- Repository structure
- Documentation references

---

## Hardware Requirements

### Minimum Setup (Arduino Mega)
- Arduino Mega 2560
- DS18B20 temperature sensor
- 4.7kΩ resistor (pull-up for sensor)
- USB cable
- Computer for programming

### Web-Controlled Setup (ESP8266)
- ESP8266 board (NodeMCU recommended)
- DS18B20 temperature sensor
- 4.7kΩ resistor
- 4-channel relay module (optional)
- USB cable
- Computer/phone with web browser

### Hybrid Setup (Arduino + ESP)
- Arduino Mega 2560
- ESP8266 board
- Level shifter (5V ↔ 3.3V)
- DS18B20 temperature sensor
- 4.7kΩ resistor
- Relay module (optional)
- USB cables for both boards

**Detailed wiring instructions**: See [User Manual - Section 4](User_Manual.md#4-wiring-and-connection-instructions)

---

## Communication Protocols

### Serial Command Protocol (Arduino)
- **Format**: `XXXXX,` (5 digits + comma)
- **Example**: `01000,` = 1000 milliseconds
- **Minimum**: 452 milliseconds
- **Baud Rate**: 115200

### HTTP Protocol (ESP8266/ESP32)
- **Method**: GET requests
- **Port**: 80
- **Endpoints**:
  - `/` - Main web interface
  - `/temp` - Temperature reading (AJAX)
  - `/status` - System status (AJAX)
  - `/get` - Command submission

### WiFi Access Point
- **Mode**: Access Point (AP)
- **Default IP**: 192.168.4.1
- **Security**: WPA2-PSK
- **SSID/Password**: Configurable in firmware

**Detailed protocol specifications**: See [Technical Documentation - Section B.5](Technical_Documentation.md#b5-communication-protocols)

---

## Configuration

### Arduino Mega
- No configuration required
- Ready to use after upload

### ESP8266/ESP32
- **WiFi Settings**: Edit SSID and password in firmware
- **Pin Assignments**: Modify GPIO definitions if needed
- **Relay Logic**: Verify active HIGH/LOW configuration

**Configuration details**: See [User Manual - Section 7](User_Manual.md#7-initial-configuration)

---

## Troubleshooting

Common issues and solutions:

- **Board not recognized**: Install USB drivers (CH340, CP2102)
- **Upload fails**: Hold BOOT button during upload (ESP boards)
- **Temperature sensor not working**: Check wiring and pull-up resistor
- **WiFi AP not visible**: Wait 10-30 seconds, check Serial Monitor
- **Web page not loading**: Verify IP address, try different browser

**Complete troubleshooting guide**: See [User Manual - Section 10](User_Manual.md#10-basic-troubleshooting)

---

## Safety Notes

⚠️ **Important Safety Information**

- This is a **development/prototype system**
- Not intended for critical applications without additional safety systems
- Always verify hardware connections before applying power
- Use appropriate voltage levels (5V Arduino vs 3.3V ESP)
- Follow electrical safety guidelines for relay connections
- Monitor operation and have manual override capability

**Complete safety information**: See [User Manual - Section 9](User_Manual.md#9-safety-notes)

---

## Contributing

This project is in active development. When contributing:

1. Follow existing code style
2. Document hardware assumptions
3. Update relevant documentation
4. Test on actual hardware when possible

---

## License

See [LICENSE](LICENSE) file for license information.

---

## Support and Resources

### Documentation
- **Technical Details**: [Technical_Documentation.md](Technical_Documentation.md)
- **User Guide**: [User_Manual.md](User_Manual.md)

### External Resources
- [Arduino Official Website](https://www.arduino.cc/)
- [ESP8266 Arduino Core](https://github.com/esp8266/Arduino)
- [ESP32 Arduino Core](https://github.com/espressif/arduino-esp32)
- [OneWire Library](https://www.pjrc.com/teensy/td_libs_OneWire.html)
- [DallasTemperature Library](https://github.com/milesburton/Arduino-Temperature-Control-Library)

---

## Version History

- **v1.0** (Current)
  - Initial firmware implementations
  - Arduino Mega 2560 support
  - ESP8266/ESP32 web server support
  - Temperature monitoring
  - Basic documentation

---

## Contact and Feedback

For questions, issues, or feedback:
- Review documentation first
- Check troubleshooting sections
- Verify hardware setup matches documentation

---

**Last Updated**: Based on current codebase analysis

**Note**: This documentation is based on source code analysis. Hardware details are inferred and should be verified during physical implementation.
