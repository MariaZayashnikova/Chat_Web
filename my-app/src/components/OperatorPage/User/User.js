import React from 'react'
import { SignOut_User } from '../../../actions'
import { connect } from 'react-redux'
import './User.css'
import { Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function User({ user, SignOut_User }) {
    return (
        <div className="containerUser">
            <h2 className="nameUser">
                <FontAwesomeIcon
                    icon={['fas', 'user']}
                    color="darkblue"
                    className="iconUser"
                />
                {user.email}
            </h2>
            <Button
                className="btnCustom"
                outline
                color="primary"
                onClick={() => SignOut_User()}
            >
                Выйти
            </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(User)
