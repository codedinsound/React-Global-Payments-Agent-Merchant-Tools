import * as React from 'react';
import { useState } from 'react';
import { LocalStorageWorker } from '../Controller';
import { prefilledResponses } from '../Model';
import LoginForm from '../Views/LoginView';
import MainToolsView from '../Views/MainToolsView';
import './style.css';

export default function App() {
  const [tokenization, updateToken] = useState({});

  let token = false;
  let display;

  if (!token) {
    display = <LoginForm />;
  } else {
    display = <MainToolsView />;
  }

  return <React.Fragment>{display}</React.Fragment>;
}
