import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import useEmblaCarousel from "embla-carousel-react"
import axiosInstance from "../../utils/axios"
import TiptopView from '../../components/wysiwyg/TiptopView'
import { AuthContext } from "../../context/AuthContext"
import { capitalize } from "lodash"
import { diffInDays, isNull, parseJson, path } from "../../utils/functions"
import FullPageLoader from "../../components/loader/fullPageLoader"
import PostReaction from "../../components/postReactions"
import { IoMdClose, IoMdTime } from "react-icons/io"
import { FaHeart } from "react-icons/fa"
import { AiFillLike, AiOutlineComment, AiOutlineLike } from "react-icons/ai"
import { BsFillEmojiSurpriseFill } from "react-icons/bs"
import { MdOutlineCommentsDisabled } from "react-icons/md"
import { TbSquareChevronLeft, TbSquareChevronRight } from "react-icons/tb"
import { FaRegComment } from "react-icons/fa";
import { GrSend } from "react-icons/gr"

/*
    Import assets like image and etc.
*/
import profilePlaceholder from "../../assets/profile-placeholder.jpg"
import wowIcon from '../../assets/icons/wow.png'
import likeIcon from '../../assets/icons/like.png'
import heartIcon from '../../assets/icons/heart.png'

const PostImage = () => {

    let [emblaRef] = useEmblaCarousel()
    let queryClient = useQueryClient()
    let { post_id, username } = useParams()
    let { user } = useContext(AuthContext)
    let [isFetching, setIsFetching] = useState(true)
    let [commentPage, setCommentPage] = useState(0)
    let [comment, setComment] = useState('')
    let navigate = useNavigate()
    let [post, setPost] = useState(null)

    /*
        Display reaction icon
    */
    const userReaction = () => {
        if (!isNull(post)) {
            if (post.is_reacted === 'like') {
                return (
                    <>
                        <img width={20} height={20} src={likeIcon} alt="Like icon" />
                        <span className="text-blue-500 font-bold">{capitalize(post.is_reacted)}</span>
                    </>
                )
            }
            else if (post.is_reacted === 'heart') {
                return (
                    <>
                        <img width={20} height={20} src={heartIcon} alt="Heart icon" />
                        <span className="text-red-500 font-bold" >{capitalize(post.is_reacted)}</span>
                    </>
                )
            }
            else {
                return (
                    <>
                        <img width={16} height={16} src={wowIcon} alt="Wow icon" />
                        <span className="text-yellow-500 font-bold">{capitalize(post.is_reacted)}</span>
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
            setIsFetching(true)
            let result = await axiosInstance(`/post/view-images/${post_id}/${username}`, {
                withCredentials: true
            })

            if (result.status === 200) {
                setIsFetching(false)
                setPost(result.data.payload.result)
            }

        } catch (error) {
            setIsFetching(false)
            console.log(error.message)
        }
    }

    const { data, isPlaceholderData } = useQuery({
        queryKey: ['view-image-comment', post_id, commentPage],
        queryFn: async () => {
            let url = new URLSearchParams({ post_id: post_id, page: commentPage, limit: 7 })
            let result = await axiosInstance.get(`/post/comment/list?${url.toString()}`, {
                withCredentials: true
            })

            if (result.status === 200) {
                return result.data.payload
            }
        },
        placeholderData: keepPreviousData
    })

    /*
        Send Comment
    */
    const commentMutation = useMutation({
        mutationFn: async (data) => {
            let result = await axiosInstance.post('/post/send/comment', {
                post_id: data.post_id,
                comment_value: data.comment
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (result.status === 200) {
                return result
            }
        },
        onSuccess: () => {
            setComment('')
            setCommentPage(0)
            queryClient.invalidateQueries({
                queryKey: ['view-image-comment', post_id, commentPage]
            })
        },
        onError: (error) => {
            console.log(error.message)
        }
    })

    const sendComment = () => {
        commentMutation.mutate({ post_id: post_id, comment: comment })
    }

    useEffect(() => {
        getPost()
    }, [])

    if (isFetching) {
        return <FullPageLoader />
    }


    return (
        <section className={`min-h-screen h-auto overflow-hidden grid grid-cols-[70%_30%]`}>
            <button onClick={() => navigate(-1)} className="fixed top-3 left-3 z-20 text-lnk-orange border border-lnk-orange p-1 rounded-full hover:bg-lnk-orange hover:text-lnk-white">
                <IoMdClose />
            </button>
            <div className="bg-lnk-dark h-screen flex items-center justify-center p-3">
                <div className="embla" ref={emblaRef}>
                    <div className="embla__container">
                        {
                            !isNull(post) ? (
                                parseJson(post.post_files).map(value => {
                                    return (
                                        <div key={value.id} className="embla__slide">
                                            <img className="embla__image"
                                                src={path(value.url)}
                                                alt={value.filename} />
                                        </div>
                                    )
                                })
                            ) : null
                        }
                    </div>
                </div>
            </div>
            <div className=" bg-lnk-white overflow-y-auto">
                <div className=" py-6 px-5">
                    <div className=" flex items-start gap-2 mb-4">
                        <div className=" w-9 h-9 rounded-full overflow-hidden border border-lnk-dark-gray">
                            <img className=" w-full h-full object-cover" src={post?.url ?? profilePlaceholder} alt={post?.full_name} />
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
                            {
                                post?.content !== undefined ? <TiptopView content={post?.content} /> : null
                            }
                        </div>
                    </div>
                    <div className=" flex items-center justify-between mb-1">
                        <PostReaction postReactions={post?.reactions} reactionCount={post?.reaction_count} />
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
                                <div className="animate__animated animate__fadeIn absolute z-10 -top-11 hidden pb-2 opacity-0 group-hover:block group-hover:opacity-100  transition-all ease-linear duration-150">
                                    <div className="bg-lnk-white border border-lnk-gray p-2 flex items-center gap-5 rounded-3xl shadow ">
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
                                    <FaRegComment className=" text-lg" />
                                    <span>Comment</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className={` pb-2 block`}>
                        <div className=" flex items-center gap-2 mb-5">
                            <div className=" w-9 h-9 rounded-full overflow-hidden border border-lnk-dark-gray">
                                <img className=" w-full h-full rounded-full object-cover" src={path(user.url) ?? profilePlaceholder} alt="" />
                            </div>
                            <div className=" flex-grow relative">
                                <input onChange={(e) => setComment(e.target.value)} value={comment} className="w-full outline-none font-ubuntu focus:outline focus:outline-lnk-dark-gray text-sm border border-lnk-gray p-2 pr-7 rounded text-left bg-white" placeholder="Leave a comment" />
                                <button onClick={sendComment} className=" group">
                                    <GrSend className="text-base text-lnk-dark-gray absolute top-1/2 -translate-y-1/2 right-2 group-hover:text-lnk-orange transition" />
                                </button>
                            </div>
                        </div>
                        <div className="">
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