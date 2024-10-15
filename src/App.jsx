import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/mainLayout'
import AuthLayout from './layouts/authLayout'
import Home from './pages/home'
import Profile from './pages/profile'
import People from './pages/people'
import Login from './pages/auth/login'

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
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
