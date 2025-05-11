document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const progressBar = document.querySelector('#preloader .progress-bar');
    const heroSection = document.getElementById('hero');
    const canvas = document.getElementById('frame-canvas');
    const ctx = canvas.getContext('2d');
    const navbar = document.getElementById('navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    const frameData = {
        heroBackground: "https://i.ibb.co/cKpwxKSH/Gemini-Generated-Image-fb3cywfb3cywfb3c.jpg",
        video1Frames: [
            "https://i.ibb.co/yFsx0YT6/1000069876-0001-0.png", "https://i.ibb.co/rKFzg0h5/1000069876-0002-0.png", "https://i.ibb.co/0Vq2VBR5/1000069876-0003-0.png", "https://i.ibb.co/h1XWNvH1/1000069876-0004-0.png", "https://i.ibb.co/DfQ97J6M/1000069876-0005-0.png", "https://i.ibb.co/qY6F5Dyf/1000069876-0006-0.png", "https://i.ibb.co/RkqScMG5/1000069876-0007-0.png", "https://i.ibb.co/xKz3hGFM/1000069876-0008-0.png", "https://i.ibb.co/dNkXHqc/1000069876-0009-0.png", "https://i.ibb.co/pr6nP1gQ/1000069876-0010-0.png", "https://i.ibb.co/dssBdpJ3/1000069876-0011-0.png", "https://i.ibb.co/XkfhnrDR/1000069876-0012-0.png", "https://i.ibb.co/pjSJVjk5/1000069876-0013-0.png", "https://i.ibb.co/DHKB9g8n/1000069876-0014-0.png", "https://i.ibb.co/sJ9KVxxY/1000069876-0015-0.png", "https://i.ibb.co/0j1pgyzk/1000069876-0016-0.png", "https://i.ibb.co/9HXpm3D2/1000069876-0017-0.png", "https://i.ibb.co/fYFkKgNX/1000069876-0018-0.png", "https://i.ibb.co/vx9QZmJP/1000069876-0019-0.png", "https://i.ibb.co/jvVhfrPS/1000069876-0020-0.png", "https://i.ibb.co/Q7hHdMsJ/1000069876-0021-0.png", "https://i.ibb.co/cXQHTFfc/1000069876-0022-0.png", "https://i.ibb.co/bjXLR8QR/1000069876-0023-0.png", "https://i.ibb.co/GfmyghB6/1000069876-0024-0.png", "https://i.ibb.co/wNscYdg4/1000069876-0025-0.png", "https://i.ibb.co/1JtTVL5s/1000069876-0026-0.png", "https://i.ibb.co/n8LnK8Gb/1000069876-0027-0.png", "https://i.ibb.co/3mL9J099/1000069876-0028-0.png", "https://i.ibb.co/LhBtd08T/1000069876-0029-0.png", "https://i.ibb.co/gZ7LFstF/1000069876-0030-0.png"
        ],
        video2Frames: [
            "https://i.ibb.co/hxM4CZy9/1000069946-0001-0.png", "https://i.ibb.co/38BZS8v/1000069946-0002-0.png", "https://i.ibb.co/gsL2HPy/1000069946-0003-0.png", "https://i.ibb.co/SD4gDLQM/1000069946-0004-0.png", "https://i.ibb.co/jP8f6gz4/1000069946-0005-0.png", "https://i.ibb.co/sp2P1gd6/1000069946-0006-0.png", "https://i.ibb.co/BVVvmCFs/1000069946-0007-0.png", "https://i.ibb.co/Tq74k77W/1000069946-0008-0.png", "https://i.ibb.co/0jJtP1BK/1000069946-0009-0.png", "https://i.ibb.co/PZ14sGJx/1000069946-0010-0.png", "https://i.ibb.co/wrjfcR2c/1000069946-0011-0.png", "https://i.ibb.co/LXvctxtG/1000069946-0012-0.png", "https://i.ibb.co/hRmDMYzJ/1000069946-0013-0.png", "https://i.ibb.co/wrNH3MTB/1000069946-0014-0.png", "https://i.ibb.co/QB12MqL/1000069946-0015-0.png", "https://i.ibb.co/V0WbgTCq/1000069946-0016-0.png"
        ],
        video3Frames: [
            "https://i.ibb.co/6cZXG1gN/1000069966-0001-0.png", "https://i.ibb.co/CkW3SmJ/1000069966-0002-0.png", "https://i.ibb.co/VYM7hbXD/1000069966-0003-0.png", "https://i.ibb.co/Fbwc6ZqQ/1000069966-0004-0.png", "https://i.ibb.co/PskYQP2c/1000069966-0005-0.png", "https://i.ibb.co/spFg9BVS/1000069966-0006-0.png", "https://i.ibb.co/p683JynF/1000069966-0007-0.png", "https://i.ibb.co/VYnwgF5J/1000069966-0008-0.png", "https://i.ibb.co/gF4pypqz/1000069966-0009-0.png", "https://i.ibb.co/3y5DBZR3/1000069966-0010-0.png", "https://i.ibb.co/prnXFMNk/1000069966-0011-0.png", "https://i.ibb.co/tTCwjRty/1000069966-0012-0.png", "https://i.ibb.co/ycQngDZk/1000069966-0013-0.png", "https://i.ibb.co/NdYQz2gq/1000069966-0014-0.png", "https://i.ibb.co/JjvzbLSL/1000069966-0015-0.png", "https://i.ibb.co/hRYLGwZ9/1000069966-0016-0.png", "https://i.ibb.co/dJKL77bQ/1000069966-0017-0.png", "https://i.ibb.co/YmhVHWT/1000069966-0018-0.png", "https://i.ibb.co/H0gFC9Y/1000069966-0019-0.png", "https://i.ibb.co/hRP7TdLQ/1000069966-0020-0.png", "https://i.ibb.co/QvFcPHpx/1000069966-0021-0.png", "https://i.ibb.co/ynSXfTG0/1000069966-0022-0.png", "https://i.ibb.co/q38ZZYrL/1000069966-0023-0.png"
        ]
    };

    const allFrameUrls = [
        frameData.heroBackground, 
        ...frameData.video1Frames, 
        ...frameData.video2Frames, 
        ...frameData.video3Frames
    ];
    const loadedImages = {}; // Store loaded Image objects

    let totalImages = allFrameUrls.length;
    let imagesLoadedCount = 0;

    function updateProgressBar() {
        const progress = totalImages > 0 ? (imagesLoadedCount / totalImages) * 100 : 100;
        if (progressBar) progressBar.style.width = `${Math.round(progress)}%`;
    }
    
    function preloadImages(urls, callback) {
        urls.forEach(url => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                imagesLoadedCount++;
                loadedImages[url] = img;
                updateProgressBar();
                if (imagesLoadedCount === totalImages) {
                    callback();
                }
            };
            img.onerror = () => {
                console.error(`Failed to load image: ${url}`);
                imagesLoadedCount++; // Still count it to not let preloader hang
                updateProgressBar();
                if (imagesLoadedCount === totalImages) {
                    callback(); // Proceed even if some images fail
                }
            };
        });
         if (totalImages === 0) callback(); // No images to load
    }
    
    function hidePreloader() {
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => { preloader.style.display = 'none'; }, 500);
            document.body.style.overflowY = 'auto'; // Restore scroll
        }
    }
    
    document.body.style.overflowY = 'hidden'; // Prevent scroll during preload

    preloadImages(allFrameUrls, () => {
        console.log("All images preloaded (or attempted).");
        hidePreloader();
        initializeApp();
    });


    function initializeApp() {
        // Set canvas dimensions
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Draw initial frame (e.g., first frame of first video, or a dedicated hero background)
        // If hero has its own CSS background, canvas can be initially blank or show first frame.
        // Let's make it show the first frame of video 1.
        if (frameData.video1Frames.length > 0 && loadedImages[frameData.video1Frames[0]]) {
             drawImageCover(ctx, loadedImages[frameData.video1Frames[0]]);
        } else if (loadedImages[frameData.heroBackground]) {
            // Fallback to hero background on canvas if first video frame not available
            drawImageCover(ctx, loadedImages[frameData.heroBackground]);
        }


        // Scroll event listener
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        
        // Initial call to handle scroll for nav and text animations
        handleScroll();

        // Navbar toggle for mobile
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navLinksContainer.classList.toggle('active');
                navToggle.querySelector('i').classList.toggle('fa-bars');
                navToggle.querySelector('i').classList.toggle('fa-times');
            });
        }

        // Close mobile nav when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinksContainer.classList.contains('active')) {
                    navLinksContainer.classList.remove('active');
                    navToggle.querySelector('i').classList.remove('fa-times');
                    navToggle.querySelector('i').classList.add('fa-bars');
                }
            });
        });
         // Intersection Observer for text animations
        const animatedElements = document.querySelectorAll('.animate-on-scroll, .step-text-content');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible', 'is-visible');
                } else {
                    // Optional: remove class if you want elements to re-animate when scrolling back up
                    // entry.target.classList.remove('visible', 'is-visible');
                }
            });
        }, { threshold: 0.1 }); // Adjust threshold as needed

        animatedElements.forEach(el => observer.observe(el));


        // Update copyright year
        const currentYearSpan = document.getElementById('currentYear');
        if (currentYearSpan) {
            currentYearSpan.textContent = new Date().getFullYear();
        }

        // Smooth scroll for scroll down indicator
        const scrollIndicator = document.querySelector('.scroll-down-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const firstStep = document.getElementById('step1-trigger');
                if (firstStep) {
                    firstStep.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    function drawImageCover(currentCtx, img) {
        if (!img || !img.complete || img.naturalWidth === 0) {
             console.warn("Image not loaded or invalid for drawing:", img ? img.src : 'undefined image');
            currentCtx.clearRect(0, 0, currentCtx.canvas.width, currentCtx.canvas.height); // Clear if image is bad
            return;
        }

        const canvasWidth = currentCtx.canvas.width;
        const canvasHeight = currentCtx.canvas.height;
        const imgWidth = img.naturalWidth;
        const imgHeight = img.naturalHeight;

        const canvasAspect = canvasWidth / canvasHeight;
        const imgAspect = imgWidth / imgHeight;

        let sx, sy, sWidth, sHeight;

        if (imgAspect > canvasAspect) { // Image is wider than canvas, crop sides
            sHeight = imgHeight;
            sWidth = imgHeight * canvasAspect;
            sx = (imgWidth - sWidth) / 2;
            sy = 0;
        } else { // Image is taller than canvas (or same aspect), crop top/bottom
            sWidth = imgWidth;
            sHeight = imgWidth / canvasAspect;
            sx = 0;
            sy = (imgHeight - sHeight) / 2;
        }
        currentCtx.clearRect(0, 0, canvasWidth, canvasHeight); // Clear previous frame
        currentCtx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, canvasWidth, canvasHeight);
    }

    const scrollTriggerSections = document.querySelectorAll('.scroll-trigger-section');
    let sectionData = [];

    function calculateSectionData() {
        sectionData = []; // Recalculate on resize
        let accumulatedOffset = 0;
        // Hero section offset (relative to its own height for transitions)
        const heroHeight = heroSection.offsetHeight;

        scrollTriggerSections.forEach((section, index) => {
            const videoKey = section.dataset.videoFrames;
            const frames = frameData[videoKey] || [];
            // The "start" of a section's animation effect could be when the top of the *previous* element has passed,
            // or when the hero section is scrolled out of view.
            // Let's consider the top of the trigger section itself as its scroll start pint.
            let sectionScrollStart = section.offsetTop;
            let sectionScrollEnd = section.offsetTop + section.offsetHeight - window.innerHeight;


            // For the first section, the frame animation starts after the hero section
            // (or effectively when hero starts to scroll away and reveal canvas)
            if (index === 0) {
                sectionScrollStart = heroHeight / 2; // Start animating frames when hero is halfway scrolled
                sectionScrollEnd = section.offsetTop + section.offsetHeight - window.innerHeight;
            } else {
                 // Subsequent sections calculations
                const prevSection = scrollTriggerSections[index-1];
                sectionScrollStart = prevSection.offsetTop + prevSection.offsetHeight - window.innerHeight;
                sectionScrollEnd = section.offsetTop + section.offsetHeight - window.innerHeight;
            }
            

            sectionData.push({
                element: section,
                frames: frames.map(url => loadedImages[url]).filter(img => img), // Use preloaded Image objects
                frameCount: frames.length,
                // The scroll range over which this section's video frames should play
                scrollStart: section.offsetTop, // When this section's top hits viewport top
                scrollEnd: section.offsetTop + section.offsetHeight // When this section's bottom hits viewport top
            });
        });
    }
    
    // Initial calculation
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(calculateSectionData, 0); // Ensure layout is calculated
    } else {
        document.addEventListener("DOMContentLoaded", calculateSectionData);
    }


    function handleScroll() {
        const scrollY = window.scrollY;

        // Navbar style change
        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Determine active section for frame animation
        let activeSectionData = null;
        let overallProgressInSection = 0;

        for (const data of sectionData) {
            // Check if current scroll is within this section's "active" scroll range for its video
            // A section is "active" for video playback from when its top enters the viewport
            // until its bottom leaves the viewport.
            // The "animation scroll range" is the height of the section itself.
            const sectionTop = data.scrollStart;
            const sectionBottom = data.scrollEnd; // End of effective scroll for this section's animation
            const animationScrollLength = data.element.offsetHeight; // Total scroll distance for this section's frames

            if (scrollY + window.innerHeight >= sectionTop && scrollY <= sectionBottom) {
                activeSectionData = data;
                // Calculate progress within this section's animation length
                // Progress: 0 when section top is at viewport bottom, 1 when section bottom is at viewport top
                let relativeScroll = scrollY - sectionTop;
                overallProgressInSection = Math.max(0, Math.min(1, relativeScroll / (animationScrollLength - window.innerHeight) ));
                break; 
            }
        }
        
        // Clear canvas if no section is active (e.g., if past all sections, or in a gap)
        // Or, keep last frame of last active section. For now, let's try to draw.
        if (activeSectionData && activeSectionData.frames.length > 0) {
            const frameIndex = Math.max(0, Math.min(
                activeSectionData.frames.length - 1,
                Math.floor(overallProgressInSection * activeSectionData.frames.length)
            ));
            const currentImage = activeSectionData.frames[frameIndex];
             if (currentImage) {
                requestAnimationFrame(() => drawImageCover(ctx, currentImage));
            }
        } else if (scrollY < (sectionData.length > 0 ? sectionData[0].scrollStart : heroSection.offsetHeight)) {
            // Before the first video section, you might want to show the first frame of the first video
            // or a generic background. Let's use the first frame of video1 if available.
             if (frameData.video1Frames.length > 0 && loadedImages[frameData.video1Frames[0]]) {
                requestAnimationFrame(() => drawImageCover(ctx, loadedImages[frameData.video1Frames[0]]));
            }
        }
        // After the last video section, the canvas can remain on the last frame, or clear.
        // This is handled by the final-content-area having a higher z-index and solid background.


        // Update active nav link
        let currentActiveSectionId = 'hero'; // Default to hero
        if (scrollY >= heroSection.offsetHeight) { // Only check sections after hero
            for (const data of sectionData) {
                const sectionTop = data.element.offsetTop - window.innerHeight / 2; // Consider active when halfway in view
                const sectionBottom = data.element.offsetTop + data.element.offsetHeight - window.innerHeight / 2;
                if (scrollY >= sectionTop && scrollY < sectionBottom) {
                    currentActiveSectionId = data.element.id;
                    break;
                }
            }
             // If scrolled past all step sections, mark nothing or a "contact/footer" if you add that to nav
            if (scrollY + window.innerHeight >= document.body.scrollHeight - 50) { // Near bottom
                 // Potentially highlight a "Contact" or "Footer" link if you had one
            }
        }


        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentActiveSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    function handleResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        calculateSectionData(); // Recalculate section boundaries
        handleScroll(); // Redraw and update based on new dimensions
    }

    // Initial setup after preloading is complete (already called within preload callback)
    // initializeApp(); 
});
