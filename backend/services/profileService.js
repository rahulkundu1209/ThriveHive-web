import supabase from '../config/db.js';

export const upsertProfile = async (userId, profileData) => {
    const dataToSave = {
        firebase_uid: userId,
        full_name: profileData.fullName,
        location: profileData.location,
        languages: profileData.languages || '',
        avatar_url: profileData.avatar || '',
        about_yourself: profileData.aboutYourself || '',
        describe_self: profileData.describeSelf || '',
        friend_description: profileData.friendDescription || '',
        life_mantra: profileData.lifeMantra || '',
        why_thrive: profileData.whyThrive || '',
        good_life: profileData.goodLife || '',
        life_aspirations: profileData.lifeAspirations || '',
        no_financial_pressure: profileData.noFinancialPressure || '',
        million_dollar_creation: profileData.millionDollarCreation || '',
        skills: profileData.skills || [],
        skills_to_learn: profileData.skillsToLearn || '',
        mentoring: profileData.mentoring || false,
        local_circles: profileData.localCircles || false,
        creativity: profileData.creativity || false,
        time_contribution: profileData.time || false,
        learned_so_far: profileData.learnedSoFar || '',
        hobbies: profileData.hobbies || '',
        feel_alive: profileData.feelAlive || '',
        community_drawn: profileData.communityDrawn || '',
        wildest_dream: profileData.wildestDream || '',
        world_to_build: profileData.worldToBuild || '',
        recently_unlearned: profileData.unlearned || '',
        five_years_ago: profileData.fiveYearsAgo || '',
        peace_definition: profileData.peaceDefinition || '',
        future_message: profileData.futureMessage || '',
        available_for: profileData.availableFor || '',
        similar_skills: profileData.similarSkills || false,
        complementary_strengths: profileData.complementaryStrengths || false,
        open_hearted: profileData.openHearted || false,
        interests: profileData.interests || [],
        updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
        .from('profiles')
        .upsert(dataToSave, { onConflict: 'firebase_uid' })
        .select()
        .single();

    if (error) throw error;
    
    return {
        data,
        isNew: data.created_at === data.updated_at
    };
};

export const getProfile = async (userId) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('firebase_uid', userId)
        .single();

    if (error && error.code !== 'PGRST116') { // Ignore 'no rows' error
        throw error;
    }

    if (!data) return null;

    return {
        // Personal Info
        fullName: data.full_name,
        location: data.location,
        languages: data.languages,
        avatar: data.avatar_url,
        
        // About Me
        aboutYourself: data.about_yourself,
        describeSelf: data.describe_self,
        friendDescription: data.friend_description,
        lifeMantra: data.life_mantra,
        
        // Purpose & Vision
        whyThrive: data.why_thrive,
        goodLife: data.good_life,
        lifeAspirations: data.life_aspirations,
        
        // Dreams & Imagination
        noFinancialPressure: data.no_financial_pressure,
        millionDollarCreation: data.million_dollar_creation,
        wildestDream: data.wildest_dream,
        worldToBuild: data.world_to_build,
        
        // Skills & Growth
        skills: data.skills || [],
        skillsToLearn: data.skills_to_learn,
        learnedSoFar: data.learned_so_far,
        
        // Contributions
        mentoring: data.mentoring,
        localCircles: data.local_circles,
        creativity: data.creativity,
        time: data.time_contribution,
        availableFor: data.available_for,
        similarSkills: data.similar_skills,
        complementaryStrengths: data.complementary_strengths,
        openHearted: data.open_hearted,
        
        // Life & Community
        hobbies: data.hobbies,
        feelAlive: data.feel_alive,
        communityDrawn: data.community_drawn,
        interests: data.interests || [],
        
        // Reflections & Growth
        unlearned: data.recently_unlearned,
        fiveYearsAgo: data.five_years_ago,
        peaceDefinition: data.peace_definition,
        futureMessage: data.future_message,
        
        // Timestamps
        createdAt: data.created_at,
        updatedAt: data.updated_at
    };
};

export const deleteProfile = async (userId) => {
    const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('firebase_uid', userId);

    if (error) throw error;
    
    return true;
};