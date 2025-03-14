const admin = require("firebase-admin");
const serviceAccount = require("./firebaseConfig.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { db };
