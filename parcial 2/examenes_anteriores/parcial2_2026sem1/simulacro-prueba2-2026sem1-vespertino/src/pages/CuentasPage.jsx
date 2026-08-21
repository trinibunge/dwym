import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { cuentasApi, productosApi } from '../api/client.js'
import { formatoPrecio, totalDeCuenta } from '../utils/cuentas.js'
import styles from './CuentasPage.module.css'

export function CuentasPage() {
  {/* TODO: Implementar el listado de cuentas */}

  return (
    <main>
      <div className={styles.top}>
        <h1 className={styles.title}>Cuentas</h1>
        <Link className={styles.linkBtn} to="/cuentas/nueva">
          Agregar cuenta
        </Link>
      </div>
      <ul className={styles.list}>
       {/* TODO: Implementar el listado de cuentas */}
      </ul>
    </main>
  )
}
