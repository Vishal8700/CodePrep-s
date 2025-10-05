import { API_CONFIG } from '../config/environment';

// API configuration options
const REQUEST_CONFIG = {
    headers: {
        'Content-Type': 'application/json',
    },
    // Add timeout for better UX
    timeout: API_CONFIG.TIMEOUT,
};

/**
 * Fetch a single course by ID
 * @param {string|number} courseId - The course ID
 * @returns {Promise<Object>} Course data
 */
export const fetchCourseById = async (courseId) => {
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/${courseId}`, {
            method: 'GET',
            ...REQUEST_CONFIG,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching course by ID:', error);
        throw error;
    }
};

/**
 * Fetch all courses from the API
 * @returns {Promise<Array>} Array of courses
 */
export const fetchAllCourses = async () => {
    try {
        // Add cache busting parameter if enabled
        const cacheBuster = API_CONFIG.ENABLE_CACHE_BUSTING ? `?_t=${Date.now()}` : '';
        const url = `${API_CONFIG.BASE_URL}${cacheBuster}`;
        
        console.log('🔄 Fetching courses from:', url);
        console.log('📋 Request config:', REQUEST_CONFIG);
        
        const response = await fetch(url, {
            method: 'GET',
            headers: REQUEST_CONFIG.headers,
            cache: 'no-cache', // Disable browser caching
        });

        console.log('📡 Response status:', response.status, response.statusText);
        console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ API Error Response:', errorText);
            throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log('✅ Fresh API data fetched:', data?.length || Object.keys(data || {}).length, 'courses');
        console.log('📊 Sample data:', data?.[0] || 'No data');
        return data;
    } catch (error) {
        console.error('❌ Error fetching all courses:', {
            message: error.message,
            name: error.name,
            stack: error.stack,
            url: API_CONFIG.BASE_URL
        });
        throw error;
    }
};

/**
 * Add a new course to the sheet
 * @param {Object} courseData - Course data to add
 * @returns {Promise<Object>} Response data
 */
export const addCourse = async (courseData) => {
    try {
        const response = await fetch(API_CONFIG.BASE_URL, {
            method: 'POST',
            ...REQUEST_CONFIG,
            body: JSON.stringify(courseData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding course:', error);
        throw error;
    }
};

/**
 * Update a course by ID
 * @param {string|number} courseId - The course ID
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object>} Response data
 */
export const updateCourse = async (courseId, updateData) => {
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/${courseId}`, {
            method: 'PATCH',
            ...REQUEST_CONFIG,
            body: JSON.stringify(updateData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating course:', error);
        throw error;
    }
};

/**
 * Delete a course by ID
 * @param {string|number} courseId - The course ID
 * @returns {Promise<Object>} Response data
 */
export const deleteCourse = async (courseId) => {
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/${courseId}`, {
            method: 'DELETE',
            ...REQUEST_CONFIG,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting course:', error);
        throw error;
    }
};

// Fallback data in case API is unavailable
export const fallbackCourses = {
    1: {
        id: 1,
        title: 'DSA Complete Series 🚀 : Data Structures & Algorithms | by Shradha Khapra Mam',
        description: 'Learn, Analyse and Implement Data Structures using C and C++',
        rating: 4.2,
        students: '237,918 students',
        duration: '1 hour Total',
        lastUpdated: 'Last updated September 2013',
        videoId: '1yrh60og6qc',
        notes: 'This course provides a fundamental understanding of HTML and CSS. Ideal for beginners who want to create their own websites.',
        driveLink: 'https://drive.google.com/drive/folders/1vxOeaIsAE-ltxHa-0fRAq1n3l2pnrz6Q?usp=sharing',
        tags: ['Algorithms', 'Data Structures']
    },
    2: {
        id: 2,
        title: 'Master the Coding Interview: Data Structures + Algorithms',
        description: 'Learn, Analyse and Implement Data Structures using C and C++.',
        rating: 4.6,
        students: '49,980 students',
        duration: '58.5 hours Total',
        lastUpdated: 'Last updated January 2023',
        videoId: 's2mYsPWzLjg',
        notes: 'Deep dive into data structures and algorithms with C and C++. Perfect for improving problem-solving skills and coding interviews.',
        driveLink: 'https://drive.google.com/drive/folders/1vxOeaIsAE-ltxHa-0fRAq1n3l2pnrz6Q?usp=sharing',
        tags: ['Advanced', 'Coding']
    },
    3: {
        id: 3,
        title: 'A beginners guide to essential data structures.',
        description: 'In this video, I share How I mastered Data Structures and Algorithms which helped me clear coding interviews at multiple big tech companies. I also share a strategy to revise LeetCode problems effectively',
        rating: 4.7,
        students: '36,422 students',
        duration: '20 hours Total',
        lastUpdated: 'Last updated March 2022',
        videoId: 'F-ao3Q6I2Fc',
        notes: 'Prepare for coding interviews with comprehensive material on data structures and algorithms. Enhance your job prospects.',
        driveLink: 'https://drive.google.com/drive/folders/1vxOeaIsAE-ltxHa-0fRAq1n3l2pnrz6Q?usp=sharing',
        tags: ['Beginner', 'Data Structures']
    },
    4: {
        id: 4,
        title: 'Data Structures and Algorithms using Python DSA in Python Master the Coding Interview: Data Structures + Algorithms',
        description: 'Mastering data structures and algorithms is the key to writing efficient, scalable, and optimized code – a must for any aspiring programmer or software engineer.',
        rating: 4.7,
        students: '136,422 students',
        duration: '11 hours Total',
        lastUpdated: 'Last updated March 2024',
        videoId: 'f9Aje_cN_CY',
        notes: 'Prepare for coding interviews with comprehensive material on data structures and algorithms. Enhance your job prospects.',
        driveLink: 'https://drive.google.com/drive/folders/1vxOeaIsAE-ltxHa-0fRAq1n3l2pnrz6Q?usp=sharing',
        tags: ['Python', 'Data Structures']
    },
    5: {
        id: 5,
        title: 'Data Structures and Algorithms in C | C Programming Full course | Great Learning',
        description: 'Great Learning brings you this tutorial on Data Structures & Algorithms in C to help you understand everything you need to know about Data Structures & Algorithms in C.',
        rating: 4.7,
        students: '76,422 students',
        duration: '10 hours Total',
        lastUpdated: 'Last updated March 2024',
        videoId: 'MtVZAXepMPM',
        notes: 'Prepare for coding interviews with comprehensive material on data structures and algorithms. Enhance your job prospects.',
        driveLink: 'https://drive.google.com/drive/folders/1vxOeaIsAE-ltxHa-0fRAq1n3l2pnrz6Q?usp=sharing',
        tags: ['C++', 'Data Structures']
    },
    6: {
        id: 6,
        title: 'Data Structures and Algorithms with Visualizations – Full Course (Java)',
        description: 'Data Structures and Algorithms is an important aspect of every coding interview. This course will help you prepare for placements, coding interviews, and logic building.',
        rating: 4.7,
        students: '146,422 students',
        duration: '48 hours Total',
        lastUpdated: 'Last updated March 2024',
        videoId: '2ZLl8GAk1X4',
        notes: 'Prepare for coding interviews with comprehensive material on data structures and algorithms. Enhance your job prospects.',
        driveLink: 'https://drive.google.com/drive/folders/1vxOeaIsAE-ltxHa-0fRAq1n3l2pnrz6Q?usp=sharing',
        tags: ['Java', 'Data Structures']
    },
    7: {
        id: 7,
        title: "Complete Git and GitHub Tutorial",
        description: "Learn Git and GitHub in this comprehensive tutorial by Kunal Kushwaha. This course is designed to help developers understand version control systems, collaboration workflows, and mastering GitHub for real-world projects.",
        rating: 4.7,
        students: "2,280,450 views",
        duration: "Available since August 2021",
        lastUpdated: "Last updated March 2024",
        videoId: "apGV9Kg7ics",
        notes: "Master Git and GitHub with a practical approach, covering everything from basics to advanced topics.",
        driveLink: "https://drive.google.com/drive/folders/1o_05KBkvqxq-wEzY71kfeRcHUYkSFzWd?usp=sharing",
        tags: ["Git", "GitHub", "Version Control"]
    },
    8: {
        id: 8,
        title: "Learn HTML & CSS – Full Course for Beginners",
        description: "A comprehensive beginner's guide to HTML and CSS by freeCodeCamp.org. This course covers the fundamentals of web development, teaching you how to build and style web pages effectively.",
        rating: 4.8,
        students: "705,000 views",
        duration: "Available for 2 years",
        lastUpdated: "Last updated March 2024",
        videoId: "a_iQb1lnAEQ",
        notes: "Start your web development journey with this beginner-friendly course. Learn to create stunning web pages with HTML and CSS.",
        driveLink: "https://drive.google.com/drive/folders/1a0I7EVA35pI9krwOb_AcrF7oOJK2TTv0?usp=drive_link",
        tags: ["HTML", "CSS", "Web Development"]
    },
    9: {
        id: 9,
        title: "JavaScript Tutorial (2024) for Beginners to Pro (with Notes, Projects & Practice Questions)",
        description: "Master JavaScript from basics to advanced concepts in this comprehensive tutorial by Apna College. This course includes notes, real-world projects, and practice questions to solidify your understanding and skills.",
        rating: 4.9,
        students: "3,700,000 views",
        duration: "Available for 1 year",
        lastUpdated: "Last updated March 2024",
        videoId: "VlPiVmYuoqw",
        notes: "Build a solid foundation in JavaScript with detailed explanations, hands-on projects, and curated practice questions.",
        driveLink: "https://drive.google.com/drive/folders/1a0I7EVA35pI9krwOb_AcrF7oOJK2TTv0?usp=drive_link",
        tags: ["JavaScript", "Programming", "Web Development"]
    }
};