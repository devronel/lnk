import { isNull, path } from '../../utils/functions'

/*
    Import assets (images, videos etc.)
*/
import profilePlacholder from '../../assets/profile-placeholder.jpg'
import coverPhotoPlaceholder from "../../assets/cover-photo-placeholder.png"

const LeftSidebar = ({ fullName, username, headline, address, profileUrl, coverPhoto }) => {
    return (
        <div className='hidden md:block col-span-2'>
            <div className=" relative overflow-hidden rounded border border-lnk-gray bg-lnk-white">
                <div className=" h-16 w-full border-b border-lnk-gray">
                    <img
                        className=" aspect-[4/1] w-full"
                        src={isNull(coverPhoto) ? coverPhotoPlaceholder : path(coverPhoto)}
                        alt={fullName ?? username}
                    />
                </div>
                <div className=" rounded-full overflow-hidden border border-lnk-white absolute top-6 left-2">
                    <img
                        className="w-14 aspect-square object-cover"
                        src={isNull(profileUrl) ? profilePlacholder : path(profileUrl)}
                        alt={fullName ?? username}
                    />
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