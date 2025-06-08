import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TalentPage from './components/TalentPage';
import JobsPage from './components/JobsPage';
import TeamPage from './components/TeamPage';
import AboutPage from './components/AboutPage';
import GovernmentPage from './components/GovernmentPage';

const MigraMatch = () => {
  const [currentPage, setCurrentPage] = useState('start');
  const [showStartPage, setShowStartPage] = useState(true);

  const handleStartPageClick = () => {
    setShowStartPage(false);
  };

  if (showStartPage) {
    return (
      <div className="start-page" onClick={handleStartPageClick} style={{
        height: '100vh', 
        width: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        background: 'white',
        padding: '15px',
        color: '#333',
        textAlign: 'center',
        cursor: 'pointer',
        overflow: 'auto'
      }}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '95%',
            width: '100%'
          }}
        >
          {/* MigraMatch Logo */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ marginBottom: '15px' }}
          >
            <img 
              src={process.env.PUBLIC_URL + "/images/migra.jpeg"}
              alt="MigraMatch Logo"
              style={{
                width: 'min(150px, 30vw)',
                height: 'auto',
                borderRadius: '12px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
              }}
            />
          </motion.div>
          
          {/* Tagline */}
          <h2 style={{ 
            fontSize: 'min(20px, 5vw)', 
            fontWeight: 'normal', 
            margin: '0 0 20px 0',
            color: '#666'
          }}>
            Human connection first, paper work later
          </h2>
          
          <p style={{
            fontSize: 'min(16px, 4vw)',
            maxWidth: '90%',
            lineHeight: 1.4,
            margin: '0 0 25px 0',
            color: '#777'
          }}>
            Connecting international talent to German employers through human-centered matching
          </p>
          
          {/* User Guide */}
          <motion.div
            style={{
              backgroundColor: '#f8f9fa',
              borderRadius: '12px',
              padding: '15px',
              marginBottom: '15px',
              width: '90%',
              textAlign: 'left'
            }}
          >
            <h3 style={{ 
              fontSize: 'min(16px, 4vw)', 
              marginBottom: '12px',
              textAlign: 'center',
              color: '#0069b4'
            }}>
              📱 Navigation Guide
            </h3>
            
            <div style={{ fontSize: 'min(13px, 3.5vw)', lineHeight: '1.5', color: '#555' }}>
              <p style={{ marginBottom: '12px' }}>
                <strong>Our Platform Sections:</strong>
              </p>
              <ul style={{ paddingLeft: '15px', marginBottom: '12px' }}>
                <li>👥 TALENT - Explore the talent </li>
                <li>💼 JOBS - Browse company profiles </li>
                <li>🏛️ GOV - Government integration dashboard</li>
                <li>🚀 TEAM - Meet our team</li>
                <li>ℹ️ ABOUT - Learn more about us</li>
              </ul>
              
              <p style={{ fontSize: 'min(12px, 3vw)', margin: 0, color: '#777' }}>
                Click anywhere to enter the navigation zone!
              </p>
            </div>
          </motion.div>

          <motion.p
            animate={{ opacity: [0, 1, 0], y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
            style={{
              marginTop: '15px',
              fontSize: 'min(16px, 4vw)',
              color: '#0069b4'
            }}
          >
            Tap anywhere to continue
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="app" style={{ height: '100vh', overflow: 'hidden' }}>
      {/* Navigation Bar - Mobile Optimized */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          zIndex: 1000,
          padding: '8px 0',
          borderBottom: '1px solid #e0e0e0'
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '100%',
          padding: '0 10px',
          maxWidth: '100vw'
        }}>
          {[
            { id: 'talent', label: 'JOBS', icon: '💼'  },
            { id: 'jobs', label: 'TALENT', icon: '👥'},
            { id: 'government', label: 'GOV', icon: '🏛️' }, 
            { id: 'team', label: 'TEAM', icon: '🚀' },
            { id: 'about', label: 'ABOUT', icon: 'ℹ️' }
          ].map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentPage(item.id)}
              style={{
                background: currentPage === item.id ? '#0069b4' : 'transparent',
                color: currentPage === item.id ? 'white' : '#333',
                border: currentPage === item.id ? 'none' : '1px solid #ddd',
                borderRadius: '6px',
                padding: '6px 8px',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: 'bold',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                transition: 'all 0.3s ease',
                minWidth: '0',
                flex: '1',
                maxWidth: '60px'
              }}
            >
              <span style={{ fontSize: '14px' }}>{item.icon}</span>
              <span style={{ fontSize: '9px', lineHeight: '1' }}>{item.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.nav>

      {/* Page Content */}
      <div style={{ marginTop: '65px', height: 'calc(100vh - 65px)' }}>
        <AnimatePresence mode="wait">
          {currentPage === 'talent' && <TalentPage key="talent" />}
          {currentPage === 'jobs' && <JobsPage key="jobs" />}
          {currentPage === 'government' && <GovernmentPage key="government" />} 
          {currentPage === 'team' && <TeamPage key="team" />}
          {currentPage === 'about' && <AboutPage key="about" />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MigraMatch;