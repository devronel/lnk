import { isNull, path } from '../utils/functions'

/*
    Import assets (images, videos etc.)
*/
import profilePlacholder from '../assets/profile-placeholder.jpg'

const LeftSidebar = ({ firstName, lastName, username, headline, address, profileUrl }) => {
    return (
        <div>
            <div className=" relative overflow-hidden rounded border border-lnk-dark-gray bg-lnk-white">
                <div className=" h-16 w-full">
                    <img className=" w-full h-full object-cover" src="https://images.pexels.com/photos/633409/pexels-photo-633409.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                </div>
                <div className=" w-16 h-16 aspect-square rounded-full overflow-hidden border border-lnk-white absolute top-8 left-2">
                    <img
                        width='64'
                        height='64'
                        className=" aspect-square object-cover"
                        src={isNull(profileUrl) ? profilePlacholder : path(profileUrl)}
                        alt={isNull(firstName) || isNull(lastName) ? username : firstName + ' ' + lastName}
                    />
                </div>
                <div className=" pt-10 pb-3 px-2">
                    <h4 className=" font-bold text-lg">{isNull(firstName) || isNull(lastName) ? username : firstName + ' ' + lastName}</h4>
                    <p className=" font-normal text-xs">{isNull(headline) ? 'No headline available' : headline}</p>
                    <p className=" font-light text-xs text-lnk-dark-gray">{address}</p>
                </div>
            </div>
        </div>
    )
}

export default LeftSidebar