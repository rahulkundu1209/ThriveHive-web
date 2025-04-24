import express from 'express';
import { handleGetAllApprovedLearners } from '../controllers/learnerInformation.js';
const router = express.Router();

router.get('/approved-learners', handleGetAllApprovedLearners);

export default router;