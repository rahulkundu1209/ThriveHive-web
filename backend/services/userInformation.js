import admin from '../config/firebaseAdmin.js';

const getUserInformation = async ({ userId }) => {
  try {
    const userRecord = await admin.auth().getUser(userId);

    return {
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
      photoURL: userRecord.photoURL,
      phoneNumber: userRecord.phoneNumber,
      emailVerified: userRecord.emailVerified,
    };
  } catch (error) {
    throw new Error(`Error fetching user information: ${error.message}`);
  }
};

const getAdminInformation = async ({ token }) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;
    const userRecord = await admin.auth().getUser(userId);

    return {
      isAdmin: userRecord.customClaims?.admin || false,
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
      photoURL: userRecord.photoURL,
      phoneNumber: userRecord.phoneNumber,
      emailVerified: userRecord.emailVerified,
    };
  } catch (error) {
    throw new Error(`Error fetching admin information: ${error.message}`);
  }
}

export {
  getUserInformation,
  getAdminInformation
};