import profileService from '../services/profileService.js';

class ProfileController {
    async saveProfile(req, res) {
        try {
            const userId = req.user.uid;
            const profileData = req.body;

            // Validate required fields
            if (!profileData.fullName || !profileData.location) {
                return res.status(400).json({ error: 'Full name and location are required' });
            }

            // Get existing profile to merge with new data
            const existingProfile = await profileService.getProfileByUserId(userId);

            // Save the profile
            const data = await profileService.upsertProfile(userId, profileData, existingProfile);

            res.status(200).json({
                success: true,
                message: 'Profile saved successfully',
                data
            });
        } catch (error) {
            console.error('Error saving profile:', error);
            res.status(500).json({ 
                error: 'Failed to save profile',
                details: error.message 
            });
        }
    }

    async getProfile(req, res) {
        try {
            const userId = req.user.uid;
            const data = await profileService.getProfileByUserId(userId);

            if (!data) {
                return res.status(404).json({ 
                    error: 'Profile not found',
                    success: false
                });
            }

            const transformedData = profileService.transformProfileData(data);

            res.status(200).json({
                success: true,
                data: transformedData
            });
        } catch (error) {
            console.error('Error fetching profile:', error);
            res.status(500).json({ 
                error: 'Failed to fetch profile',
                details: error.message,
                success: false
            });
        }
    }

    async deleteProfile(req, res) {
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
    }
}

export default new ProfileController();