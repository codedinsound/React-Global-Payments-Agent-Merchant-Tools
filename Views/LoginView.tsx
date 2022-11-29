import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionManager } from '../Controller';

const LoginForm = (props) => {
  const navigate = useNavigate();

  const handleSumbission = (e) => {
    e.preventDefault();

    const navigateNext = props.loginHandler(e);

    if (navigateNext) {
      navigate('/tools');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSumbission}>
        <h1>Login</h1>
        <div className="login-fields">
          <label>Username:</label>
          <input type="text" id="username" value={'lsantander.ntl'} readOnly />
        </div>
        <div className="login-fields">
          <label>Password: </label>
          <input type="password" id="password" value={'123456A'} readOnly />
        </div>
        <div className="login-fields-button">
          <button>Log In</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
