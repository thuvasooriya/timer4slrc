import firebase from "firebase";
const firebaseConfig = {
//paste fbConfig here
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firestore = firebaseApp.firestore();
