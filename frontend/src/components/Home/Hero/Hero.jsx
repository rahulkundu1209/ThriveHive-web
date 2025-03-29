import React from "react";
import { motion } from "framer-motion"; 
import heroImage from "../../../assets/hero-image.png"; 
import wavePattern from "../../../assets/blue-pattern.png"; 

const Hero = () => {
  // ✅ Function to Scroll to Solution Section
  const handleExploreClick = () => {
    const solutionSection = document.getElementById("solution-section");
    if (solutionSection) {
      solutionSection.scrollIntoView({ behavior: "smooth" }); // Smooth scroll effect
    }
  };

  return (
    <div className="relative min-h-[650px] bg-gray-100 flex justify-center items-center px-6">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
        <motion.div 
          initial={{ x: -100, opacity: 0 }}  
          animate={{ x: 0, opacity: 1 }}  
          transition={{ duration: 1, ease: "easeOut" }} 
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            You follow the path: <br/>
            <span className="text-[#3b5998]">Get decent grades → <br/></span>
            <span className="text-[#5179ce]">Get a degree <br /></span>
            <span className="text-[#c0392b]">Then what?</span>
          </h1>
          <p className="mt-4 text-gray-700 text-lg">
            The job market and the world are{" "}
            <span className="font-semibold">changing fast! </span>
            How do you make sense of it and adapt to Thrive?
          </p>

          {/* Buttons */}
          <div className="mt-6 flex space-x-4">
            {/* <motion.button
              whileHover={{ scale: 1.1 }}
              className="bg-[#1E3A8A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#172554] transition"
            >
              Join
            </motion.button> */}
            {/* ✅ Explore Button with Smooth Scroll */}
            {/* <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={handleExploreClick} // 👈 Function added
              className="bg-[#3B82F6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2563EB] transition"
            >
              Explore
            </motion.button> */}
          </div>
        </motion.div>

        <motion.div
          initial={{ y: -100, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 1.2, ease: "easeOut" }} 
          className="flex justify-center"
        >
          <img 
            src={heroImage} 
            alt="Hero" 
            className="w-auto h-[450px] sm:h-[500px] rounded-[20px] shadow-xl object-cover"
          />
        </motion.div>
      </div>

      <motion.img 
        src={wavePattern} 
        alt="Wave Pattern" 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -bottom-2 left-0 w-full h-[120px] sm:h-[180px] object-cover"
      />
    </div>
  );
};

export default Hero;
