import { Link } from "react-router-dom";
import { MdDynamicFeed, MdNotifications, MdChat } from "react-icons/md";

const Navigation = () => {
    return (
        <>
            <div className="py-3 shadow-bottom">
                <nav className="max-w-[80rem] w-[90%] mx-auto flex items-center justify-between">
                    <Link to="/" className=" font-bold text-lg text-lnk-orange">Lnk</Link>
                    <div className=" flex items-center gap-8">
                        <ul className=" flex items-center gap-8">
                            <li>
                                <Link to="/"><MdDynamicFeed className=" text-lg hover:text-lnk-orange transition-colors ease-linear duration-150" /></Link>
                            </li>
                            <li>
                                <Link to="/"><MdChat className=" text-lg hover:text-lnk-orange transition-colors ease-linear duration-150" /></Link>
                            </li>
                            <li>
                                <Link to="/"><MdNotifications className=" text-lg hover:text-lnk-orange transition-colors ease-linear duration-150" /></Link>
                            </li>
                        </ul>
                        <span className=" block w-[2px] h-5 bg-lnk-dark-gray rounded"></span>
                        <div className=" flex items-center gap-3">
                            <div className=" w-7 h-7 rounded-full overflow-hidden border border-lnk-dark-gray">
                                <img className="w-full h-full object-cover" src="https://images.pexels.com/photos/3779760/pexels-photo-3779760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            </div>
                            <p className=" font-medium text-sm">Alexia Yu</p>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navigation