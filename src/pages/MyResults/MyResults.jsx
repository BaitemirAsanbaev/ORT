// MyResults.js

import React, { useEffect, useState } from 'react';
import { getMyResults } from '../../services/requests';
import styles from './MyResults.module.scss';

export default function MyResults() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchResults() {
      try {
        const res = await getMyResults();
        setResults(res);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    }
    fetchResults();
  }, []);

  console.log(results);

  return (
    <div className={styles.resultsContainer}>
      <h2>Мои результаты</h2>
      {results.length > 0 ? (
        <ul>
          {results.map((result, index) => (
            <li key={index} className={styles.resultItem}>
              <h3 className={styles.resultInfo}>{result.test_name}</h3>
              <p className={styles.resultInfo}>Верные ответы: {result.right_answers} / {result.questions}</p>
              <p className={styles.resultInfo}>Правильность: {result.percentage}%</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noResults}>Нет доступных результатов</p>
      )}
    </div>
  );
}
