import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss'; // Import the SCSS module
import logo from '../../assets/logo.png'

const Navbar = () => {
  // Assume you have a function to check if the user is authenticated

  // Links to be displayed when the user is authenticated
  const links = [
    { label: 'Home', path: '/' },
    { label: 'My Results', path: '/my-results' },
    { label: 'Rating', path: '/rating' },
    { label: 'Profile', path: '/profile' },
  ];

  // Links to be displayed when the user is not authenticated
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
      </div>
      <ul className={styles.navLinks}>
          {links.map((link, index) => (
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
