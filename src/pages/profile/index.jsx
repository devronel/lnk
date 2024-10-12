import { FcAbout } from "react-icons/fc";
import { MdOutlineSignpost } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaRegImage } from "react-icons/fa";
import Post from "../../components/post";

const Profile = () => {
    return (
        <>
            <section className=" bg-lnk-white border border-lnk-gray rounded overflow-hidden mb-2">
                <div className=" relative">
                    <div className="relative h-52 w-full">
                        <img className=" w-full h-full object-cover" src="https://images.pexels.com/photos/633409/pexels-photo-633409.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                        <div className=" absolute inset-0 bg-lnk-dark opacity-50"></div>
                        <button className=" absolute top-3 text-lnk-gray right-3 border border-lnk-gray hover:bg-lnk-gray hover:text-lnk-dark p-2 rounded-full transition-colors ease-linear duration-150">
                            <FaRegImage />
                        </button>
                    </div>
                    <div className="  absolute top-28 left-5">
                        <div className="w-36 h-36 group rounded-full border border-lnk-white relative">
                            <img className="rounded-full w-full h-full object-cover" src="https://images.pexels.com/photos/3779760/pexels-photo-3779760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            <div className="bg-opacity-0 group-hover:bg-opacity-60 bg-lnk-dark absolute inset-0 rounded-full flex items-center justify-center transition-all ease-linear duration-150">
                                <button className="group-hover:block hidden text-lnk-gray text-2xl" >
                                    <FaRegImage />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" px-5 flex items-center justify-end mb-5 pt-6">
                    <button className=" text-xl hover:bg-lnk-gray p-2 rounded-full transition-colors ease-linear duration-150">
                        <CiEdit />
                    </button>
                </div>
                <div className=" px-5 pb-3">
                    <h6 className=" text-2xl font-bold">Alexia Yu</h6>
                    <p className=" text-sm font-normal ">Frontend Developer | Javascript | Laravel</p>
                    <p className=" text-xs font-light mb-1">New York City</p>
                    <button className=" text-xs font-bold text-lnk-dark-gray hover:underline">2,000 followers</button>
                </div>
            </section>
            <section className=" px-5 py-3 bg-lnk-white border border-lnk-gray rounded overflow-hidden mb-3">
                <h3 className=" text-normal font-bold mb-1 text-lnk-dark-gray">
                    <FcAbout className=" text-lg inline align-middle mr-1" />
                    <span className=" align-middle">About</span>
                </h3>
                <p className=" text-sm font-normal">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            </section>
            <div className=" flex items-center gap-3 mb-2">
                <div className="flex-grow h-[1px] bg-lnk-gray rounded"></div>
                <p className=" text-sm font-light text-lnk-dark-gray">
                    <MdOutlineSignpost className="text-sm inline align-middle mr-1" />
                    <span className=" align-middle">Latest Post</span>
                </p>
                <div className="flex-grow h-[1px] bg-lnk-gray rounded"></div>
            </div>
            <section>
                <Post />
            </section>
        </>
    )
}

export default Profile