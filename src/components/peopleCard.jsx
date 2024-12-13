import { MdOutlinePersonAdd } from "react-icons/md";
import { isNull, path } from '../utils/functions'

/*
    Import assets (images, videos etc.)
*/
import profilePlacholder from '../assets/profile-placeholder.jpg'
import coverPhotoPlaceholder from "../assets/cover-photo-placeholder.png"

const PeopleCard = ({ fullName, headline, address, profileUrl, username, coverPhoto }) => {
    return (
        <div>
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