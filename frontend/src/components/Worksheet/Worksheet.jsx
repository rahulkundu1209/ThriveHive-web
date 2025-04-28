import React, { useState } from 'react'
import SectionInput from './SectionInput';
import { useEffect } from 'react';
import axios from 'axios';
import SectionCard from './SectionCard';
import ConsistencyCompassInput from './ConsistencyCompassInput';

// const worksheetContent= {
//   title: 'Learning How to Learn',
//   startDate: "14-03-2025",
//   endDate: "18-03-2025",
//   description: "Often the problem we are unable to manage our time is not that there is too much work but that we don’t know the efficient process in place so that we can learn or do things faster while extracting more impact as well as personal growth.",
//   sections: [
//   //   {
//   //     title: "Reflection on Session",
//   //     type: "paragraphs",
//   //     description: "Understanding your current perspective and key takeaways from the session. To be done at Day 1.",
//   //     questions:[
//   //       "Out of all the things we talked about learning how to learn strategies, which ones have you tried already?",
//   //       "What questions arise in your mind after you understand the strategies on learning?",
//   //       "Was there an ‘aha’ moment during the session that resonated with you?",
//   //       "Were there any parts of the session that felt unhelpful or unclear?",
//   //       "Summarize your key learning from the session in a few sentences."
//   //     ]
//   //   },
//   //   {
//   //     title: "Food and Information",
//   //     type: "table",
//   //     description: `Increase your awareness about food you take and its impact on your body. M: Morning, N: Noon, A: Afternoon, E-Evening/Night`,
//   //     times: ["M", "N", "A", "E"],
//   //     date: "",
//   //     questions:[
//   //       {
//   //         title: "Time",
//   //         inputType: "time",
//   //       },
//   //       {
//   //         title: "What did you consume? Food and Information. ",
//   //         inputType: "text",
//   //       },
//   //       {
//   //         title: "Enjoyed?",
//   //         inputType: "select",
//   //         options: ["Yes", "No"]
//   //       },
//   //       {
//   //         title: "Energy Level",
//   //         inputType: "select",
//   //         options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
//   //       },
//   //       {
//   //         title: "Self Awareness",
//   //         inputType: "select",
//   //         options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
//   //       },
//   //       {
//   //         title: "Dominating Thoughts",
//   //         inputType: "text",
//   //       },
//   //       {
//   //         title: "Emotions/ Feelings",
//   //         inputType: "text",
//   //       },
//   //     ]
//   //   },
//   //   {
//   //     title: "Goal Setting",
//   //     // type: "table",
//   //     // question:[
        
//   //     // ]
//   //   },
//   //   {
//   //     title: "Habit Tracker"
//   //   },
//   //   {
//   //     title: "Daily Reflection"
//   //   },
//   //   {
//   //     title: "Accountability Partner"
//   //   },
//   //   {
//   //     title: "Last Section"
//   //   },
//   ]
// }

const Worksheet = () => {
  const [worksheets, setWorksheets] = useState([]);
  const [loading, setLoading] = useState(false);

  //Get sections from http://localhost:5000/api/worksheet and set it to worksheetContent.sections
  useEffect(() => {
    const fetchSections = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/worksheet/sections`);
        // console.log(response.data);
        setWorksheets([...worksheets, ...response.data]);
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
      setLoading(false);
    };

    fetchSections();
  }, []);
  // console.log(worksheetContent.sections);
  return (
    <div className='space-y-4'>
      {/* <div>
        <h2 className='text-4xl'>{worksheetContent.title}</h2>
      </div>
      <div>
        <div className='flex flex-row justify-between'>
          <span className='flex flex-row'>
            <p className='font-bold'>Start Date:</p> 
            {worksheetContent.startDate}
          </span>
          <span className='flex flex-row'>
            <p className='font-bold'>End Date:</p>
            {worksheetContent.endDate}
          </span>
        </div>
      </div>
      <div>
        <span className='flex flex-row'>
          <p className='font-bold'>Description:</p> 
          {worksheetContent.description}
        </span>
      </div> */}
      <div>
        {loading ? <p>Loading...</p> : 
        <ul>
        {worksheets?.map((worksheet, index) => (
          <li key={index} >
            {worksheet.type === "table" &&
            <SectionCard index={index+1} section_title={worksheet.section_title}>
              <SectionInput content={worksheet}/>
            </SectionCard>}
            {worksheet.type === "consistency_compass" &&
            <SectionCard index={index+1} section_title={worksheet.section_title}>
              <ConsistencyCompassInput section_id={2}/>
            </SectionCard>}
          </li>
        ))}
        </ul>}
      </div>
    </div>
  )
}

export default Worksheet
