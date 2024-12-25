document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (!sessionStorage.getItem('adminAuthenticated')) {
        window.location.href = 'login.html';
        return;
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    // Toggle sidebar on menu button click
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Close sidebar when clicking outside
    mainContent.addEventListener('click', () => {
        if(sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if(window.innerWidth > 768) {
            sidebar.classList.remove('active');
        }
    });

    // Enhanced logout functionality
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            const confirmLogout = confirm('Are you sure you want to log out?');
            if (confirmLogout) {
                sessionStorage.removeItem('adminAuthenticated');
                window.location.href = 'login.html';
            }
        });
    }

    // Additional security - check authentication periodically
    setInterval(() => {
        if (!sessionStorage.getItem('adminAuthenticated')) {
            window.location.href = 'login.html';
        }
    }, 5000); // Check every 5 seconds

    // DOM Elements
    const courseList = document.querySelector('.course-list');
    const activityList = document.querySelector('.activity-list');
    const addCourseBtn = document.querySelector('.add-btn');
    
    // Initialize dashboard
    try {
        loadCourses();
        loadActivities();
        updateStats();
    } catch (error) {
        console.error('Error initializing dashboard:', error);
    }
});

// Move these functions to the global scope
function loadCourses() {
    const courseList = document.querySelector('.course-list');
    const courses = DataStore.courses.get();
    courseList.innerHTML = courses.map(course => `
        <div class="course-item" data-id="${course.id}">
            <img src="${course.image}" alt="${course.title}">
            <div class="course-info">
                <h3>${course.title}</h3>
                <p>${course.duration}</p>
            </div>
            <div class="course-actions">
                <button class="edit-btn" onclick="editCourse('${course.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn" onclick="deleteCourse('${course.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Load and display activities
function loadActivities() {
    const activities = DataStore.activities.get();
    activityList.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <i class="${activity.icon || 'fas fa-info-circle'}"></i>
            <div class="activity-info">
                <p>${activity.message}</p>
                <span>${timeAgo(new Date(activity.timestamp))}</span>
            </div>
        </div>
    `).join('');
}

// Add course modal
addCourseBtn.addEventListener('click', () => {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Add New Course</h2>
            <form id="addCourseForm">
                <input type="text" placeholder="Course Title" required>
                <input type="text" placeholder="Duration" required>
                <textarea placeholder="Description" required></textarea>
                <input type="text" placeholder="Image URL" required>
                <button type="submit">Add Course</button>
                <button type="button" onclick="this.closest('.modal').remove()">Cancel</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.target;
        const newCourse = {
            title: form[0].value,
            duration: form[1].value,
            description: form[2].value,
            image: form[3].value
        };
        DataStore.courses.add(newCourse);
        DataStore.activities.add({
            message: `New course "${newCourse.title}" added`,
            icon: 'fas fa-plus-circle'
        });
        loadCourses();
        loadActivities();
        modal.remove();
    });
});

// Helper functions
function timeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
    };
    
    for (let [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval > 1) {
            return `${interval} ${unit}s ago`;
        } else if (interval === 1) {
            return `1 ${unit} ago`;
        }
    }
    return 'just now';
}

function updateStats() {
    const courses = DataStore.courses.get();
    document.querySelector('.stat-details p').textContent = courses.length;
}

// Make these functions global for onclick handlers
window.editCourse = function(id) {
    const course = DataStore.courses.get().find(c => c.id === id);
    if (!course) return;

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Edit Course</h2>
            <form id="editCourseForm">
                <input type="text" value="${course.title}" required>
                <input type="text" value="${course.duration}" required>
                <textarea required>${course.description}</textarea>
                <input type="text" value="${course.image}" required>
                <button type="submit">Save Changes</button>
                <button type="button" onclick="this.closest('.modal').remove()">Cancel</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedCourse = {
            id,
            title: form[0].value,
            duration: form[1].value,
            description: form[2].value,
            image: form[3].value
        };
        DataStore.courses.update(id, updatedCourse);
        DataStore.activities.add({
            message: `Course "${updatedCourse.title}" updated`,
            icon: 'fas fa-edit'
        });
        loadCourses();
        loadActivities();
        modal.remove();
    });
};

window.deleteCourse = function(id) {
    if (confirm('Are you sure you want to delete this course?')) {
        const course = DataStore.courses.get().find(c => c.id === id);
        DataStore.courses.delete(id);
        DataStore.activities.add({
            message: `Course "${course.title}" deleted`,
            icon: 'fas fa-trash'
        });
        loadCourses();
        loadActivities();
        updateStats();
    }
};
