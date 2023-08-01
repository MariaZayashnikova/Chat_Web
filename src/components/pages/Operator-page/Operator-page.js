import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import { fetchUserSettings, getTopicsFromDB, setValueSearch, clearErrors } from '../../../actions'
import NavBar from './NavBar/NavBar'
import User from './User/User'
import GetDataFromDB from '../../services/getDataFromDB'
import './Operator-page.css'

function OperatorPage({ user, settingsUser, fetchUserSettings, getTopicsFromDB, setValueSearch, clearErrors }) {
    let location = useLocation();

    useEffect(() => {
        setValueSearch(null)
        clearErrors()
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
    console.log(new Date().getTime())

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

const mapStateToProps = ({ user, settingsUser }) => ({ user, settingsUser })

const mapDispatchToProps = {
    fetchUserSettings,
    getTopicsFromDB,
    setValueSearch,
    clearErrors
}

export default connect(mapStateToProps, mapDispatchToProps)(OperatorPage)
