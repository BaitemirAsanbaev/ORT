// Slider.js

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getNews } from "../../services/requests";
import styles from "./Slider.module.scss";

const NewsSlider = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function fetchNews() {
      const res = await getNews();
      setNews(res.slice(0, 10));
    }
    fetchNews();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Display three slides per view
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  console.log(news);
  return (
    <div className={styles.sliderContainer}>
      <h2>Latest News</h2>
      <Slider {...settings}>
        {news.map((article, index) => (
          <div key={index} className={styles.sliderItem}>
            <img src={article.image} alt={article.title} />
            <div className={styles.caption}>
              <h3>{article.title}</h3>
              <p>{article.description.slice(0,100)}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewsSlider;
