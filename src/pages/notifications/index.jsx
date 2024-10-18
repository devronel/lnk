import FollowingAlert from "../../components/notifications/following-alert"
import PostAlert from "../../components/notifications/post-alert"


const Notifications = () => {
    return (
        <>
            <section className=" p-3 rounded border border-lnk-gray bg-lnk-white mb-3">
                <h1 className="">Notifications</h1>
            </section>
            <section className=" rounded border border-lnk-gray bg-lnk-white mb-3">
                <FollowingAlert />
                <PostAlert />
                <FollowingAlert />
            </section>
        </>
    )
}

export default Notifications