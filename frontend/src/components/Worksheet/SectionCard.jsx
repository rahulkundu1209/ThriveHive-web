import { useState } from "react";
import {ChevronDownIcon} from '@heroicons/react/24/outline';

const SectionCard = ({index, section_title, children}) => {
  // console.log(section_id);
  // console.log(section_title);
  const [isOpen, setIsOpen] = useState(false);
  return(
    <div className='m-0 md:m-4 pt-4'>
    <div className='flex flex-row justify-between bg-steelblue p-2 pl-3 pr-3 align-middle text-xl drop-shadow-md
      hover:cursor-pointer hover:bg-linear-to-tr from-steelblue to-babyblue hover:scale-101'
      onClick={() => setIsOpen(!isOpen)}>
      <div className='flex flex-row'>
        {index && <h3 className='font-bold'>Worksheet {index} : </h3>}
        <h3>{section_title}</h3>
      </div>
      <div className='flex flex-row '>
        <ChevronDownIcon className='h-8 w-8 stroke-white' strokeWidth={3}/>
      </div>
    </div>
    {
      isOpen && 
      <div className='bg-babyblue'>
        {children}
      </div>
    }
    </div>
  )
}

export default SectionCard;