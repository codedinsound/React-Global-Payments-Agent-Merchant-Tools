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
import { ActiveSessionManager } from '../Controller';

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

  let isSessionAlive = ActiveSessionManager.checkForActiveSessions();

  let token = null;

  if (isSessionAlive) {
    ActiveSessionManager.reestablisActiveSession();

    token = {
      loggedIn: ActiveSessionManager.getActiveSession().isLoggedIn,
      user: ActiveSessionManager.getActiveSession().userName,
      callHistory: ActiveSessionManager.reestablisActiveSession(),
    };
  }

  const [tokenization, updateToken] = useState(token);

  const loginIntoToolsHandler = (e) => {
    const [username, password] = e.target;

    const credentials: Credentials = {
      username: username.value,
      password: password.value,
    };

    const val = props.sessionManager.localSessionAuthenticate(credentials);

    // NOTE: Refactor Later if user is not properly authenticated then return false statement
    if (!val) return false;

    updateToken({
      loggedIn: true,
      user: val.user,
      callHistory: val.userCallHistory,
    });

    return true;
  };

  // MARK: Log Out of the Screen
  const logOutOfToolsHandler = (e) => {
    console.log('Logging Out....');
    updateToken({
      loggedIn: false,
      user: '',
      callHistory: null,
    });

    ActiveSessionManager.endSession();
  };

  let isLoggedIn = tokenization ? tokenization.loggedIn : false;

  console.log(isLoggedIn);

  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <LoginForm
                isLoggedIn={isLoggedIn}
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
