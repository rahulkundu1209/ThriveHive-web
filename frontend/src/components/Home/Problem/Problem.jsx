import React, { useState } from "react";
import { motion } from "framer-motion";
import successImage from "../../../assets/sucess-image.jpg"; // Ensure correct path

const FlipCard = ({ frontText, backText }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-60 h-35 cursor-pointer perspective"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="relative w-full h-full">
        {/* Front Side */}
        <motion.div 
          className="absolute w-full h-full rounded-2xl shadow-lg p-4 flex items-center justify-center bg-blue-600 text-white text-lg font-semibold text-center"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ backfaceVisibility: "hidden" }}
        >
          {frontText}
        </motion.div>

        {/* Back Side */}
        <motion.div 
          className="absolute w-full h-full rounded-2xl shadow-lg p-4 flex items-center justify-center bg-gray-100 text-gray-900 text-lg text-center border border-gray-300"
          animate={{ rotateY: isFlipped ? 0 : -180 }}
          transition={{ duration: 0.6 }}
          style={{ backfaceVisibility: "hidden" }}
        >
          {backText}
        </motion.div>
      </div>
    </div>
  );
};

const SuccessSection = () => {
  return (
    <div className="relative min-h-[600px] bg-gradient-to-r from-gray-50 to-gray-200 flex justify-center items-center px-6 py-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* ✅ Image Section */}
        <motion.div
          initial={{ x: -100, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          transition={{ duration: 1, ease: "easeOut" }} 
          className="flex justify-center"
        >
          <img 
            src={successImage} 
            alt="Success vs Reality" 
            className="w-auto h-[400px] md:h-[500px] rounded-[20px] shadow-lg object-cover"
          />
        </motion.div>

        {/* ✅ Text + Flip Cards Section */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }}  
          animate={{ x: 0, opacity: 1 }}  
          transition={{ duration: 1, ease: "easeOut" }} 
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            You're <span className="text-blue-600">skilled</span> —or at least, you think you should be. <br />
            But how does your degree translate into a <span className="text-blue-600">meaningful career and life</span>?
            {/* You're skilled—or at least, you think you should be. But how does your degree translate into a meaningful career and life? */}
          </h2>
          <p className="mt-4 text-gray-700 text-lg leading-relaxed">
            They said <span className="font-semibold text-blue-500">success</span> would come after your degree. But no one prepared you 
            for the uncertainty, setbacks, and figuring out what comes next. You're not alone. 
            <span className="font-semibold text-blue-500"> Thrive Hives</span> helps you navigate life’s challenges with confidence—not just survive, but thrive.
            {/* Imagine a space where you can be fearless, where people trust in your abilities and support you. A space that provides core life skills—time management, learning how to learn, decision-making, and more—that school never taught but that are essential for success. A place where you feel energized and ready to take action instead of procrastinating. A peer group that cheers for you and gives you space to deeply reflect on your talent, mission, and career while making a positive impact on society. That's Thrive  Hives. */}
          </p>

          {/* ✅ Flip Cards */}
          <div className="mt-8 flex gap-6 justify-center">
            <FlipCard 
              frontText={<h3 className="text-lg font-semibold">Expectation:<br/>Graduate → Get a Job → <span className="text-yellow-300">Success</span></h3>} 
              backText={<p className="text-lg">Reality: The system prepared you for <span className="text-red-500 font-bold">exams</span>, not life.</p>} 
            />
            <FlipCard 
              frontText={<h3 className="text-lg font-semibold">Rise Beyond</h3>} 
              backText={<p className="text-lg">You have the potential to <span className="text-green-500 font-bold">thrive</span>, not just survive.</p>} 
            />
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default SuccessSection;
