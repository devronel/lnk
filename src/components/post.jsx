import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isNull, capitalize, debounce } from 'lodash'
import axiosInstance from "../utils/axios";
import TiptopView from "./wysiwyg/TiptopView";
import { FaHeart, FaGlobeAsia, FaRegComment } from "react-icons/fa";
import { AiFillLike, AiOutlineLike, AiOutlineComment } from "react-icons/ai";
import { BsFillEmojiSurpriseFill } from "react-icons/bs"
import { diffInDays, path } from "../utils/functions";

/*
    Import assets like image and etc.
*/
import profilePlaceholder from "../assets/profile-placeholder.jpg"
import PostReaction from "./postReactions";
import toast from "react-hot-toast";
import PostComments from "./postComments";
import wowIcon from '../assets/icons/wow.png'
import likeIcon from '../assets/icons/like.png'
import heartIcon from '../assets/icons/heart.png'

const Post = ({ postId, authUserProfile, content, fullName, username, headline, createdAt, profilPicUrl, postFiles, postReactions, isReact, reactionCount, commentCount }) => {

    const queryClient = useQueryClient()
    const [showComment, setShowComment] = useState(false)
    const [isShowReactionIcon, setIsShowReactionIcon] = useState(false)

    /*
        Post images display
    */
    const postImageDisplay = () => {

        if (!isNull(postFiles)) {

            let postImages = JSON.parse(postFiles)

            if (postImages.length === 1) {
                return (
                    <Link to={`/post-image/${postId}/${username}`} className="block bg-lnk-gray p-1 h-[18.75rem]">
                        <div className="w-full h-full">
                            <img
                                className="w-full h-full object-contain"
                                src={path(postImages[0].url)}
                                alt={postImages[0].filename}
                            />
                        </div>
                    </Link>
                )
            } else if (postImages.length === 2) {
                return (
                    <Link to={`/post-image/${postId}/${username}`} className="grid grid-cols-2">
                        {
                            postImages.map(value => (
                                <div key={value.id} className='bg-lnk-gray p-1'>
                                    <div className=" w-full h-full">
                                        <img
                                            className="w-full h-full object-contain"
                                            src={path(value.url)}
                                            alt={value.filename}
                                        />
                                    </div>
                                </div>
                            ))
                        }
                    </Link>
                )
            } else if (postImages.length >= 3) {

                let twoPhotos

                if (postImages.length > 3) {
                    twoPhotos = postImages.slice(1, 3);
                } else {
                    twoPhotos = postImages.splice(1)
                }

                return (
                    <Link to={`/post-image/${postId}/${username}`} className="grid grid-cols-2 gap-1 h-full">
                        <div className=''>
                            <img className="aspect-square object-cover" src={path(postImages[0].url)} alt={postImages[0].filename} />
                        </div>
                        <div className=" grid grid-cols-1 grid-rows-2 gap-1 aspect-square">
                            {
                                twoPhotos.map(value => (
                                    <div key={value.id} className='h-full relative'>
                                        {
                                            twoPhotos[twoPhotos.length - 1] === value && postImages.length > 1 ? (
                                                <div className=" bg-lnk-dark opacity-55 absolute inset-0 flex items-center justify-center">
                                                    <p className=" text-lnk-white">{postImages.length - 3} more</p>
                                                </div>) : null
                                        }
                                        <img
                                            className="w-full h-full object-cover"
                                            src={path(value.url)}
                                            alt={value.filename}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </Link>
                )
            }
            else {
                return null
            }
        } else {
            return null
        }
    }

    /*
        Display user reaction for current authenticated user
    */
    const userReaction = () => {
        if (isReact === 'like') {
            return (
                <>
                    <img width={20} height={20} src={likeIcon} alt="Like icon" />
                    <span className="text-blue-500 font-bold">{capitalize(isReact)}</span>
                </>
            )
        }
        else if (isReact === 'heart') {
            return (
                <>
                    <img width={20} height={20} src={heartIcon} alt="Heart icon" />
                    <span className="text-red-500 font-bold">{capitalize(isReact)}</span>
                </>
            )
        }
        else if (isReact === 'wow') {
            return (
                <>
                    <img width={16} height={16} src={wowIcon} alt="Wow icon" />
                    <span className="text-yellow-500 font-bold">{capitalize(isReact)}</span>
                </>
            )
        } else {
            return (
                <>
                    <AiOutlineLike className="" />
                    <span>React</span>
                </>
            )
        }
    }

    const handleShowReactionIcon = debounce(() => setIsShowReactionIcon(true), 100)
    const handleHideReactionIcon = debounce(() => setIsShowReactionIcon(false), 100)

    const likePost = async (reaction) => {
        likePostMutation.mutate({ postId: postId, reaction: reaction })
    }

    const likePostMutation = useMutation({
        mutationFn: async (reaction) => {
            let result = await axiosInstance.post(`/post/like/${reaction.postId}/${reaction.reaction}`, {}, {
                withCredentials: true
            })
            setIsShowReactionIcon(false)
            if (result.status === 200) {
                return result
            }
        },
        onSuccess: async () => {
            queryClient.invalidateQueries(['posts'])
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })

    const fetchAllComment = async () => {
        setShowComment(true)
    }

    return (
        <section className=" pt-3 sm:pt-2 mb-4 xs:mb-3 rounded shadow px-2 sm:px-0 sm:border sm:border-lnk-gray sm:bg-lnk-white">
            <div className=" flex items-start gap-2 sm:px-5 pt-3 mb-4">
                <div className=" w-9 h-9 rounded-full overflow-hidden border border-lnk-dark-gray">
                    <img className=" w-full h-full object-cover" src={!isNull(profilPicUrl) ? path(profilPicUrl) : profilePlaceholder} alt="" />
                </div>
                <div>
                    <Link to={`/profile-info/${username}`} className=" text-base font-bold hover:underline">{isNull(fullName) ? username : fullName}</Link>
                    <p className=" text-xs font-light">{headline}</p>
                    <p className=" text-xs font-light text-lnk-dark-gray">
                        <span className="inline-block">{diffInDays(createdAt)}</span>
                        <FaGlobeAsia className=" inline-block align-middle ml-1" />
                    </p>
                </div>
            </div>
            <div className="mb-4">
                <div className=" sm:px-5 mb-1">
                    <TiptopView content={content} />
                </div>
                {
                    postImageDisplay()
                }
            </div>
            <div className="sm:px-5 flex items-center justify-between mb-2">
                <PostReaction postReactions={postReactions} reactionCount={reactionCount} />
                <div>
                    <button onClick={fetchAllComment} className=" text-xs text-lnk-dark-gray hover:underline">
                        {
                            isNull(commentCount) ? '0 Comment' : `${commentCount} ${commentCount > 1 ? 'Comments' : 'Comment'}`
                        }
                    </button>
                </div>
            </div>
            <div className="sm:px-5">
                <ul className=" flex items-center gap-5 py-1 border-t border-lnk-gray">
                    <li onMouseEnter={handleShowReactionIcon} onMouseLeave={handleHideReactionIcon} tabIndex={0} className="relative group">
                        <button onTouchStart={handleShowReactionIcon} onTouchEnd={isShowReactionIcon ? handleHideReactionIcon : handleShowReactionIcon} className="text-sm flex items-center gap-1 py-1 sm:py-2 px-2 sm:px-4 hover:bg-lnk-gray transition-colors ease-linear duration-150 rounded">
                            {userReaction()}
                        </button>
                        <div className={`${isShowReactionIcon ? 'block' : 'hidden'} animate__animated animate__fadeIn absolute -top-11 z-10 pb-2 opacity-0 group-hover:opacity-100  transition-all ease-linear duration-150`}>
                            <div className=" bg-lnk-white border border-lnk-gray p-2 flex items-center gap-5 rounded-3xl shadow">
                                <button onClick={() => likePost('heart')} className=" hover:-translate-y-1 transition-transform ease-linear duration-150">
                                    <FaHeart className=" text-red-500 text-xl" />
                                </button>
                                <button onClick={() => likePost('like')} className=" hover:-translate-y-1 transition-transform ease-linear duration-150">
                                    <AiFillLike className=" text-blue-500 text-xl" />
                                </button>
                                <button onClick={() => likePost('wow')} className=" hover:-translate-y-1 transition-transform ease-linear duration-150">
                                    <BsFillEmojiSurpriseFill className=" text-yellow-500 text-xl" />
                                </button>
                            </div>
                        </div>
                    </li>
                    <li>
                        <button onClick={fetchAllComment} className="text-sm flex items-center gap-1 py-1 sm:py-2 px-2 sm:px-4 hover:bg-lnk-gray transition-colors ease-linear duration-150 rounded">
                            <FaRegComment className="" />
                            <span>Comment</span>
                        </button>
                    </li>
                </ul>
            </div>
            <div className={`sm:px-5 pb-2 mt-2 ${showComment ? 'block' : 'hidden'}`}>
                <PostComments postId={postId} isShowComment={showComment} authUserProfile={authUserProfile} />
            </div>
        </section>
    )
}

export default Post