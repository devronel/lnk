import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axios"
import { FcGoogle } from "react-icons/fc";
import { MdWavingHand } from "react-icons/md";
import LnkInput from "../../components/forms/lnk-input";
import useError from "../../hooks/useError";

const Signup = () => {

    /*
       Initialize react hooks
   */
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    })
    let [setErrors, errorExist] = useError()

    /*
        Functions and event
    */
    const handleChangeInput = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const submit = async (e) => {
        e.preventDefault();

        try {
            let response = await axiosInstance.post('/user/create', userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.data.success) {
                toast.success("Account successfully created!")
                setUserData({
                    username: '',
                    email: '',
                    password: '',
                    passwordConfirmation: ''
                })
                setErrors([])
            } else {
                setErrors(response.data.payload.errors)
            }
        } catch (error) {
            console.log(error.message)
        }

    }

    return (
        <>
            <section className="  max-w-[400px] w-[90%] mx-auto">
                <h2 className=" text-3xl mb-1 font-bold">Signup</h2>
                <p className=" text-sm mb-5 font-light">Hello, Create your Account. <MdWavingHand className="inline-block align-middle text-lnk-orange text-base" /></p>
                <div className=" mb-4">
                    <button className=" flex items-center justify-center gap-2 text-sm bg-lnk-white border border-lnk-gray w-full py-2 rounded">
                        <FcGoogle />
                        Signup with Google
                    </button>
                </div>
                <div className=" flex items-center gap-2 mb-4">
                    <div className=" flex-grow bg-lnk-gray h-[1px]"></div>
                    <p className=" text-xs font-light">or Signup with Email</p>
                    <div className=" flex-grow bg-lnk-gray h-[1px]"></div>
                </div>
                <form onSubmit={submit}>
                    <div className=" mb-3">
                        <LnkInput onChange={handleChangeInput} value={userData.username} name='username' type="text" label="Username" error={errorExist('username')} />
                        {
                            errorExist('username') ? <p className=" text-red-500 text-xs">{errorExist('username').msg}</p> : null
                        }
                    </div>
                    <div className=" mb-3">
                        <LnkInput onChange={handleChangeInput} value={userData.email} name='email' type="email" label="Email" error={errorExist('email')} />
                        {
                            errorExist('email') ? <p className=" text-red-500 text-xs">{errorExist('email').msg}</p> : null
                        }
                    </div>
                    <div className=" mb-3">
                        <LnkInput onChange={handleChangeInput} value={userData.password} name='password' type='password' label="Password" error={errorExist('password')} />
                        {
                            errorExist('password') ? <p className=" text-red-500 text-xs">{errorExist('password').msg}</p> : null
                        }
                    </div>
                    <div className=" mb-3">
                        <LnkInput onChange={handleChangeInput} value={userData.passwordConfirmation} name='passwordConfirmation' type='password' label="Re-type Password" error={errorExist('passwordConfirmation')} />
                        {
                            errorExist('passwordConfirmation') ? <p className=" text-red-500 text-xs">{errorExist('passwordConfirmation').msg}</p> : null
                        }
                    </div>
                    <button type="submit" className=" bg-lnk-orange w-full py-2.5 mb-3 rounded text-lnk-white text-sm font-bold hover:bg-opacity-90 transition-all ease-linear duration-150">
                        Signup
                    </button>
                    <p className=" text-xs text-center">Already have an account? <Link to="/login" className=" text-lnk-orange hover:underline">Login</Link></p>
                </form>
            </section>
        </>
    )
}

export default Signup