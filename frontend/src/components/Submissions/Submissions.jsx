import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SectionCard from '../Worksheet/SectionCard';
import SectionView from './SectionView';

const Submissions = () => {
  const [sections, setSections] = useState(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/worksheet/sections');
        console.log(response.data);
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
            <SectionCard index={index+1} section_title={section.section_title}>
              <SectionView content={section}/>
            </SectionCard>
          </li>
        ))}
        </ul>
    </div>
  )
}

export default Submissions
