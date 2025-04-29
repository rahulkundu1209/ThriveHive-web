import React from 'react';
import { motion } from 'framer-motion';

const Purpose = ({
  formData,
  handleInputChange,
  showFieldTooltip,
  hideTooltip
}) => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-gray-200 hover:shadow-2xl transition-all"
    >
      <h2 className="text-4xl font-extrabold text-[#1E88E5] mb-8 tracking-tight font-sans">Purpose & Intention</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Left Column */}
        <div className="space-y-8">
          <motion.div whileHover={{ scale: 1.01 }} className="transition-all">
            <label className="block text-gray-700 font-semibold mb-2">Why did you choose Thrive?</label>
            <textarea
              name="whyThrive"
              placeholder="Your motivations, inspirations, or hopes..."
              className="w-full px-5 py-4 border border-gray-300 rounded-xl shadow-sm h-32 focus:ring-2 focus:ring-[#1E88E5] focus:outline-none transition-all duration-300 placeholder-gray-400"
              onChange={handleInputChange}
              value={formData.whyThrive}
              onMouseEnter={(e) => showFieldTooltip("What brought you to our platform?", e)}
              onMouseLeave={hideTooltip}
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }} className="transition-all">
            <label className="block text-gray-700 font-semibold mb-2">What does a 'Good Life' mean to you?</label>
            <textarea
              name="goodLife"
              placeholder="Define what happiness and purpose look like for you..."
              className="w-full px-5 py-4 border border-gray-300 rounded-xl shadow-sm h-32 focus:ring-2 focus:ring-[#1E88E5] focus:outline-none transition-all duration-300 placeholder-gray-400"
              onChange={handleInputChange}
              value={formData.goodLife}
              onMouseEnter={(e) => showFieldTooltip("Your definition of fulfillment and meaning", e)}
              onMouseLeave={hideTooltip}
            />
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <motion.div 
            whileHover={{ scale: 1.01 }} 
            className="bg-blue-50 p-6 rounded-xl shadow-md transition-all duration-300"
          >
            <label className="block text-gray-700 font-semibold mb-2">Current Life Aspirations</label>
            <select
              name="lifeAspirations"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#1E88E5] bg-white transition-all duration-300"
              onChange={handleInputChange}
              value={formData.lifeAspirations}
              onMouseEnter={(e) => showFieldTooltip("What are you currently working toward?", e)}
              onMouseLeave={hideTooltip}
            >
              <option value="">Select an option...</option>
              <option value="Find a job">Find a job</option>
              <option value="Start an organization">Start an organization</option>
              <option value="Freelance">Freelance</option>
              <option value="Build a community">Build a community</option>
              <option value="Still exploring">Still exploring</option>
              <option value="Other">Other</option>
            </select>
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }} className="transition-all">
            <label className="block text-gray-700 font-semibold mb-2">If money weren’t an issue...</label>
            <textarea
              name="noFinancialPressure"
              placeholder="What would you pursue freely?"
              className="w-full px-5 py-4 border border-gray-300 rounded-xl shadow-sm h-24 focus:ring-2 focus:ring-[#1E88E5] focus:outline-none transition-all duration-300 placeholder-gray-400"
              onChange={handleInputChange}
              value={formData.noFinancialPressure}
              onMouseEnter={(e) => showFieldTooltip("Your dreams without financial constraints", e)}
              onMouseLeave={hideTooltip}
            />
          </motion.div>

          {/* Million Dollar Creation */}
          <motion.div 
            whileHover={{ scale: 1.02 }} 
            className="rounded-2xl p-6 shadow-xl border border-[#1E88E5] transition-all duration-300 text-white backdrop-blur-md"
            style={{
              background: "linear-gradient(135deg, rgba(35,70,90,0.9), rgba(30,136,229,0.9))"
            }}
          >
            <label className="block text-lg font-semibold text-white mb-2">If you had $1M, what would you build?</label>
            <textarea
              name="millionDollarCreation"
              placeholder="What world-changing idea would you act on?"
              className="w-full bg-transparent placeholder-white/70 text-white focus:outline-none resize-none h-24"
              onChange={handleInputChange}
              value={formData.millionDollarCreation}
              onMouseEnter={(e) => showFieldTooltip("What would you build with significant resources?", e)}
              onMouseLeave={hideTooltip}
            />
          </motion.div>
        </div>

      </div>
    </motion.section>
  );
};

export default Purpose;
