import React from 'react';
import { SessionManagerWorker } from '../Controller';

const LoginForm = (props) => {
  const loginHandler = (event) => {
    event.preventDefault();

    const [username, password] = event.target;

    SessionManagerWorker.login({
      username: username.value,
      password: password.value,
    });
  };

  return (
    <div className="login-container">
      <form onSubmit={loginHandler}>
        <h1>Login</h1>
        <div className="login-fields">
          <label>Username:</label>
          <input type="text" />
        </div>
        <div className="login-fields">
          <label>Password: </label>
          <input type="password" />
        </div>
        <div className="login-fields-button">
          <button>Log In</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
