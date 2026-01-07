# Sedna Electronics - Project Showcase Website

A professional static website showcasing electronics projects developed by Sedna Electronics team. This website is optimized for deployment on GitHub Pages.

## Website Structure

```
.
├── index.html              # Homepage with company intro and projects showcase
├── css/
│   └── styles.css         # Main stylesheet with responsive design
├── js/
│   └── scripts.js         # JavaScript for interactivity
├── projects/              # Individual project pages
│   ├── depograph-v1.html
│   ├── depograph-v2.html
│   ├── depograph-v25.html
│   ├── dgs-v1.html
│   ├── laserline-v1.html
│   ├── laserline-v2.html
│   ├── lidar-2d.html
│   ├── loop-v1.html
│   ├── loop-v2.html
│   ├── pcr-v1.html
│   ├── rangefinder-v1.html
│   └── rasad-metro-v1.html
└── README_WEBSITE.md      # This file
```

## Features

- **Modern, Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Clean UI/UX**: Professional product showcase style suitable for investors and general public
- **No Frameworks**: Pure HTML, CSS, and vanilla JavaScript
- **GitHub Pages Compatible**: Simple folder-based routing
- **Non-Technical Content**: High-level product introductions without technical details

## Deployment on GitHub Pages

### Step 1: Push to GitHub Repository

1. Create a new GitHub repository (or use existing)
2. Push all website files to the repository

```bash
git init
git add .
git commit -m "Initial website deployment"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Choose **main** branch and **/ (root)** folder
5. Click **Save**

### Step 3: Access Your Website

Your website will be available at:
```
https://yourusername.github.io/your-repo/
```

## Local Development

To view the website locally:

1. Open `index.html` in a web browser, or
2. Use a local web server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Then open http://localhost:8000 in your browser
```

## Customization

### Updating Project Information

Project data is stored in `js/scripts.js` in the `projects` and `projectDetails` objects. To update:

1. Edit the project array in `projects` for the homepage cards
2. Edit the `projectDetails` object for individual project page content

### Styling

All styles are in `css/styles.css`. The design uses CSS custom properties (variables) for easy color scheme customization:

```css
:root {
    --primary-color: #2563eb;
    --primary-dark: #1e40af;
    /* ... other variables */
}
```

### Adding New Projects

1. Add project data to `projects` array in `js/scripts.js`
2. Add project details to `projectDetails` object
3. Create a new HTML file in `projects/` folder (use existing files as templates)
4. Update navigation links if needed

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- This website is designed for **non-technical audiences** (investors, general public)
- **No technical documentation** is included (circuit designs, algorithms, firmware details)
- Content focuses on **high-level product introductions** and **use cases**
- All images use placeholder icons - replace with actual product images if available

## License

This website template is provided for the Sedna Electronics project showcase.

---

**Last Updated**: January 2025
