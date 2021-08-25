import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import firebase from "firebase/app";
import './index.css';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAVSNd9_qs-wGtAjix6FcakayIYJmKP2xg",
    authDomain: "chat-7cccb.firebaseapp.com",
    databaseURL: "https://chat-7cccb-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "chat-7cccb",
    storageBucket: "chat-7cccb.appspot.com",
    messagingSenderId: "910346942866",
    appId: "1:910346942866:web:fd25553dcccd68aae0e94b",
    measurementId: "G-K7N869Y09Y"
};

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById('root')
);
reportWebVitals();
firebase.initializeApp(firebaseConfig);
