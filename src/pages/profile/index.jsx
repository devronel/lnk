import { useState, useContext, useEffect } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { debounce } from "lodash";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../utils/axios";
import { SERVER_URL } from "../../utils/axios";
import { isNull } from "../../utils/functions";
import { FcAbout } from "react-icons/fc";
import { MdOutlineSignpost } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaRegImage } from "react-icons/fa";
import { AiFillPicture } from "react-icons/ai";
import { dateFormat } from "../../utils/functions";
import Post from "../../components/post";
import Modal from "../../components/modal";
import LnkInput from "../../components/forms/lnk-input";
import LnkTextarea from "../../components/forms/lnk-textarea";

/*
    Import photos
*/
import profilePlaceholder from "../../assets/profile-placeholder.jpg"
import empty from "../../assets/empty.svg"
import { TbLoaderQuarter } from "react-icons/tb";

const Profile = () => {

    /*
        Initialize React hooks like states, context api and etc.
    */
    let { user, setUser, refreshUser } = useContext(AuthContext)
    let [openModal, setOpenModal] = useState(false)
    let [editProfilePhoto, setEditProfilePhoto] = useState(false)
    let [loading, setLoading] = useState(false)

    let [submitPhotoLoading, setSubmitPhotoLoading] = useState(false)
    let [photo, setPhoto] = useState(null)
    let [displayPhoto, setDisplayPhoto] = useState(!isNull(user) ? !isNull(user.url) ? SERVER_URL + user.url : null : null)
    let [profileError, setProfileError] = useState(null);

    let [posts, setPosts] = useState([])

    const [userData, setUserData] = useState({
        firstName: user?.first_name ? user.first_name : '',
        lastName: user?.last_name ? user.last_name : '',
        headline: user?.headline ? user.headline : '',
        dateOfBirth: user?.date_of_birth ? dateFormat(user.date_of_birth) : '',
        address: user?.address ? user.address : '',
        about: user?.about ? user.about : ''
    })

    /*
        Onchange handler
    */
    const handleOnChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }
    const profilePhoto = (e) => {

        if (e.target.files && e.target.files[0]) {
            setPhoto(e.target.files[0])

            let reader = new FileReader()

            reader.onload = function (e) {
                setDisplayPhoto(e.target.result);
            };

            reader.readAsDataURL(e.target.files[0])
        }

    }


    /*
        Modal functions for open and close
    */
    const modalOpen = () => {
        setOpenModal(prevState => !prevState)
    }
    const profileUpdateModal = () => {
        setEditProfilePhoto(prevState => !prevState)
    }

    /*
        Submit function
    */
    const saveUserDetails = async () => {
        try {
            setLoading(true)
            let response = await axiosInstance.post('/user/update-user-details', userData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.data.success) {
                setOpenModal(false)
                setLoading(false)
                refreshUser()
            }
        } catch (error) {

        }
    }
    const updateProfilePhoto = async () => {
        try {
            setSubmitPhotoLoading(true)
            let response = await axiosInstance.post('/user/change-profile-photo', { profilePhoto: photo },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )

            if (response.data.success) {
                setEditProfilePhoto(false)
                setSubmitPhotoLoading(false)
                setProfileError(null)
                setPhoto(null)
                refreshUser()

            } else {
                setProfileError(response.data.message)
                setSubmitPhotoLoading(false)
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['user-posts', user?.username],
        queryFn: async ({ pageParam }) => {
            let result = await axiosInstance.get(`/post/user-post?pages=${pageParam}`, {
                withCredentials: true
            });
            if (result.data.success) {
                return result.data.payload
            }

        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) => {
            return lastPage.next_page
        },
    })

    useEffect(() => {

        const onScroll = debounce(function () {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                fetchNextPage()
            }
        }, 500)

        window.addEventListener('scroll', onScroll)

        return () => window.removeEventListener('scroll', onScroll)

    }, [])

    // const queryClient = useQueryClient()
    // useEffect(() => {
    //     queryClient.invalidateQueries('user-posts')
    // }, [])


    return (
        <>
            {/* basic info modal */}
            <Modal submit={saveUserDetails} loader={loading} openModal={openModal} setOpenModal={setOpenModal} title="Edit Profile" icon={<CiEdit className=" text-xl text-lnk-orange" />} maxWidth="max-w-xl">
                <LnkInput onChange={handleOnChange} value={userData.firstName} name='firstName' type='text' className='mb-3' placeholder="First name" label='First name' />
                <LnkInput onChange={handleOnChange} value={userData.lastName} name='lastName' type='text' className='mb-3' placeholder="Last name" label='Last name' />
                <LnkInput onChange={handleOnChange} value={userData.headline} name='headline' type='text' className='mb-3' placeholder="Headline" label='Headline' />
                <LnkInput onChange={handleOnChange} value={userData.dateOfBirth} name='dateOfBirth' type='date' className='mb-3' label='Date of Birth' />
                <LnkInput onChange={handleOnChange} value={userData.address} name='address' type='text' className='mb-3' label='Address' />
                <LnkTextarea onChange={handleOnChange} value={userData.about} name='about' className='mb-3' label='About' placeholder='Tell a little bit about yourself' />
            </Modal>
            {/* edit profile picture modal */}
            <Modal submit={updateProfilePhoto} loader={submitPhotoLoading} openModal={editProfilePhoto} setOpenModal={setEditProfilePhoto} title="Change Profile Photo" icon={<AiFillPicture className=" text-xl text-lnk-orange" />} maxWidth="max-w-xl">
                <div className=" flex items-center justify-center">
                    <label htmlFor="profile__photo" className=" cursor-pointer">
                        <div className=" w-80 h-80 rounded-full border border-lnk-orange">
                            <img className=" w-full h-full object-cover rounded-full" src={displayPhoto ?? profilePlaceholder} />
                        </div>
                    </label>
                    <input onChange={profilePhoto} type="file" hidden id="profile__photo" accept=".png,.webp,.jpeg,.jpg" />
                </div>
                {
                    !isNull(profileError) ? <p className="text-center text-xs mt-3 text-red-500 italic">{profileError}</p> : null
                }
            </Modal>
            <section className=" bg-lnk-white border border-lnk-gray rounded overflow-hidden mb-2">
                <div className=" relative">
                    <div className="relative h-52 w-full">
                        <img className=" w-full h-full object-cover" src="https://images.pexels.com/photos/633409/pexels-photo-633409.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                        <div className=" absolute inset-0 bg-lnk-dark opacity-50"></div>
                        <button className=" absolute top-3 text-lnk-gray right-3 border border-lnk-gray hover:bg-lnk-gray hover:text-lnk-dark p-2 rounded-full transition-colors ease-linear duration-150">
                            <FaRegImage />
                        </button>
                    </div>
                    <div className="  absolute top-28 left-5">
                        <div className="w-36 h-36 group rounded-full border border-lnk-white relative">
                            <img
                                className="rounded-full w-full h-full object-cover"
                                src={(user?.url && SERVER_URL + user?.url) ?? profilePlaceholder}
                                alt={!isNull(user?.full_name) ? user?.full_name : user?.username}
                            />
                            <div className="bg-opacity-0 group-hover:bg-opacity-60 bg-lnk-dark absolute inset-0 rounded-full flex items-center justify-center transition-all ease-linear duration-150">
                                <button onClick={profileUpdateModal} className="group-hover:block hidden text-lnk-gray text-2xl" >
                                    <FaRegImage />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" px-5 flex items-center justify-end mb-5 pt-6">
                    <button onClick={modalOpen} className=" text-xl hover:bg-lnk-gray p-2 rounded-full transition-colors ease-linear duration-150">
                        <CiEdit />
                    </button>
                </div>
                <div className=" px-5 pb-3">
                    {
                        !isNull(user) ? (
                            <>
                                <h6 className=" text-2xl font-bold">{!isNull(user.full_name) ? user.full_name : user.username}</h6>
                                {
                                    !isNull(user.headline) ? (
                                        <p className=" text-sm font-normal ">{user.headline}</p>
                                    ) : null
                                }
                                {
                                    !isNull(user.address) ? (
                                        <p className="mt-1 text-xs font-light mb-1 ">{user.address}</p>
                                    ) : null
                                }
                            </>
                        ) : null
                    }
                    <button className=" text-xs font-bold text-lnk-dark-gray hover:underline">2,000 followers</button>
                </div>
            </section>
            {
                !isNull(user) ? (
                    !isNull(user.about) ? (
                        <section className=" px-5 py-3 bg-lnk-white border border-lnk-gray rounded overflow-hidden mb-3">
                            <h3 className=" text-normal font-bold mb-1 text-lnk-dark-gray">
                                <FcAbout className=" text-lg inline align-middle mr-1" />
                                <span className=" align-middle">About</span>
                            </h3>
                            <p className=" text-sm font-normal">{user.about}</p>
                        </section>
                    ) : null
                ) : null
            }
            <div className=" flex items-center gap-3 mb-2">
                <div className="flex-grow h-[1px] bg-lnk-gray rounded"></div>
                <p className=" text-sm font-light text-lnk-dark-gray">
                    <MdOutlineSignpost className="text-sm inline align-middle mr-1" />
                    <span className=" align-middle">Latest Post</span>
                </p>
                <div className="flex-grow h-[1px] bg-lnk-gray rounded"></div>
            </div>
            <section>
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
                            // showPostImage={showPostImage}
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
                                Nothing more to load
                            </p>
                        )
                        : (
                            <p className="  text-center text-xs text-lnk-dark-gray">
                                Nothing more to load
                            </p>
                        )
                }
            </section>
        </>
    )
}

export default Profile