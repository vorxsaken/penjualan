import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCT8ca2R4k4s36DLx7u3yUUYKrpKxQ6i-4",
    authDomain: "penjualan-7c9e9.firebaseapp.com",
    projectId: "penjualan-7c9e9",
    storageBucket: "penjualan-7c9e9.appspot.com",
    messagingSenderId: "864410186948",
    appId: "1:864410186948:web:df3ae0bc827478c0c64591"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();