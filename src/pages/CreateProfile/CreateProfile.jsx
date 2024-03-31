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
    gender: '',
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
      console.error(error);
      // Handle registration failure
    }
  };

  return (
    <div className={styles['create-profile-container']}>
      <h2>Создать профиль</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Язык:</label>
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            required
          >
            <option value="">Выберите язык</option>
            <option value="Кыргызский">Кыргызский</option>
            <option value="Русский">Русский</option>
            <option value="Английский">Английский</option>
          </select>
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
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Выберите пол</option>
            <option value="Мужской">Мужской</option>
            <option value="Женский">Женский</option>
          </select>
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
