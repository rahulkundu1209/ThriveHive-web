import * as profileService from '../services/profileService.js';

export const saveProfile = async (req, res) => {
    try {
        const userId = req.user.uid;
        const profileData = req.body;

        // Validate required fields
        if (!profileData.fullName || !profileData.location) {
            return res.status(400).json({ error: 'Full name and location are required' });
        }

        const { data, isNew } = await profileService.upsertProfile(userId, profileData);

        res.status(200).json({
            success: true,
            message: isNew ? 'Profile created successfully' : 'Profile updated successfully',
            data
        });

    } catch (error) {
        console.error('Error saving profile:', error);
        res.status(500).json({ 
            error: 'Failed to save profile',
            details: error.message 
        });
    }
};

export const getProfile = async (req, res) => {
    try {
        const userId = req.user.uid;
        const profile = await profileService.getProfile(userId);

        res.status(200).json({
            success: true,
            data: profile // Will be null if no profile exists
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ 
            error: 'Failed to fetch profile',
            details: error.message,
            success: false
        });
    }
};

export const deleteProfile = async (req, res) => {
    try {
        const userId = req.user.uid;
        await profileService.deleteProfile(userId);

        res.status(200).json({
            success: true,
            message: 'Profile deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting profile:', error);
        res.status(500).json({ 
            error: 'Failed to delete profile',
            details: error.message,
            success: false
        });
    }
};