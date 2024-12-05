import { useState, useEffect } from "react"
import axiosInstance from "../utils/axios"
import { MdOutlineCommentsDisabled } from "react-icons/md"
import { TbSquareChevronLeft, TbSquareChevronRight } from "react-icons/tb"
import { isNull, path } from "../utils/functions"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { GrSend } from "react-icons/gr"

import profilePlaceholder from "../assets/profile-placeholder.jpg"

const PostComments = ({ postId, isShowComment, authUserProfile }) => {
    let queryClient = useQueryClient()
    let [page, setPage] = useState(0)
    let [comments, setComments] = useState(null)
    let [comment, setComment] = useState('')

    const getComment = (e) => {
        setComment(e.target.value)
    }

    const sendComment = (e) => {
        e.preventDefault()
        postCommentMutation.mutate({ postId: postId, comment: comment })
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
            setPage(0)
            getAllComment()
            queryClient.invalidateQueries({
                queryKey: ['comments', postId]
            })
        },
        onError: (error) => {
            console.log(error)
        }
    })

    let getAllComment = async () => {
        try {
            let result = await axiosInstance.get(`/post/comment/list?post_id=${postId}&page=${page}&limit=${4}`, {
                withCredentials: true
            })
            if (result.status === 200) {
                setComments(result.data.payload)
            }
        } catch (error) {
            console.log(error.response)
        }
    }

    useEffect(() => {
        if (isShowComment) {
            getAllComment()
        }
    }, [isShowComment, page])

    return (
        <>
            <div className=" flex items-center gap-2 mb-5">
                <div className=" w-9 h-9 rounded-full overflow-hidden border border-lnk-dark-gray">
                    <img className=" w-full h-full rounded-full object-cover" src={isNull(authUserProfile) ? profilePlaceholder : path(authUserProfile)} alt="" />
                </div>
                <form onSubmit={sendComment} className=" flex-grow relative">
                    <input onChange={getComment} value={comment} name={`comment_post_${postId}`} className="w-full outline-none font-ubuntu focus:outline focus:outline-lnk-dark-gray text-sm border border-lnk-gray p-2 pr-7 rounded text-left bg-white" placeholder="Leave a comment" />
                    <button type="submit" className=" group">
                        <GrSend className="text-base text-lnk-dark-gray absolute top-1/2 -translate-y-1/2 right-2 group-hover:text-lnk-orange transition" />
                    </button>
                </form>
            </div>
            <div>
                {
                    comments?.result.length > 0 ? (
                        comments?.result.map(value => (
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
                        onClick={() => setPage((old) => Math.max(old - 4, 0))}
                        disabled={page === 0}
                    >
                        <TbSquareChevronLeft className={`text-2xl ${page === 0 ? 'text-lnk-gray' : 'hover:text-lnk-orange'}`} />
                    </button>
                    <button
                        onClick={() => {
                            if (!isNull(comments.next_page)) {
                                setPage((old) => old + 4)
                            }
                        }}
                        disabled={isNull(comments?.next_page)}
                    >
                        <TbSquareChevronRight className={`text-2xl ${isNull(comments?.next_page) ? 'text-lnk-gray' : 'hover:text-lnk-orange'}`} />
                    </button>
                </div>
            </div>
        </>
    )
}

export default PostComments