import React, { useState, useEffect } from "react";
import { getAllResults } from "../../services/requests";
import styles from "./Rating.module.scss";

const Rating = () => {
  const [testResults, setTestResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");
  const [selectedTestName, setSelectedTestName] = useState("");

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
    // Filter by test name
    const filtered = testResults.filter(
      (result) =>
        selectedTestName === "" || result.test_name === selectedTestName
    );

    // Apply sorting by percentage
    const sorted = [...filtered].sort((a, b) => {
      if (sortOrder === "default") return 0;

      const percentageA = parseInt(a.percentage);
      const percentageB = parseInt(b.percentage);

      return sortOrder === "desc"
        ? percentageB - percentageA
        : percentageA - percentageB;
    });

    setFilteredResults(sorted);
  }, [sortOrder, testResults, selectedTestName]);

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleTestNameChange = (e) => {
    setSelectedTestName(e.target.value);
  };

  return (
    <div className={styles.ratingContainer}>
      <h2>Результаты теста</h2>
      <div className={styles.controls}>
        {/* Sort Order Dropdown */}
        <select value={sortOrder} onChange={handleSortOrderChange}>
          <option value="default">По умолчанию</option>
          <option value="asc">Наименьшие</option>
          <option value="desc">Наибольшие</option>
        </select>

        <select value={selectedTestName} onChange={handleTestNameChange}>
          <option value="">Все тесты</option>
          {testResults
            .filter(
              (result, index, self) =>
                self.findIndex((t) => t.test_name === result.test_name) ===
                index
            ) // Remove duplicates
            .map((result) => (
              <option key={result.test_name} value={result.test_name}>
                {result.test_name}
              </option>
            ))}
        </select>
      </div>

      {filteredResults ? (
        filteredResults.length > 0 ? (
          <div className={styles.tableContainer}>
            <table>
              <thead>
                <tr>
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
          <p className={styles.noResults}>Нет доступных результатов теста</p>
        )
      ) : (
        <p className={styles.loading}>Загрузка...</p>
      )}
    </div>
  );
};

export default Rating;
