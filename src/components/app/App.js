import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { connect } from 'react-redux'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import AuthorizationPage from '../pages/Authorization-page/Authorization-page'
import Header from '../Header/Header'
import RegistrationPage from '../pages/Registration-page/Registration-page'
import OperatorPage from '../pages/Operator-page/Operator-page'
import ResetPasswordPage from '../pages/Reset-password-page/Reset-password-page'
import ErrorRoute from '../ErrorRoute/ErrorRoute'
import Dialogue from '../pages/Operator-page/Dialogue/Dialogue'
import InWorkCases from '../pages/Operator-page/InWorkCases/InWorkCases'
import SavedCases from '../pages/Operator-page/SavedCases/SavesCases'
import FinishedCases from '../pages/Operator-page/FinishedCases/FinishedCases'
import ActiveCases from '../pages/Operator-page/AtiveCases/ActiveCases'
import './App.css'

library.add(fab, fas)

function App({ user }) {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={user ? <OperatorPage /> : <AuthorizationPage />}>
                    <Route path='/OperatorPage' element={null}>
                        <Route path='Active' element={<ActiveCases />} />
                        <Route path="inWork" element={<InWorkCases />} />
                        <Route path="Saved" element={<SavedCases />} />
                        <Route path="Finished" element={<FinishedCases />} />
                        <Route path="Dialogue/:itemId " element={<Dialogue />} />
                    </Route>
                </Route>
                <Route path="/Registration" element={<RegistrationPage />} />
                <Route path="/ResetPassword" element={<ResetPasswordPage />} />
                <Route path="*" element={<ErrorRoute />} />
            </Routes>
        </div >
    )
}

const mapStateToProps = ({ user }) => ({ user })

export default connect(mapStateToProps)(App)
