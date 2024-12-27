import { useState, useRef, useContext } from "react"
import axiosInstance from "../../utils/axios";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { filesize } from "filesize";
import { AuthContext } from "../../context/AuthContext";
import { convertBytes, dataURLtoFile, isNull } from "../../utils/functions";
import Modal from "../modal"
import { AiFillPicture } from "react-icons/ai"
import { FaCheck } from "react-icons/fa"
import { MdError } from "react-icons/md"

const CoverPhotoModal = ({ coverPhoto, setCoverPhoto }) => {

    const cropperRef = useRef()
    const { refreshUser } = useContext(AuthContext)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [cropImage, setCropImage] = useState(null)
    const [photoBytes, setPhotoBytes] = useState(0)

    const closeModal = () => {
        reset()
    }

    const reset = () => {
        setIsLoading(false)
        setCoverPhoto(null)
        setCropImage(null)
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
            let photo = dataURLtoFile(cropImage)
            setIsLoading(true)
            let response = await axiosInstance.post('/user/change-cover-photo', { coverPhoto: photo }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (response.status === 200) {
                reset()
                refreshUser()
            }
        } catch (error) {
            setIsLoading(false)
            setError(error.response.data.message)
        }
    }

    return (
        <Modal
            submit={save}
            loader={isLoading}
            openModal={!isNull(coverPhoto)}
            closeModal={closeModal}
            title="Change Cover Photo"
            icon={<AiFillPicture className=" text-xl text-lnk-orange" />}
            maxSize={'max-w-2xl'}
        >
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
            <>
                <Cropper
                    src={coverPhoto}
                    style={{ height: 200, width: "100%" }}
                    initialAspectRatio={4 / 1}
                    aspectRatio={4 / 1}
                    guides={false}
                    crop={onCrop}
                    viewMode={1}
                    name="coverPhoto"
                    ref={cropperRef}
                />
                {
                    cropImage !== null ? (
                        <div className=" mt-3">
                            <img src={cropImage} className="w-full object-contain aspect-[4/1]" alt="" />
                        </div>
                    ) : null
                }
            </>
        </Modal>
    )
}

export default CoverPhotoModal