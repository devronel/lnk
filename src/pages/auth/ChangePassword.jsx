import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axiosInstance from '../../utils/axios'
import toast from "react-hot-toast"
import BeatLoader from "react-spinners/BeatLoader"
import LnkInput from "../../components/forms/lnkInput"
import { IoArrowBackCircle } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc"
import { MdWavingHand } from "react-icons/md"

const ChangePassword = () => {

    const navigate = useNavigate()
    const { token } = useParams()
    const [authLoading, setAuthLoading] = useState(false)
    const [password, setPassword] = useState({
        password: '',
        repeatPassword: ''
    })

    const handleChange = (e) => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value
        })
    }

    const submit = async (e) => {
        e.preventDefault()
        try {
            setAuthLoading(true)
            let result = await axiosInstance.post(`/user/change-password?token=${token}`, password)
            if (result.status === 200) {
                toast.success(result.data.message)
                setTimeout(() => {
                    setAuthLoading(false)
                    navigate('/login')
                }, 1000)
            }
        } catch (error) {
            setAuthLoading(false)
            toast.error(error.response.data.message)
        }
    }

    return (
        <>
            <section className="  max-w-[400px] w-[90%] mx-auto">
                {/* <Link to={'/login'}>
                    <IoArrowBackCircle className=" text-2xl text-lnk-orange" />
                </Link> */}
                <h2 className=" text-3xl mb-1 font-bold">Change your password</h2>
                <p className=" text-sm mb-5 font-light">Enter a new password to change your password.</p>
                <form onSubmit={submit}>
                    <div className=" mb-3 flex flex-col gap-3">
                        <LnkInput onChange={handleChange} value={password.password} name='password' type="password" label="New password" />
                        <LnkInput onChange={handleChange} value={password.repeatPassword} name='repeatPassword' type="password" label="Confirm password" />
                    </div>
                    <button disabled={authLoading} className={`${authLoading ? 'bg-opacity-80' : null} flex items-center justify-center bg-lnk-orange w-full h-10 py-2.5 px-3 mb-3 rounded text-lnk-white text-sm font-bold hover:bg-opacity-80 transition-all ease-linear duration-150`}>
                        {authLoading ? null : 'Change Password'}
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

export default ChangePassword