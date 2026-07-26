import { useState, useEffect, useContext } from "react"
import { keepPreviousData, useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "../utils/axios"
import toast from "react-hot-toast"
import { AuthContext } from "../context/AuthContext"
import { MdOutlineCommentsDisabled } from "react-icons/md"
import { TbSquareChevronLeft, TbSquareChevronRight } from "react-icons/tb"
import { isNull, path } from "../utils/functions"
import { GrSend } from "react-icons/gr"

import profilePlaceholder from "../assets/profile-placeholder.jpg"

const PostComments = ({ postId, isShowComment }) => {

    const queryClient = useQueryClient()
    const { user } = useContext(AuthContext)
    const [page, setPage] = useState(1)
    const [comment, setComment] = useState('')

    const getComment = (e) => {
        setComment(e.target.value)
    }

    const sendComment = (e) => {
        e.preventDefault()
        postCommentMutation.mutate({ postId: postId, comment: comment })
    }

    const postCommentMutation = useMutation({
        mutationFn: async (data) => {
            let result = await axiosInstance.post(`/post/${postId}/comments`, {
                content: data.comment
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
            queryClient.invalidateQueries({
                queryKey: ['post-comments', postId, 0]
            })
            queryClient.invalidateQueries({
                queryKey: ['comments', postId]
            })
            queryClient.invalidateQueries(['posts'])
        },
        onError: (error) => {
            toast.error("Something wen't wrong!")
        }
    })

    const { data, isPlaceholderData } = useQuery({
        queryKey: ['post-comments', postId, page],
        queryFn: async () => {
            let result = await axiosInstance.get(`/post/${postId}/comments?page=${page}`, {
                withCredentials: true
            })
            
            if (result.data.success) {
                return result.data.payload
            }
        },
        placeholderData: keepPreviousData,
        enabled: isShowComment
    })

    return (
        <>
            <div className="flex items-center gap-2 mb-5 ">
                <div className="overflow-hidden border rounded-full w-9 h-9 border-lnk-dark-gray">
                    <img className="object-cover w-full h-full rounded-full " src={user.avatar_url ?? profilePlaceholder} alt="" />
                </div>
                <form onSubmit={sendComment} className="relative flex-grow ">
                    <input onChange={getComment} value={comment} name={`comment_post_${postId}`} className="w-full p-2 text-sm text-left bg-white border rounded outline-none font-source-code-pro focus:outline focus:outline-lnk-dark-gray border-lnk-gray pr-7" placeholder="Leave a comment" />
                    <button type="submit" className=" group">
                        <GrSend className="absolute text-base transition -translate-y-1/2 text-lnk-dark-gray top-1/2 right-2 group-hover:text-lnk-orange" />
                    </button>
                </form>
            </div>
            <div>
                {
                    data?.comments.length > 0 ? (
                        data.comments.map(value => (
                            <div key={value.id} className="mb-5 ">
                                <div className="flex items-center gap-2 ">
                                    <div className="overflow-hidden border rounded-full w-7 h-7 border-lnk-dark-gray">
                                        <img className="object-cover w-full h-full rounded-full " src={value.user.avatar_url ?? profilePlaceholder} alt={value.full_name} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold">{value.user.full_name ?? value.user.username}</p>
                                    </div>
                                </div>
                                <div className=" pl-9">
                                    <div className="py-1 ">
                                        <p className="text-xs ">{value.body}</p>
                                    </div>
                                    <div class="flex items-center space-x-5 text-sm text-gray-700 select-none">
                                        <button class="flex items-center space-x-1.5 text-gray-700 font-semibold hover:opacity-80 transition-opacity">
                                            <svg class="w-3 h-3 fill-current" viewBox="0 0 24 24">
                                                <path d="M2 20h2V8H2v12zm18-9c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L11.17 2 5.59 7.59C5.22 7.95 5 8.45 5 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
                                            </svg>
                                            <span className="text-[12px]">0</span>
                                        </button>

                                        <button class="flex items-center space-x-1.5 text-gray-700 hover:text-black transition-colors">
                                            <svg class="w-3 h-3 fill-current" viewBox="0 0 24 24">
                                            <path d="M22 4h-2v12h2V4zm-18 9c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L12.83 22l5.58-5.59c.37-.36.59-.86.59-1.41V5c0-1.1-.9-2-2-2h-9c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2z"/>
                                            </svg>
                                            <span className="text-[12px]">0</span>
                                        </button>

                                        <button class="flex items-center space-x-1.5 text-gray-600 hover:text-black transition-colors">
                                            <svg class="w-3 h-3 stroke-current fill-none" stroke-width="2" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                            <span className="text-[12px]">Reply</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : null
                }
                <div className="flex items-center justify-end ">
                    <button
                        onClick={() => setPage((old) => Math.max(old - 1, 0))}
                        disabled={page <= 1}
                    >
                        <TbSquareChevronLeft className={`text-2xl ${page <= 1 ? 'text-lnk-gray' : 'hover:text-lnk-orange'}`} />
                    </button>
                    <button
                        onClick={() => {
                            if (!isPlaceholderData && data?.pagination.has_more) {
                                setPage((old) => old + 1)
                            }
                        }}
                        disabled={isPlaceholderData || !data?.pagination.has_more}
                    >
                        <TbSquareChevronRight className={`text-2xl ${!data?.pagination.has_more ? 'text-lnk-gray' : 'hover:text-lnk-orange'}`} />
                    </button>
                </div>
            </div>
        </>
    )
}

export default PostComments