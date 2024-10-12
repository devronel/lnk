import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom"
import Navigation from "../components/navigation"
import LeftSidebar from "../components/left-sidebar"

const MainLayout = () => {

    const location = useLocation();
    const [currentUrl, setCurrentUrl] = useState('')

    useEffect(() => {
        setCurrentUrl(location.pathname)
    }, [location])


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