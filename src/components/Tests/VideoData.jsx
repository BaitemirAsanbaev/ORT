import React from "react";
import styles from "./VideoData.module.scss";
import Video from "../Videos/Video";

const VideoData = ({ videoData, onEdit, onDelete }) => {
  return (
    <div className={styles["video-data"]}>
      <h3>Video {videoData.index + 1}</h3>
      <Video data={videoData.video}/>
      <h3>Название: {videoData.test.title}</h3>
      <p>Описание: {videoData.test.description}</p>
      {/* Render questions and answers */}
      {videoData.test.questions.map((question, index) => (
        <div key={index}>
          <p>Вопрос № {index + 1}: {question.title}</p>
          <ul>
            {question.answers.map((answer, index) => (
              <li key={index}>{answer.correct&& "Верный"} ответ: {answer.title}</li>
            ))}
          </ul>
        </div>
      ))}
      {/* Add edit and delete buttons */}
      <button onClick={() => onEdit(videoData)}>Изменить</button>
      <button onClick={() => onDelete(videoData)}>Удалить</button>
    </div>
  );
};

export default VideoData;
