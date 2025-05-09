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

        // Ensure firebase_uid is included and format data properly
        const dataToSave = {
            firebase_uid: userId,
            full_name: profileData.fullName,
            location: profileData.location,
            languages: profileData.languages,
            avatar_url: profileData.avatar,
            about_yourself: profileData.aboutYourself,
            describe_self: profileData.describeSelf,
            friend_description: profileData.friendDescription,
            life_mantra: profileData.lifeMantra,
            why_thrive: profileData.whyThrive,
            good_life: profileData.goodLife,
            life_aspirations: profileData.lifeAspirations,
            no_financial_pressure: profileData.noFinancialPressure,
            million_dollar_creation: profileData.millionDollarCreation,
            skills: profileData.skills,
            skills_to_learn: profileData.skillsToLearn,
            mentoring: profileData.mentoring,
            local_circles: profileData.localCircles,
            creativity: profileData.creativity,
            time_contribution: profileData.time,
            learned_so_far: profileData.learnedSoFar,
            hobbies: profileData.hobbies,
            feel_alive: profileData.feelAlive,
            community_drawn: profileData.communityDrawn,
            wildest_dream: profileData.wildestDream,
            world_to_build: profileData.worldToBuild,
            recently_unlearned: profileData.unlearned,
            five_years_ago: profileData.fiveYearsAgo,
            peace_definition: profileData.peaceDefinition,
            future_message: profileData.futureMessage,
            available_for: profileData.availableFor,
            similar_skills: profileData.similarSkills,
            complementary_strengths: profileData.complementaryStrengths,
            open_hearted: profileData.openHearted,
            interests: profileData.interests,
            updated_at: new Date().toISOString()
        };

        // Check for existing profile
        const { data: existingProfile, error: selectError } = await supabase
            .from('profiles')
            .select('id')
            .eq('firebase_uid', userId)
            .single();

        if (selectError && selectError.code !== 'PGRST116') { // Ignore 'no rows' error
            throw selectError;
        }

        let result;
        if (existingProfile) {
            // Update existing profile
            result = await supabase
                .from('profiles')
                .update(dataToSave)
                .eq('firebase_uid', userId);
        } else {
            // Insert new profile
            result = await supabase
                .from('profiles')
                .insert([dataToSave]);
        }

        if (result.error) throw result.error;

        res.status(existingProfile ? 200 : 201).json({
            success: true,
            message: `Profile ${existingProfile ? 'updated' : 'created'} successfully`
        });

    } catch (error) {
        console.error('Error saving profile:', error);
        res.status(500).json({ error: error.message });
    }
});

// Enhanced get endpoint
router.get('/get', verifyFirebaseToken, async (req, res) => {
    try {
        const userId = req.user.uid;

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('firebase_uid', userId)
            .single();

        if (error && error.code !== 'PGRST116') { // Ignore 'no rows' error
            throw error;
        }

        if (!data) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        // Transform data to match frontend structure
        const transformedData = {
            fullName: data.full_name,
            location: data.location,
            languages: data.languages,
            avatar: data.avatar_url,
            aboutYourself: data.about_yourself,
            describeSelf: data.describe_self,
            friendDescription: data.friend_description,
            lifeMantra: data.life_mantra,
            whyThrive: data.why_thrive,
            goodLife: data.good_life,
            lifeAspirations: data.life_aspirations,
            noFinancialPressure: data.no_financial_pressure,
            millionDollarCreation: data.million_dollar_creation,
            skills: data.skills || [],
            skillsToLearn: data.skills_to_learn,
            mentoring: data.mentoring,
            localCircles: data.local_circles,
            creativity: data.creativity,
            time: data.time_contribution,
            learnedSoFar: data.learned_so_far,
            hobbies: data.hobbies,
            feelAlive: data.feel_alive,
            communityDrawn: data.community_drawn,
            wildestDream: data.wildest_dream,
            worldToBuild: data.world_to_build,
            unlearned: data.recently_unlearned,
            fiveYearsAgo: data.five_years_ago,
            peaceDefinition: data.peace_definition,
            futureMessage: data.future_message,
            availableFor: data.available_for,
            similarSkills: data.similar_skills,
            complementaryStrengths: data.complementary_strengths,
            openHearted: data.open_hearted,
            interests: data.interests || []
        };

        res.status(200).json(transformedData);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

export default router;