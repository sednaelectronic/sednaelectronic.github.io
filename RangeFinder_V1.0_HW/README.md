# Range Finder v1.0

A high-precision, phase-based laser distance measurement system for accurate distance sensing applications.

---

## Overview

Range Finder v1.0 is a laser-based distance measurement system that uses advanced phase-detection technology to accurately measure distances to objects. The system employs continuous wave (CW) laser modulation with multiple frequencies to achieve high accuracy and resolve measurement ambiguities.

### Key Features

- **High-Speed Measurements**: ~60 measurements per second
- **High Accuracy**: 1-10 mm accuracy depending on distance and conditions
- **Multi-Frequency Phase Detection**: Uses three modulation frequencies for unambiguous distance measurement
- **Automatic Gain Control**: Auto-adjusts sensor sensitivity for optimal signal quality
- **Simple Serial Interface**: Easy integration via UART at 256,000 baud
- **Compact Design**: Small form factor suitable for various applications

### Applications

- Industrial automation and robotics
- Construction and surveying equipment
- Research and development projects
- Quality control systems
- Navigation and positioning systems
- Distance monitoring and control

---

## System Architecture

### Measurement Principle

The system uses **phase-shift measurement** with multiple modulation frequencies:

1. **Laser Modulation**: The laser is amplitude-modulated at three different frequencies (162.5 MHz, 191.5 MHz, 193.5 MHz)
2. **Signal Reception**: An Avalanche Photodiode (APD) receives the reflected light
3. **Phase Detection**: The Goertzel algorithm extracts phase information from the received signal
4. **Distance Calculation**: Multi-frequency algorithms resolve phase ambiguity and calculate distance

### Hardware Components

- **Microcontroller**: STM32F100C8T6 (512A/701A modules) or STM32F0 series (U85 modules)
- **Laser Emitter**: Continuous wave laser diode with amplitude modulation
- **APD Sensor**: Avalanche photodiode for high-sensitivity light detection
- **PLL (Si5351)**: Generates precise modulation frequencies
- **Signal Conditioning**: Amplification and filtering circuits
- **High-Voltage Supply**: APD bias voltage (80-115V)

### Communication

- **Interface**: UART/Serial
- **Baud Rate**: 256,000
- **Data Format**: ASCII strings with distance, amplitude, temperature, and voltage data
- **Commands**: Simple single-character commands for control

---

## Repository Structure

```
RangeFinder_V1.0.1/
├── README.md                    # This file - project overview
├── Technical_Documentation.md   # Detailed technical documentation for engineers
├── User_Manual.md               # User guide for installers and operators
│
├── Document/                    # Reference documents and datasheets
│   ├── APD datasheets
│   ├── Design documents
│   └── Component specifications
│
├── RangeFinder/                 # Reference implementations and reverse engineering
│   ├── Laser_tape_reverse_engineering-master/
│   │   ├── Code/                # Firmware source code
│   │   │   ├── Firmware_dist_calculation_fast/    # Optimized firmware
│   │   │   ├── Firmware_dist_calculation_simple/  # Simple firmware
│   │   │   ├── Firmware_phase_calculation/        # Phase measurement only
│   │   │   ├── Firmware_raw_capture/              # Raw data capture
│   │   │   └── CortexM0/                          # STM32F0 firmware variants
│   │   ├── Schematic/           # Hardware schematics
│   │   ├── PC_utility/           # PC utilities for data analysis
│   │   └── README.md             # Implementation details
│   └── [Other reference projects]
│
└── Simulation/                  # Circuit simulation files
    └── Boost/                   # Power supply simulations
```

### Key Directories

- **Document/**: Contains datasheets, design documents, and technical references
- **RangeFinder/Laser_tape_reverse_engineering-master/**: Main firmware implementation
  - **Code/**: Source code for different firmware variants
  - **Schematic/**: Hardware design files
  - **PC_utility/**: Windows utilities for data visualization and analysis

---

## Quick Start Guide

### For Users and Operators

1. **Read the User Manual**: Start with `User_Manual.md` for installation, setup, and operation instructions
2. **Hardware Setup**: Mount the module, connect power and communication cables
3. **Initial Calibration**: Perform zero-distance calibration (send 'C' command)
4. **Start Measuring**: Enable measurements (send 'E' command) and read distance data

**See [User_Manual.md](User_Manual.md) for detailed instructions.**

### For Engineers and Developers

1. **Review Technical Documentation**: Read `Technical_Documentation.md` for system architecture and implementation details
2. **Understand Firmware**: Explore firmware code in `RangeFinder/Laser_tape_reverse_engineering-master/Code/`
3. **Hardware Design**: Review schematics in `RangeFinder/Laser_tape_reverse_engineering-master/Schematic/`
4. **Integration**: Use UART interface for system integration

**See [Technical_Documentation.md](Technical_Documentation.md) for detailed technical information.**

---

## Documentation

This repository includes comprehensive documentation:

### 📘 [User Manual](User_Manual.md)
**For**: Installers, Technicians, Operators

Includes:
- System overview and package contents
- Hardware assembly and mounting instructions
- Electrical wiring and power connections
- Initial setup and calibration procedures
- Normal operation guidelines
- Safety notes and maintenance
- Basic troubleshooting

### 🔧 [Technical Documentation](Technical_Documentation.md)
**For**: Electronics Engineers, Embedded Developers

Includes:
- Hardware technical details (block diagrams, pin mappings, circuits)
- Firmware architecture and algorithms
- Measurement principle and theory
- Calibration methods
- Build, flashing, and debugging procedures
- Communication protocols

### 📖 This README
**For**: Everyone

Provides:
- High-level project overview
- Repository structure
- Quick start guide
- Links to detailed documentation

---

## System Specifications

### Performance

- **Measurement Speed**: ~60 Hz
- **Accuracy**: 1-10 mm (distance and surface dependent)
- **Measurement Range**: Dependent on target reflectivity
- **Update Rate**: Continuous measurements

### Electrical

- **Power Supply**: Module-specific (typically 3.3V or 5V DC)
- **Communication**: UART at 256,000 baud, 8N1
- **Logic Levels**: 3.3V TTL

### Physical

- **Module Dimensions**: Varies by module type
  - 701A: 25×13×50 mm
  - U85: 17×7×41 mm
- **Weight**: ~4g (U85 module)

### Environmental

- **Operating Temperature**: Check module-specific specifications
- **Storage**: Follow manufacturer guidelines
- **Protection**: APD sensor must be shielded from external light

---

## Communication Protocol

### Data Output Format

The system continuously outputs distance measurements:

```
DIST;01574;AMP;0993;TEMP;1343;VOLT;082\r\n
```

**Fields:**
- `DIST`: Distance in millimeters (5 digits, zero-padded)
- `AMP`: Signal amplitude (4 digits)
- `TEMP`: Temperature reading (4 digits, raw ADC value)
- `VOLT`: APD bias voltage in volts (3 digits)

**Example**: `DIST;01574` = 1574 mm = 1.574 meters

### Control Commands

| Command | Description |
|--------|-------------|
| `E` | Enable laser and start measurements |
| `D` | Disable laser and stop measurements |
| `C` | Start zero-distance calibration |

**Note**: All commands are single ASCII characters sent via UART.

---

## Firmware Variants

The repository contains several firmware implementations:

### Firmware_dist_calculation_fast
- **Optimized for speed**: Simultaneous capture and processing
- **Best for**: Production use, high-speed applications
- **Features**: Parallel processing, optimized algorithms

### Firmware_dist_calculation_simple
- **Simpler implementation**: Sequential processing
- **Best for**: Development, debugging, understanding algorithms
- **Features**: Easier to understand, step-by-step processing

### Firmware_phase_calculation
- **Phase measurement only**: No distance calculation
- **Best for**: Analysis, development, testing
- **Features**: Raw phase data output

### Firmware_raw_capture
- **Raw ADC data**: Unprocessed samples
- **Best for**: Signal analysis, algorithm development
- **Features**: Complete raw data capture

---

## Hardware Module Variants

### 512A Module
- **MCU**: STM32F100C8T6
- **ADC Channel**: PA3
- **Original design**

### 701A Module
- **MCU**: STM32F100C8T6
- **ADC Channel**: PA6
- **Revised design with improvements**

### U85 Module
- **MCU**: STM32F0 series
- **Compact design**
- **Different pin assignments**

**Note**: Firmware must match module variant. Check `MODULE_701A` define in firmware.

---

## Safety Information

⚠️ **IMPORTANT SAFETY WARNINGS**

### Laser Safety
- **Never look directly into the laser beam**
- **Never point the laser at people or animals**
- The laser may be invisible (infrared or red)
- Use appropriate laser safety precautions

### Electrical Safety
- **High voltage present**: Module contains 80-115V circuits
- **Do not touch exposed circuits when powered**
- Use proper electrical safety procedures
- Follow local electrical codes

### General Safety
- Mount securely to prevent falling
- Protect from weather if outdoor use
- Follow all safety guidelines in User Manual

**See [User_Manual.md](User_Manual.md) for complete safety information.**

---

## Calibration

### Initial Calibration Required

The system **must be calibrated** before first use:

1. Place white target 10-50 cm from laser
2. Shield APD sensor from external light
3. Send 'C' command via serial interface
4. Wait for "Calib Done" message

**See [User_Manual.md](User_Manual.md) for detailed calibration instructions.**

---

## Development and Customization

### Building Firmware

**Requirements:**
- IAR Embedded Workbench 7.50 (for STM32F100)
- ST-Link programmer
- Appropriate module hardware

**Build Process:**
1. Open project file (.eww) in IAR
2. Select correct module variant (MODULE_701A define)
3. Build project
4. Flash to target via ST-Link

**See [Technical_Documentation.md](Technical_Documentation.md) for detailed build instructions.**

### Integration

The system is designed for easy integration:

1. **Hardware**: Connect power and UART interface
2. **Software**: Parse UART data strings
3. **Calibration**: Perform initial calibration
4. **Operation**: Enable measurements and read distance data

Example integration code available in reference implementations.

---

## Troubleshooting

### Common Issues

**No distance output?**
- Check UART baud rate (256,000)
- Verify TX/RX connections
- Send 'E' command to enable measurements

**Incorrect readings?**
- Perform calibration (send 'C')
- Use white, reflective target
- Shield APD from external light

**Calibration fails?**
- Ensure target is 10-50 cm from laser
- Use white, matte surface
- Shield APD sensor properly

**See [User_Manual.md](User_Manual.md) for complete troubleshooting guide.**

---

## References and Resources

### Documentation
- [User Manual](User_Manual.md) - Installation and operation guide
- [Technical Documentation](Technical_Documentation.md) - Engineering details

### External Resources
- STM32 Reference Manuals
- Si5351 PLL Datasheet
- APD Sensor Datasheets (in Document folder)
- Phase-based rangefinding theory

### Related Projects
- Reference implementations in `RangeFinder/` directory
- PC utilities for data analysis
- Schematic files for hardware reference

---

## License

See [LICENSE](LICENSE) file for license information.

---

## Support and Contributions

### Getting Help
1. Check documentation (User Manual and Technical Documentation)
2. Review troubleshooting sections
3. Examine reference implementations
4. Contact support with specific questions

### Contributing
- Follow code style in existing implementations
- Document changes clearly
- Test thoroughly before submission
- Update relevant documentation

---

## Version History

### v1.0.1
- Current repository version
- Multiple firmware variants
- Comprehensive documentation
- Reference implementations included

---

## Acknowledgments

This project is based on reverse engineering work and includes reference implementations from the open-source community. See individual project directories for specific acknowledgments.

---

**For detailed information, please refer to:**
- **[User Manual](User_Manual.md)** - For installation and operation
- **[Technical Documentation](Technical_Documentation.md)** - For engineering details

---

**End of README**
