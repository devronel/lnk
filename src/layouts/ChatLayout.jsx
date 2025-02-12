import { useEffect, useState, useContext, useLayoutEffect } from "react";
import { socket } from "../socket";
import { AuthContext } from "../context/AuthContext";
import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"
import Navigation from "../components/navigation"
import ChatConversation from "../components/sidebar/chatConversation";

const ChatLayout = () => {
    const location = useLocation();
    const { isLogin, user } = useContext(AuthContext)
    const [currentRoute, setCurrentRoute] = useState('')

    useEffect(() => {
        setCurrentRoute(location.pathname)
    }, [location])

    return isLogin ? (
        <>
            <div className=" min-h-screen h-auto pt-[4.0625rem] lg:pb-2">
                <Navigation user={user} />
                <main className=" h-[calc(100vh-73px)]">
                    <div className={`h-full max-w-[80rem] w-[95%] xs:w-[90%] mx-auto grid grid-cols-9 gap-2`}>
                        <div className="col-span-3 overflow-y-auto relative bg-lnk-white border rounded-md">
                            <div className="absolute top-0 w-full z-10 bg-lnk-white border-b border-lnk-orange px-3 py-2">
                                <h1 className=" mb-3 font-bold text-xl">Chat</h1>
                                <input 
                                    type="text" 
                                    placeholder="Seach friends..." 
                                    className=" px-3 py-2 w-full rounded border font-lato text-sm outline-none focus:outline focus:outline-lnk-orange" 
                                />
                            </div>
                            <div className=" overflow-y-auto absolute top-24 w-full h-full hidden md:block ">
                                <ChatConversation />
                            </div>
                        </div>
                        <div className="col-span-6 pt-12 xs:pt-0 rounded-md bg-lnk-white border border-lnk-gray">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </>
    ) : <Navigate to='/login' state={{ from: location.pathname }} />
}

export default ChatLayout