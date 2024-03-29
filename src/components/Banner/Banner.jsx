// Banner.js

import React from 'react';
import styles from './Banner.module.scss'; // Import your module SCSS styles

const Banner = () => {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerContent}>
        <p>Друзья! Представляем Вашему вниманию портал EDUON Онлайн подготовка учеников</p>
        <p> 11-класса к Общереспубликанскому тестированию-ОРТ</p>
      </div>
    </div>
  );
};

export default Banner;
