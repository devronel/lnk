import { useState, useContext, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../utils/axios";
import PulseLoader from 'react-spinners/PulseLoader'
import { isNull, path, dateFormat } from "../../utils/functions";
import Post from "../../components/post";
import Modal from "../../components/modal";
import LnkInput from "../../components/forms/lnkInput";
import LnkTextarea from "../../components/forms/lnkTextarea";

/* --- Icons --- */
import { TbLoaderQuarter } from "react-icons/tb";
import { PiCoffeeDuotone } from "react-icons/pi";
import { FcAbout } from "react-icons/fc";
import { MdOutlineSignpost } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaRegImage } from "react-icons/fa";
import { BiSolidError } from "react-icons/bi";

/* --- Import photos --- */
import profilePlaceholder from "../../assets/profile-placeholder.jpg"
import empty from "../../assets/empty.svg"
import coverPhotoPlaceholder from "../../assets/cover-photo-placeholder.png"
import CoverPhotoModal from "../../components/modals/coverPhotoModal";
import ProfilePhotoModal from "../../components/modals/profilePhotoModal";

const Profile = () => {

    /* --- Initialize React hooks like states, context api and etc. --- */
    const { user, setUser, refreshUser } = useContext(AuthContext)
    const [openModal, setOpenModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [profilePhoto, setProfilePhoto] = useState(null)
    const [coverPhoto, setCoverPhoto] = useState(null)
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        headline: '',
        dateOfBirth: '',
        address: '',
        about: ''
    })

    /* --- Onchange handler --- */
    const handleOnChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const choosePhoto = (e) => {
        if (e.target.files && e.target.files[0]) {
            let targetAttr = e.target.name
            const MAX_SIZE = 1 * 1000 * 1000;
            if (e.target.files[0].size >= MAX_SIZE) {
                toast.error(`The file size exceeds the maximum limit of 1mb. Please upload a smaller file.`, {
                    duration: 5000,
                    style: {
                        width: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1px',
                        color: 'rgb(239,68,68)',
                        fontSize: '14px',
                        fontFamily: 'Ubuntu'
                    },
                    icon: <BiSolidError className=" flex-grow text-4xl text-red-500" />
                })
                return
            }
            let reader = new FileReader()
            reader.onload = function (e) {
                if (targetAttr === 'profile__photo') {
                    setProfilePhoto(e.target.result);
                } else {
                    setCoverPhoto(e.target.result)
                }
            };
            reader.readAsDataURL(e.target.files[0])
            e.target.value = ''
        }
    }


    /* --- Modal functions for open and close --- */
    const modalOpen = () => {
        setOpenModal(prevState => !prevState)
    }

     /* --- SAVE USER DETAILS --- */
    const saveUserDetails = async () => {
        try {
            setLoading(true)
            let response = await axiosInstance.post('/profile', userData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.data.success) {
                setOpenModal(false)
                setLoading(false)
                setErrors({})
                setUser(prev => {
                    return {
                        ...prev,
                        full_name: userData.firstName + ' ' + userData.lastName
                    }
                })
            }
        } catch (error) {
            setLoading(false)
            if (error.response) {
                switch (error.response.status) {
                    case 422:
                        setErrors(error.response.data.errors)
                        break;
                    default:
                        toast.error("Something's went wrong.")
                        break;
                }
            }
        }
    }

    /* --- Fetch User Post --- */
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
        const getUserDetail = async () => {
            try {

                const response = await axiosInstance.get('/profile');

                if(!response.data.payload.detail) return;
                
                if(response.data.success){

                    const detail = response.data.payload.detail

                    setUserData(prev => {
                        return {
                            ...prev,
                            firstName: detail.first_name,
                            lastName: detail.last_name,
                            headline: detail.headline,
                            dateOfBirth: dateFormat(detail.date_of_birth),
                            address: detail.address,
                            about: detail.about
                        }
                    })
                }
            } catch (error) {
                toast.error("Something's went wrong.")
            }
        }

        getUserDetail();
    }, []);

    
    useEffect(() => {
        const onScroll = debounce(function () {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                fetchNextPage()
            }
        }, 500)

        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])


    /* --- DISABLE SCROLL WHEN MODAL IS OPEN --- */
    useEffect(() => {
        if (!isNull(profilePhoto) || !isNull(coverPhoto)) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [profilePhoto, coverPhoto])

    return (
        <>
            {/* Basic info modal */}
            <Modal submit={saveUserDetails} loader={loading} openModal={openModal} closeModal={() => setOpenModal(false)} setOpenModal={setOpenModal} title="Edit Profile" icon={<CiEdit className=" text-xl text-lnk-orange" />}>
                <div className='mb-3'>
                    <LnkInput 
                        onChange={handleOnChange} 
                        value={userData.firstName} 
                        error={errors.firstName}  
                        name='firstName' type='text' 
                        placeholder="First name" 
                        required
                        label='First name' 
                    />
                    {
                        errors.firstName ? <p className=" text-red-500 text-xs">{errors.firstName[0]}</p> : null
                    }
                </div>
                <div className='mb-3'>
                    <LnkInput 
                        onChange={handleOnChange} 
                        value={userData.lastName} 
                        error={errors.lastName}
                        name='lastName' type='text' 
                        placeholder="Last name" 
                        required
                        label='Last name' 
                    />
                    {
                        errors.lastName ? <p className=" text-red-500 text-xs">{errors.lastName[0]}</p> : null
                    }
                </div>
                <div className='mb-3'>
                    <LnkInput 
                        onChange={handleOnChange} 
                        value={userData.headline} 
                        error={errors.headline}
                        name='headline' 
                        type='text' 
                        placeholder="Headline" 
                        required
                        label='Headline' 
                    />
                    {
                        errors.headline ? <p className=" text-red-500 text-xs">{errors.headline[0]}</p> : null
                    }
                </div>
                <div className='mb-3'>
                    <LnkInput 
                        onChange={handleOnChange} 
                        value={userData.dateOfBirth} 
                        error={errors.dateOfBirth}
                        name='dateOfBirth' type='date'
                        label='Date of Birth' 
                        required
                    />
                </div>
                <div className='mb-3' >
                    <LnkInput 
                        onChange={handleOnChange} 
                        value={userData.address} 
                        error={errors.address}
                        name='address' 
                        type='text'
                        label='Address' 
                        required
                    />
                    {
                        errors.address ? <p className=" text-red-500 text-xs">{errors.address[0]}</p> : null
                    }
                </div>
                <div className='mb-3'>
                    <LnkTextarea 
                        onChange={handleOnChange} 
                        value={userData.about} 
                        error={errors.about}
                        name='about' 
                        label='About' 
                        placeholder='Tell a little bit about yourself' 
                        required
                    />
                    {
                        errors.about ? <p className=" text-red-500 text-xs">{errors.about[0]}</p> : null
                    }
                </div>
            </Modal>

            <ProfilePhotoModal profilePhoto={profilePhoto} setProfilePhoto={setProfilePhoto} />
            <CoverPhotoModal coverPhoto={coverPhoto} setCoverPhoto={setCoverPhoto} />

            <section className=" bg-lnk-white border border-lnk-gray rounded overflow-hidden mb-2">
                <div className=" relative h-auto w-full">
                    <div className="relative ">
                        <img
                            className="aspect-[4/1] w-full"
                            src={(user?.cover_photo && path(user?.cover_photo)) ?? coverPhotoPlaceholder}
                            alt={!isNull(user?.full_name) ? user?.full_name : user?.username}
                        />
                        <div className=" absolute inset-0 bg-lnk-dark opacity-10"></div>
                        <label htmlFor="cover__photo" className=" absolute top-3 text-lnk-gray right-3 border border-lnk-gray hover:bg-lnk-gray hover:text-lnk-dark p-2 rounded-full transition-colors ease-linear duration-150">
                            <FaRegImage />
                        </label>
                        <input onChange={choosePhoto} hidden type="file" name="cover__photo" id="cover__photo" accept=".png,.webp,.jpeg,.jpg" />
                    </div>
                    <div className="  absolute -bottom-10 xs:-bottom-12 left-5">
                        <div className="w-20 h-20 xs:w-28 xs:h-28 sm:w-32 sm:h-32 aspect-square group rounded-full border border-lnk-white relative">
                            <img
                                className=" aspect-square rounded-full "
                                src={(user?.url && path(user?.url)) ?? profilePlaceholder}
                                alt={!isNull(user?.full_name) ? user?.full_name : user?.username}
                            />
                            <div className="bg-opacity-0 group-hover:bg-opacity-60 bg-lnk-dark absolute inset-0 rounded-full flex items-center justify-center transition-all ease-linear duration-150">
                                <label htmlFor="profile__photo" className="cursor-pointer group-hover:block hidden text-lnk-gray text-2xl" >
                                    <FaRegImage />
                                </label>
                                <input onChange={choosePhoto} name="profile__photo" hidden type="file" id="profile__photo" accept=".png,.webp,.jpeg,.jpg" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" px-5 flex items-center justify-end mb-3 md:mb-5 pt-3 sm:pt-6">
                    <button onClick={modalOpen} className=" text-xl hover:bg-lnk-gray p-2 rounded-full transition-colors ease-linear duration-150">
                        <CiEdit />
                    </button>
                </div>
                <div className=" px-5 pb-3">
                    {
                        !isNull(user) ? (
                            <>
                                <h6 className=" text-xl sm:text-2xl font-bold">{user?.full_name ?? user.username}</h6>
                                <p className=" text-sm font-normal ">{userData.headline}</p>
                                <p className="mt-1 text-xs font-light mb-1 ">{userData.address}</p>
                            </>
                        ) : null
                    }
                    <button className=" text-xs font-bold text-lnk-dark-gray hover:underline">0 followers</button>
                </div>
            </section>
            {
                !isNull(userData.about) ? (
                    <section className=" px-5 py-3 bg-lnk-white border border-lnk-gray rounded overflow-hidden mb-3">
                        <h3 className=" text-normal font-bold mb-1 text-lnk-dark-gray">
                            <FcAbout className=" text-lg inline align-middle mr-1" />
                            <span className=" align-middle">About</span>
                        </h3>
                        <p className=" text-sm font-normal">{userData.about}</p>
                    </section>
                ) : null
            }
            {
                data?.pages[0].result.length > 0 ? (
                    <>
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
                                            reactionCount={value.reaction_count}
                                            commentCount={value.comment_count}
                                        />
                                    ))
                                ))
                            }
                            {isFetchingNextPage
                                ? (
                                    <div>
                                        <p className="  text-center text-xs text-lnk-dark-gray">
                                            <PulseLoader
                                                color={'#FF6500'}
                                                loading={isFetchingNextPage}
                                                size={6}
                                                aria-label="Loading Spinner"
                                                data-testid="loader"
                                            />
                                        </p>
                                    </div>
                                )
                                : hasNextPage
                                    ? null
                                    : (
                                        <p className=" flex items-center justify-center gap-1 text-center text-xs text-lnk-dark-gray">
                                            <PiCoffeeDuotone className=" text-base " />
                                            No more post
                                        </p>
                                    )
                            }
                        </section>
                    </>
                ) : null
            }
        </>
    )
}

export default Profile