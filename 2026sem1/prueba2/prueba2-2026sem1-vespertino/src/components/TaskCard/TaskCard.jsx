import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TaskCard.module.css';

const STATUS_COLORS = {
  'To Do': '#dbeafe',
  'In Progress': '#fef9c3',
  'Done': '#dcfce7',
};

const STATUS_OPTIONS = ['To Do', 'In Progress', 'Done'];

function TaskCard({ task, onStatusChange, onDelete }) {
  function handleStatusChange(e) {
    const newStatus = e.target.value;
    if (newStatus !== 'To Do' && !task.assignee) {
      alert('No se puede cambiar el estado sin una persona asignada.');
      e.target.value = task.status;
      return;
    }
    onStatusChange(task.id, newStatus);
  }

  return (
    <div
      className={styles.card}
      style={{ borderLeft: `4px solid ${STATUS_COLORS[task.status] || '#e2e8f0'}` }}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>{task.title}</h3>
        <div className={styles.actions}>
          <Link to={`/tasks/${task.id}/edit`} className={styles.editBtn}>
            ✏️
          </Link>
          <button className={styles.deleteBtn} onClick={() => onDelete(task.id)}>
            🗑️
          </button>
        </div>
      </div>
      <p className={styles.description}>{task.description}</p>
      {task.assignee && (
        <span className={styles.assignee}>👤 {task.assignee}</span>
      )}
      <select
        className={styles.statusSelect}
        value={task.status}
        onChange={handleStatusChange}
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TaskCard;
