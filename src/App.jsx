import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import MainLayout from './layouts/mainLayout'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
