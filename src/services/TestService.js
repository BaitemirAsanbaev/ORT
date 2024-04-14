import axios from "axios";
import { api } from "../consts/api";

export const getTests = async (id) => {
  try {
    const res = await axios.get(api + "courses/" + id + "/test/all", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const createTest = async (test, questions, video) => {
  let questionsCounter = 0;
  try {
    const testRes = await axios.post(api + "tests/create", test, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const formData = new FormData();
    const videoObj = {
      ...video,
      test: testRes.data.id,
    };
    for (var key in videoObj) {
      formData.append(key, videoObj[key]);
    }
    console.log(formData.entries);
    try {
      const res = await axios.post(api + "videos/video/create", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
    questions.forEach((question) => {
      console.log(question);
      const questionData = new FormData();
      questionData.append("test", testRes.data.id);
      questionData.append("title", question.question);
      questionData.append("photo", question.photo);
      console.log(questionData);
      async function createQuestion() {
        const questionRes = await axios.post(
          api + "questions/create",
          questionData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(questionRes);
        if(questionRes.status === 201){
          questionsCounter++
        }
        question.answers.forEach((answer) => {
          console.log(answer);
          const answerData = new FormData();
          answerData.append("title", answer.answer);
          answerData.append("correct", answer?.correct);
          answerData.append("question", questionRes.data.id);
          answerData.append("photo", answer.photo);
          console.log(questionData);
          async function createAnswer() {
            const answerRes = await axios.post(
              api + "questions/answer/create",
              answerData,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            console.log(answerRes);
            
          }
          createAnswer();
        });
      }

      createQuestion();
    });

    console.log(testRes.data);
  } catch (e) {
    return "error"
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
    return e;
  }
};
