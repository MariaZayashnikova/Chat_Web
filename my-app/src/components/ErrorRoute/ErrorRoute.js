import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import './ErrorRoute.css'

function ErrorRoute() {
    return (
        <div className="containerError">
            <FontAwesomeIcon
                className="custom-icon"
                icon={['fas', 'sad-tear']}
                size="6x"
            />
            <p>Упс... Такой страницы не существует</p>
            <Link className="linkInError" to="/">
                Главная
            </Link>
        </div>
    )
}

export default ErrorRoute
