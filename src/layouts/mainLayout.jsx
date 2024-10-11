import { Outlet } from "react-router-dom"
import Navigation from "../components/navigation"
import LeftSidebar from "../components/left-sidebar"

const MainLayout = () => {
    return (
        <>
            <div className=" min-h-screen h-auto pt-[4.0625rem] pb-4">
                <Navigation />
                <main>
                    <div className=" max-w-[80rem] w-[90%] mx-auto grid grid-cols-[260px_1fr_260px] gap-5">
                        <LeftSidebar />
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