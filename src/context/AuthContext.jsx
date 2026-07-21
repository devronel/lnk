import { createContext, useState, useEffect, useLayoutEffect } from "react";
import toast from "react-hot-toast";
import FullPageLoader from "../components/loader/fullPageLoader";
import axiosInstance from "../utils/axios";
import axios from "axios";

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {

    const [isLogin, setIsLogin] = useState(false);
    const [authLoading, setAuthLoading] = useState(false)
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const [user, setUser] = useState(null)
    const [accessToken, setAccessToken] = useState()

    /* --- Authenticate / Login user --- */
    const authenticate = async (data) => {
        try {
            setAuthLoading(true)

            let user = await axiosInstance.post('/authenticate', data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (user.data.success) {
                setIsLogin(true)
                setAuthLoading(false)
                localStorage.setItem('auth_token', user.data.payload.access_token);
                setUser(user.data.payload.user);
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

    /* --- Logout --- */
    const logout = async () => {
        try {
            await axiosInstance.post('/logout');
        } catch (error) {
            console.error("Backend logout failed, forcing client cleanup:", error);
        } finally {
            localStorage.removeItem('auth_token');
            setUser(null);
            setIsLogin(false);
        }
    }

    /* --- Get User Data, Run when page reload --- */
    const refreshUser = async () => {

        const token = localStorage.getItem('auth_token');

        if (!token) {
            setUser(null);
            setIsLogin(false);
            setIsAuthenticating(false);
            return;
        }

        try {
            setIsAuthenticating(true);

            const response = await axiosInstance.get('/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            setUser(response.data);
            setIsLogin(true);

        } catch (error) {
            localStorage.removeItem('auth_token');
            setUser(null);
            setIsLogin(false);
        } finally {
            setIsAuthenticating(false);
        }
    }

    useEffect(() => {
        refreshUser()
    }, [])

    if (isAuthenticating) {
        return <FullPageLoader />
    }

    return (
        <AuthContext.Provider value={{ authenticate, logout, isLogin, refreshUser, accessToken, user, setUser, authLoading }}>
            {children}
        </AuthContext.Provider>
    )

}