var admin = require("firebase-admin");

var serviceAccount = require("./kargos-firebase-adminsdk-496kc-87885085c5.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kargos.firebaseio.com"
})

module.exports.admin = admin