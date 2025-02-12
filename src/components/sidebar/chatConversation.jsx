import { useEffect, useState } from "react"
import { socket } from "../../socket"
import UserInbox from "../chat/userInbox"
import LnkInput from "../forms/lnkInput"

const ChatConversation = () => {

    const [conversations, setConversations] = useState([])

    function chatConversation(payload) {
        setConversations(payload)
    }
    
    useEffect(() => {
        socket.connect()

        const fetchConversations = setTimeout(() => {
            socket.emit('chat:get-conversation', {})
            socket.on('chat:conversations', chatConversation)
        }, 200)

        return () => {
            socket.off('chat:conversations', chatConversation)
            clearTimeout(fetchConversations)
        }
    }, [])

    return (
        <aside className="">
            <div className=" relative flex items-start flex-col gap-5 px-3 py-2">
                <div className="w-full flex flex-col gap-3">
                    {
                        conversations.map((value) => (
                            <UserInbox 
                                key={value.conversationId}
                                username={value.username}
                                fullName={value.full_name}
                                profilePhoto={value.profilePhoto}
                            />
                        ))
                    }
                </div>
            </div>
        </aside>
    )
}

export default ChatConversation