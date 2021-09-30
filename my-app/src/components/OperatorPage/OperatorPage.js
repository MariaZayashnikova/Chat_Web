import React from 'react'
import './OperatorPage.css'
import NavBar from './NavBar/NavBar'
import User from './User/User'

function OperatorPage() {
    return (
        <div className="OperatorPage">
            <NavBar />
            <div className="containerBodyOperatorPage">
                <User />
                <div className="containerBody"></div>
            </div>
        </div>
    )
}

export default OperatorPage
