import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

const ProfileEdit = ({ profileData }) => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [avatarPreview, setAvatarPreview] = useState(profileData?.avatar || '');
  const [skills, setSkills] = useState(profileData?.skills || []);
  const [interests, setInterests] = useState(profileData?.interests || []);
  const [skillInput, setSkillInput] = useState('');
  const [interestInput, setInterestInput] = useState('');
  const [progress, setProgress] = useState(0);

  const sections = [
    'foundational', 'introduction', 'purpose', 
    'skills', 'life', 'dreams', 'reflection', 'community'
  ];

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
  }, [currentSection]);

  const handleSectionNavigation = (direction) => {
    if (direction === 'next' && currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
    } else if (direction === 'prev' && currentSection > 0) {
      setCurrentSection(prev => prev - 1);
    }
  };

  const handleSkillAdd = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
        setSkillInput('');
      }
      e.preventDefault();
    }
  };

  const handleInterestAdd = (e) => {
    if (e.key === 'Enter' && interestInput.trim()) {
      if (!interests.includes(interestInput.trim())) {
        setInterests([...interests, interestInput.trim()]);
        setInterestInput('');
      }
      e.preventDefault();
    }
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
  // Keep your existing handlers (handleAvatarUpload, handleInputChange, etc.)

  return (
    <div className="bg-[#FFF9F5] min-h-screen">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-[#1E88E5] transition-all duration-400" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="bg-[#23465a] text-white flex items-center justify-between px-6 py-3 fixed top-0 left-0 right-0 z-40">
        <img 
          alt="logo" 
          width="100px" 
          src="https://thrive-hives.vercel.app/assets/Logo-DFWKnQHC.png" 
        />
        <div className="flex space-x-2">
          {sections.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSection(index)}
              className={`w-8 h-8 rounded-full ${
                index <= currentSection ? 'bg-[#1E88E5]' : 'bg-gray-600'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </nav>
      <main className="container mx-auto pt-24 px-4 pb-16">
        {/* Foundational Information */}
        {currentSection === 0 && (
          <section className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-[#1E88E5] mb-6 font-sans">Foundational Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flip-card avatar-upload">
                  <div className="flip-card-inner">
                    <div className="flip-card-front bg-[#7cae9] p-6 rounded-lg">
                      <h3 className="text-xl font-semibold mb-4">Profile Photo</h3>
                      <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto overflow-hidden">
                        {avatarPreview ? (
                          <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No image
                          </div>
                        )}
                      </div>
                      <input 
                        type="file" 
                        onChange={handleAvatarUpload}
                        accept="image/*" 
                        className="hidden" 
                        id="avatar-input"
                      />
                      <label 
                        htmlFor="avatar-input"
                        className="mt-4 bg-[#1E88E5] text-white px-4 py-2 rounded-lg cursor-pointer inline-block hover:bg-[#1565C0] transition-colors"
                      >
                        Choose Image
                      </label>
                    </div>
                  </div>
                </div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-[#1E88E5]"
                  onChange={handleInputChange}
                  value={formData.fullName}
                />
              </div>
              <div className="space-y-6">
                <input
                  type="text"
                  name="location"
                  placeholder="Location (City, State, Country)"
                  className="w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-[#1E88E5]"
                  onChange={handleInputChange}
                  value={formData.location}
                />
                <input
                  type="text"
                  name="languages"
                  placeholder="Preferred Language(s)"
                  className="w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-[#1E88E5]"
                  onChange={handleInputChange}
                  value={formData.languages}
                />
              </div>
            </div>
          </section>
        )}

        {/* Self Introduction */}
        {currentSection === 1 && (
          <section className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-[#6A0DAD] mb-6 font-sans">Self Introduction</h2>
            <div className="space-y-6">
              <textarea
                name="aboutYourself"
                placeholder="Who are you when no one's watching?"
                className="w-full px-4 py-3 border rounded-md shadow-sm h-32 focus:ring-2 focus:ring-[#6A0DAD]"
                onChange={handleInputChange}
                value={formData.aboutYourself}
              />
              <input
                type="text"
                name="describeSelf"
                placeholder="Describe yourself in 3 words"
                className="w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-[#6A0DAD]"
                onChange={handleInputChange}
                value={formData.describeSelf}
              />
              <input
                type="text"
                name="friendDescription"
                placeholder="Friend's 3-word description"
                className="w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-[#6A0DAD]"
                onChange={handleInputChange}
                value={formData.friendDescription}
              />
              <div className="mantra-box p-6 rounded-lg text-white bg-gradient-to-r from-[#23465a] to-[#1E88E5]">
                <textarea
                  name="lifeMantra"
                  placeholder="Your life mantra..."
                  className="w-full bg-transparent placeholder-white focus:outline-none"
                  onChange={handleInputChange}
                  value={formData.lifeMantra}
                />
              </div>
            </div>
          </section>
        )}

       {/* Purpose and Intention */}
{currentSection === 2 && (
  <section className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
    <h2 className="text-3xl font-bold text-[#1E88E5] mb-6 font-sans">Purpose & Intention</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <textarea
          name="whyThrive"
          placeholder="Why did you choose Thrive?"
          className="w-full px-4 py-3 border rounded-md shadow-sm h-32 focus:ring-2 focus:ring-[#1E88E5]"
          onChange={handleInputChange}
          value={formData.whyThrive}
        />
        <textarea
          name="goodLife"
          placeholder="What does a 'Good Life' mean to you?"
          className="w-full px-4 py-3 border rounded-md shadow-sm h-32 focus:ring-2 focus:ring-[#1E88E5]"
          onChange={handleInputChange}
          value={formData.goodLife}
        />
      </div>
      <div className="space-y-6">
        <select
          name="lifeAspirations"
          className="w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-[#1E88E5]"
          onChange={handleInputChange}
          value={formData.lifeAspirations}
        >
          <option value="">Current Life Aspirations</option>
          <option value="Find a job">Find a job</option>
          <option value="Start an organization">Start an organization</option>
          <option value="Freelance">Freelance</option>
          <option value="Build a community">Build a community</option>
          <option value="Still exploring">Still exploring</option>
          <option value="Other">Other</option>
        </select>
        <textarea
          name="noFinancialPressure"
          placeholder="If financial pressure didn't exist, what would you do with your life?"
          className="w-full px-4 py-3 border rounded-md shadow-sm h-24 focus:ring-2 focus:ring-[#1E88E5]"
          onChange={handleInputChange}
          value={formData.noFinancialPressure}
        />
        <div className="mantra-box p-6 rounded-lg text-white bg-gradient-to-r from-[#23465a] to-[#1E88E5]">
          <textarea
            name="millionDollarCreation"
            placeholder="If you received 1 million dollars today, what would you create with it?"
            className="w-full bg-transparent placeholder-white focus:outline-none"
            onChange={handleInputChange}
            value={formData.millionDollarCreation}
          />
        </div>
      </div>
    </div>
  </section>
)}

{/* Skills and Strengths */}
{currentSection === 3 && (
  <section className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
    <h2 className="text-3xl font-bold text-[#2E8B57] mb-6 font-sans">Skills & Strengths</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="bg-[#F5E6D9] p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Top Skills/Strengths</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="bg-white px-4 py-2 rounded-full flex items-center">
                {skill}
                <button 
                  onClick={() => removeSkill(index)}
                  className="ml-2 text-red-500"
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleSkillAdd}
              placeholder="Add skill"
              className="px-4 py-2 border rounded-full"
            />
          </div>
        </div>
        <textarea
          name="skillsToLearn"
          placeholder="What skills would you like to learn or deepen on this platform?"
          className="w-full px-4 py-3 border rounded-md shadow-sm h-32 focus:ring-2 focus:ring-[#2E8B57]"
          onChange={handleInputChange}
          value={formData.skillsToLearn}
        />
      </div>
      <div className="space-y-6">
        <div className="bg-[#E8F5E9] p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Community Contributions</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="mentoring"
                checked={formData.mentoring}
                onChange={handleInputChange}
                className="w-5 h-5 rounded border-gray-300 text-[#2E8B57] focus:ring-[#2E8B57]"
              />
              Mentoring Others
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="localCircles"
                checked={formData.localCircles}
                onChange={handleInputChange}
                className="w-5 h-5 rounded border-gray-300 text-[#2E8B57] focus:ring-[#2E8B57]"
              />
              Starting Local Circles
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="creativity"
                checked={formData.creativity}
                onChange={handleInputChange}
                className="w-5 h-5 rounded border-gray-300 text-[#2E8B57] focus:ring-[#2E8B57]"
              />
              Your Creativity
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="time"
                checked={formData.time}
                onChange={handleInputChange}
                className="w-5 h-5 rounded border-gray-300 text-[#2E8B57] focus:ring-[#2E8B57]"
              />
              Your Time
            </label>
          </div>
        </div>
        <textarea
          name="learnedSoFar"
          placeholder="What have you learned so far on this platform?"
          className="w-full px-4 py-3 border rounded-md shadow-sm h-32 focus:ring-2 focus:ring-[#2E8B57]"
          onChange={handleInputChange}
          value={formData.learnedSoFar}
        />
      </div>
    </div>
  </section>
)}

{/* Life and Energy */}
{currentSection === 4 && (
  <section className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
    <h2 className="text-3xl font-bold text-[#FFA500] mb-6 font-sans">Life & Energy</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <textarea
          name="hobbies"
          placeholder="What are your hobbies or joys in life?"
          className="w-full px-4 py-3 border rounded-md shadow-sm h-32 focus:ring-2 focus:ring-[#FFA500]"
          onChange={handleInputChange}
          value={formData.hobbies}
        />
        <input
          type="text"
          name="feelAlive"
          placeholder="What's something simple that makes you feel alive?"
          className="w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-[#FFA500]"
          onChange={handleInputChange}
          value={formData.feelAlive}
        />
      </div>
      <div className="space-y-6">
        <div className="bg-[#FFF3E0] p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Community Attraction</h3>
          <input
            type="text"
            name="communityDrawn"
            placeholder="What kind of people or communities do you feel drawn to?"
            className="w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-[#FFA500]"
            onChange={handleInputChange}
            value={formData.communityDrawn}
          />
        </div>
      </div>
    </div>
  </section>
)}

{/* Dreams and Imagination */}
{currentSection === 5 && (
  <section className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
    <h2 className="text-3xl font-bold text-[#FF6B6B] mb-6 font-sans">Dreams & Imagination</h2>
    <div className="space-y-6">
      <div className="mantra-box p-6 rounded-lg text-white bg-gradient-to-r from-[#23465a] to-[#1E88E5]">
        <textarea
          name="wildestDream"
          placeholder="What is your wildest dream or vision for your life?"
          className="w-full bg-transparent placeholder-white focus:outline-none h-32"
          onChange={handleInputChange}
          value={formData.wildestDream}
        />
      </div>
      <textarea
        name="worldToBuild"
        placeholder="What kind of world would you like to help build with Thrive?"
        className="w-full px-4 py-3 border rounded-md shadow-sm h-32 focus:ring-2 focus:ring-[#FF6B6B]"
        onChange={handleInputChange}
        value={formData.worldToBuild}
      />
    </div>
  </section>
)}

{/* Reflection and Evolution */}
{currentSection === 6 && (
  <section className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
    <h2 className="text-3xl font-bold text-[#6A5ACD] mb-6 font-sans">Reflection & Evolution</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <textarea
          name="unlearned"
          placeholder="What is something you've unlearned recently?"
          className="w-full px-4 py-3 border rounded-md shadow-sm h-24 focus:ring-2 focus:ring-[#6A5ACD]"
          onChange={handleInputChange}
          value={formData.unlearned}
        />
        <textarea
          name="fiveYearsAgo"
          placeholder="Who were you five years ago, and what has changed since?"
          className="w-full px-4 py-3 border rounded-md shadow-sm h-24 focus:ring-2 focus:ring-[#6A5ACD]"
          onChange={handleInputChange}
          value={formData.fiveYearsAgo}
        />
      </div>
      <div className="space-y-6">
        <textarea
          name="peaceDefinition"
          placeholder="What does peace mean to you today?"
          className="w-full px-4 py-3 border rounded-md shadow-sm h-24 focus:ring-2 focus:ring-[#6A5ACD]"
          onChange={handleInputChange}
          value={formData.peaceDefinition}
        />
        <div className="bg-[#EDE7F6] p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Message to Future Self</h3>
          <textarea
            name="futureMessage"
            placeholder="This message will be sent back to you in 6 months"
            className="w-full px-4 py-3 border rounded-md shadow-sm h-32 focus:ring-2 focus:ring-[#6A5ACD]"
            onChange={handleInputChange}
            value={formData.futureMessage}
          />
        </div>
      </div>
    </div>
  </section>
)}

{/* Community Discovery */}
{currentSection === 7 && (
  <section className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
    <h2 className="text-3xl font-bold text-[#008080] mb-6 font-sans">Community Discovery</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="bg-[#E0F7FA] p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Collaboration Interests</h3>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <span key={index} className="bg-white px-4 py-2 rounded-full flex items-center">
                {interest}
                <button 
                  onClick={() => removeInterest(index)}
                  className="ml-2 text-red-500"
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              value={interestInput}
              onChange={(e) => setInterestInput(e.target.value)}
              onKeyDown={handleInterestAdd}
              placeholder="Add interest"
              className="px-4 py-2 border rounded-full"
            />
          </div>
        </div>
        <select
          name="availableFor"
          className="w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-[#008080]"
          onChange={handleInputChange}
          value={formData.availableFor}
        >
          <option value="">Available For</option>
          <option value="Mentorship">Mentorship</option>
          <option value="Volunteering">Volunteering</option>
          <option value="Learning Circles">Learning Circles</option>
          <option value="Projects">Projects</option>
          <option value="Just Conversations">Just Conversations</option>
        </select>
      </div>
      <div className="space-y-6">
        <div className="bg-[#E0F7FA] p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Connection Preferences</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="similarSkills"
                checked={formData.similarSkills}
                onChange={handleInputChange}
                className="w-5 h-5 rounded border-gray-300 text-[#008080] focus:ring-[#008080]"
              />
              Similar Skills
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="complementaryStrengths"
                checked={formData.complementaryStrengths}
                onChange={handleInputChange}
                className="w-5 h-5 rounded border-gray-300 text-[#008080] focus:ring-[#008080]"
              />
              Complementary Strengths
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="openHearted"
                checked={formData.openHearted}
                onChange={handleInputChange}
                className="w-5 h-5 rounded border-gray-300 text-[#008080] focus:ring-[#008080]"
              />
              Anyone Open-Hearted
            </label>
          </div>
        </div>
        </div>
        </div>
      </section>
)}
{/* Navigation Buttons */}
<div className="flex justify-between max-w-4xl mx-auto mt-8">
          <button
            onClick={() => handleSectionNavigation('prev')}
            className="bg-[#23465a] text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-all font-medium"
            disabled={currentSection === 0}
          >
            ← Previous
          </button>
          
          {currentSection < sections.length - 1 ? (
            <button
              onClick={() => handleSectionNavigation('next')}
              className="bg-[#1E88E5] text-white px-6 py-3 rounded-lg hover:bg-[#1565C0] transition-all font-medium"
            >
              Next →
            </button>
          ) : (
            <button
            
              className="bg-[#2E8B57] text-white px-6 py-3 rounded-lg hover:bg-[#3CB371] transition-all font-medium"
            >
              Complete Profile
            </button>
          )}
        </div>
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