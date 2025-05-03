// src/api/profile.js
export const saveProfileToBackend = async (profileData) => {
    try {
      const idToken = await getAuth().currentUser.getIdToken();
      const response = await fetch('http://localhost:5000/api/profile/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify(profileData)
      });
      
      return await response.json();
    } catch (error) {
      console.error('Error saving profile:', error);
      throw error;
    }
  };
  
  export const getProfileFromBackend = async () => {
    try {
      const idToken = await getAuth().currentUser.getIdToken();
      const response = await fetch('http://localhost:5000/api/profile/get', {
        headers: {
          'Authorization': `Bearer ${idToken}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  };