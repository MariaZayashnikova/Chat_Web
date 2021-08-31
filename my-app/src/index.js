import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import firebase from "firebase/app";
import './index.css';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import "firebase/firestore";
import 'bootstrap/dist/css/bootstrap.min.css';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_databaseURL,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId
};

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById('root')
);
reportWebVitals();
firebase.initializeApp(firebaseConfig);
