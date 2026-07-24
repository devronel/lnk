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
            let result = await axiosInstance.get(`/post?pages=${pageParam}`, {
                withCredentials: true
            })
            
            console.log(result.data.data)
            return result.data

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
            <section className=" flex items-center gap-3 p-3 sm:p-5 rounded shadow border border-lnk-gray bg-lnk-white mb-3">
                <div className=" h-10 w-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-lnk-dark-gray">
                    <img className=" w-full h-full object-cover" src={user?.avatar_url ?? profilePlaceholder} alt="" />
                </div>
                <button onClick={startPost} className=" flex-grow text-sm border border-lnk-gray p-2 sm:p-3 rounded text-left bg-white">Start post</button>
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
                // documentHeight <= documentHeightInScroll ? (
                //     isFetchingNextPage
                //         ? (
                //             <div>
                //                 <p className="  text-center text-xs text-lnk-dark-gray">
                //                     <PulseLoader
                //                         color={'#FF6500'}
                //                         loading={isFetchingNextPage}
                //                         size={6}
                //                         aria-label="Loading Spinner"
                //                         data-testid="loader"
                //                     />
                //                 </p>
                //             </div>
                //         )
                //         : hasNextPage
                //             ? (
                //                 <p className="  text-center text-xs text-lnk-dark-gray">
                //                     Load more
                //                 </p>
                //             )
                //             : (
                //                 <p className=" flex items-center justify-center gap-1 text-center text-xs text-lnk-dark-gray">
                //                     <PiCoffeeDuotone className=" text-base " />
                //                     No more post
                //                 </p>
                //             )
                // ) : (
                //     <p className=" flex items-center justify-center gap-1 text-center text-xs text-lnk-dark-gray">
                //         <PiCoffeeDuotone className=" text-base " />
                //         No more post
                //     </p>
                // )
            }

        </>
    )
}

export default Home