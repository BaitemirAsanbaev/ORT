// Courses.js

import React, { useEffect, useState } from "react";
import { getAllCourses } from "../../services/requests";
import styles from "./Courses.module.scss";
import bg from '../../assets/bg.png'
import { Link } from "react-router-dom";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await getAllCourses();
        setCourses(res);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
    fetchCourses();
  }, []);

  return (
    <>\
    <h2>Courses</h2>
    <div className={styles.list}>
      {courses.map((item) => (
        <Link to={`/course/${item.id}`} key={item.id} className={styles.course} style={{backgroundImage:`url(${bg})`}}>
          <h1 className={styles.courseTitle}>{item.title}</h1>
          <p className={styles.courseDescription}>{item.description.slice(0, 100)}</p>
        </Link>
      ))}
    </div>
    </>
  );
}
