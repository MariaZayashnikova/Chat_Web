import './App.css'
import AuthorizationPage from '../AuthorizationPage/AuthorizationPage'
import HeaderTitle from '../HeaderTitle/HeaderTitle'
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom'
import RegistrationPage from '../RegistrationPage/RegistrationPage'
import OperatorPage from '../OperatorPage/OperatorPage'
import ResetPasswordPage from '../ResetPasswordPage/ResetPasswordPage'
import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import ErrorRoute from '../ErrorRoute/ErrorRoute'
import { connect } from 'react-redux'
import ActiveCases from '../OperatorPage/AtiveCases/ActiveCases'
import Dialogue from '../OperatorPage/Dialogue/Dialogue'
import InWorkCases from '../OperatorPage/InWorkCases/InWorkCases'
import SavedCases from '../OperatorPage/SavedCases/SavesCases'
import FinishedCases from '../OperatorPage/FinishedCases/FinishedCases'

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

const mapStateToProps = ({ user }) => {
    return {
        user,
    }
}

export default connect(mapStateToProps)(App)
