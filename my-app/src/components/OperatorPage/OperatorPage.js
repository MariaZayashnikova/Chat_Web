import React from 'react';
import firebase from "firebase/app";
import "firebase/auth"
import { SIGN_OUT_USER } from "../../actions";
import {connect} from "react-redux";

function OperatorPage({SIGN_OUT_USER}) {

    function signOut() {
        firebase.auth().signOut()
            .then(() => {
                console.log('signOut user');
                SIGN_OUT_USER();
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <div>
           <h2>Operator Page</h2>
            <button onClick={signOut}>Выйти</button>
        </div>
    )
}

const mapStateToProps = ({loading, error, user}) => {
    return {
        loading,
        error,
        user
    }
};

const mapDispatchToProps = {
    SIGN_OUT_USER
};

export default connect(mapStateToProps, mapDispatchToProps)(OperatorPage);