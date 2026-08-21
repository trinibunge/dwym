import { Route, Routes } from 'react-router-dom'
import { NavBar } from './components/NavBar/NavBar.jsx'
import { CuentasPage } from './pages/CuentasPage.jsx'
import { ProductosPage } from './pages/ProductosPage.jsx'
import { NuevoProductoPage } from './pages/NuevoProductoPage.jsx'

import styles from './App.module.css'

{/* Todo: Completar el router con las rutas que faltan "cuentas", "cuentas/nueva" donde se debera mostrar la pagina sus correspondientes paginas. */}


export default function App() {
  return (
    <div className={styles.shell}>
      <NavBar />
      <Routes>
        <Route path="/" element={<CuentasPage />} />
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/productos/nuevo" element={<NuevoProductoPage />} />
      </Routes>
    </div>
  )
}