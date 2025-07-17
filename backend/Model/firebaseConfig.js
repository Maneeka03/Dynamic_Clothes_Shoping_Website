const { initializeApp } = require('firebase/app');
const { getFirestore, collection } = require('firebase/firestore');

require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

console.log("Connected to Firestore database successfully.");

module.exports = db;