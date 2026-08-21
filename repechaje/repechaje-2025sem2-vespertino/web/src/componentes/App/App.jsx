import { useFetchRandomCard } from '../api';
import './App.css'

export default function App() {
  const { data, error, isLoading } = useFetchRandomCard();

  if (isLoading) {
    return (
      <p>Loading ...</p>
    );
  }
  if (error) {
    return (
      <p className='errorText'>{error}</p>
    );
  }
  return (
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
