import React from 'react'
import './NavBar.css'
import { Nav, NavItem } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { Set_Value_Search } from '../../../actions'
import { connect } from 'react-redux'

function NavBar({ Set_Value_Search }) {
    return (
        <div className="navBar">
            <Nav className="listBar" navbar>
                <NavItem
                    className="navItem"
                    onClick={() => Set_Value_Search(null)}
                >
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
                <NavItem
                    className="navItem"
                    onClick={() => Set_Value_Search(null)}
                >
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
                <NavItem
                    className="navItem"
                    onClick={() => Set_Value_Search(null)}
                >
                    <Link to="/OperatorPage/Finished" className="linkNav">
                        <FontAwesomeIcon
                            icon={['fas', 'flag-checkered']}
                            size="3x"
                            color="darkblue"
                        />
                        <div>Завершенные</div>
                    </Link>
                </NavItem>
                <NavItem
                    className="navItem"
                    onClick={() => Set_Value_Search(null)}
                >
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

const mapDispatchToProps = {
    Set_Value_Search,
}

export default connect(null, mapDispatchToProps)(NavBar)
