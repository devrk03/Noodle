document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    const loadingBar = document.getElementById('loading-bar');
    const loadingPercentageText = document.getElementById('loading-percentage');

    const canvas = document.getElementById('scroll-video-canvas');
    const ctx = canvas.getContext('2d');

    const heroSection = document.getElementById('hero');
    const heroContent = document.querySelector('.hero-content');
    const videoScrollWrapper = document.getElementById('video-scroll-wrapper');
    const navbar = document.getElementById('navbar');

    const SCROLL_PIXELS_PER_FRAME = 75; // Adjust for scroll sensitivity

    const VIDEO_SECTIONS_CONFIG = [
        {
            id: 'step1',
            containerId: 'step1-container',
            frames: [
                "https://i.ibb.co/yFsx0YT6/1000069876-0001-0.png", "https://i.ibb.co/rKFzg0h5/1000069876-0002-0.png", "https://i.ibb.co/0Vq2VBR5/1000069876-0003-0.png",
                "https://i.ibb.co/h1XWNvH1/1000069876-0004-0.png", "https://i.ibb.co/DfQ97J6M/1000069876-0005-0.png", "https://i.ibb.co/qY6F5Dyf/1000069876-0006-0.png",
                "https://i.ibb.co/RkqScMG5/1000069876-0007-0.png", "https://i.ibb.co/xKz3hGFM/1000069876-0008-0.png", "https://i.ibb.co/dNkXHqc/1000069876-0009-0.png",
                "https://i.ibb.co/pr6nP1gQ/1000069876-0010-0.png", "https://i.ibb.co/dssBdpJ3/1000069876-0011-0.png", "https://i.ibb.co/XkfhnrDR/1000069876-0012-0.png",
                "https://i.ibb.co/pjSJVjk5/1000069876-0013-0.png", "https://i.ibb.co/DHKB9g8n/1000069876-0014-0.png", "https://i.ibb.co/sJ9KVxxY/1000069876-0015-0.png",
                "https://i.ibb.co/0j1pgyzk/1000069876-0016-0.png", "https://i.ibb.co/9HXpm3D2/1000069876-0017-0.png", "https://i.ibb.co/fYFkKgNX/1000069876-0018-0.png",
                "https://i.ibb.co/vx9QZmJP/1000069876-0019-0.png", "https://i.ibb.co/jvVhfrPS/1000069876-0020-0.png", "https://i.ibb.co/Q7hHdMsJ/1000069876-0021-0.png",
                "https://i.ibb.co/cXQHTFfc/1000069876-0022-0.png", "https://i.ibb.co/bjXLR8QR/1000069876-0023-0.png", "https://i.ibb.co/GfmyghB6/1000069876-0024-0.png",
                "https://i.ibb.co/wNscYdg4/1000069876-0025-0.png", "https://i.ibb.co/1JtTVL5s/1000069876-0026-0.png", "https://i.ibb.co/n8LnK8Gb/1000069876-0027-0.png",
                "https://i.ibb.co/3mL9J099/1000069876-0028-0.png", "https://i.ibb.co/LhBtd08T/1000069876-0029-0.png", "https://i.ibb.co/gZ7LFstF/1000069876-0030-0.png"
            ],
            images: []
        },
        {
            id: 'step2',
            containerId: 'step2-container',
            frames: [
                "https://i.ibb.co/hxM4CZy9/1000069946-0001-0.png", "https://i.ibb.co/38BZS8v/1000069946-0002-0.png", "https://i.ibb.co/gsL2HPy/1000069946-0003-0.png",
                "https://i.ibb.co/SD4gDLQM/1000069946-0004-0.png", "https://i.ibb.co/jP8f6gz4/1000069946-0005-0.png", "https://i.ibb.co/sp2P1gd6/1000069946-0006-0.png",
                "https://i.ibb.co/BVVvmCFs/1000069946-0007-0.png", "https://i.ibb.co/Tq74k77W/1000069946-0008-0.png", "https://i.ibb.co/0jJtP1BK/1000069946-0009-0.png",
                "https://i.ibb.co/PZ14sGJx/1000069946-0010-0.png", "https://i.ibb.co/wrjfcR2c/1000069946-0011-0.png", "https://i.ibb.co/LXvctxtG/1000069946-0012-0.png",
                "https://i.ibb.co/hRmDMYzJ/1000069946-0013-0.png", "https://i.ibb.co/wrNH3MTB/1000069946-0014-0.png", "https://i.ibb.co/QB12MqL/1000069946-0015-0.png",
                "https://i.ibb.co/V0WbgTCq/1000069946-0016-0.png"
            ],
            images: []
        },
        {
            id: 'step3',
            containerId: 'step3-container',
            frames: [
                "https://i.ibb.co/6cZXG1gN/1000069966-0001-0.png", "https://i.ibb.co/CkW3SmJ/1000069966-0002-0.png", "https://i.ibb.co/VYM7hbXD/1000069966-0003-0.png",
                "https://i.ibb.co/Fbwc6ZqQ/1000069966-0004-0.png", "https://i.ibb.co/PskYQP2c/1000069966-0005-0.png", "https://i.ibb.co/spFg9BVS/1000069966-0006-0.png",
                "https://i.ibb.co/p683JynF/1000069966-0007-0.png", "https://i.ibb.co/VYnwgF5J/1000069966-0008-0.png", "https://i.ibb.co/gF4pypqz/1000069966-0009-0.png",
                "https://i.ibb.co/3y5DBZR3/1000069966-0010-0.png", "https://i.ibb.co/prnXFMNk/1000069966-0011-0.png", "https://i.ibb.co/tTCwjRty/1000069966-0012-0.png",
                "https://i.ibb.co/ycQngDZk/1000069966-0013-0.png", "https://i.ibb.co/NdYQz2gq/1000069966-0014-0.png", "https://i.ibb.co/JjvzbLSL/1000069966-0015-0.png",
                "https://i.ibb.co/hRYLGwZ9/1000069966-0016-0.png", "https://i.ibb.co/dJKL77bQ/1000069966-0017-0.png", "https://i.ibb.co/YmhVHWT/1000069966-0018-0.png",
                "https://i.ibb.co/H0gFC9Y/1000069966-0019-0.png", "https://i.ibb.co/hRP7TdLQ/1000069966-0020-0.png", "https://i.ibb.co/QvFcPHpx/1000069966-0021-0.png",
                "https://i.ibb.co/ynSXfTG0/1000069966-0022-0.png", "https://i.ibb.co/q38ZZYrL/1000069966-0023-0.png"
            ],
            images: []
        }
    ];
    const HERO_BG_URL = "https://i.ibb.co/cKpwxKSH/Gemini-Generated-Image-fb3cywfb3cywfb3c.jpg";
    const LOGO_URL = "https://i.ibb.co/xS5qCGW4/Pngtree-noodles-logo-4146753-removebg-preview.png";


    let totalImagesToLoad = 1 + 1; // Hero BG + Logo
    VIDEO_SECTIONS_CONFIG.forEach(section => totalImagesToLoad += section.frames.length);
    let imagesLoadedCount = 0;

    function updateLoadingProgress() {
        imagesLoadedCount++;
        const percentage = Math.round((imagesLoadedCount / totalImagesToLoad) * 100);
        loadingBar.style.width = percentage + '%';
        loadingPercentageText.textContent = percentage + '%';

        if (imagesLoadedCount === totalImagesToLoad) {
            setTimeout(() => { // Short delay for effect
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                mainContent.style.display = 'block';
                setTimeout(() => {
                    mainContent.style.opacity = '1'; // Fade in main content
                    preloader.remove(); // Remove preloader from DOM
                }, 500); // Match CSS transition
                
                initPage(); // Initialize animations and scroll listeners
            }, 500);
        }
    }
    
    // Start preloading
    const heroBgImage = new Image();
    heroBgImage.crossOrigin = "anonymous";
    heroBgImage.onload = updateLoadingProgress;
    heroBgImage.onerror = () => { console.error("Error loading hero BG"); updateLoadingProgress(); };
    heroBgImage.src = HERO_BG_URL;

    const logoImage = new Image();
    logoImage.crossOrigin = "anonymous";
    logoImage.onload = updateLoadingProgress;
    logoImage.onerror = () => { console.error("Error loading logo"); updateLoadingProgress(); };
    logoImage.src = LOGO_URL;


    VIDEO_SECTIONS_CONFIG.forEach(section => {
        section.frames.forEach(frameSrc => {
            const img = new Image();
            img.crossOrigin = "anonymous"; // Important for canvas if images are on different domains
            img.onload = updateLoadingProgress;
            img.onerror = () => {
                console.error(`Error loading frame: ${frameSrc}`);
                updateLoadingProgress(); // Still count it to not block preloader indefinitely
            };
            img.src = frameSrc;
            section.images.push(img);
        });
    });

    function initPage() {
        resizeCanvas();
        setupScrollTriggeredContent();
        setupVideoScrollWrapperHeight();
        
        // Initial draw (e.g., first frame or clear)
        handleScroll(); // Draw initial state

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', () => {
            resizeCanvas();
            setupVideoScrollWrapperHeight(); // Recalculate heights
            handleScroll(); // Redraw with new dimensions/scroll
        });

        // Navbar scroll behavior
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Smooth scroll for nav links
        document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                let targetElement;

                if (targetId === "#hero") {
                    targetElement = document.getElementById('hero');
                 } else if (targetId === "#step1-container" || targetId === "#step2-container" || targetId === "#step3-container") {
                    targetElement = document.querySelector(targetId);
                 }

                if (targetElement) {
                    let targetPosition = targetElement.offsetTop;
                    if (targetId.includes('step')) { // For step containers, account for hero height
                         targetPosition = heroSection.offsetHeight + targetElement.offsetTop;
                    }
                     if(targetId === "#hero") targetPosition = 0;


                    window.scrollTo({
                        top: targetPosition - navbar.offsetHeight, // Adjust for fixed navbar
                        behavior: 'smooth'
                    });
                }
            });
        });


        document.getElementById('current-year').textContent = new Date().getFullYear();
    }


    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function setupVideoScrollWrapperHeight() {
        let totalVideoScrollHeight = 0;
        VIDEO_SECTIONS_CONFIG.forEach(section => {
            const sectionHeight = section.frames.length * SCROLL_PIXELS_PER_FRAME;
            totalVideoScrollHeight += sectionHeight;
            document.getElementById(section.containerId).style.height = `${sectionHeight}px`;
        });
        videoScrollWrapper.style.height = `${totalVideoScrollHeight}px`;
    }

    function drawFrame(image) {
        if (!image || !image.complete || image.naturalHeight === 0) {
            // console.warn("Attempted to draw incomplete or invalid image:", image ? image.src : 'undefined');
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear if image is bad
            return;
        }
        
        const canvasAspect = canvas.width / canvas.height;
        const imageAspect = image.naturalWidth / image.naturalHeight;
        let drawWidth, drawHeight, offsetX, offsetY;

        // Cover logic: make image fill canvas while maintaining aspect ratio
        if (canvasAspect > imageAspect) { // Canvas is wider than image, so image height matches canvas height
            drawHeight = canvas.height;
            drawWidth = drawHeight * imageAspect;
            offsetX = (canvas.width - drawWidth) / 2;
            offsetY = 0;
        } else { // Canvas is taller or same aspect as image, so image width matches canvas width
            drawWidth = canvas.width;
            drawHeight = drawWidth / imageAspect; // Corrected this line
            offsetX = 0;
            offsetY = (canvas.height - drawHeight) / 2;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
    }

    let lastFrameImage = null; // Optimization to prevent re-drawing the same frame
    
    function handleScroll() {
        const scrollY = window.scrollY;
        const heroHeight = heroSection.offsetHeight;

        // Hero content fade out
        if (heroContent) {
            const heroOpacity = Math.max(0, 1 - (scrollY / (heroHeight * 0.7)));
            heroContent.style.opacity = heroOpacity.toString();
        }

        // Frame animation logic
        const scrollRelativeToVideoStart = scrollY - heroHeight;

        if (scrollRelativeToVideoStart < 0) {
            // We are in the hero section or before it
            if (lastFrameImage !== null) { // Clear canvas only if it had content
                 ctx.clearRect(0, 0, canvas.width, canvas.height);
                 lastFrameImage = null;
            }
            return; // No frame animation in hero section
        }

        let cumulativeScrollOffset = 0;
        let activeSection = null;
        let frameIndex = 0;
        let currentImageToDraw = null;

        for (let i = 0; i < VIDEO_SECTIONS_CONFIG.length; i++) {
            const section = VIDEO_SECTIONS_CONFIG[i];
            const sectionScrollHeight = section.frames.length * SCROLL_PIXELS_PER_FRAME;
            const sectionStartScroll = cumulativeScrollOffset;
            const sectionEndScroll = cumulativeScrollOffset + sectionScrollHeight;

            if (scrollRelativeToVideoStart >= sectionStartScroll && scrollRelativeToVideoStart < sectionEndScroll) {
                activeSection = section;
                const scrollWithinSection = scrollRelativeToVideoStart - sectionStartScroll;
                frameIndex = Math.floor(scrollWithinSection / SCROLL_PIXELS_PER_FRAME);
                frameIndex = Math.min(section.images.length - 1, Math.max(0, frameIndex)); // Clamp index
                currentImageToDraw = section.images[frameIndex];
                break;
            }
            cumulativeScrollOffset += sectionScrollHeight;
        }
        
        if (!activeSection && scrollRelativeToVideoStart >= cumulativeScrollOffset) {
            // Scrolled past all video sections, show last frame of last video
            const lastSection = VIDEO_SECTIONS_CONFIG[VIDEO_SECTIONS_CONFIG.length - 1];
            currentImageToDraw = lastSection.images[lastSection.images.length - 1];
        }


        if (currentImageToDraw && currentImageToDraw !== lastFrameImage) {
           requestAnimationFrame(() => drawFrame(currentImageToDraw));
           lastFrameImage = currentImageToDraw;
        } else if (!currentImageToDraw && lastFrameImage !== null) {
            // If no image should be drawn (e.g., scrolled before video starts, after hero)
            // and canvas had content, clear it.
            // This case is largely handled by the initial (scrollRelativeToVideoStart < 0) check
            // but kept for safety.
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            lastFrameImage = null;
        }
    }
    
    // Intersection Observer for text fade-in
    function setupScrollTriggeredContent() {
        const sections = document.querySelectorAll('.step-text-content');
        const observerOptions = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.3 // Trigger when 30% of the element is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    // Optional: remove 'visible' if you want it to fade out when scrolling back up
                    // entry.target.classList.remove('visible'); 
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Initial call to preloader if not all images are magically loaded by the time this script runs
    // (which they won't be, this logic initiates the loading)
    if (imagesLoadedCount < totalImagesToLoad) {
        // Preloading is already kicked off by image.src assignments above
        // console.log("Preloading in progress...");
    } else {
        // This case should ideally not happen if preloader logic is correct
        // but as a fallback:
        preloader.style.display = 'none';
        mainContent.style.display = 'block';
        mainContent.style.opacity = '1';
        initPage();
    }
});
