import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComments} from "@fortawesome/free-solid-svg-icons";
import './HeaderTitle.css';
import {Link} from "react-router-dom";

function HeaderTitle() {
    return (
        <h1 className="TitleLogin">
            <FontAwesomeIcon className="icons" icon={faComments} />
            <Link to='/' className="customLink">Chat</Link>
        </h1>
    )
}

export default HeaderTitle;