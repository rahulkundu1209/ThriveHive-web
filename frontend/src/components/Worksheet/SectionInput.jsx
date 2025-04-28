import React, { useEffect, useState } from 'react';
import DateFormatter from './DateFormatter';
import { useAuthContext } from '../../App';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

const TableInput = ({section_id, questions, times}) => {
  // console.log(questions);
  // console.log(section_id);
  // console.log(times)
  const currentDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }).split(",")[0];
  const {signedIn} = useAuthContext();
  const [userInput, setUserInput] = useState({});
  const [worksheetData, setWorksheetData] = useState({});
  const [incompleteResponse, setIncompleteResponse] = useState(false);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() =>{
    const fetchWorksheetData = async () => {
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
        

        // console.log("Response:", response.data);

        if (response.data.success && response.data.data.response) {
          setUserInput(response.data.data.response);
        }
      } catch (error) {
        console.error("Error fetching worksheet data:", error.message);
      }
    };

    fetchWorksheetData();
  }, [])

  const handleUserInput = (e, q_id, time) => {
    e.preventDefault();
    const value = e.target.value;
    // console.log(q_id, time, value);
    setUserInput(prevState => ({
      ...prevState,
      [q_id]: {
      ...prevState[q_id],
      [time]: value
      }
    }));
    // console.log(userInput);
  }

  const handleSubmission = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!signedIn) {
      alert("Please sign in to submit your responses!");
      setSubmitting(false);
      return;
    }

    let allFieldsFilled = true;
    questions.forEach((question) => {
      times.forEach((time) => {
        if (!userInput[question.q_id] || !userInput[question.q_id][time]) {
          // console.log("No input for: ", question.q_id, " ", time);
          allFieldsFilled = false;
        }
      });
    });

    if (!allFieldsFilled) {
      setIncompleteResponse(true);
      alert("Please fill in all the fields before submitting!");
      setSubmitting(false);
      return;
    }

    setIncompleteResponse(false);

    // Construct worksheetData directly
    const worksheetData = { date: currentDate, section_id, responses: userInput };
    // console.log(worksheetData);
    try {
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken();
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/worksheet-response/submit`, 
        { date: worksheetData.date, section_id: worksheetData.section_id, userResponses: worksheetData.responses }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
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
    const worksheetData = { date: currentDate, section_id, responses: userInput };
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
  
  return(
    <div className='p-4'>
    <form className='mb-4'>
      <div className="overflow-x-auto pb-4">
        <div className="overflow-x-scroll custom-scrollbar">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 min-w-[50px] border text-center w-fit">Date</th>
                <th className="p-2 min-w-[50px]  border text-center w-fit">Time</th>
                {questions?.map((question, index) => (
                  <th 
                    className="p-1 min-w-[fit] border text-center w-fit"
                    key={index}
                  >
                    {question.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {times?.map((time, tIndex) => (
              <tr key={tIndex}>
                {tIndex === 0 && (
                      <td 
                        className="p-2 border text-center font-semibold"
                        rowSpan={times.length} // Merge all rows in first column
                      >
                        <DateFormatter date={currentDate}/>
                      </td>
                    )}
                  <td className="p-2 border text-center font-semibold w-10">{time}</td>
                {questions?.map((question, index) => (
                  <td
                    className="p-2 min-w-[50px] border w-fit"
                    key={index}
                  >
                    {question.input_type == "time" &&
                      (<p className="rounded-md p-2 w-fit">
                        {time}
                      </p>)
                    }
                    {question.input_type == "text" &&
                      (<textarea
                        required={true}
                        value={userInput[question.q_id]?.[time] || ""}
                        onChange={(e) => handleUserInput(e, question.q_id, time)}
                        className="rounded-md p-2 bg-white w-fit"
                        placeholder="Your answer..."
                        rows={3}
                        cols={15}
                      />)
                    }
                    {question.input_type == "select" &&
                      (<select
                        required={true}
                        value={userInput[question.q_id]?.[time] || 0}
                        onChange={(e) => handleUserInput(e, question.q_id, time)}
                        className="rounded-md p-1 bg-white w-fit"
                      >
                        <option value={0}>0</option>
                        {question.options?.map((option, index) => (
                          <option key={index} value={option}>{option}</option>
                        ))}
                      </select>)
                    }
                  </td>
                ))}
              </tr>))}
            </tbody>
          </table>
        </div>
      </div>
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
    </div>
)}

const SectionInput = ({content}) => {
  // console.log(content);
  const {section_id, type, questions, times} = content;
  // console.log(type, questions)
  return (
    <div>
      {type == "paragraphs" && <ParagraphInput questions={questions}/>}
      {type == "table" && <TableInput section_id={section_id} questions={questions} times={times}/>}
    </div>
  )
}

export default SectionInput
