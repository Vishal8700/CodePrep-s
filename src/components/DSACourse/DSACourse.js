import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './DSACourse.css';
import image5 from '../assets/bn1 (1).webp';
import image6 from '../assets/cover.jpg';
import image7 from '../assets/bn1 (1).png';
import image8 from '../assets/bn1 (2).webp';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { fetchAllCourses, fallbackCourses } from '../../services/courseService';
import { getYouTubeThumbnail } from '../../utils/youtubeUtils';

const DSACourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);
  const navigate = useNavigate();

  const bannerImages = [image5, image6, image7, image8];

  // Extract tags from course title
  const extractTagsFromTitle = (title) => {
    const defaultTags = ['Course'];
    if (!title) return defaultTags;

    const titleLower = title.toLowerCase();
    const tags = [];

    if (titleLower.includes('dsa') || titleLower.includes('data structures') || titleLower.includes('algorithms')) {
      tags.push('Data Structures', 'Algorithms');
    }
    if (titleLower.includes('python')) tags.push('Python');
    if (titleLower.includes('java')) tags.push('Java');
    if (titleLower.includes('c++') || titleLower.includes('c ')) tags.push('C++');
    if (titleLower.includes('javascript')) tags.push('JavaScript');
    if (titleLower.includes('html') || titleLower.includes('css')) tags.push('Web Development');
    if (titleLower.includes('git') || titleLower.includes('github')) tags.push('Version Control');
    if (titleLower.includes('beginner')) tags.push('Beginner');
    if (titleLower.includes('advanced') || titleLower.includes('master')) tags.push('Advanced');

    return tags.length > 0 ? tags : defaultTags;
  };

  // Format duration for YouTube-like display
  const formatDuration = (duration) => {
    if (!duration) return '10:30';

    // If it's already in MM:SS format, return as is
    if (duration.includes(':')) return duration;

    // If it contains "hour" or "hours", extract and format
    const hourMatch = duration.match(/(\d+(?:\.\d+)?)\s*hours?/i);
    const minMatch = duration.match(/(\d+)\s*minutes?/i);

    if (hourMatch) {
      const hours = parseFloat(hourMatch[1]);
      const totalMinutes = Math.round(hours * 60);
      const hrs = Math.floor(totalMinutes / 60);
      const mins = totalMinutes % 60;
      return hrs > 0 ? `${hrs}:${mins.toString().padStart(2, '0')}:00` : `${mins}:00`;
    }

    if (minMatch) {
      const minutes = parseInt(minMatch[1]);
      return `${minutes}:00`;
    }

    return '10:30'; // Default fallback
  };

  // Format view count and upload time
  const formatVideoStats = (students, lastUpdated) => {
    let views = '1.2M views';
    let timeAgo = '2 years ago';

    if (students) {
      if (students.includes('students')) {
        const num = students.replace(/[^\d,]/g, '');
        views = `${num} students`;
      } else if (students.includes('views')) {
        views = students;
      } else {
        views = `${students} views`;
      }
    }

    if (lastUpdated) {
      if (lastUpdated.includes('Last updated')) {
        timeAgo = lastUpdated.replace('Last updated ', '');
      } else {
        timeAgo = lastUpdated;
      }
    }

    return `${views} • ${timeAgo}`;
  };

  const fetchCoursesData = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('=== DSACourse: Fetching courses ===');
      const data = await fetchAllCourses();
      console.log('DSACourse: Raw API data:', data);

      if (data && (Array.isArray(data) ? data.length > 0 : Object.keys(data).length > 0)) {
        const processedCourses = Array.isArray(data)
          ? data.map(course => ({
            ...course,
            id: parseInt(course.id) || course.id,
            thumbnail: getYouTubeThumbnail(course.videoId, 'maxresdefault'),
            tags: course.tags || extractTagsFromTitle(course.title),
            formattedDuration: formatDuration(course.duration),
            formattedStats: formatVideoStats(course.students, course.lastUpdated)
          }))
          : Object.values(data).map(course => ({
            ...course,
            id: parseInt(course.id) || course.id,
            thumbnail: getYouTubeThumbnail(course.videoId, 'maxresdefault'),
            tags: course.tags || extractTagsFromTitle(course.title),
            formattedDuration: formatDuration(course.duration),
            formattedStats: formatVideoStats(course.students, course.lastUpdated)
          }));

        setCourses(processedCourses);
        setLastFetch(new Date().toLocaleTimeString());
        console.log('DSACourse: Processed courses:', processedCourses.map(c => ({ id: c.id, title: c.title.substring(0, 30) + '...' })));
      } else {
        // Use fallback data if API returns empty
        console.log('DSACourse: API returned empty, using fallback data');
        const fallbackArray = Object.values(fallbackCourses).map(course => ({
          ...course,
          thumbnail: getYouTubeThumbnail(course.videoId, 'maxresdefault'),
          tags: course.tags || extractTagsFromTitle(course.title),
          formattedDuration: formatDuration(course.duration),
          formattedStats: formatVideoStats(course.students, course.lastUpdated)
        }));
        setCourses(fallbackArray);
        setLastFetch(new Date().toLocaleTimeString());
        setError('Using offline data - API returned no courses');
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
      // Use fallback data on error
      console.log('DSACourse: API error, using fallback data');
      const fallbackArray = Object.values(fallbackCourses).map(course => ({
        ...course,
        thumbnail: getYouTubeThumbnail(course.videoId, 'maxresdefault'),
        tags: course.tags || extractTagsFromTitle(course.title),
        formattedDuration: formatDuration(course.duration),
        formattedStats: formatVideoStats(course.students, course.lastUpdated)
      }));
      setCourses(fallbackArray);
      setLastFetch(new Date().toLocaleTimeString());
      setError('Using offline data - API unavailable');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoursesData();
  }, []);

  const handlePlayClick = (courseId, e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="dsa-course-page">
      <Header />

      {error && (
        <div className="api-warning">
          <p>⚠️ {error}</p>
        </div>
      )}

      {lastFetch && (
        <div style={{
          textAlign: 'center',
          fontSize: '12px',
          color: '#666',
          margin: '10px 0',
          backgroundColor: '#f0f0f0',
          padding: '5px',
          borderRadius: '3px'
        }}>
          Last updated: {lastFetch}
        </div>
      )}

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

        {/* Loading */}
        {loading && (
          <div className="loading-spinner">
            <p>Loading courses...</p>
          </div>
        )}

        {/* Course list - YouTube style */}
        {!loading && courses.length > 0 && (
          <div className="youtube-video-grid">
            {courses.map(course => (
              <div key={course.id} className="youtube-video-card">
                <div className="video-thumbnail-container">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="video-thumbnail"
                    onError={(e) => {
                      // Try different thumbnail qualities as fallback
                      if (e.target.src.includes('maxresdefault')) {
                        e.target.src = getYouTubeThumbnail(course.videoId, 'hqdefault');
                      } else if (e.target.src.includes('hqdefault')) {
                        e.target.src = getYouTubeThumbnail(course.videoId, 'mqdefault');
                      } else {
                        e.target.src = getYouTubeThumbnail(course.videoId, 'default');
                      }
                    }}
                  />
                  <div className="video-duration">
                    {course.formattedDuration}
                  </div>
                  <div className="video-play-overlay" onClick={(e) => handlePlayClick(course.id, e)}>
                    <div className="youtube-play-button">
                      <svg viewBox="0 0 24 24" className="play-icon">
                        <path d="M8 5v14l11-7z" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="video-info">
                  <div className="video-title" title={course.title}>
                    {course.title}
                  </div>
                  <div className="video-metadata">
                    <div className="video-stats">
                      {course.formattedStats}
                    </div>
                    <div className="video-description">
                      {course.description}
                    </div>
                  </div>
                  <div className="video-tags">
                    {course.tags && course.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="video-tag">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Coming soon button */}
        <div className="add-soon-button">
          <button onClick={() => alert("Stay tuned for more courses!")}>Coming Soon</button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DSACourse;