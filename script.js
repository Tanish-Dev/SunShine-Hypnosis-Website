document.addEventListener('DOMContentLoaded', function() {
    // Existing slider functionality
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slider img');
    const navDots = document.querySelectorAll('.slidernav a');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    let currentSlide = 0;
    let autoSlideInterval;

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

    // Start auto sliding
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    // Stop auto sliding
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    navDots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            goToSlide(index);
            stopAutoSlide();
            startAutoSlide();
        });
    });

    // Handle touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
    });

    slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX) nextSlide();
        if (touchEndX > touchStartX) prevSlide();
        startAutoSlide();
    });

    // Initialize slider
    updateNav();
    startAutoSlide();

    // Pause auto-slide when hovering over slider
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);

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

    const hamburger = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const closeButton = document.querySelector('.close-button');

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Handle mobile menu item clicks
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetId = link.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
                
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Close menu when clicking close button
    closeButton.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });

    // Close menu when clicking mobile nav links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
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
            stopAutoSlide(); // Stop auto-sliding when modal is open
        });
    });

    // Close modal when clicking X button
    closeBtn.addEventListener('click', function() {
        modal.style.display = "none";
        startAutoSlide(); // Resume auto-sliding when modal is closed
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = "none";
            startAutoSlide(); // Resume auto-sliding when modal is closed
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === "block") {
            modal.style.display = "none";
            startAutoSlide(); // Resume auto-sliding when modal is closed
        }
    });
});