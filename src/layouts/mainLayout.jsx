import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"
import Navigation from "../components/navigation"
import LeftSidebar from "../components/sidebar/leftSidebar"
import FriendsMenu from "../components/sidebar/friendsMenu"

const MainLayout = () => {
    const location = useLocation();
    const { isLogin, user } = useContext(AuthContext)
    const [currentUrl, setCurrentUrl] = useState('')

    useEffect(() => {
        setCurrentUrl(location.pathname)
    }, [location])


    const pageContent = () => {
        if (currentUrl === '/profile' || location.pathname.startsWith('/profile-info/')) {
            return null
        } else if (currentUrl === '/people') {
            return <FriendsMenu />
        } else {
            return <LeftSidebar
                fullName={user?.full_name}
                username={user?.username}
                headline={user?.headline}
                address={user?.address}
                profileUrl={user?.url}
                coverPhoto={user?.cover_photo}
            />
        }
    }

    return isLogin ? (
        <>
            <div className=" min-h-screen h-auto pt-[4.0625rem] lg:pb-2">
                <Navigation user={user} />
                <main>
                    <div className={`max-w-[80rem] w-[95%] xs:w-[90%] mx-auto grid md:grid-cols-8 gap-2`}>
                        {
                            pageContent()
                        }
                        <div className={`${currentUrl === '/profile' || location.pathname.startsWith('/profile-info/') ? 'col-span-6' : 'col-span-4'} pt-12 xs:pt-0`}>
                            <Outlet />
                        </div>
                        <div></div>
                    </div>
                </main>
            </div>
        </>
    ) : <Navigate to='/login' state={{ from: location.pathname }} />
}

export default MainLayout