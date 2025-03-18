import React, { useState } from 'react'
import {ChevronDownIcon} from '@heroicons/react/24/outline'
import SectionInput from './SectionInput';

const worksheetContent= {
  title: 'Learning How to Learn',
  startDate: "14-03-2025",
  endDate: "18-03-2025",
  description: "Often the problem we are unable to manage our time is not that there is too much work but that we don’t know the efficient process in place so that we can learn or do things faster while extracting more impact as well as personal growth.",
  sections: [
    // {
    //   title: "Reflection on Session",
    //   type: "paragraphs",
    //   description: "Understanding your current perspective and key takeaways from the session. To be done at Day 1.",
    //   questions:[
    //     "Out of all the things we talked about learning how to learn strategies, which ones have you tried already?",
    //     "What questions arise in your mind after you understand the strategies on learning?",
    //     "Was there an ‘aha’ moment during the session that resonated with you?",
    //     "Were there any parts of the session that felt unhelpful or unclear?",
    //     "Summarize your key learning from the session in a few sentences."
    //   ]
    // },
    {
      title: "Food and Information",
      type: "table",
      description: `Increase your awareness about food you take and its impact on your body. M: Morning, N: Noon, A: Afternoon, E-Evening/Night`,
      times: ["M", "N", "A", "E"],
      date: "",
      questions:[
        {
          title: "Time",
          inputType: "time",
        },
        {
          title: "What did you consume? Food and Information. ",
          inputType: "text",
        },
        {
          title: "Enjoyed?",
          inputType: "select",
          options: ["Yes", "No"]
        },
        {
          title: "Energy Level",
          inputType: "select",
          options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        {
          title: "Self Awareness",
          inputType: "select",
          options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        {
          title: "Dominating Thoughts",
          inputType: "text",
        },
        {
          title: "Emotions/ Feelings",
          inputType: "text",
        },
      ]
    },
    {
      title: "Goal Setting",
      // type: "table",
      // question:[
        
      // ]
    },
    {
      title: "Habit Tracker"
    },
    {
      title: "Daily Reflection"
    },
    {
      title: "Accountability Partner"
    },
    {
      title: "Last Section"
    },
  ]
}

const SectionCard = ({index, content}) => {
  const {title, type, questions, description, times} = content;
  // console.log(index, title, type, questions);
  const [isOpen, setIsOpen] = useState(false);
  return(
    <div className='m-4'>
    <div className='flex flex-row justify-between bg-steelblue p-2 pl-3 pr-3 align-middle text-xl drop-shadow-md
      hover:cursor-pointer hover:bg-linear-to-tr from-steelblue to-babyblue hover:scale-101'
      onClick={() => setIsOpen(!isOpen)}>
      <div className='flex flex-row'>
        <h3 className='font-bold'>Section {index} :</h3>
        <h3>{title}</h3>
      </div>
      <div className='flex flex-row '>
        <ChevronDownIcon className='h-8 w-8 stroke-white' strokeWidth={3}/>
      </div>
    </div>
    {
      isOpen && 
      <div className='bg-babyblue'>
        <SectionInput type={type} questions={questions} description={description} times={times}/>
      </div>
    }
    </div>
  )
}

const Worksheet = () => {
  // console.log(worksheetContent.sections)
  return (
    <div className='space-y-4'>
      <div>
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
      </div>
      <div>
        <ul>
        {worksheetContent.sections.map((section, index) => (
          <li key={index} >
            <SectionCard index={index+1} content={section}/>
          </li>
        ))}
        </ul>
      </div>
    </div>
  )
}

export default Worksheet
