import comingSoon from '../../assets/coming-soon.svg'

const ChatHome = () => {
    return (
        <div className='pt-10 h-auto w-full flex flex-col items-center justify-center gap-2'>
            <img width={500} src={comingSoon} alt="" />
            <p className=' text-2xl text-lnk-dark-gray font-bold'>Coming Soon!</p>
        </div>
    )
}

export default ChatHome