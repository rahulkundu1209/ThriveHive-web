import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Add onAuthStateChanged
import { useAuthContext } from "../../App";

const LOCAL_STORAGE_KEY = 'profileFormData';

const ProfileDisplay = () => {
  const { userName } = useAuthContext();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);
  const auth = getAuth();

  // Get default profile data structure
  const getDefaultProfileData = (name, photo) => ({
    fullName: name || 'Not available',
    location: 'Not available',
    languages: 'Not available',
    avatar: photo || '', // Use the passed photo URL
    // ... rest of the fields remain the same
    aboutYourself: 'Not available',
    describeSelf: 'Not available',
    friendDescription: 'Not available',
    lifeMantra: 'Not available',
    whyThrive: 'Not available',
    goodLife: 'Not available',
    lifeAspirations: 'Not available',
    noFinancialPressure: 'Not available',
    millionDollarCreation: 'Not available',
    skills: [],
    skillsToLearn: 'Not available',
    mentoring: false,
    localCircles: false,
    creativity: false,
    time: false,
    learnedSoFar: 'Not available',
    hobbies: 'Not available',
    feelAlive: 'Not available',
    communityDrawn: 'Not available',
    wildestDream: 'Not available',
    worldToBuild: 'Not available',
    unlearned: 'Not available',
    fiveYearsAgo: 'Not available',
    peaceDefinition: 'Not available',
    futureMessage: 'Not available',
    availableFor: 'Not available',
    similarSkills: false,
    complementaryStrengths: false,
    openHearted: false,
    interests: []
  });

  // Fetch profile data from backend
  const fetchProfileFromBackend = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('No authenticated user');
      }

      const idToken = await user.getIdToken();
      const response = await fetch('http://localhost:5000/api/profile/get', {
        headers: {
          'Authorization': `Bearer ${idToken}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  };

  // Set up auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserPhoto(user.photoURL);
      } else {
        setUserPhoto(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  // Load profile data
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to get from backend first
        try {
          const backendData = await fetchProfileFromBackend();
          if (backendData && !backendData.error) {
            // Merge backend data with current photo
            setProfileData({
              ...getDefaultProfileData(userName, userPhoto),
              ...backendData,
              avatar: backendData.avatar || userPhoto // Prefer backend avatar, fallback to Firebase photo
            });
            setLoading(false);
            return;
          }
        } catch (backendError) {
          console.log('Falling back to local storage due to:', backendError);
        }
        
        // Fallback to localStorage if backend fails
        const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setProfileData({
            ...getDefaultProfileData(userName, userPhoto),
            ...parsedData,
            avatar: parsedData.avatar || userPhoto // Prefer saved avatar, fallback to Firebase photo
          });
        } else {
          setProfileData(getDefaultProfileData(userName, userPhoto));
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading profile data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    // Only try to load if we have an authenticated user
    if (auth.currentUser) {
      loadProfileData();
    } else {
      setError('Please sign in to view your profile');
      setLoading(false);
    }
  }, [userName, auth, userPhoto]); // Add userPhoto to dependencies


  // Helper function to get value or "Not available"
  const getValue = (value, defaultValue = 'Not available') => {
    if (value === undefined || value === null || value === '') return defaultValue;
    if (Array.isArray(value) && value.length === 0) return defaultValue;
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    return value;
  };

  // Format contributions array from checkboxes
  const formatContributions = () => {
    const contributions = [];
    if (profileData?.mentoring) contributions.push('Mentoring');
    if (profileData?.localCircles) contributions.push('Local Circles');
    if (profileData?.creativity) contributions.push('Creativity');
    if (profileData?.time) contributions.push('Time');
    return contributions.length > 0 ? contributions : ['Not available'];
  };

  // Format connection preferences
  const formatConnectionPreferences = () => {
    const prefs = [];
    if (profileData?.similarSkills) prefs.push('Similar Skills');
    if (profileData?.complementaryStrengths) prefs.push('Complementary Strengths');
    if (profileData?.openHearted) prefs.push('Open Hearted');
    return prefs.length > 0 ? prefs : ['Not specified'];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-700 text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-4">Error Loading Profile</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          {error === 'Please sign in to view your profile' ? (
            <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Go to Login
            </Link>
          ) : (
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-10 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Edit Profile Button */}
        <div className="max-w-7xl mx-auto mb-10 flex justify-end">
          <Link 
            to="/edit" 
            className="flex items-center space-x-2 bg-[#1E88E5] hover:bg-[#1565C0] transition-all duration-300 px-5 py-2.5 rounded-xl shadow-md"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            <span className="font-medium text-white">Edit Profile</span>
          </Link>
        </div>
  
        {/* Profile Header */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-[#c4e3f5]/80 to-[#f5d4e3]/80 rounded-3xl p-8 shadow-2xl backdrop-blur-lg border border-white/30">
            <div className="flex flex-col md:flex-row items-center gap-10">
              {/* Avatar */}
              <div className="relative group hover:scale-105 transition-transform duration-300">
                <div className="w-36 h-36 rounded-full border-4 border-white shadow-xl overflow-hidden ring-4 ring-blue-200 group-hover:ring-blue-400 transition-all duration-300">
                  <img 
                    src={getValue(profileData.avatar, 'https://via.placeholder.com/150')} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150';
                    }}
                  />
                </div>
              </div>
  
              {/* Info */}
              <div className="text-center md:text-left space-y-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#2A2A2A] font-sans tracking-tight">
                  {getValue(profileData.fullName)}
                </h1>
  
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-10 space-y-3 sm:space-y-0 text-gray-700 text-lg font-medium">
                  <div className="flex items-center space-x-2">
                    <svg className="w-6 h-6 text-[#1E88E5]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>{getValue(profileData.location)}</span>
                  </div>
  
                  <div className="flex items-center space-x-2">
                    <svg className="w-6 h-6 text-[#1E88E5]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                    </svg>
                    <span>{getValue(profileData.languages)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          {/* Profile Sections */}
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left Column */}
            <div className="space-y-10">
              <SectionCard title="About Me">
                <p className="text-gray-700 text-base leading-relaxed mb-6">
                  {getValue(profileData.aboutYourself)}
                </p>
                <DetailItem label="Describe yourself in 3 words" value={getValue(profileData.describeSelf)} />
                <DetailItem label="How would a friend describe you?" value={getValue(profileData.friendDescription)} />
                <div className="bg-yellow-100/60 p-5 rounded-xl">
                  <DetailItem 
                    label="✨ Life Mantra" 
                    value={getValue(profileData.lifeMantra)} 
                    highlight 
                  />
                </div>
              </SectionCard>
  
              <SectionCard title="🌱 Purpose & Vision">
                <DetailItem label="Why do you want to thrive?" value={getValue(profileData.whyThrive)} />
                <DetailItem label="What does a 'good life' mean to you?" value={getValue(profileData.goodLife)} />
                <DetailItem label="Current life aspirations" value={getValue(profileData.lifeAspirations)} />
              </SectionCard>
  
              <SectionCard title="💭 Dreams & Imagination">
                <DetailItem label="What would you do with no financial pressure?" value={getValue(profileData.noFinancialPressure)} />
                <DetailItem label="What would you create with $1 million?" value={getValue(profileData.millionDollarCreation)} />
                <DetailItem label="Your wildest dream" value={getValue(profileData.wildestDream)} />
                <DetailItem label="The world you want to build" value={getValue(profileData.worldToBuild)} />
              </SectionCard>
            </div>
  
            {/* Right Column */}
            <div className="space-y-10">
              <SectionCard title="🛠 Skills & Growth">
                <TagList items={getValue(profileData.skills, []).length > 0 ? profileData.skills : ['Not available']} color="blue" />
                <DetailItem label="Skills you want to learn" value={getValue(profileData.skillsToLearn)} />
                <DetailItem label="What have you learned so far?" value={getValue(profileData.learnedSoFar)} />
              </SectionCard>
  
              <SectionCard title="🤝 Contributions">
                <TagList items={formatContributions()} color="green" />
                <DetailItem label="What are you available for?" value={getValue(profileData.availableFor)} />
                <DetailItem label="Connection preferences" value={formatConnectionPreferences().join(', ')} />
              </SectionCard>
  
              <SectionCard title="🌍 Life & Community">
                <DetailItem label="Hobbies & interests" value={getValue(profileData.hobbies)} />
                <DetailItem label="What makes you feel alive?" value={getValue(profileData.feelAlive)} />
                <DetailItem label="What communities are you drawn to?" value={getValue(profileData.communityDrawn)} />
                <TagList items={getValue(profileData.interests, []).length > 0 ? profileData.interests : ['Not available']} color="indigo" />
              </SectionCard>
  
              <SectionCard title="🧠 Reflections & Growth">
                <DetailItem label="What have you recently unlearned?" value={getValue(profileData.unlearned)} />
                <DetailItem label="Where were you five years ago?" value={getValue(profileData.fiveYearsAgo)} />
                <DetailItem label="What does peace mean to you?" value={getValue(profileData.peaceDefinition)} />
                <div className="bg-purple-100/60 p-5 rounded-xl">      
                  <DetailItem 
                    label="📩 Message to your future self" 
                    value={getValue(profileData.futureMessage)} 
                    highlight 
                  />
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
  <div className="bg-white/90 rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 backdrop-blur-sm">
    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6 border-b-2 border-blue-400/50 pb-2 tracking-tight">
      {title}
    </h2>
    <div className="space-y-6">{children}</div>
  </div>
);

const DetailItem = ({ label, value, highlight }) => (
  <div className={`flex flex-col gap-1 ${highlight ? 'bg-blue-50 p-5 rounded-xl border border-blue-200 shadow-sm' : ''}`}>
    <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
      {label}
    </span>
    <span className={`text-gray-800 ${highlight ? 'text-lg font-semibold' : 'text-base'}`}>
      {value}
    </span>
  </div>
);

const TagList = ({ items, color = 'blue' }) => (
  <div className="flex flex-wrap gap-2 mt-2">
    {items.map((item, index) => (
      <span
        key={index}
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          color === 'blue' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' :
          color === 'green' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
          color === 'indigo' ? 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200' :
          'bg-gray-100 text-gray-800 hover:bg-gray-200'
        } hover:scale-105 transition-all duration-150`}
      >
        {item}
      </span>
    ))}
  </div>
);

export default ProfileDisplay;