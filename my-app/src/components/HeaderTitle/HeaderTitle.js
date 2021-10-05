import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import './HeaderTitle.css'
import { Link } from 'react-router-dom'

function HeaderTitle() {
    return (
        <h1 className="headerTitle">
            <FontAwesomeIcon className="headerTitle__icon" icon={faComments} />
            <Link to="/" className="containerLinks__link_custom">
                Chat
            </Link>
        </h1>
    )
}

export default HeaderTitle
