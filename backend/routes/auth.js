const express = require("express");
const router = express.Router();
const { db } = require("../config/firebaseConfig");
const admin = require("firebase-admin");

// Verify Firebase User Token
router.post("/verify", async (req, res) => {
  const { token } = req.body;

  try {
    // Verify the ID Token from frontend
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;

    // Check if user exists in Firestore
    const userRef = db.collection("users").doc(uid);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      // If user is new, create a record
      await userRef.set({
        uid,
        email: decodedToken.email || "",
        name: decodedToken.name || "Anonymous",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    res.json({ uid, message: "User verified successfully!" });
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

module.exports = router;
