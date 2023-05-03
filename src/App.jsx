import { Route, Routes } from 'react-router-dom';
import { Navbar } from './layouts'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
      </Route>
    </Routes>
  );
}

export default App
