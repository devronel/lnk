import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../utils/axios";
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

const Profile = () => {

    /*
        Initialize React hooks like states, context and etc.
    */
    const { user, setUser } = useContext(AuthContext)
    const [openModal, setOpenModal] = useState(false)
    const [editProfilePhoto, setEditProfilePhoto] = useState(false)
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
        console.log(userData)
        try {
            let response = await axiosInstance.post('/user/update-user-details', userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.data.success) {
                setOpenModal(false)
                setUser(response.data.data.authUser)
            }
        } catch (error) {

        }
    }

    return (
        <>
            {/* basic info modal */}
            <Modal submit={saveUserDetails} openModal={openModal} setOpenModal={setOpenModal} title="Edit Profile" icon={<CiEdit className=" text-xl text-lnk-orange" />} maxWidth="max-w-xl">
                <LnkInput onChange={handleOnChange} value={userData.firstName} name='firstName' type='text' className='mb-3' placeholder="First name" label='First name' />
                <LnkInput onChange={handleOnChange} value={userData.lastName} name='lastName' type='text' className='mb-3' placeholder="Last name" label='Last name' />
                <LnkInput onChange={handleOnChange} value={userData.headline} name='headline' type='text' className='mb-3' placeholder="Headline" label='Headline' />
                <LnkInput onChange={handleOnChange} value={userData.dateOfBirth} name='dateOfBirth' type='date' className='mb-3' label='Date of Birth' />
                <LnkInput onChange={handleOnChange} value={userData.address} name='address' type='text' className='mb-3' label='Address' />
                <LnkTextarea onChange={handleOnChange} value={userData.about} name='about' className='mb-3' label='About' placeholder='Tell a little bit about yourself' />
            </Modal>
            {/* edit profile picture modal */}
            <Modal openModal={editProfilePhoto} setOpenModal={setEditProfilePhoto} title="Change Profile Photo" icon={<AiFillPicture className=" text-xl text-lnk-orange" />} maxWidth="max-w-xl">
                <div className=" flex items-center justify-center">
                    <label htmlFor="profile__photo" className=" cursor-pointer">
                        <div className=" w-80 h-80 rounded-full border border-lnk-orange">
                            <img className=" w-full h-full object-cover rounded-full" src="https://images.pexels.com/photos/3779760/pexels-photo-3779760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                        </div>
                    </label>
                    <input type="file" hidden id="profile__photo" accept=".png,.webp,.jpeg,.jpg" />
                </div>
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
                            <img className="rounded-full w-full h-full object-cover" src="https://images.pexels.com/photos/3779760/pexels-photo-3779760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
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
                                <h6 className=" text-2xl font-bold">{isNull(user.first_name) || isNull(user.last_name) ? user.username : user.first_name + ' ' + user.last_name}</h6>
                                {
                                    !isNull(user.headline) ? (
                                        <p className=" text-sm font-normal ">{user.headline}</p>
                                    ) : null
                                }
                                {
                                    !isNull(user.address) ? (
                                        <p className=" text-xs font-light mb-1 ">{user.address}</p>
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
                <Post />
            </section>
        </>
    )
}

export default Profile