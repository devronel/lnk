import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"
import Navigation from "../components/navigation"
import FriendsMenu from "../components/sidemenu/friendsMenu"

const FriendsLayout = () => {
    const location = useLocation();
    const { isLogin, user } = useContext(AuthContext)
    const [currentUrl, setCurrentUrl] = useState('')

    useEffect(() => {
        setCurrentUrl(location.pathname)
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
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </>
    ) : <Navigate to='/login' state={{ from: location.pathname }} />
}

export default FriendsLayout