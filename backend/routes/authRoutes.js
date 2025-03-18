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

    // Handle user sign-up/login logic (e.g., save to DB)
    // Check if user exists in DB, if not, create a new user
    // Example: const user = await User.findOne({ email }) || new User({ email, name, ... }).save();

    return res.json({ success: true, uid, email, name, picture });
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
});

export default router;
