import { isNull } from '../utils/functions'
import { SERVER_URL } from '../utils/axios'

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
                <div className=" w-16 h-16 rounded-full overflow-hidden border border-lnk-white absolute top-8 left-2">
                    <img className=" w-full h-full object-cover" src={isNull(profileUrl) ? profilePlacholder : SERVER_URL + profileUrl} alt="" />
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