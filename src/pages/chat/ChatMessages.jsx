import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'
import { socket } from '../../socket';
import chat from '../../assets/chat.svg'
import { GoDotFill } from "react-icons/go";
import { FaVideo } from "react-icons/fa";
import { GrSend } from "react-icons/gr";
import profilePlaceholder from "../../assets/profile-placeholder.jpg"

const ChatMessages = () => {

    const messageContainerRef = useRef(null)
    const { username } = useParams()
    const { user } = useContext(AuthContext)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [userProfile, setUserProfile] = useState(null)
    const [convesationId, setConversationId] = useState(null)

    function onChangeHandler(e){
        setMessage(e.target.value)
    }

    function sendMessage(e){
        e.preventDefault()
        socket.emit('chat:send-message', { recipient_id: userProfile.userId, message: message })
    }

    function getMessage(payload){
        setMessages(payload)
        setMessage('')
    }

    function getUserProfile(payload){
        setUserProfile(payload)
    }

    useEffect(() => {

        const userProfile = setTimeout(() => {
            socket.emit(`chat:get-user-profile-${user?.id}`, { username: username })
            socket.on(`chat:user-profile-${user?.id}`, getUserProfile)
        }, 200)


        return () => {
            socket.off(`chat:user-profile-${user?.id}`, getUserProfile)
            clearTimeout(userProfile)
        }
    }, [username])

    useEffect(() => {
        let room;
        if(userProfile){
            room = userProfile?.room
            socket.emit(`chat:get-messages-${user?.id}`, { id: userProfile?.userId, room: room })
            socket.on(`chat:messages-${room}`, getMessage)
        }


        return () => {
            socket.off(`chat:messages-${room}`, getMessage)
        }
    }, [userProfile])

    useEffect(() => {
        messageContainerRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <>
            <div className=' h-full w-full relative'>
                <div className=' bg-lnk-white py-3 px-4 border-b border-lnk-orange flex items-center justify-between'>
                    <div className=' flex items-center gap-3'>
                        <img 
                            src={userProfile?.profile ?? profilePlaceholder}
                            alt="" 
                            className=' w-10 aspect-square rounded-full'
                        />
                        <div>
                            <h2 className='font-bold text-base'>{userProfile?.full_name ?? userProfile?.username}</h2>
                            <p className=' font-light text-xs flex items-center'>
                                <GoDotFill className='text-sm text-green-500' />
                                Online
                            </p>
                        </div>
                    </div>
                    <div>
                        <button className='border border-lnk-orange bg-lnk-orange/35 py-1 px-2 rounded-md'>
                            <FaVideo className='' />
                        </button>
                    </div>
                </div>
                <main className=' px-4 bg-lnk-white overflow-auto absolute left-0 right-0 bottom-[62px] top-[66px]'>
                    <div className='h-full flex flex-col items-center justify-center'>
                        <img 
                            src={chat} 
                            alt=""
                            className=' w-72 aspect-video' 
                        />
                        <p className=' font-semibold text-lnk-dark-gray text-lg'>Start a new chat with {userProfile?.first_name ?? userProfile?.username}.</p>
                    </div>

                    {/* CONVERSATION */}
                    <div ref={messageContainerRef} className=' flex flex-col gap-3'>
                        {
                            messages.map((value, index) => {
                                return (
                                    value.sender_id === userProfile.userId ? (
                                        <div key={value.chatMessageId}>
                                            <div className="flex items-start gap-2.5">
                                                <img 
                                                    className="w-8 h-8 rounded-full" 
                                                    src={userProfile?.profile ?? profilePlaceholder}
                                                    alt={userProfile?.full_name ?? userProfile?.username}
                                                />
                                                <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 shadow border border-lnk-gray bg-lnk-gray rounded-e-xl rounded-es-xl">
                                                    <p className="text-sm font-normal pb-2 text-lnk-dark">{value.message}</p>
                                                    <div className='flex items-center justify-end'>
                                                        <span className="text-sm font-normal text-gray-500">9:20AM</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div key={value.chatMessageId} className=' flex items-center justify-end'>
                                            <div className="flex items-start gap-2.5">
                                                <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4  bg-lnk-orange rounded-b-xl rounded-tl-xl">
                                                    <p className="text-sm font-normal pb-2 text-lnk-white">{value.message}</p>
                                                    <div className='flex items-center justify-end'>
                                                        <span className="text-sm font-normal text-lnk-gray">9:20AM</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )

                                )
                            })
                        }
                    </div>

                </main>
                <div className=' absolute bottom-0 left-0 right-0 px-3 py-2 bg-lnk-white'>
                    <form onSubmit={sendMessage} className=' relative'>
                        <input 
                            onChange={onChangeHandler}
                            value={message}
                            name='message'
                            type="text"
                            placeholder='Type your message...'
                            className='pl-4 pr-12 py-3 w-full rounded border font-lato text-sm outline-none focus:outline focus:outline-lnk-orange'
                        />
                        <button type='submit' className='text-xl  text-lnk-orange absolute right-4 top-1/2 -translate-y-1/2'>
                            <GrSend />
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ChatMessages