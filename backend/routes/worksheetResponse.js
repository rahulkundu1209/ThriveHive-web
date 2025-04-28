import express from 'express';
import { handleadminViewWorksheetResponse, handleCacheWorksheetResponseFetch, handleWorksheetResponseSave, handleWorksheetResponseSubmit } from '../controllers/worksheetResponse.js';

const router = express.Router();

router.put('/save', handleWorksheetResponseSave);
router.get('/fetch-cache', handleCacheWorksheetResponseFetch);
router.post('/submit', handleWorksheetResponseSubmit);
router.get('/adminview', handleadminViewWorksheetResponse);

export default router;