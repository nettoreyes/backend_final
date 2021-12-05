
var admin = require("firebase-admin");
var serviceAccount = require('./ecommerce-2d01a-firebase-adminsdk-yukyx-b07e1b614c.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log('firebase conectada');

const db = admin.firestore();

module.exports = { db };