import React, { useState } from "react";
import { createCourse } from "../../services/requests";
import styles from './CreateCourse.module.scss'
export default function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit() {
    try {
      const res = await createCourse(title, description);
      console.log(res);
      // Optionally, you can clear the input fields after submission
      setTitle("");
      setDescription("");
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
