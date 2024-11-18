import { useState, useEffect, useContext } from "react"
import { useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { AuthContext } from "../../context/AuthContext";
import { debounce } from "lodash";
import useError from "../../hooks/useError";
import { BsFileEarmarkPostFill } from "react-icons/bs"
import { FcAddImage } from "react-icons/fc";
import { RiCloseCircleFill } from "react-icons/ri";
import { TbLoaderQuarter } from "react-icons/tb";
import LnkTextarea from "../../components/forms/lnk-textarea"
import Modal from "../../components/modal"
import Post from "../../components/post"
import PostImageViewer from "../../components/post-image-viewer";


/*
    Import images
*/
import empty from "../../assets/empty.svg"
import { isNull } from "../../utils/functions";

const Home = () => {

    /*
        Initialize react hooks
    */
    let queryClient = useQueryClient()
    let { user, setUser, refreshUser } = useContext(AuthContext)
    let [postModal, setPostModal] = useState(false)
    let [postLoading, setPostLoading] = useState(false)
    let [post, setPost] = useState({
        content: '',
        files: []
    })
    let [setErrors, errorExist] = useError()
    let [filesPreview, setFilesPreview] = useState([])

    let [viewPostImage, setViewPostImage] = useState(false)
    let [postImageView, setPostImageView] = useState(null)


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

    const saveData = (e) => {
        e.preventDefault()
        mutation.mutate(post)
    }

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['posts', user?.username],
        queryFn: async ({ pageParam }) => {
            let result = await axiosInstance.get(`/post/all?pages=${pageParam}`, {
                withCredentials: true
            })

            return result.data.payload

        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) => {
            return lastPage.next_page
        },
    })

    const mutation = useMutation({
        mutationFn: async (post) => {
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
                return result
            } else {
                throw new Error(JSON.stringify(result.data.payload));
            }

        },
        onSuccess: async () => {
            queryClient.invalidateQueries(['posts'])
            setPostModal(false)
            setPostLoading(false)
            setPost({
                ...post,
                content: '',
                files: []
            })
            setFilesPreview([])
        },
        onError: (error) => {
            setPostLoading(false)
            setErrors(JSON.parse(error.message))
        }
    })

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

    const showPostImage = async (id) => {
        try {
            setViewPostImage(true)
            let result = await axiosInstance(`/post/${id}`, {
                withCredentials: true
            })

            if (result.data.success) {
                setPostImageView(result.data.payload.result)
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    /*
        Initialize useEffect
    */
    useEffect(() => {

        imagePreview()

        return () => {
            filesPreview.forEach(url => URL.revokeObjectURL(url));
        };

    }, [post])

    useEffect(() => {

        const onScroll = debounce(function () {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                fetchNextPage()
            }
        }, 500)

        window.addEventListener('scroll', onScroll)

        return () => window.removeEventListener('scroll', onScroll)

    }, [])

    useEffect(() => {
        document.body.style.overflow = viewPostImage || postModal ? 'hidden' : 'auto'
    }, [viewPostImage, postModal])

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
                </div>
            </Modal>
            <section className=" flex items-center gap-3 p-5 rounded border border-lnk-gray bg-lnk-white mb-3">
                <div className=" w-12 h-12 rounded-full overflow-hidden border border-lnk-dark-gray">
                    <img className=" w-full h-full object-cover" src="https://images.pexels.com/photos/3779760/pexels-photo-3779760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                </div>
                <button onClick={startPost} className=" flex-grow text-sm border border-lnk-gray p-3 rounded text-left bg-white">Start post</button>
            </section>
            {
                data?.pages.map(dt => (
                    dt.result.map(value => (
                        <Post
                            key={value.id}
                            postId={value.id}
                            content={value.content}
                            username={value.username}
                            firstName={value.first_name}
                            lastName={value.last_name}
                            fullName={value.full_name}
                            headline={value.headline}
                            createdAt={value.created_at}
                            profilPicUrl={value.url}
                            postFiles={value.post_files}
                            postReactions={value.post_reactions}
                            isReact={value.user_reaction}
                            reactionCount={value.reaction_count}
                            showPostImage={showPostImage}
                        />
                    ))
                ))
            }
            {isFetchingNextPage
                ? (
                    <div>
                        <p className="  text-center text-xs text-lnk-dark-gray">
                            <TbLoaderQuarter className=" inline animate-spin text-lnk-orange mr-1 " />
                            Loading more post...
                        </p>
                    </div>
                )
                : hasNextPage
                    ? (
                        <p className="  text-center text-xs text-lnk-dark-gray">
                            Load more
                        </p>
                    )
                    : (
                        <p className="  text-center text-xs text-lnk-dark-gray">
                            No more post
                        </p>
                    )
            }

            {
                viewPostImage ? (
                    <PostImageViewer
                        viewPostImage={viewPostImage}
                        setViewPostImage={setViewPostImage}
                        postImageView={postImageView}
                    />
                ) : null
            }

        </>
    )
}

export default Home