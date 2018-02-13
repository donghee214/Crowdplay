// import firebase from 'firebase';
const firebase = require('firebase');
const config = {
  apiKey: "AIzaSyCWfDeoXue1YnVRZGXiy9q3M2A2-PknkbY",
  authDomain: "nextup-9685a.firebaseapp.com",
  databaseURL: "https://nextup-9685a.firebaseio.com",
  projectId: "nextup-9685a",
  storageBucket: "nextup-9685a.appspot.com",
  messagingSenderId: "11444832309"
};

firebase.initializeApp(config);
const database = firebase.database();


// export default database;
module.exports = database;
