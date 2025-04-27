import React from 'react';
import { Link } from 'react-router-dom'

const ProfileDisplay = () => {
  // Sample data
  const profileData = {
    name: "Example",
    location: "SaltLake, Sec V",
    languages: "English",
    avatar: "https://images.generated.photos/Ue6VJO_Vpht_z8CYWPXzs8tf-Ym2SkBWk32dF9DONdg/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/Nzc2MTc2LmpwZw.jpg",
    about: "Full-stack developer passionate about building inclusive tech communities. Believer in lifelong learning and open-source contributions.",
    describeSelf: "Curious ✦ Creative ✦ Compassionate",
    friendDescription: "Always has the best playlist recommendations",
    lifeMantra: "Empower through education & collaboration",
    whyThrive: "To connect with diverse minds shaping the future of tech",
    goodLife: "Balance between meaningful work and personal growth",
    aspirations: "Build accessible developer tools for underrepresented communities",
    noPressure: "Travel while teaching coding in rural areas",
    millionDollar: "Decentralized education platform with AI mentors",
    skills: ["React", "Node.js", "GraphQL", "TypeScript", "AWS"],
    skillsToLearn: "Rust, Web3 Development",
    contributions: ["Mentoring", "Open Source", "Tech Talks"],
    learned: "Advanced state management patterns in React",
    hobbies: "Urban gardening ✦ Jazz piano ✦ Hiking",
    feelAlive: "When solving complex problems with elegant code",
    communityDrawn: "Inclusive spaces valuing diversity & experimentation",
    wildestDream: "AI-powered education accessible to every village",
    worldBuild: "Decentralized knowledge-sharing ecosystem",
    unlearned: "That success requires constant hustle",
    fiveYearsAgo: "Junior dev afraid to ask questions",
    peace: "Confidence in continuous growth",
    futureMessage: "Remember why you started this journey!",
    interests: ["EdTech", "Web3", "Community Building"],
    availableFor: "Mentorship & Project Collaboration",
    connections: ["Frontend Experts", "Education Advocates"]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-[#23465a]/90 backdrop-blur-sm text-white fixed w-full top-0 z-50 px-6 py-4 flex items-center justify-between shadow-xl">
        <button className="mr-30 flex items-center space-x-2 bg-[#1E88E5] hover:bg-[#1565C0] transition-all duration-300 px-5 py-2.5 rounded-lg shadow-sm group ml-auto">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 group-hover:rotate-12 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          <Link to="/edit" className="font-medium">
            Edit Profile
          </Link>
        </button>
      </nav>
  
      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-[#c4e3f5] to-[#f5d4e3] rounded-2xl p-8 shadow-xl">
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden transition-transform duration-300 hover:scale-105">
                  <img 
                    src={profileData.avatar} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
  
              <div className="text-center md:text-left space-y-2">
                <h1 className="text-4xl font-bold text-[#2A2A2A] font-sans">
                  {profileData.name}
                </h1>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-gray-700">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-[#1E88E5]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>{profileData.location}</span>
                  </div>
  
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-[#1E88E5]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                    </svg>
                    <span>{profileData.languages}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          {/* Profile Sections Grid */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              <SectionCard title="About">
                <p className="text-gray-600 leading-relaxed mb-6">
                  {profileData.about}
                </p>
                <DetailItem label="In 3 words" value={profileData.describeSelf} />
                <DetailItem label="As my friend would say" value={profileData.friendDescription} />
                
                <HighlightCard>
                  {/* Enhanced Life Mantra Highlighting */}
                  <div className="bg-[#FFFFED] p-4 rounded-lg shadow-lg">
                    <DetailItem 
                      label="Life Mantra" 
                      value={profileData.lifeMantra} 
                      highlight
                    />
                  </div>
                </HighlightCard>
              </SectionCard>
  
              <SectionCard title="Purpose & Vision">
                <DetailItem label="Why Thrive?" value={profileData.whyThrive} />
                <DetailItem label="My 'Good Life'" value={profileData.goodLife} />
                <DetailItem label="Current Aspirations" value={profileData.aspirations} />
                <div className="space-y-4">
                  <DetailItem label="Without Financial Pressure" value={profileData.noPressure} />
                  <DetailItem label="With $1 Million" value={profileData.millionDollar} />
                  <DetailItem label="Wildest Dream" value={profileData.wildestDream} />
                  <DetailItem label="World to Build" value={profileData.worldBuild} />
                </div>
              </SectionCard>
            </div>
  
            {/* Right Column */}
            <div className="space-y-8">
              <SectionCard title="Skills & Contributions">
                <TagList items={profileData.skills} color="blue" />
                <DetailItem label="Skills to Develop" value={profileData.skillsToLearn} />
                <TagList items={profileData.contributions} color="green" />
                <DetailItem label="Learned on Platform" value={profileData.learned} />
              </SectionCard>
  
              <SectionCard title="Life & Community">
                <DetailItem label="Hobbies & Joys" value={profileData.hobbies} />
                <DetailItem label="What Makes Me Feel Alive" value={profileData.feelAlive} />
                <DetailItem label="Drawn to Communities" value={profileData.communityDrawn} />
                <TagList items={profileData.interests} color="indigo" />
                <DetailItem label="Available For" value={profileData.availableFor} />
                <TagList items={profileData.connections} color="yellow" />
              </SectionCard>
  
              <SectionCard title="Reflections">
                <DetailItem label="Recently Unlearned" value={profileData.unlearned} />
                <DetailItem label="Five Years Ago" value={profileData.fiveYearsAgo} />
                <DetailItem label="Peace Means" value={profileData.peace} />
                
                {/* Enhanced Message to Future Self Highlighting */}
                <div className="bg-[#CBC3E3] text-white p-4 rounded-lg shadow-lg">
                  <HighlightCard color="purple">
                    <DetailItem 
                      label="Message to Future Self" 
                      value={profileData.futureMessage} 
                      highlight
                    />
                  </HighlightCard>
                </div>
              </SectionCard>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
  
};

// Reusable Components
const SectionCard = ({ title, children }) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
    <h2 className="text-2xl font-bold text-gray-800 mb-6 font-sans border-b-2 border-[#1E88E5] pb-2">
      {title}
    </h2>
    <div className="space-y-6">{children}</div>
  </div>
);

const DetailItem = ({ label, value, highlight }) => (
  <div className={`${highlight ? 'p-4 rounded-xl bg-opacity-10' : ''}`}>
    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1.5">
      {label}
    </h3>
    <p className={`${highlight ? 'text-lg' : 'text-base'} text-gray-800 leading-relaxed`}>
      {value}
    </p>
  </div>
);

const TagList = ({ items, color = 'blue' }) => (
  <div className="flex flex-wrap gap-2 mt-2">
    {items.map((item, index) => (
      <span 
        key={index}
        className={`px-3 py-1 rounded-full text-sm font-medium bg-${color}-100 text-${color}-800 hover:bg-${color}-200 transition-colors`}
      >
        {item}
      </span>
    ))}
  </div>
);

const HighlightCard = ({ children, color = 'blue' }) => (
  <div className={`bg-${color}-50 p-4 rounded-xl border-l-4 border-${color}-500 mt-4`}>
    {children}
  </div>
);

export default ProfileDisplay;