import React, { useState } from "react";
import Video from "../Videos/Video";
import styles from "./VideoTest.module.scss";
import { submitTest } from "../../services/TestService";

const VideoTest = ({ videoData, onSubmit }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [markedAsWatched, setMarkedAsWatched] = useState(false);

  console.log(videoData);

  const handleAnswerClick = (questionId, answerId) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answerId,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let rightAnswers = 0;
    for (const question of videoData.test.questions) {
      const selectedAnswerId = selectedAnswers[question.id];
      const correctAnswer = question.answers.find((answer) => answer.correct);
      console.log(question);
      if (selectedAnswerId === correctAnswer.id) {
        rightAnswers++;
      }
    }
    console.log(rightAnswers, videoData.test.id);
    submitTest({ right_answers: rightAnswers, test: videoData.test.id });
    onSubmit();
    setSelectedAnswers({});

    setMarkedAsWatched(false);
  };

  return (
    <div className={styles.videoTestContainer}>
      <h2>{videoData.video.title}</h2>
      <Video
        data={videoData.video}
        markedAsWatched={markedAsWatched}
        setMarkedAsWatched={setMarkedAsWatched}
      />
      {markedAsWatched ? (
        <>
          <h3 className={styles.testTitle}>{videoData.test.title}</h3>
          <p className={styles.testDescription}>{videoData.test.description}</p>
          <form onSubmit={(e) => handleSubmit(e)}>
            {videoData.test.questions.map((question) => (
              <div key={question.id} className={styles.questionContainer}>
                <b className={styles.questionTitle}>{question.title}</b>
                <img className={styles.questionPhoto} src={question.photo} width={200} alt={question.title}/>
                <ul className={styles.answerList}>
                  {question.answers.map((answer) => (
                    <li
                      key={answer.id}
                      className={`${styles.answerItem} ${
                        selectedAnswers[question.id] === answer.id
                          ? styles.selectedAnswer
                          : ""
                      }`}
                      onClick={() => handleAnswerClick(question.id, answer.id)}
                    >
                      {answer.title}
                      
                <img className={styles.answerPhoto} src={answer.photo} width={200} alt="image not available"/>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </form>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default VideoTest;
