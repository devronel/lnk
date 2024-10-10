import { Outlet } from "react-router-dom"
import Navigation from "../components/navigation"

const MainLayout = () => {
    return (
        <>
            <div>
                <Navigation />
                <main>
                    <div className=" max-w-[80rem] w-[90%] mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </>
    )
}

export default MainLayout