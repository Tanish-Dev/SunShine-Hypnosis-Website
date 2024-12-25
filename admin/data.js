// Simple data store using localStorage
const DataStore = {
    init() {
        // Initialize with default data if empty
        if (!localStorage.getItem('courses')) {
            localStorage.setItem('courses', JSON.stringify([
                {
                    id: '1',
                    title: 'Basic Hypnotism',
                    duration: '8 weeks',
                    description: 'Master the fundamental principles and techniques of hypnosis.',
                    image: '../assets/11098.jpg'
                }
            ]));
        }
        if (!localStorage.getItem('activities')) {
            localStorage.setItem('activities', JSON.stringify([
                {
                    id: '1',
                    message: 'System initialized',
                    timestamp: new Date().toISOString(),
                    icon: 'fas fa-info-circle'
                }
            ]));
        }
    },
    courses: {
        get: () => JSON.parse(localStorage.getItem('courses')) || [],
        set: (courses) => localStorage.setItem('courses', JSON.stringify(courses)),
        add: (course) => {
            const courses = DataStore.courses.get();
            course.id = Date.now().toString();
            courses.push(course);
            DataStore.courses.set(courses);
            return course;
        },
        update: (id, updatedCourse) => {
            let courses = DataStore.courses.get();
            courses = courses.map(c => c.id === id ? {...c, ...updatedCourse} : c);
            DataStore.courses.set(courses);
        },
        delete: (id) => {
            let courses = DataStore.courses.get();
            courses = courses.filter(c => c.id !== id);
            DataStore.courses.set(courses);
        }
    },
    activities: {
        get: () => JSON.parse(localStorage.getItem('activities')) || [],
        add: (activity) => {
            const activities = DataStore.activities.get();
            activities.unshift({
                id: Date.now().toString(),
                timestamp: new Date().toISOString(),
                ...activity
            });
            if (activities.length > 10) activities.pop();
            localStorage.setItem('activities', JSON.stringify(activities));
        }
    }
};

// Initialize data store
DataStore.init();
