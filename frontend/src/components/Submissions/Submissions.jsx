import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SectionCard from '../Worksheet/SectionCard';
import SectionView from './SectionView';
import ConsistencyCompassView from './ConsistencyCompassView';

const Submissions = () => {
  const [sections, setSections] = useState(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/worksheet/sections`);
        // console.log(response.data);
        setSections(response.data);
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    };

    fetchSections();
  }, []);

  return (
    <div>
      <h1>Submissions</h1>
      <ul>
        {sections?.map((section, index) => (
          <li key={index} >
            {section.type === "table" &&
            <SectionCard index={index+1} section_title={section.section_title}>
              <SectionView content={section}/>
            </SectionCard>}
            {section.type === "consistency_compass" &&
            <SectionCard index={index+1} section_title={section.section_title}>
              <ConsistencyCompassView section_id={2}/>
            </SectionCard>}
          </li>
        ))}
        </ul>
    </div>
  )
}

export default Submissions
