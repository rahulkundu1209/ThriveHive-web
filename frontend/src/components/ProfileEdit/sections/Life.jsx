import React from 'react';
import { motion } from 'framer-motion';

const Life = ({ formData, handleInputChange }) => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-gray-200 hover:shadow-2xl transition-all"
    >
      <h2 className="text-4xl font-bold text-[#FFA500] mb-8 font-sans tracking-tight">Life & Energy</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Left Column */}
        <div className="space-y-8">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Hobbies or Joys</label>
            <textarea
              name="hobbies"
              placeholder="What activities light up your day?"
              className="w-full px-5 py-4 border border-gray-300 rounded-xl shadow-sm h-32 focus:ring-2 focus:ring-[#FFA500] focus:outline-none placeholder-gray-500"
              onChange={handleInputChange}
              value={formData.hobbies}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Feel Alive</label>
            <input
              type="text"
              name="feelAlive"
              placeholder="What's a simple moment that makes you feel alive?"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#FFA500] focus:outline-none placeholder-gray-500"
              onChange={handleInputChange}
              value={formData.feelAlive}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <div className="bg-[#FFF3E0] p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">✨ Community Attraction</h3>
            <input
              type="text"
              name="communityDrawn"
              placeholder="What types of communities or people energize you?"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#FFA500] focus:outline-none placeholder-gray-500"
              onChange={handleInputChange}
              value={formData.communityDrawn}
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Life;
