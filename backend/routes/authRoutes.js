import express from "express";
import admin from "../config/firebaseAdmin.js";

const router = express.Router();

router.post("/google", async (req, res) => {
  const { token } = req.body;

  try {
    // Verify the token
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log("Decoded Token:", decodedToken);

    // Extract user info
    const { uid, email, name, picture } = decodedToken;

    const user = await admin.auth().getUser(uid);
    const isAdmin = user.customClaims?.admin || false;

    // Handle user sign-up/login logic (e.g., save to DB)
    // Check if user exists in DB, if not, create a new user
    // Example: const user = await User.findOne({ email }) || new User({ email, name, ... }).save();

    return res.json({ success: true, uid, email, name, picture, isAdmin });
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
});

//Router to get name of user from userid
router.get("/getname", async (req, res) => {
  const { userId } = req.query;

  try {
    const user = await admin.auth().getUser(userId);
    const { displayName, email } = user;

    return res.json({ success: true, name: displayName, email });
  } catch (error) {
    console.error("Error getting user name:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default router;
