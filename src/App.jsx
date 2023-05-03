import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import { Navbar } from './layouts'
import { Home } from './pages'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
