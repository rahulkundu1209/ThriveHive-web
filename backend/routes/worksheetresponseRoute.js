import express from 'express';
// import pool from '../config/db.js';
import axios from 'axios';
import supabase from "../config/db.js";

const router = express.Router();

router.post('/save', async (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    
    const token = req.headers.authorization.split(' ')[1];

    const response = await axios.post(`${process.env.BACKEND_BASEURL}/api/auth/google`, { token });
    const userId = response.data.uid;

    const { worksheetResponse } = req.body;
    if (!worksheetResponse) {
      return res.status(400).json({ success: false, message: 'Invalid request body' });
    }

    const { responses, date, section_id } = worksheetResponse;
    //console.log("From frontend", worksheetResponse);

    // Validate section_id to prevent SQL injection
    if (!/^\d+$/.test(section_id)) {
      return res.status(400).json({ success: false, message: 'Invalid section_id' });
    }

    const tableName = `response_${section_id}`;

    // const createTableQuery = `
    //   CREATE TABLE IF NOT EXISTS ${tableName} (
    //     serial_no SERIAL PRIMARY KEY,
    //     uid TEXT,
    //     date DATE,
    //     response JSON, -- Use JSONB instead of JSON for efficiency in PostgreSQL
    //     UNIQUE (uid, date)
    //   );
    // `;
    // await pool.query(createTableQuery);

    // const checkResponseQuery = `SELECT * FROM ${tableName} WHERE uid = $1 AND date = $2;`;
    // const checkResponseResult = await pool.query(checkResponseQuery, [userId, date]);
    const {data, error} = await supabase.from(tableName).select().eq('uid', userId).eq('date', date);
    // console.log("Data: ", data);

    // if (checkResponseResult.rows.length > 0) {
    //   return res.status(400).json({ success: false, message: 'Response already submitted' });
    // }

    if (data.length > 0) {
      return res.status(400).json({ success: false, message: 'Response already submitted' });
    }

    // const insertResponseQuery = `INSERT INTO ${tableName} (uid, date, response) VALUES ($1, $2, $3::json);`;
    // await pool.query(insertResponseQuery, [userId, date, JSON.stringify(responses)]);

    const insertResponse = await supabase.from(tableName).insert({uid: userId, date: date, response: responses});
    // console.log("Error in insertion: ", insertResponse);

    return res.json({ success: true });
  } catch (error) {
    console.error('Error saving response:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.get('/view', async (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const token = req.headers.authorization.split(' ')[1];

    // Fetch user details (name & email) from Firebase authentication
    const response = await axios.post(`${process.env.BACKEND_BASEURL}/api/auth/google`, { token });
    const userId = response.data.uid;
    // const isAdmin = response.data.isAdmin;
    // const name = response.data.name;  // Extracting name
    // const email = response.data.email;        // Extracting email

    // if (!isAdmin) {
    //   return res.status(401).json({ success: false, message: 'Unauthorized' });
    // }

    const { section_id } = req.query;
    if (!section_id) {
      return res.status(400).json({ success: false, message: 'Invalid request body' });
    }

    if (!/^\d+$/.test(section_id)) {
      return res.status(400).json({ success: false, message: 'Invalid section_id' });
    }

    const tableName = `response_${section_id}`;

    // if(isAdmin){
    //   const getResponsesQuery = `SELECT * FROM ${tableName};`;
    //   const responsesResult = await pool.query(getResponsesQuery);

    //   return res.json({ 
    //     success: true, 
    //     user: { name, email },
    //     responses: responsesResult.rows 
    //   });
    // }

    
    // const getResponsesQuery = `SELECT * FROM ${tableName} WHERE uid = $1;`;
    // const responsesResult = await pool.query(getResponsesQuery, [userId]);
    // console.log(responsesResult.rows);

    const supabaseResponse = await supabase.from(tableName).select().eq('uid', userId);

    if(supabaseResponse.error){
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

router.get('/adminview', async (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const token = req.headers.authorization.split(' ')[1];

    const response = await axios.post(`${process.env.BACKEND_BASEURL}/api/auth/google`, { token });
    // const userId = response.data.uid;
    const isAdmin = response.data.isAdmin;
    // const name = response.data.name;
    // const email = response.data.email;

    if (!isAdmin) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const { studentName, startDate, endDate, sectionId } = req.query;
    // console.log(req.query);
    if (!studentName || !startDate || !endDate || !sectionId) {
      return res.status(400).json({ success: false, message: 'Invalid request body' });
    }

    if (!/^\d+$/.test(sectionId)) {
      return res.status(400).json({ success: false, message: 'Invalid section_id' });
    }

    const tableName = `response_${sectionId}`;

    //Find userId of the student of name studentName

    //When the studentName is "All", fetch all the responses
    if(studentName === "All" || studentName === ""){
      const { data: responsesResult, error } = await supabase
        .from(tableName)
        .select()
        .gte('date', startDate)
        .lte('date', endDate);

      // console.log(responsesResult);
      if (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

      //Get name of those users from their userId
      const responses = responsesResult;
      // console.log(responses);
      const userIds = [...new Set(responses.map(response => response.uid))]; // Get unique userIds
      const users = {};
      for (const userId of userIds) {
        const response = await axios.get(`${process.env.BACKEND_BASEURL}/api/auth/getname`, { params: { userId } });
        users[userId] = response.data;
      }
      // console.log(users);
      //In the responses, include their names and emails
      for (const response of responses) {
        response.name = users[response.uid].name;
        response.email = users[response.uid].email;
      }
      // console.log(responses)
      //Now send all those responses which contain all the fields like name, email, response
      return res.json({ 
        success: true, 
        responses: responses 
      });
    }
    // const getResponsesQuery = `SELECT * FROM ${tableName} WHERE date >= $1 AND date <= $2;`;
    // const responsesResult = await pool.query(getResponsesQuery, [startDate, endDate]);

    // return res.json({ 
    //   success: true, 
    //   user: { name, email },
    //   responses: responsesResult.rows 
    // });
  } catch (error) {
    console.error('Error fetching responses:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
})

export default router;
