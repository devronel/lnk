import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(null);
    const [user, setUser] = useState(null)

    /*
        Login user
    */
    const authenticate = async (data) => {
        try {
            let user = await axiosInstance.post('/user/authenticate', data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (user.status === 200) {
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${user.data.payload.auth_token}`
                setIsLogin(true)
                refreshUser()
            }
        } catch (error) {
            setIsLogin(false)
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
            let user = await axiosInstance.get('/user/validate-user', {
                withCredentials: true
            });
            if (user.status === 200) {
                setUser(user.data.payload.authUser)
                setIsLogin(true)
            }
        } catch (error) {
            setIsLogin(false)
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {

        refreshUser()

    }, [isLogin, navigate])


    if (isLogin === null) {
        return <div>Loading...</div>
    }

    return (
        <AuthContext.Provider value={{ authenticate, logout, isLogin, refreshUser, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}