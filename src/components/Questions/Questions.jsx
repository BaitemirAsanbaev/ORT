// Questions.js

import React, { useEffect, useState } from 'react';
import { getTestQuestions } from '../../services/TestService';
import styles from './Questions.module.scss';
import Question from './Question';

export default function Questions({ id, onAnswerSelect }) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await getTestQuestions(id);
        setQuestions(res);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    }
    fetchQuestions();
  }, [id]);

  return (
    <div className={styles.questionsContainer}>
      {questions.map((item, index) => (
        <div key={index}>
          <Question data={item} onAnswerSelect={onAnswerSelect} />
        </div>
      ))}
    </div>
  );
}
