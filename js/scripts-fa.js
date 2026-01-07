// Persian Projects Data
const projectsFA = [
    {
        id: 'depograph-v1',
        name: 'DepoGraph V1.0',
        description: 'سیستم اسکن سه‌بعدی دقیق برای ایجاد نمایش ابر نقطه‌ای دقیق از محیط‌های داخلی.',
        slug: 'depograph-v1',
        category: 'اسکن سه‌بعدی'
    },
    {
        id: 'depograph-v2',
        name: 'DepoGraph V2.0',
        description: 'سیستم پیشرفته اسکن لیزری سه‌بعدی با انواع ثابت و قابل حمل برای کاربردهای اندازه‌گیری فضایی.',
        slug: 'depograph-v2',
        category: 'اسکن سه‌بعدی'
    },
    {
        id: 'depograph-v25',
        name: 'DepoGraph V2.5',
        description: 'سیستم اسکن سه‌بعدی پیشرفته با عملکرد بهبود یافته و قابلیت‌های گسترش یافته.',
        slug: 'depograph-v25',
        category: 'اسکن سه‌بعدی'
    },
    {
        id: 'dgs-v1',
        name: 'DGS V1.0',
        description: 'سیستم راهنمای پهلوگیری هواپیما که کمک موقعیت‌یابی بلادرنگ برای عملیات پهلوگیری ایمن هواپیما ارائه می‌دهد.',
        slug: 'dgs-v1',
        category: 'هوانوردی'
    },
    {
        id: 'laserline-v1',
        name: 'LaserLine V1.0',
        description: 'سیستم پروجکشن لیزری برای تولید اشکال هندسی دقیق با استفاده از آینه‌های کنترل شده با گالوانومتر.',
        slug: 'laserline-v1',
        category: 'سیستم‌های لیزری'
    },
    {
        id: 'laserline-v2',
        name: 'LaserLine V2.0',
        description: 'سیستم پروجکشن لیزری پیشرفته با قابلیت‌های گسترش یافته و دقت بهبود یافته.',
        slug: 'laserline-v2',
        category: 'سیستم‌های لیزری'
    },
    {
        id: 'lidar-2d',
        name: 'Ladar 2D Scanner',
        description: 'سیستم حفاظت محیطی برای محیط‌های باز، سایت‌های صنعتی و انبارها با پوشش 360 درجه.',
        slug: 'lidar-2d',
        category: 'سنجش'
    },
    {
        id: 'loop-v1',
        name: 'Loop V1.0',
        description: 'سیستم تشخیص خودروی بی‌سیم برای نظارت بر ترافیک و مدیریت تقاطع با استفاده از فناوری LiDAR.',
        slug: 'loop-v1',
        category: 'سیستم‌های ترافیکی'
    },
    {
        id: 'loop-v2',
        name: 'Loop V2.0',
        description: 'سیستم تشخیص خودروی پیشرفته با قابلیت اطمینان بهبود یافته و قابلیت‌های نظارتی گسترش یافته.',
        slug: 'loop-v2',
        category: 'سیستم‌های ترافیکی'
    },
    {
        id: 'rasad-metro-v1',
        name: 'Rasad (Metro) V1.0',
        description: 'سیستم نظارت ایمنی راه‌آهن برای تشخیص حرکت قطار و تخلفات ایمنی مسافران در سکوهای مترو.',
        slug: 'rasad-metro-v1',
        category: 'سیستم‌های ایمنی'
    }
];

// Load homepage projects for Persian version
function loadHomePageFA() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;

    projectsGrid.innerHTML = '';

    projectsFA.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        const projectImage = getProjectImage(project.id);
        
        projectCard.innerHTML = `
            <a href="projects/${project.slug}-fa.html" class="project-card-link">
                <div class="project-image" style="background-image: url('${projectImage}');"></div>
                <div class="project-overlay"></div>
                <div class="project-content-overlay">
                    <h3 class="project-title">${project.name}</h3>
                    <p class="project-description">${project.description}</p>
                </div>
            </a>
        `;
        
        projectsGrid.appendChild(projectCard);
    });

    // Add mobile tap functionality for project cards
    const projectCards = document.querySelectorAll('.project-card-link');
    projectCards.forEach(card => {
        let touchStartTime = 0;
        let isDescriptionVisible = false;

        card.addEventListener('touchstart', function(e) {
            touchStartTime = Date.now();
        });

        card.addEventListener('touchend', function(e) {
            const touchDuration = Date.now() - touchStartTime;
            
            if (touchDuration < 300) { // Quick tap
                if (!isDescriptionVisible) {
                    e.preventDefault();
                    this.classList.add('active');
                    isDescriptionVisible = true;
                } else {
                    // Second tap - navigate
                    window.location.href = this.getAttribute('href');
                }
            }
        });

        // Reset on mouse leave (desktop)
        card.addEventListener('mouseleave', function() {
            this.classList.remove('active');
            isDescriptionVisible = false;
        });
    });
}

// Initialize Persian page
document.addEventListener('DOMContentLoaded', function() {
    if (document.documentElement.lang === 'fa') {
        loadHomePageFA();
        
        // Mobile menu toggle (same functionality)
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
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
            let isActive = false;

            card.addEventListener('touchstart', function(e) {
                touchStartTime = Date.now();
            });

            card.addEventListener('touchend', function(e) {
                const touchDuration = Date.now() - touchStartTime;
                
                if (touchDuration < 300) { // Quick tap
                    if (!isActive) {
                        e.preventDefault();
                        this.classList.add('active');
                        isActive = true;
                    } else {
                        this.classList.remove('active');
                        isActive = false;
                    }
                }
            });

            // Reset on mouse leave (desktop)
            card.addEventListener('mouseleave', function() {
                this.classList.remove('active');
                isActive = false;
            });
        });
    }
});

