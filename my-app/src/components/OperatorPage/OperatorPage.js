import React from 'react'
import './OperatorPage.css'
import NavBar from './NavBar/NavBar'
import User from './User/User'

function createDisplayedFilterResults(
    allResultFilter,
    displayedFilterResults,
    valueActiveCases
) {
    let i = 0
    allResultFilter.forEach((elem) => {
        i++
        if (i > valueActiveCases) {
            return
        } else {
            displayedFilterResults.push(elem)
        }
    })
}

export { createDisplayedFilterResults }

function OperatorPage() {
    return (
        <div className="OperatorPage">
            <NavBar />
            <div className="containerBodyOperatorPage">
                <User />
                <div className="body"></div>
            </div>
        </div>
    )
}

export default OperatorPage
