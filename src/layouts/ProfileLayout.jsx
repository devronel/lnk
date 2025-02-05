import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"
import Navigation from "../components/navigation"
import FriendsMenu from "../components/sidebar/friendsMenu"
import { FaHome, FaUserClock, FaUserFriends } from "react-icons/fa";

const ProfileLayout = () => {
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
                <main>
                    <div className={`max-w-[80rem] w-[95%] xs:w-[90%] mx-auto grid grid-cols-8 gap-5`}>
                        <div className="col-span-8 md:col-span-6 pt-12 xs:pt-0">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </>
    ) : <Navigate to='/login' state={{ from: location.pathname }} />
}

export default ProfileLayout