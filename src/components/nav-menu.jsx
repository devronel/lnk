import { useState, useEffect } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi2";
import { CiLogout } from "react-icons/ci";
import { BsFillTriangleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const NavMenu = (props) => {

    const closeMenu = () => {
        props.setMenuOpen(false)
    }

    // useEffect(() => {
    //     document.addEventListener('mousedown', closeMenu)

    //     return () => {
    //         document.removeEventListener('mousedown', closeMenu);
    //     };
    // }, [])

    return (
        <div className={`${props.menuOpen ? 'block animate__fadeIn' : 'hidden'} animate__animated absolute top-12 right-0 bg-lnk-white border border-lnk-gray rounded py-2 px-1 w-40`}>
            <div className="absolute -top-[1.125rem] left-14">
                <div className="triangle-wrapper">
                    <div className="triangle"></div>
                </div>
            </div>
            <ul>
                <li>
                    <Link to='/profile' className="text-sm flex items-center gap-1 w-full pl-2 px-2 py-2 rounded hover:bg-lnk-gray transition-colors ease-linear duration-150">
                        <HiOutlineUser />
                        Profile
                    </Link>
                    <button className="text-sm flex items-center gap-1 w-full px-2 py-2 rounded hover:bg-lnk-gray transition-colors ease-linear duration-150">
                        <IoSettingsOutline />
                        Settings
                    </button>
                    <button className="text-sm flex items-center gap-1 w-full px-2 py-2 rounded hover:bg-red-100 hover:text-red-600 transition-colors ease-linear duration-150">
                        <CiLogout />
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default NavMenu