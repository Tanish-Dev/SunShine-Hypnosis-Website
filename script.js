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
});