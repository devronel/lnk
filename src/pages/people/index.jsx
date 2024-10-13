import PeopleCard from "../../components/people-card";

const People = () => {
    return (
        <section className=" p-5 rounded border border-lnk-gray bg-lnk-white mb-3">
            <h1 className=" mb-2">People you may know</h1>
            <main className=" grid grid-cols-3 gap-2">
                <PeopleCard />
                <PeopleCard />
                <PeopleCard />
                <PeopleCard />
            </main>
        </section>
    )
}

export default People;