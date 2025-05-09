import React from 'react';
import { motion } from 'framer-motion';

const Self = ({
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
      <h2 className="text-4xl font-extrabold text-[#6A0DAD] mb-8 tracking-tight font-sans">Self Introduction</h2>

      <div className="space-y-8">
        
        {/* About Yourself Textarea */}
        <motion.div 
          whileHover={{ scale: 1.01 }} 
          className="transition-all"
        >
          <label className="block text-gray-700 font-semibold mb-2">Who are you when no one's watching?</label>
          <textarea
            name="aboutYourself"
            placeholder="Be authentic, raw, and real..."
            className="w-full px-5 py-4 border border-gray-300 rounded-xl shadow-sm h-32 focus:ring-2 focus:ring-[#6A0DAD] focus:outline-none bg-white transition-all duration-300 placeholder-gray-400"
            onChange={handleInputChange}
            value={formData.aboutYourself}
            onMouseEnter={(e) => showFieldTooltip("Tell us about your authentic self", e)}
            onMouseLeave={hideTooltip}
          />
        </motion.div>

        {/* Short Descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div whileHover={{ scale: 1.01 }} className="transition-all">
            <label className="block text-gray-700 font-semibold mb-2">Describe yourself in 3 words</label>
            <input
              type="text"
              name="describeSelf"
              placeholder="Creative, Curious, Bold..."
              className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#6A0DAD] focus:outline-none transition-all duration-300 placeholder-gray-400"
              onChange={handleInputChange}
              value={formData.describeSelf}
              onMouseEnter={(e) => showFieldTooltip("Three words that define you", e)}
              onMouseLeave={hideTooltip}
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }} className="transition-all">
            <label className="block text-gray-700 font-semibold mb-2">How would friends describe you?</label>
            <input
              type="text"
              name="friendDescription"
              placeholder="Supportive, Funny, Loyal..."
              className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#6A0DAD] focus:outline-none transition-all duration-300 placeholder-gray-400"
              onChange={handleInputChange}
              value={formData.friendDescription}
              onMouseEnter={(e) => showFieldTooltip("How others might describe you", e)}
              onMouseLeave={hideTooltip}
            />
          </motion.div>
        </div>

        {/* Life Mantra Box */}
        <motion.div 
          whileHover={{ scale: 1.02 }} 
          className="rounded-2xl p-6 shadow-xl border border-[#1E88E5] transition-all duration-300 text-white backdrop-blur-md"
          style={{
            background: "linear-gradient(135deg, rgba(35,70,90,0.9), rgba(30,136,229,0.9))",
          }}
        >
          <label className="block text-lg font-semibold text-white mb-2">Life Mantra</label>
          <textarea
            name="lifeMantra"
            placeholder="Your guiding belief or phrase..."
            className="w-full bg-transparent placeholder-white/70 text-white focus:outline-none resize-none h-24"
            onChange={handleInputChange}
            value={formData.lifeMantra}
            onMouseEnter={(e) => showFieldTooltip("A phrase or motto that guides your life", e)}
            onMouseLeave={hideTooltip}
          />
        </motion.div>

      </div>
    </motion.section>
  );
};

export default Self;
