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

            await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
                withCredentials: true
            });

            let user = await axiosInstance.post('/authenticate', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (user.data.success) {
                setIsLogin(true)
                setAuthLoading(false)
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
            setUser(null);
            setIsLogin(false);
        }
    }

    /* --- Get User Data, Run when page reload --- */
    const refreshUser = async () => {

        try {
            setIsAuthenticating(true);

            const response = await axiosInstance.get('/user');

            setUser(response.data.data);
            setIsLogin(true);

        } catch (error) {
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