import { useState, useRef, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import BeatLoader from "react-spinners/BeatLoader"
import axiosInstance from "../../utils/axios";
import { IoArrowBackCircle } from "react-icons/io5";
import toast from "react-hot-toast";

const OTPVerification = () => {

    const inputs = useRef([])
    const { email } = useParams()
    const [authLoading, setAuthLoading] = useState(false)
    const [otp, setOtp] = useState(Array(6).fill(''))

    const handleOnChange = (e, index) => {

        const { value } = e.target

        if (value.match(/^\d$/)) {
            const newOtp = [...otp]
            newOtp[index] = value
            setOtp(newOtp)

            if (index < 5) {
                inputs.current[index + 1].focus();
            }
        }

        if (value === '') {
            const newOtp = [...otp]
            newOtp[index] = ''
            setOtp(newOtp)
            if (index > 0) {
                inputs.current[index - 1].focus();
            }
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && otp[index] === '') {
            if (index > 0) {
                inputs.current[index - 1].focus();
            }
        }
    };

    const submit = async (e) => {
        e.preventDefault()
        try {
            let result = await axiosInstance.post('/user/verify-otp', {
                email: atob(email),
                otpCode: otp
            })
            if (result.status === 200) {
                alert(result.data.payload.token)
            }
        } catch (error) {
            console.log(error.response)
            toast.error(error.response.data.message, {
                position: 'top-center'
            })
        }
    }

    return (
        <>
            <section className="  max-w-[400px] w-[90%] mx-auto">
                <Link to={'/forgot-password'}>
                    <IoArrowBackCircle className=" text-2xl text-lnk-orange" />
                </Link>
                <h2 className=" text-3xl mb-1 font-bold">Verify your account</h2>
                <p className=" text-sm mb-5 font-light">We have sent your one time password(OTP) on <span className="font-bold text-lnk-orange">{atob(email)}</span></p>
                <form onSubmit={submit}>
                    <div className=" mb-3">
                        <div id="inputs" className=" flex items-center gap-2">
                            {
                                otp.map((_, index) => (
                                    <OTPInput
                                        key={index}
                                        index={index}
                                        value={otp[index]}
                                        onChange={handleOnChange}
                                        onKeyDown={handleKeyDown}
                                        inputs={inputs}
                                    />
                                ))
                            }
                        </div>
                    </div>
                    <button disabled={authLoading} className={`${authLoading ? 'bg-opacity-80' : null} flex items-center justify-center bg-lnk-orange w-full h-10 py-2.5 px-3 mb-3 rounded text-lnk-white text-sm font-bold hover:bg-opacity-80 transition-all ease-linear duration-150`}>
                        {authLoading ? null : 'Verify'}
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

export default OTPVerification

export function OTPInput({ value, onChange, onKeyDown, index, inputs }) {
    return (
        <input
            type="text"
            inputMode="numeric"
            maxLength="1"
            value={value}
            onChange={(e) => onChange(e, index)}
            onKeyDown={(e) => onKeyDown(e, index)}
            ref={(e) => (inputs.current[index] = e)}
            className=" border border-gray-400 w-full p-2 rounded text-center focus:outline-lnk-orange"
        />
    )

}