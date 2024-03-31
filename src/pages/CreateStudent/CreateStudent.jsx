// CreateStudent.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { api } from '../../consts/api';
import styles from './CreateStudent.module.scss'; // Import SCSS module

export default function CreateStudent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    patronymic: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const res = await axios.post(api+"users/register",formData)
       console.log(res.data);
       localStorage.setItem("currentstudent", res.data.id)
      alert('Аккаунт создан');
      navigate('/create-profile'); // Navigate to '/students' page
    } catch (error) {
      console.error('Registration failed', error);
      // Handle registration failure
    }
  };

  return (
    <div className={styles['create-student-container']}>
      <h2>Создать аккаунт для студента</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Имя:</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Фамилия:</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Отчество:</label>
          <input
            type="text"
            name="patronymic"
            value={formData.patronymic}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Создать</button>
      </form>
    </div>
  );
}
