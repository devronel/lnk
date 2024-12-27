import { useContext, useEffect, useState } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { debounce } from "lodash"
import { AuthContext } from "../../context/AuthContext"
import PulseLoader from "react-spinners/PulseLoader"
import axiosInstance from "../../utils/axios"
import { isNull, path } from "../../utils/functions"
import Post from "../../components/post"
import { FcAbout } from "react-icons/fc"
import { PiCoffeeDuotone } from "react-icons/pi"
import { MdOutlineSignpost } from "react-icons/md"

import profilePlaceholder from "../../assets/profile-placeholder.jpg"
import coverPhotoPlaceholder from "../../assets/cover-photo-placeholder.png"

const ViewProfile = () => {

    let { user } = useContext(AuthContext)
    const { username } = useParams()

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['user-info', user?.username],
        queryFn: async ({ pageParam }) => {
            let result = await axiosInstance.get(`/user/user-info/${username}?pages=${pageParam}`, {
                withCredentials: true
            });
            if (result.data.success) {
                return result.data.payload
            }

        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) => {
            return lastPage.next_page
        },
    })

    useEffect(() => {

        const onScroll = debounce(function () {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                fetchNextPage()
            }
        }, 500)

        window.addEventListener('scroll', onScroll)

        return () => window.removeEventListener('scroll', onScroll)

    }, [])

    return (
        <>
            <section className=" bg-lnk-white border border-lnk-gray rounded overflow-hidden mb-2">
                <div className=" relative h-auto w-full">
                    <div className="relative ">
                        <img
                            className=" aspect-[4/1] w-full"
                            src={(data?.pages[0].user?.cover_photo && path(data?.pages[0].user?.cover_photo)) ?? coverPhotoPlaceholder}
                            alt={!isNull(data?.pages[0].user?.full_name) ? data?.pages[0].user?.full_name : data?.pages[0].user?.username}
                        />
                        <div className=" absolute inset-0 bg-lnk-dark opacity-10"></div>
                    </div>
                    <div className="  absolute -bottom-10 xs:-bottom-12 left-5">
                        <div className="w-20 h-20 xs:w-28 xs:h-28 sm:w-32 sm:h-32 aspect-square group rounded-full border border-lnk-white relative">
                            <img
                                className=" aspect-square rounded-full "
                                src={(data?.pages[0].user?.url && path(data?.pages[0].user?.url)) ?? profilePlaceholder}
                                alt={!isNull(data?.pages[0].user?.full_name) ? data?.pages[0].user?.full_name : data?.pages[0].user?.username}
                            />
                        </div>
                    </div>
                </div>
                <div className=" px-5 py-14 pb-3">
                    {
                        !isNull(data?.pages[0].user) ? (
                            <>
                                <h6 className=" text-xl sm:text-2xl font-bold">{!isNull(data?.pages[0].user.full_name) ? data?.pages[0].user.full_name : data?.pages[0].user.username}</h6>
                                {
                                    !isNull(data?.pages[0].user.headline) ? (
                                        <p className=" text-sm font-normal ">{data?.pages[0].user.headline}</p>
                                    ) : null
                                }
                                {
                                    !isNull(data?.pages[0].user.address) ? (
                                        <p className="mt-1 text-xs font-light mb-1 ">{data?.pages[0].user.address}</p>
                                    ) : null
                                }
                            </>
                        ) : null
                    }
                    <button className=" text-xs font-bold text-lnk-dark-gray hover:underline">2,000 followers</button>
                </div>
            </section>
            {
                !isNull(data?.pages[0].user) ? (
                    !isNull(data?.pages[0].user.about) ? (
                        <section className=" px-5 py-3 bg-lnk-white border border-lnk-gray rounded overflow-hidden mb-3">
                            <h3 className=" text-normal font-bold mb-1 text-lnk-dark-gray">
                                <FcAbout className=" text-lg inline align-middle mr-1" />
                                <span className=" align-middle">About</span>
                            </h3>
                            <p className=" text-sm font-normal">{data?.pages[0].user.about}</p>
                        </section>
                    ) : null
                ) : null
            }
            <div className=" flex items-center gap-3 mb-2">
                <div className="flex-grow h-[1px] bg-lnk-gray rounded"></div>
                <p className=" text-sm font-light text-lnk-dark-gray">
                    <MdOutlineSignpost className="text-sm inline align-middle mr-1" />
                    <span className=" align-middle">Latest Post</span>
                </p>
                <div className="flex-grow h-[1px] bg-lnk-gray rounded"></div>
            </div>
            <section>
                {
                    data?.pages.map(dt => (
                        dt.result.map(value => (
                            <Post
                                key={value.id}
                                postId={value.id}
                                content={value.content}
                                username={value.username}
                                firstName={value.first_name}
                                lastName={value.last_name}
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
                {isFetchingNextPage
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
                        ? null
                        : (
                            <p className=" flex items-center justify-center gap-1 text-center text-xs text-lnk-dark-gray">
                                <PiCoffeeDuotone className=" text-base " />
                                No more post
                            </p>
                        )
                }
            </section>
        </>
    )
}

export default ViewProfile