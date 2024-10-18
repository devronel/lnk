import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDynamicFeed, MdNotifications, MdPeopleAlt } from "react-icons/md";
import { IoIosChatbubbles } from "react-icons/io";
import NavMenu from "./nav-menu";

const Navigation = () => {

    const location = useLocation()
    const [route, setRoute] = useState(null)
    const [menuOpen, setMenuOpen] = useState(false)

    const openMenu = () => {
        setMenuOpen(prevState => !prevState)
    }

    useEffect(() => {
        setRoute(location.pathname)
    }, [location])

    return (
        <>
            <div className="py-1 border-b border-lnk-dark-gray fixed top-0 left-0 right-0 z-50 bg-lnk-white">
                <nav className="max-w-[80rem] w-[90%] mx-auto flex items-center justify-between">
                    <Link to="/" className=" font-bold text-lg text-lnk-orange">Lnk</Link>
                    <div className=" flex items-center gap-8">
                        <ul className=" flex items-center gap-8">
                            <li>
                                <Link to="/"><MdDynamicFeed className={`${route === '/' ? 'text-lnk-orange' : null} text-lg hover:text-lnk-orange transition-colors ease-linear duration-150`} /></Link>
                            </li>
                            <li>
                                <Link to="/people"><MdPeopleAlt className={`${route === '/people' ? 'text-lnk-orange' : null} text-lg hover:text-lnk-orange transition-colors ease-linear duration-150`} /></Link>
                            </li>
                            <li>
                                <Link to="/"><IoIosChatbubbles className=" text-lg hover:text-lnk-orange transition-colors ease-linear duration-150" /></Link>
                            </li>
                            <li>
                                <Link to="/notifications"><MdNotifications className={`${route === '/notifications' ? 'text-lnk-orange' : null} text-lg hover:text-lnk-orange transition-colors ease-linear duration-150`} /></Link>
                            </li>
                        </ul>
                        <span className=" block w-[2px] h-5 bg-lnk-dark-gray rounded"></span>
                        <div className=" relative">
                            <button onClick={openMenu} className=" flex items-center gap-3 hover:bg-lnk-gray px-3 py-2 rounded transition-colors ease-linear duration-150">
                                <div className=" w-6 h-6 rounded-full overflow-hidden border border-lnk-dark-gray">
                                    <img className="w-full h-full object-cover" src="https://images.pexels.com/photos/3779760/pexels-photo-3779760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                                </div>
                                <p className=" font-medium text-sm">Alexia Yu</p>
                            </button>
                            <NavMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navigation