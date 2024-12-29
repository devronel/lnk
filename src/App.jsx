import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'
import MainLayout from './layouts/mainLayout'
import { AuthProvider } from './context/AuthContext'
import AuthLayout from './layouts/authLayout'
import Home from './pages/home/Index'
import PostImage from './pages/home/PostImageView'
import Profile from './pages/profile/Index'
import People from './pages/people/Index'
import ViewProfile from './pages/people/ViewProfile'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Notifications from './pages/notifications/Index'
import ChatHome from './pages/chat/Index'
import ForgotPassword from './pages/auth/ForgotPassword'
import NotFound from './pages/errorPage/404'
import OTPVerification from './pages/auth/OTPVerification'


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
              <Route path='/profile-info/:username' element={<ViewProfile />} />
              <Route path='/chat' element={<ChatHome />} />
              <Route path='/notifications' element={<Notifications />} />
            </Route>
            <Route path='/post-image/:post_id/:username' element={<PostImage />} />
            <Route path='/404' element={<NotFound />} />
            <Route path='/' element={<AuthLayout />}>
              <Route path='/login' element={<Login />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/otp-verification' element={<OTPVerification />} />
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
