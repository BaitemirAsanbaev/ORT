import React, { useState, useEffect } from "react";
import { getAllResults } from "../../services/requests";
import styles from "./Rating.module.scss";

const Rating = () => {
  const [testResults, setTestResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    async function fetchTestResults() {
      try {
        const res = await getAllResults();
        setTestResults(res);
      } catch (error) {
        console.error("Error fetching test results:", error);
      }
    }

    fetchTestResults();
  }, []);

  useEffect(() => {
    // Apply sorting by percentage
    const sorted = [...testResults].sort((a, b) => {
      if (sortOrder === "default") return testResults;

      const percentageA = parseInt(a.percentage);
      const percentageB = parseInt(b.percentage);

      return sortOrder === "desc" ? percentageB - percentageA : percentageA - percentageB;
    });

    setFilteredResults(sorted);
  }, [sortOrder, testResults, ]);

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className={styles.ratingContainer}>
      <h2>Результаты теста</h2>
      <div className={styles.controls}>
        {/* Sort Order Dropdown */}
        <select value={sortOrder} onChange={handleSortOrderChange}>
          <option value="default">Default</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      {filteredResults ? (
        filteredResults.length > 0 ? (
          <div className={styles.tableContainer}>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Название теста</th>
                  <th>Правильные ответы</th>
                  <th>Количество вопросов</th>
                  <th>Процент</th>
                  <th>Ученик</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((result) => (
                  <tr key={result.id}>
                    <td>{result.test}</td>
                    <td>{result.test_name}</td>
                    <td>{result.right_answers}</td>
                    <td>{result.questions}</td>
                    <td>{result.percentage}</td>
                    <td>{result.user_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className={styles.noResults}>No test results available.</p>
        )
      ) : (
        <p className={styles.loading}>Loading...</p>
      )}
    </div>
  );
};

export default Rating;
