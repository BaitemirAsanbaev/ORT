import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const role = localStorage.getItem('role');
  const isStudent = role === 'Студент';

  const studentLinks = [
    { label: 'Home', path: '/' },
    { label: 'My Results', path: '/my-results' },
    { label: 'Rating', path: '/rating' },
    { label: 'Profile', path: '/profile' }
  ];

  const teacherLinks = [
    { label: 'Home', path: '/' },
    { label: 'Rating', path: '/rating' },
    { label: 'Create test', path: '/create-test' }
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
