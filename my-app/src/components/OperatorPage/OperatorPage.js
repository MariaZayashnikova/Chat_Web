import React from 'react'
import 'firebase/auth'
import { Check_Token, SignOut_User } from '../../actions'
import { connect } from 'react-redux'
import './OperatorPage.css'
import { fb } from '../Firebase/componentFirebase'
import { Redirect } from 'react-router-dom'
import { Nav, NavItem, Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function OperatorPage({ user, SignOut_User, Check_Token }) {
    function signOut() {
        fb.auth()
            .signOut()
            .then(() => {
                SignOut_User()
            })
            .catch((error) => {
                // An error happened.
            })
    }

    /*    Check_Token(user.token)*/

    if (!user) {
        return <Redirect to="/" />
    }

    return (
        <div className="OperatorPage">
            <div className="navBar">
                <Nav className="listBar" navbar>
                    <NavItem className="navItem">
                        <FontAwesomeIcon
                            icon={['fas', 'user-edit']}
                            size="3x"
                            color="darkblue"
                            className="customIcon"
                        />
                        <div>Активные</div>
                    </NavItem>
                    <NavItem className="navItem">
                        <FontAwesomeIcon
                            icon={['fas', 'flag-checkered']}
                            size="3x"
                            color="darkblue"
                        />
                        <div>Завершенные</div>
                    </NavItem>
                    <NavItem className="navItem">
                        <FontAwesomeIcon
                            icon={['fas', 'save']}
                            size="3x"
                            color="darkblue"
                        />
                        <div>Сохранённые</div>
                    </NavItem>
                </Nav>
            </div>
            <div className="containerBodyOperatorPage">
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
                        onClick={signOut}
                    >
                        Выйти
                    </Button>
                </div>
                <div className="containerBody"></div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ loadingFromState, errorFromState, user }) => {
    return {
        loadingFromState,
        errorFromState,
        user,
    }
}

const mapDispatchToProps = {
    Check_Token,
    SignOut_User,
}

export default connect(mapStateToProps, mapDispatchToProps)(OperatorPage)
