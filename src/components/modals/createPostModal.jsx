import { useState, useEffect, useContext } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "../../utils/axios"
import Tiptop from "../wysiwyg/Tiptop"
import { PostContext } from "../../context/PostContext"
import Modal from "../modal"
import useError from "../../hooks/useError"
import { RiCloseCircleFill } from "react-icons/ri"
import { FcAddImage } from "react-icons/fc"
import { BsFileEarmarkPostFill } from "react-icons/bs"

import photoGalleryIcon from "../../assets/icons/photo-gallery.png"


const CreatePostModal = ({ isPostModalOpen, setIsPostModalOpen }) => {

    const queryClient = useQueryClient()
    const { setPosts } = useContext(PostContext)
    const [setErrors, errorExist] = useError()
    const [post, setPost] = useState({
        content: '',
        files: []
    })
    const [loading, setLoading] = useState(false)
    const [filesPreview, setFilesPreview] = useState([])


    const closeModal = () => {
        setIsPostModalOpen(false)
    }

    const handleOnchange = (e) => {
        let name = e.target.name;
        setPost({
            ...post,
            [name]: name == 'files' ? e.target.files : e.target.value
        })
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

    const save = async (e) => {
        e.preventDefault()
        // uploadPostMutation.mutate(post)
        try {
            setLoading(true)
            let formData = new FormData()
            let files = Array.from(post.files)
            files.forEach(value => {
                formData.append(`files`, value)
            })
            formData.append('content', post.content)
            let result = await axiosInstance.post('/post/create', formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (result.data.success) {
                setIsPostModalOpen(false)
                setLoading(false)
                setPost({
                    ...post,
                    content: '',
                    files: []
                })
                setFilesPreview([])

                // Include new post in posts array in state
                setPosts(prevState => {
                    return [result.data.payload.newPost, ...prevState]
                })
            }
        } catch (error) {
            setLoading(false)
            console.log(error.response)
        }
    }
    const uploadPostMutation = useMutation({
        mutationFn: async (post) => {
            setLoading(true)
            let formData = new FormData()
            let files = Array.from(post.files)
            files.forEach(value => {
                formData.append(`files`, value)
            })
            formData.append('content', post.content)
            let result = await axiosInstance.post('/post/create', formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (result.status === 200) {
                return result
            }
        },
        onSuccess: async () => {
            queryClient.invalidateQueries(['posts'])
            setIsPostModalOpen(false)
            setLoading(false)
            setPost({
                ...post,
                content: '',
                files: []
            })
            setFilesPreview([])
        },
        onError: (error) => {
            setErrors(error.response.data.payload)
            setLoading(false)
        }
    })

    useEffect(() => {
        imagePreview()
        return () => {
            filesPreview.forEach(url => URL.revokeObjectURL(url));
        };
    }, [post])

    useEffect(() => {
        if (isPostModalOpen) {
            setErrors([])
            setPost({
                ...post,
                content: '',
                files: []
            })
        }
    }, [isPostModalOpen])

    return (
        <Modal submit={save} loader={loading} openModal={isPostModalOpen} closeModal={closeModal} title='Create Post' icon={<BsFileEarmarkPostFill className=" text-lnk-orange" />}>
            <div className=" mb-3">
                <Tiptop content={post} setContent={setPost} setErrors={setErrors} />
                {
                    errorExist('content') ? <p className=" text-red-500 text-xs mt-1 italic">{errorExist('content').msg}</p> : null
                }
            </div>
            {/* <div className=" flex items-center flex-wrap gap-2">
                {
                    filesPreview.length > 0 ? (
                        filesPreview.map((value, index) => {
                            return (
                                <div key={index} className=" group relative">
                                    <button onClick={() => removeImage(index)} className="hidden group-hover:block absolute -top-1 -right-2">
                                        <RiCloseCircleFill className=" text-red-600 text-lg" />
                                    </button>
                                    <img className="w-20 aspect-video object-contain rounded-md bg-lnk-gray" src={value} alt="" />
                                </div>
                            )
                        })
                    ) : null
                }
            </div>
            <div className=" flex items-center gap-2 justify-end">
                <label title="Attach Image" htmlFor="files" className="cursor-pointer hover:text-lnk-orange text-2xl">
                    <img width={30} className=" aspect-square" src={photoGalleryIcon} alt="Attach image" />
                    <input onChange={handleOnchange} type="file" multiple name="files" id="files" hidden accept=".png,.webp,.jpeg,.jpg" />
                </label>
            </div> */}
        </Modal>
    )
}

export default CreatePostModal