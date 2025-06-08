import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TinderStyleCard = ({ 
  profiles, 
  onMatch, 
  showMatch, 
  setShowMatch, 
  showTags = false,
  filterTag = null 
}) => {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [startX, setStartX] = useState(0);
  const [showFullScreenImage, setShowFullScreenImage] = useState(false);
  const [fullScreenImageUrl, setFullScreenImageUrl] = useState('');
  const imageIntervalRef = useRef(null);

  // Get screen width for responsive design
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = screenWidth < 768;

  // Filter profiles based on tag
  const filteredProfiles = filterTag 
    ? profiles.filter(profile => profile.industry === filterTag)
    : profiles;

  // Setup auto-rotating images
  useEffect(() => {
    if (filteredProfiles[currentProfileIndex]?.images.length > 1) {
      if (imageIntervalRef.current) {
        clearInterval(imageIntervalRef.current);
      }
      
      imageIntervalRef.current = setInterval(() => {
        setCurrentImageIndex(prevIndex => 
          (prevIndex + 1) % filteredProfiles[currentProfileIndex].images.length
        );
      }, 2000);
    }
    
    return () => {
      if (imageIntervalRef.current) {
        clearInterval(imageIntervalRef.current);
        imageIntervalRef.current = null;
      }
    };
  }, [currentProfileIndex, filteredProfiles]);

  // Reset image index when profile changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [currentProfileIndex]);

  // Reset when filter changes
  useEffect(() => {
    setCurrentProfileIndex(0);
    setCurrentImageIndex(0);
  }, [filterTag]);

  const moveToNextProfile = () => {
    if (currentProfileIndex === filteredProfiles.length - 1) {
      if (onMatch) onMatch();
      return;
    }
    
    setCurrentProfileIndex(prevIndex => prevIndex + 1);
  };

  const handleLike = () => {
    setDirection('right');
    setTimeout(() => {
      moveToNextProfile();
      setDirection(null);
    }, 300);
  };

  const handleDislike = () => {
    setDirection('left');
    setTimeout(() => {
      moveToNextProfile();
      setDirection(null);
    }, 300);
  };

  const handleRewind = () => {
    if (currentProfileIndex > 0) {
      setDirection('down');
      setTimeout(() => {
        setCurrentProfileIndex(currentProfileIndex - 1);
        setDirection(null);
      }, 300);
    }
  };

  const handleSuperLike = () => {
    setDirection('up');
    setTimeout(() => {
      moveToNextProfile();
      setDirection(null);
    }, 300);
  };

  const handleMessage = () => {
    setShowMessagePopup(true);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    if (filteredProfiles[currentProfileIndex].images.length > 1) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? filteredProfiles[currentProfileIndex].images.length - 1 : prevIndex - 1
      );
      
      if (imageIntervalRef.current) {
        clearInterval(imageIntervalRef.current);
        imageIntervalRef.current = setInterval(() => {
          setCurrentImageIndex(prevIndex => 
            (prevIndex + 1) % filteredProfiles[currentProfileIndex].images.length
          );
        }, 2000);
      }
    }
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    if (filteredProfiles[currentProfileIndex].images.length > 1) {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % filteredProfiles[currentProfileIndex].images.length
      );
      
      if (imageIntervalRef.current) {
        clearInterval(imageIntervalRef.current);
        imageIntervalRef.current = setInterval(() => {
          setCurrentImageIndex(prevIndex => 
            (prevIndex + 1) % filteredProfiles[currentProfileIndex].images.length
          );
        }, 2000);
      }
    }
  };

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleDislike();
      } else {
        handleLike();
      }
    }
  };

  if (filteredProfiles.length === 0) {
    return (
      <div style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: isMobile ? '16px' : '18px',
        color: '#666',
        padding: '20px',
        textAlign: 'center'
      }}>
        No profiles match the selected filter.
      </div>
    );
  }

  const currentProfile = filteredProfiles[currentProfileIndex];

  return (
    <div className="tinder-container" style={{ 
      height: '100%', 
      width: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center',
      background: '#f0f2f5',
      padding: isMobile ? '10px' : '20px',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      {/* Profile card */}
      <motion.div 
        className="profile-card"
        initial={{ opacity: 1 }}
        animate={{ 
          x: direction === 'left' ? -500 : direction === 'right' ? 500 : 0,
          y: direction === 'up' ? -500 : direction === 'down' ? 500 : 0,
          opacity: direction ? 0 : 1,
          rotate: direction === 'left' ? -30 : direction === 'right' ? 30 : 0
        }}
        transition={{ duration: 0.3 }}
        style={{
          width: '100%',
          maxWidth: isMobile ? '95vw' : '500px',
          minHeight: isMobile ? '65vh' : '70vh',
          height: 'auto',
          backgroundColor: 'white',
          borderRadius: isMobile ? '12px' : '15px',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Profile image carousel */}
        <div 
          style={{ 
            height: isMobile ? '50%' : '60%', 
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '20%',
              width: '60%',
              height: '100%',
              cursor: 'pointer',
              zIndex: 3
            }}
            onClick={(e) => {
              e.stopPropagation();
              setFullScreenImageUrl(currentProfile.images[currentImageIndex]);
              setShowFullScreenImage(true);
            }}
          />
          
          <img 
            src={currentProfile.images[currentImageIndex]}
            alt={currentProfile.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1
            }}
          />
          
          {/* Image navigation buttons */}
          {currentProfile.images.length > 1 && (
            <>
              <div 
                onClick={handlePrevImage}
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  width: '20%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  padding: isMobile ? '0 10px' : '0 15px',
                  zIndex: 4,
                  background: 'linear-gradient(to right, rgba(0,0,0,0.1), transparent)'
                }}
              >
                <div style={{
                  width: isMobile ? '30px' : '40px',
                  height: isMobile ? '30px' : '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: isMobile ? '16px' : '20px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  transition: 'all 0.2s ease'
                }}>
                  ◀
                </div>
              </div>
              
              <div 
                onClick={handleNextImage}
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  right: 0,
                  width: '20%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  padding: isMobile ? '0 10px' : '0 15px',
                  zIndex: 4,
                  background: 'linear-gradient(to left, rgba(0,0,0,0.1), transparent)'
                }}
              >
                <div style={{
                  width: isMobile ? '30px' : '40px',
                  height: isMobile ? '30px' : '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: isMobile ? '16px' : '20px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  transition: 'all 0.2s ease'
                }}>
                  ▶
                </div>
              </div>
            </>
          )}

          {/* Image indicators */}
          {currentProfile.images.length > 1 && (
            <div style={{
              position: 'absolute',
              top: '10px',
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              gap: '4px',
              zIndex: 2
            }}>
              {currentProfile.images.map((_, index) => (
                <div
                  key={index}
                  style={{
                    width: isMobile ? '5px' : '6px',
                    height: isMobile ? '5px' : '6px',
                    borderRadius: '50%',
                    backgroundColor: index === currentImageIndex ? 'white' : 'rgba(255, 255, 255, 0.5)',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          )}

          {/* Gradient overlay for text visibility */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
            padding: isMobile ? '15px' : '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            zIndex: 2
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: isMobile ? '8px' : '10px'
            }}>
              <h2 style={{ 
                color: 'white', 
                margin: 0, 
                fontSize: isMobile ? '22px' : '28px', 
                fontWeight: 'bold' 
              }}>
                {currentProfile.name}
              </h2>
              <span style={{ 
                color: 'white', 
                fontSize: isMobile ? '18px' : '24px', 
                marginBottom: '4px' 
              }}>
                , {currentProfile.age}
              </span>
            </div>
            
            {/* Industry tag */}
            {showTags && currentProfile.industry && (
              <div style={{
                display: 'inline-block',
                marginTop: '8px',
                padding: '3px 10px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '12px',
                fontSize: isMobile ? '12px' : '14px',
                fontWeight: 'bold',
                color: '#333',
                alignSelf: 'flex-start'
              }}>
                {currentProfile.industry}
              </div>
            )}
          </div>
        </div>
        
        {/* Profile bio */}
        <div style={{ 
          padding: isMobile ? '15px' : '20px', 
          flex: 1, 
          overflowY: 'auto',
          backgroundColor: currentProfile.backgroundColor || 'white',
          background: `linear-gradient(to bottom, ${currentProfile.backgroundColor || 'white'}, white)`
        }}>
          <p style={{
            fontSize: isMobile ? '14px' : '18px',
            lineHeight: isMobile ? '1.4' : '1.5',
            margin: 0,
            whiteSpace: 'pre-line',
            color: '#333'
          }}>
            {currentProfile.bio}
          </p>

          {/* Skills Section */}
          {currentProfile.skills && (
            <div style={{
              marginTop: isMobile ? '12px' : '15px',
              padding: isMobile ? '12px' : '15px',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '8px'
            }}>
              <h4 style={{
                margin: '0 0 10px 0',
                fontSize: isMobile ? '14px' : '16px',
                color: '#333',
                fontWeight: 'bold'
              }}>
                Skills & Certifications
              </h4>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: isMobile ? '6px' : '8px'
              }}>
                {currentProfile.skills.map((skill, index) => {
                  // Define colors based on skill type and verification status
                  const getSkillColor = (skillItem) => {
                    if (!skillItem.verified) return { bg: '#FFC107', color: '#000' }; // Yellow for pending
                    
                    switch (skillItem.type) {
                      case 'language':
                        return { bg: '#4CAF50', color: '#fff' }; // Green for languages
                      case 'technical':
                        return { bg: '#2196F3', color: '#fff' }; // Blue for technical
                      case 'certification':
                        return { bg: '#FF5722', color: '#fff' }; // Red-orange for certifications
                      case 'education':
                        return { bg: '#9C27B0', color: '#fff' }; // Purple for education
                      case 'legal':
                        return { bg: '#795548', color: '#fff' }; // Brown for legal status
                      case 'soft':
                        return { bg: '#607D8B', color: '#fff' }; // Blue-grey for soft skills
                      default:
                        return { bg: '#757575', color: '#fff' }; // Grey default
                    }
                  };

                  const skillColors = getSkillColor(skill);
                  
                  return (
                    <motion.div
                      key={`${skill.name}-${index}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05, zIndex: 10 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        position: 'relative',
                        padding: isMobile ? '4px 8px' : '6px 12px',
                        backgroundColor: skillColors.bg,
                        color: skillColors.color,
                        borderRadius: '12px',
                        fontSize: isMobile ? '10px' : '12px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        border: skill.verified ? 'none' : '2px dashed #fff'
                      }}
                    >
                      {skill.verified && (
                        <span style={{ fontSize: isMobile ? '8px' : '10px' }}>✓</span>
                      )}
                      {!skill.verified && (
                        <span style={{ fontSize: isMobile ? '8px' : '10px' }}>⏳</span>
                      )}
                      <span>{skill.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Additional profile information */}
          {(currentProfile.role || currentProfile.company || currentProfile.location) && (
            <div style={{
              marginTop: isMobile ? '12px' : '15px',
              padding: isMobile ? '12px' : '15px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '8px',
              fontSize: isMobile ? '12px' : '14px',
              color: '#555'
            }}>
              {currentProfile.role && (
                <p style={{ margin: '0 0 4px 0' }}>
                  <strong>Role:</strong> {currentProfile.role}
                </p>
              )}
              {currentProfile.company && (
                <p style={{ margin: '0 0 4px 0' }}>
                  <strong>Company:</strong> {currentProfile.company}
                </p>
              )}
              {currentProfile.location && (
                <p style={{ margin: 0 }}>
                  <strong>Location:</strong> {currentProfile.location}
                </p>
              )}
            </div>
          )}
        </div>
      </motion.div>
      
      {/* Action buttons */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-around', 
        alignItems: 'center',
        width: '100%',
        maxWidth: isMobile ? '95vw' : '500px',
        padding: isMobile ? '15px 0' : '20px 0'
      }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            width: isMobile ? '45px' : '60px',
            height: isMobile ? '45px' : '60px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#ffb7b7',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: isMobile ? '18px' : '24px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
          }}
          onClick={handleDislike}
        >
          ✖️
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            width: isMobile ? '35px' : '50px',
            height: isMobile ? '35px' : '50px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#ffcf85',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: isMobile ? '16px' : '20px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
          }}
          onClick={handleRewind}
        >
          ↩️
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            width: isMobile ? '35px' : '50px',
            height: isMobile ? '35px' : '50px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#90e0ef',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: isMobile ? '16px' : '20px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
          }}
          onClick={handleSuperLike}
        >
          ⭐
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            width: isMobile ? '35px' : '50px',
            height: isMobile ? '35px' : '50px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#c77dff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: isMobile ? '16px' : '20px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
          }}
          onClick={handleMessage}
        >
          💬
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            width: isMobile ? '45px' : '60px',
            height: isMobile ? '45px' : '60px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#a7e8bd',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: isMobile ? '18px' : '24px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
          }}
          onClick={handleLike}
        >
          ❤️
        </motion.button>
      </div>
      
      {/* Progress indicator */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '3px',
        marginTop: isMobile ? '5px' : '10px'
      }}>
        {filteredProfiles.map((_, index) => (
          <div
            key={index}
            style={{
              width: isMobile ? '6px' : '8px',
              height: isMobile ? '6px' : '8px',
              borderRadius: '50%',
              backgroundColor: index === currentProfileIndex ? '#0069b4' : '#ddd'
            }}
          />
        ))}
      </div>

      {/* Match overlay */}
      {showMatch && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            color: 'white',
            textAlign: 'center',
            padding: '20px'
          }}
          onClick={() => setShowMatch(false)}
        >
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 3.5,
              repeat: Infinity, 
              repeatType: "loop" 
            }}
          >
            <h1 style={{ 
              fontSize: isMobile ? '2rem' : '3rem', 
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              ✨ IT'S A MATCH! ✨
            </h1>
          </motion.div>
          <h2 style={{ 
            fontSize: isMobile ? '1.2rem' : '1.5rem', 
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            You've found your perfect match!
          </h2>
          <p style={{ 
            fontSize: isMobile ? '1rem' : '1.2rem',
            textAlign: 'center'
          }}>
            Tap anywhere to continue
          </p>
        </motion.div>
      )}
      
      {/* Message popup */}
      <AnimatePresence>
        {showMessagePopup && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'white',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
              boxShadow: '0 -5px 20px rgba(0, 0, 0, 0.2)',
              padding: isMobile ? '15px' : '20px',
              zIndex: 1000,
              maxHeight: '80vh',
              overflowY: 'auto'
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: isMobile ? '15px' : '20px',
              borderBottom: '1px solid #eee',
              paddingBottom: isMobile ? '10px' : '15px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <div style={{
                  width: isMobile ? '40px' : '50px',
                  height: isMobile ? '40px' : '50px',
                  borderRadius: '50%',
                  overflow: 'hidden'
                }}>
                  <img 
                    src={currentProfile.images[0]}
                    alt={currentProfile.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <div>
                  <h3 style={{ 
                    margin: 0, 
                    fontSize: isMobile ? '16px' : '18px' 
                  }}>
                    {currentProfile.name}
                  </h3>
                  <p style={{ 
                    margin: 0, 
                    fontSize: isMobile ? '12px' : '14px', 
                    color: '#666' 
                  }}>
                    Active now
                  </p>
                </div>
              </div>
              <div style={{
                display: 'flex',
                gap: isMobile ? '10px' : '15px'
              }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: isMobile ? '35px' : '40px',
                    height: isMobile ? '35px' : '40px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: '#f0f2f5',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontSize: isMobile ? '16px' : '20px'
                  }}
                >
                  📞
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: isMobile ? '35px' : '40px',
                    height: isMobile ? '35px' : '40px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: '#f0f2f5',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontSize: isMobile ? '16px' : '20px'
                  }}
                >
                  📹
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: isMobile ? '35px' : '40px',
                    height: isMobile ? '35px' : '40px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: '#f0f2f5',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontSize: isMobile ? '16px' : '20px'
                  }}
                  onClick={() => setShowMessagePopup(false)}
                >
                  ✖️
                </motion.button>
              </div>
            </div>
            
            {/* Messages */}
            <div style={{
              marginBottom: isMobile ? '15px' : '20px'
            }}>
              <div style={{
                display: 'flex',
                marginBottom: '15px'
              }}>
                <div style={{
                  maxWidth: '80%',
                  backgroundColor: '#f0f2f5',
                  padding: isMobile ? '10px 12px' : '12px 15px',
                  borderRadius: '15px',
                  marginRight: 'auto'
                }}>
                  <p style={{ 
                    margin: 0,
                    fontSize: isMobile ? '14px' : '16px'
                  }}>
                    Hi there, what a great match. Looking forward to working together.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Input */}
            <div style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center'
            }}>
              <input 
                type="text" 
                placeholder="Type a message..."
                style={{
                  flex: 1,
                  padding: isMobile ? '10px 12px' : '12px 15px',
                  borderRadius: '18px',
                  border: '1px solid #ddd',
                  fontSize: isMobile ? '14px' : '16px',
                  outline: 'none'
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: isMobile ? '35px' : '40px',
                  height: isMobile ? '35px' : '40px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: '#0069b4',
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  fontSize: isMobile ? '16px' : '20px'
                }}
              >
                ↗️
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-screen image overlay */}
      <AnimatePresence>
        {showFullScreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 2000,
              cursor: 'pointer'
            }}
            onClick={() => setShowFullScreenImage(false)}
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={fullScreenImageUrl}
              alt="Full screen view"
              style={{
                maxWidth: '90%',
                maxHeight: '90%',
                objectFit: 'contain',
                borderRadius: '10px'
              }}
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: isMobile ? '40px' : '50px',
                height: isMobile ? '40px' : '50px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#333',
                fontSize: isMobile ? '20px' : '24px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 2001
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                setShowFullScreenImage(false);
              }}
            >
              ✕
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TinderStyleCard;