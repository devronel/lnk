import { useEffect, useState } from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IoMdTime } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { AiFillLike, AiOutlineLike, AiOutlineComment } from "react-icons/ai";
import { BsFillEmojiSurpriseFill } from "react-icons/bs"
import { GrSend } from "react-icons/gr";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import axiosInstance, { SERVER_URL } from "../utils/axios";
import { diffInDays, isNull } from "../utils/functions";

/*
    Import assets like image and etc.
*/
import profilePlaceholder from "../assets/profile-placeholder.jpg"

const Post = ({ postId, content, fullName, username, headline, createdAt, profilPicUrl, postFiles, showPostImage, postReactions, isReact, reactionCount }) => {

    const queryClient = useQueryClient()
    const [showComment, setShowComment] = useState(false)
    const [comment, setComment] = useState(null)
    const [commentList, setCommentList] = useState([])

    // const commentShow = () => {
    //     setShowComment(true)
    // }

    /*
        Post images display
    */
    const postImageDisplay = () => {

        if (!isNull(postFiles)) {

            let postImages = JSON.parse(postFiles)

            if (postImages.length === 1) {
                return (
                    <div onClick={() => showPostImage(postId)} tabIndex="0" role="button" aria-pressed="true">
                        <img
                            className="w-full h-full object-contain"
                            src={SERVER_URL + postImages[0].url}
                            alt={postImages[0].filename}
                        />
                    </div>
                )
            } else if (postImages.length === 2) {
                return (
                    <div onClick={() => showPostImage(postId)} tabIndex="0" role="button" aria-pressed="true" className="grid grid-cols-2">
                        {
                            postImages.map(value => (
                                <div key={value.id} className=''>
                                    <img
                                        className="w-full h-full object-contain"
                                        src={SERVER_URL + value.url}
                                        alt={value.filename}
                                    />
                                </div>
                            ))
                        }
                    </div>
                )
            } else if (postImages.length >= 3) {

                let twoPhotos

                if (postImages.length > 3) {
                    twoPhotos = postImages.slice(1, 3);
                } else {
                    twoPhotos = postImages.splice(1)
                }

                return (
                    <div onClick={() => showPostImage(postId)} tabIndex="0" role="button" aria-pressed="true" className="grid grid-cols-2 h-full">
                        <div className='h-[300px]'>
                            <img className="w-full h-full object-cover" src={SERVER_URL + postImages[0].url} alt={postImages[0].filename} />
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
                                            src={SERVER_URL + value.url}
                                            alt={value.filename}
                                        />
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

    /*
        Display react and count
    */
    const postReaction = () => {

        if (!isNull(postReactions)) {

            let reaction = postReactions.split(',')
            let reactions = []

            reaction.map(value => {
                if (value === 'heart') reactions.push(<FaHeart className="text-red-500 text-sm" />)
                if (value === 'like') reactions.push(<AiFillLike className="text-blue-500 text-sm" />)
                if (value === 'wow') reactions.push(<BsFillEmojiSurpriseFill className="text-yellow-500 text-sm" />)
            })

            return (
                <div className=" flex items-center gap-1">
                    <div className="flex items-center">
                        {
                            reactions.map((icon, index) => (
                                <div key={index}>
                                    {icon}
                                </div>
                            ))
                        }
                    </div>
                    <p className=" text-xs">{reactionCount}</p>
                </div>
            )


        } else {
            return <p className=" text-xs">No one react to this post.</p>
        }

    }

    /*
        Display reaction icon
    */
    const userReaction = () => {
        if (isReact === 'like') {
            return (
                <>
                    <AiFillLike className="text-blue-500" />
                    <span>{isReact}</span>
                </>
            )
        }
        else if (isReact === 'heart') {
            return (
                <>
                    <FaHeart className="text-red-500" />
                    <span>{isReact}</span>
                </>
            )
        }
        else {
            return (
                <>
                    <BsFillEmojiSurpriseFill className="text-yellow-500" />
                    <span>{isReact}</span>
                </>
            )
        }
    }

    const likePost = async (reaction) => {
        mutation.mutate({ postId: postId, reaction: reaction })
    }

    const mutation = useMutation({
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

    const commentMutation = useMutation({
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
            fetchAllComment()
        },
        onError: (error) => {
            console.log(error.message)
        }
    })

    const sendComment = () => {
        commentMutation.mutate({ postId: postId, comment: comment })
    }

    const fetchAllComment = async () => {
        try {

            let result = await axiosInstance.get(`/post/comment/list?post_id=${postId}`)

            if (result.data.success) {
                setShowComment(true)
                setCommentList(result.data.payload.result)
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <section className=" pt-2 mb-3 rounded border border-lnk-gray bg-lnk-white">
            <div className=" flex items-start gap-2 px-5 mb-4">
                <div className=" w-9 h-9 rounded-full overflow-hidden border border-lnk-dark-gray">
                    <img className=" w-full h-full object-cover" src={!isNull(profilPicUrl) ? (SERVER_URL + profilPicUrl) : profilePlaceholder} alt="" />
                </div>
                <div>
                    <h5 className=" text-base font-bold">{isNull(fullName) ? username : fullName}</h5>
                    <p className=" text-xs font-light">{headline}</p>
                    <p className=" text-xs font-light">{diffInDays(createdAt)} <IoMdTime className=" inline" /></p>
                </div>
            </div>
            <div className="mb-4">
                <div className=" px-5 mb-1">
                    <p className=" text-sm font-light whitespace-pre-line">{content}</p>
                </div>
                {
                    postImageDisplay()
                }
            </div>
            <div className="px-5 flex items-center justify-between mb-2">
                {
                    postReaction()
                }
                <div>
                    <button onClick={fetchAllComment} className=" text-xs text-lnk-dark-gray hover:underline">23 comments</button>
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
                        <div className="animate__animated animate__fadeIn absolute -top-12 hidden pb-2 opacity-0 group-hover:block group-hover:opacity-100  transition-all ease-linear duration-150">
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
            <div className={`px-5 pb-2 ${showComment ? 'block' : 'hidden'}`}>
                <div className=" flex items-center gap-2 mb-5">
                    <div className=" w-9 h-9 rounded-full overflow-hidden border border-lnk-dark-gray">
                        <img className=" w-full h-full rounded-full object-cover" src="https://images.pexels.com/photos/3779760/pexels-photo-3779760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    </div>
                    <div className=" flex-grow relative">
                        <input onChange={getComment} name={`comment_post_${postId}`} className="w-full outline-none font-ubuntu focus:outline focus:outline-lnk-dark-gray text-sm border border-lnk-gray p-2 pr-7 rounded text-left bg-white" placeholder="Leave a comment" />
                        <button onClick={sendComment} className=" group">
                            <GrSend className="text-base text-lnk-dark-gray absolute top-1/2 -translate-y-1/2 right-2 group-hover:text-lnk-orange transition" />
                        </button>
                    </div>
                </div>
                <div>
                    {
                        commentList.length > 0 ? (
                            commentList.map(value => (
                                <div key={value.id} className=" mb-5">
                                    <div className=" flex items-center gap-2 mb-2">
                                        <div className=" w-7 h-7 rounded-full overflow-hidden border border-lnk-dark-gray">
                                            <img className=" w-full h-full rounded-full object-cover" src={isNull(value.profile_photo_url) ? profilePlaceholder : SERVER_URL + value.profile_photo_url} alt={value.full_name} />
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
                        ) : null
                    }
                </div>
            </div>
        </section>
    )
}

export default Post