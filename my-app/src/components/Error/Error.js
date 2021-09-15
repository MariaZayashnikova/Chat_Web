import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './Error.css';
import {Link} from "react-router-dom";

function Error() {
    return (
        <div className="containerError">
            <FontAwesomeIcon className="custom-icon" icon={['fas', 'sad-tear']} size="6x" />
            <p>Упс... Такой страницы не существует</p>
            <Link className="linkInError" to="/">Главная</Link>
        </div>
    )
}

export default Error;