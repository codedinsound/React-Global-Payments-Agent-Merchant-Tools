import React from 'react';

const LoginForm = (props) => {
  return (
    <div className="login-container">
      <form>
        <h1>Login</h1>
        <div className="login-fields">
          <label>Username:</label>
          <input />
        </div>
        <div className="login-fields">
          <label>Password: </label>
          <input />
        </div>
        <div className="login-fields-button">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
