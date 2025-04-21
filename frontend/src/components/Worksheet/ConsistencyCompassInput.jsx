import React, { useState, useEffect } from 'react';
import DateFormatter from './DateFormatter';
import { useAuthContext } from '../../App';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

const consistencyCompass = {
  secion_id: 2,
  section_title: "Consistency Compass",
  type: "consistency_compass",
  times: ["Morning", "Midday (After Main Task)", "Evening (End of the Day)"],
  worksheet: {
    morning: {
      description: "Start of the Day",
      sections: [
        {
          heading: "My Overarching Goal (Write the same line every day)",
          questions: [
            {
              q_id: "q1",
              type: "text",
              title: "What is your goal?"
            }
          ]
        },
        {
          heading: "Check Tasks (Yes/No)",
          questions: [
            {
              q_id: "q2",
              type: "checklist",
              title: "Which ones of the following have you done?",
              options: [
                {
                  id: 1,
                  text: "Made your bed (5 min)",
                },
                {
                  id: 2,
                  text: "Sat on bed & visualized the day",
                },
                {
                  id: 3,
                  text: "Drank at least 1 liter of water",
                },
                {
                  id: 4,
                  text: "Walked for 5 minutes",
                },
                {
                  id: 5,
                  text: "Washed face, hands, feet, brushed teeth",
                },
                {
                  id: 6,
                  text: "Wore clean, fresh clothes",
                },
                {
                  id: 7,
                  text: "Did guided meditation/affirmation (10 min)",
                },
                {
                  id: 8,
                  text: "Did light stretching (10 min)",
                },
                {
                  id: 9,
                  text: "Read a spiritual/reflective book (10 min)",
                },
                {
                  id: 10,
                  text: "Had light breakfast (no milk tea or oily snacks)",
                },
              ]
            }
          ]
        },
        {
          heading: "Morning Reflection",
          questions: [
            {
              q_id: "q3",
              type: "text",
              title: "🌄 What does your ideal day look like today? (1–2 lines)?"
            },
            {
              q_id: "q4",
              type: "text",
              title: "🗓️ Planned Time Blocks for Today"
            }
          ]
        }
      ]
    }
  }
}

const ConsistencyCompassInput = ({section_id}) => {
  const currentDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }).split(",")[0];
  const {signedIn} = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [userInput, setUserInput] = useState({});

  useEffect(() =>{
    const fetchWorksheetData = async () => {
      setLoading(true);
      try {
        const auth = getAuth();
        const token = await auth.currentUser.getIdToken();
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/worksheet-response/fetch-cache`,
          {
            params: { section_id, date: currentDate },
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        
        console.log("Response:", response.data);
  
        if (response.data.success && response.data.data.response) {
          setUserInput(response.data.data.response);
        }
      } catch (error) {
        console.error("Error fetching worksheet data:", error.message);
      }
      setLoading(false);
    };
  
    fetchWorksheetData();
  }, []);

  const handleUserInput = (e, q_id, time) => {
    // e.preventDefault();
    const value = e.target.value;
    setUserInput(prevState => {
      if (q_id.startsWith("q2_")) { //handle the checkbox inputs
        // console.log("q2_", e.target.checked)
      const existingArray = prevState[time]?.q2 || [];
      const updatedArray = existingArray.filter(item => !item[q_id]);
      updatedArray.push({ [q_id]: e.target.checked });
      return {
        ...prevState,
        [time]: {
        ...prevState[time],
        q2: updatedArray
        }
      };
      } else if (q_id.startsWith("q11_")) {
        // console.log("q11_", e.target.checked)
        const existingArray = prevState[time]?.q11 || [];
        const updatedArray = existingArray.filter(item => !item[q_id]);
        updatedArray.push({ [q_id]: e.target.checked });
        return {
          ...prevState,
          [time]: {
          ...prevState[time],
          q11: updatedArray
          }
        };
      } else {
      return {
        ...prevState,
        [time]: {
        ...prevState[time],
        [q_id]: value
        }
      };
      }
    });
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!signedIn) {
      alert("Please sign in to submit your responses!");
      setSubmitting(false);
      return;
    }

    // let allFieldsFilled = true;
    // questions.forEach((question) => {
    //   times.forEach((time) => {
    //     if (!userInput[question.q_id] || !userInput[question.q_id][time]) {
    //       // console.log("No input for: ", question.q_id, " ", time);
    //       allFieldsFilled = false;
    //     }
    //   });
    // });

    // if (!allFieldsFilled) {
    //   setIncompleteResponse(true);
    //   alert("Please fill in all the fields before submitting!");
    //   setSubmitting(false);
    //   return;
    // }

    // setIncompleteResponse(false);

    // Construct worksheetData directly
    const worksheetData = { date: currentDate, section_id: 2, responses: userInput };
    console.log(worksheetData);
    try {
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken();
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/worksheet-response/submit`, 
        { date: worksheetData.date, section_id: worksheetData.section_id, userResponses: worksheetData.responses }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      console.log("Response:", response.data);
      alert("Responses submitted successfully!");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Response already submitted.");
      } else {
        alert("Failed to submit responses. Please try again.");
      }
      console.error("There was an error submitting the responses!", error.message);
    }
    setSubmitting(false);
};

  const handleResponseSave = async (e) =>{
    e.preventDefault();
    setSaving(true);
    if (!signedIn) {
      alert("Please sign in to save your responses!");
      setSaving(false);
      return;
    }
    const worksheetData = { date: currentDate, section_id: 2, responses: userInput };
    try {
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken();
      const response = await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/worksheet-response/save`, 
        { date: worksheetData.date, section_id: worksheetData.section_id, userResponses: worksheetData.responses }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // console.log("Response:", response.data);
      alert("Responses saved successfully!");
    } catch (error) {
      console.error("There was an error saving the responses!", error.message);
    }
    setSaving(false);
  }

  const handleFileUpload = async (e) => {
    //File upload to supbase bucket
  }

  return (
    <>
    {loading? 
    <div>
      Loading...
    </div> :
    <div className="consistancy-compus p-6 bg-babyblue rounded-lg shadow-md text-left">
      <p className="text-gray-600 text-center mb-4">📅 Date: {currentDate}</p>
      <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">🌅 Morning (Start of the Day)</h1>
      <form className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-700">🧭 My Overarching Goal</h2>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          placeholder="your answer..."
          rows="2"
          id="q1"
          onChange={(e) => handleUserInput(e, "q1", "Morning")}
          value={userInput?.Morning?.q1 || ""}
        ></textarea>
        <hr className="border-black" />

        <h2 className="text-xl font-semibold text-gray-700">✅ Check Tasks (Yes/No)</h2>
        <div className="space-y-2">
          {[
            "Made your bed (5 min)",
            "Sat on bed & visualized the day",
            "Drank at least 1 liter of water",
            "Walked for 5 minutes",
            "Washed face, hands, feet, brushed teeth",
            "Wore clean, fresh clothes",
            "Did guided meditation/affirmation (10 min)",
            "Did light stretching (10 min)",
            "Read a spiritual/reflective book (10 min)",
            "Had light breakfast (no milk tea or oily snacks)(optional)",
          ].map((task, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox text-blue-500"
                id={`q2_${index + 1}`}
                onChange={(e) => handleUserInput(e, `q2_${index + 1}`, "Morning")}
                checked={userInput?.Morning?.q2?.some(item => item[`q2_${index + 1}`]) || false}
              />
              <span className="text-gray-700">{task}</span>
            </label>
          ))}
        </div>
        <hr className="border-black" />

        <h2 className="text-xl font-semibold text-gray-700">📝 Morning Reflection</h2>
        <label className="block">
          <span className="text-gray-700">🌄 What does your ideal day look like today? (1–2 lines)</span>
          <textarea
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            rows="2"
            placeholder="your answer..."
            id="q3"
            onChange={(e) => handleUserInput(e, "q3", "Morning")}
            value={userInput?.Morning?.q3 || ""}
          />
        </label>
        <hr className="border-black" />

        <h2 className="text-xl font-semibold text-gray-700">🗓️ Planned Time Blocks for Today</h2>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          placeholder="Example: 10–11am: Study DS Algo; 11–12pm: Class; 12–1pm: Journal, etc."
          rows="4"
          id="q4"
          onChange={(e) => handleUserInput(e, "q4", "Morning")}
          value={userInput?.Morning?.q4 || ""}
        ></textarea>
        <hr className="border-black" />

        <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">🔆 Midday (After Main Task)</h1>
        <h2 className="text-xl font-semibold text-gray-700">📌 About Your Main Task</h2>
        <label className="block">
          <span className="text-gray-700">🧠 What was your main task today?</span>
          <textarea
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            rows="2"
            placeholder="your answer..."
            id="q5"
            onChange={(e) => handleUserInput(e, "q5", "Midday")}
            value={userInput?.Midday?.q5 || ""}
          ></textarea>
        </label>
        <label className="block">
          <span className="text-gray-700">🎯 What did you try to accomplish through it?</span>
          <textarea
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            rows="2"
            placeholder="your answer..."
            id="q6"
            onChange={(e) => handleUserInput(e, "q6", "Midday")}
            value={userInput?.Midday?.q6 || ""}
          ></textarea>
        </label>
        <hr className="border-black" />

        <h2 className="text-xl font-semibold text-gray-700">💬 Learning Prompt for ChatGPT</h2>
        <label className="block">
          <span className="text-gray-700">✍️ Topic or project you studied/worked on:</span>
          <textarea
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            rows="2"
            placeholder="your answer..."
            id="q7"
            onChange={(e) => handleUserInput(e, "q7", "Midday")}
            value={userInput?.Midday?.q7 || ""}
          ></textarea>
        </label>
        <label className="block">
          <span className="text-gray-700">💡 Write a prompt for ChatGPT to test your understanding:</span>
          <textarea
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            rows="2"
            placeholder="Example: Ask me questions from [topic/project] to check my grasp on it."
            id="q8"
            onChange={(e) => handleUserInput(e, "q8", "Midday")}
            value={userInput?.Midday?.q8 || ""}
          ></textarea>
        </label>
        <label className="block">
          <span className="text-gray-700">🧠 What was your strategy to form the prompt?</span>
          <textarea
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            rows="2"
            placeholder="your answer..."
            id="q9"
            onChange={(e) => handleUserInput(e, "q9", "Midday")}
            value={userInput?.Midday?.q9 || ""}
          ></textarea>
        </label>
        <h3 className="text-lg font-semibold text-gray-700">🧪 Practice Questions (5 Qs & Your Answers)</h3>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          rows="5"
          placeholder="Example: 1. Q:__ A:__"
          id="q10"
          onChange={(e) => handleUserInput(e, "q10", "Midday")}
          value={userInput?.Midday?.q10 || ""}
        />
        <hr className="border-black" />

        <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">🌙 Evening (End of the Day)</h1>
        <h2 className="text-xl font-semibold text-gray-700">✅ Check Tasks (Yes/No)</h2>
        <div className="space-y-2">
          {[
            "Went for a walk or did some physical movement",
            "Ate healthy snacks (avoided oily/fried food)",
            "Did guided meditation (15 min)",
            "Spoke to your accountability partner",
            "Shared your day’s summary with them",
          ].map((task, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox text-blue-500"
                id={`q11_${index + 1}`}
                onChange={(e) => handleUserInput(e, `q11_${index + 1}`, "Evening")}
                checked={userInput?.Evening?.q11?.some(item => item[`q11_${index + 1}`]) || false}
              />
              <span className="text-gray-700">{task}</span>
            </label>
          ))}
        </div>
        <hr className="border-black" />

        <h2 className="text-xl font-semibold text-gray-700">💭 Evening Reflection</h2>
        <label className="block">
          <span className="text-gray-700">🙏 One thing you’re grateful for today:</span>
          <textarea
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            rows="2"
            placeholder="your answer..."
            id="q12"
            onChange={(e) => handleUserInput(e, "q12", "Evening")}
            value={userInput?.Evening?.q12 || ""}
          ></textarea>
        </label>
        <label className="block">
          <span className="text-gray-700">🪞 What did you learn about yourself today?</span>
          <textarea
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            rows="2"
            placeholder="your answer..."
            id="q13"
            onChange={(e) => handleUserInput(e, "q13", "Evening")}
            value={userInput?.Evening?.q13 || ""}
          ></textarea>
        </label>
        <label className="block">
          <span className="text-gray-700">🌱 How can you keep pushing yourself while staying calm at heart?</span>
          <textarea
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            rows="2"
            placeholder="your answer..."
            id="q14"
            onChange={(e) => handleUserInput(e, "q14", "Evening")}
            value={userInput?.Evening?.q14 || ""}
          ></textarea>
        </label>
        <label className="block">
          <span className="text-gray-700">🤝 What is accountability teaching you?</span>
          <textarea
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            rows="2"
            placeholder="your answer..."
            id="q15"
            onChange={(e) => handleUserInput(e, "q15", "Evening")}
            value={userInput?.Evening?.q15 || ""}
          ></textarea>
        </label>
        <label className='block'>
          <span>⏰ What is your screen time?</span>
          <div className='flex flex-row space-x-4'>
            <input
              type='time'
              className='w-fit mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white'
              id="q16"
              onChange={(e) => handleUserInput(e, "q16", "Evening")}
              value={userInput?.Evening?.q16 || ""}
            />
          </div>
        </label>
        <div className='flex justify-end'>
          <button
            className='bg-steelblue text-white rounded-md p-2 mr-2 px-4 hover:cursor-pointer'
            type='submit'
            onClick={handleResponseSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            className='bg-steelblue text-white rounded-md p-2 px-4 hover:cursor-pointer'
            type='submit'
            onClick={handleSubmission}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>}
    </>
  );
};

export default ConsistencyCompassInput;