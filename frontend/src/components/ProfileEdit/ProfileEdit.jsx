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
  const [saveStatus, setSaveStatus] = useState({ message: '', isError: false });
  const [isLoading, setIsLoading] = useState(true);

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

  // Initialize all state
  const [formData, setFormData] = useState(defaultFormData);

  // Load profile data on mount
  useEffect(() => {
    const loadProfileData = async () => {
      setIsLoading(true);
      try {
        const auth = getAuth();
        if (!auth.currentUser) {
          navigate('/');
          return;
        }

        const idToken = await auth.currentUser.getIdToken();
        const response = await fetch('http://localhost:5000/api/profile/get', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${idToken}`
          }
        });

        if (response.ok) {
          const { data } = await response.json();
          
          if (data) {
            // If profile exists in backend, use that data
            setFormData(prev => ({
              ...defaultFormData,
              ...data
            }));
            if (data.skills) setSkills(data.skills);
            if (data.interests) setInterests(data.interests);
            if (data.avatar) setAvatarPreview(data.avatar);
          } else {
            // No profile exists, check localStorage for draft
            const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (savedData) {
              const parsedData = JSON.parse(savedData);
              setFormData(prev => ({
                ...defaultFormData,
                ...parsedData
              }));
              if (parsedData.skills) setSkills(parsedData.skills);
              if (parsedData.interests) setInterests(parsedData.interests);
              if (parsedData.avatar) setAvatarPreview(parsedData.avatar);
            }
          }
        }
      } catch (error) {
        console.error('Failed to load profile:', error);
        // Fallback to localStorage if backend fails
        const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setFormData(prev => ({
            ...defaultFormData,
            ...parsedData
          }));
          if (parsedData.skills) setSkills(parsedData.skills);
          if (parsedData.interests) setInterests(parsedData.interests);
          if (parsedData.avatar) setAvatarPreview(parsedData.avatar);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadProfileData();
  }, [navigate]);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (isLoading) return;
    
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
  }, [formData, skills, interests, avatarPreview, isLoading]);

  // Update progress when section changes
  useEffect(() => {
    setProgress(((currentSection + 1) / sections.length) * 100);
  }, [currentSection]);

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

  const handleListUpdate = (type, e) => {
    const input = type === 'skill' ? skillInput : interestInput;
    const setInput = type === 'skill' ? setSkillInput : setInterestInput;
    const setList = type === 'skill' ? setSkills : setInterests;
    const list = type === 'skill' ? skills : interests;

    if ((e.key === 'Enter' || e.type === 'click') && input.trim()) {
      if (!list.includes(input.trim())) {
        setList([...list, input.trim()]);
        setInput('');
      }
      if (e.key === 'Enter') e.preventDefault();
    }
  };

  const removeItem = (type, index) => {
    const setList = type === 'skill' ? setSkills : setInterests;
    setList(prev => prev.filter((_, i) => i !== index));
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
      setFormData(defaultFormData);
      setSkills([]);
      setInterests([]);
      setAvatarPreview('');
    }
  };

  const saveProfileToBackend = async (profileData) => {
    try {
      const auth = getAuth();
      const idToken = await auth.currentUser.getIdToken();
      
      const response = await fetch('http://localhost:5000/api/profile/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify(profileData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to save profile');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error saving profile:', error);
      throw error;
    }
  };

  const handleCompleteProfile = async () => {
    setIsSubmitting(true);
    setSaveStatus({ message: '', isError: false });
    
    try {
      // Prepare the data to send to backend
      const profileToSave = {
        ...formData,
        skills,
        interests,
        avatar: avatarPreview
      };

      // Save to backend
      const response = await saveProfileToBackend(profileToSave);
      
      if (response.success) {
        setSaveStatus({ 
          message: response.message || 'Profile saved successfully!', 
          isError: false 
        });
        // Clear local storage after successful save
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        
        // Navigate after a short delay
        setTimeout(() => navigate("/profile"), 1500);
      } else {
        setSaveStatus({ 
          message: response.error || 'Failed to save profile. Please try again.', 
          isError: true 
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      setSaveStatus({ 
        message: error.message || 'An error occurred while saving your profile.', 
        isError: true 
      });
      setIsSubmitting(false);
    }
  };

  const sectionComponents = [
    <Foundation key={0} formData={formData} handleInputChange={handleInputChange} avatarPreview={avatarPreview} handleAvatarUpload={handleAvatarUpload} showTooltip={showTooltip} />,
    <Self key={1} formData={formData} handleInputChange={handleInputChange} showTooltip={showTooltip} />,
    <Purpose key={2} formData={formData} handleInputChange={handleInputChange} showTooltip={showTooltip} />,
    <Skills 
      key={3} 
      formData={formData} 
      handleInputChange={handleInputChange} 
      skills={skills} 
      skillInput={skillInput} 
      setSkillInput={setSkillInput} 
      handleAddSkill={handleAddSkill} 
      handleRemoveSkill={handleRemoveSkill} 
    />,
    <Life key={4} formData={formData} handleInputChange={handleInputChange} />,
    <Dreams key={5} formData={formData} handleInputChange={handleInputChange} />,
    <Reflection key={6} formData={formData} handleInputChange={handleInputChange} />,
    <Community 
      key={7} 
      formData={formData} 
      handleInputChange={handleInputChange} 
      interests={interests} 
      setInterests={setInterests} 
      interestInput={interestInput} 
      setInterestInput={setInterestInput} 
      handleAddInterest={handleAddInterest} 
      handleRemoveInterest={handleRemoveInterest} 
    />
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

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

      <div className="fixed top-20 left-0 right-0 h-2 bg-gray-200 z-10">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {saveStatus.message && (
        <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-md shadow-lg ${
          saveStatus.isError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
        }`}>
          {saveStatus.message}
        </div>
      )}

      <main className="container mx-auto pt-6 px-4 pb-16">
        <div className="flex justify-center space-x-2 mb-8 overflow-x-auto py-1">
          {sections.map((section, index) => (
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
                disabled={isSubmitting}
                className={`flex items-center gap-2 ${
                  isSubmitting ? 'bg-gray-400' : 'bg-[#2E8B57] hover:bg-[#3CB371]'
                } text-white px-6 py-3 rounded-lg font-medium shadow-md`}
              >
                {isSubmitting ? (
                  'Saving...'
                ) : (
                  <>
                    Complete Profile
                    <CheckCircleIcon className="w-5 h-5" />
                  </>
                )}
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