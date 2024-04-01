// Videos.js

import React, { useEffect, useState } from "react";
import { getVideos } from "../../services/requests";
import { useParams } from "react-router-dom";
import styles from "./Videos.module.scss";
import Video from "./Video";

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
    }, [params.id]);
  
    return (
      <div className={styles.videoContainer}>
        {videos.map((item, id) => (
          <Video data={item} key={id}/>
        ))}
      </div>
    );
}
