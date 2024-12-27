import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"
import Navigation from "../components/navigation"
import LeftSidebar from "../components/leftSidebar"

const MainLayout = () => {
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
                    <div className={`max-w-[80rem] w-[95%] xs:w-[90%] mx-auto grid gap-5
                            ${currentUrl === '/profile' || location.pathname.startsWith('/profile-info/') ? 'md:grid-cols-[1fr_100px] lg:grid-cols-[1fr_350px]' : 'md:grid-cols-[240px_1fr] lg:grid-cols-[16.25rem_1fr_16.25rem]'}
                            `}>
                        {
                            currentUrl === '/profile' || location.pathname.startsWith('/profile-info/') ? null : <LeftSidebar
                                firstName={user?.first_name}
                                lastName={user?.last_name}
                                username={user?.username}
                                headline={user?.headline}
                                address={user?.address}
                                profileUrl={user?.url}
                                coverPhoto={user?.cover_photo}
                            />
                        }
                        <div className=" pt-12 xs:pt-0">
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