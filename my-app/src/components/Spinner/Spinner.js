import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./Spinner.css";

function Spinner() {
    return (
        <div className="block-spinner"><FontAwesomeIcon className="custom-icon fa-spin" icon={["fas", "spinner"]} size="3x"/>Loading...</div>
    )
}

export default Spinner;