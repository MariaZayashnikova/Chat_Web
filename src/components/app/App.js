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
import Chat from '../pages/Operator-page/Chat/Chat'
import InWorkChats from '../pages/Operator-page/InWork-chats/InWork-chats'
import SavedChats from '../pages/Operator-page/Saved-chats/Saved-chats'
import FinishedChats from '../pages/Operator-page/Finished-chats/Finished-chats'
import ActiveChats from '../pages/Operator-page/Active-chats/Active-chats'
import './App.css'

library.add(fab, fas)

function App({ user }) {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={user ? <OperatorPage /> : <AuthorizationPage />}>
                    <Route path='/OperatorPage'>
                        <Route path='Active' element={<ActiveChats />} />
                        <Route path="inWork" element={<InWorkChats />} />
                        <Route path="Saved" element={<SavedChats />} />
                        <Route path="Finished" element={<FinishedChats />} />
                        <Route path="Chat/:itemId" element={<Chat />} />
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
