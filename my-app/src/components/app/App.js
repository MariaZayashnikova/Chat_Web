import './App.css'
import AuthorizationPage from '../AuthorizationPage/AuthorizationPage'
import HeaderTitle from '../HeaderTitle/HeaderTitle'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import RegistrationPage from '../RegistrationPage/RegistrationPage'
import OperatorPage from '../OperatorPage/OperatorPage'
import ResetPasswordPage from '../ResetPasswordPage/ResetPasswordPage'
import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Error from '../Error/Error'
import { connect } from 'react-redux'
import ActiveCases from '../OperatorPage/AtiveCases/ActiveCases'

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
                    />
                    <Route
                        path="/ResetPassword"
                        exact
                        component={ResetPasswordPage}
                    />
                    <Route
                        path="/OperatorPage/Active"
                        exact
                        component={ActiveCases}
                    />
                    <Route path="*">
                        <Error />
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
