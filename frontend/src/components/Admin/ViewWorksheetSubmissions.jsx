import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../App';
import { auth } from '../../utils/firebaseConfig';
import SectionCard from '../Worksheet/SectionCard';
import SectionView, { TableView } from '../Submissions/SectionView';

const ViewWorksheetSubmissions = () => {
  const {signedIn, isAdmin} = useAuthContext();
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [adminDetails, setAdminDetails] = useState({ name: '', email: '' });
  const [searchParams, setSearchParams] = useState({
    studentName: "All",
    startDate: '',
    endDate: '',
    sectionId: ''
  });
  const [sections, setSections] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  //Fetching the available sections from the database
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/worksheet/sections');
        // console.log(response.data);
        setSections(response.data);
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    };

    fetchSections();
  }, []);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value
    }));
    if(name === "sectionId"){
      setSelectedSection(
        {
          section_title: sections.find((section) => section.section_id == value)?.section_title,
          section_questions: sections.find((section) => section.section_id == value)?.questions,
          section_times: sections.find((section) => section.section_id == value)?.times
        }
      );
      // console.log(value);
      // console.log(sections?.find((section) => section.section_id == value)?.section_title);
      // console.log(sections);
      // console.log(sections.find((section) => section.section_id == value)?.questions);
      // console.log(sections.find((section) => section.section_id == value)?.times);
    }
  };

  const fetchResponses = async (e) => {
    e.preventDefault();

    if (!searchParams.startDate || !searchParams.endDate || !searchParams.sectionId) {
      alert('Please provide dates and section.');
      return;
    }

    if (!isAdmin) {
      alert('Unauthorized: You do not have admin access.');
      return;
    }

    try {
      setLoading(true);
      const token = await auth.currentUser.getIdToken();
      const response = await axios.get('http://localhost:5000/api/worksheetresponse/adminview', {
        headers: { Authorization: `Bearer ${token}` },
        params: { ...searchParams }
      });

      if (response.data.success) {
        //Form an array of objects, the objects will contain the name, email and all the responses(as an array with date and response) of the user with that same email
        const groupedResponses = response.data.responses.reduce((acc, curr) => {
          const { name, email, date, response } = curr;
          if (!acc[email]) {
            acc[email] = { name, email, responses: [] };
          }
          acc[email].responses.push({ date, response });
          return acc;
        }, {});

        const formattedResponses = Object.values(groupedResponses);
        setResponses(formattedResponses);
        // setResponses(response.data.responses);
        console.log(formattedResponses);
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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Submitted Worksheets</h1>
      <form className="flex flex-col justify-between md:flex-row mb-4">
        <div>
          <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">Enter Student's Name</label>
          <input 
          // onChange={handleInputChange}
          name="studentName" 
          type="text" 
          placeholder="Default- All" 
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
        </div>
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
          <input 
          onChange={handleInputChange}
          name="startDate" 
          type="date" 
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
        </div>
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
          <input 
          onChange={handleInputChange}
          name="endDate" 
          type="date" 
          lang='en'
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium" >Select Section</label>
          <select
          onChange={handleInputChange}
          name='sectionId'
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option>Select</option>
            {sections?.map((section, index) => (
            <option key={index} value={section.section_id}>{section.section_title}</option>
            ))}
          </select>
        </div>
        <button 
        disabled={loading}
        onClick={fetchResponses}
        className='p-3 mt-4 rounded-lg h-fit bg-babyblue hover:cursor-pointer'>
          {loading ? "Loading..." : "Search"}
        </button>
      </form>

      {responses.length === 0 ? (
        <p>Search to see submitted responses</p>
      ):(
        <div>
          <SectionCard section_title={selectedSection.section_title}>
            {responses.map((response, index) => (
              <div key={index}>
                <p><span className="font-semibold">Submitted By:</span> {response.name}</p>
                <TableView 
                questions={selectedSection.section_questions} 
                times={selectedSection.section_times} 
                responses={response.responses}
                />
              </div>
            ))}
          </SectionCard>
        </div>
      )}
    </div>
  );
};

export default ViewWorksheetSubmissions;
