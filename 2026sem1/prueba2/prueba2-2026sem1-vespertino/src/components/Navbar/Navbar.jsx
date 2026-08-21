import React from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from '../ProgressBar/ProgressBar';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.brand}>
        🗂️ Trello App
      </Link>
      <div className={styles.center}>
        <ProgressBar />
      </div>
      <Link to="/tasks/new" className={styles.newTaskBtn}>
        + Nueva Tarea
      </Link>
    </nav>
  );
}

export default Navbar;
