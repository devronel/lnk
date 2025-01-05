import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdNotifications, MdPeopleAlt } from "react-icons/md";
import { SiFeedly } from "react-icons/si";
import { IoIosChatbubbles } from "react-icons/io";
import { isNull, path } from "../utils/functions";
import NavMenu from "./navMenu";

/*
    Import images
*/
import profilePlaceholder from "../assets/profile-placeholder.jpg"

const Navigation = (props) => {

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
                <nav className="max-w-[80rem] w-[90%] mx-auto flex items-center justify-between border-b xs:border-none">
                    <Link to="/" className=" font-bold text-xl xs:text-lg text-lnk-orange">Lnk</Link>
                    <div className=" flex items-center gap-3 md:gap-8">
                        <ul className=" hidden xs:flex items-center gap-3 sm:gap-5">
                            <li>
                                <Link to="/"><SiFeedly className={`${route === '/' ? 'text-lnk-orange' : null} text-xl sm:text-lg hover:text-lnk-orange transition-colors ease-linear duration-150`} /></Link>
                            </li>
                            <li>
                                <Link to="/friends"><MdPeopleAlt className={`${route === '/friends' ? 'text-lnk-orange' : null} text-xl sm:text-lg hover:text-lnk-orange transition-colors ease-linear duration-150`} /></Link>
                            </li>
                            <li>
                                <Link to="/chat"><IoIosChatbubbles className={`${route === '/chat' ? 'text-lnk-orange' : null} text-xl sm:text-lg hover:text-lnk-orange transition-colors ease-linear duration-150`} /></Link>
                            </li>
                            <li>
                                <Link to="/notifications"><MdNotifications className={`${route === '/notifications' ? 'text-lnk-orange' : null} text-xl sm:text-lg hover:text-lnk-orange transition-colors ease-linear duration-150`} /></Link>
                            </li>
                        </ul>
                        <span className="hidden xs:block w-[2px] h-5 bg-lnk-dark-gray rounded"></span>
                        <div className=" relative">
                            <button onClick={openMenu} className=" flex items-center gap-3 hover:bg-lnk-gray px-3 py-2 rounded transition-colors ease-linear duration-150">
                                <div className=" w-8 h-8 xs:w-6 xs:h-6 rounded-full overflow-hidden border border-lnk-dark-gray">
                                    <img
                                        className=" aspect-square rounded-full"
                                        src={!isNull(props.user) ? (props.user.url && path(props.user.url)) ?? profilePlaceholder : null}
                                        alt={!isNull(props.user) ? isNull(props.user.full_name) ? props.user.username : props.user.full_name : null}
                                    />
                                </div>
                                <p className="hidden xs:block font-medium text-sm">{!isNull(props.user) ? isNull(props.user.first_name) || isNull(props.user.last_name) ? props.user.username : props.user.first_name + ' ' + props.user.last_name : null}</p>
                            </button>
                            <NavMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                        </div>
                    </div>
                </nav>
                <ul className="max-w-[80rem] w-[90%] mx-auto pb-2 pt-4 flex xs:hidden items-center justify-between gap-3 sm:gap-5">
                    <li>
                        <Link to="/"><SiFeedly className={`${route === '/' ? 'text-lnk-orange' : null} text-xl hover:text-lnk-orange transition-colors ease-linear duration-150`} /></Link>
                    </li>
                    <li>
                        <Link to="/friends"><MdPeopleAlt className={`${route === '/friends' ? 'text-lnk-orange' : null} text-xl hover:text-lnk-orange transition-colors ease-linear duration-150`} /></Link>
                    </li>
                    <li>
                        <Link to="/chat"><IoIosChatbubbles className={`${route === '/chat' ? 'text-lnk-orange' : null} text-xl hover:text-lnk-orange transition-colors ease-linear duration-150`} /></Link>
                    </li>
                    <li>
                        <Link to="/notifications"><MdNotifications className={`${route === '/notifications' ? 'text-lnk-orange' : null} text-xl hover:text-lnk-orange transition-colors ease-linear duration-150`} /></Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Navigation