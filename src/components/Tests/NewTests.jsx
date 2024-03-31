import React, { useEffect, useState } from "react";
import { getVideos } from "../../services/requests";
import {
  getQuestionAnswers,
  getTestQuestions,
  getTests,
} from "../../services/TestService";
import { useNavigate, useParams } from "react-router-dom";
import VideoTest from "./VideoTest";
import VideoData from "./VideoData";
import axios from "axios";
import { api } from "../../consts/api";

export default function NewTests() {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("Loading...");

  const params = useParams();
  const navigate = useNavigate();

  async function fetchData() {
    try {
      const videosRes = await getVideos(params.id);
      const testsRes = await getTests(params.id);
      if (testsRes.length === 0) {
        if (role === "Студент") {
          setMessage("Вы прошли все тесты");
        } else {
          setMessage("Все тесты удалены");
        }
      }
      console.log(videosRes);
      const newData = [];

      for (const video of videosRes) {
        const videoData = { video, test: {}, index: newData.length };
        const test = testsRes.find((el) => el["id"] === video.test);
        const questionsRes = await getTestQuestions(test.id);

        const testWithQuestions = {
          ...test,
          questions: [],
        };

        for (const question of questionsRes) {
          const answersRes = await getQuestionAnswers(question.id);

          const questionWithAnswers = {
            ...question,
            answers: answersRes,
          };

          testWithQuestions.questions.push(questionWithAnswers);
        }

        videoData.test = testWithQuestions;

        newData.push(videoData);
      }

      setData(newData);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  const handleTestSubmit = () => {
    if (currentIndex === data.length - 1) {
      navigate("/my-results");
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const renderVideoTest = () => (
    <VideoTest
      key={currentIndex}
      videoData={data[currentIndex]}
      onSubmit={handleTestSubmit}
    />
  );

  const renderAllData = () => (
    <div>
      {data.map((videoData) => (
        <VideoData
          key={videoData.index}
          videoData={videoData}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );

  const handleEdit = (videoData) => {
    // Implement edit functionality here
    console.log("Edit video:", videoData);
  };

  const handleDelete = async (videoData) => {
    console.log(videoData);
    try {
      await axios.delete(api + "tests/" + videoData.test.id, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      await axios.delete(api + "videos/video/" + videoData.video.id, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Успешно удалено");
    } catch (e) {
      alert(e.response.data.message);
    }
    console.log("Delete video:", videoData);
  };

  return (
    <div>
      <>
        {data.length > 0 && currentIndex < data.length ? (
          <>{role === "Студент" ? renderVideoTest() : renderAllData()}</>
        ) : (
          <p style={{ position: "absolute", top: "40vh", left: "45vw" }}>
            {message}
          </p>
        )}
      </>
    </div>
  );
}
