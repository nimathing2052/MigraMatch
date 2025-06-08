import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TinderStyleCard from './TinderStyleCard';
import { talentProfiles } from '../data/talentProfiles';

const TalentPage = () => {
  const [showMatch, setShowMatch] = useState(false);
  const [filters, setFilters] = useState({
    industry: null,
    germanLevel: null,
    englishLevel: null
  });
  const [showFilterSelection, setShowFilterSelection] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = screenWidth < 768;

  const handleMatch = () => {
    setShowMatch(true);
    setTimeout(() => {
      setShowMatch(false);
    }, 3000);
  };

  const handleFilterSelect = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? null : value
    }));
  };

  const handleApplyFilters = () => {
    setShowFilterSelection(false);
  };

  const handleBackToFilters = () => {
    setShowFilterSelection(true);
  };

  // Language level hierarchy (higher numbers = higher levels)
  const languageLevels = {
    'A1': 1, 'A2': 2, 'B1': 3, 'B2': 4, 'C1': 5, 'C2': 6
  };

  // Filter profiles based on selected filters
  const filteredProfiles = talentProfiles.filter(profile => {
    if (filters.industry && profile.industry !== filters.industry) {
      return false;
    }
    
    // Check German level requirement
    if (filters.germanLevel) {
      const userGermanLevel = languageLevels[filters.germanLevel];
      const hasGermanSkill = profile.skills?.some(skill => {
        if (skill.type === 'language' && skill.name.includes('German')) {
          // Extract level from skill name (e.g., "German B2" -> "B2")
          const match = skill.name.match(/(A[12]|B[12]|C[12])/);
          if (match) {
            const requiredLevel = languageLevels[match[1]];
            // Show if company doesn't require higher than user's level
            return requiredLevel <= userGermanLevel;
          }
        }
        return false;
      });
      // If no German skill listed, assume no German requirement (include it)
      const hasNoGermanSkill = !profile.skills?.some(skill => 
        skill.type === 'language' && skill.name.includes('German')
      );
      if (!hasGermanSkill && !hasNoGermanSkill) return false;
    }
    
    // Check English level requirement
    if (filters.englishLevel) {
      const userEnglishLevel = languageLevels[filters.englishLevel];
      const hasEnglishSkill = profile.skills?.some(skill => {
        if (skill.type === 'language' && skill.name.includes('English')) {
          const match = skill.name.match(/(A[12]|B[12]|C[12])/);
          if (match) {
            const requiredLevel = languageLevels[match[1]];
            return requiredLevel <= userEnglishLevel;
          }
        }
        return false;
      });
      const hasNoEnglishSkill = !profile.skills?.some(skill => 
        skill.type === 'language' && skill.name.includes('English')
      );
      if (!hasEnglishSkill && !hasNoEnglishSkill) return false;
    }
    
    return true;
  });

  if (showFilterSelection) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#f5f5f5',
          padding: isMobile ? '15px' : '20px'
        }}
      >
        {/* Header */}
        <div style={{
          backgroundColor: 'white',
          padding: isMobile ? '15px' : '20px',
          borderRadius: '15px',
          marginBottom: '20px',
          textAlign: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            margin: 0,
            color: '#0069b4',
            fontSize: isMobile ? '20px' : '24px',
            fontWeight: 'bold',
            marginBottom: '8px'
          }}>
            👥 Browse Companies
          </h2>
          <p style={{
            margin: 0,
            color: '#666',
            fontSize: isMobile ? '14px' : '16px'
          }}>
            Filter companies by industry and language requirements
          </p>
        </div>

        {/* Filter Options */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '12px' : '20px'
        }}>
          {/* Industry Filter */}
          <div style={{
            backgroundColor: 'white',
            padding: isMobile ? '8px' : '20px',
            borderRadius: isMobile ? '8px' : '15px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{
              margin: '0 0 6px 0',
              color: '#333',
              fontSize: isMobile ? '12px' : '18px',
              fontWeight: 'bold'
            }}>
              🏢 Industry
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(auto-fit, minmax(90px, 1fr))',
              gap: isMobile ? '4px' : '10px'
            }}>
              {['IT', 'Health', 'Engineering'].map((industry) => (
                <motion.button
                  key={industry}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleFilterSelect('industry', industry)}
                  style={{
                    padding: isMobile ? '4px 6px' : '12px 18px',
                    borderRadius: isMobile ? '5px' : '10px',
                    border: filters.industry === industry ? 'none' : '1px solid #e0e0e0',
                    backgroundColor: filters.industry === industry ? '#0069b4' : 'white',
                    color: filters.industry === industry ? 'white' : '#333',
                    cursor: 'pointer',
                    fontSize: isMobile ? '10px' : '16px',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {industry}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Language Filters Combined for Mobile */}
          {isMobile ? (
            <div style={{
              backgroundColor: 'white',
              padding: '10px',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              {/* German Level */}
              <div style={{ marginBottom: '10px' }}>
                <h3 style={{
                  margin: '0 0 6px 0',
                  color: '#333',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  🇩🇪 German Level
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(6, 1fr)',
                  gap: '4px'
                }}>
                  {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((level) => (
                    <motion.button
                      key={level}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleFilterSelect('germanLevel', level)}
                      style={{
                        padding: '6px 4px',
                        borderRadius: '6px',
                        border: filters.germanLevel === level ? 'none' : '1px solid #e0e0e0',
                        backgroundColor: filters.germanLevel === level ? '#0069b4' : 'white',
                        color: filters.germanLevel === level ? 'white' : '#333',
                        cursor: 'pointer',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {level}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* English Level */}
              <div>
                <h3 style={{
                  margin: '0 0 6px 0',
                  color: '#333',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  🇬🇧 English Level
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(6, 1fr)',
                  gap: '4px'
                }}>
                  {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((level) => (
                    <motion.button
                      key={level}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleFilterSelect('englishLevel', level)}
                      style={{
                        padding: '6px 4px',
                        borderRadius: '6px',
                        border: filters.englishLevel === level ? 'none' : '1px solid #e0e0e0',
                        backgroundColor: filters.englishLevel === level ? '#0069b4' : 'white',
                        color: filters.englishLevel === level ? 'white' : '#333',
                        cursor: 'pointer',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {level}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* German Level Filter */}
              <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '15px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{
                  margin: '0 0 10px 0',
                  color: '#333',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}>
                  🇩🇪 My German Level
                </h3>
                <p style={{
                  margin: '0 0 15px 0',
                  color: '#666',
                  fontSize: '14px'
                }}>
                  Shows companies requiring your level or lower
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(60px, 1fr))',
                  gap: '8px'
                }}>
                  {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((level) => (
                    <motion.button
                      key={level}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleFilterSelect('germanLevel', level)}
                      style={{
                        padding: '10px 15px',
                        borderRadius: '8px',
                        border: filters.germanLevel === level ? 'none' : '2px solid #e0e0e0',
                        backgroundColor: filters.germanLevel === level ? '#0069b4' : 'white',
                        color: filters.germanLevel === level ? 'white' : '#333',
                        cursor: 'pointer',
                        fontSize: '15px',
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {level}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* English Level Filter */}
              <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '15px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{
                  margin: '0 0 10px 0',
                  color: '#333',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}>
                  🇬🇧 My English Level
                </h3>
                <p style={{
                  margin: '0 0 15px 0',
                  color: '#666',
                  fontSize: '14px'
                }}>
                  Shows companies requiring your level or lower
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(60px, 1fr))',
                  gap: '8px'
                }}>
                  {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((level) => (
                    <motion.button
                      key={level}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleFilterSelect('englishLevel', level)}
                      style={{
                        padding: '10px 15px',
                        borderRadius: '8px',
                        border: filters.englishLevel === level ? 'none' : '2px solid #e0e0e0',
                        backgroundColor: filters.englishLevel === level ? '#0069b4' : 'white',
                        color: filters.englishLevel === level ? 'white' : '#333',
                        cursor: 'pointer',
                        fontSize: '15px',
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {level}
                    </motion.button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Selected Filters Summary */}
          {(filters.industry || filters.germanLevel || filters.englishLevel) && (
            <div style={{
              backgroundColor: '#f0f9ff',
              padding: isMobile ? '8px' : '15px',
              borderRadius: isMobile ? '8px' : '10px',
              border: '2px solid #0069b4'
            }}>
              <h4 style={{
                margin: '0 0 6px 0',
                color: '#0069b4',
                fontSize: isMobile ? '12px' : '16px',
                fontWeight: 'bold'
              }}>
                Selected Filters:
              </h4>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: isMobile ? '4px' : '8px'
              }}>
                {filters.industry && (
                  <span style={{
                    backgroundColor: '#0069b4',
                    color: 'white',
                    padding: isMobile ? '2px 8px' : '4px 12px',
                    borderRadius: '15px',
                    fontSize: isMobile ? '10px' : '14px',
                    fontWeight: 'bold'
                  }}>
                    🏢 {filters.industry}
                  </span>
                )}
                {filters.germanLevel && (
                  <span style={{
                    backgroundColor: '#0069b4',
                    color: 'white',
                    padding: isMobile ? '2px 8px' : '4px 12px',
                    borderRadius: '15px',
                    fontSize: isMobile ? '10px' : '14px',
                    fontWeight: 'bold'
                  }}>
                    🇩🇪 {filters.germanLevel}+
                  </span>
                )}
                {filters.englishLevel && (
                  <span style={{
                    backgroundColor: '#0069b4',
                    color: 'white',
                    padding: isMobile ? '2px 8px' : '4px 12px',
                    borderRadius: '15px',
                    fontSize: isMobile ? '10px' : '14px',
                    fontWeight: 'bold'
                  }}>
                    🇬🇧 {filters.englishLevel}+
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Apply Filters Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleApplyFilters}
          style={{
            width: '100%',
            padding: isMobile ? '12px' : '18px',
            borderRadius: isMobile ? '10px' : '15px',
            border: 'none',
            backgroundColor: '#0069b4',
            color: 'white',
            fontSize: isMobile ? '14px' : '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: isMobile ? '12px' : '20px',
            boxShadow: '0 4px 12px rgba(0,105,180,0.3)'
          }}
        >
          Browse Companies ({filteredProfiles.length})
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Main Content - No header bar to save space */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <TinderStyleCard
          profiles={filteredProfiles}
          onMatch={handleMatch}
          showMatch={showMatch}
          setShowMatch={setShowMatch}
          showTags={true}
          onBackToFilters={handleBackToFilters}
        />
      </div>
    </motion.div>
  );
};

export default TalentPage;