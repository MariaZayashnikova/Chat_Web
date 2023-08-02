import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import { fetchUserSettings, getTopicsFromDB, setValueSearch, clearErrors } from '../../../actions'
import NavBar from './NavBar/NavBar'
import User from './User/User'
import GetDataFromDB from '../../services/getDataFromDB'
import './Operator-page.css'

function OperatorPage({ user, settingsUser, fetchUserSettings, getTopicsFromDB, setValueSearch, clearErrors, error }) {
    let location = useLocation();

    useEffect(() => {
        setValueSearch(null)
        if (error) clearErrors()
    }, [location])

    if (!settingsUser) {
        fetchUserSettings(user.uid)
        getTopicsFromDB()
    } else {
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
            <GetDataFromDB />
            <NavBar />
            <div className="container-content">
                <User />
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ user, settingsUser, error }) => ({ user, settingsUser, error })

const mapDispatchToProps = {
    fetchUserSettings,
    getTopicsFromDB,
    setValueSearch,
    clearErrors
}

export default connect(mapStateToProps, mapDispatchToProps)(OperatorPage)
