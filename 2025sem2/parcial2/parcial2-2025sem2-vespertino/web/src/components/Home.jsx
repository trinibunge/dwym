import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Bienvenido al segundo parcial de Desarrollo Web y Mobile</h1>
      <p>Por favor, lea el archivo README.md para más información. Para
        información sobre la API del ejercicio, ir a la <Link to="/ref/api">
        Referencia de la API</Link></p>
    </div>
  );
}

