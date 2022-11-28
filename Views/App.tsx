import * as React from 'react';
import { useState } from 'react';
import LoginForm from '../Views/LoginView';
import MainToolsView from '../Views/MainToolsView';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './style.css';

export default function App() {
  const [tokenization, updateToken] = useState({});

  let token = true;
  let display;

  if (!token) {
    display = <LoginForm />;
  } else {
    display = <MainToolsView />;
  }

  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<MainToolsView />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}
