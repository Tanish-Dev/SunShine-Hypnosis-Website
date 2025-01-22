// Add these functions at the beginning of your file
function openIntroModal() {
    const introModal = document.getElementById('introModal');
    if (introModal) {
        introModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeIntroModal() {
    const introModal = document.getElementById('introModal');
    if (introModal) {
        introModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Prevent automatic scrolling on page load
    if (window.location.hash) {
        setTimeout(function() {
            window.scrollTo(0, 0);
        }, 1);
    }

    // Handle smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    const hamburger = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeButton = document.querySelector('.close-button');

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close mobile menu
    closeButton.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });

    // Handle mobile menu link clicks
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);
            
            // Close mobile menu
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
            
            if (targetSection) {
                const headerHeight = document.querySelector('.container1').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = targetPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target) && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });

    // Close menu with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });

    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slider img');
    const navDots = document.querySelectorAll('.slidernav a');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    let currentSlide = 0;

    // Update navigation dots
    function updateNav() {
        navDots.forEach(dot => dot.classList.remove('active'));
        navDots[currentSlide].classList.add('active');
    }

    // Go to specific slide
    function goToSlide(index) {
        currentSlide = index;
        const offset = -100 * currentSlide;
        slider.style.transform = `translateX(${offset}%)`;
        updateNav();
    }

    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }

    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(currentSlide);
    }

    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    navDots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            goToSlide(index);
        });
    });

    // Handle touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX) nextSlide();
        if (touchEndX > touchStartX) prevSlide();
    });

    // Initialize slider
    updateNav();

    const button = document.querySelector('.nav-button');
    const heroSection = document.getElementById('hero-section');
    
    function toggleButtonVisibility() {
        const heroRect = heroSection.getBoundingClientRect();
        if (heroRect.top < 0) {
            button.classList.add('show');
        } else {
            button.classList.remove('show');
        }
    }
    
    window.addEventListener('scroll', toggleButtonVisibility);
    toggleButtonVisibility();

    // Updated smooth scrolling for all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.container1').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = targetPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Add active state to clicked link
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Image Modal functionality
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.getElementsByClassName('modal-close')[0];
    const sliderImages = document.querySelectorAll('.slider img');

    // Open modal when clicking slider images
    sliderImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = "block";
            modalImg.src = this.src;
        });
    });

    // Close modal when clicking X button
    closeBtn.addEventListener('click', function() {
        modal.style.display = "none";
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === "block") {
            modal.style.display = "none";
        }
    });

    // Introduction Modal Functionality
    const introModal = document.getElementById('introModal');
    const introClose = document.querySelector('.intro-close');
    const learnMoreBtn = document.querySelector('.button2');

    // Updated event listener for Learn More button
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            openIntroModal();
        });
    }

    if (introClose) {
        introClose.addEventListener('click', () => {
            closeIntroModal();
        });
    }

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === introModal) {
            closeIntroModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && introModal.style.display === 'block') {
            closeIntroModal();
        }
    });

    // Get all nav links, including both desktop and mobile
    const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Calculate header height for offset
                const headerHeight = document.querySelector('.container1').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = targetPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if it's open
                const mobileMenu = document.querySelector('.mobile-menu');
                const hamburger = document.querySelector('.hamburger-menu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.style.overflow = '';
                }

                // Handle active states for nav links
                if (this.classList.contains('nav-link')) {
                    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });

    // Add scroll event listener to highlight active section
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section, [id$="-section"]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - document.querySelector('.container1').offsetHeight - 10;
            const sectionHeight = section.offsetHeight;
            
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-target') === currentSection) {
                link.classList.add('active');
            }
        });
    });

    // Navigation functionality
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const headerHeight = document.querySelector('.container1').offsetHeight;
            const sectionTop = section.offsetTop;
            // Add scroll duration using scrollIntoView with options
            section.scrollIntoView({
                behavior: {
                    block: 'start',
                    inline: 'nearest',
                    duration: 1500 // Increase duration to slow down scroll (in milliseconds)
                }
            });
            // Adjust for header height
            setTimeout(() => {
                window.scrollBy(0, -headerHeight - 200);
            }, 0);
        }
    }

    // Handle all navigation clicks (desktop and mobile)
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            
            // Close mobile menu if open
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }

            scrollToSection(sectionId);
        });
    });

    // Scroll spy functionality
    let sections = {};
    document.querySelectorAll('section, [id$="-section"]').forEach(section => {
        sections[section.id] = section.offsetTop;
    });

    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + document.querySelector('.container1').offsetHeight + 10;
        const navLinks = document.querySelectorAll('.nav-link');

        for (let id in sections) {
            if (sections[id] <= scrollPosition) {
                navLinks.forEach(link => link.classList.remove('active'));
                document.querySelector(`.nav-link[data-section="${id}"]`)?.classList.add('active');
            }
        }
    });

    // Update the scroll spy calculations
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section, [id$="-section"]');
        const navLinks = document.querySelectorAll('.nav-link');
        const headerHeight = document.querySelector('.container1').offsetHeight;
        
        let currentSection = '';

        sections.forEach(section => {
            // Add 100px offset to the section top calculation
            const sectionTop = section.offsetTop - headerHeight - 100; // Changed from 20 to 100
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === currentSection) {
                link.classList.add('active');
            }
        });
    });

    // Book Now button functionality
    document.querySelector('.nav-button').addEventListener('click', function() {
        scrollToSection('courses-section');
    });
});

