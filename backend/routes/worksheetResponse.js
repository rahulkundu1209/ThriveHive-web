import express from 'express';
import { handleCacheWorksheetResponseFetch, handleWorksheetResponseSave } from '../controllers/worksheetResponse.js';

const router = express.Router();

router.put('/save', handleWorksheetResponseSave);
router.get('/fetch-cache', handleCacheWorksheetResponseFetch);

export default router;