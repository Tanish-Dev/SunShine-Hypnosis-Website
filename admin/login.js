document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Replace with your actual authentication logic
    if (username === 'admin' && password === 'admin123') {
        // Store authentication state
        sessionStorage.setItem('adminAuthenticated', 'true');
        
        // Redirect to admin dashboard
        window.location.href = 'admin.html';
    } else {
        alert('Invalid credentials. Please try again.');
    }
});

// Check if user is already logged in
if (sessionStorage.getItem('adminAuthenticated')) {
    window.location.href = 'admin.html';
}
