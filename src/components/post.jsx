import { useState } from "react";
import { IoMdTime } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { AiFillLike, AiOutlineLike, AiOutlineComment } from "react-icons/ai";
import { BsFillEmojiSurpriseFill } from "react-icons/bs"
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { SERVER_URL } from "../utils/axios";
import { diffInDays, isNull } from "../utils/functions";

/*
    Import assets like image and etc.
*/
import profilePlaceholder from "../assets/profile-placeholder.jpg"

const Post = ({ postId, content, fullName, username, headline, createdAt, profilPicUrl, postPhotos, showPostImage }) => {

    const [showComment, setShowComment] = useState(false)

    const commentShow = () => {
        setShowComment(true)
    }

    const postImageDisplay = () => {
        if (!isNull(postPhotos)) {

            let photos = postPhotos.split(',');

            if (photos.length === 1) {
                return (
                    <div onClick={() => showPostImage(postId)} tabindex="0" role="button" aria-pressed="true">
                        <img className="w-full h-full object-contain" src={SERVER_URL + photos[0]} alt={photos[0]} />
                    </div>
                )
            } else if (photos.length === 2) {
                return (
                    <div onClick={() => showPostImage(postId)} tabindex="0" role="button" aria-pressed="true" className="grid grid-cols-2">
                        {
                            photos.map(value => (
                                <div key={value} className=''>
                                    <img className="w-full h-full object-contain" src={SERVER_URL + value} alt={value} />
                                </div>
                            ))
                        }
                    </div>
                )
            } else if (photos.length >= 3) {

                let twoPhotos

                if (photos.length > 3) {
                    twoPhotos = photos.slice(1, 3);
                } else {
                    twoPhotos = photos.splice(1)
                }


                return (
                    <div onClick={() => showPostImage(postId)} tabindex="0" role="button" aria-pressed="true" className="grid grid-cols-2 h-full">
                        <div className='h-[300px]'>
                            <img className="w-full h-full object-cover" src={SERVER_URL + photos[0]} alt={photos[0]} />
                        </div>
                        <div className=" grid grid-cols-1 grid-rows-2 h-[300px]">
                            {
                                twoPhotos.map(value => (
                                    <div key={value} className='h-full relative'>
                                        {
                                            twoPhotos[twoPhotos.length - 1] === value && photos.length > 1 ? (
                                                <div className=" bg-lnk-dark opacity-55 absolute inset-0 flex items-center justify-center">
                                                    <p className=" text-lnk-white">{photos.length - 3} more</p>
                                                </div>) : null
                                        }
                                        <img className="w-full h-full object-cover" src={SERVER_URL + value} alt={value} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            }
            else {
                return null
            }
        } else {
            return null
        }
    }

    return (
        <section className=" pt-2 mb-3 rounded border border-lnk-gray bg-lnk-white">
            <div className=" flex items-start gap-2 px-5 mb-3">
                <div className=" w-9 h-9 rounded-full overflow-hidden border border-lnk-dark-gray">
                    <img className=" w-full h-full object-cover" src={!isNull(profilPicUrl) ? (SERVER_URL + profilPicUrl) : profilePlaceholder} alt="" />
                </div>
                <div>
                    <h5 className=" text-base font-bold">{isNull(fullName) ? username : fullName}</h5>
                    <p className=" text-xs font-light">{headline}</p>
                    <p className=" text-xs font-light">{diffInDays(createdAt)} <IoMdTime className=" inline" /></p>
                </div>
            </div>
            <div className="mb-3">
                <div className=" px-5 mb-1">
                    <p className=" text-sm font-light whitespace-pre-line">{content}</p>
                </div>
                {
                    postImageDisplay()
                }
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