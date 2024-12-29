import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axiosInstance from '../../utils/axios'
import BeatLoader from "react-spinners/BeatLoader"
import LnkInput from "../../components/forms/lnkInput"
import { IoArrowBackCircle } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc"
import { MdWavingHand } from "react-icons/md"

const ForgotPassword = () => {

    const navigate = useNavigate()
    const [authLoading, setAuthLoading] = useState(false)
    const [email, setEmail] = useState('')

    const handleChange = (e) => {
        setEmail(e.target.value)
    }

    const submit = async (e) => {
        e.preventDefault()
        try {
            setAuthLoading(true)
            const result = await axiosInstance.post('/user/forgot-password', { email }, {
                withCredentials: true
            })
            if (result.status === 200) {
                console.log(result)
                setAuthLoading(false)
                const encodedEmail = btoa(result.data.payload.email);
                navigate(`/otp-verification/${encodeURIComponent(encodedEmail)}`)
            }
        } catch (error) {
            setAuthLoading(false)
            console.log(error.response)
        }
    }

    return (
        <>
            <section className="  max-w-[400px] w-[90%] mx-auto">
                <Link to={'/login'}>
                    <IoArrowBackCircle className=" text-2xl text-lnk-orange" />
                </Link>
                <h2 className=" text-3xl mb-1 font-bold">Reset your password</h2>
                <p className=" text-sm mb-5 font-light">Enter the email you used to register.</p>
                <form onSubmit={submit}>
                    <div className=" mb-3">
                        <LnkInput onChange={handleChange} name='email' type="email" label="Email" />
                    </div>
                    <button disabled={authLoading} className={`${authLoading ? 'bg-opacity-80' : null} flex items-center justify-center bg-lnk-orange w-full h-10 py-2.5 px-3 mb-3 rounded text-lnk-white text-sm font-bold hover:bg-opacity-80 transition-all ease-linear duration-150`}>
                        {authLoading ? null : 'Send OTP'}
                        <BeatLoader
                            color={'#F5F5F7'}
                            loading={authLoading}
                            size={8}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </button>
                </form>
            </section>
        </>
    )
}

export default ForgotPassword