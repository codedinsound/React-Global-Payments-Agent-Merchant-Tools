import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionManager } from '../Controller';

const LoginForm = (props) => {
  const navigate = useNavigate();

  const handleSumbission = (e) => {
    e.preventDefault();
    props.loginHandler(e);

    navigate('/tools');
  };

  const registerNewAgent = (e) => {
    e.preventDefault();

    const testUser = {
      username: 'lsantander.ntl',
      password: '123456A',
    };
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSumbission}>
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
      <button onClick={registerNewAgent}>Register</button>
    </div>
  );
};

export default LoginForm;
