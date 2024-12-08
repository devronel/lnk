import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'
import MainLayout from './layouts/mainLayout'
import AuthLayout from './layouts/authLayout'
import Home from './pages/home'
import PostImage from './pages/home/post-image-view'
import Profile from './pages/profile'
import People from './pages/people'
import Login from './pages/auth/login'
import Signup from './pages/auth/signup'
import Notifications from './pages/notifications'
import ChatHome from './pages/chat'
import NotFound from './pages/error-page/404'
import { AuthProvider } from './context/AuthContext'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

function App() {

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <AuthProvider>
          <Routes>
            <Route path='/' element={<MainLayout />}>
              <Route path='/' element={<Home />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/people' element={<People />} />
              <Route path='/chat' element={<ChatHome />} />
              <Route path='/notifications' element={<Notifications />} />
            </Route>
            <Route path='/post-image/:post_id/:username' element={<PostImage />} />
            <Route path='/404' element={<NotFound />} />
            <Route path='/' element={<AuthLayout />}>
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
            </Route>
          </Routes>
        </AuthProvider>
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
