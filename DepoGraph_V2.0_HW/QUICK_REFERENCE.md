# DepoGraph V2.0 - Quick Reference Guide

## Quick Start Checklist

### Fixed Version Setup
- [ ] Flash STM32H7 firmware from `FIX/Program/Microcontroller/RTOS/`
- [ ] Connect Ethernet cable
- [ ] Connect Raspberry Pi via UART
- [ ] Configure network settings
- [ ] Start TCP server application

### Portable Version Setup
- [ ] Flash STM32F105 firmware from `Portable_DepoGraph_V2/MicroController_Code/`
- [ ] Connect Raspberry Pi via GPIO UART
- [ ] Install Python dependencies
- [ ] Configure WiFi (see `OsConfig.txt`)
- [ ] Run Flask server: `python run.py`
- [ ] Access web interface at `http://raspberry-pi-ip:5000`

## Common Commands

### Movement
```
H+00100*,    # Move Theta +100 steps
H-00100*,    # Move Theta -100 steps
V+00500*,    # Move Phi +500 steps
V-00500*,    # Move Phi -500 steps
GOHOME *,    # Return to home position
```

### Configuration
```
T#00240*,    # Set Theta start (240 steps)
P#00630*,    # Set Theta end (630 steps)
D#00020*,    # Set Theta step size (20 steps)
A#00001*,    # Set Phi start (1 step)
B#00815*,    # Set Phi end (815 steps)
d#00020*,    # Set Phi step size (20 steps)
```

### Control
```
S#START*,    # Start scanning
GETTEMP*,    # Get temperature
GETADXL*,    # Get accelerometer data
QIST000*,    # Query laser distance
```

## File Locations

### Firmware
- **Fixed**: `FIX/Program/Microcontroller/RTOS/`
- **Portable**: `Portable_DepoGraph_V2/MicroController_Code/DepoGraph_V2_Code/Stm32f105/Drv2855/DRV2855/`

### Raspberry Pi Code
- **Web Interface**: `Program/RPI_CODE/ok/Depo-New Class 02-03-10/`

### PCB Designs
- **Main Board**: `Pcb/DepoGraph_Main_V2PCB_Project/`
- **Power Supply**: `Pcb/Depo-Power-V2/`

### Documentation
- **Main README**: `README.md`
- **Technical Docs**: `TECHNICAL_DOCS.md`
- **Command Reference**: `Documents/Command.pdf`

## Pin Connections

### Raspberry Pi UART
- **TX**: GPIO 14
- **RX**: GPIO 15
- **Reset**: GPIO 13
- **Device**: `/dev/serial0`
- **Baud Rate**: 115200

### STM32 UART
- **USART1**: Raspberry Pi communication
- **USART2**: TF350 laser sensor (9600 baud)

## Configuration Files

| File | Location | Purpose |
|------|----------|---------|
| `config.h` | `FIX/Program/Microcontroller/RTOS/Core/Inc/` | Scan parameters |
| `OsConfig.txt` | Root directory | WiFi and login credentials |
| `Pinout.txt` | `Portable_DepoGraph_V2/Pcb/` | GPIO pin assignments |
| `Cable_Color.txt` | `Portable_DepoGraph_V2/Pcb/` | Cable color coding |
| `Step.txt` | `Portable_DepoGraph_V2/MicroController_Code/` | Step motor calibration |

## Troubleshooting Quick Fixes

### No Serial Communication
```bash
# Check permissions
sudo usermod -a -G dialout pi

# Check device
ls -l /dev/serial0

# Test connection
screen /dev/serial0 115200
```

### Motor Not Moving
1. Check enable pin (GPIO state)
2. Verify step/direction signals
3. Check power supply voltage
4. Verify driver connections

### Web Interface Not Loading
```bash
# Check Flask server
ps aux | grep python

# Check port
netstat -tuln | grep 5000

# Restart service
sudo systemctl restart depograph
```

### Laser Sensor Issues
1. Check 12V power supply
2. Verify UART connection (USART2)
3. Check baud rate (9600)
4. Verify sensor initialization

## Development Tools

### STM32
- **IDE**: STM32CubeIDE or Keil MDK-ARM
- **Debugger**: ST-Link
- **Programmer**: ST-Link or J-Link

### Raspberry Pi
- **OS**: Raspberry Pi OS
- **Python**: 3.x
- **Editor**: nano, vim, or VS Code

### PCB Design
- **Tool**: Altium Designer
- **Viewer**: Altium Viewer (free)

## Key Parameters

### Scan Range (Fixed Version)
- **Theta**: -9500 to +9500 steps (~-95° to +95°)
- **Phi**: 0 to 6400 steps (~0° to 103°)
- **Step Size**: 20 steps default

### Motor Speeds
- **Theta**: 250 steps/sec
- **Phi**: 120 steps/sec

### Resolution
- **Theta**: 32000 steps = 360° (88.89 steps/degree)
- **Phi**: 22400 steps = 360° (62.22 steps/degree)

## Data Formats

### Input (STM32 → RPi)
```
1234,567,100\n        # Distance, Strength, Phi
1234.5*,\n            # Theta position
Scan End\n            # Scan complete
```

### Output Files
- `raw.txt`: Raw scan data
- `RTPS.txt`: Range, Theta, Phi, Strength
- `point_Cloud.obj`: 3D point cloud
- `meshed.obj`: Meshed point cloud

## Web Interface URLs

### Local Access
- **Control**: `http://localhost:5000/control`
- **Dashboard**: `http://localhost:5000/Dashboard`
- **Login**: `http://localhost:5000/admin`

### Default Credentials
- **Username**: `sedna`
- **Password**: `sedn1234`

## Important Notes

⚠️ **Safety**
- Ensure proper power supply ratings
- Check motor current limits
- Verify sensor power requirements
- Use proper grounding

⚠️ **Calibration**
- Always calibrate home position before scanning
- Verify step motor resolution
- Check laser sensor accuracy
- Test coordinate system alignment

⚠️ **Maintenance**
- Regular cleaning of laser sensor lens
- Check mechanical connections
- Monitor temperature during operation
- Backup configuration files

## Support Resources

- **Main Documentation**: `README.md`
- **Technical Details**: `TECHNICAL_DOCS.md`
- **Component Docs**: `Documents/Pdf/`
- **PCB Documentation**: `Pcb/README.md`

## Version Information

- **Project Version**: V2.0
- **Fixed Version**: STM32H7 + RTOS
- **Portable Version**: STM32F105 (V2 latest)
- **Raspberry Pi**: Python Flask application

---

**Quick Reference Version**: 1.0  
**Last Updated**: 2025

