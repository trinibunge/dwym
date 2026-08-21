import React from 'react';
import styles from './ProgressBar.module.css';

function ProgressBar() {
  const tasks = []
  // TODO: Obtener las tareas del contexto para ejercicio 6
  const total = tasks.length;
  const done = tasks.filter((t) => t.status === 'Done').length;
  const percentage = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className={styles.container}>
      <span className={styles.label}>
        Progreso del proyecto: {done}/{total} tareas completadas ({percentage}%)
      </span>
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
