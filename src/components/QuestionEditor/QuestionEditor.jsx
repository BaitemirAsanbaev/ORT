import React from "react";
import styles from "./QuestionEditor.module.scss";

const QuestionEditor = ({ questions, setQuestions }) => {
  const handleQuestionChange = (index, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (questionIndex, answerIndex, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers[answerIndex].answer =
      event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerPhotoChange = (questionIndex, answerIndex, event) => {
    const updatedQuestions = [...questions];
    if (
      updatedQuestions[questionIndex] &&
      updatedQuestions[questionIndex].answers &&
      updatedQuestions[questionIndex].answers[answerIndex]
    ) {
      updatedQuestions[questionIndex].answers[answerIndex].photo =
        event.target.files[0];
      console.log(updatedQuestions);
      setQuestions(updatedQuestions);
    }
  };
  const handleQuestionPhotoChange = (questionIndex, event) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[questionIndex]) {
      updatedQuestions[questionIndex].photo = event.target.files[0];
      console.log(updatedQuestions);
      setQuestions(updatedQuestions);
    }
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: "", answers: [{ answer: "" }] }]);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const addAnswerOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[questionIndex].answers.length < 6) {
      updatedQuestions[questionIndex].answers.push({ answer: "" });
    }
    setQuestions(updatedQuestions);
  };

  const removeAnswerOption = (questionIndex, answerIndex) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[questionIndex].answers.length > 1) {
      updatedQuestions[questionIndex].answers.splice(answerIndex, 1);
      setQuestions(updatedQuestions);
    }
  };

  const setCorrectAnswer = (questionIndex, answerIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers.forEach((answer, i) => {
      answer.correct = i === answerIndex;
    });
    setQuestions(updatedQuestions);
  };

  return (
    <form encType="multipart/form-data" className={styles.QuestionEditor}>
      {questions.length > 0 ? <h2>Вопросы</h2> : <></>}
      {questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <label htmlFor={`question-${questionIndex}`}>Вопрос:</label>
          <input
            placeholder="Напишите вопрос"
            type="text"
            id={`question-${questionIndex}`}
            value={question.question}
            onChange={(e) => handleQuestionChange(questionIndex, e)}
            required
          />
          <input
            type="file"
            id={`photo-${questionIndex}`}
            accept=".jpg, .jpeg, .png"
            onChange={(e) => handleQuestionPhotoChange(questionIndex, e)}
          />

          {question.answers.map((answer, answerIndex) => (
            <div key={`${questionIndex}-${answerIndex}`}>
              <input
                type="radio"
                id={`answer-${questionIndex}-${answerIndex}`}
                name={`question-${questionIndex}-answer`}
                checked={answer.correct}
                onChange={() => setCorrectAnswer(questionIndex, answerIndex)}
              />
              <label htmlFor={`answer-${questionIndex}-${answerIndex}`}>
                Ответ {answerIndex + 1}:
              </label>
              <input
                placeholder="Напишите вариант ответа"
                type="text"
                id={`answer-${questionIndex}-${answerIndex}-text`}
                value={answer.answer}
                onChange={(e) =>
                  handleAnswerChange(questionIndex, answerIndex, e)
                }
                required
              />
              <input
                type="file"
                id={`answer-${questionIndex}-${answerIndex}-photo`}
                accept=".jpg, .jpeg, .png"
                onChange={(e) =>
                  handleAnswerPhotoChange(questionIndex, answerIndex, e)
                }
              />

              {answerIndex + 1 < question.answers.length && (
                <button
                  type="button"
                  onClick={() => removeAnswerOption(questionIndex, answerIndex)}
                >
                  Удалить вариант
                </button>
              )}
            </div>
          ))}
          {question.answers.length < 6 && (
            <button
              type="button"
              onClick={() => addAnswerOption(questionIndex)}
            >
              Добавить вариант
            </button>
          )}
          <button
            type="button"
            className={styles.removeBtn}
            onClick={() => removeQuestion(questionIndex)}
          >
            Удалить вопрос
          </button>
        </div>
      ))}
      <button type="button" onClick={addQuestion}>
        Добавить вопрос
      </button>
    </form>
  );
};

export default QuestionEditor;
