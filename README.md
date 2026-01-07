# Sedna Electronics Group Website

A professional bilingual (English/Persian) static website showcasing the electronics engineering projects and team of Sedna Electronics Group, part of Sedna Smart Solutions.

## 🌐 Languages

- **English** (`index.html`) - Default language
- **Persian/Farsi** (`index-fa.html`) - Right-to-left (RTL) layout

All project pages are available in both languages with automatic language detection and switching.

## ✨ Features

- **Bilingual Support**: Full English and Persian translations
- **RTL Layout**: Proper right-to-left support for Persian content
- **Dark Mode**: Modern dark theme throughout
- **Responsive Design**: Mobile-friendly layout
- **Interactive Cards**: Hover/tap effects on project and expertise cards
- **Smooth Animations**: CSS transitions and fade effects
- **Language Switching**: Easy toggle between English and Persian
- **Dynamic Content**: JavaScript-powered project loading
- **Professional Design**: Corporate-grade UI/UX

## 📁 Project Structure

```
sednaelectronic.github.io/
├── index.html              # English homepage
├── index-fa.html          # Persian homepage
├── css/
│   └── styles.css         # Main stylesheet (includes RTL support)
├── js/
│   ├── scripts.js         # English JavaScript
│   └── scripts-fa.js     # Persian JavaScript
├── projects/
│   ├── depograph-v1.html      # English project pages
│   ├── depograph-v1-fa.html  # Persian project pages
│   ├── depograph-v2.html
│   ├── depograph-v2-fa.html
│   ├── depograph-v25.html
│   ├── depograph-v25-fa.html
│   ├── dgs-v1.html
│   ├── dgs-v1-fa.html
│   ├── laserline-v1.html
│   ├── laserline-v1-fa.html
│   ├── laserline-v2.html
│   ├── laserline-v2-fa.html
│   ├── lidar-2d.html
│   ├── lidar-2d-fa.html
│   ├── loop-v1.html
│   ├── loop-v1-fa.html
│   ├── loop-v2.html
│   ├── loop-v2-fa.html
│   ├── rasad-metro-v1.html
│   └── rasad-metro-v1-fa.html
├── Image/
│   ├── Projects/          # Project-specific images
│   ├── Lidar.png
│   ├── embedded.png
│   ├── 3d scanners.png
│   ├── control systems.png
│   ├── safety system.png
│   └── wireless communication.png
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for development)

### Installation

1. Clone or download this repository
2. Open `index.html` in a web browser, or
3. Use a local web server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```
4. Navigate to `http://localhost:8000` in your browser

## 📄 Pages

### Homepage
- **English**: `index.html`
- **Persian**: `index-fa.html`

### Sections
- **Hero**: Introduction and call-to-action
- **About**: Company and team overview
- **Our Expertise**: Interactive domain cards (6 categories)
- **Team**: Team leadership and core engineering team
- **Projects**: Dynamic project showcase (10 projects)
- **Footer**: Contact information and quick links

### Project Pages

All projects are available in both languages:

1. **DepoGraph V1.0** - Portable 3D scanning system (indoor)
2. **DepoGraph V2.0** - Advanced 3D laser scanning (outdoor)
3. **DepoGraph V2.5** - Enhanced 3D scanning (professional-grade)
4. **DGS V1.0** - Aircraft Docking Guidance System
5. **LaserLine V1.0** - Laser projection system (single-axis)
6. **LaserLine V2.0** - Enhanced laser projection (two-axis)
7. **Ladar 2D Scanner** - Perimeter protection system
8. **Loop V1.0** - Vehicle detection system (short-range)
9. **Loop V2.0** - Enhanced vehicle detection (long-range)
10. **Rasad (Metro) V1.0** - Railway safety monitoring system

## 🎨 Design Features

### Color Scheme
- Primary: Blue gradient (`#3b82f6` to `#1e40af`)
- Background: Dark slate (`#0f172a`, `#020617`)
- Cards: Gradient cards with hover effects
- Text: High contrast for readability

### Interactive Elements
- **Domain Cards**: Hover to reveal descriptions with blur effect
- **Project Cards**: Hover/tap to show project details
- **Language Switch**: Gradient button in navigation
- **Mobile Menu**: Hamburger menu for mobile devices
- **Smooth Scrolling**: Anchor link navigation

### Responsive Breakpoints
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px
- Small Mobile: < 480px

## 🔧 Technologies

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, gradients, animations, RTL support
- **JavaScript (Vanilla)**: No frameworks, pure JS
- **Responsive Design**: Mobile-first approach
- **Accessibility**: ARIA labels, alt text, semantic HTML

## 🌍 Language Switching

### How It Works

1. **Homepage Navigation**:
   - English homepage has "FA" button → links to `index-fa.html`
   - Persian homepage has "EN" button → links to `index.html`

2. **Project Pages**:
   - English project pages have "FA" button → links to `*-fa.html`
   - Persian project pages have "EN" button → links to `*.html` (without `-fa`)

3. **Automatic Routing**:
   - JavaScript detects current language
   - Project cards link to appropriate language version
   - Persian homepage links to Persian project pages
   - English homepage links to English project pages

## 📱 Mobile Features

- Touch-friendly navigation
- Tap-to-reveal for project/domain cards
- Responsive images
- Mobile-optimized typography
- Collapsible navigation menu

## 🎯 Key Sections

### About Section
- Introduction to Sedna Smart Solutions (parent company)
- Sedna Electronics Group overview
- Team mission and expertise

### Team Section
- **Team Leadership**: Team Leader & Electronics Manager
- **Core Engineering Team**: Photonic Lead & Electronics Designer
- GitHub profile links for team members

### Our Expertise
1. Precision Sensing
2. Embedded Systems
3. Wireless Communication
4. Control Systems
5. 3D Scanning
6. Safety Systems

### Projects
10 innovative electronics projects with detailed descriptions, technical specifications, and use cases.

## 📞 Contact Information

- **Address**: Tehran, Pasdaran, Dashtestan 1st Street, Iran
- **Phone**: +98 21 2363 6363
- **Fax**: +98 21 2363 0000
- **Email**: info@sednatech.ir
- **LinkedIn**: [Sedna Company](https://ir.linkedin.com/company/sednaco2021)
- **Website**: [sednatech.ir](https://sednatech.ir/)

## 🔗 Links

- **Parent Company**: [Sedna Smart Solutions](https://sednatech.ir/)
- **GitHub Profiles**:
  - [Mohammad Amin Khadem Al Hosseini](https://github.com/amin98hosseini)
  - [Zahra AminRayai Jezeh](https://github.com/zahra-aminraya)

## 📝 Notes

- All images are stored in the `Image/` directory
- Project images are in `Image/Projects/`
- Default placeholder image: `Image/embedded.png`
- No external dependencies or CDN required
- Works offline (static files only)

## 🛠️ Customization

### Adding a New Project

1. Add project data to `js/scripts.js` (English) and `js/scripts-fa.js` (Persian)
2. Add project image to `Image/Projects/`
3. Create English project page: `projects/project-name.html`
4. Create Persian project page: `projects/project-name-fa.html`
5. Update image mapping in `getProjectImage()` function

### Modifying Styles

- Main stylesheet: `css/styles.css`
- CSS variables defined in `:root` for easy theming
- RTL styles under `html[dir="rtl"]` selector

## 📄 License

© 2025 Sedna Electronics Group, part of Sedna Smart Solutions. All rights reserved.

## 👥 Team

- **Mohammad Amin Khadem Al Hosseini** - Team Leader & Electronics Manager
- **Zahra AminRayai Jezeh** - Photonic Lead & Electronics Designer

## 🌟 Features Highlights

- ✅ Fully bilingual (English/Persian)
- ✅ RTL support for Persian
- ✅ Dark mode theme
- ✅ Responsive design
- ✅ Interactive UI elements
- ✅ Professional corporate design
- ✅ SEO-friendly structure
- ✅ Accessible markup
- ✅ Fast loading (no external dependencies)
- ✅ Mobile-optimized

---

**Built with ❤️ by Sedna Electronics Group**
