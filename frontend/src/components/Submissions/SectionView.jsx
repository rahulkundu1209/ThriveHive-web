import React, { useEffect, useState } from 'react'
import { auth } from '../../utils/firebaseConfig';
import axios from 'axios';
import DateFormatter from '../Worksheet/DateFormatter';

export const TableView = ({section_id, questions, times, responses}) => {
  console.log(questions);
  console.log(responses);
  console.log(times);
  const dates = responses?.map(response => {
    const date = new Date(response.date);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  });
  
  const [selectedDate, setSelectedDate] = useState({value: "All", index: -1});
  // const times = ["M", "N", "A", "E"];

  return(
    <>
      <div className="overflow-x-auto pb-4 custom-scrollbar">
        <div className="mb-4 mt-4">
          <label htmlFor="dateFilter" className="mr-2">Select Date:</label>
          <select
            id="dateFilter"
            className="rounded-md p-1 bg-white"
            onChange={(e) => {
              setSelectedDate({value: e.target.value, index: e.target.selectedIndex - 1});
              console.log({value: e.target.value, index: e.target.selectedIndex - 1})
            }}
          >
            <option key={-1} value="All">All</option>
            {dates?.map((date, index) => (
              <option key={index} value={date}>{date}</option>
            ))}
          </select>
        </div>
        <div className="overflow-x-scroll custom-scrollbar p-4">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 min-w-[50px] max-w-[150px] border text-center w-fit">Date</th>
                <th className="p-2 min-w-[50px] max-w-[150px] border text-center w-fit">Time</th>
                {questions?.map((question, index) => (
                  <th 
                    className="p-1 min-w-[fit] max-w-[150px] border text-center w-fit"
                    key={index}
                  >
                    {question.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
            {selectedDate.value == "All" ?
              (
                responses?.map((responsee, index) =>(
                  <>
                  {times?.map((time, tIndex) =>(
                    <tr key={tIndex}>
                      {tIndex === 0 && 
                      <td
                      className="p-2 border text-center font-semibold"
                      rowSpan={times.length}
                      >
                        <DateFormatter date={dates[index]} />
                      </td>}
                      <td className="p-2 border text-center font-semibold w-10">{time}</td>
                      {questions.map((question, index) =>(
                        <td
                        className="p-2 min-w-[50px] max-w-[150px] border w-fit"
                        key={index}
                        >
                          {/* <p>{responses[selectedDate.index].response[question.id][time]}</p> */}
                          <p>{responsee.response[question.q_id][time]}</p>
                        </td>
                      ))}
                    </tr>
                  ))}
                  </>
                ))
              ) : (
                times?.map((time, tIndex) =>(
                  <tr key={tIndex}>
                    {tIndex === 0 && 
                    <td
                    className="p-2 border text-center font-semibold"
                    rowSpan={times.length}
                    >
                      <DateFormatter date={selectedDate.value} />
                    </td>}
                    <td className="p-2 border text-center font-semibold w-10">{time}</td>
                    {questions.map((question, index) =>(
                      <td
                      className="p-2 min-w-[50px] max-w-[150px] border w-fit"
                      key={index}
                      >
                        {/* <p>{responses[selectedDate.index].response[question.id][time]}</p> */}
                        <p>{responses[selectedDate.index].response[question.q_id][time]}</p>
                      </td>
                    ))}
                  </tr>
                ))
              )
            }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

const SectionView = ({content}) => {
  const {section_id, type, questions, times} = content;
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        setLoading(true);
        const token = await auth.currentUser.getIdToken();
        const response = await axios.get('http://localhost:5000/api/worksheetresponse/view', {
          headers: { Authorization: `Bearer ${token}` },
          params: { section_id: section_id }
        });
  
        if (response.data.success) {
          setResponses(response.data.responses);
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
    {loading ? 
    <p>Loading...</p> :
    <div>
      {responses === null || responses.length === 0 ?
      <p>You have no submissions yet!</p> :
      <div>
        {type == "table" && <TableView section_id={section_id} questions={questions} times={times} responses={responses}/>}
      </div>}
    </div>
    }
    </>
  )
}

export default SectionView
