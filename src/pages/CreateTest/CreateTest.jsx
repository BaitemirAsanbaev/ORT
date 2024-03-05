import React, { useState, useEffect } from "react";
import { getAllCourses } from "../../services/requests";
import { createTest } from "../../services/TestService";

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

  const handleSubmit = (event) => {
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

    // Send test creation request to the server
    async function postTest(data) {
      try {
        const res = await createTest(data);
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    }
    postTest({ title, description, course: courseId });
  };

  return (
    <div>
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
