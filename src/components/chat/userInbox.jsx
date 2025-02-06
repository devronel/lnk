const UserInbox = () => {
    return (
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-tr-md rounded-br-md border-l-2 border-lnk-white hover:border-lnk-orange hover:bg-[#FAFAFA]">
            <img 
                src="https://images.pexels.com/photos/943084/pexels-photo-943084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt=""
                className="w-10 aspect-square rounded-full border border-lnk-gray"
            />
            <div className="w-full flex flex-col items-start">
                <div className="w-full flex items-center justify-between">
                    <h2 className="font-bold text-base text-lnk-dark">Amy Acker</h2>
                    <p className=" font-light text-xs">10:46am</p>
                </div>
                <p className="font-light text-sm truncate text-lnk-dark-gray">Hello there</p>
            </div>
        </button>
    )
}

export default UserInbox