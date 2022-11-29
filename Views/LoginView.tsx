import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DebuggingManager } from '../Testing';

const LoginForm = (props) => {
  DebuggingManager.debug(LoginForm.name, 6, [props]);

  const navigate = useNavigate();

  const handleSumbission = (e) => {
    e.preventDefault();

    DebuggingManager.debug(handleSumbission.name, 11, [
      e.target.username.value,
      e.target.password.value,
    ]);

    const navigateNext = props.loginIntoToolsHandler(e);

    // if (navigateNext) {
    //   navigate('/tools');
    // } else {
    //   navigate('/');
    // }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSumbission}>
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

      {/* <button
        onClick={() => {
          console.log('Register');

          console.log(
            props.sessionManager.localSessionRegister({
              username: 'lsantander.ntl',
              password: '123456A',
            })
          );
        }}
      >
        Register
      </button> */}
    </div>
  );
};

export default LoginForm;
