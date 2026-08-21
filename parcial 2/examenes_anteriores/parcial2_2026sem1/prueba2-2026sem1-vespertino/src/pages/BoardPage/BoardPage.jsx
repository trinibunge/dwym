// BoardPage.jsx

import React, { useState, useEffect } from 'react';
import Board from '../../components/Board/Board';
import AssigneesChart from '../../components/AssigneesChart/AssigneesChart';
import {
  getTasks,
  updateTask,
  deleteTask,
} from '../../services/taskService';

import styles from './BoardPage.module.css';

function BoardPage({ tasks, setTasks }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /*
    TODO:

    1. Obtener las tareas desde json-server utilizando getTasks()
    2. Guardar las tareas utilizando setTasks()
    3. Manejar loading y errores
    4. Implementar handleStatusChange()
  */

  useEffect(() => {
    /*
      TODO:
      Obtener tareas desde la API
    */
  }, []);

  async function handleStatusChange(id, newStatus) {
    /*
      TODO:

      1. Buscar la tarea correspondiente
      2. Actualizar el estado
      3. Persistir cambios utilizando updateTask()
      4. Actualizar el estado global
    */
  }

  if (loading) {
    return <p className={styles.status}>Cargando tareas...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <main>
      <Board
        tasks={tasks}
        onStatusChange={handleStatusChange}
      />

      <AssigneesChart tasks={tasks} />
    </main>
  );
}

export default BoardPage;