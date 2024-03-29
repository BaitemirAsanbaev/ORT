import React, { useEffect, useState } from 'react';
import { getQuestionAnswers } from '../../services/TestService';
import styles from './Question.module.scss';

export default function Question({ data, onAnswerSelect }) {
  const [answers, setAnswers] = useState([]);
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);

  useEffect(() => {
    async function fetchAnswers() {
      try {
        const res = await getQuestionAnswers(data.id);
        setAnswers(res);
      } catch (error) {
        console.error('Error fetching answers:', error);
      }
    }
    fetchAnswers();
  }, [data.id]);

  const handleAnswerClick = (answerId, isCorrect) => {
    if (selectedAnswerId === answerId) {
      return;
    }

    setSelectedAnswerId(answerId);
    onAnswerSelect(isCorrect);
  };

  return (
    <div className={styles.questionContainer}>
      <div className={styles.questionTitle}>{data.title}</div>
      {answers.map((item) => (
        <div
          key={item.id}
          className={`${styles.answer} ${selectedAnswerId === item.id ? styles.selected : ''}`}
          onClick={() => handleAnswerClick(item.id, item.correct)}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
}
