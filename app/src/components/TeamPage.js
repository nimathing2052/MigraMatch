import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TinderStyleCard from './TinderStyleCard';

const TeamPage = () => {
  const [showMatch, setShowMatch] = useState(false);
  
  const teamProfiles = [
    {
      name: "Nima",
      age: "29",
      images: [
        process.env.PUBLIC_URL + "/images/nima.jpeg"
      ],
      bio: `Data Scientist solving global challenges 🧠

• Data Scientist @ Welthungerhilfe 🌍
• AI/ML expertise in matching algorithms and NLP 🤖
• Product design with focus on user experience 🎨
• Proven track record in engeneering solutions 💻`,
      backgroundColor: "#ede7f6",
      role: "Chief Data Officer",
      company: "MigraMatch",
      location: "Berlin, Germany"
    },
    {
      name: "Johannes",
      age: "27",
      images: [
        process.env.PUBLIC_URL + "/images/johannes.jpg"
      ],
      bio: `GenAI Engineer with policy expertise 🤖🏛️

• GenAI Engineer @ Accenture 💻
• Former policy advisor in German Bundestag 🏛️
• General Manager at KlimaUnion 🌱
• Technical skills combined with policy understanding 🔄`,
      backgroundColor: "#e3f2fd",
      role: "Chief Technology Officer",
      company: "MigraMatch",
      location: "Berlin, Germany"
    }
  ];

  const handleMatch = () => {
    setShowMatch(true);
    // Keep match overlay visible longer for investor page
    setTimeout(() => {
      setShowMatch(false);
    }, 5000);
  };

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
          profiles={teamProfiles}
          onMatch={handleMatch}
          showMatch={showMatch}
          setShowMatch={setShowMatch}
          showTags={false}
        />
      </div>
    </motion.div>
  );
};

export default TeamPage;