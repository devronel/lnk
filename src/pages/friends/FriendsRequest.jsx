import { useEffect, useState } from "react"
import axiosInstance from '../../utils/axios'
import PeopleCard from "../../components/peopleCard"
import EmptyFriend from "../../components/emptyPagePlaceholder/emptyFriend"

/*
    Import Assets
*/

const FriendsRequest = () => {

    const [friendRequest, setFriendRequest] = useState([])

    const getFriendRequest = async () => {
        try {
            const response = await axiosInstance('/friend/friend-request-list', {
                withCredentials: true
            })
            if (response.status === 200) {
                setFriendRequest(response.data.payload.friendRequest)
            }
        } catch (error) {
            console.log(error.response)
        }
    }

    useEffect(() => {
        getFriendRequest()
    }, [])

    return (
        <section className=" p-3 md:p-5 rounded border border-lnk-gray bg-lnk-white mb-3">
            {
                friendRequest.length > 0 ? (
                    <>
                        <h1 className=" mb-2 text-sm md:text-base font-bold">People want to be friends with you.</h1>
                        {
                            friendRequest.length > 0 ? (
                                <main className=" grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-4 gap-2">
                                    {
                                        friendRequest.map(value => {
                                            return (
                                                <PeopleCard
                                                    key={value.userId}
                                                    userId={value.userId}
                                                    fullName={value.full_name}
                                                    username={value.username}
                                                    headline={value.headline}
                                                    address={value.address}
                                                    profileUrl={value.url}
                                                    coverPhoto={value.user_cover_photo}
                                                    friendStatus={value.friend_status}
                                                    refreshUser={getFriendRequest}
                                                />
                                            )
                                        })

                                    }
                                </main>
                            ) : null
                        }
                    </>
                ) : <EmptyFriend />
            }
        </section>
    )
}

export default FriendsRequest