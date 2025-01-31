import { useState, useEffect } from "react";
import axiosInstance from '../../utils/axios'
import PeopleCard from "../../components/peopleCard";
import EmptyFriend from "../../components/emptyPagePlaceholder/emptyFriend";

/*
    Import Assets
*/

const Friends = () => {
    let [users, setUsers] = useState([])
    let getAllusers = async () => {
        try {

            let result = await axiosInstance.get('/user/all', {
                withCredentials: true,
            })

            if (result.data.success) {
                setUsers(result.data.payload.users);

            }

        } catch (error) {

        }
    }

    useEffect(() => {

        getAllusers();

    }, [])

    return (
        <section className=" p-3 md:p-5 rounded border border-lnk-gray bg-lnk-white mb-3">
            {
                users.length > 0 ? (
                    <>
                        <h1 className=" mb-2 text-sm md:text-base font-bold">People you may know</h1>
                        {
                            <main className=" grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-4 gap-2">
                                {
                                    users.map(value => {
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
                                                refreshUser={getAllusers}
                                            />
                                        )
                                    })

                                }
                            </main>
                        }
                    </>
                ) : <EmptyFriend />
            }
        </section>
    )
}

export default Friends;