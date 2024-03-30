import React, { useState } from "react";
import Questions from "../Questions/Questions";
import styles from "./Tests.module.scss";
import { submitTest } from "../../services/TestService";

export default function Test({ data, onNext }) {
  const [rightAnswersCount, setRightAnswersCount] = useState(0);
  // const [isSubmitted, setIsSubmitted] = useState(false);
  const [allowed, setAllowed] = useState("");
  // Function to handle answer selection
  const handleAnswerSelection = (isCorrect) => {
    if (isCorrect) {
      setRightAnswersCount((prevCount) => prevCount + 1);
    }
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    const requestData = {
      right_answers: rightAnswersCount,
      test: data.id,
    };
    const res = await submitTest(requestData);
    // console.log(res.response.status);
    // console.log(res.response.data.message);
    if (res?.response?.status === 400) {
      setAllowed(res.response.data.message);
    } else {
      onNext(); // Move to the next test
    }
    // setIsSubmitted(true);
  };

  return (
    <div>
      <h3 className={styles.testTitle}>
        {data.course_name} - {data.title}
      </h3>
      <p className={styles.testDescription}>{data.description}</p>
      <p className={styles.testDescription}>
        {allowed}
      </p>

      <Questions
        id={data.id}
        onAnswerSelect={handleAnswerSelection}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
