# DepoGraph V2.5

DepoGraph V2.5 is a 3D laser scanner system that captures three-dimensional data and transmits it through multiple communication interfaces including LoRa (RA02), Ethernet (ENC28J60), and Serial (UART).

## Overview

DepoGraph V2.5 is a sophisticated 3D laser scanning device designed for precise spatial data acquisition. The system features a comprehensive controller board with multiple sensors, communication interfaces, and data storage capabilities.

## Hardware Platform

- **Microcontroller**: STM32F103VGT6 (STM32F1 family, LQFP100 package)
- **Clock**: External HSE oscillator with PLL (72 MHz system clock)
- **Architecture**: ARM Cortex-M3

## Communication Interfaces

The system supports multiple communication protocols for data transmission:

### 1. LoRa (RA02 Module)
- **Module**: RA02 LoRa module
- **Interface**: SPI (via SPI2)
- **Reset Control**: GPIO-controlled reset pin
- **Purpose**: Long-range wireless data transmission

### 2. Ethernet (ENC28J60)
- **Controller**: ENC28J60 Stand-Alone Ethernet Controller
- **Interface**: SPI
- **Purpose**: Wired network connectivity for data transfer
- **Protocols**: Supports TCP/IP, UDP, and ARP

### 3. Serial Communication (UART)
- **USART1**: 115200 baud, 8N1 (8-bit data, no parity, 1 stop bit)
- **USART2**: 115200 baud, 8N1
- **USART3**: 115200 baud, 8N1
- **Purpose**: Direct serial data interface and debugging

## Hardware Components

### Controller Board Modules

The DepoGraph Controller V2.5 integrates the following modules:

1. **Distance Measurement Module**
   - TFmini laser distance sensor
   - Provides accurate distance measurements for 3D scanning

2. **Inertial Measurement Unit (IMU)**
   - MPU6050 6-axis gyroscope/accelerometer
   - Interface: I2C
   - Provides orientation and motion data

3. **Real-Time Clock (RTC)**
   - DS3231 precision RTC module
   - Interface: I2C
   - Maintains accurate timekeeping

4. **Temperature Sensor**
   - DS18B20 digital temperature sensor
   - One-wire interface
   - Monitors system temperature

5. **Memory**
   - EEPROM/Flash memory for configuration storage
   - SD Card support (SDIO interface, 4-bit wide bus)
   - FATFS file system support

6. **Stepper Motor Driver (STP_DRV)**
   - Controls motorized components of the scanner

7. **CAN Bus**
   - CAN interface for industrial communication

8. **RS485**
   - RS485 serial interface for long-distance communication

9. **GSM Module**
   - SIM800L GSM/GPRS module
   - Cellular connectivity option

10. **ESP32 Interface**
    - ESP32 module interface (SPI)
    - Additional processing and connectivity capabilities

11. **Raspberry Pi Interface**
    - RPI connector for integration with Raspberry Pi

12. **Micro Switches**
    - Limit switches for position sensing

13. **USB**
    - USB Full-Speed device interface
    - 8 endpoints supported

## Software Architecture

### Development Environment
- **IDE**: STM32CubeIDE / STM32CubeMX
- **HAL Library**: STM32 HAL (Hardware Abstraction Layer)
- **Build System**: Makefile-based

### Peripherals Configuration

- **SPI1**: Configured for external peripherals
- **SPI2**: Configured for LoRa RA02 module (CS controlled via GPIO)
- **SPI3**: Configured for multiple SPI devices (dual CS lines)
- **I2C1**: 100 kHz, 7-bit addressing (for IMU, RTC)
- **I2C2**: 100 kHz, 7-bit addressing (for additional I2C devices)
- **CAN1**: 500 kbps, normal mode
- **SDIO**: 4-bit wide bus mode for SD card
- **TIM3**: PWM timer for motor control (2 channels)
- **USB**: Full-Speed device mode

## Project Structure

```
DepoGraphV2.5/
├── code/
│   └── DEPO_v2.5/          # STM32 firmware source code
│       ├── Core/
│       │   ├── Inc/        # Header files
│       │   └── Src/        # Source files
│       ├── Drivers/        # STM32 HAL drivers
│       └── DEPO_v2.5.ioc   # STM32CubeMX configuration
├── PCB/
│   ├── controller/         # Main controller board schematics
│   ├── ETH_LORAE32_Module/ # Ethernet/LoRa module
│   ├── INPUT_POWER/        # Power input board
│   ├── power/              # Power supply modules
│   └── receiver/           # Receiver module (if applicable)
├── reference/              # Reference implementations and libraries
│   ├── DS3231/            # RTC library references
│   ├── ENC28J60/          # Ethernet controller references
│   ├── LoRa-master/       # LoRa library references
│   ├── MPU9250/           # IMU library references
│   ├── SDCard/            # SD card library references
│   ├── Sim800/            # GSM module references
│   ├── Tf_Distance/       # Distance sensor references
│   └── W5500/             # Alternative Ethernet controller references
├── LICENSE                 # Apache License 2.0
└── README.md              # This file
```

## Communication Protocol Support

### LoRa RA02
- Long-range wireless communication
- Suitable for remote data transmission
- Low power consumption

### Ethernet (ENC28J60)
- Standard TCP/IP networking
- UDP and TCP protocol support
- Network configuration via IP/MAC addressing

### Serial (UART)
- Standard RS-232/RS-485 communication
- Multiple serial ports for different purposes
- Configurable baud rates

## Getting Started

### Prerequisites
- STM32CubeIDE or compatible IDE
- STM32CubeMX (for configuration)
- ST-Link or compatible programmer/debugger
- DepoGraph V2.5 hardware

### Building the Project

1. Open the project in STM32CubeIDE
2. Or use STM32CubeMX to generate project files from `DEPO_v2.5.ioc`
3. Build the project using the Makefile or IDE build system
4. Flash the firmware to the STM32F103VGT6 microcontroller

### Configuration

The project uses STM32CubeMX configuration file (`DEPO_v2.5.ioc`). To modify hardware configuration:

1. Open `DEPO_v2.5.ioc` in STM32CubeMX
2. Modify peripheral settings as needed
3. Generate code and merge with existing user code

## License

This project is licensed under the Apache License 2.0 - see the LICENSE file for details.

## References

The `reference/` directory contains example implementations and libraries for various components:
- ENC28J60 Ethernet controller drivers
- LoRa communication libraries
- Sensor drivers (MPU6050, DS3231, DS18B20, TFmini)
- SD card and file system implementations
- GSM module (SIM800L) libraries

## Version

**Version**: 2.5

## Additional Notes

- The system is designed for 3D laser scanning applications
- Multiple communication interfaces provide flexibility in data transmission methods
- The modular PCB design allows for system expansion and customization
- Reference libraries are provided to assist with component integration
