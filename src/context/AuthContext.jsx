import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(null);
    const [user, setUser] = useState(null)

    // Login user
    const authenticate = async (data) => {
        try {
            let user = await axiosInstance.post('/user/authenticate', data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${user.data.data.access_token}`

            if (user.data.success) {
                setIsLogin(true)
                setUser(user.data.data.authUser)
                // navigate('/')
            } else {
                toast.error(user.data.message + '!')
                setIsLogin(false)
            }
        } catch (error) {
            setIsLogin(false)
            console.log(error.message)
        }
    }

    // Logout user
    const logout = async () => {
        try {
            let response = await axiosInstance.delete('/user/logout', {
                withCredentials: true
            });
            if (response.data.success) {
                setIsLogin(false)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    /*
        Validate user
    */
    const validateUser = async () => {
        try {
            let user = await axiosInstance.get('/user/validate-user', {
                withCredentials: true
            });
            if (user.data.success) {
                setUser(user.data.data.authUser)
                setIsLogin(true)
            } else {
                setIsLogin(false)
            }
        } catch (error) {
            setIsLogin(false)
            console.log(error.message)
        }
    }

    useEffect(() => {

        validateUser()

        console.log(user)

    }, [isLogin, navigate])


    if (isLogin === null) {
        return <div>Loading...</div>
    }

    return (
        <AuthContext.Provider value={{ authenticate, logout, isLogin, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}