// Questions.js

import React, { useEffect, useState } from 'react';
import { getTestQuestions } from '../../services/TestService';
import styles from './Questions.module.scss';
import Question from './Question';

export default function Questions({ id, onAnswerSelect, handleSubmit, setTotalQuestions, isQuestionsAnswered }) {
  const [questions, setQuestions] = useState([]);

  
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await getTestQuestions(id);
        setQuestions(res);
        setTotalQuestions(res.length)
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    }
    fetchQuestions();
  }, [id, setTotalQuestions]);

  return (
    <div className={styles.questionsContainer}>
      {questions.map((item, index) => (
        <div key={index}>
          <Question data={item} onAnswerSelect={onAnswerSelect} />
        </div>
      ))}
      <button style={isQuestionsAnswered?{display:"block"}:{display:"none"}} onClick={handleSubmit}>Submit</button>
    </div>
  );
}
