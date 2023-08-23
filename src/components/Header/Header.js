import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
    return (
        <h1 className="Header">
            <FontAwesomeIcon icon={faComments} />
            <div className="link">
                <Link to="/" className="link_elem">
                    Chat
                </Link>
            </div>
        </h1>
    )
}

export default Header
