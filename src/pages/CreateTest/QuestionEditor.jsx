import React from "react";

const QuestionEditor = ({ questions, setQuestions }) => {
  const handleQuestionChange = (index, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (questionIndex, answerIndex, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers[answerIndex].answer = event.target.value;
    setQuestions(updatedQuestions);
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
    if (questionIndex.answers.length > 4) {
      const updatedQuestions = [...questions];
      updatedQuestions[questionIndex].answers.splice(answerIndex, 1);
      setQuestions(updatedQuestions);
    }
  };

  const setCorrectAnswer = (questionIndex, answerIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers.forEach((answer, i) => {
      answer.isCorrect = i === answerIndex;
    });
    setQuestions(updatedQuestions);
  };

  return (
    <div>
      <h2>Questions</h2>
      {questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <label htmlFor={`question-${questionIndex}`}>Question:</label>
          <input
            type="text"
            id={`question-${questionIndex}`}
            value={question.question}
            onChange={(e) => handleQuestionChange(questionIndex, e)}
            required
          />
          {question.answers.map((answer, answerIndex) => (
            <div key={`${questionIndex}-${answerIndex}`}>
              <input
                type="radio"
                id={`answer-${questionIndex}-${answerIndex}`}
                name={`question-${questionIndex}-answer`}
                // Set checked attribute based on the isCorrect flag
                checked={answer.isCorrect}
                onChange={() => setCorrectAnswer(questionIndex, answerIndex)}
              />
              <label htmlFor={`answer-${questionIndex}-${answerIndex}`}>
                Answer {answerIndex + 1}:
              </label>
              <input
                type="text"
                id={`answer-${questionIndex}-${answerIndex}-text`}
                value={answer.answer}
                onChange={(e) => handleAnswerChange(questionIndex, answerIndex, e)}
                required
              />
              {answerIndex + 1 < question.answers.length && (
                <button type="button" onClick={() => removeAnswerOption(questionIndex, answerIndex)}>
                  Remove Option
                </button>
              )}
            </div>
          ))}
          {question.answers.length < 6 && (
            <button type="button" onClick={() => addAnswerOption(questionIndex)}>
              Add Answer Option
            </button>
          )}
          <button type="button" onClick={() => removeQuestion(questionIndex)}>
            Remove Question
          </button>
        </div>
      ))}
      <button type="button" onClick={addQuestion}>
        Add Question
      </button>
    </div>
  );
};

export default QuestionEditor;
