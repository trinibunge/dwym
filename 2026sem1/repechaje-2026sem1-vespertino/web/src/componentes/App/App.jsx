import { useFetchRandomCard } from '../api';
import './App.css'

export default function App() {
  const { data, error, isLoading } = useFetchRandomCard();

  const fetchState = isLoading ? <p>Loading ...</p> : 
    error ? <p className='errorText'>{error}</p> :
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>;

  return <div>
    <h1>Repechaje 2026sem1</h1>
    <p>Ésta es una plantilla de código inicial, que debe modificarse. Por favor revisar <code>README.md</code>.</p>
    <p>Consulta a <a href="https://scryfall.com/docs/api/cards/random" target="_blank">
        https://api.scryfall.com/cards/random
      </a> :</p>
    {fetchState}
  </div>;
}
