import React, { useContext, useEffect, useRef, useState } from 'react'
import photo from '../assets/profile.jpg'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
interface messageProps {
    date: Date;
    id: string;
    senderId: string;
    text: string;
    photo: string;
}
export const Message = ({ date, id, senderId, text, photo }: messageProps) => {
    const currentUser = useContext(AuthContext)
    const { data } = useContext(ChatContext)
    const ref = useRef<HTMLHeadingElement>(null)

    return (
        <div ref={ref} className={"flex gap-3 mt-4 text-center items-center mx-3" + (senderId === currentUser?.uid ? ' flex-row-reverse' : ' ')}>
            {/*             {senderId !== currentUser?.uid && <div>
                <img src={senderId === currentUser?.uid ? currentUser.photoURL : data.user.photoURL} alt="" className="h-12 w-12 rounded-full object-cover" />
            </div>} */}
            <div className="m-w-[80%] flex flex-col gap-2 ">
                {photo && <img src={photo} className="max-h-64 rounded" />}
                {text.length > 0 && <p className={"px-4 py-2 rounded-lg  w-fit" + (senderId === currentUser?.uid ? ' bg-[#1F98DF] dark:bg-mainPurple/80 rounded-tr-none ml-auto dark:text-white' : ' bg-white rounded-tl-none')}>{text}</p>}
            </div>
            {/* px-4 py-2 rounded-lg rounded-tl-none w-fit */}
        </div>
    )
}
