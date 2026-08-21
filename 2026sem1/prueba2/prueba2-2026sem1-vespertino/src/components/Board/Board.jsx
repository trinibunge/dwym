import React from 'react';
import TaskCard from '../TaskCard/TaskCard';
import styles from './Board.module.css';

const COLUMNS = ['To Do', 'In Progress', 'Done'];

const COLUMN_COLORS = {
  'To Do': '#dbeafe',
  'In Progress': '#fef9c3',
  'Done': '#dcfce7',
};

  /*
    TODO:

    1. Recorrer las columnas utilizando .map()
    2. Filtrar las tareas según el estado correspondiente
    3. Renderizar las tareas en cada columna
    4. Mostrar un mensaje cuando una columna no tenga tareas

    BONUS:
    - Mostrar cantidad de tareas por columna
  */

function Board({ tasks, onStatusChange }) {
  return (
    <div className={styles.board}>
      {COLUMNS.map((status) => {
        const columnTasks = tasks.filter((t) => t.status === status);
        return (
          <div
            key={status}
            className={styles.column}
            style={{ backgroundColor: COLUMN_COLORS[status] }}
          >
            <div className={styles.columnHeader}>
              <h2 className={styles.columnTitle}>{status}</h2>
              <span className={styles.count}>{columnTasks.length}</span>
            </div>
            <div className={styles.cards}>
              {/* TODO: Renderizar las tareas en cada columna */}
              {/* TODO: Mostrar un mensaje cuando una columna no tenga tareas */}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Board