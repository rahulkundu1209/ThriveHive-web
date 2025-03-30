import React, { useState } from 'react';
import DateFormatter from './DateFormatter';
import { useAuthContext } from '../../App';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

// const ParagraphInput = ({questions}) => {
//   // console.log(questions);
//   return (
//     <form className='p-4'>
//       <div className='flex flex-col p-2'>
//         {
//           questions?.map((question, index) => (
//             <div>
//             <div key={index} className='flex flex-row m-2'>
//               <p>{index + 1}.</p>
//               <p>{question}</p>
//             </div>
//             <textarea
//               className='rounded-md p-2 bg-white w-full'
//               placeholder='Your answer...'
//               rows={3}
//             />
//             </div>
//           ))
//         }
//       </div>
//       <div className='flex justify-end'>
//         <button
//           className='bg-steelblue text-white rounded-md p-2 px-4 hover:cursor-pointer'
//           type='submit'
//         >
//           Save
//         </button>
//       </div>
//     </form>
//   )
// }

const TableInput = ({section_id, questions, times}) => {
  // console.log(questions);
  // console.log(section_id);
  // console.log(times)
  const currentDate = new Date().toISOString().split("T")[0];
  const {signedIn} = useAuthContext();
  const [dayCount, setDayCount] = useState(1);
  const [userInput, setUserInput] = useState({});
  const [worksheetData, setWorksheetData] = useState({});
  const [incompleteResponse, setIncompleteResponse] = useState(false);
  const [saving, setSaving] = useState(false);

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
    console.log(userInput);
  }

  const handleSubmission = async (e) => {
    e.preventDefault();
    setSaving(true);
    if (!signedIn) {
      alert("Please sign in to save your responses!");
      return;
    }

    let allFieldsFilled = true;
    questions.forEach((question) => {
      times.forEach((time) => {
        if (!userInput[question.q_id] || !userInput[question.q_id][time]) {
          console.log("No input for: ", question.q_id, " ", time);
          allFieldsFilled = false;
        }
      });
    });

    if (!allFieldsFilled) {
      setIncompleteResponse(true);
      alert("Please fill in all the fields before submitting!");
      return;
    }

    setIncompleteResponse(false);

    // Construct worksheetData directly
    const worksheetData = { date: currentDate, section_id, responses: userInput };
    console.log(worksheetData);
    try {
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken();
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/worksheetresponse/save`, 
        { worksheetResponse: worksheetData }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      console.log("Response:", response.data);
      alert("Responses saved successfully!");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Response already submitted.");
      } else {
        alert("Failed to save responses. Please try again.");
      }
      console.error("There was an error saving the responses!", error.message);
    }
    setSaving(false);
};

  
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
          className='bg-steelblue text-white rounded-md p-2 px-4 hover:cursor-pointer'
          type='submit'
          onClick={handleSubmission}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
    {/* <button
      className='bg-steelblue text-white rounded-md p-2 px-4 hover:cursor-pointer r-0 m-4'
      onClick={dayCount < 5 ? () => setDayCount(dayCount + 1) : () => {}}
    >
      Add Day +
    </button> */}
    </div>
)}

const SectionInput = ({content}) => {
  console.log(content);
  const {section_id, type, questions, times} = content;
  // console.log(type, questions)
  return (
    <div>
      {/* <div className='p-4'>
        <p className='font-bold'>Description:</p>
        {description ? <p>{description}</p> : <p>No description available!</p>}
      </div> */}
      {type == "paragraphs" && <ParagraphInput questions={questions}/>}
      {type == "table" && <TableInput section_id={section_id} questions={questions} times={times}/>}
    </div>
  )
}

export default SectionInput
