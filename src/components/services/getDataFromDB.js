import React from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import { connect } from 'react-redux'
import { dialoguesFromDatabase } from '../../actions'

function GetDataFromDB({ dialoguesFromDatabase }) {
    const database = firebase.database().ref('Chats/');

    database.on('value', (snapshot) => {
        let data = snapshot.val();
        dialoguesFromDatabase(data);
    })
    return <></>
}

const mapDispatchToProps = {
    dialoguesFromDatabase
}

export default connect(null, mapDispatchToProps)(GetDataFromDB)