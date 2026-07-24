import { useState, useEffect } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "../../utils/axios"
import Tiptop from "../wysiwyg/Tiptop"
import Modal from "../modal"
import useError from "../../hooks/useError"
import { RiCloseCircleFill } from "react-icons/ri"
import { FcAddImage } from "react-icons/fc"
import { BsFileEarmarkPostFill } from "react-icons/bs"

import photoGalleryIcon from "../../assets/icons/photo-gallery.png"
import LnkTextarea from "../forms/lnkTextarea"


const CreatePostModal = ({ isPostModalOpen, setIsPostModalOpen }) => {

    const queryClient = useQueryClient()
    const [setErrors, errorExist] = useError()
    const [post, setPost] = useState({
        content: '',
        type: 1,
        visibility: 1,
        status: 1,
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

    const save = (e) => {
        e.preventDefault()
        uploadPostMutation.mutate(post)
    }
    const uploadPostMutation = useMutation({
        mutationFn: async (post) => {
            setLoading(true)
            let response = await axiosInstance.post('/post', post, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.data.success) {
                console.log(response.data)
                return response
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
            <div className="mb-3 ">
                <LnkTextarea 
                    onChange={handleOnchange} 
                    value={post.content}
                    name='content'
                    placeholder="What's on your mind?" 
                    required
                />
            </div>
            {/* <div className="flex flex-wrap items-center gap-2 ">
                {
                    filesPreview.length > 0 ? (
                        filesPreview.map((value, index) => {
                            return (
                                <div key={index} className="relative  group">
                                    <button onClick={() => removeImage(index)} className="absolute hidden group-hover:block -top-1 -right-2">
                                        <RiCloseCircleFill className="text-lg text-red-600 " />
                                    </button>
                                    <img className="object-contain w-20 rounded-md aspect-video bg-lnk-gray" src={value} alt="" />
                                </div>
                            )
                        })
                    ) : null
                }
            </div>
            <div className="flex items-center justify-end gap-2 ">
                <label title="Attach Image" htmlFor="files" className="text-2xl cursor-pointer hover:text-lnk-orange">
                    <img width={30} className=" aspect-square" src={photoGalleryIcon} alt="Attach image" />
                    <input onChange={handleOnchange} type="file" multiple name="files" id="files" hidden accept=".png,.webp,.jpeg,.jpg" />
                </label>
            </div> */}
        </Modal>
    )
}

export default CreatePostModal