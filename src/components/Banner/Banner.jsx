// Banner.js

import React from 'react';
import styles from './Banner.module.scss'; // Import your module SCSS styles

const Banner = () => {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerContent}>
        <p>Друзья! Представляем Вашему вниманию портал KMF Isker hanymy – платформу</p>
        <p>для получения актуальной и полезной информации для Вас и Вашего бизнеса</p>
      </div>
    </div>
  );
};

export default Banner;
