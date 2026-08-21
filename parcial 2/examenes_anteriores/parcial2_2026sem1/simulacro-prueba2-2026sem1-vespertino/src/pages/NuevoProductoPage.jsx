import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { productosApi } from '../api/client.js'
import styles from './NuevoProductoPage.module.css'

export function NuevoProductoPage() {
  const navigate = useNavigate()

  const [formulario, setFormulario] = useState({
    nombre: '',
    icono: '',
    precio: '',
  })

  function handleChange(e) {
    const { name, value } = e.target

    setFormulario((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      await productosApi.crear({
        nombre: formulario.nombre,
        icono: formulario.icono,
        precio: Number(formulario.precio),
      })

      navigate('/productos')
    } catch (error) {
      console.error(error)
      alert('Error al crear producto')
    }
  }

  return (
    <main>
      <div className={styles.top}>
        <h1 className={styles.title}>Agregar comida</h1>

        <Link className={styles.back} to="/productos">
          Volver
        </Link>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.field}>
          Nombre

          <input
            className={styles.input}
            name="nombre"
            placeholder="Ej: Hamburguesa"
            value={formulario.nombre}
            onChange={handleChange}
          />
        </label>

        <label className={styles.field}>
          Icono

          <input
            className={styles.input}
            name="icono"
            placeholder="🍔"
            value={formulario.icono}
            onChange={handleChange}
          />
        </label>

        <label className={styles.field}>
          Precio

          <input
            className={styles.input}
            name="precio"
            type="number"
            min="0"
            value={formulario.precio}
            onChange={handleChange}
          />
        </label>

        <button className={styles.btn} type="submit">
          Guardar producto
        </button>
      </form>
    </main>
  )
}