import { useState } from "react";
import { IoMdTime } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { AiFillLike, AiOutlineLike, AiOutlineComment } from "react-icons/ai";
import { BsFillEmojiSurpriseFill } from "react-icons/bs"
import { MdOutlineEmojiEmotions } from "react-icons/md";

const Post = ({ content }) => {

    const [showComment, setShowComment] = useState(false)

    const commentShow = () => {
        setShowComment(true)
    }

    return (
        <section className=" pt-2 mb-3 rounded border border-lnk-gray bg-lnk-white">
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
                    <p className=" text-sm font-light whitespace-pre-line">{content}</p>
                </div>
                <img src="https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            </div>
            <div className="px-5 flex items-center justify-between mb-3">
                <div className=" flex items-center gap-2">
                    <div className="flex items-center">
                        <FaHeart className=" text-red-500" />
                        <AiFillLike className=" text-blue-500" />
                        <BsFillEmojiSurpriseFill className=" text-yellow-500" />
                    </div>
                    <p className=" text-sm">100</p>
                </div>
                <div>
                    <button onClick={commentShow} className=" text-sm text-lnk-dark-gray hover:underline">23 comments</button>
                </div>
            </div>
            <div className="px-5">
                <ul className=" flex items-center gap-5 py-2 border-t border-lnk-gray">
                    <li className="relative group">
                        <button className=" flex items-center gap-1 py-3 px-4 hover:bg-lnk-gray transition-colors ease-linear duration-150 rounded">
                            <AiOutlineLike className=" text-xl" />
                            <span>React</span>
                        </button>
                        <div className="animate__animated animate__fadeIn absolute -top-12 hidden pb-2 opacity-0 group-hover:block group-hover:opacity-100  transition-all ease-linear duration-150">
                            <div className=" bg-lnk-white border border-lnk-gray p-3 flex items-center gap-5 rounded ">
                                <button className=" hover:-translate-y-1 transition-transform ease-linear duration-150">
                                    <FaHeart className=" text-red-500 text-xl" />
                                </button>
                                <button className=" hover:-translate-y-1 transition-transform ease-linear duration-150">
                                    <AiFillLike className=" text-blue-500 text-xl" />
                                </button>
                                <button className=" hover:-translate-y-1 transition-transform ease-linear duration-150">
                                    <BsFillEmojiSurpriseFill className=" text-yellow-500 text-xl" />
                                </button>
                            </div>
                        </div>
                    </li>
                    <li>
                        <button onClick={commentShow} className=" flex items-center gap-1  py-3 px-4 hover:bg-lnk-gray transition-colors ease-linear duration-150 rounded">
                            <AiOutlineComment className=" text-xl" />
                            <span>Comment</span>
                        </button>
                    </li>
                </ul>
            </div>
            <div className={`px-5 pb-2 ${showComment ? 'block' : 'hidden'}`}>
                <div className=" flex items-center gap-2 mb-5">
                    <div className=" w-9 h-9 rounded-full overflow-hidden border border-lnk-dark-gray">
                        <img className=" w-full h-full rounded-full object-cover" src="https://images.pexels.com/photos/3779760/pexels-photo-3779760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    </div>
                    <div className=" flex-grow relative">
                        <input className="w-full outline-none font-ubuntu focus:outline focus:outline-lnk-dark-gray text-sm border border-lnk-gray p-2 pr-7 rounded text-left bg-white" placeholder="Leave a comment" />
                        <MdOutlineEmojiEmotions className="text-lg text-lnk-dark-gray absolute top-1/2 -translate-y-1/2 right-2" />
                    </div>
                </div>
                <div>
                    <div className=" mb-5">
                        <div className=" flex items-start gap-2 mb-2">
                            <div className=" w-7 h-7 rounded-full overflow-hidden border border-lnk-dark-gray">
                                <img className=" w-full h-full rounded-full object-cover" src="https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                            </div>
                            <div>
                                <p className=" text-sm">Kevin Caluag</p>
                                <p className=" text-xs font-light">Sr Software Engineer</p>
                            </div>
                        </div>
                        <div className=" pl-9">
                            <p className=" text-sm">Hey, that's great, keep up the good work!</p>
                        </div>
                    </div>
                    <div className=" mb-5">
                        <div className=" flex items-start gap-2 mb-2">
                            <div className=" w-7 h-7 rounded-full overflow-hidden border border-lnk-dark-gray">
                                <img className=" w-full h-full rounded-full object-cover" src="https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                            </div>
                            <div>
                                <p className=" text-sm">Kevin Caluag</p>
                                <p className=" text-xs font-light">Sr Software Engineer</p>
                            </div>
                        </div>
                        <div className=" pl-9">
                            <p className=" text-sm">Hey, that's great, keep up the good work!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Post