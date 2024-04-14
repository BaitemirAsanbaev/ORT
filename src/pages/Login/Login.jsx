import { login } from '../../services/requests';
import classes from './Login.module.scss'
import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login({email, password})
    console.log('Email:', email);
    console.log('Password:', password);
    // You can implement authentication logic here
  };

  return (
    <div className={classes.Login}>
      <h2>Добро пожаловать</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Почта:
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </label>
        <br />
        <label>
          Пароль:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </label>
        <br />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default Login;
