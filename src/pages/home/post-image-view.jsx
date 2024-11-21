import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axiosInstance, { SERVER_URL } from "../../utils/axios"

const PostImage = () => {

    let { post_id, username } = useParams()

    const getPost = async () => {
        try {
            let result = await axiosInstance(`/post/${post_id}/${username}`, {
                withCredentials: true
            })

            if (result.data.success) {
                console.log(result.data)
            }

        } catch (error) {
            console.log(error.response)
        }
    }

    useEffect(() => {
        getPost()
    }, [])

    return (
        <h1>Hello {username}</h1>
    )
}

export default PostImage