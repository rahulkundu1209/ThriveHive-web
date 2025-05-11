import express from 'express';
import { verifyFirebaseToken } from '../middleware/authMiddleware.js';
import * as profileController from '../controllers/profileController.js';

const router = express.Router();

/**
 * @route POST /api/profile/save
 * @desc Save or update user profile
 * @access Private
 */
router.post('/save', verifyFirebaseToken, profileController.saveProfile);

/**
 * @route GET /api/profile/get
 * @desc Get user profile
 * @access Private
 */
router.get('/get', verifyFirebaseToken, profileController.getProfile);

/**
 * @route DELETE /api/profile/delete
 * @desc Delete user profile
 * @access Private
 */
router.delete('/delete', verifyFirebaseToken, profileController.deleteProfile);

export default router;