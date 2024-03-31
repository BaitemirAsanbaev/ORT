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
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Course Title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Course Description"
      ></textarea>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
