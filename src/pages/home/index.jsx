import { useState, useEffect, useContext } from "react"
import axiosInstance from "../../utils/axios";
import { AuthContext } from "../../context/AuthContext";
import { BsFileEarmarkPostFill } from "react-icons/bs"
import { FcAddImage, FcDocument } from "react-icons/fc";
import LnkTextarea from "../../components/forms/lnk-textarea"
import Modal from "../../components/modal"
import Post from "../../components/post"


const Home = () => {

    // const { data } = useContext(AuthContext)
    let [postModal, setPostModal] = useState(false)
    let [post, setPost] = useState('')
    let [posts, setPosts] = useState([])

    const handleOnchange = (e) => {

        setPost(e.target.value)

    }

    const saveData = async () => {
        try {

            let result = await axiosInstance.post('/post/create', { content: post }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            console.log(result)
            getPost()

        } catch (error) {
            console.log(error.message)
        }
    }

    const startPost = () => {
        setPostModal(true)
    }


    const getPost = async () => {
        try {
            let result = await axiosInstance.get('/post', {
                withCredentials: true
            });
            console.log(result)
            if (result.data.success) {
                setPosts(result.data.data.result)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {

        getPost()

    }, [])

    return (
        <>
            <Modal submit={saveData} openModal={postModal} setOpenModal={setPostModal} title="Create Post" icon={<BsFileEarmarkPostFill className=" text-lnk-orange" />}>
                <div className=" mb-3">
                    <LnkTextarea
                        onChange={handleOnchange}
                        value={post}
                        label='Share your thoughts'
                        placeholder='Write here...'
                    />
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
            {
                posts.map(value => {
                    return (
                        <Post key={value.id} content={value.content} />
                    )
                })
            }
        </>
    )
}

export default Home