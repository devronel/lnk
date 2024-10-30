import { useState, useEffect } from "react";
import axiosInstance from '../../utils/axios'
import PeopleCard from "../../components/people-card";

const People = () => {

    let [users, setUsers] = useState([])

    let getAllusers = async () => {
        try {

            let result = await axiosInstance.get('/user/all', {
                withCredentials: true
            })

            if (result.data.success) {

                setUsers(result.data.data.users);

            }

        } catch (error) {

        }
    }

    useEffect(() => {

        getAllusers();

        console.log(users);


    }, [])

    return (
        <section className=" p-5 rounded border border-lnk-gray bg-lnk-white mb-3">
            <h1 className=" mb-2">People you may know</h1>
            <main className=" grid grid-cols-3 grid-flow-col gap-2">
                {

                    users.map(value => {
                        return (
                            <PeopleCard
                                key={value.userId}
                                firstName={value.first_name}
                                lastName={value.last_name}
                                username={value.username}
                                headline={value.headline}
                                address={value.address}
                                profileUrl={value.url}
                            />
                        )
                    })

                }
            </main>
        </section>
    )
}

export default People;