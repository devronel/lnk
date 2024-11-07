import { MdOutlinePersonAdd } from "react-icons/md";
import { SERVER_URL } from '../utils/axios'
import { isNull } from '../utils/functions'

/*
    Import assets (images, videos etc.)
*/
import profilePlacholder from '../assets/profile-placeholder.jpg'

const PeopleCard = ({ fullName, headline, address, profileUrl, username }) => {
    return (
        <div>
            <div className="h-full flex flex-col relative overflow-hidden rounded border border-lnk-gray bg-lnk-white">
                <div className=" h-16 w-full">
                    <img className=" w-full h-full object-cover" src="https://images.pexels.com/photos/633409/pexels-photo-633409.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                </div>
                <div className=" w-14 h-14 rounded-full overflow-hidden border border-lnk-white absolute top-8 left-2">
                    <img className=" w-full h-full object-cover" src={isNull(profileUrl) ? profilePlacholder : SERVER_URL + profileUrl} alt="" />
                </div>
                <div className=" pt-8 px-2 mb-4 flex-1">
                    <h4 className=" font-bold text-lg">{isNull(fullName) ? username : fullName}</h4>
                    <p className=" font-normal text-xs">{isNull(headline) ? 'Not available' : headline}</p>
                    <p className=" font-light text-xs text-lnk-dark-gray">{isNull(address) ? null : address}</p>
                </div>
                <div className=" px-2 pb-3">
                    <button className=" text-sm rounded border border-lnk-orange px-2 py-1 w-full hover:bg-lnk-orange hover:text-lnk-white transition-all ease-linear duration-150">
                        <MdOutlinePersonAdd className="text-lg inline-block align-middle mr-2" />
                        <span className=" align-middle">Follow</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PeopleCard