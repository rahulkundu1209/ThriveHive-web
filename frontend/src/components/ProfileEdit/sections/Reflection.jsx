import React from 'react';
import { motion } from 'framer-motion';

const Reflection = ({ formData, handleInputChange }) => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-gray-200 transition-all hover:shadow-2xl"
    >
      <h2 className="text-4xl font-bold text-[#6A5ACD] mb-8 font-sans tracking-tight">
        Reflection & Evolution
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Side */}
        <div className="space-y-8">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Something You've Unlearned</label>
            <textarea
              name="unlearned"
              placeholder="What belief or habit have you let go of recently?"
              className="w-full px-5 py-4 border border-gray-300 rounded-xl shadow-sm h-24 focus:ring-2 focus:ring-[#6A5ACD] placeholder-gray-500"
              onChange={handleInputChange}
              value={formData.unlearned}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Five Years Ago</label>
            <textarea
              name="fiveYearsAgo"
              placeholder="Who were you five years ago, and how have you grown since?"
              className="w-full px-5 py-4 border border-gray-300 rounded-xl shadow-sm h-24 focus:ring-2 focus:ring-[#6A5ACD] placeholder-gray-500"
              onChange={handleInputChange}
              value={formData.fiveYearsAgo}
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="space-y-8">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Your Definition of Peace</label>
            <textarea
              name="peaceDefinition"
              placeholder="What does peace look and feel like to you today?"
              className="w-full px-5 py-4 border border-gray-300 rounded-xl shadow-sm h-24 focus:ring-2 focus:ring-[#6A5ACD] placeholder-gray-500"
              onChange={handleInputChange}
              value={formData.peaceDefinition}
            />
          </div>

          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="bg-[#EDE7F6] p-6 rounded-2xl shadow-inner transition-all"
          >
            <h3 className="text-xl font-semibold mb-4 text-[#4B0082]">💌 Message to Future Self</h3>
            <textarea
              name="futureMessage"
              placeholder="Write something kind, honest, or motivating to your future self. This will return to you in 6 months."
              className="w-full px-4 py-4 border border-gray-300 rounded-xl shadow-sm h-32 focus:ring-2 focus:ring-[#6A5ACD] placeholder-gray-600"
              onChange={handleInputChange}
              value={formData.futureMessage}
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Reflection;
