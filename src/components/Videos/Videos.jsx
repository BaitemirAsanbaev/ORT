// Videos.js

import React, { useEffect, useState } from "react";
import { getVideos } from "../../services/requests";
import { useParams } from "react-router-dom";
import styles from "./Videos.module.scss";

export default function Videos() {
    const params = useParams();
    const [videos, setVideos] = useState([]);
  
    useEffect(() => {
      async function fetchVideos() {
        try {
          const res = await getVideos(params.id);
          setVideos(res);
        } catch (error) {
          console.error("Error fetching videos:", error);
        }
      }
      fetchVideos();
    }, []);
  
    return (
      <div className={styles.videoContainer}>
        {videos.map((item, id) => (
          <div key={id}>
            <div className={styles.videoInfo}>
              <h3 className={styles.videoTitle}>
                {item.course_name} - {item.title}
              </h3>
              <p className={styles.videoDescription}>{item.description}</p>
            </div>
            <video className={styles.video} width="640" height="360" controls>
              <source src={`${item.video}`} type="video/mp4"></source>
            </video>
          </div>
        ))}
      </div>
    );
}
