// Tests.js

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTests } from "../../services/TestService";
import styles from "./Tests.module.scss";
import Test from "./Test";

export default function Tests() {
  const params = useParams();
  const [tests, setTests] = useState([]);
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [isResultsButtonDisabled, setIsResultsButtonDisabled] = useState(true);

  useEffect(() => {
    async function fetchTests() {
      try {
        const res = await getTests(params.id);
        setTests(res || []);
        setIsResultsButtonDisabled(res.length === 0); // Disable by default if there are no tests
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    }
    fetchTests();
  }, [params.id]);

  const handleNextClick = () => {
    if (currentTestIndex < tests.length - 1) {
      setCurrentTestIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsResultsButtonDisabled(false); // Enable "View Results" button on the last test
    }
  };

  const handlePrevClick = () => {
    if (currentTestIndex > 0) {
      setCurrentTestIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className={styles.testsContainer}>
      {tests.length > 0 && currentTestIndex < tests.length ? (
        <Test
          data={tests[currentTestIndex]}
          onSubmission={() => handleNextClick()}
        />
      ) : (
        <p>Вы прошли все тесты</p>
      )}
      <div className={styles.navigationButtons}>
        {currentTestIndex > 0 && (
          <button onClick={handlePrevClick}>Previous</button>
        )}
        {currentTestIndex < tests.length - 1 && (
          <button onClick={handleNextClick}>Next</button>
        )}
        {!isResultsButtonDisabled && (
          <button disabled={isResultsButtonDisabled}>
            <Link to={`/my-results`}>View Results</Link>
          </button>
        )}
      </div>
    </div>
  );
}
