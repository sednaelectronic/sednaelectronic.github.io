# Range Finder v1.0 - Technical Documentation

## Document Information
**Version:** 1.0  
**Target Audience:** Electronics Engineers, Embedded Developers  
**Last Updated:** Based on repository analysis

---

## Table of Contents
1. [System Overview](#system-overview)
2. [Hardware Technical Documentation](#hardware-technical-documentation)
3. [Firmware/Software Technical Documentation](#firmwaresoftware-technical-documentation)
4. [Measurement Principle](#measurement-principle)
5. [Calibration](#calibration)
6. [Build and Deployment](#build-and-deployment)

---

## System Overview

Range Finder v1.0 is a phase-based laser distance measurement system that uses continuous wave (CW) modulation with multiple frequencies to determine distance to a target object. The system measures the phase difference between transmitted and received laser signals to calculate distance with high accuracy.

**Key Specifications:**
- Measurement Speed: ~60 Hz
- Accuracy: 1-10 mm (depending on distance and surface type)
- Measurement Range: Dependent on target reflectivity and APD sensitivity
- Communication: UART at 256,000 baud
- Power Supply: Requires DC power input (specific voltage depends on module variant)

---

## Hardware Technical Documentation

### System Block Diagram

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   MCU       │────▶│  Si5351 PLL  │────▶│ Laser Diode │
│ STM32F100/  │     │  Frequency   │     │   Emitter   │
│   STM32F0   │     │  Generator   │     └─────────────┘
└──────┬──────┘     └──────────────┘            │
       │                                          │
       │     ┌──────────────┐                    │
       │     │  APD Sensor  │◀───────────────────┘
       │     │   + Signal   │    Reflected Laser
       │     │ Conditioning │
       │     └──────┬───────┘
       │            │
       │     ┌──────▼───────┐
       └────▶│    ADC       │
             │  (12-bit)    │
             └──────────────┘
```

### Microcontroller Selection and Pin Mapping

#### STM32F100C8T6 (512A/701A Modules)

**Key Peripherals:**
- **ADC1**: 12-bit ADC for signal acquisition
- **DAC**: Dual-channel DAC for laser power and APD bias voltage control
- **I2C2**: Communication with Si5351 PLL (PB10: SCL, PB11: SDA)
- **USART1**: UART communication (PB6: TX, PB7: RX)
- **TIM1**: ADC trigger timing
- **DMA**: ADC data transfer

**Pin Configuration:**

| Function | Pin | Port | Notes |
|----------|-----|------|-------|
| ADC Signal Input | PA3/PA6 | GPIOA | Module-dependent (PA3 for 512A, PA6 for 701A) |
| ADC Reference | PA7 | GPIOA | Reference signal input |
| ADC Temperature | PB0 | GPIOB | APD temperature monitoring |
| I2C SCL | PB10 | GPIOB | PLL clock line |
| I2C SDA | PB11 | GPIOB | PLL data line |
| UART TX | PB6 | GPIOB | Serial output |
| UART RX | PB7 | GPIOB | Serial input |
| Laser Enable | PA2 | GPIOA | Laser power control |
| Main Power | PC15 | GPIOC | Main DC-DC enable |
| Analog Power | PB12 | GPIOB | Analog section power enable |
| Beep | PB14 | GPIOB | Audio feedback |

#### STM32F0 Series (U85 Modules)

**Key Differences:**
- **I2C1**: Used instead of I2C2 (PA9: SCL, PA10: SDA)
- **USART1**: Different pin assignment (PA14: TX, PA15: RX)
- **ADC**: PA5 for signal, PA4 for reference
- **Power Control**: Different pin assignments

### Laser Emitter and Receiver Design

#### Laser Diode
- **Type**: Continuous wave laser diode
- **Modulation**: Amplitude modulated by PLL-generated frequencies
- **Control**: DAC output (DAC1) sets laser power level
- **Enable**: GPIO-controlled power switch

#### APD (Avalanche Photodiode) Sensor
- **Type**: Silicon APD (specific model not identified in code)
- **Bias Voltage**: 80-115V (programmable via DAC2)
- **Temperature Monitoring**: Built-in temperature sensor
- **Signal Output**: Low-level analog signal requiring amplification

### Signal Conditioning and Processing Circuits

#### APD Bias Voltage Generation
- **DC-DC Converter**: High-voltage boost converter
- **Control Method**: DAC2 output controls feedback network
- **Voltage Range**: 80.6V to 115V (module-dependent)
- **Formula**: `V_APD = VREF * (R_UP + R_DAC) / (R_DOWN + R_DAC)`
  - R_UP = 5.1 MΩ
  - R_DOWN = 74 kΩ
  - R_DAC = 21 kΩ + 46.8 kΩ (DAC-dependent)

#### Signal Amplification
- **Input**: APD output signal (low-level, high-impedance)
- **Amplification**: Multi-stage amplifier (specific topology in schematic files)
- **Output**: Conditioned signal to ADC input

#### Reference Signal Path
- **Source**: PLL reference output
- **Purpose**: Phase reference for measurement
- **ADC Channel**: Dedicated reference channel (PA7 for STM32F100, PA4 for STM32F0)

### PLL (Phase-Locked Loop) - Si5351

**Function**: Generates dual-frequency modulation signals for laser and reference

**Configuration:**
- **I2C Address**: 0xC0
- **Input Clock**: 25 MHz crystal
- **Output Frequencies**:
  - Frequency 1: 162.5 MHz and 162.505 MHz (5 kHz difference)
  - Frequency 2: 191.5 MHz and 191.505 MHz (5 kHz difference)
  - Frequency 3: 193.5 MHz and 193.505 MHz (5 kHz difference)

**Frequency Calculation:**
```
freq = 25MHz * (MULT + A/DIV) / 4
```

Where:
- MULT = PLL multiplier (26 or 30)
- A = Numerator coefficient
- DIV = Denominator (1250)

**Implementation Details:**
- Dual PLL outputs provide reference and signal frequencies
- Frequency switching delay: 150-300 μs (firmware-dependent)
- PLL reset and enable sequences required for proper operation

### Power Supply and Protection Circuits

#### Power Management
- **Main DC-DC**: Provides primary system voltage
- **Analog Power**: Separate power domain for sensitive analog circuits
- **Laser Power**: Controlled power supply for laser diode
- **APD Bias**: High-voltage isolated supply

#### Protection Features
- Power sequencing control via GPIO
- Overvoltage protection (implied by voltage limits)
- Temperature monitoring for APD

### Communication Interfaces

#### UART Interface
- **Baud Rate**: 256,000 baud
- **Data Format**: 8N1 (8 data bits, no parity, 1 stop bit)
- **Protocol**: ASCII-based command/response
- **Data Output**: Continuous distance measurements
- **Commands**:
  - `'E'`: Enable laser and measurement
  - `'D'`: Disable laser and measurement
  - `'C'`: Start zero distance calibration

#### I2C Interface
- **Purpose**: Si5351 PLL configuration
- **Speed**: Standard mode (100 kHz typical)
- **Address**: 0xC0 (7-bit address)

### PCB Design Considerations

**Module Variants:**
- **512A Module**: Original design, specific pin assignments
- **701A Module**: Revised design with different ADC channel
- **U85 Module**: Compact design using STM32F0, different form factor

**Key Design Points:**
- Analog and digital power domain separation
- Ground plane considerations for low-noise analog signals
- APD board should be shielded from external light
- High-voltage routing isolation for APD bias
- Thermal management for laser diode and APD

---

## Firmware/Software Technical Documentation

### Firmware Architecture Overview

The firmware is organized into several functional modules:

```
main.c
├── Hardware Initialization
│   ├── System clock configuration
│   ├── GPIO setup
│   ├── ADC configuration
│   ├── DAC initialization
│   ├── I2C setup
│   └── UART initialization
├── PLL Configuration (pll_functions.c)
├── Signal Capture (capture_configure.c)
├── Signal Analysis (analyse.c / analyse_ger.c)
├── Distance Calculation (distance_calc.c)
└── Measurement Control (measure_functions.c)
```

**Firmware Variants:**
1. **Firmware_dist_calculation_fast**: Optimized for speed, simultaneous capture/processing
2. **Firmware_dist_calculation_simple**: Sequential processing, simpler algorithm
3. **Firmware_phase_calculation**: Phase measurement only, no distance calculation
4. **Firmware_raw_capture**: Raw ADC data output for analysis

### Distance Measurement Principle and Algorithm

#### Phase-Based Measurement

The system uses **multi-frequency phase-shift measurement** to determine distance:

1. **Laser Modulation**: Laser is amplitude-modulated at three different frequencies
2. **Signal Reception**: APD receives reflected light with phase shift proportional to distance
3. **Phase Detection**: Goertzel algorithm extracts phase from ADC samples
4. **Distance Calculation**: Multi-frequency algorithm resolves phase ambiguity

#### Measurement Frequencies

**Modulation Frequencies:**
- f1 = 162.5 MHz (wavelength λ1 ≈ 1.844 m)
- f2 = 191.5 MHz (wavelength λ2 ≈ 1.565 m)
- f3 = 193.5 MHz (wavelength λ3 ≈ 1.550 m)

**Beat Frequencies (for ADC sampling):**
- 5 kHz difference frequency (162.505 - 162.5 MHz)
- Used for phase measurement via heterodyne detection

#### Goertzel Algorithm Implementation

**Purpose**: Extract phase and amplitude of specific frequency component from sampled data

**Parameters:**
- **Sampling Rate**: 50 kHz (normal) or 350 kHz (fast mode)
- **Samples per Measurement**: 250 points (normal) or 140 points (fast)
- **K Coefficient**: `K = (SIGNAL_FREQ * POINTS_TO_SAMPLE) / ADC_TRIGGER_FREQ`
  - Must be integer for accurate results
  - Typically K = 25 for 5 kHz signal at 50 kHz sampling

**Algorithm Flow:**
```c
// Initialize coefficients
g_coef = 2.0 * cos(2π * K / POINTS_TO_SAMPLE)
sin_coef = sin(2π * K / POINTS_TO_SAMPLE)
cos_coef = cos(2π * K / POINTS_TO_SAMPLE)

// Process samples
for(i = 0; i < POINTS_TO_SAMPLE; i++) {
    q0 = g_coef * q1 - q2 + data[i*2];
    q2 = q1;
    q1 = q0;
}

// Extract real and imaginary components
real = (q1 - q2 * cos_coef) / scalingFactor;
imag = (q2 * sin_coef) / scalingFactor;

// Convert to amplitude and phase
amplitude = sqrt(real² + imag²);
phase = atan2(imag, real);
```

**Phase Units**: Phase is stored as degrees × 10 (0-3599 for full 360°)

#### Distance Calculation Algorithm

**Triple-Frequency Algorithm:**

1. **Phase Measurement**: Measure phase for each frequency (φ1, φ2, φ3)
2. **Zero Calibration**: Subtract stored zero-distance phase offsets
3. **Coarse Distance**: Use frequency pair (f2, f3) to determine approximate distance
4. **Fine Distance**: Use frequency f1 with coarse distance bounds to resolve ambiguity
5. **Final Calculation**: Average or select best result

**Distance Formula:**
```
distance = (wavelength × N + (phase × wavelength) / (360 × 10)) / 2
```

Where:
- N = number of complete wavelengths (resolved via multi-frequency)
- Phase = measured phase in degrees × 10
- Division by 2 accounts for round-trip path

**Wavelength Constants** (in mm × 32):
- WAVE_L1 = 59036 (162.5 MHz)
- WAVE_L2 = 50095 (191.5 MHz)
- WAVE_L3 = 49578 (193.5 MHz)

**Brute-Force Search:**
For ambiguous cases, the algorithm searches a range of period numbers (N values) to find the best match between frequency pairs.

### Timing, Resolution, and Accuracy Considerations

#### Timing Characteristics

**Measurement Cycle:**
1. Frequency 1 capture: ~5 ms (250 samples @ 50 kHz)
2. Frequency switch delay: 150-300 μs
3. Frequency 2 capture: ~5 ms
4. Frequency switch delay: 150-300 μs
5. Frequency 3 capture: ~5 ms
6. Processing: <1 ms
7. **Total**: ~16-17 ms per measurement → ~60 Hz measurement rate

**Fast Mode:**
- Higher sampling rate (350 kHz)
- Fewer samples (140 points)
- Faster processing
- Potentially reduced accuracy

#### Resolution

**Phase Resolution:**
- Phase stored as 0.1° increments (PHASE_MULT = 10)
- 3600 possible phase values per wavelength

**Distance Resolution:**
- Theoretical: Sub-millimeter (depends on wavelength and phase resolution)
- Practical: 1-10 mm (limited by noise, signal quality, and algorithm)

#### Accuracy Factors

**Factors Affecting Accuracy:**
1. **Signal Amplitude**: Low signal → poor phase measurement
2. **Target Surface**: Reflectivity and surface properties
3. **Distance**: Accuracy degrades with distance
4. **Environmental Light**: External light interference
5. **Temperature**: APD characteristics vary with temperature
6. **APD Bias Voltage**: Optimal voltage depends on signal level

**Typical Accuracy:**
- Short range (<5 m): 1-3 mm
- Medium range (5-20 m): 3-7 mm
- Long range (>20 m): 7-10 mm

### Data Processing and Filtering

#### Signal Processing Pipeline

```
ADC Samples → Goertzel Algorithm → Phase/Amplitude → 
Zero Calibration → Multi-Frequency Calculation → Distance
```

#### Averaging and Filtering

**Calibration:**
- 64 measurements averaged for zero-distance calibration
- Median or average phase calculation

**Normal Operation:**
- 3 measurements per frequency (REPEAT_NUMBER)
- Averaging reduces noise

#### APD Voltage Auto-Adjustment

**Automatic Gain Control (AGC):**
- Monitors signal amplitude
- Adjusts APD bias voltage to maintain optimal signal level
- Voltage range: 80-115V
- Prevents saturation and maintains sensitivity

**Thresholds:**
- Amplitude < 900: Increase voltage
- Amplitude > 1200: Decrease voltage
- Saturation detection: Voltage reduced if signal too high

### Calibration Method

#### Zero Distance Calibration

**Purpose**: Establish phase reference for zero distance (typically 10+ cm from laser)

**Procedure:**
1. Place white target at known distance (>10 cm)
2. Send 'C' command via UART
3. System performs:
   - Enhanced APD voltage calibration
   - Phase measurement for each frequency (64 samples each)
   - Average phase calculation
   - Store calibration values to flash memory

**Calibration Data:**
- `zero_phase1_calibration`: Phase offset for frequency 1
- `zero_phase2_calibration`: Phase offset for frequency 2
- `zero_phase3_calibration`: Phase offset for frequency 3

**Storage**: Calibration values stored in internal flash memory

#### Enhanced APD Calibration

**Purpose**: Find optimal APD bias voltage for current conditions

**Process:**
1. Sweep voltage from 75V to 115V (or maximum)
2. Measure signal amplitude at each voltage
3. Select voltage with best signal-to-noise ratio
4. Avoid saturation regions

### Output Data Format

#### UART Output String

**Format:**
```
DIST;01574;AMP;0993;TEMP;1343;VOLT;082\r\n
```

**Fields:**
- `DIST`: Distance in millimeters (5 digits, zero-padded)
- `AMP`: Signal amplitude (4 digits, zero-padded)
- `TEMP`: APD temperature (raw ADC value, 4 digits)
- `VOLT`: APD bias voltage in volts (3 digits, zero-padded)

**Example:**
- `DIST;01574` = 1574 mm = 1.574 meters
- `AMP;0993` = Amplitude value 993
- `TEMP;1343` = Temperature ADC reading 1343
- `VOLT;082` = 82 volts APD bias

**Output Rate**: Continuous at ~60 Hz (when measurement enabled)

#### UART Commands

**Enable Measurement:**
```
Send: 'E'
Response: Measurement starts, distance data output
```

**Disable Measurement:**
```
Send: 'D'
Response: Measurement stops, laser disabled
```

**Calibration:**
```
Send: 'C'
Response: Calibration process starts
        "Calib Start [module type]\r\n"
        "Zero Phase 1: [value]\r\n"
        "Zero Phase 2: [value]\r\n"
        "Zero Phase 3: [value]\r\n"
        "Calib Done\r\n"
```

### Firmware Build, Flashing, and Debugging

#### Build Environment

**IDE**: IAR Embedded Workbench 7.50 (for STM32F100)
**Toolchain**: ARM Cortex-M toolchain
**Target MCU**: 
- STM32F100C8T6 (512A/701A modules)
- STM32F0 series (U85 modules)

#### Build Configuration

**Key Defines:**
- `MODULE_701A`: Select 701A module variant (vs 512A)
- `FAST_CAPTURE`: Enable high-speed capture mode
- `DUAL_FREQUENCY`: 10 kHz mode (vs 5 kHz)
- `ENHANCED_APD_CALIBADION`: Enable enhanced APD calibration

#### Flashing Procedure

1. **Connect Programmer**: ST-Link or compatible SWD programmer
2. **Power Module**: Ensure proper power supply connected
3. **Flash Firmware**: Use IAR or STM32CubeProgrammer
4. **Verify**: Check UART output for "Start\r\n" message

#### Debugging

**UART Debug Output:**
- Calibration messages
- Error messages ("Calib FAIL: Low Signal")
- Measurement status

**Debug Pins** (if enabled):
- GPIO pins can be toggled for timing analysis
- Use logic analyzer on I2C bus for PLL communication

**Common Issues:**
- **No Signal**: Check laser enable, APD voltage, target distance
- **Calibration Fails**: Ensure target >10 cm, adequate signal amplitude
- **Incorrect Distance**: Recalibrate, check for interference

#### Firmware Files Structure

```
Firmware_dist_calculation_fast/
├── src/
│   ├── main.c              # Main application loop
│   ├── config_periph.c      # Peripheral initialization
│   ├── pll_functions.c      # PLL control
│   ├── capture_configure.c  # ADC/DMA setup
│   ├── analyse_ger.c        # Goertzel algorithm
│   ├── distance_calc.c      # Distance calculation
│   └── measure_functions.c  # Measurement control
├── Inc/                     # Header files
└── Project files            # IAR project files
```

---

## Measurement Principle

### Phase-Shift Measurement Theory

The distance measurement is based on the phase difference between transmitted and received signals:

```
Phase Shift (φ) = 2π × (2 × distance) / wavelength
Distance = (φ × wavelength) / (4π)
```

For modulated signals:
```
φ = 2π × f × (2 × d) / c
```

Where:
- f = modulation frequency
- d = distance
- c = speed of light

### Multi-Frequency Ambiguity Resolution

**Problem**: Phase measurement is ambiguous (modulo 2π)

**Solution**: Use multiple frequencies with different wavelengths

**Example:**
- Frequency 1: λ1 = 1.844 m → ambiguous every 1.844 m
- Frequency 2: λ2 = 1.565 m → ambiguous every 1.565 m
- Combined: Ambiguity resolved to longer range

**Algorithm:**
1. Measure phase for each frequency
2. Calculate possible distances for each frequency
3. Find distance values that match across frequencies
4. Select best match (minimum difference)

### Heterodyne Detection

The system uses **heterodyne detection** to convert high-frequency phase information to low-frequency signals:

- **Laser Modulation**: 162.5 MHz (signal) and 162.505 MHz (reference)
- **Beat Frequency**: 5 kHz difference
- **ADC Sampling**: 50 kHz (10× Nyquist for 5 kHz)
- **Phase Information**: Preserved in 5 kHz beat signal

This allows phase measurement using standard ADC sampling rates.

---

## Calibration

### Calibration Requirements

**Initial Calibration:**
- Required on first use
- Required after firmware update
- Recommended after extended storage

**Recalibration:**
- If distance readings become inaccurate
- After significant temperature changes
- After hardware modifications

### Calibration Procedure Details

1. **Preparation**:
   - Place white, reflective target at 10-50 cm from laser
   - Ensure adequate lighting (not direct sunlight)
   - Shield APD from external light

2. **Initiate Calibration**:
   - Send 'C' command via UART
   - Wait for "Calib Start" message

3. **Calibration Process**:
   - Enhanced APD voltage calibration (finds optimal bias)
   - Temperature measurement
   - Phase measurement for frequency 1 (64 samples)
   - Phase measurement for frequency 2 (64 samples)
   - Phase measurement for frequency 3 (64 samples)
   - Data storage to flash

4. **Verification**:
   - Check for "Calib Done" message
   - Verify phase values are reasonable
   - Test distance measurement

### Calibration Data Storage

**Location**: Internal flash memory (MCU-specific)
**Format**: Three 16-bit signed integers (phase values)
**Persistence**: Retained across power cycles
**Update**: Overwritten on new calibration

---

## Build and Deployment

### Development Setup

1. **Install IAR Embedded Workbench** (version 7.50 or compatible)
2. **Install ST-Link Drivers**
3. **Open Project**: Load appropriate .eww file
4. **Configure Target**: Select correct module variant (MODULE_701A define)
5. **Build**: Compile firmware
6. **Flash**: Program to target via ST-Link

### Production Deployment

1. **Hardware Assembly**: Ensure all connections correct
2. **Initial Flash**: Program firmware
3. **Calibration**: Perform zero-distance calibration
4. **Testing**: Verify measurement accuracy
5. **Final Assembly**: Secure all components, shield APD

### Maintenance

**Firmware Updates:**
- Re-flash using ST-Link
- Recalibrate after update

**Troubleshooting:**
- Check UART output for error messages
- Verify power supply voltages
- Inspect laser and APD alignment
- Recalibrate if readings drift

---

## References

- STM32F100 Reference Manual
- Si5351 Datasheet
- APD Datasheet (see Document folder)
- Goertzel Algorithm: Digital Signal Processing theory
- Phase-based rangefinding principles

---

**End of Technical Documentation**

