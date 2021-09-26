import React from 'react'
import './OperatorPage.css'
import NavBar from './NavBar/NavBar'
import User from './User/User'
import Spinner from '../Spinner/Spinner'
import { connect } from 'react-redux'

function OperatorPage({ loadingFromState }) {
    return (
        <div className="OperatorPage">
            <NavBar />
            <div className="containerBodyOperatorPage">
                <User />
                <div className="containerBody">
                    {loadingFromState ? <Spinner /> : null}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ loadingFromState }) => {
    return {
        loadingFromState,
    }
}

export default connect(mapStateToProps)(OperatorPage)
