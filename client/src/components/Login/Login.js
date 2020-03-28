import React from 'react';
import { useHistory } from 'react-router-dom';
import './login.scss';

const FIELD_NAMES = {
  NAME: 'name',
  ROOM: 'room'
};

const Login = () => {
  const history = useHistory();

  const login = event => {
    event.preventDefault();

    const name = event.target[FIELD_NAMES.NAME].value;
    const room = event.target[FIELD_NAMES.ROOM].value;

    if (!name || !room) {
      return;
    }

    history.push(`/chat/${room}/${name}`);
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={login}>
        <header className="login__header">Join</header>
        <div className="login__info">
          <input type="text" className="login__input" name={FIELD_NAMES.NAME} placeholder="Name"/>
          <input type="text" className="login__input" name={FIELD_NAMES.ROOM} placeholder="Room"/>
        </div>
        <button type="submit" className="login__button">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
