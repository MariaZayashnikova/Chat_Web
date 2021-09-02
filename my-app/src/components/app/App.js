import './App.css';
import AuthorizationPage from "../AuthorizationPage/AuthorizationPage";
import HeaderTitle from '../HeaderTitle/HeaderTitle';
import {BrowserRouter as Router, Route} from "react-router-dom";
import RegistrationPage from "../RegistrationPage/RegistrationPage";

function App() {
  return (
      <Router>
          <div className="App">
              <HeaderTitle/>
              <Route path='/' exact component={AuthorizationPage} />
              <Route path='/Registration' exact component={RegistrationPage} />
          </div>
      </Router>

  );
}

export default App;
