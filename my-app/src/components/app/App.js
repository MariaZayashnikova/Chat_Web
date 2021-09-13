import './App.css';
import AuthorizationPage from "../AuthorizationPage/AuthorizationPage";
import HeaderTitle from '../HeaderTitle/HeaderTitle';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import OperatorPage from "../OperatorPage/OperatorPage";
import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';
import Error from "../Error/Error";

library.add(fab, fas);

function App() {
  return (
      <Router>
          <div className="App">
              <HeaderTitle/>
              <Switch>
                <Route path='/' exact component={AuthorizationPage} />
                <Route path='/Registration' exact component={RegistrationPage} />
                <Route path='/OperatorPage'exact component={OperatorPage} />
                <Route path="*">
                    <Error/>
                </Route>
              </Switch>
          </div>
      </Router>
  );
}


export default App;
