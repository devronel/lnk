import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUserClock, FaUserFriends } from "react-icons/fa";

const FriendsMenu = () => {

    const location = useLocation()
    const [currentUrl, setCurrentUrl] = useState('')

    useEffect(() => {
        setCurrentUrl(location.pathname)
    }, [location])

    return (
        <div>
            <h1 className=" font-bold text-xl mb-3">Friends</h1>
            <div className=" flex items-center flex-col gap-2">
                <Link to={'/friends'} className={`${currentUrl === '/friends' ? 'bg-lnk-white' : ''} w-full rounded p-2 text-lnk-dark-gray hover:bg-lnk-white flex items-center gap-2 text-base font-bold`}>
                    <FaHome className=" text-lg text-lnk-orange" />
                    Home
                </Link>
                <Link to={'/friends/request'} className={`${currentUrl === '/friends/request' ? 'bg-lnk-white' : ''} w-full rounded p-2 text-lnk-dark-gray hover:bg-lnk-white flex items-center gap-2 text-base font-bold`}>
                    <FaUserClock className=" text-lg" />
                    Friend Request
                </Link>
                <Link to={'/all-friends'} className="w-full rounded p-2 text-lnk-dark-gray hover:bg-lnk-white flex items-center gap-2 text-base font-bold">
                    <FaUserFriends className=" text-lg" />
                    All Friends
                </Link>
            </div>
        </div>
    )
}

export default FriendsMenu