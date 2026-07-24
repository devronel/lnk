import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isNull, capitalize, debounce } from 'lodash'
import ReactMarkdown from 'react-markdown';
import axiosInstance from "../utils/axios";
import TiptopView from "./wysiwyg/TiptopView";
import { FaHeart, FaGlobeAsia, FaRegComment } from "react-icons/fa";
import { AiFillLike, AiOutlineLike, AiOutlineComment } from "react-icons/ai";
import { BsFillEmojiSurpriseFill } from "react-icons/bs"
import { diffInDays, path } from "../utils/functions";

// --- Import assets like image and etc. ---
import profilePlaceholder from "../assets/profile-placeholder.jpg"
import PostReaction from "./postReactions";
import toast from "react-hot-toast";
import PostComments from "./postComments";
import wowIcon from '../assets/icons/wow.png'
import likeIcon from '../assets/icons/like.png'
import heartIcon from '../assets/icons/heart.png'

const REACTION_CONFIG = {
  like: {
    icon: likeIcon,
    labelClass: 'font-bold text-blue-500',
    alt: 'Like icon',
    size: 20,
  },
  heart: {
    icon: heartIcon,
    labelClass: 'font-bold text-red-500',
    alt: 'Heart icon',
    size: 20,
  },
  wow: {
    icon: wowIcon,
    labelClass: 'font-bold text-yellow-500',
    alt: 'Wow icon',
    size: 20,
  },
};

const Post = ({ post }) => {

    const queryClient = useQueryClient()
    const [showComment, setShowComment] = useState(false)
    const [isShowReactionIcon, setIsShowReactionIcon] = useState(false)

    //  --- Post images display ---
    // const postImageDisplay = () => {

    //     if (!isNull(post.files)) {

    //         let postImages = []

    //         if (postImages.length === 1) {
    //             return (
    //                 <Link to={`/post-image/${post.id}/${post.username}`} className="block bg-lnk-gray p-1 h-[18.75rem]">
    //                     <div className="w-full h-full">
    //                         <img
    //                             className="object-contain w-full h-full"
    //                             src={path(postImages[0].url)}
    //                             alt={postImages[0].filename}
    //                         />
    //                     </div>
    //                 </Link>
    //             )
    //         } else if (postImages.length === 2) {
    //             return (
    //                 <Link to={`/post-image/${post.id}/${post.username}`} className="grid grid-cols-2">
    //                     {
    //                         postImages.map(value => (
    //                             <div key={value.id} className='p-1 bg-lnk-gray'>
    //                                 <div className="w-full h-full ">
    //                                     <img
    //                                         className="object-contain w-full h-full"
    //                                         src={path(value.url)}
    //                                         alt={value.filename}
    //                                     />
    //                                 </div>
    //                             </div>
    //                         ))
    //                     }
    //                 </Link>
    //             )
    //         } else if (postImages.length >= 3) {

    //             let twoPhotos

    //             if (postImages.length > 3) {
    //                 twoPhotos = postImages.slice(1, 3);
    //             } else {
    //                 twoPhotos = postImages.splice(1)
    //             }

    //             return (
    //                 <Link to={`/post-image/${postId}/${username}`} className="grid h-full grid-cols-2 gap-1">
    //                     <div className=''>
    //                         <img className="object-cover aspect-square" src={path(postImages[0].url)} alt={postImages[0].filename} />
    //                     </div>
    //                     <div className="grid grid-cols-1 grid-rows-2 gap-1 aspect-square">
    //                         {
    //                             twoPhotos.map(value => (
    //                                 <div key={value.id} className='relative h-full'>
    //                                     {
    //                                         twoPhotos[twoPhotos.length - 1] === value && postImages.length > 1 ? (
    //                                             <div className="absolute inset-0 flex items-center justify-center bg-lnk-dark opacity-55">
    //                                                 <p className=" text-lnk-white">{postImages.length - 3} more</p>
    //                                             </div>) : null
    //                                     }
    //                                     <img
    //                                         className="object-cover w-full h-full"
    //                                         src={path(value.url)}
    //                                         alt={value.filename}
    //                                     />
    //                                 </div>
    //                             ))
    //                         }
    //                     </div>
    //                 </Link>
    //             )
    //         }
    //         else {
    //             return null
    //         }
    //     } else {
    //         return null
    //     }
    // }

    // --- Display user reaction for current authenticated user ---
    const userReaction = () => {
        const currentReaction = post.user_reaction;
        const config = REACTION_CONFIG[currentReaction];

        if (!config) {
            return (
                <>
                    <AiOutlineLike />
                    <span>React</span>
                </>
            );
        }

        return (
            <>
                <img
                    width={config.size}
                    height={config.size}
                    src={config.icon}
                    alt={config.alt}
                />
                <span className={config.labelClass}>
                    {capitalize(currentReaction)}
                </span>
            </>
        );
    }

    const handleShowReactionIcon = debounce(() => setIsShowReactionIcon(true), 100)
    const handleHideReactionIcon = debounce(() => setIsShowReactionIcon(false), 100)

    const likePost = async (reaction) => {
        likePostMutation.mutate({ postId: post.id, reaction: reaction })
    }

    const likePostMutation = useMutation({
        mutationFn: async (reaction) => {
            const response = await axiosInstance.post(
                `/post/${reaction.postId}/reactions`, 
                { type: reaction.reaction },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            setIsShowReactionIcon(false)
            if (response.data.success) {
                return response
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
        <section className="px-2 pt-3 mb-4 rounded shadow sm:pt-2 xs:mb-3 sm:px-0 sm:border sm:border-lnk-gray sm:bg-lnk-white">
            <div className="flex items-start gap-2 pt-3 mb-4 sm:px-5">
                <div className="overflow-hidden border rounded-full w-9 h-9 border-lnk-dark-gray">
                    <img className="object-cover w-full h-full" src={post.user?.avatar_url ?? profilePlaceholder} alt="" />
                </div>
                <div>
                    <Link to={`/`} className="text-base font-bold hover:underline">
                        { post.user.full_name ?? post.user.username }
                    </Link>
                    <p className="text-xs font-light ">{ post.user?.headline }</p>
                    <p className="text-xs font-light text-lnk-dark-gray">
                        <span className="inline-block">{diffInDays(post.created_at)}</span>
                        <FaGlobeAsia className="inline-block ml-1 align-middle " />
                    </p>
                </div>
            </div>
            <div className="mb-4">
                <div className="mb-1 sm:px-5">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
            </div>
            <div className="flex items-center justify-between mb-2 sm:px-5">
                <PostReaction postReactions={post.reactions} reactionCount={post.total_reactions} />
                <div>
                    <button onClick={fetchAllComment} className="text-xs text-lnk-dark-gray hover:underline">
                        0 Comment
                    </button>
                </div>
            </div>
            <div className="sm:px-5">
                <ul className="flex items-center gap-5 py-1 border-t border-lnk-gray">
                    <li onMouseEnter={handleShowReactionIcon} onMouseLeave={handleHideReactionIcon} tabIndex={0} className="relative group">
                        <button onTouchStart={handleShowReactionIcon} onTouchEnd={isShowReactionIcon ? handleHideReactionIcon : handleShowReactionIcon} className="flex items-center gap-1 px-2 py-1 text-sm transition-colors duration-150 ease-linear rounded sm:py-2 sm:px-4 hover:bg-lnk-gray">
                            {userReaction()}
                        </button>
                        <div className={`${isShowReactionIcon ? 'block' : 'hidden'} animate__animated animate__fadeIn absolute -top-11 z-10 pb-2 opacity-0 group-hover:opacity-100  transition-all ease-linear duration-150`}>
                            <div className="flex items-center gap-5 p-2 border shadow bg-lnk-white border-lnk-gray rounded-3xl">
                                <button onClick={() => likePost('heart')} className="transition-transform duration-150 ease-linear hover:-translate-y-1">
                                    <FaHeart className="text-xl text-red-500 " />
                                </button>
                                <button onClick={() => likePost('like')} className="transition-transform duration-150 ease-linear hover:-translate-y-1">
                                    <AiFillLike className="text-xl text-blue-500 " />
                                </button>
                                <button onClick={() => likePost('wow')} className="transition-transform duration-150 ease-linear hover:-translate-y-1">
                                    <BsFillEmojiSurpriseFill className="text-xl text-yellow-500 " />
                                </button>
                            </div>
                        </div>
                    </li>
                    <li>
                        <button onClick={fetchAllComment} className="flex items-center gap-1 px-2 py-1 text-sm transition-colors duration-150 ease-linear rounded sm:py-2 sm:px-4 hover:bg-lnk-gray">
                            <FaRegComment className="" />
                            <span>Comment</span>
                        </button>
                    </li>
                </ul>
            </div>
            <div className={`sm:px-5 pb-2 mt-2 ${showComment ? 'block' : 'hidden'}`}>
                <PostComments postId={post.id} isShowComment={showComment} authUserProfile={post.user.avatar_url} />
            </div>
        </section>
    )
}

export default Post