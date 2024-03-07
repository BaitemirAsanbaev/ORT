import axios from "axios";
import { api } from "../consts/api";

export const getTests = async (id) => {
  try {
    const res = await axios.get(api + "courses/" + id + "/test/all", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const createTest = async (test, questions) => {
  console.log(questions);
  try {
    const testRes = await axios.post(api + "tests/create", test, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    questions.forEach((question) => {
      async function createQuestion() {
        const questionRes = await axios.post(
          api + "questions/create",
          {
            title: question.question,
            test: testRes.data.id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(questionRes);
        question.answers.forEach((answer) => {
          async function createAnswer() {
            const answerRes = await axios.post(
              api + "questions/answer/create",
              {
                title: answer.answer,
                correct: answer?.correct,
                question: questionRes.data.id,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            console.log(answerRes);
            if(answerRes.status == 201                  ){
              window.location = "/"
            } 
          }
          createAnswer();
        });
      }

      createQuestion();
    });

    console.log(testRes.data);
    return "success";
  } catch (e) {
    console.log(e);
  }
};

export const getTestQuestions = async (id) => {
  try {
    const res = await axios.get(api + "tests/" + id + "/question/all");
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getQuestionAnswers = async (id) => {
  try {
    const res = await axios.get(api + "questions/" + id + "/answer/all");
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const submitTest = async ({ right_answers, test }) => {
  try {
    const res = await axios.post(
      api + "tests/submit",
      { right_answers, test },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
