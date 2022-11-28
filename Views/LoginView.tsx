import React from 'react';
import { SessionManagerWorker } from '../Controller';

const LoginForm = (props) => {
  return (
    <div className="login-container">
      <form onSubmit={props.loginHandler}>
        <h1>Login</h1>
        <div className="login-fields">
          <label>Username:</label>
          <input type="text" id="username" />
        </div>
        <div className="login-fields">
          <label>Password: </label>
          <input type="password" id="password" />
        </div>
        <div className="login-fields-button">
          <button>Log In</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
