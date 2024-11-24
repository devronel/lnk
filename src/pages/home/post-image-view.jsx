import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import useEmblaCarousel from "embla-carousel-react"
import axiosInstance, { SERVER_URL } from "../../utils/axios"
import { IoMdClose, IoMdTime } from "react-icons/io"
import { diffInDays, isNull, parseJson } from "../../utils/functions"
import { FaHeart } from "react-icons/fa"
import { AiFillLike, AiOutlineComment, AiOutlineLike } from "react-icons/ai"
import { BsFillEmojiSurpriseFill } from "react-icons/bs"
import { MdOutlineCommentsDisabled, MdOutlineEmojiEmotions } from "react-icons/md"

/*
    Import assets like image and etc.
*/
import profilePlaceholder from "../../assets/profile-placeholder.jpg"
import { TbSquareChevronLeft, TbSquareChevronRight } from "react-icons/tb"

const PostImage = () => {

    let [emblaRef] = useEmblaCarousel()
    let { post_id, username } = useParams()
    let [commentPage, setCommentPage] = useState(0)
    let navigate = useNavigate()
    let [post, setPost] = useState(null)

    /*
        Display react and count
    */
    const postReaction = () => {

        if (!isNull(post && post.reactions)) {

            let reaction = post.reactions.split(',')
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
                    <p className=" text-xs">{post?.reaction_count}</p>
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
        if (!isNull(post)) {
            if (post.is_reacted === 'like') {
                return (
                    <>
                        <AiFillLike className="text-blue-500" />
                        <span className="text-blue-500 font-bold">{post.is_reacted}</span>
                    </>
                )
            }
            else if (post.is_reacted === 'heart') {
                return (
                    <>
                        <FaHeart className="text-red-500" />
                        <span className="text-red-500 font-bold" >{post.is_reacted}</span>
                    </>
                )
            }
            else {
                return (
                    <>
                        <BsFillEmojiSurpriseFill className="text-yellow-500" />
                        <span className="text-yellow-500 font-bold">{post.is_reacted}</span>
                    </>
                )
            }
        }
    }

    const likePost = async (reaction) => {
        try {
            let result = await axiosInstance.post(`/post/like/${post_id}/${reaction}`, {}, {
                withCredentials: true
            })

            if (result.data.success) {
                getPost()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getPost = async () => {
        try {
            let result = await axiosInstance(`/post/view-images/${post_id}/${username}`, {
                withCredentials: true
            })

            if (result.data.success) {
                setPost(result.data.payload.result)
            }

        } catch (error) {
            console.log(error.response)
        }
    }

    const { data, isPlaceholderData } = useQuery({
        queryKey: ['view-image-comment', post_id, commentPage],
        queryFn: async () => {
            let result = await axiosInstance.get(`/post/comment/list?post_id=${post_id}&page=${commentPage}&limit=${7}`, {
                withCredentials: true
            })

            if (result.data.success) {
                return result.data.payload
            }
        },
        placeholderData: keepPreviousData
    })

    useEffect(() => {
        getPost()
    }, [])


    return (
        <section className={`min-h-screen h-auto grid grid-cols-[70%_1fr]`}>
            <div className="bg-lnk-dark relative overflow-hidden flex items-center justify-center">
                <button onClick={() => navigate(-1)} className="absolute top-3 left-3 z-20 text-lnk-orange border border-lnk-orange p-1 rounded-full hover:bg-lnk-orange hover:text-lnk-white">
                    <IoMdClose />
                </button>
                <div className="embla" ref={emblaRef}>
                    <div className="embla__container items-center">
                        {
                            !isNull(post) ? (
                                parseJson(post.post_files).map(value => {
                                    return (
                                        <div key={value.id} className="embla__slide flex items-center justify-center ">
                                            <div className="h-[400px] w-[80%]">
                                                <img className=" w-full h-full object-contain"
                                                    src={SERVER_URL + value.url}
                                                    alt={value.filename} />
                                            </div>
                                        </div>
                                    )
                                })
                            ) : null
                        }
                    </div>
                </div>
            </div>
            <div className="relative bg-lnk-white overflow-y-auto">
                <div className="absolute inset-0 py-6 px-5">
                    <div className=" flex items-start gap-2 mb-4">
                        <div className=" w-9 h-9 rounded-full overflow-hidden border border-lnk-dark-gray">
                            <img className=" w-full h-full object-cover" src={isNull(post?.url) ? profilePlaceholder : SERVER_URL + post?.url} alt={post?.full_name} />
                        </div>
                        <div>
                            <>
                                <h5 className=" text-base font-bold">{post?.full_name}</h5>
                                {
                                    post?.headline ? <p className=" text-xs font-light">{post?.headline}</p> : null
                                }
                                <p className=" text-xs font-light">{diffInDays(post?.created_at)} <IoMdTime className=" inline" /></p>
                            </>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className=" mb-1">
                            <p className=" text-sm font-light whitespace-pre-line">
                                {post?.content}
                            </p>
                        </div>
                    </div>
                    <div className=" flex items-center justify-between mb-1">
                        {
                            postReaction()
                        }
                        <div>
                            <button className=" text-xs text-lnk-dark-gray hover:underline">{post?.comment_count} {post?.comment_count > 0 ? 'comments' : 'comment'}</button>
                        </div>
                    </div>
                    <div className="mb-1">
                        <ul className=" flex items-center gap-5 py-1 border-t border-lnk-gray">
                            <li className="relative group">
                                <button className=" text-sm flex items-center gap-1 py-2 px-4 hover:bg-lnk-gray transition-colors ease-linear duration-150 rounded">
                                    {
                                        isNull(post?.is_reacted) ? (
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
                                <button className="text-sm flex items-center gap-1  py-2 px-4 hover:bg-lnk-gray transition-colors ease-linear duration-150 rounded">
                                    <AiOutlineComment className=" text-lg" />
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
                        <div className="">
                            {
                                data?.result.length > 0 ? (
                                    data.result.map(value => (
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
                                ) : (
                                    <p className=" text-center text-sm text-lnk-dark-gray flex items-center justify-center gap-1">
                                        <MdOutlineCommentsDisabled className=" text-base" />
                                        No comment available
                                    </p>

                                )
                            }
                        </div>
                        <div className=" flex items-center justify-end">
                            <button
                                onClick={() => setCommentPage((old) => Math.max(old - 7, 0))}
                                disabled={commentPage === 0}
                            >
                                <TbSquareChevronLeft className={`text-2xl ${commentPage === 0 ? 'text-lnk-gray' : 'hover:text-lnk-orange'}`} />
                            </button>
                            <button
                                onClick={() => {
                                    if (!isPlaceholderData && !isNull(data.next_page)) {
                                        setCommentPage((old) => old + 7)
                                    }
                                }}
                                disabled={isPlaceholderData || isNull(data?.next_page)}
                            >
                                <TbSquareChevronRight className={`text-2xl ${isNull(data?.next_page) ? 'text-lnk-gray' : 'hover:text-lnk-orange'}`} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default PostImage