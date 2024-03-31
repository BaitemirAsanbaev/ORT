import axios from "axios";
import { api } from "../consts/api";

export const login = async ({ email, password }) => {
  try {
    console.log(email, password);
    const res = await axios.post(api + "users/login", { email, password });
    localStorage.setItem("token", res.data.access_token);
    localStorage.setItem("firstname", res.data.firstname);
    localStorage.setItem("lastname", res.data.lastname);
    localStorage.setItem("email", res.data.email);
    localStorage.setItem("role", res.data.role);
    console.log(res.data);
    if (res.data.access_token) {
      window.location = "/";
    }
  } catch (e) {
    alert(e.response.data.message);
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

export const createCourse = async (title, description) => {
  try {
    const res = await axios.post(
      api + "courses/create",

      { title, description },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
      
    );
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


export const markVideo = async (id) => {
  try {
    const res = await axios.post(api + "videos/add-user/"+id, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

