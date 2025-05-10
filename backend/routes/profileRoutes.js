import express from 'express';
import profileController from '../controllers/profileController.js';
import admin from 'firebase-admin';

const router = express.Router();

// Initialize Firebase Admin
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

// Middleware to verify Firebase token
const verifyFirebaseToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }

    const idToken = authHeader.split(' ')[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
};

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