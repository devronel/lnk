import empty from "../../assets/empty.svg"

const EmptyFriend = () => {
    return (
        <>
            <div className=" mt-4 flex items-center justify-center">
                <img src={empty} width={250} height={250} alt="empty" />
            </div>
            <p className=" text-sm text-center text-lnk-dark-gray">No one's here!</p>
        </>
    )
}

export default EmptyFriend