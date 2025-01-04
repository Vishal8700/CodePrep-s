import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Course.css';
import Header from '../Header/Header'; // Import Header component
import Footer from '../Footer/Footer'; // Import Footer component

const courses = {
  1: {
    title: 'DSA Complete Series 🚀 : Data Structures & Algorithms | by Shradha Khapra Mam',
    description: 'Learn, Analyse and Implement Data Structures using C and C++',
    rating: 4.2,
    students: '237,918 students',
    duration: '1 hour Total',
    lastUpdated: 'Last updated September 2013',
    videoId: '1yrh60og6qc',
    notes: 'This course provides a fundamental understanding of HTML and CSS. Ideal for beginners who want to create their own websites.',
    driveLink: 'https://drive.google.com/drive/folders/1vxOeaIsAE-ltxHa-0fRAq1n3l2pnrz6Q?usp=sharing',
  },
  2: {
    title: 'Master the Coding Interview: Data Structures + Algorithms',
    description: 'Learn, Analyse and Implement Data Structures using C and C++.',
    rating: 4.6,
    students: '49,980 students',
    duration: '58.5 hours Total',
    lastUpdated: 'Last updated January 2023',
    videoId: 's2mYsPWzLjg',
    notes: 'Deep dive into data structures and algorithms with C and C++. Perfect for improving problem-solving skills and coding interviews.',
    driveLink: 'https://drive.google.com/drive/folders/1vxOeaIsAE-ltxHa-0fRAq1n3l2pnrz6Q?usp=sharing',
  },
  3: {
    title: 'A beginner’s guide to essential data structures.',
    description: 'In this video, I share How I mastered Data Structures and Algorithms which helped me clear coding interviews at multiple big tech companies. I also share a strategy to revise LeetCode problems effectively',
    rating: 4.7,
    students: '36,422 students',
    duration: '20 hours Total',
    lastUpdated: 'Last updated March 2022',
    videoId: 'F-ao3Q6I2Fc',
    notes: 'Prepare for coding interviews with comprehensive material on data structures and algorithms. Enhance your job prospects.',
    driveLink: 'https://drive.google.com/drive/folders/1vxOeaIsAE-ltxHa-0fRAq1n3l2pnrz6Q?usp=sharing',
  },
  4: {
    title: 'Data Structures and Algorithms using Python DSA in Python Master the Coding Interview: Data Structures + Algorithms',
    description: 'Mastering data structures and algorithms is the key to writing efficient, scalable, and optimized code – a must for any aspiring programmer or software engineer. This video is your go-to resource for understanding the fundamentals, solving problems, and building a solid foundation in this crucial domain.!',
    rating: 4.7,
    students: '136,422 students',
    duration: '11 hours Total',
    lastUpdated: 'Last updated March 2024',
    videoId: 'f9Aje_cN_CY',
    notes: 'Prepare for coding interviews with comprehensive material on data structures and algorithms. Enhance your job prospects.',
    driveLink: 'https://drive.google.com/drive/folders/1vxOeaIsAE-ltxHa-0fRAq1n3l2pnrz6Q?usp=sharing',
  },
  5: {
    title: 'Data Structures and Algorithms in C | C Programming Full course | Great Learning',
    description: 'Great Learning brings you this tutorial on Data Structures & Algorithms in C to help you understand everything you need to know about Data Structures & Algorithms in C and getting started on the journey to learn about it well.',
    rating: 4.7,
    students: '76,422 students',
    duration: '10 hours Total',
    lastUpdated: 'Last updated March 2024',
    videoId: 'MtVZAXepMPM',
    notes: 'Prepare for coding interviews with comprehensive material on data structures and algorithms. Enhance your job prospects.',
    driveLink: 'https://drive.google.com/drive/folders/1vxOeaIsAE-ltxHa-0fRAq1n3l2pnrz6Q?usp=sharing',
  },
  6: {
    title: 'Data Structures and Algorithms with Visualizations – Full Course (Java)',
    description: 'Data Structures and Algorithms is an important aspect of every coding interview. This course will help you prepare for placements, coding interviews, and logic building.',
    rating: 4.7,
    students: '146,422 students',
    duration: '48 hours Total',
    lastUpdated: 'Last updated March 2024',
    videoId: '2ZLl8GAk1X4',
    notes: 'Prepare for coding interviews with comprehensive material on data structures and algorithms. Enhance your job prospects.',
    driveLink: 'https://drive.google.com/drive/folders/1vxOeaIsAE-ltxHa-0fRAq1n3l2pnrz6Q?usp=sharing',
  },
  7:{
    "title": "Complete Git and GitHub Tutorial",
    "description": "Learn Git and GitHub in this comprehensive tutorial by Kunal Kushwaha. This course is designed to help developers understand version control systems, collaboration workflows, and mastering GitHub for real-world projects.",
    "rating": 4.7,
    "students": "2,280,450 views",
    "duration": "Available since August 2021",
    "lastUpdated": "Last updated March 2024",
    "videoId": "apGV9Kg7ics",
    "notes": "Master Git and GitHub with a practical approach, covering everything from basics to advanced topics.",
    "driveLink": "https://drive.google.com/drive/folders/1o_05KBkvqxq-wEzY71kfeRcHUYkSFzWd?usp=sharing"
  },
  8:{
    "title": "Learn HTML & CSS – Full Course for Beginners",
    "description": "A comprehensive beginner's guide to HTML and CSS by freeCodeCamp.org. This course covers the fundamentals of web development, teaching you how to build and style web pages effectively.",
    "rating": 4.8,
    "students": "705,000 views",
    "duration": "Available for 2 years",
    "lastUpdated": "Last updated March 2024",
    "videoId": "a_iQb1lnAEQ",
    "notes": "Start your web development journey with this beginner-friendly course. Learn to create stunning web pages with HTML and CSS.",
    "driveLink": "https://drive.google.com/drive/folders/1a0I7EVA35pI9krwOb_AcrF7oOJK2TTv0?usp=drive_link"
  },
  9:{
    "title": "JavaScript Tutorial (2024) for Beginners to Pro (with Notes, Projects & Practice Questions)",
    "description": "Master JavaScript from basics to advanced concepts in this comprehensive tutorial by Apna College. This course includes notes, real-world projects, and practice questions to solidify your understanding and skills.",
    "rating": 4.9,
    "students": "3,700,000 views",
    "duration": "Available for 1 year",
    "lastUpdated": "Last updated March 2024",
    "videoId": "VlPiVmYuoqw",
    "notes": "Build a solid foundation in JavaScript with detailed explanations, hands-on projects, and curated practice questions.",
    "driveLink": "https://drive.google.com/drive/folders/1a0I7EVA35pI9krwOb_AcrF7oOJK2TTv0?usp=drive_link"
  }
  
  
  // Add more courses as needed
};

const Course = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoContainerRef = useRef(null);

  const course = courses[id];

  useEffect(() => {
    if (window.YT) {
      const newPlayer = new window.YT.Player(videoContainerRef.current, {
        height: '450',
        width: '100%',
        videoId: course.videoId,
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange,
        },
      });
      setPlayer(newPlayer);
    } else {
      window.onYouTubeIframeAPIReady = () => {
        const newPlayer = new window.YT.Player(videoContainerRef.current, {
          height: '450',
          width: '100%',
          videoId: course.videoId,
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
          },
        });
        setPlayer(newPlayer);
      };
    }
  }, [id]);

  const onPlayerReady = (event) => {
    if (isPlaying) {
      event.target.playVideo();
    } else {
      event.target.pauseVideo();
    }
  };

  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <div className="course-page">
      <Header /> {/* Add Header */}

      <div className="course-container">
        <div className="video-and-info">
          <div className="video-section">
            <div ref={videoContainerRef} className="video-frame"></div>
          </div>
          
          <div className="video-info">
            <h1>{course.title}</h1>
            <h2>{course.description}</h2>
            <div className="course-stats">
              <span className="rating">{course.rating} ★</span>
              <span className="students">{course.students}</span>
              <span className="duration">{course.duration}</span>
            </div>
            <p className="last-updated">{course.lastUpdated}</p>
          </div>
        </div>
        
        <div className="notes-and-drive">
          <div className="notes-section">
            <h3>Course Notes</h3>
            <p>{course.notes}</p>
          </div>

          <div className="drive-link">
            <a href={course.driveLink} target="_blank" rel="noopener noreferrer">
              <img src='https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg' alt="Google Drive" />
              <span>Google Drive</span>
            </a>
          </div>
        </div>
      </div>

      <Footer /> {/* Add Footer */}
    </div>
  );
};

export default Course;
