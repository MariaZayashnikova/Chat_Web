import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'
import './NavBar.css'

function NavBar() {

    const setActivePage = ({ isActive }) => ({ color: isActive ? 'blue' : 'darkblue' });

    return (
        <div className="NavBar">
            <NavLink to="/OperatorPage/Active" className='NavBar__item' style={setActivePage}>
                <FontAwesomeIcon
                    icon={['fas', 'users']}
                    size="3x"
                    color='inherit'
                />
                <div>Активные</div>
            </NavLink>
            <NavLink to="/OperatorPage/inWork" className='NavBar__item' style={setActivePage}>
                <FontAwesomeIcon
                    icon={['fas', 'user-edit']}
                    size="3x"
                    color='inherit'
                />
                <div>В работе</div>
            </NavLink>
            <NavLink to="/OperatorPage/Finished" className='NavBar__item' style={setActivePage}>
                <FontAwesomeIcon
                    icon={['fas', 'flag-checkered']}
                    size="3x"
                    color='inherit'
                />
                <div>Завершенные</div>
            </NavLink>
            <NavLink to="/OperatorPage/Saved" className='NavBar__item' style={setActivePage}>
                <FontAwesomeIcon
                    icon={['fas', 'save']}
                    size="3x"
                    color='inherit'
                />
                <div>Сохранённые</div>
            </NavLink>
        </div>
    )
}

export default React.memo(NavBar)
