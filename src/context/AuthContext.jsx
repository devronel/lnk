import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(false)

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
            } else {
                setIsLogin(false)
            }
        } catch (error) {
            setIsLogin(false)
            console.log(error.message)
        }
    }

    // if (isLogin === null) {
    //     return <div>Loading...</div>
    // }

    useEffect(() => {
        if (!isLogin) {
            navigate('/login')
        } else {
            navigate('/')
        }
    }, [isLogin])


    return (
        <AuthContext.Provider value={{ authenticate }}>
            {children}
        </AuthContext.Provider>
    )
}