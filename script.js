
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
    // Initial check
    toggleButtonVisibility();
});