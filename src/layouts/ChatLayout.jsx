import { useEffect, useState, useContext } from "react";
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

    useEffect(() => {
        if(!socket.connected){
            socket.connect()
        }
    }, [])

    return isLogin ? (
        <>
            <div className=" min-h-screen h-auto pt-[4.0625rem] lg:pb-2">
                <Navigation user={user} />
                <main className=" h-[calc(100vh-73px)]">
                    <div className={`h-full max-w-[80rem] w-[95%] xs:w-[90%] mx-auto grid grid-cols-9 gap-2`}>
                        <div className="fixed top-[4.0625rem] bottom-2 w-[399px] hidden md:block bg-lnk-white border rounded-md">
                            <ChatConversation />
                        </div>
                        <div className=" col-span-3"></div>
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