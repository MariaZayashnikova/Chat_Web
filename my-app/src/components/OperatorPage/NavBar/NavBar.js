import React from 'react'
import './NavBar.css'
import { Nav, NavItem } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

function NavBar() {
    return (
        <div className="navBar">
            <Nav className="listBar" navbar>
                <NavItem className="navItem">
                    <Link to="/OperatorPage/Active" className="linkNav">
                        <FontAwesomeIcon
                            icon={['fas', 'users']}
                            size="3x"
                            color="darkblue"
                            className="customIcon"
                        />
                        <div>Активные</div>
                    </Link>
                </NavItem>
                <NavItem className="navItem">
                    <Link to="/OperatorPage/inWork" className="linkNav">
                        <FontAwesomeIcon
                            icon={['fas', 'user-edit']}
                            size="3x"
                            color="darkblue"
                            className="customIcon"
                        />
                        <div>В работе</div>
                    </Link>
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
                    <Link to="/OperatorPage/Saved" className="linkNav">
                        <FontAwesomeIcon
                            icon={['fas', 'save']}
                            size="3x"
                            color="darkblue"
                        />
                        <div>Сохранённые</div>
                    </Link>
                </NavItem>
            </Nav>
        </div>
    )
}

export default NavBar
