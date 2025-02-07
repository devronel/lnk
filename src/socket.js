import { io } from "socket.io-client";
import { SERVER_URL } from "./utils/axios"

export const socket = io(SERVER_URL, {
    autoConnect: false,
    withCredentials: true
})