import React from 'react'
import '../OperatorPage.css'
import NavBar from '../NavBar/NavBar'
import User from '../User/User'
import SearchBar from '../SearchBar/SearchBar'

function ActiveCases() {
    return (
        <div className="OperatorPage">
            <NavBar />
            <div className="containerBodyOperatorPage">
                <User />
                <div className="containerBody">
                    <SearchBar />
                </div>
            </div>
        </div>
    )
}

export default ActiveCases
