//npm install react-icons
import { useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Purushottam Kumar",
    role: "Product Manager, Google",
    text: "Thrive Hives transformed the way I approach learning. The structured self-reflection and project-based approach helped me grow beyond just skills—it built my confidence.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Rahul Kundu",
    role: "Software Engineer, Microsoft",
    text: "I love how Thrive Hives focuses on personalized learning. The experience felt tailor-made for my growth!",
    rating: 4.5,
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Subham Singh",
    role: "AI Engineer, OpenAI",
    text: "A game-changer in the ed-tech space! Thrive Hives brings innovation and deep learning together seamlessly.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    name: "Sneha Rani",
    role: "ISRO Scientist",
    text: "Thrive Hives is a breath of fresh air in the world of online learning. The community and support are unparalleled.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Pragati kumari",
    role: "software engineer,at UBER",
    text: "Thrive Hives is a breath of fresh air in the world of online learning. The community and support are unparalleled.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/46.jpg",
  },

];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#c4e3f5] to-[#f5d4e3] py-10">
      <h2 className="text-4xl font-bold text-gray-900 mb-8">
      Hear from Our Thriving Community!
      </h2>
      <div className="relative w-full max-w-4xl">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-lg text-center border border-white/20"
        >
          <img
            src={testimonials[index].image}
            alt={testimonials[index].name}
            className="w-20 h-20 mx-auto rounded-full border-4 border-white shadow-md"
          />
          <h3 className="text-2xl font-semibold text-gray-900 mt-4">
            {testimonials[index].name}
          </h3>
          <p className="text-gray-600 italic">{testimonials[index].role}</p>
          <div className="flex justify-center my-2">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar
                key={i}
                className={`text-xl ${
                  i < testimonials[index].rating ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-lg text-gray-800 mt-4">
            "{testimonials[index].text}"
          </p>
        </motion.div>
        
        <div className="absolute inset-y-1/2 left-0 flex items-center">
          <button
            className="p-2 bg-white/40 rounded-full shadow-md hover:bg-white/60"
            onClick={handlePrev}
          >
            ⬅️
          </button>
        </div>
        <div className="absolute inset-y-1/2 right-0 flex items-center">
          <button
            className="p-2 bg-white/40 rounded-full shadow-md hover:bg-white/60"
            onClick={handleNext}
          >
            ➡️
          </button>
        </div>
      </div>
    </div>
  );
}
