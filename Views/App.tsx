import * as React from 'react';
import { useState } from 'react';
import LoginForm from '../Views/LoginView';
import MainToolsView from '../Views/MainToolsView';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './style.css';

const Protected = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) return <LoginForm />;
  return <MainToolsView />;
};

export default function App() {
  const [tokenization, updateToken] = useState(null);

  let token = true;
  let display;

  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
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
