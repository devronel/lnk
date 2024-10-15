import { Link } from "react-router-dom"
import { FcGoogle } from "react-icons/fc";
import { MdWavingHand } from "react-icons/md";
import LnkInput from "../../components/forms/lnk-input";

const Login = () => {
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
                <form>
                    <div className=" mb-3">
                        <LnkInput type="email" label="Email" />
                    </div>
                    <div className=" mb-3">
                        <LnkInput type='password' label="Password" />
                    </div>
                    <Link to='/login' className="block mb-3 text-right text-xs hover:underline text-lnk-orange">
                        Forgot Password?
                    </Link>
                    <button className=" bg-lnk-orange w-full py-2.5 mb-3 rounded text-lnk-white text-sm font-bold hover:bg-opacity-90 transition-all ease-linear duration-150">
                        Login
                    </button>
                    <p className=" text-sm text-center">Don't have an account yet? <Link to="/register" className=" text-lnk-orange hover:underline">Create account</Link></p>
                </form>
            </section>
        </>
    )
}

export default Login