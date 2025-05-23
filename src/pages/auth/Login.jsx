import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import BeatLoader from 'react-spinners/BeatLoader'
import { AuthContext } from "../../context/AuthContext";
import LnkInput from "../../components/forms/lnkInput";
import { FcGoogle } from "react-icons/fc";
import { MdWavingHand } from "react-icons/md";
import { RiLoader4Fill } from "react-icons/ri";

const Login = () => {

    const { isLogin, authenticate, authLoading } = useContext(AuthContext)
    const navigate = useNavigate()
    const [authData, setAuthData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setAuthData({
            ...authData,
            [e.target.name]: e.target.value
        })
    }

    const submit = async (e) => {
        e.preventDefault();
        authenticate(authData)
    }

    useEffect(() => {
        if (isLogin) {
            navigate('/')
        }
    }, [isLogin])

    return (
        <>
            <section className="  max-w-[400px] w-[90%] mx-auto">
                <h2 className=" text-3xl mb-1 font-bold">Login</h2>
                <p className=" text-sm mb-5 font-light">Hi, Welcome back. <MdWavingHand className="inline-block align-middle text-lnk-orange text-base" /></p>
                <div className=" mb-4">
                    <button className=" flex items-center justify-center gap-2 text-sm bg-lnk-white border border-lnk-gray w-full py-2 rounded">
                        <FcGoogle />
                        Login with Google
                    </button>
                </div>
                <div className=" flex items-center gap-2 mb-4">
                    <div className=" flex-grow bg-lnk-gray h-[1px]"></div>
                    <p className=" text-xs font-light">or Login with Email</p>
                    <div className=" flex-grow bg-lnk-gray h-[1px]"></div>
                </div>
                <form onSubmit={submit}>
                    <div className=" mb-3">
                        <LnkInput required onChange={handleChange} name='email' type="email" label="Email" />
                    </div>
                    <div className=" mb-3">
                        <LnkInput required onChange={handleChange} name='password' type='password' label="Password" />
                    </div>
                    <Link to='/forgot-password' className="block mb-3 text-right text-xs hover:underline text-lnk-orange">
                        Forgot Password?
                    </Link>
                    <button disabled={authLoading} className={`${authLoading ? 'bg-opacity-80' : null} flex items-center justify-center bg-lnk-orange w-full h-10 py-2.5 mb-3 rounded text-lnk-white text-sm font-bold hover:bg-opacity-80 transition-all ease-linear duration-150`}>
                        {authLoading ? null : 'Login'}
                        <BeatLoader
                            color={'#F5F5F7'}
                            loading={authLoading}
                            size={8}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </button>
                    <p className=" text-xs text-center">Don't have an account yet? <Link to="/signup" className=" text-lnk-orange hover:underline">Create account</Link></p>
                </form>
            </section>
        </>
    )
}

export default Login