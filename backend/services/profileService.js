import supabase from '../config/db.js';

class ProfileService {
    async getProfileByUserId(userId) {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('firebase_uid', userId)
            .single();

        if (error && error.code !== 'PGRST116') { // Ignore 'no rows' error
            throw error;
        }

        return data;
    }

    async upsertProfile(userId, profileData, existingProfile) {
        const dataToSave = {
            firebase_uid: userId,
            full_name: profileData.fullName || existingProfile?.full_name || '',
            location: profileData.location || existingProfile?.location || '',
            languages: profileData.languages || existingProfile?.languages || '',
            avatar_url: profileData.avatar || existingProfile?.avatar_url || '',
            about_yourself: profileData.aboutYourself || existingProfile?.about_yourself || '',
            describe_self: profileData.describeSelf || existingProfile?.describe_self || '',
            friend_description: profileData.friendDescription || existingProfile?.friend_description || '',
            life_mantra: profileData.lifeMantra || existingProfile?.life_mantra || '',
            why_thrive: profileData.whyThrive || existingProfile?.why_thrive || '',
            good_life: profileData.goodLife || existingProfile?.good_life || '',
            life_aspirations: profileData.lifeAspirations || existingProfile?.life_aspirations || '',
            no_financial_pressure: profileData.noFinancialPressure || existingProfile?.no_financial_pressure || '',
            million_dollar_creation: profileData.millionDollarCreation || existingProfile?.million_dollar_creation || '',
            skills: profileData.skills || existingProfile?.skills || [],
            skills_to_learn: profileData.skillsToLearn || existingProfile?.skills_to_learn || '',
            mentoring: profileData.mentoring ?? existingProfile?.mentoring ?? false,
            local_circles: profileData.localCircles ?? existingProfile?.local_circles ?? false,
            creativity: profileData.creativity ?? existingProfile?.creativity ?? false,
            time_contribution: profileData.time ?? existingProfile?.time_contribution ?? false,
            learned_so_far: profileData.learnedSoFar || existingProfile?.learned_so_far || '',
            hobbies: profileData.hobbies || existingProfile?.hobbies || '',
            feel_alive: profileData.feelAlive || existingProfile?.feel_alive || '',
            community_drawn: profileData.communityDrawn || existingProfile?.community_drawn || '',
            wildest_dream: profileData.wildestDream || existingProfile?.wildest_dream || '',
            world_to_build: profileData.worldToBuild || existingProfile?.world_to_build || '',
            recently_unlearned: profileData.unlearned || existingProfile?.recently_unlearned || '',
            five_years_ago: profileData.fiveYearsAgo || existingProfile?.five_years_ago || '',
            peace_definition: profileData.peaceDefinition || existingProfile?.peace_definition || '',
            future_message: profileData.futureMessage || existingProfile?.future_message || '',
            available_for: profileData.availableFor || existingProfile?.available_for || '',
            similar_skills: profileData.similarSkills ?? existingProfile?.similar_skills ?? false,
            complementary_strengths: profileData.complementaryStrengths ?? existingProfile?.complementary_strengths ?? false,
            open_hearted: profileData.openHearted ?? existingProfile?.open_hearted ?? false,
            interests: profileData.interests || existingProfile?.interests || [],
            updated_at: new Date().toISOString()
        };

        const { data, error: upsertError } = await supabase
            .from('profiles')
            .upsert(dataToSave, { onConflict: 'firebase_uid' });

        if (upsertError) throw upsertError;

        return data;
    }

    async deleteProfile(userId) {
        const { error } = await supabase
            .from('profiles')
            .delete()
            .eq('firebase_uid', userId);

        if (error) throw error;

        return true;
    }

    transformProfileData(data) {
        if (!data) return null;
        
        return {
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
            interests: data.interests || [],
            createdAt: data.created_at,
            updatedAt: data.updated_at
        };
    }
}

export default new ProfileService();