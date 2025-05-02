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

const LOCAL_STORAGE_KEY = 'profileFormData';

const ProfileEdit = ({ profileData = {} }) => {
  const navigate = useNavigate();
  const { setSignedIn } = useAuthContext();
  const [currentSection, setCurrentSection] = useState(0);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [interestInput, setInterestInput] = useState('');
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tooltip, setTooltip] = useState({ show: false, text: '', x: 0, y: 0 });

  const sections = [
    'foundational', 'introduction', 'purpose', 
    'skills', 'life', 'dreams', 'reflection', 'community'
  ];

  const sectionColors = [
    '#1E88E5', '#6A0DAD', '#1E88E5', 
    '#2E8B57', '#FFA500', '#FF6B6B', 
    '#6A5ACD', '#008080'
  ];

  // Default form data structure
  const defaultFormData = {
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
    skillsToLearn: '',
    mentoring: false,
    localCircles: false,
    creativity: false,
    time: false,
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
    availableFor: '',
    similarSkills: false,
    complementaryStrengths: false,
    openHearted: false,
  };

  // Initialize all state from localStorage or props
  const [formData, setFormData] = useState(() => {
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData) {
        return {
          ...defaultFormData,
          ...JSON.parse(savedData),
        };
      }
      return {
        ...defaultFormData,
        ...profileData,
      };
    } catch (error) {
      console.error('Failed to initialize form data:', error);
      return defaultFormData;
    }
  });

  // Initialize skills, interests, and avatar from saved data
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        if (parsedData.skills) setSkills(parsedData.skills);
        if (parsedData.interests) setInterests(parsedData.interests);
        if (parsedData.avatar) setAvatarPreview(parsedData.avatar);
      }
    } catch (error) {
      console.error('Failed to initialize from localStorage:', error);
    }
  }, []);

  // Combined effect to handle all localStorage saves
  useEffect(() => {
    const saveData = {
      ...formData,
      skills,
      interests,
      avatar: avatarPreview
    };
    
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(saveData));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }, [formData, skills, interests, avatarPreview]);

  // Auth and progress tracking
  useEffect(() => {
    const auth = getAuth();
    if (!auth.currentUser) navigate('/');
    setProgress(((currentSection + 1) / sections.length) * 100);
  }, [currentSection, navigate]);

  const showTooltip = (text, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      show: true,
      text,
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY - 40
    });
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (index) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  const handleAddInterest = (e) => {
    e.preventDefault();
    if (interestInput.trim() && !interests.includes(interestInput.trim())) {
      setInterests([...interests, interestInput.trim()]);
      setInterestInput('');
    }
  };

  const handleRemoveInterest = (index) => {
    const newInterests = [...interests];
    newInterests.splice(index, 1);
    setInterests(newInterests);
  };

  const navigateSection = (direction) => {
    const newSection = direction === 'next' ? currentSection + 1 : currentSection - 1;
    if (newSection >= 0 && newSection < sections.length) {
      setCurrentSection(newSection);
      window.scrollTo(0, 0);
    }
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
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

  const handleResetProfile = () => {
    if (window.confirm('Are you sure you want to reset your profile data?')) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      window.location.reload();
    }
  };

  const handleCompleteProfile = async () => {
    setIsSubmitting(true);
    
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      
      if (!user) {
        navigate('/login');
        return;
      }

      // Prepare the data to be sent to your backend
      const profileData = {
        ...formData,
        skills,
        interests,
        avatar: avatarPreview,
        firebaseUID: user.uid // Include Firebase UID
      };

      // Call your backend API endpoint
      const response = await fetch('https://your-backend-api.com/save-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await user.getIdToken()}`
        },
        body: JSON.stringify(profileData)
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }

      // Clear local storage after successful save
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      
      // Navigate to profile page after a short delay
      setTimeout(() => navigate("/profile"), 1500);
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
      setIsSubmitting(false);
    }
  };

  const sectionComponents = [
    <Foundation key={0} {...{ formData, handleInputChange, avatarPreview, handleAvatarUpload, showTooltip }} />,
    <Self key={1} {...{ formData, handleInputChange, showTooltip }} />,
    <Purpose key={2} {...{ formData, handleInputChange, showTooltip }} />,
    <Skills key={3} formData={formData} handleInputChange={handleInputChange} skills={skills} skillInput={skillInput} setSkillInput={setSkillInput} handleAddSkill={handleAddSkill} handleRemoveSkill={handleRemoveSkill} />,
    <Life key={4} {...{ formData, handleInputChange }} />,
    <Dreams key={5} {...{ formData, handleInputChange }} />,
    <Reflection key={6} {...{ formData, handleInputChange }} />,
    <Community key={7} formData={formData} handleInputChange={handleInputChange} interests={interests} setInterests={setInterests} interestInput={interestInput} setInterestInput={setInterestInput} handleAddInterest={handleAddInterest} handleRemoveInterest={handleRemoveInterest} />
  ];


  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {tooltip.show && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bg-gray-800 text-white p-2 rounded-md shadow-lg z-50 text-sm"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
        </motion.div>
      )}

      <div className="fixed top-0 left-0 right-0 h-2 bg-gray-200 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <main className="container mx-auto pt-6 px-4 pb-16">
        <div className="flex justify-center space-x-2 mb-8 overflow-x-auto py-1">
          {sections.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSection(index)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                index <= currentSection ? 'text-white' : 'bg-gray-200 text-gray-600'
              }`}
              style={{ 
                backgroundColor: index <= currentSection ? sectionColors[index] : undefined,
                transform: currentSection === index ? 'scale(1.1)' : 'scale(1)'
              }}
              onMouseEnter={(e) => showTooltip(sections[index].charAt(0).toUpperCase() + sections[index].slice(1), e)}
              onMouseLeave={() => setTooltip(prev => ({ ...prev, show: false }))}
            >
              {index + 1}
            </motion.button>
          ))}
        </div>

        {sectionComponents[currentSection]}

        <motion.div 
          className="flex justify-between items-center max-w-4xl mx-auto mt-10 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.button
            onClick={() => navigateSection('prev')}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            disabled={currentSection === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium shadow-md ${
              currentSection === 0 ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-[#23465a] text-white hover:bg-gray-800'
            }`}
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Previous
          </motion.button>

          {currentSection < sections.length - 1 ? (
            <motion.button
              onClick={() => navigateSection('next')}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 bg-[#1E88E5] text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-[#1565C0]"
            >
              Next
              <ArrowRightIcon className="w-5 h-5" />
            </motion.button>
          ) : (
            <div className="flex gap-4">
              <motion.button
                onClick={handleResetProfile}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2 bg-gray-500 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-gray-600"
              >
                Reset
              </motion.button>
              <motion.button
                onClick={handleCompleteProfile}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2 bg-[#2E8B57] text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-[#3CB371]"
              >
                Complete Profile
                <CheckCircleIcon className="w-5 h-5" />
              </motion.button>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

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

export default ProfileEdit;