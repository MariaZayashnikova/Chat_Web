import './App.css';
import AuthorizationPage from "../AuthorizationPage/AuthorizationPage";
import HeaderTitle from '../HeaderTitle/HeaderTitle';
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import OperatorPage from "../OperatorPage/OperatorPage";
import React from "react";
import {connect} from "react-redux";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';
import Error from "../Error/Error";

library.add(fab, fas);

function App({user}) {
  return (
      <Router>
          <div className="App">
              <HeaderTitle/>
              <Route path='/' exact component={AuthorizationPage} />
              <Route path='/Registration' exact component={RegistrationPage} />
              <Route path='/OperatorPage'exact component={OperatorPage} />
              {user ? (
                  <Redirect push to="/OperatorPage"/>
              ) : <Redirect push to="/"/>}
              <Route path='/error' component={Error} />
              <Redirect to="/error"/>
          </div>
      </Router>
  );
}

const mapStateToProps = ({user}) => {
    return {
        user
    }
};

export default connect(mapStateToProps)(App);
