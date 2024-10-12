import { FaUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi2";
import { CiLogout } from "react-icons/ci";

const NavMenu = (props) => {
    return (
        <div className={`${props.menuOpen ? 'block' : 'hidden'} absolute top-12 right-0 bg-lnk-white border border-lnk-gray rounded py-2 px-1 w-32`}>
            <ul>
                <li>
                    <button className="text-sm flex items-center gap-1 w-full pl-2 px-2 py-2 rounded hover:bg-lnk-gray transition-colors ease-linear duration-150">
                        <HiOutlineUser />
                        Profile
                    </button>
                    <button className="text-sm flex items-center gap-1 w-full px-2 py-2 rounded hover:bg-lnk-gray transition-colors ease-linear duration-150">
                        <IoSettingsOutline />
                        Settings
                    </button>
                    <button className="text-sm flex items-center gap-1 w-full px-2 py-2 rounded hover:bg-lnk-gray transition-colors ease-linear duration-150">
                        <CiLogout />
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default NavMenu