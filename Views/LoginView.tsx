import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ActiveSessionManager } from '../Controller';
import { Credentials } from '../Model';

const LoginForm = ({ loginIntoToolsHandler }) => {
  // if (ActiveSessionManager.isSessionAlive()) return <Navigate to="/tools" />;

  const navigate = useNavigate();

  const loginSubmissionHandler = (e) => {
    e.preventDefault();

    const credentials: Credentials = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    const navigateNext = loginIntoToolsHandler(credentials);

    // if (navigateNext) {
    //   navigate('/tools');
    // } else {
    //   navigate('/');
    // }
  };

  return (
    <div className="login-container">
      <form onSubmit={loginSubmissionHandler}>
        <h1>Login</h1>
        <div className="login-fields">
          <label>Username:</label>
          <input type="text" id="username" readOnly value="lsantander.ntl" />
        </div>
        <div className="login-fields">
          <label>Password: </label>
          <input type="password" id="password" readOnly value="123456A" />
        </div>
        <div className="login-fields-button">
          <button>Log In</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
