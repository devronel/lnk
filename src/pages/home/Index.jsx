import { useState, useEffect, useContext } from "react"
import { useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { AuthContext } from "../../context/AuthContext";
import { debounce } from "lodash";
import ReactMarkdown from 'react-markdown';
import { PulseLoader } from 'react-spinners'
import { diffInDays, isNull, path } from "../../utils/functions";
import { TbLoaderQuarter } from "react-icons/tb";
import { PiCoffeeDuotone } from "react-icons/pi";
import Post from "../../components/post"


/*
    Import images
*/
import profilePlaceholder from '../../assets/profile-placeholder.jpg'
import CreatePostModal from "../../components/modals/createPostModal";
import { Link } from "react-router-dom";
import { FaGlobeAsia } from "react-icons/fa";

const Home = () => {

    // --- Initialize react hooks ---
    const { user } = useContext(AuthContext)
    const [isPostModalOpen, setIsPostModalOpen] = useState(false)
    const [documentHeight, setDocumentHeight] = useState(0)
    const [documentHeightInScroll, setDocumentHeightInScroll] = useState(0)

    // --- Functions and event ---
    const startPost = () => {
        setIsPostModalOpen(true)
    }

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['posts', user?.username],
        queryFn: async ({ pageParam }) => {
            let result = await axiosInstance.get(`/post?page=${pageParam}`, {
                withCredentials: true
            })

            console.log(result.data)
            return result.data

        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) => {
            console.log(lastPage, pages)
            if (lastPage.meta.current_page < lastPage.meta.last_page) {
                return lastPage.meta.current_page + 1;
            }
            return undefined;
        },
    })

    // --- Initialize useEffect ---
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
            <section className="flex items-center gap-3 p-3 mb-3 border rounded shadow sm:p-5 border-lnk-gray bg-lnk-white">
                <div className="w-10 h-10 overflow-hidden border rounded-full sm:w-12 sm:h-12 border-lnk-dark-gray">
                    <img className="object-cover w-full h-full " src={user?.avatar_url ?? profilePlaceholder} alt="" />
                </div>
                <button onClick={startPost} className="flex-grow p-2 text-sm text-left bg-white border rounded border-lnk-gray sm:p-3">Start post</button>
            </section>
            {
                data?.pages.map((page, pageIndex) => (
                    <div key={pageIndex}>
                        {
                            page.data.map((post) => (
                                <Post 
                                    key={post.id}
                                    post={post}
                                />
                            ))
                        }
                    </div>
                ))
            }
            {
                documentHeight <= documentHeightInScroll ? (
                    isFetchingNextPage
                        ? (
                            <div>
                                <p className="text-xs text-center text-lnk-dark-gray">
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
                                <p className="text-xs text-center text-lnk-dark-gray">
                                    Load more
                                </p>
                            )
                            : (
                                <p className="flex items-center justify-center gap-1 text-xs text-center text-lnk-dark-gray">
                                    <PiCoffeeDuotone className="text-base " />
                                    No more post
                                </p>
                            )
                ) : (
                    <p className="flex items-center justify-center gap-1 text-xs text-center text-lnk-dark-gray">
                        <PiCoffeeDuotone className="text-base " />
                        No more post
                    </p>
                )
            }

        </>
    )
}

export default Home