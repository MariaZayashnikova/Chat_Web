import React from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import { connect } from 'react-redux'
import { gotChats, getChats } from '../../actions'

function GetDataFromDB({ gotChats, getChats }) {
    const database = firebase.database().ref('Chats/');

    getChats()

    database.on('value', (snapshot) => {
        let data = snapshot.val();
        gotChats(data);
    })
    return <></>
}

const mapDispatchToProps = { gotChats, getChats }

export default connect(null, mapDispatchToProps)(GetDataFromDB)