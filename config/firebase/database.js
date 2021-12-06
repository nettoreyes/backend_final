
var admin = require("firebase-admin");
var serviceAccount = require('./ecommerce.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log('firebase conectada');

const db = admin.firestore();

module.exports = { db };