import React from 'react'
import { SignOut_User } from '../../../../actions'
import { connect } from 'react-redux'
import NavBar from '../../NavBar/NavBar'
import User from '../User'

function SettingsUser({ user, SignOut_User }) {
    return (
        <div className="OperatorPage">
            <NavBar />
            <div className="containerBodyOperatorPage">
                <User />
                <div className="containerBody">
                    <div>Обновить профиль</div>
                    <div>Настройки диалогов</div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ user }) => {
    return {
        user,
    }
}

const mapDispatchToProps = {
    SignOut_User,
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsUser)
