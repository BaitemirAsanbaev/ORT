// CreateProfile.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CreateProfile.module.scss';
import axios from 'axios';
import { api } from '../../consts/api';

export default function CreateProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    language: '',
    _class: '',
    age: '',
    sex: '',
    phone: '',
    school: '',
    university: '',
    specialization: '',
    user: parseInt(localStorage.getItem("currentstudent"))
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(api+"users/profile/create",formData,{
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      alert('Профиль создан');
      navigate('/students'); // Navigate to '/students' page
      localStorage.removeItem("currentstudent")
    } catch (error) {
      console.error('Registration failed', error);
      // Handle registration failure
    }
  };

  return (
    <div className={styles['create-profile-container']}>
      <h2>Создать профиль</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Язык:</label>
          <input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Класс:</label>
          <input
            type="text"
            name="_class"
            value={formData._class}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Возраст:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Пол:</label>
          <input
            type="text"
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Телефон:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Школа:</label>
          <input
            type="text"
            name="school"
            value={formData.school}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Университет:</label>
          <input
            type="text"
            name="university"
            value={formData.university}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Специализация:</label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Создать</button>
      </form>
    </div>
  );
}
