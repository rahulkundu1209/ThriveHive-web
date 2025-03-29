//npm install react-icons
import { useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import PurushottamDisplayPhoto from "../../../assets/MembersDisplayPhotos/PurushottamDisplayPhoto.jpg";
import RahulDisplayPhoto from "../../../assets/MembersDisplayPhotos/RahulDisplayPhoto.jpg";
import SubhamDisplayPhoto from "../../../assets/MembersDisplayPhotos/SubhamDisplayPhoto.jpg";
import SnehaDisplayPhoto from "../../../assets/MembersDisplayPhotos/SnehaDisplayPhoto.jpg";
import PragatiDisplayPhoto from "../../../assets/MembersDisplayPhotos/PragatiDisplayPhoto.jpg";
import RitamDisplayPhoto from "../../../assets/MembersDisplayPhotos/RitamDisplayPhoto.jpg";
import SwarnaliDisplayPhoto from "../../../assets/MembersDisplayPhotos/SwarnaliDisplayPhoto.jpg";
import AnshitaDisplayPhoto from "../../../assets/MembersDisplayPhotos/AnshitaDisplayPhoto.jpg";
import IshitaDisplayPhoto from "../../../assets/MembersDisplayPhotos/IshitaDisplayPhoto.jpg";
import HrisikeshDisplayPhoto from "../../../assets/MembersDisplayPhotos/HrisikeshDisplayPhoto.jpg";

const testimonials = [
  {
    name: "Purushottam Kumar",
    role: "3rd year undergraduate student, Techno Main Salt Lake",
    text: "Meditation and yoga have improved my self-awareness. I’ve realized that we all face similar challenges, and now I strive for self-control and self-acceptance.",
    rating: 4.5,
    image: PurushottamDisplayPhoto,
    linkedIn: ""
  },
  {
    name: "Subham Singh",
    role: "3rd year undergraduate student, Techno Main Salt Lake",
    text: "I feel more consistent and responsible. I’m taking charge of my life instead of waiting for things to happen.",
    rating: 5,
    image: SubhamDisplayPhoto,
    linkedIn: "https://www.linkedin.com/in/subham-singh-5b23b228a"
  },
  {
    name: "Sneha Rani",
    role: "3rd year undergraduate student, Techno Main Salt Lake",
    text: "I have less negative self-talk and overthinking. Meditation and yoga have helped me feel less guilty and more at peace.",
    rating: 5,
    image: SnehaDisplayPhoto,
    linkedIn: "https://www.linkedin.com/in/sneharani1818"
  },
  {
    name: "Pragati kumari",
    role: "3rd year undergraduate student, Techno Main Salt Lake",
    text: "I'm becoming more aware of my emotions. Some days I feel confident, some days I don’t, but now I check in with myself and understand my feelings better.",
    rating: 5,
    image: PragatiDisplayPhoto,
    linkedIn: ""
  },
  {
    name: "Ritam Biswas",
    role: "3rd year undergraduate student, Techno Main Salt Lake",
    text: "I feel good and more consistent. My food habits have changed, and I push myself more. I'm happy with myself and overthink less.",
    rating: 5,
    image: RitamDisplayPhoto,
    linkedIn: "https://www.linkedin.com/in/ritam-biswas-35210b241"
  },
  {
    name: "Rahul Kundu",
    role: "3rd year undergraduate student, Techno Main Salt Lake",
    text: "Thrive Hives is shaping me as a human being, equipping me with the skills to live life to the fullest and ultimately guiding me toward becoming a leader of my own life. While I reflects on different things happen with and around me I become aware about those. I feel I do lesser procrastination nowadays. My confidence has increased to express some of my thoughts in front of others. The sessions and the documentation activities help me to learn and apply self improvement lessons.",
    rating: 4.5,
    image: RahulDisplayPhoto,
    linkedIn: "https://www.linkedin.com/in/rahul1209/",
  },
  {
    name: "Swarnali Das",
    role: "2nd year undergraduate student, Techno Main Salt Lake",
    text: "My self-awareness has helped me understand my strengths and weaknesses. I’ve become more reflective—earlier, I’d spend days avoiding tasks, but now I push myself. I’m getting to know myself better.",
    rating: 5,
    image: SwarnaliDisplayPhoto,
    linkedIn: "https://www.linkedin.com/in/swarnali-das-800923293"
  },
  {
    name: "Anshita Bhattacharyya",
    role: "2nd year undergraduate student, Techno Main Salt Lake",
    text: "I have learned to build a disciplined routine, aligning my goals with consistent habits for a balanced life. It has helped me refine my decision-making and problem-solving skills, making me resilient in daily challenges. By integrating mindfulness and self-improvement techniques, I am able to lead a more fulfilling and purpose-driven life.",
    rating: 5,
    image: AnshitaDisplayPhoto,
    linkedIn: "https://www.linkedin.com/in/anshita-bhattacharyya-4562a7339"
  },
  {
    name: "Ishita Phatak",
    role: "2nd year undergraduate student, Techno Main Salt Lake",
    text: "I take my studies seriously now. I worry less about what others think of me and have improved my food and sleep habits.",
    rating: 5,
    image: IshitaDisplayPhoto,
    linkedIn: ""
  },
  {
    name: "Hrisikesh Das",
    role: "2nd year undergraduate student, Techno Main Salt Lake",
    text: "I used to think struggles were only mine, but now I see everyone has them. I’ve learned to enjoy the process instead of feeling stuck.",
    rating: 5,
    image: HrisikeshDisplayPhoto,
    linkedIn: "https://www.linkedin.com/in/hrisikesh-das-93275118b"
  },

];

export default function Testimonials() {
  const [index, setIndex] = useState(Math.floor(Math.random() * testimonials.length));

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
            onClick={() => {
              if (testimonials[index].linkedIn) {
                window.open(testimonials[index].linkedIn, "_blank");
              }
            }}
            style={{ cursor: testimonials[index].linkedIn ? "pointer" : "default" }}
          />
          <h3 className="text-2xl font-semibold text-gray-900 mt-4">
            {testimonials[index].name}
          </h3>
          <p className="text-gray-600 italic">{testimonials[index].role}</p>
          {/* <div className="flex justify-center my-2">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar
                key={i}
                className={`text-xl ${
                  i < testimonials[index].rating ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div> */}
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
