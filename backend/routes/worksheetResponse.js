import express from 'express';
import { handleCacheWorksheetResponseFetch, handleWorksheetResponseSave, handleWorksheetResponseSubmit } from '../controllers/worksheetResponse.js';

const router = express.Router();

router.put('/save', handleWorksheetResponseSave);
router.get('/fetch-cache', handleCacheWorksheetResponseFetch);
router.post('/submit', handleWorksheetResponseSubmit);

export default router;