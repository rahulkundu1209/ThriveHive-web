import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../App';
import { auth } from '../../utils/firebaseConfig';
import SectionCard from '../Worksheet/SectionCard';
import SectionView, { TableView } from '../Submissions/SectionView';
import { DisplayResponse } from '../Submissions/ConsistencyCompassView';

const ViewWorksheetSubmissions = () => {
  const {signedIn, isAdmin} = useAuthContext();
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');
  const [adminDetails, setAdminDetails] = useState({ name: '', email: '' });
  const [searchParams, setSearchParams] = useState({
    userId: "All",
    startDate: '',
    endDate: '',
    sectionId: ''
  });
  const [learners, setLearners] = useState([]);
  const [sections, setSections] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  //Fetching the available sections from the database
  useEffect(() => {
    if (!signedIn) return;
    const fetchLernerList = async () => {
      try {
        setLoading(true);
        const token = await auth.currentUser.getIdToken();
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/learner/approved-learners`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) {
          // console.log(response.data.approvedLearners);  
          setLearners(response.data.approvedLearners);
        } else {
          setError(response.data.message);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching admin details:', err);
        setError('Failed to fetch admin details.');
      }
    };

    const fetchSections = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/worksheet/sections`);
        // console.log(response.data);
        setSections(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    };

    fetchLernerList();
    fetchSections();
  }, []);

  const handleInputChange = (e) => {
    e.preventDefault();
    setSearched(false);
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
          section_times: sections.find((section) => section.section_id == value)?.times,
          section_type: sections.find((section) => section.section_id == value)?.type
        }
      );
      setResponses([]);
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
      setSearching(true);
      const token = await auth.currentUser.getIdToken();
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/worksheet-response/adminview`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { ...searchParams }
      });
      // console.log(response.data);

      if (response.data.success) {
        //Form an array of objects, the objects will contain the name, email and all the responses(as an array with date and response) of the user with that same email
        const groupedResponses = response.data.data.reduce((acc, curr) => {
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
        // console.log(formattedResponses);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error('Error fetching responses:', err);
      setError('Failed to fetch responses.');
    } finally {
      setSearching(false);
      setSearched(true);
    }
  };

  return (
    <>
    {loading? 
    <div>Loading...</div> :
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Submitted Worksheets</h1>
      <form className="flex flex-col justify-between md:flex-row mb-4">
        <div>
          <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">Enter Student's Name</label>
          <select
          onChange={handleInputChange}
          name="userId"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="All">All</option>
            {learners?.map((learner, index) =>(
              <option key={index} value={learner.uid}>{learner.full_name}</option>
            ))}  
          </select>
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
        disabled={searching}
        onClick={fetchResponses}
        className='p-3 mt-4 rounded-lg h-fit bg-babyblue hover:cursor-pointer'>
          {searching ? "Searching..." : "Search"}
        </button>
      </form>

      {!searched && responses.length === 0 ? (
        <p>Search to see submitted responses</p>
      ):(
        searched && responses.length === 0 ? 
        <div>No submission found!</div> : 
        <div>
          <SectionCard section_title={selectedSection.section_title}>
            {selectedSection.section_type === "table" &&
            responses.map((response, index) => (
              <div key={index}>
                <p><span className="font-semibold">Submitted By:</span> {response.name}</p>
                <TableView 
                questions={selectedSection.section_questions} 
                times={selectedSection.section_times} 
                responses={response.responses}
                />
              </div>
            ))}
            {selectedSection.section_type === "consistency_compass" &&
            responses.map((response, index) => (
              <div key={index}>
                <p><span className="font-semibold">Submitted By:</span> {response.name}</p>
                {response.responses.map((resp, idx) => (
                  <DisplayResponse
                  key={idx}
                  response={resp}
                  />))}
              </div>
            ))}
          </SectionCard>
        </div>
      )}
    </div>}
    </>
  );
};

export default ViewWorksheetSubmissions;
