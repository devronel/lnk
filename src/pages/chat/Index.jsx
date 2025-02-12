import bubbleChat from "../../assets/bubble-chat.png"

const ChatHome = () => {

    return (
        <>
            <main className=" h-full flex flex-col items-center justify-center">
                <img className="w-40 aspect-square" src={bubbleChat} alt="" />
                <div>
                    <h3 className="font-bold text-lnk-dark text-3xl text-center mb-1">
                        Welcome to <span className=" text-lnk-orange">LnkChat</span>
                    </h3>
                    <p className=" text-base text-lnk-dark-gray text-center">Chat with your friends anytime and stay connected no matter where you are.</p>
                </div>
            </main>
        </>
    )
}

export default ChatHome