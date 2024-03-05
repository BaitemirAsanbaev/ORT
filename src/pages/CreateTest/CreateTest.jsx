import React, { useState, useEffect } from "react";
import { getAllCourses } from "../../services/requests";
import { createTest } from "../../services/TestService";
import styles from "./CreateTest.module.scss";

export default function CreateTest() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await getAllCourses();
        setCourses(res);
      } catch (e) {
        console.log(e);
      }
    }
    fetchCourses();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form data
    if (title.length < 1 || title.length > 100) {
      // Handle title length validation error
      return;
    }
    if (description.length < 1) {
      // Handle description length validation error
      return;
    }
    if (!courseId) {
      // Handle missing course selection error
      return;
    }

    try {
      await createTest({ title, description, course: courseId });
      // Handle successful test creation (e.g., redirect)
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.createTest}>
      <h2>Create Test</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title*:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
          required
        />
        <label htmlFor="description">Description*:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label htmlFor="course">Course*:</label>
        <select
          id="course"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          required
        >
          <option value="">Select a course</option>

          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
        <button type="submit">Create Test</button>
      </form>
    </div>
  );
}
