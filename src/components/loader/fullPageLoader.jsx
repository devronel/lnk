import './fullPageLoader.css'

const FullPageLoader = () => {
    return (
        <>
            <div className='fixed inset-0 z-[70] min-h-screen h-auto w-full flex flex-col items-center justify-center bg-lnk-white'>
                <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 187.3 93.7" height="80px" width="200px">
                    <path d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 				c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z" strokeMiterlimit="10" strokeLinejoin="round" strokeLinecap="round" strokeWidth="4" fill="none" id="outline" stroke="#FF6500"></path>
                    <path d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 				c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z" strokeMiterlimit="10" strokeLinejoin="round" strokeLinecap="round" strokeWidth="4" stroke="#FF6500" fill="none" opacity="0.05" id="outline-bg"></path>
                </svg>
                <p className=' text-xl font-bold text-lnk-orange'>lnk</p>
            </div>
        </>
    )
}

export default FullPageLoader