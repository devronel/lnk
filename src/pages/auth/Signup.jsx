import { useState } from "react";
import { Link } from "react-router-dom"
import toast from "react-hot-toast";
import BeatLoader from 'react-spinners/BeatLoader'
import axiosInstance from "../../utils/axios"
import LnkInput from "../../components/forms/lnkInput";
import useError from "../../hooks/useError";
import { FcGoogle } from "react-icons/fc";
import { MdWavingHand } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";

const Signup = () => {

    /*
       Initialize react hooks
   */
    let [setErrors, errorExist] = useError()
    const [loading, setLoading] = useState(false)
    const [displayAlertSuccess, setDisplayAlertSuccess] = useState(false)
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    })

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
            setLoading(true)
            let response = await axiosInstance.post('/user/create', userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.status === 200) {
                setLoading(false)
                setDisplayAlertSuccess(true)
                toast.success("Account successfully created!")
                setUserData({
                    username: '',
                    email: '',
                    password: '',
                    passwordConfirmation: ''
                })
                setErrors([])
            }
        } catch (error) {
            setLoading(false)
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        setErrors(error.response.data.payload)
                        break;
                    default:
                        console.log('An unexpected error occurred')
                        break;
                }
            }
        }

    }

    return (
        <>
            <section className="  max-w-[400px] w-[90%] mx-auto">
                <h2 className=" text-3xl mb-1 font-bold">Signup</h2>
                <p className=" text-sm mb-5 font-light">Hello, Create your Account. <MdWavingHand className="inline-block align-middle text-lnk-orange text-base" /></p>
                {
                    displayAlertSuccess ? (
                        <div className=" mb-3 bg-green-400 p-2 rounded grid grid-cols-[15px_1fr] gap-1">
                            <div>
                                <FaInfoCircle className="text-lnk-dark" />
                            </div>
                            <p className=" text-xs text-lnk-dark">Signup successful! We've sent a <span className=" font-bold">confirmation email</span>. Click the link in the email to verify your account.</p>
                        </div>
                    ) : null
                }
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
                    <button type="submit" disabled={loading} className={`${loading ? 'bg-opacity-80' : null} flex items-center justify-center bg-lnk-orange w-full h-10 py-2.5 mb-3 rounded text-lnk-white text-sm font-bold hover:bg-opacity-80 transition-all ease-linear duration-150`}>
                        {loading ? null : 'Signup'}
                        <BeatLoader
                            color={'#F5F5F7'}
                            loading={loading}
                            size={8}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </button>
                    <p className=" text-xs text-center">Already have an account? <Link to="/login" className=" text-lnk-orange hover:underline">Login</Link></p>
                </form>
            </section>
        </>
    )
}

export default Signup