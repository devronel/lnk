import FollowingAlert from "../../components/notifications/following-alert"
import PostAlert from "../../components/notifications/post-alert"
import underConstruction from '../../assets/under-construction.svg'


const Notifications = () => {
    return (
        <>
            {/* <section className=" p-3 rounded border border-lnk-gray bg-lnk-white mb-3">
                <h1 className="">Notifications</h1>
            </section>
            <section className=" rounded border border-lnk-gray bg-lnk-white mb-3">
                <FollowingAlert />
                <PostAlert />
                <FollowingAlert />
            </section> */}
            <div className='pt-10 h-auto w-full flex flex-col items-center justify-center gap-2'>
                <img width={500} src={underConstruction} alt="" />
                <p className=' text-2xl text-lnk-dark-gray font-bold'>Ongoing</p>
            </div>
        </>
    )
}

export default Notifications