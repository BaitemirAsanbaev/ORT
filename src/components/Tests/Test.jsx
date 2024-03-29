import React, { useState } from "react";
import Questions from "../Questions/Questions";
import styles from "./Tests.module.scss";
import { submitTest } from "../../services/TestService";

export default function Test({ data, onNext }) {
  const [rightAnswersCount, setRightAnswersCount] = useState(0);
  // const [isSubmitted, setIsSubmitted] = useState(false);

  // Function to handle answer selection
  const handleAnswerSelection = (isCorrect) => {
    if (isCorrect) {
      setRightAnswersCount((prevCount) => prevCount + 1);
    }
  };

  // Function to handle form submission
  const handleSubmit = () => {
    const requestData = {
      right_answers: rightAnswersCount,
      test: data.id,
    };
    submitTest(requestData);
    // setIsSubmitted(true);
    onNext(); // Move to the next test
  };

  return (
    <div>
      <h3 className={styles.testTitle}>
        {data.course_name} - {data.title}
      </h3>
      <p className={styles.testDescription}>{data.description}</p>
      
        <Questions
          id={data.id}
          onAnswerSelect={handleAnswerSelection}
          handleSubmit={handleSubmit}
        />
        </div>
  );
}
