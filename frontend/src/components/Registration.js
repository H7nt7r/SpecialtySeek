import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../blocks/registration/css/registration.css';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
    if (name === 'name') setName(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword || !name) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      await axios.post('http://localhost:3001/auth/register', { email, password, name });
      navigate('/');
    } catch (error) {
      setError('Ошибка регистрации');
    }
  };

  return (
    <div className="reg">
      <div className="container container-reg">
        <div className="reg__block">
          <div className="reg__title">Регистрация</div>
          <form onSubmit={handleSubmit} action="" className="reg__form">
            <label htmlFor="" className="reg__label">Введите E-mail:</label>
            <input name="email" onChange={handleInputChange} type="text" className="reg__input" placeholder="E-mail" />
            <label htmlFor="" className="reg__label">Введите пароль:</label>
            <input name="password" onChange={handleInputChange} type="password" className="reg__input" placeholder="Пароль" />
            <label htmlFor="" className="reg__label">Подтверждение пароля:</label>
            <input name="confirmPassword" onChange={handleInputChange} type="password" className="reg__input" placeholder="Подтверждение пароля" />
            <label htmlFor="" className="reg__label">Введите ФИО:</label>
            <input name="name" onChange={handleInputChange} type="text" className="reg__input" placeholder="ФИО" />
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="reg__button">Регистрация</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
