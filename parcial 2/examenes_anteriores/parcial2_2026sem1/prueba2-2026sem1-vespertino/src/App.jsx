import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import BoardPage from './pages/BoardPage/BoardPage';
import TaskFormPage from './pages/TaskFormPage/TaskFormPage';
import styles from './App.module.css';

function App() {
  const [tasks, setTasks] = useState([]);
  //todo obtener tareas del context para ejercicio 6 de lo contrario se recomienda para el resto de los ejercicios simplemente obtener las tareas aqui

  function handleSave(savedTask, isEditing) {
    if (isEditing) {
      setTasks((prev) =>
        prev.map((t) => (t.id === savedTask.id ? savedTask : t))
      );
    } else {
      setTasks((prev) => [...prev, savedTask]);
    }
  }

  return (
    <BrowserRouter>
      <Navbar tasks={tasks} />
      <div className={styles.content}>
        <Routes>
          <Route
            path="/"
            element={<BoardPage tasks={tasks} setTasks={setTasks} />}
          />
        {/* todo add the edit and create task routes */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
