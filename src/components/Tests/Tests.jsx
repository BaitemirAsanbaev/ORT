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
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isQuestionsAnswered, setIsQuestionsAnswered] = useState(false);

  useEffect(() => {
    async function fetchTests() {
      try {
        const res = await getTests(params.id);
        setIsLoading(false);
        if (res.length === 0) {
          setTests([{ message: "Вы прошли все тесты" }]);
          setIsResultsButtonDisabled(false); // Enable "View Results" button
        } else {
          setTests(res || []);
        }
      } catch (error) {
        console.error("Error fetching tests:", error);
        setIsLoading(false);
      }
    }
    fetchTests();
  }, [params.id]);

  const handleNextClick = () => {
    setIsSubmitted(false);
    setIsQuestionsAnswered(false);
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
      {isLoading ? (
        <>
          <p>Loading...</p>
          <Link to={"/"}>Вернуться</Link>
        </>
      ) : tests.length > 0 && currentTestIndex < tests.length ? (
        <div>
          {tests[0].message ? (
            <div>{tests[0].message}</div>
          ) : (
            <Test
              data={tests[currentTestIndex]}
              onSubmission={handleNextClick}
              isSubmitted={isSubmitted}
              setIsSubmitted={setIsSubmitted}
              isQuestionsAnswered={isQuestionsAnswered}
              setIsQuestionsAnswered={setIsQuestionsAnswered}
            />
          )}
        </div>
      ) : (
        <>
          <p>Вы прошли все тесты</p>
          <Link to={"/"}>Вернуться</Link>
        </>
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
