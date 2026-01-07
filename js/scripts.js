// Projects Data
const projects = [
    {
        id: 'depograph-v1',
        name: 'DepoGraph V1.0',
        description: 'Precision 3D scanning system for creating detailed point cloud representations of indoor environments.',
        slug: 'depograph-v1',
        category: '3D Scanning'
    },
    {
        id: 'depograph-v2',
        name: 'DepoGraph V2.0',
        description: 'Advanced 3D laser scanning system with fixed and portable variants for spatial measurement applications.',
        slug: 'depograph-v2',
        category: '3D Scanning'
    },
    {
        id: 'depograph-v25',
        name: 'DepoGraph V2.5',
        description: 'Enhanced 3D scanning system with improved performance and expanded capabilities.',
        slug: 'depograph-v25',
        category: '3D Scanning'
    },
    {
        id: 'dgs-v1',
        name: 'DGS V1.0',
        description: 'Aircraft Docking Guidance System providing real-time positioning assistance for safe aircraft docking operations.',
        slug: 'dgs-v1',
        category: 'Aviation'
    },
    {
        id: 'laserline-v1',
        name: 'LaserLine V1.0',
        description: 'Laser projection system for generating precise geometric shapes using galvanometer-controlled mirrors.',
        slug: 'laserline-v1',
        category: 'Laser Systems'
    },
    {
        id: 'laserline-v2',
        name: 'LaserLine V2.0',
        description: 'Enhanced laser projection system with expanded capabilities and improved precision.',
        slug: 'laserline-v2',
        category: 'Laser Systems'
    },
    {
        id: 'lidar-2d',
        name: 'Ladar 2D Scanner',
        description: 'Perimeter protection system for open environments, industrial sites, and warehouses with 360-degree coverage.',
        slug: 'lidar-2d',
        category: 'Sensing'
    },
    {
        id: 'loop-v1',
        name: 'Loop V1.0',
        description: 'Wireless vehicle detection system for traffic monitoring and intersection management using LiDAR technology.',
        slug: 'loop-v1',
        category: 'Traffic Systems'
    },
    {
        id: 'loop-v2',
        name: 'Loop V2.0',
        description: 'Enhanced vehicle detection system with improved reliability and expanded monitoring capabilities.',
        slug: 'loop-v2',
        category: 'Traffic Systems'
    },
    {
        id: 'rasad-metro-v1',
        name: 'Rasad (Metro) V1.0',
        description: 'Railway safety monitoring system for detecting train movement and passenger safety violations on metro platforms.',
        slug: 'rasad-metro-v1',
        category: 'Safety Systems'
    }
];

// Project Details
const projectDetails = {
    'depograph-v1': {
        title: 'DepoGraph V1.0',
        subtitle: '3D Scanning System',
        description: 'DepoGraph V1.0 is a precision 3D scanning system designed for creating detailed point cloud representations of indoor environments. The system employs a two-axis mechanical gimbal mechanism with a laser distance sensor to systematically scan and map spatial data.',
        purpose: 'The system is designed for inventory management, volume calculation, space planning, documentation, and quality control applications. It enables accurate 3D mapping of storage facilities, warehouses, and other indoor spaces.',
        useCases: [
            '3D mapping of storage facilities and warehouses',
            'Accurate volume measurements of storage areas',
            'Creating 3D models for layout optimization',
            'Generating point cloud records of spaces',
            'Verifying spatial dimensions and layouts'
        ],
        targetUsers: 'Warehouse managers, logistics professionals, facility planners, and quality control specialists who need accurate spatial data for operational planning and documentation.'
    },
    'depograph-v2': {
        title: 'DepoGraph V2.0',
        subtitle: 'Advanced 3D Laser Scanning System',
        description: 'DepoGraph V2.0 is a professional 3D laser scanning system designed for accurate spatial measurement and point cloud generation. The system is available in both fixed and portable variants, each optimized for different deployment scenarios and operational requirements.',
        purpose: 'The system provides high-precision 3D scanning capabilities for industrial measurement, quality control, reverse engineering, and spatial documentation applications. Both variants offer real-time data processing and flexible deployment options.',
        useCases: [
            'Industrial measurement and quality control',
            'Reverse engineering and CAD modeling',
            'Spatial documentation and archiving',
            'Volume and capacity analysis',
            'Layout planning and optimization'
        ],
        targetUsers: 'Industrial engineers, quality control professionals, facility managers, and technical surveyors requiring high-precision 3D spatial data.'
    },
    'depograph-v25': {
        title: 'DepoGraph V2.5',
        subtitle: 'Enhanced 3D Scanning System',
        description: 'DepoGraph V2.5 represents the latest evolution of our 3D scanning technology, featuring enhanced performance, improved accuracy, and expanded operational capabilities for demanding measurement applications.',
        purpose: 'This enhanced version provides superior scanning performance for applications requiring the highest levels of precision and reliability in 3D spatial measurement and documentation.',
        useCases: [
            'High-precision industrial measurement',
            'Quality assurance and inspection',
            'Detailed spatial documentation',
            'Advanced volume analysis',
            'Professional surveying applications'
        ],
        targetUsers: 'Professional surveyors, quality assurance engineers, and technical specialists requiring the highest precision in 3D measurement applications.'
    },
    'dgs-v1': {
        title: 'DGS V1.0',
        subtitle: 'Aircraft Docking Guidance System',
        description: 'The DGS (Aircraft Docking Guidance System) is an automated guidance system designed to assist aircraft during docking operations at airport gates. The system uses advanced laser scanning technology combined with computer vision to detect aircraft position in real-time and provide accurate guidance information.',
        purpose: 'The system ensures accurate positioning of aircraft at gate parking positions, enhances safety by providing precise distance and direction information, improves efficiency by reducing docking time, and enables automated recording of docking operations.',
        useCases: [
            'Aircraft gate docking operations',
            'Airport ground operations',
            'Aircraft positioning and alignment',
            'Ground marshal assistance',
            'Docking operation documentation'
        ],
        targetUsers: 'Airport ground operations staff, aircraft marshals, airline ground crews, and airport management personnel responsible for safe and efficient aircraft docking operations.'
    },
    'laserline-v1': {
        title: 'LaserLine V1.0',
        subtitle: 'Laser Projection System',
        description: 'LaserLine V1.0 is a laser projection system designed to generate geometric shapes using two galvanometer motors (galvos) to control mirror positions and steer a laser beam. The system focuses on generating straight lines and circles through embedded firmware algorithms.',
        purpose: 'The system provides precise laser projection capabilities for applications requiring accurate geometric pattern generation, visual alignment, and laser-based marking or display applications.',
        useCases: [
            'Laser alignment and marking',
            'Geometric pattern projection',
            'Visual reference systems',
            'Industrial marking applications',
            'Entertainment and display systems'
        ],
        targetUsers: 'Manufacturing engineers, alignment specialists, entertainment professionals, and technicians requiring precise laser projection capabilities.'
    },
    'laserline-v2': {
        title: 'LaserLine V2.0',
        subtitle: 'Enhanced Laser Projection System',
        description: 'LaserLine V2.0 is an enhanced version of our laser projection system, featuring expanded capabilities, improved precision, and additional operating modes for more versatile applications.',
        purpose: 'This enhanced version provides superior laser projection capabilities with additional features and improved performance for demanding applications requiring advanced geometric pattern generation.',
        useCases: [
            'Advanced laser marking systems',
            'Precision alignment applications',
            'Complex geometric projections',
            'Professional display systems',
            'Industrial measurement references'
        ],
        targetUsers: 'Advanced manufacturing professionals, precision alignment specialists, and technical experts requiring enhanced laser projection capabilities.'
    },
    'lidar-2d': {
        title: 'Ladar 2D Scanner',
        subtitle: 'Perimeter Protection System',
        description: 'The Ladar 2D Scanner is a professional perimeter protection system designed for open environments, industrial sites, and warehouses. The system performs scanning and detection of unauthorized persons and objects using a non-visible wavelength laser, providing reliable security monitoring without visual intrusion. The system features a 360-degree Field of View (FOV) for full-area coverage, enabling comprehensive perimeter protection with a single unit.',
        purpose: 'The system enables reliable detection and monitoring of unauthorized access for perimeter protection, security applications, and infrastructure protection in open areas. Its wide-area coverage, reliability, and suitability for security-critical applications make it an essential component of modern perimeter protection systems.',
        useCases: [
            'Perimeter protection in open environments',
            'Industrial site security monitoring',
            'Warehouse access control and monitoring',
            'Unauthorized person and object detection',
            'Security and surveillance applications',
            'Critical infrastructure protection',
            'Multi-device networked security systems'
        ],
        targetUsers: 'Security professionals, facility managers, access control system integrators, and safety coordinators requiring reliable perimeter protection capabilities for industrial and critical infrastructure applications.'
    },
    'loop-v1': {
        title: 'Loop V1.0',
        subtitle: 'Vehicle Detection System',
        description: 'Laser Loop v1 is a distributed vehicle detection system that uses LiDAR distance measurement sensors to detect vehicle presence and wirelessly transmit detection data to a central master unit. The system is designed for traffic control applications, providing reliable vehicle detection for traffic lights, traffic monitoring, and access control systems.',
        purpose: 'The system enables real-time vehicle presence detection, traffic density estimation, traffic control logic input, intersection management, and access control based on vehicle detection.',
        useCases: [
            'Traffic light control at intersections',
            'Vehicle counting and traffic flow analysis',
            'Gate and barrier control systems',
            'Parking lot management',
            'Intersection monitoring and coordination'
        ],
        targetUsers: 'Traffic engineers, transportation planners, parking facility managers, and municipal traffic control personnel responsible for efficient traffic management.'
    },
    'loop-v2': {
        title: 'Loop V2.0',
        subtitle: 'Enhanced Vehicle Detection System',
        description: 'Loop V2.0 is an enhanced version of our vehicle detection system, featuring improved reliability, expanded monitoring capabilities, and enhanced wireless communication for more demanding traffic management applications.',
        purpose: 'This enhanced version provides superior vehicle detection performance with improved accuracy and reliability for critical traffic management and access control applications.',
        useCases: [
            'Advanced traffic management systems',
            'High-traffic intersection control',
            'Intelligent transportation systems',
            'Automated parking systems',
            'Traffic data collection and analysis'
        ],
        targetUsers: 'Advanced traffic management professionals, intelligent transportation system integrators, and municipal traffic control specialists requiring enhanced detection capabilities.'
    },
    'rasad-metro-v1': {
        title: 'Rasad (Metro) V1.0',
        subtitle: 'Railway Safety Monitoring System',
        description: 'Rasad (also known as Metro) v1.0 is a comprehensive railway/metro safety monitoring system designed to enhance passenger safety on metro platforms. The system is designed to detect train entry and exit at metro stations, as well as monitor passenger crossing of the yellow safety line at platform edges to enhance operational and passenger safety. The system automatically detects train movement and passenger safety violations, providing real-time alerts to station operators.',
        purpose: 'The system addresses critical safety concerns in metro operations by monitoring train entry and exit events, detecting passenger safety violations such as crossing the yellow safety line, identifying unauthorized access to restricted areas, and providing immediate visual and audio warnings to station staff. The system emphasizes passenger safety, reliable train detection, and real-time monitoring in metro environments.',
        useCases: [
            'Metro platform safety monitoring',
            'Train movement tracking in tunnels',
            'Passenger safety line violation detection',
            'Tunnel intrusion detection',
            'Platform door status monitoring',
            'Real-time train arrival and departure detection',
            'Passenger safety alert systems'
        ],
        targetUsers: 'Metro station operators, railway safety personnel, transit authority managers, and public transportation safety coordinators responsible for passenger safety in metro systems.'
    }
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a project page
    const path = window.location.pathname;
    const projectSlug = path.split('/').pop().replace('.html', '');
    
    if (projectSlug && projectDetails[projectSlug]) {
        loadProjectPage(projectSlug);
    } else {
        loadHomePage();
    }
    
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });
    
    // Add mobile tap functionality for domain cards
    const domainCards = document.querySelectorAll('.domain-card');
    domainCards.forEach(card => {
        let touchStartTime = 0;
        let touchStartX = 0;
        let touchStartY = 0;
        
        card.addEventListener('touchstart', function(e) {
            touchStartTime = Date.now();
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        card.addEventListener('touchend', function(e) {
            const touchEndTime = Date.now();
            const touchDuration = touchEndTime - touchStartTime;
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const deltaX = Math.abs(touchEndX - touchStartX);
            const deltaY = Math.abs(touchEndY - touchStartY);
            
            // If it's a quick tap (not a swipe), toggle the active state
            if (touchDuration < 300 && deltaX < 10 && deltaY < 10) {
                this.classList.toggle('active');
            }
        }, { passive: false });
    });
});

// Load home page
function loadHomePage() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;
    
    projectsGrid.innerHTML = projects.map(project => {
        const imagePath = getProjectImage(project.id);
        const imageAlt = `Image for ${project.name}`;
        
        return `
        <a href="projects/${project.slug}.html" class="project-card-link" data-project="${project.id}">
            <div class="project-card">
                <div class="project-image" 
                     style="background-image: url('${imagePath}');"
                     role="img"
                     aria-label="${imageAlt}">
                    <img src="${imagePath}" 
                         alt="${imageAlt}" 
                         class="project-image-src"
                         loading="lazy"
                         onerror="this.onerror=null; this.src='${DEFAULT_PROJECT_IMAGE}'; this.parentElement.style.backgroundImage='url(${DEFAULT_PROJECT_IMAGE})';">
                    <div class="project-overlay"></div>
                    <div class="project-content-overlay">
                        <h3 class="project-title">${project.name}</h3>
                        <p class="project-description">${project.description}</p>
                    </div>
                </div>
            </div>
        </a>
        `;
    }).join('');
    
    // Add mobile tap functionality
    const projectCards = document.querySelectorAll('.project-card-link');
    projectCards.forEach(card => {
        let touchStartTime = 0;
        let touchStartX = 0;
        let touchStartY = 0;
        
        card.addEventListener('touchstart', function(e) {
            touchStartTime = Date.now();
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        card.addEventListener('touchend', function(e) {
            const touchEndTime = Date.now();
            const touchDuration = touchEndTime - touchStartTime;
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const deltaX = Math.abs(touchEndX - touchStartX);
            const deltaY = Math.abs(touchEndY - touchStartY);
            
            // If it's a quick tap (not a swipe) and card is not active, toggle it
            if (touchDuration < 300 && deltaX < 10 && deltaY < 10) {
                const projectCard = this.querySelector('.project-card');
                const isActive = projectCard.classList.contains('active');
                
                if (!isActive) {
                    // First tap: show description
                    e.preventDefault();
                    projectCard.classList.add('active');
                } else {
                    // Second tap: navigate
                    window.location.href = this.href;
                }
            }
        }, { passive: false });
    });
}

// Load project page
function loadProjectPage(slug) {
    const details = projectDetails[slug];
    if (!details) {
        window.location.href = 'index.html';
        return;
    }
    
    // Update page title
    document.title = `${details.title} - Sedna Electronics`;
    
    // Create project page content
    const main = document.querySelector('main') || document.body;
    
    // If we're on index.html, replace content
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        main.innerHTML = generateProjectPageHTML(details, slug);
    }
}

// Generate project page HTML
function generateProjectPageHTML(details, slug) {
    return `
        <nav class="navbar">
            <div class="container">
                <div class="nav-brand">
                    <h1>Sedna Electronics</h1>
                </div>
                <ul class="nav-menu">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="index.html#about">About</a></li>
                    <li><a href="index.html#team">Team</a></li>
                    <li><a href="index.html#projects">Projects</a></li>
                </ul>
                <div class="nav-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>
        
        <div class="project-header">
            <div class="container">
                <h1>${details.title}</h1>
                <p>${details.subtitle}</p>
            </div>
        </div>
        
        <div class="project-content-page">
            <div class="container">
                <a href="index.html#projects" class="back-link">← Back to Projects</a>
                
                <div class="project-info">
                    <div class="project-image-large" style="background-image: url('${getProjectImageBySlug(slug)}');" role="img" aria-label="Image for ${details.title}">
                        <img src="${getProjectImageBySlug(slug)}" alt="Image for ${details.title}" class="project-image-large-src" loading="lazy" onerror="this.onerror=null; this.src='${DEFAULT_PROJECT_IMAGE}'; this.parentElement.style.backgroundImage='url(${DEFAULT_PROJECT_IMAGE})';">
                    </div>
                    
                    <div class="info-section">
                        <h2>Product Overview</h2>
                        <p>${details.description}</p>
                    </div>
                    
                    <div class="info-section">
                        <h2>Purpose and Use Cases</h2>
                        <p>${details.purpose}</p>
                        <h3>Key Applications</h3>
                        <ul>
                            ${details.useCases.map(useCase => `<li>${useCase}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="info-section">
                        <h2>Target Users</h2>
                        <p>${details.targetUsers}</p>
                    </div>
                </div>
            </div>
        </div>
        
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>Sedna Electronics</h3>
                        <p>Advanced electronics solutions for industrial applications</p>
                    </div>
                    <div class="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li><a href="index.html#about">About</a></li>
                            <li><a href="index.html#team">Team</a></li>
                            <li><a href="index.html#projects">Projects</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h4>Contact</h4>
                        <p>For inquiries and collaborations</p>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2025 Sedna Electronics. All rights reserved.</p>
                </div>
            </div>
        </footer>
    `;
}

// Get project icon by category
function getProjectIcon(category) {
    const icons = {
        '3D Scanning': '📐',
        'Aviation': '✈️',
        'Laser Systems': '🔦',
        'Sensing': '📡',
        'Traffic Systems': '🚦',
        'Control Systems': '⚙️',
        'Measurement': '📏',
        'Safety Systems': '🛡️'
    };
    return icons[category] || '🔧';
}

// Get project image by project ID
function getProjectImage(projectId) {
    const imageMap = {
        'depograph-v1': 'Image/Projects/Depo Graph V1.0.png',
        'depograph-v2': 'Image/Projects/Depo Graph V2.0.png',
        'depograph-v25': 'Image/Projects/Depo Graph V2.5.png',
        'dgs-v1': 'Image/Projects/DGS V1.0.png',
        'laserline-v1': 'Image/Projects/Laser Line V1.0.png',
        'laserline-v2': 'Image/Projects/Laser Line V2.0.png',
        'lidar-2d': 'Image/Projects/Lidar 2D Scanner V1.0.png',
        'loop-v1': 'Image/Projects/Loop V1.png',
        'loop-v2': 'Image/Projects/Loop V2.0.png',
        'rasad-metro-v1': 'Image/Projects/Rasad (Metro) V1.0.png'
    };
    return imageMap[projectId] || 'Image/embedded.png'; // Fallback placeholder
}

// Default placeholder image
const DEFAULT_PROJECT_IMAGE = 'Image/embedded.png';

// Get project image by slug (for detail pages)
function getProjectImageBySlug(slug) {
    const slugToIdMap = {
        'depograph-v1': 'depograph-v1',
        'depograph-v2': 'depograph-v2',
        'depograph-v25': 'depograph-v25',
        'dgs-v1': 'dgs-v1',
        'laserline-v1': 'laserline-v1',
        'laserline-v2': 'laserline-v2',
        'lidar-2d': 'lidar-2d',
        'loop-v1': 'loop-v1',
        'loop-v2': 'loop-v2',
        'rasad-metro-v1': 'rasad-metro-v1'
    };
    const projectId = slugToIdMap[slug] || slug;
    return getProjectImage(projectId);
}

// Get project icon by slug
function getProjectIconBySlug(slug) {
    const categoryMap = {
        'depograph-v1': '3D Scanning',
        'depograph-v2': '3D Scanning',
        'depograph-v25': '3D Scanning',
        'dgs-v1': 'Aviation',
        'laserline-v1': 'Laser Systems',
        'laserline-v2': 'Laser Systems',
        'lidar-2d': 'Sensing',
        'loop-v1': 'Traffic Systems',
        'loop-v2': 'Traffic Systems',
        'rasad-metro-v1': 'Safety Systems'
    };
    return getProjectIcon(categoryMap[slug] || '');
}
