import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/mainLayout'
import AuthLayout from './layouts/authLayout'
import Home from './pages/home'
import Profile from './pages/profile'
import People from './pages/people'
import Login from './pages/auth/login'
import Signup from './pages/auth/signup'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/people' element={<People />} />
        </Route>
        <Route path='/' element={<AuthLayout />}>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
