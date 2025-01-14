import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"
import Navigation from "../components/navigation"
import FriendsMenu from "../components/sidebar/friendsMenu"
import { FaHome, FaUserClock, FaUserFriends } from "react-icons/fa";

const FriendsLayout = () => {
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
                    <div className={`max-w-[80rem] w-[95%] xs:w-[90%] mx-auto grid md:grid-cols-[25%_75%] gap-5`}>
                        <div className="hidden md:block">
                            <FriendsMenu />
                        </div>
                        <div className=" pt-12 xs:pt-0">
                            <div className="flex md:hidden items-center flex-wrap gap-2 mb-2">
                                <Link to={'/friends'} title="Friends" className={`${currentRoute === '/friends' ? 'bg-lnk-dark-gray text-lnk-white' : 'text-lnk-dark-gray'} text-sm px-2 py-1 rounded-md border border-lnk-dark-gray`}>
                                    <FaHome className=" text-lg " />
                                </Link>
                                <Link to={'/friends/request'} title="Friend Request" className={`${currentRoute === '/friends/request' ? 'bg-lnk-dark-gray text-lnk-white' : 'text-lnk-dark-gray'} text-sm px-2 py-1 rounded-md border border-lnk-dark-gray`}>
                                    <FaUserClock className=" text-lg" />
                                </Link>
                                <Link to={'/all-friend'} title="All Friends" className={`${currentRoute === '/all-friend' ? 'bg-lnk-dark-gray text-lnk-white' : 'text-lnk-dark-gray'} text-sm px-2 py-1 rounded-md border border-lnk-dark-gray`}>
                                    <FaUserFriends className=" text-lg" />
                                </Link>
                            </div>
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </>
    ) : <Navigate to='/login' state={{ from: location.pathname }} />
}

export default FriendsLayout