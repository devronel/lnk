import { useState, useEffect } from "react"
import axiosInstance from "../../utils/axios";
import { BsFileEarmarkPostFill } from "react-icons/bs"
import { FaRegImages } from "react-icons/fa";
import { FcAddImage, FcDocument } from "react-icons/fc";
import LnkTextarea from "../../components/forms/lnk-textarea"
import Modal from "../../components/modal"
import Post from "../../components/post"


const Home = () => {

    const [postModal, setPostModal] = useState(false)
    const [post, setPost] = useState('')

    const handleOnchange = (e) => {
        setPost(e.target.value)
    }

    const saveData = () => {
        console.log(post)
    }

    const startPost = () => {
        setPostModal(true)
    }

    useEffect(() => {
        const getUser = async () => {
            let user = await axiosInstance.get('/user', {
                withCredentials: true
            });
            console.log(user)
        }

        getUser()
    }, [])

    return (
        <>
            <Modal handleSubmit={saveData} openModal={postModal} setOpenModal={setPostModal} title="Create Post" icon={<BsFileEarmarkPostFill className=" text-lnk-orange" />}>
                <div className=" mb-3">
                    <LnkTextarea onChange={handleOnchange} value={post} label='Share your thoughts' placeholder='Write here...' />
                </div>
                <div className=" flex items-center gap-2 justify-end">
                    <button className=" hover:text-lnk-orange text-xl">
                        <FcDocument />
                    </button>
                    <button className=" hover:text-lnk-orange text-xl">
                        <FcAddImage />
                    </button>
                </div>
            </Modal>
            <section className=" flex items-center gap-3 p-5 rounded border border-lnk-gray bg-lnk-white mb-3">
                <div className=" w-12 h-12 rounded-full overflow-hidden border border-lnk-dark-gray">
                    <img className=" w-full h-full object-cover" src="https://images.pexels.com/photos/3779760/pexels-photo-3779760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                </div>
                <button onClick={startPost} className=" flex-grow text-sm border border-lnk-gray p-3 rounded text-left bg-white">Start post</button>
            </section>
            <Post />
            <Post />
        </>
    )
}

export default Home