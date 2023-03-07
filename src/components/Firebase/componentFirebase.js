import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_databaseURL,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId,
}

let fb = firebase.initializeApp(firebaseConfig)

let storageRef = firebase.storage().ref()

export { fb }
export { storageRef }
