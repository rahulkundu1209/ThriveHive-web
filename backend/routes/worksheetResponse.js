import express from 'express';
import cron from 'node-cron';
import { handleadminViewWorksheetResponse, handleAutomaticWorksheetResponseSubmit, handleCacheWorksheetResponseFetch, handleWorksheetResponseSave, handleWorksheetResponseSubmit } from '../controllers/worksheetResponse.js';

const router = express.Router();

router.put('/save', handleWorksheetResponseSave);
router.get('/fetch-cache', handleCacheWorksheetResponseFetch);
router.post('/submit', handleWorksheetResponseSubmit);
router.get('/adminview', handleadminViewWorksheetResponse);

cron.schedule('01 0 * * *', async () => {
  try{
    await handleAutomaticWorksheetResponseSubmit(1);
    await handleAutomaticWorksheetResponseSubmit(2);
    // Add more sections as needed
  } catch (error) {
    console.error('Error in cron job:', error.message);
  }
});

export default router;