import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

export function NavBar() {

  const total = 0; // TODO: Implementar el total de recaudacion
  
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.active : ''
          }
          to="/cuentas"
        >
          Cuentas
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? styles.active : ''
          }
          to="/productos"
        >
          Productos
        </NavLink>
      </nav>

      <p className={styles.total}>
        Recaudacion: ${total}
      </p>
    </header>
  )
}