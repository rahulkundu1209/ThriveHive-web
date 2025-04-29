import admin from "../config/firebaseAdmin.js";
import { adminFetchWorksheetResponse, deleteCacheWorksheetResponse, fetchCacheWorksheetResponse, getCacheWorksheetResponseByDate, saveWorksheetResponse, submitWorksheetResponse } from "../services/worksheetResponse.js";
import { getAdminInformation } from "../services/userInformation.js";

const handleWorksheetResponseSave = async (req, res) => {
  try {
    // Check for authorization header
    // console.log(req.body);
    if (!req.headers.authorization) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const token = req.headers.authorization.split(' ')[1];

    // Verify user token and fetch user ID
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;

    const { section_id, date, userResponses } = req.body;
    if (!section_id || !date || !userResponses) {
      return res.status(400).json({ success: false, message: 'Invalid request body' });
    }

    // Save the worksheet response using the service function
    await saveWorksheetResponse({ uid: userId, section_id, date, userResponses });

    return res.json({ success: true });
  } catch (error) {
    console.error('Error saving response:', error);
    return res.status(500).json({ success: false, message: 'Internal server error: ' + error.message });
  }
}

const handleCacheWorksheetResponseFetch = async (req, res) => {
  try {
    // Check for authorization header
    // console.log("Params", req.query);
    if (!req.headers.authorization) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const token = req.headers.authorization.split(' ')[1];

    // Verify user token and fetch user ID
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;

    const { section_id, date } = req.query;
    if (!section_id || !date) {
      return res.status(400).json({ success: false, message: 'Invalid request query' });
    }

    // Fetch the worksheet response using the service function
    const worksheetResponse = await fetchCacheWorksheetResponse({ uid: userId, section_id, date });

    return res.json({ success: true, data: worksheetResponse });
  } catch (error) {
    console.error('Error fetching response:', error);
    return res.status(500).json({ success: false, message: 'Internal server error: ' + error.message });
  }
}

const handleWorksheetResponseSubmit = async (req, res) =>{
  try {
    // Check for authorization header
    if (!req.headers.authorization) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // console.log(req.headers);
    const token = req.headers.authorization.split(' ')[1];

    // Verify user token and fetch user ID
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;

    const { section_id, date, userResponses } = req.body;
    if (!section_id || !date || !userResponses) {
      return res.status(400).json({ success: false, message: 'Invalid request body' });
    }

    // Submit the worksheet response using the service function
    await submitWorksheetResponse({ uid: userId, section_id, date, userResponses });

    //Deleted the cache response
    await deleteCacheWorksheetResponse({ uid: userId, section_id, date });

    return res.json({ success: true });
  } catch (error) {
    console.error('Error submitting response:', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    return res.status(500).json({ success: false, message: 'Internal server error: ' + error.message });
  }
}

const handleadminViewWorksheetResponse = async (req, res) => {
  try {
    // Check for authorization header
    if (!req.headers.authorization) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const token = req.headers.authorization.split(' ')[1];

    // Verify user token and fetch user ID
    const response = await getAdminInformation({ token });
    if(!response.isAdmin) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const { userId, sectionId, startDate, endDate } = req.query;
    // console.log("Params", req.query);
    if (!sectionId || !startDate || !endDate) {
      return res.status(400).json({ success: false, message: 'Invalid request query' });
    }

    // Fetch the worksheet response using the service function
    const worksheetResponse = await adminFetchWorksheetResponse({ userId, sectionId, startDate, endDate });
    // console.log("Response", worksheetResponse);

    return res.json({ success: true, data: worksheetResponse });
  } catch (error) {
    console.error('Error fetching response:', error);
    return res.status(500).json({ success: false, message: 'Internal server error: ' + error.message });
  }
}

const handleAutomaticWorksheetResponseSubmit = async (section_id) => {
  try{
    const date = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }).split(',')[0]);
    date.setDate(date.getDate() - 1); // Subtract one day
    const formattedDate = date.toLocaleDateString("en-US", { timeZone: "Asia/Kolkata" });
    // console.log("Date", formattedDate);
    const allCacheResponses = await getCacheWorksheetResponseByDate({ section_id, date: formattedDate });
    // console.log("All Cache Responses", allCacheResponses);
    for (const cacheResponse of allCacheResponses) {
      const { uid , date, response: userResponses } = cacheResponse;

      if (!section_id || !date || !userResponses) {
        throw new Error('Invalid request body');
      }

      // Submit the worksheet response using the service function
      await submitWorksheetResponse({ uid, section_id, date, userResponses });

      // Delete the cache response
      await deleteCacheWorksheetResponse({ uid, section_id, date });
    }

    return { success: true };

  } catch (error) {
    console.error('Error in automaticWorksheetResponseSubmit:', error.message);
    throw error;
  }
}

export { 
  handleWorksheetResponseSave,
  handleCacheWorksheetResponseFetch,
  handleWorksheetResponseSubmit,
  handleadminViewWorksheetResponse,
  handleAutomaticWorksheetResponseSubmit
};