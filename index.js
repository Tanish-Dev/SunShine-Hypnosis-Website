
document.addEventListener('DOMContentLoaded', function() {
    // Handle hamburger menu
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            body.classList.toggle('no-scroll');
        });
    }

    // Handle nav button scroll behavior (optional)
    const navButton = document.querySelector('.nav-button');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Show/hide nav button based on scroll direction
        if (navButton) {
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                navButton.style.transform = 'translateY(-10px)';
                navButton.style.opacity = '0';
            } else {
                // Scrolling up
                navButton.style.transform = 'translateY(0)';
                navButton.style.opacity = '1';
            }
        }
        
        lastScrollTop = scrollTop;
    });
});