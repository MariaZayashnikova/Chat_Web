import React from 'react'
import { Nav, NavItem } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { setValueSearch } from '../../../../actions'
import './NavBar.css'

function NavBar({ setValueSearch }) {
    const history = useHistory()

    let isActivePage = false
    let isFinishedPage = false
    let isInWorkPage = false
    let isSavedPage = false

    switch (history.location.pathname) {
        case '/active':
            isActivePage = true
            break
        case '/OperatorPage/inWork':
            isInWorkPage = true
            break
        case '/OperatorPage/Finished':
            isFinishedPage = true
            break
        case '/OperatorPage/Saved':
            isSavedPage = true
            break
        default:
            break
    }

    return (
        <div className="navBar">
            <Nav className="listBar" navbar>
                <NavItem
                    className={isActivePage ? 'navItem activeItem' : 'navItem'}
                    onClick={() => setValueSearch(null)}
                >
                    <Link to='/active' className="navItem__link">
                        <FontAwesomeIcon
                            icon={['fas', 'users']}
                            size="3x"
                            color={isActivePage ? 'blue' : 'darkblue'}
                        />
                        <div>Активные</div>
                    </Link>
                </NavItem>
                <NavItem
                    className={isInWorkPage ? 'navItem activeItem' : 'navItem'}
                    onClick={() => setValueSearch(null)}
                >
                    <Link to="/OperatorPage/inWork" className="navItem__link">
                        <FontAwesomeIcon
                            icon={['fas', 'user-edit']}
                            size="3x"
                            color={isInWorkPage ? 'blue' : 'darkblue'}
                        />
                        <div>В работе</div>
                    </Link>
                </NavItem>
                <NavItem
                    className={
                        isFinishedPage ? 'navItem activeItem' : 'navItem'
                    }
                    onClick={() => setValueSearch(null)}
                >
                    <Link to="/OperatorPage/Finished" className="navItem__link">
                        <FontAwesomeIcon
                            icon={['fas', 'flag-checkered']}
                            size="3x"
                            color={isFinishedPage ? 'blue' : 'darkblue'}
                        />
                        <div>Завершенные</div>
                    </Link>
                </NavItem>
                <NavItem
                    className={isSavedPage ? 'navItem activeItem' : 'navItem'}
                    onClick={() => setValueSearch(null)}
                >
                    <Link to="/OperatorPage/Saved" className="navItem__link">
                        <FontAwesomeIcon
                            icon={['fas', 'save']}
                            size="3x"
                            color={isSavedPage ? 'blue' : 'darkblue'}
                        />
                        <div>Сохранённые</div>
                    </Link>
                </NavItem>
            </Nav>
        </div>
    )
}

const mapDispatchToProps = { setValueSearch }

export default connect(null, mapDispatchToProps)(NavBar)
