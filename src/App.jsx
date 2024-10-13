import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/mainLayout'
import Home from './pages/home'
import Profile from './pages/profile'
import People from './pages/people'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/people' element={<People />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
