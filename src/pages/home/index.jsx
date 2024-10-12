import Post from "../../components/post"


const Home = () => {

    return (
        <>
            <section className=" flex items-center gap-3 p-5 rounded border border-lnk-gray bg-lnk-white mb-3">
                <div className=" w-12 h-12 rounded-full overflow-hidden border border-lnk-dark-gray">
                    <img className=" w-full h-full object-cover" src="https://images.pexels.com/photos/3779760/pexels-photo-3779760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                </div>
                <button className=" flex-grow text-sm border border-lnk-gray p-3 rounded text-left bg-white">Start post</button>
            </section>
            <Post />
            <Post />
        </>
    )
}

export default Home