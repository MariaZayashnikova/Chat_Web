import React from 'react'
import { connect } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { fetchUserSettings, getTopicsFromDB } from '../../../actions'
import NavBar from './NavBar/NavBar'
import User from './User/User'
import './Operator-page.css'

function OperatorPage({ user, settingsUser, fetchUserSettings, getTopicsFromDB }) {
    if (!settingsUser) {
        fetchUserSettings(user.uid)
        getTopicsFromDB()
    }
    console.log('operator page')
    if (settingsUser) {
        let newArr = []
        for (let i = 0; i < settingsUser.phrases.length; i++) {
            if (settingsUser.phrases[i]) {
                newArr.push(settingsUser.phrases[i])
            }
        }
        settingsUser.phrases = newArr
    }

    return (
        <div className="Operator-page">
            <NavBar />
            <div className="containerBodyOperatorPage">
                <User />
                <div className="body"></div>
                <Outlet />
            </div>
        </div>
    )
}

const mapStateToProps = ({ user, settingsUser }) => ({ user, settingsUser })

const mapDispatchToProps = {
    fetchUserSettings,
    getTopicsFromDB,
}

export default connect(mapStateToProps, mapDispatchToProps)(OperatorPage)
