import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Community = ({ 
  formData, 
  handleInputChange,
  interests,
  setInterests,
  interestInput,
  setInterestInput,
  handleAddInterest,
  handleRemoveInterest
}) => {
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
            <div className="flex flex-wrap gap-2 mb-3">
              {interests.map((interest, index) => (
                <motion.span
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white px-4 py-2 rounded-full shadow flex items-center text-sm font-medium border"
                >
                  {interest}
                  <button 
                    onClick={() => handleRemoveInterest(index)}
                    className="ml-2 text-red-500 font-bold hover:text-red-700"
                  >
                    ×
                  </button>
                </motion.span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddInterest(e)}
                placeholder="Add interest..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
              />
              <button
                onClick={handleAddInterest}
                className="px-4 py-2 bg-[#008080] text-white rounded-full shadow hover:bg-[#006666] transition"
              >
                Add
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Available For</label>
            <select
              name="availableFor"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#008080] focus:outline-none"
              onChange={handleInputChange}
              value={formData.availableFor}
            >
              <option value="">Select availability</option>
              <option value="Mentorship">Mentorship</option>
              <option value="Volunteering">Volunteering</option>
              <option value="Learning Circles">Learning Circles</option>
              <option value="Projects">Projects</option>
              <option value="Just Conversations">Just Conversations</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#E0F7FA] p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Connection Preferences</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="similarSkills"
                  checked={formData.similarSkills}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded border-gray-300 text-[#008080] focus:ring-[#008080] transition"
                />
                <span>Similar Skills</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="complementaryStrengths"
                  checked={formData.complementaryStrengths}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded border-gray-300 text-[#008080] focus:ring-[#008080] transition"
                />
                <span>Complementary Strengths</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="openHearted"
                  checked={formData.openHearted}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded border-gray-300 text-[#008080] focus:ring-[#008080] transition"
                />
                <span>Anyone Open-Hearted</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Community;