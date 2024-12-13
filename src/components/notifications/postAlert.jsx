const PostAlert = () => {
    return (
        <>
            <div className=" flex items-center gap-2 p-4 border-b border-lnk-gray">
                <div className=" w-9 h-9 rounded-full">
                    <img className=" w-full h-full object-cover rounded-full" src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                </div>
                <p className=" flex-grow text-sm font-light"><span className=" font-bold">Rhaegar Targaryen</span> has new post.</p>
            </div>
        </>
    )
}

export default PostAlert