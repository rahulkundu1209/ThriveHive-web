import { getUserInformation } from "../services/userInformation.js";
import { fetchCacheWorksheetResponse, saveWorksheetResponse } from "../services/worksheetResponse.js";

const handleWorksheetResponseSave = async (req, res) => {
  try {
    // Check for authorization header
    // console.log(req.body);
    if (!req.headers.authorization) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const token = req.headers.authorization.split(' ')[1];

    // Verify user token and fetch user ID
    const response = await getUserInformation({ token });
    const userId = response.uid;

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
    if (!req.headers.authorization) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const token = req.headers.authorization.split(' ')[1];

    // Verify user token and fetch user ID
    const response = await getUserInformation({ token });
    const userId = response.uid;

    const { section_id, date } = req.body;
    if (!section_id || !date) {
      return res.status(400).json({ success: false, message: 'Invalid request body' });
    }

    // Fetch the worksheet response using the service function
    const worksheetResponse = await fetchCacheWorksheetResponse({ uid: userId, section_id, date });

    return res.json({ success: true, data: worksheetResponse });
  } catch (error) {
    console.error('Error fetching response:', error);
    return res.status(500).json({ success: false, message: 'Internal server error: ' + error.message });
  }
}

export { 
  handleWorksheetResponseSave,
  handleCacheWorksheetResponseFetch
};