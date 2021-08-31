import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComments} from "@fortawesome/free-solid-svg-icons";
import './HeaderTitle.css';

function HeaderTitle() {
    return (
        <h1 className="TitleLogin">
            <FontAwesomeIcon className="icons" icon={faComments} />
            Chat
        </h1>
    )
}

export default HeaderTitle;