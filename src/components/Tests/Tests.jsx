// Test.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTests } from "../../services/requests";
import styles from "./Tests.module.scss";
import Test from "./Test";

export default function Tests() {
  const params = useParams();
  const [tests, setTests] = useState([]);

  useEffect(() => {
    async function fetchTests() {
      try {
        const res = await getTests(params.id);
        setTests(res||[]);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    }
    fetchTests();
  }, []);

  return (
    <div className={styles.testsContainer}>
      {tests.length >= 0?(tests.map((item, id) => (
        <Test key={id} data={item}/>
      )))
    :
    <p>Вы прошли все тесты</p>}
    </div>
  );
}
