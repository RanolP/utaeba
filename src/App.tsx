import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { IndexPage } from './pages/IndexPage';

export function App() {
  return (
    <BrowserRouter basename="/utaeba/">
      <Routes>
        <Route path="/" element={<IndexPage />} />
      </Routes>
    </BrowserRouter>
  );
}
