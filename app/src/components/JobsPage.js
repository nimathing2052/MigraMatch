import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TinderStyleCard from './TinderStyleCard';
import { jobProfiles } from '../data/jobProfiles';

const JobsPage = () => {
  const [showMatch, setShowMatch] = useState(false);
  const [filters, setFilters] = useState({
    industry: null
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

  // Filter profiles based on selected filters
  const filteredProfiles = jobProfiles.filter(profile => {
    if (filters.industry && profile.industry !== filters.industry) {
      return false;
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
          padding: isMobile ? '10px' : '20px'
        }}
      >
        {/* Header */}
        <div style={{
          backgroundColor: 'white',
          padding: isMobile ? '12px' : '20px',
          borderRadius: isMobile ? '10px' : '15px',
          marginBottom: isMobile ? '12px' : '20px',
          textAlign: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            margin: 0,
            color: '#0069b4',
            fontSize: isMobile ? '18px' : '24px',
            fontWeight: 'bold',
            marginBottom: isMobile ? '4px' : '8px'
          }}>
            💼 Browse Talent
          </h2>
          <p style={{
            margin: 0,
            color: '#666',
            fontSize: isMobile ? '12px' : '16px'
          }}>
            Select your preferred industry to get started
          </p>
        </div>

        {/* Industry Filter */}
        <div style={{
          backgroundColor: 'white',
          padding: isMobile ? '8px' : '20px',
          borderRadius: isMobile ? '8px' : '15px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h3 style={{
            margin: '0 0 10px 0',
            color: '#333',
            fontSize: isMobile ? '14px' : '20px',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            🏢 Select Industry
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(auto-fit, minmax(100px, 1fr))',
            gap: isMobile ? '6px' : '15px',
            flex: 1,
            alignContent: 'center'
          }}>
            {['IT', 'Health', 'Engineering'].map((industry) => (
              <motion.button
                key={industry}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleFilterSelect('industry', industry)}
                style={{
                  padding: isMobile ? '10px 8px' : '25px 30px',
                  borderRadius: isMobile ? '8px' : '15px',
                  border: filters.industry === industry ? 'none' : '2px solid #e0e0e0',
                  backgroundColor: filters.industry === industry ? '#0069b4' : 'white',
                  color: filters.industry === industry ? 'white' : '#333',
                  cursor: 'pointer',
                  fontSize: isMobile ? '11px' : '18px',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  boxShadow: filters.industry === industry ? '0 4px 12px rgba(0,105,180,0.3)' : '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                {industry}
              </motion.button>
            ))}
          </div>

          {/* Show All Industries option */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleFilterSelect('industry', null)}
            style={{
              padding: isMobile ? '12px 16px' : '18px 25px',
              borderRadius: isMobile ? '8px' : '12px',
              border: !filters.industry ? 'none' : '2px solid #e0e0e0',
              backgroundColor: !filters.industry ? '#6c757d' : 'white',
              color: !filters.industry ? 'white' : '#333',
              cursor: 'pointer',
              fontSize: isMobile ? '12px' : '16px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              marginTop: isMobile ? '10px' : '15px'
            }}
          >
            Show All Industries
          </motion.button>
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
          Browse Talent ({filteredProfiles.length})
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
      {/* Main Content */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <TinderStyleCard
          profiles={filteredProfiles}
          onMatch={handleMatch}
          showMatch={showMatch}
          setShowMatch={setShowMatch}
          showTags={true}
        />
      </div>
    </motion.div>
  );
};

export default JobsPage;