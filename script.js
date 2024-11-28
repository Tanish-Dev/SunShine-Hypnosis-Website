document.addEventListener('DOMContentLoaded', function() {
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
});