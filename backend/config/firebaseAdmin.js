import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const ADMIN_EMAILS = ["rahulkundu1209@gmail.com", "thrivehivenow@gmail.com"];

async function setAdminRole(email) {
  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    console.log(`Admin role assigned to ${email}`);
  } catch (error) {
    console.error("Error assigning admin role:", error);
  }
}

// ADMIN_EMAILS.forEach(email => setAdminRole(email));

export default admin;
