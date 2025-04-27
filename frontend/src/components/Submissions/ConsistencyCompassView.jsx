import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { auth } from '../../utils/firebaseConfig';

export const DisplayResponse = ({response}) =>{
  // console.log(response)
  const morningTasks = [
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
  ];

  const eveningTasks = [
    "Went for a walk or did some physical movement",
    "Ate healthy snacks (avoided oily/fried food)",
    "Did guided meditation (15 min)",
    "Spoke to your accountability partner",
    "Shared your day’s summary with them",
  ];

  return(
    <div className="consistancy-compus p-6 bg-babyblue rounded-lg shadow-md text-left">
      <p className="text-gray-600 text-center mb-4">📅 Date: {response?.date}</p>
      <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">🌅 Morning (Start of the Day)</h1>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-700">🧭 My Overarching Goal</h2>
        <p
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          {response?.response?.Morning?.q1 || ""}
        </p>
        <hr className="border-black" />
        <h2 className="text-xl font-semibold text-gray-700">✅ Check Tasks (Yes/No)</h2>
        <div className="space-y-2">
          {morningTasks.map((task, index) => (
            <label key={index} className="flex items-center space-x-2">
              <span>{response?.response?.Morning?.q2?.some(item => item[`q2_${index + 1}`]) ? "✅" : "❌"}</span>
              <span className="text-gray-700">{task}</span>
            </label>
          ))}
        </div>
        <hr className="border-black" />

        <h2 className="text-xl font-semibold text-gray-700">📝 Morning Reflection</h2>
        <label className="block">
          <span className="text-gray-700">🌄 What does your ideal day look like today? (1–2 lines)</span>
          <p
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {response?.response?.Morning?.q3 || ""}
          </p>
        </label>
        <hr className="border-black" />

        <h2 className="text-xl font-semibold text-gray-700">🗓️ Planned Time Blocks for Today</h2>
        {Array.isArray(response?.response?.Morning?.q4) ? (
          <div className="space-y-2">
            {response?.response?.Morning?.q4?.map((task, index) => (
              <label key={index} className="flex items-center space-x-2">
                <span>{task[`q4_${index + 1}`] === true ? "✅" : "❌"}</span>
                <span className="text-gray-700">{task.text}</span>
              </label>
            ))}
          </div>
        ) : (
          <p
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {response?.response?.Morning?.q4 || ""}
          </p>
        )}

        <hr className="border-black" />

        <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">🔆 Midday (After Main Task)</h1>
        <h2 className="text-xl font-semibold text-gray-700">📌 About Your Main Task</h2>
        <label className="block">
          <span className="text-gray-700">🧠 What was your main task today?</span>
          <p
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {response?.response?.Midday?.q5 || ""}
          </p>
        </label>
        <label className="block">
          <span className="text-gray-700">🎯 What did you try to accomplish through it?</span>
          <p
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {response?.response?.Midday?.q6 || ""}
          </p>
        </label>
        <hr className="border-black" />

        <h2 className="text-xl font-semibold text-gray-700">💬 Learning Prompt for ChatGPT</h2>
        <label className="block">
          <span className="text-gray-700">✍️ Topic or project you studied/worked on:</span>
          <p
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {response?.response?.Midday?.q7 || ""}
          </p>
        </label>
        <label className="block">
          <span className="text-gray-700">💡 Write a prompt for ChatGPT to test your understanding:</span>
          <p
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {response?.response?.Midday?.q8 || ""}
          </p>
        </label>
        <label className="block">
          <span className="text-gray-700">🧠 What was your strategy to form the prompt?</span>
          <p
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {response?.response?.Midday?.q9 || ""}
          </p>
        </label>
        <h3 className="text-lg font-semibold text-gray-700">🧪 Practice Questions (5 Qs & Your Answers)</h3>
        <p
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          {response?.response?.Midday?.q10 || ""}
        </p>
        <hr className="border-black" />

        <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">🌙 Evening (End of the Day)</h1>
        <h2 className="text-xl font-semibold text-gray-700">✅ Check Tasks (Yes/No)</h2>
        <div className="space-y-2">
          {eveningTasks.map((task, index) => (
            <label key={index} className="flex items-center space-x-2">
              <span>{response?.response?.Evening?.q11?.some(item => item[`q11_${index + 1}`]) ? "✅" : "❌"}</span>
              <span className="text-gray-700">{task}</span>
            </label>
          ))}
        </div>
        <hr className="border-black" />

        <h2 className="text-xl font-semibold text-gray-700">💭 Evening Reflection</h2>
        <label className="block">
          <span className="text-gray-700">🙏 One thing you’re grateful for today:</span>
          <p
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {response?.response?.Evening?.q12 || ""}  
          </p>
        </label>
        <label className="block">
          <span className="text-gray-700">🪞 What did you learn about yourself today?</span>
          <p
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {response?.response?.Evening?.q13 || ""}
          </p>
        </label>
        <label className="block">
          <span className="text-gray-700">🌱 How can you keep pushing yourself while staying calm at heart?</span>
          <p
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {response?.response?.Evening?.q14 || ""}
          </p>
        </label>
        <label className="block">
          <span className="text-gray-700">🤝 What is accountability teaching you?</span>
          <p
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {response?.response?.Evening?.q15 || ""}
          </p>
        </label>
        <label className="block">
          <span className="text-gray-700">⏰ What is your screen time?</span>
          <p
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {response?.response?.Evening?.q16 || ""}
          </p>
        </label>
      </div>
    </div>
  )
}

const ConsistencyCompassView = ({ section_id }) => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dates, setDates] = useState(null);
  const [selectedDate, setSelectedDate] = useState({ value: "All", index: -1 });

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        setLoading(true);
        const token = await auth.currentUser.getIdToken();
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/worksheetresponse/view`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { section_id: section_id }
        });

        if (response.data.success) {
          setResponses(response.data.responses);

          const dates = response.data.responses?.map(response => {
            const date = new Date(response.date);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${year}-${month}-${day}`;
          });
          setDates(dates);

          console.log(response.data.responses);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        console.error('Error fetching responses:', err);
        setError('Failed to fetch responses.');
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, []);

  return (
    <>
      {loading ? <div>
        Loading...
      </div> :
        <div>
          {responses === null || responses.length === 0 ?
            <p>You have no submissions yet!</p> :
            <div>
              <div className="mb-4">
                <label htmlFor="dateFilter" className="mr-2">Select Date:</label>
                <select
                  id="dateFilter"
                  className="rounded-md p-1 bg-white"
                  onChange={(e) => {
                    setSelectedDate({ value: e.target.value, index: e.target.selectedIndex - 1 });
                    // console.log({ value: e.target.value, index: e.target.selectedIndex - 1 })
                  }}
                >
                  <option key={-1} value="All">All</option>
                  {dates?.map((date, index) => (
                    <option key={index} value={date}>{date}</option>
                  ))}
                </select>
              </div>
            </div>
          }
          {selectedDate.value === "All" ? 
          <div>
            {responses?.map((response, index) => (
              <DisplayResponse key={index} response={response} />
            ))}
          </div> : 
          <div>
            <DisplayResponse response={responses[selectedDate.index]} />
          </div>
          }
        </div>}
    </>
  )
}

export default ConsistencyCompassView