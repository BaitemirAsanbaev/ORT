import axios from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../../consts/api";
import styles from "./Students.module.scss";

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const res = await axios.get(`${api}users/students`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudents(res.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    }

    fetchStudents();
  }, []);

  return (
    <div className={styles["students-container"]}>
      {students.map((student) => (
        <div key={student.id} className={styles["student-card"]}>
          <h3 className={styles["student-name"]}>
            {`${student.firstname} ${student.lastname}`}
          </h3>
          <div className={styles["student-info"]}>
            <p className={styles["student-info-item"]}>
              <span className={styles["student-info-label"]}>Email:</span>
              <span className={styles["student-info-value"]}>{student.email}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
