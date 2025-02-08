import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import MainLayout from './layouts/mainLayout'
import AuthLayout from './layouts/authLayout'
import FriendsLayout from './layouts/friendsLayout'
import Home from './pages/home/Index'
import PostImage from './pages/home/PostImageView'
import Profile from './pages/profile/Index'
import Friends from './pages/friends/Index'
import FriendsRequest from './pages/friends/FriendsRequest'
import ViewProfile from './pages/friends/ViewProfile'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Notifications from './pages/notifications/Index'
import ChatHome from './pages/chat/Index'
import ForgotPassword from './pages/auth/ForgotPassword'
import NotFound from './pages/errorPage/404'
import OTPVerification from './pages/auth/OTPVerification'
import ChangePassword from './pages/auth/ChangePassword'
import ProfileLayout from './layouts/ProfileLayout'
import ChatLayout from './layouts/ChatLayout'
import ChatMessages from './pages/chat/ChatMessages'


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
              <Route path='/notifications' element={<Notifications />} />
            </Route>
            <Route path='/' element={<ProfileLayout />}>
              <Route path='/profile' element={<Profile />} />
              <Route path='/profile-info/:username' element={<ViewProfile />} />
            </Route>
            <Route path='/' element={<ChatLayout />}>
              <Route path='/chat' element={<ChatHome />} />
              <Route path='/chat/:username' element={<ChatMessages />} />
            </Route>
            <Route path='/' element={<FriendsLayout />}>
              <Route path='/friends' element={<Friends />} />
              <Route path='/friends/request' element={<FriendsRequest />} />
            </Route>
            <Route path='/post-image/:post_id/:username' element={<PostImage />} />
            <Route path='/404' element={<NotFound />} />
            <Route path='/' element={<AuthLayout />}>
              <Route path='/login' element={<Login />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/otp-verification/:email' element={<OTPVerification />} />
              <Route path='/change-password/:token' element={<ChangePassword />} />
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
