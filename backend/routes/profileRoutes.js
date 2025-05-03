import express from 'express';
import supabase from '../config/db.js';
import admin from 'firebase-admin';

const router = express.Router();

// Initialize Firebase Admin (as you have it)
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

// Middleware to verify Firebase token (as you have it)
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

// Save profile data
router.post('/save', verifyFirebaseToken, async (req, res) => {
    try {
        const userId = req.user.uid;
        const profileData = req.body;

        // Ensure firebase_uid is included in the data
        profileData.firebase_uid = userId;

        // Check if a profile already exists for this user
        const { data: existingProfile, error: selectError } = await supabase
            .from('profiles')
            .select('id')
            .eq('firebase_uid', userId)
            .single();

        if (selectError) {
            console.error('Error checking for existing profile:', selectError);
            return res.status(500).json({ error: 'Failed to check for existing profile' });
        }

        if (existingProfile) {
            // Update existing profile
            const { error: updateError } = await supabase
                .from('profiles')
                .update(profileData)
                .eq('firebase_uid', userId);

            if (updateError) {
                console.error('Error updating profile:', updateError);
                return res.status(500).json({ error: 'Failed to update profile' });
            }

            res.status(200).json({ success: true, message: 'Profile updated successfully' });
        } else {
            // Insert new profile
            const { error: insertError } = await supabase
                .from('profiles')
                .insert([profileData]);

            if (insertError) {
                console.error('Error inserting profile:', insertError);
                return res.status(500).json({ error: 'Failed to save profile' });
            }

            res.status(201).json({ success: true, message: 'Profile saved successfully' });
        }
    } catch (error) {
        console.error('Error saving profile:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get profile data (as you have it)
router.get('/get', verifyFirebaseToken, async (req, res) => {
    try {
        const userId = req.user.uid;

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('firebase_uid', userId)
            .single();

        if (error) throw error;

        if (!data) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

export default router;