import React from 'react';
import { motion } from 'framer-motion';

const Skills = ({
  formData,
  handleInputChange,
  skills,
  skillInput,
  setSkillInput,
  handleAddSkill,
  handleRemoveSkill
}) => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-gray-200 hover:shadow-2xl transition-all"
    >
      <h2 className="text-4xl font-bold text-[#2E8B57] mb-8 font-sans tracking-tight">Skills & Strengths</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Left Column */}
        <div className="space-y-8">
          <div className="bg-[#FDF6F0] p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Top Skills/Strengths</h3>
            <div className="flex flex-wrap gap-3 mb-3">
              {skills.map((skill, index) => (
                <motion.span
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white px-4 py-2 rounded-full shadow flex items-center text-sm font-medium border"
                >
                  {skill}
                  <button 
                    onClick={() => handleRemoveSkill(index)}
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
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddSkill(e)}
                placeholder="Add a skill..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
              />
              <button
                onClick={handleAddSkill}
                className="px-4 py-2 bg-[#2E8B57] text-white rounded-full shadow hover:bg-[#1f6e4a] transition"
              >
                Add
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Skills You Want to Learn</label>
            <textarea
              name="skillsToLearn"
              placeholder="What skills would you like to develop or deepen?"
              className="w-full px-5 py-4 border border-gray-300 rounded-xl shadow-sm h-32 focus:ring-2 focus:ring-[#2E8B57] focus:outline-none placeholder-gray-500"
              onChange={handleInputChange}
              value={formData.skillsToLearn}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <div className="bg-[#E8F5E9] p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Community Contributions</h3>
            <div className="space-y-3 text-gray-700">
              {[
                { name: "mentoring", label: "Mentoring Others" },
                { name: "localCircles", label: "Starting Local Circles" },
                { name: "creativity", label: "Your Creativity" },
                { name: "time", label: "Your Time" },
              ].map((item) => (
                <label key={item.name} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name={item.name}
                    checked={formData[item.name]}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded border-gray-300 text-[#2E8B57] focus:ring-[#2E8B57] transition"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Learnings So Far</label>
            <textarea
              name="learnedSoFar"
              placeholder="Reflect on what you've discovered or practiced..."
              className="w-full px-5 py-4 border border-gray-300 rounded-xl shadow-sm h-32 focus:ring-2 focus:ring-[#2E8B57] focus:outline-none placeholder-gray-500"
              onChange={handleInputChange}
              value={formData.learnedSoFar}
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;