import React from 'react'
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom'
import { connect } from 'react-redux'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import AuthorizationPage from '../pages/AuthorizationPage/AuthorizationPage'
import HeaderTitle from '../HeaderTitle/HeaderTitle'
import RegistrationPage from '../pages//RegistrationPage/RegistrationPage'
import OperatorPage from '../pages//OperatorPage/OperatorPage'
import ResetPasswordPage from '../pages//ResetPasswordPage/ResetPasswordPage'
import ErrorRoute from '../ErrorRoute/ErrorRoute'
import ActiveCases from '../pages//OperatorPage/AtiveCases/ActiveCases'
import Dialogue from '../pages//OperatorPage/Dialogue/Dialogue'
import InWorkCases from '../pages//OperatorPage/InWorkCases/InWorkCases'
import SavedCases from '../pages//OperatorPage/SavedCases/SavesCases'
import FinishedCases from '../pages//OperatorPage/FinishedCases/FinishedCases'
import './App.css'

library.add(fab, fas)

function App({ user }) {
    return (
        <Router>
            <div className="App">
                <HeaderTitle />
                <Switch>
                    <Route
                        path="/"
                        exact
                        render={() =>
                            user ? <OperatorPage /> : <AuthorizationPage />
                        }
                    />
                    <Route
                        path="/Registration"
                        exact
                        component={RegistrationPage}
                    >
                        {user ? <Redirect push to="/" /> : <RegistrationPage />}
                    </Route>
                    <Route
                        path="/ResetPassword"
                        exact
                        component={ResetPasswordPage}
                    />
                    <Route
                        path="/OperatorPage/Active"
                        exact
                        component={ActiveCases}
                    >
                        {!user ? <Redirect push to="/" /> : null}
                    </Route>
                    <Route
                        path="/OperatorPage/inWork"
                        exact
                        component={InWorkCases}
                    >
                        {!user ? <Redirect push to="/" /> : null}
                    </Route>
                    <Route
                        path="/OperatorPage/Saved"
                        exact
                        component={SavedCases}
                    >
                        {!user ? <Redirect push to="/" /> : null}
                    </Route>
                    <Route
                        path="/OperatorPage/Finished"
                        exact
                        component={FinishedCases}
                    >
                        {!user ? <Redirect push to="/" /> : null}
                    </Route>
                    <Route
                        path="/OperatorPage/Dialogue/:id"
                        render={({ match }) => {
                            const { id } = match.params

                            return <Dialogue itemId={id} />
                        }}
                    >
                        {!user ? <Redirect push to="/" /> : null}
                    </Route>
                    <Route path="*">
                        <ErrorRoute />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

const mapStateToProps = ({ user }) => ({ user })

export default connect(mapStateToProps)(App)
