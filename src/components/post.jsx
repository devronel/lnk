import { useState } from "react";
import { Link } from "react-router-dom";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isNull, capitalize } from 'lodash'
import axiosInstance from "../utils/axios";
import TiptopView from "./wysiwyg/TiptopView";
import { FaHeart, FaGlobeAsia } from "react-icons/fa";
import { AiFillLike, AiOutlineLike, AiOutlineComment } from "react-icons/ai";
import { BsFillEmojiSurpriseFill } from "react-icons/bs"
import { GrSend } from "react-icons/gr";
import { TbSquareChevronLeft, TbSquareChevronRight } from "react-icons/tb";
import { MdOutlineCommentsDisabled } from "react-icons/md";
import { diffInDays, path } from "../utils/functions";

/*
    Import assets like image and etc.
*/
import profilePlaceholder from "../assets/profile-placeholder.jpg"
import PostReaction from "./post-reactions";

const Post = ({ postId, authUserProfile, content, fullName, username, headline, createdAt, profilPicUrl, postFiles, postReactions, isReact, reactionCount, commentCount }) => {

    const queryClient = useQueryClient()
    const [showComment, setShowComment] = useState(false)
    const [comment, setComment] = useState('')
    const [commentPage, setCommentPage] = useState(0)

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
                    <Link to={`/post-image/${postId}/${username}`} className="grid grid-cols-2 h-full">
                        <div className='h-[300px]'>
                            <img className="w-full h-full object-cover" src={path(postImages[0].url)} alt={postImages[0].filename} />
                        </div>
                        <div className=" grid grid-cols-1 grid-rows-2 h-[300px]">
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
                    <AiFillLike className="text-blue-500" />
                    <span className="text-blue-500 font-medium">{capitalize(isReact)}</span>
                </>
            )
        }
        else if (isReact === 'heart') {
            return (
                <>
                    <FaHeart className="text-red-500" />
                    <span className="text-red-500 font-medium">{capitalize(isReact)}</span>
                </>
            )
        }
        else {
            return (
                <>
                    <BsFillEmojiSurpriseFill className="text-yellow-500" />
                    <span className="text-yellow-500 font-medium">{capitalize(isReact)}</span>
                </>
            )
        }
    }

    const likePost = async (reaction) => {
        likePostMutation.mutate({ postId: postId, reaction: reaction })
    }

    const likePostMutation = useMutation({
        mutationFn: async (reaction) => {
            let result = await axiosInstance.post(`/post/like/${reaction.postId}/${reaction.reaction}`, {}, {
                withCredentials: true
            })

            if (result.data.success) {
                return result
            }
        },
        onSuccess: async () => {
            queryClient.invalidateQueries(['posts'])
        },
        onError: (error) => {
            console.log(error.message)
        }
    })

    /*
        Comment functions
    */
    const getComment = (e) => {
        setComment(e.target.value)
    }

    const postCommentMutation = useMutation({
        mutationFn: async (data) => {

            let result = await axiosInstance.post('/post/send/comment', {
                post_id: data.postId,
                comment_value: data.comment
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (result.data.success) {
                return result
            }

        },
        onSuccess: () => {
            setComment('')
            queryClient.invalidateQueries({
                queryKey: ['comments', postId]
            })
        },
        onError: (error) => {
            console.log(error.message)
        }
    })

    const sendComment = () => {
        postCommentMutation.mutate({ postId: postId, comment: comment })
    }

    const fetchAllComment = async () => {
        setShowComment(true)
    }

    const { data, isPlaceholderData } = useQuery({
        queryKey: ['comments', postId, commentPage],
        queryFn: async () => {
            let result = await axiosInstance.get(`/post/comment/list?post_id=${postId}&page=${commentPage}&limit=${4}`, {
                withCredentials: true
            })

            if (result.data.success) {
                return result.data.payload
            }
        },
        placeholderData: keepPreviousData,
        enabled: showComment
    })

    return (
        <section className=" pt-2 mb-3 rounded border border-lnk-gray bg-lnk-white">
            <div className=" flex items-start gap-2 px-5 mb-4">
                <div className=" w-9 h-9 rounded-full overflow-hidden border border-lnk-dark-gray">
                    <img className=" w-full h-full object-cover" src={!isNull(profilPicUrl) ? path(profilPicUrl) : profilePlaceholder} alt="" />
                </div>
                <div>
                    <h5 className=" text-base font-bold">{isNull(fullName) ? username : fullName}</h5>
                    <p className=" text-xs font-light">{headline}</p>
                    <p className=" text-xs font-light text-lnk-dark-gray">
                        <span className="inline-block">{diffInDays(createdAt)}</span>
                        <FaGlobeAsia className=" inline-block align-middle ml-1" />
                    </p>
                </div>
            </div>
            <div className="mb-4">
                <div className=" px-5 mb-1">
                    {/* <p className=" text-sm font-light whitespace-pre-line">{content}</p> */}
                    <TiptopView content={content} />
                </div>
                {
                    postImageDisplay()
                }
            </div>
            <div className="px-5 flex items-center justify-between mb-2">
                <PostReaction postReactions={postReactions} reactionCount={reactionCount} />
                <div>
                    <button onClick={fetchAllComment} className=" text-xs text-lnk-dark-gray hover:underline">
                        {
                            isNull(commentCount) ? 'No comment' : `${commentCount} ${commentCount > 1 ? 'comments' : 'comment'}`
                        }
                    </button>
                </div>
            </div>
            <div className="px-5">
                <ul className=" flex items-center gap-5 py-1 border-t border-lnk-gray">
                    <li className="relative group">
                        <button className="text-sm flex items-center gap-1 py-2 px-4 hover:bg-lnk-gray transition-colors ease-linear duration-150 rounded">
                            {
                                isNull(isReact) ? (
                                    <>
                                        <AiOutlineLike className="" />
                                        <span>React</span>

                                    </>
                                ) : userReaction()
                            }
                        </button>
                        <div className="animate__animated animate__fadeIn absolute -top-12 z-10 hidden pb-2 opacity-0 group-hover:block group-hover:opacity-100  transition-all ease-linear duration-150">
                            <div className=" bg-lnk-white border border-lnk-gray p-3 flex items-center gap-5 rounded ">
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
                        <button onClick={fetchAllComment} className="text-sm flex items-center gap-1  py-2 px-4 hover:bg-lnk-gray transition-colors ease-linear duration-150 rounded">
                            <AiOutlineComment className="" />
                            <span>Comment</span>
                        </button>
                    </li>
                </ul>
            </div>
            <div className={`px-5 pb-2 mt-2 ${showComment ? 'block' : 'hidden'}`}>
                <div className=" flex items-center gap-2 mb-5">
                    <div className=" w-9 h-9 rounded-full overflow-hidden border border-lnk-dark-gray">
                        <img className=" w-full h-full rounded-full object-cover" src={isNull(authUserProfile) ? profilePlaceholder : path(authUserProfile)} alt="" />
                    </div>
                    <div className=" flex-grow relative">
                        <input onChange={getComment} value={comment} name={`comment_post_${postId}`} className="w-full outline-none font-ubuntu focus:outline focus:outline-lnk-dark-gray text-sm border border-lnk-gray p-2 pr-7 rounded text-left bg-white" placeholder="Leave a comment" />
                        <button onClick={sendComment} className=" group">
                            <GrSend className="text-base text-lnk-dark-gray absolute top-1/2 -translate-y-1/2 right-2 group-hover:text-lnk-orange transition" />
                        </button>
                    </div>
                </div>
                <div>
                    {
                        data?.result.length > 0 ? (
                            data.result.map(value => (
                                <div key={value.id} className=" mb-5">
                                    <div className=" flex items-center gap-2 mb-2">
                                        <div className=" w-7 h-7 rounded-full overflow-hidden border border-lnk-dark-gray">
                                            <img className=" w-full h-full rounded-full object-cover" src={isNull(value.profile_photo_url) ? profilePlaceholder : path(value.profile_photo_url)} alt={value.full_name} />
                                        </div>
                                        <div>
                                            <p className=" text-xs">{value.full_name}</p>
                                            {
                                                !isNull(value.headline) ? (
                                                    <p className=" text-[10px] font-light">{value.headline}</p>
                                                ) : null
                                            }
                                        </div>
                                    </div>
                                    <div className=" pl-9">
                                        <div className="border border-lnk-gray py-1 rounded-md px-2">
                                            <p className=" text-xs font-bold">{value.comment}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className=" text-center text-sm text-lnk-dark-gray flex items-center justify-center gap-1">
                                <MdOutlineCommentsDisabled className=" text-base" />
                                No comment available
                            </p>

                        )
                    }
                    <div className=" flex items-center justify-end">
                        <button
                            onClick={() => setCommentPage((old) => Math.max(old - 4, 0))}
                            disabled={commentPage === 0}
                        >
                            <TbSquareChevronLeft className={`text-2xl ${commentPage === 0 ? 'text-lnk-gray' : 'hover:text-lnk-orange'}`} />
                        </button>
                        <button
                            onClick={() => {
                                if (!isPlaceholderData && !isNull(data.next_page)) {
                                    setCommentPage((old) => old + 4)
                                }
                            }}
                            disabled={isPlaceholderData || isNull(data?.next_page)}
                        >
                            <TbSquareChevronRight className={`text-2xl ${isNull(data?.next_page) ? 'text-lnk-gray' : 'hover:text-lnk-orange'}`} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Post