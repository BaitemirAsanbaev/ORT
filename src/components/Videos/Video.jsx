import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Video.module.scss";
import { markVideo } from "../../services/requests";

export default function Video({ data, markedAsWatched, setMarkedAsWatched }) {
  const [watchedPercentage, setWatchedPercentage] = useState(0);
  const videoRef = useRef(null);

  const markAsWatched = useCallback(async () => {
    try {
      await markVideo(data.id);
      setMarkedAsWatched(true);
      console.log("watched");
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

    // Disable right-click context menu
    video.addEventListener("contextmenu", handleContextMenu);

    return () => {
      video.removeEventListener("timeupdate", updateWatchedPercentage);
      video.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  useEffect(() => {
    if (watchedPercentage >= 5 && !markedAsWatched) {
      markAsWatched();
    }
  }, [watchedPercentage, markedAsWatched, markAsWatched]);

  const handleContextMenu = (event) => {
    event.preventDefault();
  };

  return (
    <div className={styles.videoCont}>
      <div className={styles.videoInfo}>
        <h3 className={styles.videoTitle}>
          {data.course_name} - {data.title}
        </h3>
        <p className={styles.videoDescription}>{data.description}</p>
      </div>
      <video
        className={styles.video}
        width="440"
        controls
        ref={videoRef}
      >
        <source src={`${data.video}`} type="video/mp4" />
      </video>
    </div>
  );
}
