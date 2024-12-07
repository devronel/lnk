import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import FullPageLoader from "../components/loader/fullPageLoader";
import axiosInstance from "../utils/axios";

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {

    const [isLogin, setIsLogin] = useState(false);
    const [authLoading, setAuthLoading] = useState(false)
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const [user, setUser] = useState(null)

    /*
        Login user
    */
    const authenticate = async (data) => {
        try {
            setAuthLoading(true)
            let user = await axiosInstance.post('/user/authenticate', data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (user.status === 200) {
                setIsLogin(true)
                setAuthLoading(false)
                refreshUser()
            }
        } catch (error) {
            setIsLogin(false)
            setAuthLoading(false)
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        toast.error(error.response.data.message + '!')
                        break;
                    default:
                        console.log('An unexpected error occurred')
                        break;
                }
            }
        }
    }

    /*
        Logout user
    */
    const logout = async () => {
        try {
            let response = await axiosInstance.delete('/user/logout', {
                withCredentials: true
            });
            if (response.status === 200) {
                setIsLogin(false)
            }
        } catch (error) {
            setIsLogin(true)
        }
    }

    /*
        Validate user
    */
    const refreshUser = async () => {
        try {
            setIsAuthenticating(true)
            let user = await axiosInstance.get('/user/validate-user', {
                withCredentials: true
            });
            if (user.status === 200) {
                setUser(user.data.payload.authUser)
                setIsAuthenticating(false)
                setIsLogin(true)
            }
        } catch (error) {
            setIsAuthenticating(false)
            setIsLogin(false)
        }
    }

    useEffect(() => {

        refreshUser()

    }, [])

    if (isAuthenticating) {
        return <FullPageLoader />
    }

    return (
        <AuthContext.Provider value={{ authenticate, logout, isLogin, refreshUser, user, setUser, authLoading }}>
            {children}
        </AuthContext.Provider>
    )

}