import React, { useState, useEffect } from "react";
import { getAllCourses } from "../../services/requests";
import { createTest } from "../../services/TestService";
import styles from "./CreateTest.module.scss";
import QuestionEditor from "../../components/QuestionEditor/QuestionEditor"; // Import the new component

export default function CreateTest() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courses, setCourses] = useState([]);
  const [video, setVideo] = useState(null);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [questions, setQuestions] = useState([]);

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

    // Validate form data (including questions)
    if (!validateTest()) {
      return;
    }
    try {
      await createTest(
        { title, description, course: courseId, questions },
        questions,
        { title: videoTitle, description: videoDescription, video, course:courseId }
      );
    } catch (e) {
      console.log(e);
    }
  };

  const validateTest = () => {
    // Add validation logic for title, description, courseId, and questions
    // ... your validation logic
    return true; // Replace with actual validation logic
  };

  return (
    <div className={styles.createTest}>
      <h2>Видео к тесту</h2>

      <form className={styles.video} encType="multipart/form-data">
        
        <label htmlFor="videoTitle">Заголовок видео:</label>
        <input
          type="text"
          id="videoTitle"
          value={videoTitle}
          onChange={(e) => setVideoTitle(e.target.value)}
          maxLength={100}
          required
        />
        <label htmlFor="video">Загрузите видео</label>
        <input
        id="video"
          type="file"
          accept=".mp4"
          onChange={(e) => setVideo(e.target.files[0])}
        />
        <label htmlFor="videoDescription">Описание видео:</label>
        <textarea
          id="videoDescription"
          value={videoDescription}
          onChange={(e) => setVideoDescription(e.target.value)}
          required
        />
      </form>
      <h2>Новый тест</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="title">Название:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
          required
        />
        <label htmlFor="description">Описание:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label htmlFor="course">Курс:</label>
        <select
          id="course"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          required
        >
          <option value="">Выберите курс</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
      </form>

      {/* Question and answer creation section */}
      <QuestionEditor questions={questions} setQuestions={setQuestions} />

      <button className={styles.createBtn} onClick={handleSubmit} type="submit">
        Создать Тест
      </button>
    </div>
  );
}
