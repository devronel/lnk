import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import Navigation from "../components/navigation"
import LeftSidebar from "../components/left-sidebar"

const MainLayout = () => {

    const location = useLocation();
    const navigate = useNavigate()
    const { isLogin } = useContext(AuthContext)
    const [currentUrl, setCurrentUrl] = useState('')

    useEffect(() => {
        setCurrentUrl(location.pathname)

        if (!isLogin) {
            navigate('/login')
        }

    }, [location, isLogin])


    return (
        <>
            <div className=" min-h-screen h-auto pt-[4.0625rem] pb-4">
                <Navigation />
                <main>
                    <div className={`max-w-[80rem] w-[90%] mx-auto grid gap-5
                            ${currentUrl === '/profile' ? 'grid-cols-[1fr_350px]' : 'grid-cols-[260px_1fr_260px]'}
                            `}>
                        {
                            currentUrl === '/profile' ? null : <LeftSidebar />
                        }
                        <div>
                            <Outlet />
                        </div>
                        <div></div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default MainLayout