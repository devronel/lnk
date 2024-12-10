import { useState, useEffect } from "react";
import axiosInstance from '../../utils/axios'
import PeopleCard from "../../components/people-card";

/*
    Import Assets
*/
import empty from "../../assets/empty.svg"

const People = () => {

    let [users, setUsers] = useState([])

    let getAllusers = async () => {
        try {

            let result = await axiosInstance.get('/user/all', {
                withCredentials: true
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
            <h1 className=" mb-2 text-sm md:text-base font-bold">People you may know</h1>
            {
                users.length > 0 ? (
                    <main className=" grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 gap-2">
                        {
                            users.map(value => {
                                return (
                                    <PeopleCard
                                        key={value.userId}
                                        fullName={value.full_name}
                                        username={value.username}
                                        headline={value.headline}
                                        address={value.address}
                                        profileUrl={value.url}
                                    />
                                )
                            })

                        }
                    </main>
                ) : (
                    <>
                        <div className=" mt-4 flex items-center justify-center">
                            <img src={empty} width={250} height={250} alt="empty" />
                        </div>
                        <p className=" text-sm text-center text-lnk-dark-gray">No one's here!</p>
                    </>
                )
            }
        </section>
    )
}

export default People;