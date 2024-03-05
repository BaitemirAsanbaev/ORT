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

export const createTest = async (data) => {
  try {
    const res = await axios.post(api + "tests/create", data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    console.log(res.data);
    return res.data;
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
