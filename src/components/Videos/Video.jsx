import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Videos.module.scss";
import { markVideo } from "../../services/requests";

export default function Video({ data }) {
  const [watchedPercentage, setWatchedPercentage] = useState(0);
  const [markedAsWatched, setMarkedAsWatched] = useState(false);
  const videoRef = useRef(null);

  const markAsWatched = useCallback(async () => {
    try {
      await markVideo(data.id);
      setMarkedAsWatched(true);
    } catch (error) {
      console.error("Error", error);
    }
  }, [data.id]);

  useEffect(() => {
    const video = videoRef.current;

    const updateWatchedPercentage = () => {
      const percentage = (video.currentTime / video.duration) * 100;
      setWatchedPercentage(percentage);
    };

    video.addEventListener("timeupdate", updateWatchedPercentage);

    return () => {
      video.removeEventListener("timeupdate", updateWatchedPercentage);
    };
  }, []);

  useEffect(() => {
    if (watchedPercentage >= 5 && !markedAsWatched) {
      markAsWatched();
    }
  }, [watchedPercentage, markedAsWatched, markAsWatched]);

  return (
    <div>
      <div className={styles.videoInfo}>
        <h3 className={styles.videoTitle}>
          {data.course_name} - {data.title}
        </h3>
        <p className={styles.videoDescription}>{data.description}</p>
      </div>
      <video
        className={styles.video}
        width="640"
        height="360"
        controls
        ref={videoRef}
      >
        <source src={`${data.video}`} type="video/mp4" />
      </video>
    </div>
  );
}
