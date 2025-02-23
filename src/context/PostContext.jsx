import { createContext, useState } from "react";
import axiosInstance from "../utils/axios";
import { forEach, isNull } from "lodash";

export const PostContext = createContext(null)

export const PostContextProvider = ({ children }) => {

    const [page, setPage] = useState(0)
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    // Fetch all initial post, It run ony once
    async function fetchAllPost(){
        try {
            const post = await axiosInstance.get(`/post/all?pages=${page}`, { withCredentials: true })
            if(post.data.success){
                const { result, next_page } = post.data.payload
                setPosts(result)
                setPage(next_page)
            }
        } catch (error) {
            console.log(error.response)
        }
    }

    // Fetch all posts when the user reaches the bottom of the page and update the state.
    async function fetchAllInfiniteScroll(postPage){
        try {
            setIsLoading(true)
            const post = await axiosInstance.get(`/post/all?pages=${postPage}`, { withCredentials: true })
            if(post.data.success){
                setIsLoading(false)
                const { result, next_page } = post.data.payload
                setPosts(prevState => [...prevState, ...result])
                setPage(next_page)
            }
        } catch (error) {
            setIsLoading(false)
            console.log(error.response)
        }
    }

    // Reaction to post and update the spicific post in state
    async function likePost(postId, reaction){
        try {
            const like = await axiosInstance.post(`/post/like/${postId}/${reaction}`, {}, {
                withCredentials: true
            })
            if(like.data.success){

                const { reaction, usersReaction } = like.data.payload
                const reactions = []
                
                usersReaction.forEach(value => {
                    reactions.push(value.reaction_type)
                })

                if(like.data.payload.reaction){
                    const postIndex = posts.findIndex(post => post.id === reaction.post_id)
                    setPosts(prevState => {
                        const updatePost = [...prevState]
                        updatePost[postIndex] = { 
                            ...updatePost[postIndex],
                            post_reactions: [...new Set(reactions)].toString(),
                            reaction_count: usersReaction.length,
                            user_reaction: reaction.reaction_type  ?? null
                        }
                        return updatePost
                    })
                }else{
                    const postIndex = posts.findIndex(post => post.id === postId)
                    setPosts(prevState => {
                        const updatePost = [...prevState]
                        updatePost[postIndex] = { 
                            ...updatePost[postIndex],
                            post_reactions: [...new Set(reactions)].toString(),
                            reaction_count: usersReaction.length,
                            user_reaction: null
                        }
                        return updatePost
                    })
                }

            }
        } catch (error) {
            console.error(error)
        }
    }

    return ( 
        <PostContext.Provider value={{
            page,
            posts,
            isLoading,
            setPosts,
            fetchAllPost,
            fetchAllInfiniteScroll,
            likePost
        }}>
            {children}
        </PostContext.Provider>
    )
}