import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/mainLayout'
import Home from './pages/home'
import Profile from './pages/profile'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
