import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useAuthContext } from '../../App';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import Foundation from './sections/Foundation';
import Self from './sections/Self';
import Purpose from './sections/Purpose';
import Dreams from './sections/Dreams';
import Life from './sections/Life';
import Community from './sections/Community';
import Reflection from './sections/Reflection';
import Skills from './sections/Skills';

const ProfileEdit = ({ profileData }) => {
  const navigate = useNavigate();
  const { setSignedIn } = useAuthContext();
  const [currentSection, setCurrentSection] = useState(0);
  const [avatarPreview, setAvatarPreview] = useState(profileData?.avatar || '');
  const [skills, setSkills] = useState(profileData?.skills || []);
  const [interests, setInterests] = useState(profileData?.interests || []);
  const [skillInput, setSkillInput] = useState('');
  const [interestInput, setInterestInput] = useState('');
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const sections = [
    'foundational', 'introduction', 'purpose', 
    'skills', 'life', 'dreams', 'reflection', 'community'
  ];

  const sectionColors = {
    0: '#1E88E5', // Foundational - Blue
    1: '#6A0DAD', // Introduction - Purple
    2: '#1E88E5', // Purpose - Blue
    3: '#2E8B57', // Skills - Green
    4: '#FFA500', // Life - Orange
    5: '#FF6B6B', // Dreams - Red
    6: '#6A5ACD', // Reflection - Indigo
    7: '#008080', // Community - Teal
  };

  const [formData, setFormData] = useState({
    fullName: profileData?.fullName || '',
    location: profileData?.location || '',
    languages: profileData?.languages || '',
    aboutYourself: profileData?.aboutYourself || '',
    describeSelf: profileData?.describeSelf || '',
    friendDescription: profileData?.friendDescription || '',
    lifeMantra: profileData?.lifeMantra || '',
    whyThrive: profileData?.whyThrive || '',
    goodLife: profileData?.goodLife || '',
    lifeAspirations: profileData?.lifeAspirations || '',
    noFinancialPressure: profileData?.noFinancialPressure || '',
    millionDollarCreation: profileData?.millionDollarCreation || '',
    skillsToLearn: profileData?.skillsToLearn || '',
    mentoring: profileData?.contributions?.includes('Mentoring') || false,
    localCircles: profileData?.contributions?.includes('Starting Local Circles') || false,
    creativity: profileData?.contributions?.includes('Your Creativity') || false,
    time: profileData?.contributions?.includes('Your Time') || false,
    learnedSoFar: profileData?.learnedSoFar || '',
    hobbies: profileData?.hobbies || '',
    feelAlive: profileData?.feelAlive || '',
    communityDrawn: profileData?.communityDrawn || '',
    wildestDream: profileData?.wildestDream || '',
    worldToBuild: profileData?.worldToBuild || '',
    unlearned: profileData?.unlearned || '',
    fiveYearsAgo: profileData?.fiveYearsAgo || '',
    peaceDefinition: profileData?.peaceDefinition || '',
    futureMessage: profileData?.futureMessage || '',
    availableFor: profileData?.availableFor || '',
    similarSkills: profileData?.similarSkills || false,
    complementaryStrengths: profileData?.complementaryStrengths || false,
    openHearted: profileData?.openHearted || false,
  });

  useEffect(() => {
    const newProgress = ((currentSection + 1) / sections.length) * 100;
    setProgress(newProgress);
  }, [currentSection, sections.length]);

  // Check if user is authenticated, if not redirect to login
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      navigate('/');
    }
  }, [navigate]);

  const showFieldTooltip = (text, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY - 40
    });
    setTooltipText(text);
    setShowTooltip(true);
  };

  const hideTooltip = () => {
    setShowTooltip(false);
  };

  const handleSectionNavigation = (direction) => {
    if (direction === 'next' && currentSection < sections.length - 1) {
      setCurrentSection(prev => {
        window.scrollTo(0, 0);
        return prev + 1;
      });
    } else if (direction === 'prev' && currentSection > 0) {
      setCurrentSection(prev => {
        window.scrollTo(0, 0);
        return prev - 1;
      });
    }
  };

  const handleSkillAdd = (e) => {
    if ((e.key === 'Enter' || e.type === 'click') && skillInput.trim()) {
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
        setSkillInput('');
      }
      if (e.key === 'Enter') e.preventDefault();
    }
  };

  const removeSkill = (index) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  const handleInterestAdd = (e) => {
    if ((e.key === 'Enter' || e.type === 'click') && interestInput.trim()) {
      if (!interests.includes(interestInput.trim())) {
        setInterests([...interests, interestInput.trim()]);
        setInterestInput('');
      }
      if (e.key === 'Enter') e.preventDefault();
    }
  };

  const removeInterest = (index) => {
    const newInterests = [...interests];
    newInterests.splice(index, 1);
    setInterests(newInterests);
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCompleteProfile = async () => {
    setIsSubmitting(true);
    // For demo purposes, just navigate home
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Tooltip */}
      {showTooltip && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bg-gray-800 text-white p-2 rounded-md shadow-lg z-50 text-sm"
          style={{ left: tooltipPosition.x, top: tooltipPosition.y }}
        >
          {tooltipText}
        </motion.div>
      )}

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-2 bg-gray-200 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      </div>

      {/* Navigation */}
      <main className="container mx-auto pt-6 px-4 pb-16">
      {/* Section Navigation */}
      <div className="flex justify-center space-x-2 mb-8 overflow-x-auto py-1">
        {sections.map((section, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSection(index)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
              index <= currentSection 
                ? `bg-${sectionColors[index]} text-white` 
                : 'bg-gray-200 text-gray-600'
            }`}
            style={{ 
              backgroundColor: index <= currentSection ? sectionColors[index] : undefined,
              transform: currentSection === index ? 'scale(1.1)' : 'scale(1)'
            }}
            onMouseEnter={(e) => showFieldTooltip(sections[index].charAt(0).toUpperCase() + sections[index].slice(1), e)}
            onMouseLeave={hideTooltip}
          >
            {index + 1}
          </motion.button>
        ))}
      </div>

        {/* Foundational Information */}
        {currentSection === 0 && (
        <Foundation
          formData={formData}
          handleInputChange={handleInputChange}
          avatarPreview={avatarPreview}
          handleAvatarUpload={handleAvatarUpload}
          showFieldTooltip={showFieldTooltip}
          hideTooltip={hideTooltip}
        />
      )}

        {/* Self Introduction */}
        {currentSection === 1 && (
        <Self 
          formData={formData}
          handleInputChange={handleInputChange}
          showFieldTooltip={showFieldTooltip}
          hideTooltip={hideTooltip}
        />
      )}


       {/* Purpose and Intention */}
       {currentSection === 2 && (
        <Purpose 
          formData={formData}
          handleInputChange={handleInputChange}
          showFieldTooltip={showFieldTooltip}
          hideTooltip={hideTooltip}
        />
      )}
{/* Skills and Strengths */}
{currentSection === 3 && (
  <Skills
  formData={formData}
  handleInputChange={handleInputChange}
  skills={skills}
  skillInput={skillInput}
  setSkillInput={setSkillInput}
  removeSkill={removeSkill}
  handleSkillAdd={handleSkillAdd}
/>
)}


{/* Life and Energy */}
{currentSection === 4 && (
  <Life 
  formData={formData} 
  handleInputChange={handleInputChange} 
/>
)}


{/* Dreams and Imagination */}
{currentSection === 5 && (
 <Dreams 
 formData={formData} 
 handleInputChange={handleInputChange} 
/>
)}

{/* Reflection and Evolution */}
{currentSection === 6 && (
  <Reflection 
  formData={formData} 
  handleInputChange={handleInputChange} 
/>
)}


{/* Community Discovery */}
{currentSection === 7 && (
   <Community 
   formData={formData} 
   handleInputChange={handleInputChange} 
 />
)}
{/* Navigation Buttons */}
<motion.div 
  className="flex justify-between items-center max-w-4xl mx-auto mt-10 px-4"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
>
  {/* Previous Button */}
  <motion.button
    onClick={() => handleSectionNavigation('prev')}
    whileTap={{ scale: 0.95 }}
    whileHover={{ scale: 1.02 }}
    disabled={currentSection === 0}
    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all shadow-md 
      ${currentSection === 0 ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-[#23465a] text-white hover:bg-gray-800'}
    `}
  >
    <ArrowLeftIcon className="w-5 h-5" />
    Previous
  </motion.button>

  {/* Next or Complete Button */}
  {currentSection < sections.length - 1 ? (
    <motion.button
      onClick={() => handleSectionNavigation('next')}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      className="flex items-center gap-2 bg-[#1E88E5] text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-[#1565C0] transition-all"
    >
      Next
      <ArrowRightIcon className="w-5 h-5" />
    </motion.button>
  ) : (
    <motion.button
      onClick={handleCompleteProfile}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      className="flex items-center gap-2 bg-[#2E8B57] text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-[#3CB371] transition-all"
    >
      Complete Profile
      <CheckCircleIcon className="w-5 h-5" />
    </motion.button>
  )}
</motion.div>
      </main>
    </div>
  );
};
// Reusable Components
const InputField = ({ label, name, value, onChange, textarea = false }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    {textarea ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1E88E5] h-32"
      />
    ) : (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1E88E5]"
      />
    )}
  </div>
);

const Checkbox = ({ label, name, checked, onChange }) => (
  <label className="flex items-center space-x-3">
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className="w-5 h-5 text-[#1E88E5] rounded focus:ring-[#1E88E5]"
    />
    <span className="text-gray-700">{label}</span>
  </label>
);

const SelectField = ({ label, name, value, onChange, options }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1E88E5]"
    >
      <option value="">Select an option</option>
      {options.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

// Prop Types
ProfileEdit.propTypes = {
    profileData: PropTypes.shape({
      avatar: PropTypes.string,
      fullName: PropTypes.string,
      location: PropTypes.string,
      languages: PropTypes.string,
      aboutYourself: PropTypes.string,
      describeSelf: PropTypes.string,
      friendDescription: PropTypes.string,
      lifeMantra: PropTypes.string,
      whyThrive: PropTypes.string,
      goodLife: PropTypes.string,
      lifeAspirations: PropTypes.string,
      noFinancialPressure: PropTypes.string,
      millionDollarCreation: PropTypes.string,
      skills: PropTypes.arrayOf(PropTypes.string),
      skillsToLearn: PropTypes.string,
      contributions: PropTypes.arrayOf(PropTypes.string),
      learnedSoFar: PropTypes.string,
      hobbies: PropTypes.string,
      feelAlive: PropTypes.string,
      communityDrawn: PropTypes.string,
      wildestDream: PropTypes.string,
      worldToBuild: PropTypes.string,
      unlearned: PropTypes.string,
      fiveYearsAgo: PropTypes.string,
      peaceDefinition: PropTypes.string,
      futureMessage: PropTypes.string,
      interests: PropTypes.arrayOf(PropTypes.string),
      availableFor: PropTypes.string,
      similarSkills: PropTypes.bool,
      complementaryStrengths: PropTypes.bool,
      openHearted: PropTypes.bool,
    })
  };
  
  ProfileEdit.defaultProps = {
    profileData: {
      avatar: '',
      fullName: '',
      location: '',
      languages: '',
      aboutYourself: '',
      describeSelf: '',
      friendDescription: '',
      lifeMantra: '',
      whyThrive: '',
      goodLife: '',
      lifeAspirations: '',
      noFinancialPressure: '',
      millionDollarCreation: '',
      skills: [],
      skillsToLearn: '',
      contributions: [],
      learnedSoFar: '',
      hobbies: '',
      feelAlive: '',
      communityDrawn: '',
      wildestDream: '',
      worldToBuild: '',
      unlearned: '',
      fiveYearsAgo: '',
      peaceDefinition: '',
      futureMessage: '',
      interests: [],
      availableFor: '',
      similarSkills: false,
      complementaryStrengths: false,
      openHearted: false,
    }
  };
  
  export default ProfileEdit;