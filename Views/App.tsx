import * as React from 'react';
import { useState } from 'react';
import LoginForm from '../Views/LoginView';
import MainToolsView from '../Views/MainToolsView';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import './style.css';

const Protected = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) return <Navigate to="/" replace />;
  return children;
};

interface Credentials {
  username: string;
  password: string;
}

export default function App(props) {
  // TODO: CHECK FOR ANY ACTIVE SESSION AND UPDATE STATE IMMEDIATELY
  const [tokenization, updateToken] = useState(null);

  const loginIntoToolsHandler = (e) => {
    const [username, password] = e.target;

    const credentials: Credentials = {
      username: username.value,
      password: password.value,
    };

    const val = props.sessionManager.localSessionAuthenticate(credentials);
    console.log(val);

    // // NOTE: Refactor Later if user is not properly authenticated then return false statement
    // if (!val) return false;

    // updateToken({
    //   loggedIn: true,
    //   user: val.user,
    //   callHistory: val.userCallHistory,
    // });

    // return true;
  };

  // MARK: Log Out of the Screen
  const logOutOfToolsHandler = (e) => {
    updateToken(null);
  };

  let isLoggedIn = tokenization ? tokenization.loggedIn : false;

  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <LoginForm
                loginIntoToolsHandler={loginIntoToolsHandler}
                sessionManager={props.sessionManager}
              />
            }
          />
          <Route
            path="/tools"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <MainToolsView
                  callHistory={isLoggedIn ? tokenization.callHistory : null}
                  user={isLoggedIn ? tokenization.user : null}
                  logOut={isLoggedIn ? logOutOfToolsHandler : null}
                />
              </Protected>
            }
          />
        </Routes>
      </Router>
    </React.Fragment>
  );
}
