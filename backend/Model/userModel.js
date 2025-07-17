const {collection } = require('firebase/firestore');
const db = require("./firebaseConfig");

const User = collection(db,"Users");

module.exports = User;