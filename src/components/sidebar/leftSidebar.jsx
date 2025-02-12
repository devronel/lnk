import { isNull, path } from '../../utils/functions'
import profilePlacholder from '../../assets/profile-placeholder.jpg'
import coverPhotoPlaceholder from "../../assets/cover-photo-placeholder.png"

const LeftSidebar = ({ fullName, username, headline, address, profileUrl, coverPhoto, userLastSeen }) => {
    return (
        <div className='hidden md:block col-span-2'>
            <div className=" relative overflow-hidden rounded shadow border border-lnk-gray bg-lnk-white">
                <div className=" ">
                    <img
                        className="h-16 aspect-[4/1] w-full border-b border-lnk-gray"
                        src={isNull(coverPhoto) ? coverPhotoPlaceholder : path(coverPhoto)}
                        alt={`Cover photo of ${fullName ?? username}`}
                    />
                </div>
                <div className=" rounded-full border border-lnk-white absolute top-9 left-2">
                    <img
                        className="w-12 aspect-square rounded-full object-cover"
                        src={isNull(profileUrl) ? profilePlacholder : path(profileUrl)}
                        alt={`Profile of ${fullName ?? username}`}
                    />
                    { userLastSeen ? <span className={`absolute -bottom-[1px] right-2 inline-block w-2 h-2 rounded-full border border-lnk-gray bg-green-500`}></span> : null }
                </div>
                <div className=" pt-6 pb-3 px-2">
                    <h4 className=" font-bold text-base">{fullName ?? username}</h4>
                    <p className=" font-normal text-xs">{headline ?? 'No headline available'}</p>
                    <p className=" font-light text-xs text-lnk-dark-gray">{address}</p>
                </div>
            </div>
        </div>
    )
}

export default LeftSidebar