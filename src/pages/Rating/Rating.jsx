// Rating.js

import React, { useState, useEffect } from "react";
import { getAllResults } from "../../services/requests";
import styles from "./Rating.module.scss";

const Rating = () => {
  const [testResults, setTestResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");
  const [filterTestName, setFilterTestName] = useState(" ");

  useEffect(() => {
    async function fetchTestResults() {
      try {
        const res = await getAllResults();
        setTestResults(res);
        setFilteredResults(res);
      } catch (error) {
        console.error("Error fetching test results:", error);
      }
    }

    fetchTestResults();
  }, []);

  useEffect(() => {
    // Apply sorting by percentage
    const sorted = [...filteredResults].sort((a, b) => {
      if (sortOrder === "default") return filteredResults;

      const percentageA = parseInt(a.percentage);
      const percentageB = parseInt(b.percentage);

      return sortOrder === "desc" ? percentageB - percentageA : percentageA - percentageB;
    });

    // Use the functional form of setFilteredResults
    setFilteredResults(sorted);
  }, [sortOrder]); 

  const handleTestNameFilter = (e) => {
    setFilterTestName(e.target.value);
    filterResults(e.target.value);
  };
  const filterResults = (testName) => {
    const filtered = testResults.filter((result) =>
      result.test_name.toLowerCase().includes(testName.toLowerCase())
    );
    setFilteredResults(filtered);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className={styles.ratingContainer}>
      <h2>Test Results</h2>
      <div className={styles.controls}>
        <label>
          Sort by Percentage:
          <select value={sortOrder} onChange={handleSortOrderChange}>
            <option value="default">Default</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
        <label>
          Filter by Test Name:
          <input
            type="text"
            value={filterTestName}
            onChange={handleTestNameFilter}
          />
        </label>
      </div>
      {filteredResults.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Test ID</th>
              <th>Test Name</th>
              <th>Right Answers</th>
              <th>Total Questions</th>
              <th>Percentage</th>
              <th>User Name</th>
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
      ) : (
        <p className={styles.noResults}>No test results available.</p>
      )}
    </div>
  );
};

export default Rating;
