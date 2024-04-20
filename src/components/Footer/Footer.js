import React from 'react'
import styles from './Footer.module.scss'
import tg from '../../assets/tg.png'
import ig from '../../assets/ig.png'
export default function Footer() {
  return (
    <div className={styles.Footer}>
        <a href='tel:+996999665709'>+996 700 819 918</a>
        <a href='mailto:eduon.llc@gmail.com'>eduon.llc@gmail.com</a>
        <a href='https://go.2gis.com/zac0j'>Location: Bishkek 12А</a>
        <a href='https://www.instagram.com/'><img width={50} src={ig} alt='instagram'/></a>
        <a href='https://t.me/ortga_tuura_daiardanuu'><img width={50} src={tg} alt='telegram'/></a>
    </div>
  )
}
