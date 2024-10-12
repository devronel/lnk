import { useState } from "react";
import { Link } from "react-router-dom";
import { MdDynamicFeed, MdNotifications, MdChat, MdPeopleAlt } from "react-icons/md";
import NavMenu from "./nav-menu";

const Navigation = () => {

    const [menuOpen, setMenuOpen] = useState(false)

    const openMenu = () => {
        setMenuOpen(true)
    }

    return (
        <>
            <div className="py-1 border-b border-lnk-dark-gray fixed top-0 left-0 right-0 z-50 bg-lnk-white">
                <nav className="max-w-[80rem] w-[90%] mx-auto flex items-center justify-between">
                    <Link to="/" className=" font-bold text-lg text-lnk-orange">Lnk</Link>
                    <div className=" flex items-center gap-8">
                        <ul className=" flex items-center gap-8">
                            <li>
                                <Link to="/"><MdDynamicFeed className=" text-lg hover:text-lnk-orange transition-colors ease-linear duration-150" /></Link>
                            </li>
                            <li>
                                <Link to="/"><MdPeopleAlt className=" text-lg hover:text-lnk-orange transition-colors ease-linear duration-150" /></Link>
                            </li>
                            <li>
                                <Link to="/"><MdChat className=" text-lg hover:text-lnk-orange transition-colors ease-linear duration-150" /></Link>
                            </li>
                            <li>
                                <Link to="/"><MdNotifications className=" text-lg hover:text-lnk-orange transition-colors ease-linear duration-150" /></Link>
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