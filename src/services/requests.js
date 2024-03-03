import axios from "axios";
import { api } from "../consts/api";

export const login = async ({ email, password }) => {
  try {
    console.log(email, password);
    const res = await axios.post(api + "users/login", { email, password });
    localStorage.setItem("token", res.data.access_token);
    console.log(res.data);
  } catch (e) {
    console.log(e);
  }
};
export const getNews = async () => {
  try {
    const res = await axios.get(api + "news/all");
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export const getAllCourses = async () => {
  try {
    const res = await axios.get(api + "courses/all");
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getCourse = async (id) => {
  try {
    const res = await axios.get(api + "courses/" + id);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getVideos = async (id) => {
  try {
    const res = await axios.get(api + "courses/" + id + "/video/all");
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getTests = async (id) => {
  try {
    const res = await axios.get(api + "courses/" + id + "/test/all",
    {
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

export const getProfile = async () => {
  try {
    const res = await axios.get(api + "users/profile", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export const getAllResults = async () => {
  try {
    const res = await axios.get(api + "tests/all/result", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getMyResults = async () => {
  try {
    const res = await axios.get(api + "tests/getallbyuser/", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
