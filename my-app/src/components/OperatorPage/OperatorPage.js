import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import {  FETCH_MESSAGES_SUCCESS } from "../../actions";
import {connect} from "react-redux";
import './OperatorPage.css';
import {useAuthState} from "react-firebase-hooks/auth";
import {fb} from "../Firebase/componentFirebase";
import Spinner from "../Spinner/Spinner";
import {Redirect} from "react-router-dom";

function OperatorPage() {

    function signOut() {
        firebase.auth().signOut()
            .then(() => {
                console.log('signOut user');
        }).catch((error) => {
            // An error happened.
        });
    }
    const [user, loading] = useAuthState(fb.auth());

    if(loading) {
        return (
            <Spinner/>
        )
    }

    if(!user) {
        return (
            <Redirect to="/"/>
        )
    }
    return (
        <div className="OperatorPage">
            <div className="containerUser">
                <h2>{user.email}</h2>
                <button onClick={signOut}>Выйти</button>
            </div>
        </div>
    )
}

const mapStateToProps = ({loadingFromState, errorFromState}) => {
    return {
        loadingFromState,
        errorFromState
    }
};

const mapDispatchToProps = {
    FETCH_MESSAGES_SUCCESS
};


export default connect(mapStateToProps, mapDispatchToProps)(OperatorPage);