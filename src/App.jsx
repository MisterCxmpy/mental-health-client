import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import { Navbar } from './layouts'
import { Home, Activities, Login, Signup } from './pages'

function App() {

  return (
    <Routes>
      <Route path='/authenticate/login' element={<Login />} />
      <Route path='/authenticate/signup' element={<Signup />} />
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path='/activities' element={<Activities />} />
      </Route>
    </Routes>
  )
}

export default App
