import * as React from 'react';
import { useState } from 'react';
import LoginForm from '../Views/LoginView';
import MainToolsView from '../Views/MainToolsView';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './style.css';

const Protected = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) return <LoginForm />;
  return children;
};

interface Credentials {
  username: string;
  password: string;
}

export default function App(props) {
  const [tokenization, updateToken] = useState(null);

  const loginIntoToolsHandler = (e) => {
    const [username, password] = e.target;
    console.log('Fired', username.value, password.value);

    const credentials: Credentials = {
      username: username.value,
      password: password.value,
    };

    const val = props.sessionManager.localSessionAuthenticate(credentials);

    updateToken({
      loggedIn: true,
      callHistory: val,
    });

    return true;
  };

  let isLoggedIn = tokenization ? tokenization.loggedIn : false;

  console.log(tokenization);

  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <LoginForm
                loginHandler={loginIntoToolsHandler}
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
                />
              </Protected>
            }
          />
        </Routes>
      </Router>
    </React.Fragment>
  );
}
