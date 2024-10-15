import { Link } from "react-router-dom"
import { FcGoogle } from "react-icons/fc";
import { MdWavingHand } from "react-icons/md";
import LnkInput from "../../components/forms/lnk-input";

const Signup = () => {
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
                <form>
                    <div className=" mb-3">
                        <LnkInput type="text" label="Full name" />
                    </div>
                    <div className=" mb-3">
                        <LnkInput type="email" label="Email" />
                    </div>
                    <div className=" mb-3">
                        <LnkInput type='password' label="Password" />
                    </div>
                    <div className=" mb-3">
                        <LnkInput type='password' label="Re-type Password" />
                    </div>
                    <button className=" bg-lnk-orange w-full py-2.5 mb-3 rounded text-lnk-white text-sm font-bold hover:bg-opacity-90 transition-all ease-linear duration-150">
                        Signup
                    </button>
                    <p className=" text-xs text-center">Already have an account? <Link to="/login" className=" text-lnk-orange hover:underline">Login</Link></p>
                </form>
            </section>
        </>
    )
}

export default Signup