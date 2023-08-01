import React from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import { connect } from 'react-redux'
import { gotChats } from '../../actions'

function GetDataFromDB({ gotChats }) {
    const database = firebase.database().ref('Chats/');

    database.on('value', (snapshot) => {
        let data = snapshot.val();
        gotChats(data);
    })
    return <></>
}

const mapDispatchToProps = {
    gotChats
}

export default connect(null, mapDispatchToProps)(GetDataFromDB)