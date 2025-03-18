import React, { useState } from 'react';
import DatePicker from './DatePicker';

const ParagraphInput = ({questions}) => {
  // console.log(questions);
  return (
    <form className='p-4'>
      <div className='flex flex-col p-2'>
        {
          questions?.map((question, index) => (
            <div>
            <div key={index} className='flex flex-row m-2'>
              <p>{index + 1}.</p>
              <p>{question}</p>
            </div>
            <textarea
              className='rounded-md p-2 bg-white w-full'
              placeholder='Your answer...'
              rows={3}
            />
            </div>
          ))
        }
      </div>
      <div className='flex justify-end'>
        <button
          className='bg-steelblue text-white rounded-md p-2 px-4 hover:cursor-pointer'
          type='submit'
        >
          Save
        </button>
      </div>
    </form>
  )
}

const TableInput = ({questions, times}) => {
  const [dayCount, setDayCount] = useState(1);
  
  return(
    <div className='p-4'>
    {[...Array(dayCount)].map((_, dayIndex) => (
    <form key={dayIndex} className='mb-4'>
      <div className="overflow-x-auto pb-4">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 min-w-[50px] max-w-[150px] border text-center w-fit">Date</th>
                {questions?.map((question, index) => (
                  <th 
                    className="p-2 min-w-[50px] max-w-[150px] border text-center w-fit"
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
                        <DatePicker/>
                      </td>
                    )}
                {questions?.map((question, index) => (
                  <td
                    className="p-2 min-w-[50px] max-w-[150px] border w-fit"
                    key={index}
                  >
                    {question.inputType == "time" &&
                      (<p className="rounded-md p-2 w-fit">
                        {time}
                      </p>)
                    }
                    {question.inputType == "text" &&
                      (<textarea
                        className="rounded-md p-2 bg-white w-full"
                        placeholder="Your answer..."
                        rows={3}
                      />)
                    }
                    {question.inputType == "select" &&
                      (<select
                        className="rounded-md p-2 bg-white w-full"
                      >
                        <option value="" disabled selected>Select</option>
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
        >
          Save
        </button>
      </div>
    </form>
    ))}
    <button
      className='bg-steelblue text-white rounded-md p-2 px-4 hover:cursor-pointer r-0 m-4'
      onClick={dayCount < 5 ? () => setDayCount(dayCount + 1) : () => {}}
    >
      Add Day +
    </button>
    </div>
)}

const SectionInput = ({type, questions, times, description}) => {
  // console.log(type, questions)
  return (
    <div>
      <div className='p-4'>
        <p className='font-bold'>Description:</p>
        {description ? <p>{description}</p> : <p>No description available!</p>}
      </div>
      {type == "paragraphs" && <ParagraphInput questions={questions}/>}
      {type == "table" && <TableInput questions={questions} times={times}/>}
    </div>
  )
}

export default SectionInput
