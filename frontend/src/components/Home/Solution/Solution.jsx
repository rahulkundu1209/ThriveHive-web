import React, { useState } from "react";
import { motion } from "framer-motion";
import personalImg from "../../../assets/personal.jpg";
import discoveryImg from "../../../assets/Discovery.jpg";
import peerImg from "../../../assets/peer.jpg";

const features = [
  {
    id: "personalized",
    title: "Personalized Learning",
    image: personalImg,
    cardHeight: "h-[550px]",
    content: (
      <>
        <p className="text-gray-800 mt-6">
          Get guidance that’s truly about <strong>you</strong>—your strengths, goals, and peace. 
          It’s not about following a path; it’s about 
          <span className="text-blue-600 font-semibold"> creating one that fits your journey.</span>
        </p>
      </>
    ),
  },
  {
    id: "self-discovery",
    title: "Self Discovery",
    image: discoveryImg,
    cardHeight: "h-[550px]",
    content: (
      <>
        <p className="text-gray-800 mt-6 text-lg">
          Learn to manage setbacks without blaming yourself. Develop emotional intelligence and self-awareness
          to <span className="text-blue-600">grow confidently.</span>
        </p>
      </>
    ),
  },
  {
    id: "peer-support",
    title: "Peer Support",
    image: peerImg,
    cardHeight: "h-[550px]",
    content: (
      <>
        <p className="text-gray-800 mt-6 text-lg">
          Surround yourself with peers who are figuring things out just like you. Build connections,
          learn together, and <span className="text-blue-600">grow stronger.</span>
        </p>
      </>
    ),
  },
];

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(features[0]);

  return (
    <div id="solution-section" className="min-h-screen bg-[#e2e7f0] flex flex-col items-center py-12 px-6">
      <div className="flex flex-col md:flex-row items-center max-w-7xl mx-auto space-y-10 md:space-y-0 md:space-x-12">
        
        {/* Left Side Text Section */}
        <div className="text-left max-w-lg">
          <motion.h3 
            className="text-5xl font-bold text-gray-900"
            style={{ fontFamily: "Aladin, system-ui" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Stop Surviving, <span className="text-blue-600">Start Thriving</span>
          </motion.h3>
          
          <motion.p 
            className="mt-6 text-lg text-gray-700 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Imagine waking up knowing exactly what to do next—<br />
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 px-3 py-1 rounded-lg shadow-lg text-white font-semibold">
              No confusion, no more self-doubts, just clarity and confidence.
            </span>
          </motion.p>

          <motion.p 
            className="mt-6 text-xl text-blue-700 font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            DO YOU WANT TO KNOW HOW?
          </motion.p>
        </div>

        {/* Right Side Feature Section */}
        <div className="flex flex-col items-center w-full">
          {/* Feature Tabs */}
          <div className="flex space-x-6 mb-6">
            {features.map((feature) => (
              <button
                key={feature.id}
                className={`px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 
                  ${activeFeature.id === feature.id ? "bg-blue-600 text-white shadow-lg scale-105" 
                  : "bg-gray-300 text-gray-800 hover:bg-blue-500 hover:text-white"}`}
                onClick={() => setActiveFeature(feature)}
              >
                {feature.title}
              </button>
            ))}
          </div>

          {/* Feature Card */}
          <motion.div
            key={activeFeature.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className={`w-full md:w-[550px] bg-white rounded-xl shadow-xl overflow-hidden ${activeFeature.cardHeight}`}
          >
            <img src={activeFeature.image} alt={activeFeature.title} className="w-full h-[300px] object-cover" />
            <div className="p-8">
              {activeFeature.content}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
