import { useState, useEffect, useContext } from "react"
import axiosInstance from "../../utils/axios";
import useError from "../../hooks/useError";
import { BsFileEarmarkPostFill } from "react-icons/bs"
import { FcAddImage, FcDocument } from "react-icons/fc";
import { AiFillMinusCircle } from "react-icons/ai";
import { RiCloseCircleFill } from "react-icons/ri";
import LnkTextarea from "../../components/forms/lnk-textarea"
import Modal from "../../components/modal"
import Post from "../../components/post"


const Home = () => {

    /*
        Initialize react hooks
    */
    let [postModal, setPostModal] = useState(false)
    let [postLoading, setPostLoading] = useState(false)
    let [post, setPost] = useState({
        content: '',
        files: []
    })
    let [posts, setPosts] = useState([])
    let [setErrors, errorExist] = useError()
    let [filesPreview, setFilesPreview] = useState([])


    /*
        Functions and event
    */
    const handleOnchange = (e) => {
        let name = e.target.name;

        setPost({
            ...post,
            [name]: name == 'files' ? e.target.files : e.target.value
        })
    }

    const startPost = () => {
        setErrors([])
        setPostModal(true)
    }

    const saveData = async () => {
        try {

            let formData = new FormData()
            let files = Array.from(post.files)
            files.forEach(value => {
                formData.append(`files`, value)
            })
            formData.append('content', post.content)

            setPostLoading(true)
            let result = await axiosInstance.post('/post/create', formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (result.data.success) {
                setPostModal(false)
                setPostLoading(false)
                setPost({
                    ...post,
                    content: '',
                    files: []
                })
                setFilesPreview([])
                getPost()
            } else {
                setPostLoading(false)
                setErrors(result.data.payload)
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    const getPost = async () => {
        try {
            let result = await axiosInstance.get('/post', {
                withCredentials: true
            });
            if (result.data.success) {
                setPosts(result.data.payload.result)
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    const imagePreview = () => {

        if (post.files.length > 0) {
            let result = []

            for (let i = 0; i < post.files.length; i++) {
                let url = URL.createObjectURL(post.files[i])
                result.push(url);
            }

            setFilesPreview(result)

        }

    }

    const removeImage = (index) => {

        setFilesPreview(filesPreview.splice(index, -1))

        let filesToArr = Array.from(post.files)
        filesToArr.splice(index, 1);

        setPost({
            ...post,
            files: filesToArr
        })
    }


    /*
        Initialize useEffect
    */
    useEffect(() => {

        getPost()

    }, [])

    useEffect(() => {

        imagePreview()

        return () => {
            filesPreview.forEach(url => URL.revokeObjectURL(url));
        };

    }, [post])

    return (
        <>
            <Modal submit={saveData} loader={postLoading} openModal={postModal} setOpenModal={setPostModal} title="Create Post" icon={<BsFileEarmarkPostFill className=" text-lnk-orange" />}>
                <div className=" mb-3">
                    <LnkTextarea
                        name='content'
                        onChange={handleOnchange}
                        value={post.content}
                        label='Share your thoughts'
                        placeholder='Write here...'
                        error={errorExist('content')}
                    />
                    {
                        errorExist('content') ? <p className=" text-red-500 text-xs">{errorExist('content').msg}</p> : null
                    }
                </div>
                <div className=" flex items-center flex-wrap gap-2">
                    {
                        filesPreview.length > 0 ? (
                            filesPreview.map((value, index) => {
                                return (
                                    <div key={index} className=" w-12 h-12 group relative">
                                        <button onClick={() => removeImage(index)} className="hidden group-hover:block absolute -top-1 -right-2">
                                            <RiCloseCircleFill className=" text-red-600 text-lg" />
                                        </button>
                                        <img className="w-full h-full object-cover rounded-md border border-lnk-orange" src={value} alt="" />
                                    </div>
                                )
                            })
                        ) : null
                    }
                </div>
                <div className=" flex items-center gap-2 justify-end">
                    <label htmlFor="files" className="cursor-pointer hover:text-lnk-orange text-xl">
                        <FcAddImage />
                        <input onChange={handleOnchange} type="file" multiple name="files" id="files" hidden />
                    </label>
                    {/* <button className=" hover:text-lnk-orange text-xl">
                        <FcDocument />
                    </button> */}
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
                        <Post
                            key={value.id}
                            content={value.content}
                            username={value.username}
                            firstName={value.first_name}
                            lastName={value.last_name}
                            fullName={value.full_name}
                            headline={value.headline}
                            createdAt={value.created_at}
                            profilPicUrl={value.url}
                            postPhotos={value.post_photos}
                        />
                    )
                })
            }
        </>
    )
}

export default Home