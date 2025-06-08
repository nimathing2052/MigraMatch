import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TinderStyleCard from './TinderStyleCard';

const AboutPage = () => {
  const [showMatch, setShowMatch] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = screenWidth < 768;
  
  const aboutProfiles = [
    {
      name: "Problem",
      age: "Critical Issues",
      images: [
         process.env.PUBLIC_URL + "/images/hire.png"
      ],
      bio: `1. Labour Shortage
28.3% of German companies can't find qualified workers¹

2. Demographic cliff  
Working population decline by 6 million by 2040²

Stakeholder Impact:
• International Talent: Overwhelmed by requirements & German bureaucracy
• Companies: Limited global reach & administrative burden  
• Government: Growth limitations & gaps in critical and innovative digital platforms`,
      backgroundColor: "#ffebee"
    },
    {
      name: "Why now?",
      age: "Perfect Timing",
      images: [
         process.env.PUBLIC_URL + "/images/paper.png"
      ],
      bio: `Four key factors converging:

• Digital Ministry: Digital transformation needs further shift in Public Sector

• Legal Framework: Fachkräfteeinwanderungsgesetz sets clear targets

• Tip of the Iceberg: Only 200,000 skilled migrants in 2024 vs. 300,000+ needed³

• Gamification: Acceptance of gamification and immersive experience in professional contexts`,
      backgroundColor: "#fff8e1"
    },
    {
      name: "Solution",
      age: "MigraMatch",
      images: [
        process.env.PUBLIC_URL + "/images/migra.jpeg"
      ],
      bio: `Four core pillars:

• Human-first: Direct Employer-Candidate Communication

• Streamlined: Administrative processes area already integrated with existing government systems

• SaaS based: Continuously develop user experience

• Skill-based: Prioritizes abilities & skillsets over credentials`,
      backgroundColor: "#e3f2fd"
    },
    
    {
      name: "Competition",
      age: "Market Analysis",
      images: [
        process.env.PUBLIC_URL + "/images/competition.png"
      ],
      bio: `Current market shortcomings:

Job Platforms:
• Overwhelming for niche seekers
• High costs for small firms  
• Generic experience

Professional Networks:
• Mostly German speaking focus
• Premium costs deter users

Government Migration Platform:
• Standard search engine is available, bad UI`,
      backgroundColor: "#f3e5f5"
    },
    {
      name: "Market Size",
      age: "€40B Opportunity",
      images: [
        process.env.PUBLIC_URL + "/images/tam.png"   
       ],
      bio: `Market Opportunity Breakdown:

TAM Global: €40B
• World wide online recruitment market estimate for 2030⁶

TAM Europe: €8.5B  
• Focus on complete European job market⁵
• Working with EU agencies, Erasmus+, EURES

TAM Germany: €450M
• 1M+ migrants/year⁴
• 300K Skilled Workers/year

Target Markets: United States, Canada, Australia, Heard- and McDonald-Islands, United Kingdom`,
      backgroundColor: "#fff3e0"
    },
    {
      name: "Revenue Streams",
      age: "Multi-Channel",
      images: [
        process.env.PUBLIC_URL + "/images/revenue.png"
      ],
      bio: `Three Revenue Streams:

Short-Term: Government
• Win government contract to get credibility for initial growth as well as international connections

Long Term:
• Employers will be main revenue stream, talent can pay for premium to get one-to-one mentorship and CV screening

Revenue Model:
• Employers: Freemium Model - 10 free postings, €150/additional
• Talent: Basic & Premium - Free basic access, €9.99/month premium  
• Government: SaaS Licensing - First customer, API access licensing`,
      backgroundColor: "#e0f2f1"
    },
    {
      name: "Funding Demand",
      age: "€100K Needed",
      images: [
        process.env.PUBLIC_URL + "/images/demand.png"
      ],
      bio: `€100K needed to win first contract

Breakdown:
• Prototype: €60,000
  Develop the Functional MVP for beta testing and demos (both Mobile & Web Version)

• Marketing: €20,000  
  Secure First Partnership (LOI - Letter of Intent) or pilot contract with government partner by talking to stakeholders

• Integration: €15,000
  Integrate MigraMatch with the techStack and workflows adhering to Public Sector Standards/Framework
`,
      backgroundColor: "#f3e5f5"
    }
  ];

  const handleMatch = () => {
    setShowMatch(true);
    setTimeout(() => {
      setShowMatch(false);
    }, 3000);
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
          profiles={aboutProfiles}
          onMatch={handleMatch}
          showMatch={showMatch}
          setShowMatch={setShowMatch}
          showTags={false}
        />
      </div>
    </motion.div>
  );
};

export default AboutPage;