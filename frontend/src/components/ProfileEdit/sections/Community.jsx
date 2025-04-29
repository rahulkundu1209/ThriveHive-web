import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Community = ({ formData, handleInputChange }) => {
  const [interestInput, setInterestInput] = useState('');
  const [interests, setInterests] = useState(formData.interests || []);

  const handleInterestAdd = (e) => {
    if (e.key === 'Enter' && interestInput.trim() !== '') {
      setInterests([...interests, interestInput.trim()]);
      setInterestInput('');
    }
  };

  const removeInterest = (index) => {
    const updatedInterests = [...interests];
    updatedInterests.splice(index, 1);
    setInterests(updatedInterests);
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 transition-all hover:shadow-xl"
    >
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
    </motion.section>
  );
};

export default Community;
