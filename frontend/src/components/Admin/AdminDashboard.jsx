import React, { useState } from 'react'

const AdminDashboard = () => {
  const [ displaySection, setDisplaySection ] = useState(null);

  const AllLearners = () =>{
    const learners = [];

    return(
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Assigned Worksheets</th>
            </tr>
          </thead>
          <tbody>
            {learners?.map((learner, index) =>(
              <tr key={index}>
                <td>{learner.name}</td>
                <td>{learner.email}</td>
                <td>comming soon...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const sections = [
    {
      navTitle: "All Learners",
      display: <AllLearners/>
    },
    {
      navTitle: "New Registrations",
      display: ""
    }
  ]

  const SideMenuBar = () =>{
    return(
      <div className='left-4 top-4 bg-steelblue w-50 h-120 rounded-2xl mr-8'>
        <ul className='flex flex-col m-0 pt-4 font-bold text-white '>
          {sections?.map((section, index) => (
            <li 
            key={index}
            className='p-2 border-b-1 border-t-1 border-solid border-white cursor-pointer'
            onClick={()=>setDisplaySection(section.display)}
            >
              {section.navTitle}
            </li>))}
        </ul>
      </div>
    )
  }

  return (
    <div className='flex flex-row mx-8 pt-8 top-4'>
      <SideMenuBar/>
      <div>
        {displaySection}
      </div>
    </div>
  )
}

export default AdminDashboard