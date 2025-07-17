const {collection } = require('firebase/firestore');
const db = require('./firebaseConfig');

const Cloth = collection(db,"Cloths");
module.exports = Cloth;