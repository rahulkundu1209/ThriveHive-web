import express from 'express';
import cron from 'node-cron';
import { handleadminViewWorksheetResponse, handleAutomaticWorksheetResponseSubmit, handleCacheWorksheetResponseFetch, handleWorksheetResponseSave, handleWorksheetResponseSubmit } from '../controllers/worksheetResponse.js';

const router = express.Router();

router.put('/save', handleWorksheetResponseSave);
router.get('/fetch-cache', handleCacheWorksheetResponseFetch);
router.post('/submit', handleWorksheetResponseSubmit);
router.get('/adminview', handleadminViewWorksheetResponse);

router.get('/auto-submit', async (req, res) => {
  try {
    await handleAutomaticWorksheetResponseSubmit(1);
    await handleAutomaticWorksheetResponseSubmit(2);
    // Add more sections as needed
    console.log('Automatic worksheet response submission completed for all sections.');
    res.status(200).send('Automatic worksheet response submission completed for all sections.');
  } catch (error) {
    console.error('Error in automatic submission:', error.message);
    res.status(500).send('Error in automatic submission.');
  }
});

export default router;