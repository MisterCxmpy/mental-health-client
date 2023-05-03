import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Navbar } from './layouts'
import { Home, Activities, Login, Signup, Intro } from './pages'
import ProtectRoute from './components/ProtectRoute'

function App() {

  return (
    <Routes>
      <Route path='/authenticate/login' element={<Login />} />
      <Route path='/authenticate/signup' element={<Signup />} />
      <Route path='/authenticate/intro' element={<Intro />} />
      <Route element={<ProtectRoute />}>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path='/activities' element={<Activities />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
