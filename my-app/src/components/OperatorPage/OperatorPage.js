import React from 'react'
import './OperatorPage.css'
import NavBar from './NavBar/NavBar'
import User from './User/User'
import moment from 'moment'
import { fetch_User_Settings, get_Topics_From_DB } from '../../actions'
import { connect } from 'react-redux'

function createDisplayedFilterResults(
    allResultFilter,
    displayedFilterResults,
    valueActiveCases
) {
    let i = 0
    allResultFilter.forEach((elem) => {
        i++
        if (i > valueActiveCases) {
            return
        } else {
            displayedFilterResults.push(elem)
        }
    })
}

export { createDisplayedFilterResults }

function calculateDate(timestamp) {
    let time

    let dayNow = new Date().getDate()
    let monthNow = new Date().getMonth()
    let yearNow = new Date().getFullYear()

    let date = new Date(timestamp)
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()

    if (dayNow === day && monthNow === month && yearNow === year) {
        time = moment(timestamp).fromNow()
    } else {
        time = moment(timestamp).format('DD MMMM YYYY, HH:mm')
    }

    return time
}

export { calculateDate }

function OperatorPage({
    user,
    settingsUser,
    fetch_User_Settings,
    get_Topics_From_DB,
}) {
    if (!settingsUser) {
        fetch_User_Settings(user.uid)
        get_Topics_From_DB()
    }

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
        <div className="OperatorPage">
            <NavBar />
            <div className="containerBodyOperatorPage">
                <User />
                <div className="body"></div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ user, settingsUser }) => {
    return {
        user,
        settingsUser,
    }
}

const mapDispatchToProps = {
    fetch_User_Settings,
    get_Topics_From_DB,
}

export default connect(mapStateToProps, mapDispatchToProps)(OperatorPage)
