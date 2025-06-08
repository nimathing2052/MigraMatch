import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GovernmentPage = () => {
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second for real-time effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock data for different sections
  const dashboardStats = {
    totalApplications: 1247,
    pendingReview: 89,
    approved: 1058,
    processingTime: '12 days',
    successRate: '84.9%'
  };

  const visaPipeline = [
    { stage: 'Application Submitted', count: 245, color: '#2196F3', icon: '📝' },
    { stage: 'Document Verification', count: 156, color: '#FF9800', icon: '🔍' },
    { stage: 'Interview Scheduled', count: 89, color: '#9C27B0', icon: '📅' },
    { stage: 'Decision Pending', count: 67, color: '#607D8B', icon: '⏳' },
    { stage: 'Approved', count: 1058, color: '#4CAF50', icon: '✅' },
    { stage: 'Rejected', count: 23, color: '#F44336', icon: '❌' }
  ];

  const integrationStatus = [
    { platform: 'Make it in Germany', status: 'Connected', lastSync: '2 min ago', icon: '🇩🇪' },
    { platform: 'EURES', status: 'Connected', lastSync: '5 min ago', icon: '🇪🇺' },
    { platform: 'LinkedIn Jobs', status: 'Connected', lastSync: '1 min ago', icon: '💼' },
    { platform: 'XING', status: 'Connected', lastSync: '3 min ago', icon: '🔗' },
    { platform: 'Federal Employment Agency', status: 'Connected', lastSync: '1 min ago', icon: '🏛️' }
  ];

  const recentApplications = [
    { id: 'APP-2024-001', name: 'Ahmed Rashid', role: 'DevOps Engineer', status: 'Interview Scheduled', progress: 75 },
    { id: 'APP-2024-002', name: 'Priya Sharma', role: 'Data Scientist', status: 'Document Review', progress: 50 },
    { id: 'APP-2024-003', name: 'Carlos Mendez', role: 'Mechanical Engineer', status: 'Approved', progress: 100 },
    { id: 'APP-2024-004', name: 'Dr. Elena Popov', role: 'Cardiothoracic Surgeon', status: 'Pending Review', progress: 25 },
    { id: 'APP-2024-005', name: 'Tomoko Tanaka', role: 'Robotics Engineer', status: 'Background Check', progress: 85 }
  ];

  const metrics = {
    administrativeBurden: {
      before: '45 days',
      after: '12 days',
      reduction: '73%'
    },
    documentProcessing: {
      before: '15 manual steps',
      after: '3 automated steps',
      reduction: '80%'
    },
    userSatisfaction: {
      employers: '91%',
      applicants: '88%',
      government: '85%'
    }
  };

  const renderDashboard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ padding: '20px' }}
    >
      {/* Key Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        marginBottom: '30px'
      }}>
        {Object.entries(dashboardStats).map(([key, value], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}
          >
            <h3 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#0069b4',
              margin: '0 0 10px 0'
            }}>
              {value}
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#666',
              margin: 0,
              textTransform: 'capitalize',
              fontWeight: '500'
            }}>
              {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Real-time Updates */}
      <motion.div
        style={{
          background: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}
      >
        <h2 style={{ fontSize: '18px', marginBottom: '15px', color: '#333' }}>
          Real-time System Status
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            backgroundColor: '#4CAF50',
            borderRadius: '50%',
            animation: 'pulse 2s infinite'
          }}></div>
          <span style={{ color: '#666' }}>
            System operational - Last updated: {currentTime.toLocaleTimeString()}
          </span>
        </div>
      </motion.div>

      {/* Visa Pipeline Overview */}
      <motion.div
        style={{
          background: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}
      >
        <h2 style={{ fontSize: '18px', marginBottom: '20px', color: '#333' }}>
          Visa Application Pipeline
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
          {visaPipeline.map((stage, index) => (
            <motion.div
              key={stage.stage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                padding: '15px',
                borderRadius: '8px',
                backgroundColor: stage.color,
                color: 'white',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{stage.icon}</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '5px' }}>
                {stage.count}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.9 }}>
                {stage.stage}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );

  const renderIntegrations = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ padding: '20px' }}
    >
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ fontSize: '18px', marginBottom: '20px', color: '#333' }}>
          Platform Integrations
        </h2>
        <div style={{ display: 'grid', gap: '15px' }}>
          {integrationStatus.map((platform, index) => (
            <motion.div
              key={platform.platform}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e9ecef'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '24px' }}>{platform.icon}</span>
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px', color: '#333' }}>
                    {platform.platform}
                  </h3>
                  <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                    Last sync: {platform.lastSync}
                  </p>
                </div>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#4CAF50',
                  borderRadius: '50%'
                }}></div>
                <span style={{ color: '#4CAF50', fontWeight: 'bold', fontSize: '14px' }}>
                  {platform.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderApplications = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ padding: '20px' }}
    >
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ fontSize: '18px', marginBottom: '20px', color: '#333' }}>
          Recent Applications
        </h2>
        <div style={{ display: 'grid', gap: '15px' }}>
          {recentApplications.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                padding: '15px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e9ecef'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#333' }}>
                    {app.name}
                  </h3>
                  <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#666' }}>
                    {app.role} • {app.id}
                  </p>
                </div>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '15px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  backgroundColor: app.status === 'Approved' ? '#4CAF50' : 
                                 app.status === 'Interview Scheduled' ? '#FF9800' : '#2196F3',
                  color: 'white'
                }}>
                  {app.status}
                </span>
              </div>
              <div style={{ marginTop: '10px' }}>
                <div style={{
                  width: '100%',
                  height: '6px',
                  backgroundColor: '#e9ecef',
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${app.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    style={{
                      height: '100%',
                      backgroundColor: '#0069b4',
                      borderRadius: '3px'
                    }}
                  />
                </div>
                <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#666' }}>
                  Progress: {app.progress}%
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderMetrics = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ padding: '20px' }}
    >
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <h2 style={{ fontSize: '18px', marginBottom: '20px', color: '#333' }}>
          Administrative Burden Reduction
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: '#0069b4', fontSize: '16px', margin: '0 0 15px 0' }}>
              Processing Time
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ color: '#999' }}>Before:</span>
              <span style={{ color: '#F44336', fontWeight: 'bold' }}>{metrics.administrativeBurden.before}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ color: '#999' }}>After:</span>
              <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>{metrics.administrativeBurden.after}</span>
            </div>
            <div style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#4CAF50',
              marginTop: '10px'
            }}>
              {metrics.administrativeBurden.reduction} reduction
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: '#0069b4', fontSize: '16px', margin: '0 0 15px 0' }}>
              Document Processing
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ color: '#999' }}>Before:</span>
              <span style={{ color: '#F44336', fontWeight: 'bold' }}>{metrics.documentProcessing.before}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ color: '#999' }}>After:</span>
              <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>{metrics.documentProcessing.after}</span>
            </div>
            <div style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#4CAF50',
              marginTop: '10px'
            }}>
              {metrics.documentProcessing.reduction} reduction
            </div>
          </div>
        </div>
      </div>

      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ fontSize: '18px', marginBottom: '20px', color: '#333' }}>
          User Satisfaction Scores
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
          {Object.entries(metrics.userSatisfaction).map(([user, score], index) => (
            <motion.div
              key={user}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              style={{
                textAlign: 'center',
                padding: '20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '10px'
              }}
            >
              <div style={{
                fontSize: '36px',
                fontWeight: 'bold',
                color: '#4CAF50',
                marginBottom: '10px'
              }}>
                {score}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#666',
                textTransform: 'capitalize',
                fontWeight: '500'
              }}>
                {user}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f5f5f5'
      }}
    >
     

      {/* Tab Navigation */}
      <div style={{
        backgroundColor: 'white',
        padding: '10px',
        borderBottom: '1px solid #e9ecef',
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        flexWrap: 'wrap'
      }}>
        {[
          { id: 'dashboard', label: 'Dashboard', icon: '📊' },
          { id: 'integrations', label: 'Connect', icon: '🔗' },
          { id: 'applications', label: 'Apps', icon: '📝' },
          { id: 'metrics', label: 'Impact', icon: '📈' }
        ].map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedTab(tab.id)}
            style={{
              background: selectedTab === tab.id ? '#0069b4' : 'transparent',
              color: selectedTab === tab.id ? 'white' : '#333',
              border: selectedTab === tab.id ? 'none' : '1px solid #ddd',
              borderRadius: '8px',
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              transition: 'all 0.3s ease'
            }}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <AnimatePresence mode="wait">
          {selectedTab === 'dashboard' && renderDashboard()}
          {selectedTab === 'integrations' && renderIntegrations()}
          {selectedTab === 'applications' && renderApplications()}
          {selectedTab === 'metrics' && renderMetrics()}
        </AnimatePresence>
      </div>

      {/* Pulse animation for real-time indicator */}
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </motion.div>
  );
};

export default GovernmentPage;