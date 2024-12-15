import { useState, useEffect, useContext } from "react"
import { useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { AuthContext } from "../../context/AuthContext";
import { debounce } from "lodash";
import PulseLoader from 'react-spinners/PulseLoader'
import { isNull, path } from "../../utils/functions";
import { TbLoaderQuarter } from "react-icons/tb";
import { PiCoffeeDuotone } from "react-icons/pi";
import Post from "../../components/post"


/*
    Import images
*/
import profilePlaceholder from '../../assets/profile-placeholder.jpg'
import CreatePostModal from "../../components/modals/createPostModal";

const Home = () => {

    /*
        Initialize react hooks
    */
    const { user } = useContext(AuthContext)
    const [isPostModalOpen, setIsPostModalOpen] = useState(false)
    const [documentHeight, setDocumentHeight] = useState(0)
    const [documentHeightInScroll, setDocumentHeightInScroll] = useState(0)

    /*
        Functions and event
    */
    const startPost = () => {
        setIsPostModalOpen(true)
    }

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['posts', user?.username],
        queryFn: async ({ pageParam }) => {
            let result = await axiosInstance.get(`/post/all?pages=${pageParam}`, {
                withCredentials: true
            })

            return result.data.payload

        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) => {
            return lastPage.next_page
        },
    })

    /*
        Initialize useEffect
    */
    useEffect(() => {
        const onScroll = debounce(function () {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                setDocumentHeightInScroll(window.innerHeight + window.scrollY)
                fetchNextPage()
            }
        }, 500)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])


    useEffect(() => {
        setDocumentHeight(document.body.offsetHeight)
    }, [])

    useEffect(() => {
        if (isPostModalOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [isPostModalOpen])

    return (
        <>
            <CreatePostModal isPostModalOpen={isPostModalOpen} setIsPostModalOpen={setIsPostModalOpen} />
            <section className=" flex items-center gap-3 p-3 sm:p-5 rounded border border-lnk-gray bg-lnk-white mb-3">
                <div className=" h-10 w-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-lnk-dark-gray">
                    <img className=" w-full h-full object-cover" src={isNull(user?.url) ? profilePlaceholder : path(user?.url)} alt="" />
                </div>
                <button onClick={startPost} className=" flex-grow text-sm border border-lnk-gray p-2 sm:p-3 rounded text-left bg-white">Start post</button>
            </section>
            {
                data?.pages.map(dt => (
                    dt.result.map(value => (
                        <Post
                            key={value.id}
                            postId={value.id}
                            authUserProfile={user?.url}
                            content={value.content}
                            username={value.username}
                            fullName={value.full_name}
                            headline={value.headline}
                            createdAt={value.created_at}
                            profilPicUrl={value.url}
                            postFiles={value.post_files}
                            postReactions={value.post_reactions}
                            isReact={value.user_reaction}
                            reactionCount={value.reaction_count}
                            commentCount={value.comment_count}
                        />
                    ))
                ))
            }
            {
                documentHeight <= documentHeightInScroll ? (
                    isFetchingNextPage
                        ? (
                            <div>
                                <p className="  text-center text-xs text-lnk-dark-gray">
                                    <PulseLoader
                                        color={'#FF6500'}
                                        loading={isFetchingNextPage}
                                        size={6}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    />
                                </p>
                            </div>
                        )
                        : hasNextPage
                            ? (
                                <p className="  text-center text-xs text-lnk-dark-gray">
                                    Load more
                                </p>
                            )
                            : (
                                <p className=" flex items-center justify-center gap-1 text-center text-xs text-lnk-dark-gray">
                                    <PiCoffeeDuotone className=" text-base " />
                                    No more post
                                </p>
                            )
                ) : (
                    <p className=" flex items-center justify-center gap-1 text-center text-xs text-lnk-dark-gray">
                        <PiCoffeeDuotone className=" text-base " />
                        No more post
                    </p>
                )
            }

        </>
    )
}

export default Home