import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const role = localStorage.getItem('role');
  const isStudent = role === 'Студент';

  const studentLinks = [
    { label: 'Главная', path: '/' },
    { label: 'Мои результаты', path: '/my-results' },
    { label: 'Рейтинг', path: '/rating' },
    { label: 'Профиль', path: '/profile' }
  ];

  const teacherLinks = [
    { label: 'Главная', path: '/' },
    { label: 'Рейтинг', path: '/rating' },
    { label: 'Создать тест', path: '/create-test' },
    { label: 'Создать курс', path: '/create-course' },
    { label: 'Профиль', path: '/profile' }
  ];

  const renderLinks = isStudent ? studentLinks : teacherLinks;

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
      </div>
      <ul className={styles.navLinks}>
        {renderLinks.map((link, index) => (
          <li key={index}>
            <NavLink to={link.path}>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
