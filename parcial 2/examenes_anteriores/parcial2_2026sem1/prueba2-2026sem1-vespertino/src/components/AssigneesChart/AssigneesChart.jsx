import React from 'react';
import styles from './AssigneesChart.module.css';

function AssigneesChart() {
  // TODO: obtener las tareas del context para realizar ejercicio 6
  const tasks = []
  const doneTasks = tasks.filter((t) => t.status === 'Done' && t.assignee);

  const countByAssignee = doneTasks.reduce((acc, task) => {
    acc[task.assignee] = (acc[task.assignee] || 0) + 1;
    return acc;
  }, {});

  const entries = Object.entries(countByAssignee).sort((a, b) => b[1] - a[1]);
  const maxCount = entries.length > 0 ? entries[0][1] : 1;

  if (entries.length === 0) {
    return (
      <section className={styles.section}>
        <h2 className={styles.title}>Tareas completadas por persona</h2>
        <p className={styles.empty}>Aún no hay tareas completadas.</p>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Tareas completadas por persona</h2>
      <div className={styles.chart}>
        {entries.map(([assignee, count]) => (
          <div key={assignee} className={styles.row}>
            <span className={styles.name}>{assignee}</span>
            <div className={styles.barTrack}>
              <div
                className={styles.bar}
                style={{ width: `${(count / maxCount) * 100}%` }}
              />
            </div>
            <span className={styles.countLabel}>{count}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AssigneesChart;
