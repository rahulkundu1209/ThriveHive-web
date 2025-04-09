import express from 'express';
import axios from 'axios';
import supabase from "../config/db.js";

const router = express.Router();

// Route to submit worksheet responses
router.post('/submit', async (req, res) => {
  try {
    // Check for authorization header
    if (!req.headers.authorization) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    
    const token = req.headers.authorization.split(' ')[1];

    // Verify user token and fetch user ID
    const response = await axios.post(`${process.env.BACKEND_BASEURL}/api/auth/google`, { token });
    const userId = response.data.uid;

    const { worksheetResponse } = req.body;
    if (!worksheetResponse) {
      return res.status(400).json({ success: false, message: 'Invalid request body' });
    }

    const { responses, date, section_id } = worksheetResponse;

    // Validate section_id to prevent SQL injection
    if (!/^\d+$/.test(section_id)) {
      return res.status(400).json({ success: false, message: 'Invalid section_id' });
    }

    const tableName = `response_${section_id}`;

    // Check if a response already exists for the user on the given date
    const { data, error } = await supabase.from(tableName).select().eq('uid', userId).eq('date', date);

    if (data.length > 0) {
      return res.status(400).json({ success: false, message: 'Response already submitted' });
    }

    // Insert the new response into the database
    const insertResponse = await supabase.from(tableName).insert({ uid: userId, date: date, response: responses });

    return res.json({ success: true });
  } catch (error) {
    console.error('Error saving response:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Route to view worksheet responses for a user
router.get('/view', async (req, res) => {
  try {
    // Check for authorization header
    if (!req.headers.authorization) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const token = req.headers.authorization.split(' ')[1];

    // Verify user token and fetch user ID
    const response = await axios.post(`${process.env.BACKEND_BASEURL}/api/auth/google`, { token });
    const userId = response.data.uid;

    const { section_id } = req.query;
    if (!section_id) {
      return res.status(400).json({ success: false, message: 'Invalid request body' });
    }

    // Validate section_id to prevent SQL injection
    if (!/^\d+$/.test(section_id)) {
      return res.status(400).json({ success: false, message: 'Invalid section_id' });
    }

    const tableName = `response_${section_id}`;

    // Fetch responses for the user
    const supabaseResponse = await supabase.from(tableName).select().eq('uid', userId);

    if (supabaseResponse.error) {
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    return res.json({ 
      success: true,
      responses: supabaseResponse.data 
    });
  } catch (error) {
    console.error('Error fetching responses:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Route for admin to view responses
router.get('/adminview', async (req, res) => {
  try {
    // Check for authorization header
    if (!req.headers.authorization) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const token = req.headers.authorization.split(' ')[1];

    // Verify user token and check if the user is an admin
    const response = await axios.post(`${process.env.BACKEND_BASEURL}/api/auth/google`, { token });
    const isAdmin = response.data.isAdmin;

    if (!isAdmin) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const { studentName, startDate, endDate, sectionId } = req.query;

    // Validate request parameters
    if (!studentName || !startDate || !endDate || !sectionId) {
      return res.status(400).json({ success: false, message: 'Invalid request body' });
    }

    if (!/^\d+$/.test(sectionId)) {
      return res.status(400).json({ success: false, message: 'Invalid section_id' });
    }

    const tableName = `response_${sectionId}`;

    // Fetch all responses if studentName is "All" or empty
    if (studentName === "All" || studentName === "") {
      const { data: responsesResult, error } = await supabase
        .from(tableName)
        .select()
        .gte('date', startDate)
        .lte('date', endDate);

      if (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

      // Fetch user details (name and email) for each unique user ID
      const responses = responsesResult;
      const userIds = [...new Set(responses.map(response => response.uid))];
      const users = {};
      for (const userId of userIds) {
        const response = await axios.get(`${process.env.BACKEND_BASEURL}/api/auth/getname`, { params: { userId } });
        users[userId] = response.data;
      }

      // Add user details to the responses
      for (const response of responses) {
        response.name = users[response.uid].name;
        response.email = users[response.uid].email;
      }

      return res.json({ 
        success: true, 
        responses: responses 
      });
    }
  } catch (error) {
    console.error('Error fetching responses:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
