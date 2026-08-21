import { Link } from 'react-router-dom'
import styles from './NuevaCuentaPage.module.css'

export function NuevaCuentaPage() {

  // TODO: Implementar el formulario para agregar una cuenta nueva
  return (
    <main>
      <div className={styles.top}>
        <h1 className={styles.title}>Agregar cuenta</h1>
        <Link className={styles.back} to="/cuentas">
          Volver
        </Link>
      </div>

      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <label className={styles.field}>
          Cliente
          <input className={styles.input} name="cliente" placeholder="Nombre del cliente" />
        </label>

        <label className={styles.field}>
          Producto
          <input className={styles.input} name="nombre" placeholder="Nombre del producto" />
        </label>

        <label className={styles.field}>
          Icono
          <input className={styles.input} name="icono" placeholder="🍔" />
        </label>

        <label className={styles.field}>
          Cantidad
          <input className={styles.input} name="cantidad" type="number" min="1" />
        </label>

        <button className={styles.btn} type="submit">
          Guardar cuenta
        </button>
      </form>
    </main>
  )
}
