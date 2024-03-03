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
      <h2>My Results</h2>
      {results.length > 0 ? (
        <ul>
          {results.map((result, index) => (
            <li key={index} className={styles.resultItem}>
              <h3 className={styles.resultTitle}>Test ID: {result.test}</h3>
              <p className={styles.resultInfo}>Test Name: {result.test_name}</p>
              <p className={styles.resultInfo}>Right Answers: {result.right_answers}</p>
              <p className={styles.resultInfo}>Total Questions: {result.questions}</p>
              <p className={styles.resultInfo}>Percentage: {result.percentage}</p>
              <p className={styles.resultInfo}>User ID: {result.user}</p>
              <p className={styles.resultInfo}>User Name: {result.user_name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noResults}>No results available.</p>
      )}
    </div>
  );
}
