import { AiFillLike, AiOutlineComment, AiOutlineLike } from "react-icons/ai"
import { BsFillEmojiSurpriseFill } from "react-icons/bs"
import { FaHeart } from "react-icons/fa"
import { IoMdTime, IoMdClose } from "react-icons/io"
import { MdOutlineEmojiEmotions } from "react-icons/md"
import { SERVER_URL } from "../utils/axios"
import { diffInDays, isNull } from "../utils/functions"

const PostImageViewer = ({ viewPostImage, setViewPostImage, postImageView }) => {

    return (
        <section className={`fixed inset-0 z-50 grid grid-cols-[70%_1fr]`}>
            <div className="bg-lnk-dark relative overflow-hidden flex items-center justify-center">
                <button onClick={() => setViewPostImage(false)} className="absolute top-3 left-3 text-lnk-orange border border-lnk-orange p-1 rounded-full hover:bg-lnk-orange hover:text-lnk-white">
                    <IoMdClose className="" />
                </button>
                <div className=" w-[60%] h-auto">
                    <img className="w-full h-full object-contain"
                        src={!isNull(postImageView) ? SERVER_URL + postImageView.post_photos.split(',')[0] : null}
                        alt="" />
                </div>
            </div>
            <div className=" bg-lnk-white py-6 px-5">
                <div className=" flex items-start gap-2 mb-3">
                    <div className=" w-9 h-9 rounded-full overflow-hidden border border-lnk-dark-gray">
                        <img className=" w-full h-full object-cover" src='https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt="" />
                    </div>
                    <div>
                        {
                            !isNull(postImageView) ? (
                                <>
                                    <h5 className=" text-base font-bold">{postImageView.full_name ?? postImageView.username}</h5>
                                    {
                                        postImageView.headline ? <p className=" text-xs font-light">{postImageView.headline}</p> : null
                                    }
                                    <p className=" text-xs font-light">{diffInDays(postImageView.created_at)} <IoMdTime className=" inline" /></p>
                                </>
                            ) : null
                        }
                    </div>
                </div>
                <div className="mb-3">
                    <div className=" mb-1">
                        <p className=" text-sm font-light whitespace-pre-line">
                            {postImageView.content}
                        </p>
                    </div>
                </div>
                <div className=" flex items-center justify-between mb-3">
                    <div className=" flex items-center gap-2">
                        <div className="flex items-center">
                            <FaHeart className=" text-red-500" />
                            <AiFillLike className=" text-blue-500" />
                            <BsFillEmojiSurpriseFill className=" text-yellow-500" />
                        </div>
                        <p className=" text-sm">100</p>
                    </div>
                    <div>
                        <button className=" text-sm text-lnk-dark-gray hover:underline">23 comments</button>
                    </div>
                </div>
                <div className="">
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
                            <button className=" flex items-center gap-1  py-3 px-4 hover:bg-lnk-gray transition-colors ease-linear duration-150 rounded">
                                <AiOutlineComment className=" text-xl" />
                                <span>Comment</span>
                            </button>
                        </li>
                    </ul>
                </div>
                <div className={` pb-2 block`}>
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
            </div>
        </section >
    )
}

export default PostImageViewer