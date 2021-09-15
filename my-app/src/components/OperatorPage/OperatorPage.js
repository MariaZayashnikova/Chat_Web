import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import { FETCH_MESSAGES_SUCCESS } from '../../actions'
import { connect } from 'react-redux'
import './OperatorPage.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { fb } from '../Firebase/componentFirebase'
import Spinner from '../Spinner/Spinner'
import { Redirect } from 'react-router-dom'
import { Nav, NavItem, Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function OperatorPage() {
    function signOut() {
        firebase
            .auth()
            .signOut()
            .then(() => {
                console.log('signOut user')
            })
            .catch((error) => {
                // An error happened.
            })
    }
    const [user, loading] = useAuthState(fb.auth())

    if (loading) {
        return <Spinner />
    }

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

const mapStateToProps = ({ loadingFromState, errorFromState }) => {
    return {
        loadingFromState,
        errorFromState,
    }
}

const mapDispatchToProps = {
    FETCH_MESSAGES_SUCCESS,
}

export default connect(mapStateToProps, mapDispatchToProps)(OperatorPage)
