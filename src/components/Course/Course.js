import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Course.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { fetchAllCourses, fallbackCourses } from '../../services/courseService';
import { getYouTubeThumbnail } from '../../utils/youtubeUtils';

const Course = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  // Format numbers like YouTube (1.2M, 237K, etc.)
  const formatNumber = (num) => {
    if (!num) return '0';
    const numStr = num.toString().replace(/[^\d]/g, '');
    const number = parseInt(numStr);
    
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'K';
    }
    return number.toString();
  };

  // Format upload date
  const formatUploadDate = (dateStr) => {
    if (!dateStr) return 'Unknown date';
    
    if (dateStr.includes('Last updated')) {
      return dateStr.replace('Last updated ', '');
    }
    
    // Try to parse and format relative time
    const now = new Date();
    const date = new Date(dateStr);
    
    if (!isNaN(date.getTime())) {
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays < 30) {
        return `${diffDays} days ago`;
      } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return `${months} month${months > 1 ? 's' : ''} ago`;
      } else {
        const years = Math.floor(diffDays / 365);
        return `${years} year${years > 1 ? 's' : ''} ago`;
      }
    }
    
    return dateStr;
  };

  // Fetch course data from API
  const fetchCourseData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Always try fallback first to ensure we have data
      const numericId = parseInt(id);
      const fallbackCourse = fallbackCourses[numericId] || fallbackCourses[id];

      if (fallbackCourse) {
        setCourse(fallbackCourse);
      }

      // Try to fetch from API to override fallback
      try {
        console.log('🔄 Attempting to fetch course data from API...');
        const allCourses = await fetchAllCourses();

        if (Array.isArray(allCourses) && allCourses.length > 0) {
          const targetId = id.toString();
          const foundCourse = allCourses.find(course => {
            const courseId = course.id.toString();
            return courseId === targetId;
          });

          if (foundCourse) {
            const processedCourse = {
              ...foundCourse,
              id: parseInt(foundCourse.id) || foundCourse.id,
              rating: parseFloat(foundCourse.rating) || foundCourse.rating,
              title: foundCourse.title || '',
              description: foundCourse.description || '',
              students: foundCourse.students || '',
              duration: foundCourse.duration || '',
              lastUpdated: foundCourse.lastUpdated || '',
              videoId: foundCourse.videoId || '',
              notes: foundCourse.notes || '',
              driveLink: foundCourse.driveLink || ''
            };

            console.log('✅ Course data loaded from API successfully');
            setCourse(processedCourse);
            setError(null);
          } else if (!fallbackCourse) {
            setError(`Course with ID ${id} not found`);
          } else {
            setError('Course not found in API, using offline data');
          }
        } else {
          if (!fallbackCourse) {
            setError('No course data available');
          } else {
            setError('API returned no data - using offline data');
          }
        }
      } catch (apiErr) {
        console.error('🚨 API Error Details:', {
          error: apiErr.message,
          type: apiErr.name,
          courseId: id,
          hasFallback: !!fallbackCourse
        });
        
        if (!fallbackCourse) {
          setError(`Course not found for ID: ${id}`);
        } else {
          // More specific error messages based on error type
          if (apiErr.name === 'TypeError' && apiErr.message.includes('fetch')) {
            setError('Network error - using offline data (check your internet connection)');
          } else if (apiErr.message.includes('CORS')) {
            setError('CORS error - using offline data (API access blocked)');
          } else if (apiErr.message.includes('timeout')) {
            setError('Request timeout - using offline data (API too slow)');
          } else {
            setError(`API error (${apiErr.message}) - using offline data`);
          }
        }
      }
    } catch (err) {
      const numericId = parseInt(id);
      const fallbackCourse = fallbackCourses[numericId] || fallbackCourses[id];
      if (fallbackCourse) {
        setCourse(fallbackCourse);
        setError('Using offline data due to error');
      } else {
        setError(`Course not found for ID: ${id}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCourse(null);
    setShowVideo(false);
    setError(null);
    fetchCourseData();
  }, [id]);

  const handlePlayVideo = () => {
    setShowVideo(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCourses = () => {
    navigate('/dsa-courses');
  };

  // Loading state
  if (loading) {
    return (
      <div className="youtube-page">
        <Header />
        <div className="youtube-container">
          <div className="youtube-loading">
            <div className="loading-skeleton">
              <div className="skeleton-video"></div>
              <div className="skeleton-title"></div>
              <div className="skeleton-meta"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state - course not found
  if (!course) {
    return (
      <div className="youtube-page">
        <Header />
        <div className="youtube-container">
          <div className="youtube-error">
            <div className="error-content">
              <h2>Video Not Found</h2>
              <p>The requested video could not be found.</p>
              <button onClick={handleBackToCourses} className="back-button">
                Back to Courses
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="youtube-page">
      <Header />

      {error && (
        <div className="youtube-warning">
          <p>⚠️ {error}</p>
        </div>
      )}

      <div className="youtube-container">
        <div className="youtube-main">
          {/* Video Player Section */}
          <div className="youtube-video-section">
            {!showVideo && course.videoId ? (
              <div className="youtube-video-placeholder" onClick={handlePlayVideo}>
                <img
                  src={getYouTubeThumbnail(course.videoId, 'maxresdefault')}
                  alt={course.title}
                  className="youtube-video-thumbnail"
                  onError={(e) => {
                    if (e.target.src.includes('maxresdefault')) {
                      e.target.src = getYouTubeThumbnail(course.videoId, 'hqdefault');
                    } else if (e.target.src.includes('hqdefault')) {
                      e.target.src = getYouTubeThumbnail(course.videoId, 'mqdefault');
                    }
                  }}
                />
                <div className="youtube-play-overlay">
                  <div className="youtube-play-btn">
                    <svg viewBox="0 0 24 24" className="youtube-play-icon">
                      <path d="M8 5v14l11-7z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
              </div>
            ) : showVideo && course.videoId ? (
              <div className="youtube-video-player">
                <iframe
                  src={`https://www.youtube.com/embed/${course.videoId}?autoplay=1&controls=1&rel=0&showinfo=0&modestbranding=1&fs=1`}
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  title={course.title}
                />
              </div>
            ) : (
              <div className="youtube-video-error">
                <div className="error-icon">📹</div>
                <h3>Video Not Available</h3>
                <p>This video is currently unavailable.</p>
              </div>
            )}
          </div>

          {/* Video Info Section */}
          <div className="youtube-video-info">
            <h1 className="youtube-video-title">{course.title}</h1>
            
            <div className="youtube-video-meta">
              <div className="youtube-video-stats">
                <span className="views">{formatNumber(course.students)} views</span>
                <span className="upload-date">{formatUploadDate(course.lastUpdated)}</span>
              </div>
              
              <div className="youtube-video-actions">
                <button 
                  className={`youtube-action-btn ${isLiked ? 'active' : ''}`}
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <svg viewBox="0 0 24 24" className="action-icon">
                    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" fill="currentColor"/>
                  </svg>
                  <span>{isLiked ? '1.2K' : '1.1K'}</span>
                </button>
                
               
              </div>
            </div>
          

            {/* Description */}
            <div className="youtube-description">
              <div className="description-preview">
                <div className="description-meta">
                  <span className="rating">⭐ {course.rating || '4.5'}</span>
                  <span className="duration">📚 {course.duration || 'Full Course'}</span>
                </div>
                <div className={`description-text ${showDescription ? 'expanded' : ''}`}>
                  {course.description}
                  {course.notes && (
                    <div className="course-notes">
                      <h4>Course Notes:</h4>
                      <p>{course.notes}</p>
                    </div>
                  )}
                </div>
                <button 
                  className="show-more-btn"
                  onClick={() => setShowDescription(!showDescription)}
                >
                  {showDescription ? 'Show less' : 'Show more'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="youtube-sidebar">
          {/* Course Resources */}
          <div className="sidebar-section">
            <h3>Course Resources</h3>
            
            {course.driveLink && (
              <a href={course.driveLink} target="_blank" rel="noopener noreferrer" className="resource-link">
                <div className="resource-icon">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" alt="Google Drive" />
                </div>
                <div className="resource-info">
                  <div className="resource-title">Course Materials</div>
                  <div className="resource-subtitle">Google Drive</div>
                </div>
              </a>
            )}
            
            {course.videoId && (
              <a 
                href={`https://www.youtube.com/watch?v=${course.videoId}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="resource-link"
              >
                <div className="resource-icon youtube-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FF0000"/>
                  </svg>
                </div>
                <div className="resource-info">
                  <div className="resource-title">Watch on YouTube</div>
                  <div className="resource-subtitle">Original video</div>
                </div>
              </a>
            )}

            {!showVideo && course.videoId && (
              <button onClick={handlePlayVideo} className="resource-link play-here-btn">
                <div className="resource-icon play-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="resource-info">
                  <div className="resource-title">Play Video</div>
                  <div className="resource-subtitle">Watch here</div>
                </div>
              </button>
            )}
          </div>

          {/* Related Courses */}
          <div className="sidebar-section">
            <h3>More Courses</h3>
            <div className="related-courses">
              {Object.values(fallbackCourses)
                .filter(c => c.id !== course.id)
                .slice(0, 3)
                .map(relatedCourse => (
                  <div 
                    key={relatedCourse.id} 
                    className="related-course"
                    onClick={() => navigate(`/course/${relatedCourse.id}`)}
                  >
                    <div className="related-thumbnail">
                      <img 
                        src={getYouTubeThumbnail(relatedCourse.videoId, 'mqdefault')} 
                        alt={relatedCourse.title}
                      />
                      <div className="related-duration">
                        {relatedCourse.duration?.includes('hour') ? 
                          relatedCourse.duration.split(' ')[0] + 'h' : 
                          '45:30'
                        }
                      </div>
                    </div>
                    <div className="related-info">
                      <div className="related-title">{relatedCourse.title}</div>
                      <div className="related-meta">
                        <div className="related-channel">Programming Course</div>
                        <div className="related-views">{formatNumber(relatedCourse.students)} views</div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Course;