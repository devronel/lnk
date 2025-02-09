import { Link, useLocation } from "react-router-dom"
import profilePlaceholder from "../../assets/profile-placeholder.jpg"

const UserInbox = (props) => {

    const { username, fullName, profilePhoto } = props
    const location = useLocation()

    return (
        <Link 
            to={`/chat/${username}`} 
            className={`${location.pathname === `/chat/${username}` ? 'border-lnk-orange bg-[#FAFAFA]' : 'border-lnk-white'} w-full flex items-center gap-3 px-3 py-2 rounded-tr-md rounded-br-md border-l-2 hover:border-lnk-orange hover:bg-[#FAFAFA]`}
        >
            <img 
                src={profilePhoto ?? profilePlaceholder} 
                alt={fullName ?? username}
                className="w-10 aspect-square rounded-full border border-lnk-dark"
            />
            <div className="w-full flex flex-col items-start">
                <div className="w-full flex items-center justify-between">
                    <h2 className="font-bold text-base text-lnk-dark">{fullName ?? username}</h2>
                    <p className=" font-light text-xs">10:46am</p>
                </div>
                {/* <p className="font-light text-sm truncate text-lnk-dark-gray">Hello there</p> */}
            </div>
        </Link>
    )
}

export default UserInbox