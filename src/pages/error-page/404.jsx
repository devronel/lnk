import notFound from "../../assets/not-found.svg"

const NotFound = () => {
    return (
        <div className='min-h-screen h-auto w-full flex flex-col items-center justify-center gap-2'>
            <img width={500} src={notFound} alt="" />
            <p className=' text-2xl text-lnk-dark-gray font-bold'>Not Found</p>
        </div>
    )
}

export default NotFound