import { IoMdTime } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { BsFillEmojiAngryFill, BsFillEmojiSurpriseFill } from "react-icons/bs"

const Home = () => {
    return (
        <>
            <section className=" flex items-center gap-3 p-5 rounded border border-lnk-dark-gray bg-lnk-white mb-3">
                <div className=" w-12 h-12 rounded-full overflow-hidden border border-lnk-dark-gray">
                    <img className=" w-full h-full object-cover" src="https://images.pexels.com/photos/3779760/pexels-photo-3779760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                </div>
                <button className=" flex-grow text-sm border border-lnk-dark-gray p-3 rounded text-left bg-white">Start post</button>
            </section>
            <section className=" py-2 rounded border border-lnk-dark-gray bg-lnk-white">
                <div className=" flex items-start gap-2 px-5 mb-3">
                    <div className=" w-9 h-9 rounded-full overflow-hidden border border-lnk-dark-gray">
                        <img className=" w-full h-full object-cover" src="https://images.pexels.com/photos/5234256/pexels-photo-5234256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    </div>
                    <div>
                        <h5 className=" text-base font-bold">Ronel Florida</h5>
                        <p className=" text-xs font-light">Laravel Developer | IT Manager</p>
                        <p className=" text-xs font-light">12h <IoMdTime className=" inline" /></p>
                    </div>
                </div>
                <div className="mb-3">
                    <div className=" px-5 mb-1">
                        <p className=" text-sm font-light">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem</p>
                    </div>
                    <img src="https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                </div>
                <div className="px-5 flex items-center justify-between">
                    <div className=" flex items-center gap-2">
                        <div className="flex items-center">
                            <FaHeart className=" text-red-500" />
                            <AiFillLike className=" text-blue-500" />
                            <BsFillEmojiSurpriseFill className=" text-yellow-500" />
                        </div>
                        <p className=" text-sm">100</p>
                    </div>
                    <div>
                        <p className=" text-sm">23 comments</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home