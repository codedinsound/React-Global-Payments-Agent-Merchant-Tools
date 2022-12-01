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
import {
  ActiveSessionManager,
  LocalStorageSimulationServer,
  ServerManagerController,
} from '../Controller';
import { Credentials } from '../Model';

// ESTABLISH SERVER CONNECTION
// ----------------------------------------------------
const server = new ServerManagerController(new LocalStorageSimulationServer());
server.connect();
// -----------------------------------------------------

const Protected = ({ children }) => {
  if (!ActiveSessionManager.isSessionAlive())
    return <Navigate to="/" replace />;
  return children;
};

export default function App(props) {
  // Check if There is an Active Session

  ActiveSessionManager.restablishSession();

  const [sessionToken, updateSessionToken] = useState(
    ActiveSessionManager.getActiveSession()
  );

  console.log(sessionToken);

  // FUNCTION
  const loginIntoToolsHandler = (credentials: Credentials) => {
    server.getServer().authenticateUser(credentials);

    if (!ActiveSessionManager.isSessionAlive()) return false;

    updateSessionToken(ActiveSessionManager.getActiveSession());

    return true;
  };

  // MARK: Log Out of the Screen
  const logOutOfToolsHandler = (e) => {
    console.log('Logging Out....');
  };

  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <LoginForm loginIntoToolsHandler={loginIntoToolsHandler} />
            }
          />
          <Route
            path="/tools"
            element={
              <Protected>
                <MainToolsView
                  userCallHistory={
                    sessionToken !== null ? sessionToken.userCallHistory : null
                  }
                  logOut={null}
                />
              </Protected>
            }
          />
        </Routes>
      </Router>
    </React.Fragment>
  );
}
