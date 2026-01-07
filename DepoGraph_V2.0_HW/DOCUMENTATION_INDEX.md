# DepoGraph V2.0 - Documentation Index

## Documentation Overview

This document provides a complete index of all documentation files in the DepoGraph V2.0 project repository.

## Main Documentation Files

### 1. README.md
**Location**: Root directory  
**Purpose**: Main project overview and quick start guide  
**Contents**:
- Project structure
- System architecture overview
- Quick start instructions
- Hardware components
- Software components
- File descriptions
- Troubleshooting basics

**Read this first** for a general understanding of the project.

### 2. TECHNICAL_DOCS.md
**Location**: Root directory  
**Purpose**: Comprehensive technical documentation  
**Contents**:
- Detailed system architecture
- Hardware specifications
- Software architecture
- Communication protocols
- Scanning algorithm details
- Data processing pipeline
- Firmware details
- Raspberry Pi application
- PCB design information
- Calibration procedures
- Troubleshooting guide

**Read this** for in-depth technical information.

### 3. QUICK_REFERENCE.md
**Location**: Root directory  
**Purpose**: Quick reference for common tasks  
**Contents**:
- Quick start checklist
- Common commands
- File locations
- Pin connections
- Configuration files
- Troubleshooting quick fixes
- Key parameters
- Important notes

**Use this** as a daily reference guide.

## Version-Specific Documentation

### Fixed Version
**Location**: `FIX/README.md`  
**Contents**:
- Fixed version overview
- STM32H7 firmware details
- RTOS information
- Building and flashing instructions
- Configuration guide
- Differences from portable version

**Read this** if working with the Fixed version.

### Portable Version V2
**Location**: `Portable_DepoGraph_V2/README.md`  
**Contents**:
- Portable version overview
- STM32F105 firmware details
- Raspberry Pi setup
- Web interface guide
- Calibration procedures
- Command reference
- Differences from V1

**Read this** if working with the Portable version.

## Component Documentation

### Raspberry Pi Controller
**Location**: `Program/RPI_CODE/README.md`  
**Contents**:
- Application structure
- Installation instructions
- Configuration guide
- Web interface details
- API endpoints
- Serial communication
- Scanning workflow
- Troubleshooting

**Read this** for Raspberry Pi application development.

### PCB Design
**Location**: `Pcb/README.md`  
**Contents**:
- PCB directory structure
- Main controller board details
- Power supply boards
- Design tools
- Manufacturing notes
- Component sourcing
- Testing procedures

**Read this** for PCB design and manufacturing.

## Documentation by Topic

### Getting Started
1. **README.md** - Start here for overview
2. **QUICK_REFERENCE.md** - For quick setup
3. Version-specific README (FIX or Portable)

### Hardware Information
1. **TECHNICAL_DOCS.md** - Hardware Specifications section
2. **Pcb/README.md** - PCB design details
3. **Documents/Pdf/** - Component datasheets

### Software Development
1. **TECHNICAL_DOCS.md** - Software Architecture section
2. **FIX/README.md** or **Portable_DepoGraph_V2/README.md** - Firmware details
3. **Program/RPI_CODE/README.md** - Raspberry Pi application

### Communication Protocols
1. **TECHNICAL_DOCS.md** - Communication Protocols section
2. **Documents/Command.pdf** - Command reference
3. **QUICK_REFERENCE.md** - Common commands

### Calibration and Setup
1. **TECHNICAL_DOCS.md** - Calibration and Setup section
2. Version-specific README for detailed procedures
3. **QUICK_REFERENCE.md** - Quick calibration checklist

### Troubleshooting
1. **QUICK_REFERENCE.md** - Quick fixes
2. **TECHNICAL_DOCS.md** - Troubleshooting Guide section
3. Component-specific README files

## Additional Resources

### Project Documents
- **Documents/Command.pdf** - Command protocol reference
- **Documents/DepoGraph PCB DOC.pdf** - PCB documentation
- **Documents/Project Documentation.pdf** - Project documentation

### Component Datasheets
- **Documents/Pdf/** - Contains datasheets for:
  - STM32H7 series
  - STM32F1 series
  - DRV8825 stepper driver
  - LAN8742 Ethernet PHY
  - DS18B20 temperature sensor
  - DS3231 RTC
  - MPU9250 IMU
  - And more...

### Configuration Files
- **OsConfig.txt** - System configuration
- **Pinout.txt** - GPIO pin assignments
- **Cable_Color.txt** - Cable color coding
- **Step.txt** - Motor calibration

## Documentation Structure

```
DepoGraphV2.0/
├── README.md                    # Main overview
├── TECHNICAL_DOCS.md            # Technical details
├── QUICK_REFERENCE.md           # Quick reference
├── DOCUMENTATION_INDEX.md       # This file
│
├── FIX/
│   └── README.md                # Fixed version docs
│
├── Portable_DepoGraph_V2/
│   └── README.md                # Portable version docs
│
├── Program/
│   └── RPI_CODE/
│       └── README.md            # Raspberry Pi docs
│
├── Pcb/
│   └── README.md                # PCB design docs
│
└── Documents/
    ├── Command.pdf              # Command reference
    ├── DepoGraph PCB DOC.pdf    # PCB documentation
    └── Pdf/                     # Component datasheets
```

## Reading Order Recommendations

### For New Users
1. **README.md** - Get overview
2. **QUICK_REFERENCE.md** - Learn basics
3. Version-specific README - Choose your version
4. **TECHNICAL_DOCS.md** - Deep dive as needed

### For Developers
1. **TECHNICAL_DOCS.md** - Understand architecture
2. Version-specific README - Firmware details
3. **Program/RPI_CODE/README.md** - Application code
4. Component datasheets - Hardware details

### For Hardware Engineers
1. **Pcb/README.md** - PCB design
2. **TECHNICAL_DOCS.md** - Hardware specifications
3. Component datasheets - Component details
4. **Documents/DepoGraph PCB DOC.pdf** - PCB documentation

### For Troubleshooting
1. **QUICK_REFERENCE.md** - Quick fixes
2. **TECHNICAL_DOCS.md** - Troubleshooting guide
3. Component-specific README - Detailed solutions

## Documentation Maintenance

### Updating Documentation
- Keep version numbers consistent
- Update when hardware/software changes
- Maintain cross-references
- Keep examples current

### Version Control
- Document changes in version history
- Maintain compatibility notes
- Update last modified dates

## Finding Information

### By Component
- **STM32 Firmware**: Version-specific README + TECHNICAL_DOCS.md
- **Raspberry Pi**: Program/RPI_CODE/README.md
- **PCB Design**: Pcb/README.md
- **Sensors**: TECHNICAL_DOCS.md + Datasheets

### By Task
- **Setup**: README.md + QUICK_REFERENCE.md
- **Configuration**: Version-specific README
- **Calibration**: TECHNICAL_DOCS.md
- **Troubleshooting**: QUICK_REFERENCE.md + TECHNICAL_DOCS.md
- **Development**: TECHNICAL_DOCS.md + Component READMEs

### By Problem
- **Communication Issues**: QUICK_REFERENCE.md → TECHNICAL_DOCS.md
- **Motor Problems**: QUICK_REFERENCE.md → Version-specific README
- **Software Errors**: Component-specific README → TECHNICAL_DOCS.md

## Additional Help

### Code Comments
- Check source code files for inline documentation
- Review header files for function descriptions
- Check configuration files for parameter explanations

### Example Code
- Review main.c for usage examples
- Check run.py for Flask route examples
- See scan.c for scanning algorithm

### Configuration Examples
- Review config.h for parameter examples
- Check database schema in RPI code
- See OsConfig.txt for configuration format

## Documentation Feedback

If you find errors or need additional documentation:
1. Check if information exists in another file
2. Review source code for details
3. Consult component datasheets
4. Update documentation as needed

---

**Documentation Version**: 1.0  
**Last Updated**: 2025  
**Maintained By**: DepoGraph Development Team

