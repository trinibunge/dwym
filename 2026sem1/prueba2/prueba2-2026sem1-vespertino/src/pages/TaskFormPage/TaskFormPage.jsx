import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTask, createTask, updateTask } from '../../services/taskService';
import styles from './TaskFormPage.module.css';

const STATUS_OPTIONS = ['To Do', 'In Progress', 'Done'];

function TaskFormPage({ onSave }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'To Do',
    assignee: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      getTask(id)
        .then((task) => {
          setForm({
            title: task.title,
            description: task.description,
            status: task.status,
            assignee: task.assignee || '',
          });
          setLoading(false);
        })
        .catch(() => {
          setError('No se encontró la tarea.');
          setLoading(false);
        });
    }
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!form.title.trim()) {
      setError('El título es obligatorio.');
      return;
    }

    if (form.status !== 'To Do' && !form.assignee.trim()) {
      setError('Debés asignar una persona antes de cambiar el estado.');
      return;
    }

    try {
      let saved;
      if (isEditing) {
        saved = await updateTask(id, { ...form, id });
      } else {
        saved = await createTask(form);
      }
      onSave(saved, isEditing);
      navigate('/');
    } catch {
      setError('Error al guardar la tarea. Intentá de nuevo.');
    }
  }

  if (loading) return <p className={styles.status}>Cargando tarea...</p>;

  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>
        {isEditing ? 'Editar tarea' : 'Nueva tarea'}
      </h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <p className={styles.error}>{error}</p>}

        <label className={styles.label}>
          Título <span className={styles.required}>*</span>
          <input
            className={styles.input}
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Título de la tarea"
            required
          />
        </label>

        <label className={styles.label}>
          Descripción
          <textarea
            className={styles.textarea}
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Descripción opcional"
            rows={3}
          />
        </label>

        <label className={styles.label}>
          Estado
          <select
            className={styles.select}
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.label}>
          Persona asignada
          <input
            className={styles.input}
            type="text"
            name="assignee"
            value={form.assignee}
            onChange={handleChange}
            placeholder="Nombre de la persona"
          />
        </label>

        <div className={styles.buttons}>
          <button type="submit" className={styles.submitBtn}>
            {isEditing ? 'Guardar cambios' : 'Crear tarea'}
          </button>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={() => navigate('/')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </main>
  );
}

export default TaskFormPage;
