import axiosInstance from "../utils/axios";
import { MdOutlinePersonAdd } from "react-icons/md";
import { isNull, path } from '../utils/functions'
import { FaCheck } from "react-icons/fa";

/*
    Import assets (images, videos etc.)
*/
import profilePlacholder from '../assets/profile-placeholder.jpg'
import coverPhotoPlaceholder from "../assets/cover-photo-placeholder.png"
import { Link } from "react-router-dom";

const PeopleCard = ({ userId, fullName, headline, address, profileUrl, username, coverPhoto, friendStatus, refreshUser }) => {

    const addFriend = async () => {
        try {
            const response = await axiosInstance.post('/friend/add', {
                friendId: userId,
                status: 'Pending'
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.status === 200) {
                refreshUser()
            }
        } catch (error) {
            console.log(error.response)
        }
    }

    const checkFriendStatus = () => {
        if (isNull(friendStatus)) {
            return (
                <button onClick={addFriend} className=" text-sm rounded border border-lnk-orange px-2 py-1 w-full hover:bg-lnk-orange hover:text-lnk-white transition-all ease-linear duration-150">
                    <MdOutlinePersonAdd className="text-lg inline-block align-middle mr-2" />
                    <span className=" align-middle">Add Friend</span>
                </button>
            )
        } else if (friendStatus === 'Pending') {
            return (
                <p className=" text-green-400 text-sm flex items-center gap-1 font-bold">
                    <FaCheck />
                    Request Sent
                </p>
            )
        }
    }

    return (
        <div className="">
            <div className="h-full flex flex-col overflow-hidden rounded border border-lnk-gray bg-lnk-white">
                <div className=" relative">
                    <div className=" h-auto w-full border-b border-lnk-gray">
                        <img className=" aspect-[4/1]" src={(path(coverPhoto)) ?? coverPhotoPlaceholder} alt="" />
                    </div>
                    <div className=" w-14 h-14 rounded-full overflow-hidden border border-lnk-white absolute -bottom-6 left-2">
                        <img className=" w-full h-full object-cover" src={isNull(profileUrl) ? profilePlacholder : path(profileUrl)} alt="" />
                    </div>
                </div>
                <div className=" pt-8 px-2 mb-4 flex-1">
                    <Link to={`/profile-info/${username}`} className=" font-bold text-lg hover:underline">{isNull(fullName) ? username : fullName}</Link>
                    <p className=" font-normal text-xs">{isNull(headline) ? <p></p> : headline}</p>
                    <p className=" font-light text-xs text-lnk-dark-gray">{isNull(address) ? null : address}</p>
                </div>
                <div className=" px-2 pb-3">
                    {
                        checkFriendStatus()
                    }
                </div>
            </div>
        </div>
    )
}

export default PeopleCard