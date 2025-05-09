import React from 'react';
import { motion } from 'framer-motion';

const Dreams = ({ formData, handleInputChange }) => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-gray-200 hover:shadow-2xl transition-all"
    >
      <h2 className="text-4xl font-bold text-[#FF6B6B] mb-8 font-sans tracking-tight">Dreams & Imagination</h2>

      <div className="space-y-10">
        
        {/* Wildest Dream Box */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="p-6 rounded-2xl text-white shadow-xl bg-gradient-to-br from-[#23465a] via-[#1E88E5] to-[#3f87e0] transition-all"
        >
          <label className="block text-lg font-semibold mb-3 text-white/80">Your Wildest Dream</label>
          <textarea
            name="wildestDream"
            placeholder="Describe the boldest, most magical vision you hold for your life..."
            className="w-full bg-transparent placeholder-white/70 focus:outline-none resize-none h-40 font-medium text-white"
            onChange={handleInputChange}
            value={formData.wildestDream}
          />
        </motion.div>

        {/* World to Build */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">The World You Want to Build</label>
          <textarea
            name="worldToBuild"
            placeholder="What kind of world do you wish to co-create with Thrive?"
            className="w-full px-5 py-4 border border-gray-300 rounded-xl shadow-sm h-36 focus:ring-2 focus:ring-[#FF6B6B] placeholder-gray-500"
            onChange={handleInputChange}
            value={formData.worldToBuild}
          />
        </div>
      </div>
    </motion.section>
  );
};

export default Dreams;
