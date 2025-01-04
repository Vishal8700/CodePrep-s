import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Ensure this path matches your folder structure
import './DSACourse.css';
import image1 from '../assets/maxresdefault.jpg';
import image2 from '../assets/maxresdefault (1).jpg';
import image3 from '../assets/maxresdefault (7).jpg';
import image4 from '../assets/maxresdefault (4).jpg';
import image9 from '../assets/maxresdefault (5).jpg';
import image10 from '../assets/maxresdefault (6).jpg';
import image5 from '../assets/bn1 (1).webp';
import image6 from '../assets/cover.jpg';
import image7 from '../assets/bn1 (1).png';
import image8 from '../assets/bn1 (2).webp';
import Header from '../Header/Header'; // Import Header component
import Footer from '../Footer/Footer'; // Import Footer component
import image12 from '../assets/img7.jpeg';
import image11 from '../assets/img6.jpeg';
import image13 from '../assets/img8.jpeg';


const DSACourse = () => {
  const courses = [
    { id: 1, title: 'DSA Complete Series 🚀 : Data Structures & Algorithms', description: 'Learn, Analyse and Implement Data Structures using C and C++. Learn Recursion and Sorting.', tags: ['Algorithms', 'Data Structures'], image: image1 },
    { id: 2, title: 'Master the Coding Interview: Data Structures + Algorithms', description: 'Ultimate coding interview bootcamp. Get more job offers, negotiate a raise: Everything you need to get the job you want!', tags: ['Advanced', 'Coding'], image: image2 },
    { id: 3, title: 'A beginner’s guide to essential data structures.', description: 'Essential guide to mastering data structures from scratch.', tags: ['Beginner', 'Data Structures'], image: image3 },
    { id: 4, title: 'Data Structures and Algorithms using Python DSA', description: 'Essential guide to mastering data structures from scratch.', tags: ['Beginner', 'Data Structures'], image: image4 },
    { id: 5, title: 'Data Structures and Algorithms in C ', description: 'Essential guide to mastering data structures from scratch.', tags: ['Beginner', 'Data Structures'], image: image9 },
    { id: 6, title: 'Data Structures and Algorithms  in (Java)', description: 'Essential guide to mastering data structures from scratch.', tags: ['Beginner', 'Data Structures'], image: image10 },
    {
      "id": 7,
      "title": "Complete Git and GitHub Tutorial",
      "description": "Master Git and GitHub with a practical approach, covering everything from basics to advanced topics.",
      "tags": ["Git", "GitHub", "Version Control"],
      "image": image12
    },
    {
      "id": 8,
      "title": "Learn HTML & CSS – Full Course for Beginners",
      "description": "Start your web development journey with this beginner-friendly course. Learn to create stunning web pages with HTML and CSS.",
      "tags": ["HTML", "CSS", "Web Development"],
      "image": image11
    },
    {
      "id": 9,
      "title": "JavaScript Tutorial (2024) for Beginners to Pro",
      "description": "Build a solid foundation in JavaScript with detailed explanations, hands-on projects, and curated practice questions.",
      "tags": ["JavaScript", "Programming", "Web Development"],
      "image": image13
    }


    // Add more courses as needed
  ];

  const bannerImages = [
    image5,
    image6,
    image7,
    image8
  ];

  return (
    <div className="dsa-course-page">
      <Header /> {/* Add Header */}

      <div className="dsa-course-container">
        {/* Full-width banner with carousel */}
        <Carousel
          showThumbs={false}
          infiniteLoop
          autoPlay
          interval={5000}
          className="carousel-container"
        >
          {bannerImages.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Banner ${index + 1}`} className="carousel-image" />
            </div>
          ))}
        </Carousel>

        {/* Text below the carousel */}
        <div className="banner-text">
          <h1>Best DSA Courses</h1>
        </div>

        {/* Course list */}
        <div className="course-list">
          {courses.map(course => (
            <Link key={course.id} to={`/course/${course.id}`} className="course-card">
              <img src={course.image} alt={course.title} className="course-image" />
              <div className="course-details">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.description}</p>
                <div className="course-tags">
                  {course.tags.map((tag, index) => (
                    <span key={index} className="course-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Coming soon button */}
        <div className="add-soon-button">
          <button onClick={() => alert("Stay tuned for more courses!")}>Coming Soon</button>
        </div>
      </div>

      <Footer /> {/* Add Footer */}
    </div>
  );
};

export default DSACourse;
