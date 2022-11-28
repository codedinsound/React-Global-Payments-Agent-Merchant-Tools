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

export default function App() {
  const [tokenization, updateToken] = useState(null);

  const loginIntoToolsHandler = (e): void => {
    const [username, password] = e.target;
    console.log('Fired', username.value, password.value);
  };

  let token = true;

  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<LoginForm loginHandler={loginIntoToolsHandler} />}
          />
          <Route
            path="/tools"
            element={
              <Protected isLoggedIn={token}>
                <MainToolsView />
              </Protected>
            }
          />
        </Routes>
      </Router>
    </React.Fragment>
  );
}
