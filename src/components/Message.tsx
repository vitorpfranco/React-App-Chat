import React, { useContext, useEffect, useRef, useState } from 'react'
import photo from '../assets/profile.jpg'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
interface messageProps {
    date: Date;
    id: string;
    senderId: string;
    text: string;
}
export const Message = ({ date, id, senderId, text }: messageProps) => {
    const currentUser = useContext(AuthContext)
    const { data } = useContext(ChatContext)
    const ref = useRef<HTMLHeadingElement>(null)
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" })
    }, [id])
    return (
        <div ref={ref} className="flex gap-3 mt-2 text-center items-center">
            <div>
                <img src={senderId === currentUser?.uid ? currentUser.photoURL : data.user.photoURL} alt="" className="h-12 w-12 rounded-full object-cover" />
                <span>just now</span>
            </div>
            <div className="m-w-[80%] flex flex-col gap-2 ">
                {/* <img src={photo} alt="" className="w-32" /> */}
                <p className="bg-white px-4 py-2 rounded-lg rounded-tl-none w-fit">{text}</p>

            </div>
        </div>
    )
}
