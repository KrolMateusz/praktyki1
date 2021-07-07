import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAmfnArrID-BDiRBR0MJM7CrJX35zeN7W4",
  authDomain: "vue-geolocation-project-f2bc3.firebaseapp.com",
  projectId: "vue-geolocation-project-f2bc3",
  storageBucket: "vue-geolocation-project-f2bc3.appspot.com",
  messagingSenderId: "236355702261",
  appId: "1:236355702261:web:6027023562559fd9c6e4bc",
  measurementId: "G-WXL0KDBRFW",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

const users = db.collection("users");

export { auth, db, users };
