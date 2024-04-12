import React, { useState } from "react";
import { createCourse } from "../../services/requests";
import styles from './CreateCourse.module.scss'
import { useNavigate } from "react-router-dom";
export default function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
const navigate = useNavigate()
  async function handleSubmit() {
    try {
      const res = await createCourse(title, description);
      console.log(res);
      setTitle("");
      setDescription("");
      navigate("/")
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className={styles.CreateCourse}>
      <h1>Создать курс</h1>
      <label htmlFor="coursetitle">Название курса</label>
      <input
      id="coursetitle"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Напишите название курса"
      />
      <label htmlFor="coursedes">Описание курса</label>
      <textarea
      id="coursedes"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Напишите описание курса"
      ></textarea>
      <button onClick={handleSubmit}>Создать</button>
    </div>
  );
}
