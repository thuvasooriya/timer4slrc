import firebase from "firebase";
const firebaseConfig = {
  // paste fb config here
  // databaseURL:
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firestore = firebaseApp.firestore();
