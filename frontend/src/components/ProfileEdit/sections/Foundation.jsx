import React from 'react';
import { motion } from 'framer-motion';

const SectionFoundationalInformation = ({
  formData,
  handleInputChange,
  avatarPreview,
  handleAvatarUpload,
  showFieldTooltip,
  hideTooltip
}) => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 transition-all hover:shadow-xl"
    >
      <h2 className="text-3xl font-bold text-[#1E88E5] mb-6 font-sans">Foundational Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flip-card avatar-upload group">
            <div className="flip-card-inner transition-all duration-500">
              <div className="flip-card-front p-6 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 shadow-md group-hover:shadow-lg transition-all">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Profile Photo</h3>
                <div className="w-32 h-32 rounded-full mx-auto overflow-hidden border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-105">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-200 to-blue-300 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
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
                  className="mt-6 bg-[#1E88E5] text-white px-4 py-2 rounded-lg cursor-pointer inline-block hover:bg-[#1565C0] transition-colors shadow hover:shadow-md transform hover:-translate-y-1 transition-all duration-300"
                >
                  Choose Image
                </label>
              </div>
            </div>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} className="transition-all">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent transition-all duration-300"
              onChange={handleInputChange}
              value={formData.fullName}
              onMouseEnter={(e) => showFieldTooltip("Your full name as you'd like to be known", e)}
              onMouseLeave={hideTooltip}
            />
          </motion.div>
        </div>
        <div className="space-y-6">
          <motion.div whileHover={{ scale: 1.02 }} className="transition-all">
            <input
              type="text"
              name="location"
              placeholder="Location (City, State, Country)"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent transition-all duration-300"
              onChange={handleInputChange}
              value={formData.location}
              onMouseEnter={(e) => showFieldTooltip("Where are you based?", e)}
              onMouseLeave={hideTooltip}
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="transition-all">
            <input
              type="text"
              name="languages"
              placeholder="Preferred Language(s)"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent transition-all duration-300"
              onChange={handleInputChange}
              value={formData.languages}
              onMouseEnter={(e) => showFieldTooltip("Languages you speak or prefer to communicate in", e)}
              onMouseLeave={hideTooltip}
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default SectionFoundationalInformation;
