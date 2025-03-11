const express = require("express");
const router = express.Router();
const { db } = require("../config/firebaseConfig");

// Get all food trucks from Firestore
router.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("food_trucks").get();

    if (snapshot.empty) {
      return res.status(404).json({ message: "No food trucks found" });
    }

    const trucks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(trucks);
  } catch (error) {
    console.error("Error fetching food trucks:", error);
    res.status(500).json({ error: "Failed to fetch food trucks" });
  }
});

module.exports = router;
