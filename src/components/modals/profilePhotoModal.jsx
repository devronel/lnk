import { useState, useRef, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import axiosInstance from "../../utils/axios"
import Modal from "../modal"
import Cropper from "react-cropper"
import { filesize } from "filesize"
import { convertBytes, dataURLtoFile, isNull } from "../../utils/functions"
import { MdError } from "react-icons/md"
import { FaCheck } from "react-icons/fa"
import { AiFillPicture } from "react-icons/ai"

const ProfilePhotoModal = ({ displayPhoto, setDisplayPhoto }) => {

    const cropperRef = useRef()
    const { user, setUser, refreshUser } = useContext(AuthContext)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [photoBytes, setPhotoBytes] = useState(0)
    const [cropImage, setCropImage] = useState(null)

    const closeModal = () => {
        setDisplayPhoto(null)
        setCropImage(null)
        setIsLoading(false)
        setError(null)
    }

    const onCrop = () => {
        let cropper = cropperRef.current?.cropper;
        let base64Img = cropper.getCroppedCanvas().toDataURL()
        setPhotoBytes(convertBytes(base64Img))
        setCropImage(base64Img);
    };

    const save = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            let photo = dataURLtoFile(cropImage)
            let response = await axiosInstance.post('/user/change-profile-photo', { profilePhoto: photo },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )

            if (response.status === 200) {
                setIsLoading(false)
                setError(null)
                setDisplayPhoto(null)
                setCropImage(null)
                setPhotoBytes(null)
                refreshUser()
            }

        } catch (error) {
            setIsLoading(false)
            setError(error.response.data.message)
        }
    }

    return (
        <Modal submit={save} openModal={!isNull(displayPhoto)} loader={isLoading} closeModal={closeModal} title="Change Profile Photo" icon={<AiFillPicture className=" text-xl text-lnk-orange" />}>
            {
                !isNull(error) ? (
                    <p className="text-left text-xs mb-2 text-red-500 italic flex items-center">
                        <MdError className=" text-base" />
                        {error}
                    </p>
                ) : null
            }
            <div className=" mb-2">
                {
                    photoBytes > 1000000 ? (
                        <p className=" text-red-500 flex items-center gap-1 text-xs italic">
                            <MdError className=" text-base" />
                            {filesize(photoBytes)}
                        </p>
                    ) : <p className=" text-green-500 flex items-center gap-1 text-xs italic">
                        <FaCheck className=" text-xs" />
                        {filesize(photoBytes)}
                    </p>
                }
            </div>

            <div className=" flex flex-col items-center justify-center gap-2">
                <Cropper
                    src={displayPhoto}
                    style={{ height: 300, width: "100%" }}
                    initialAspectRatio={1 / 1}
                    aspectRatio={1 / 1}
                    guides={false}
                    crop={onCrop}
                    name="profilePhoto"
                    ref={cropperRef}
                />
                {
                    !isNull(cropImage) ? (
                        <div className=" rounded-full aspect-square">
                            <img src={cropImage} width='144' className=" object-cover rounded-full aspect-square" alt="" />
                        </div>
                    ) : null
                }
            </div>
        </Modal>
    )
}

export default ProfilePhotoModal