import React from 'react';

const FIELD_NAMES = {
  NAME: 'name',
  ROOM: 'room'
};

const Login = () => {
  const login = event => {
    event.preventDefault();

    const name = event.target[FIELD_NAMES.NAME].value;
    const room = event.target[FIELD_NAMES.ROOM].value;

    // eslint-disable-next-line no-console
    console.log({ name, room });
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
