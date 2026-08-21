import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import ApiRef from './ApiRef';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ref/api" element={<ApiRef />} />
      </Routes>
    </BrowserRouter>
  );
}
