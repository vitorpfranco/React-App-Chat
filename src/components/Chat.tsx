import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
import { Input } from './Input'
import { Messages } from './Messages'

export const Chat = () => {
    const { data } = useContext(ChatContext)
    return (
        <div className="col-span-2 h-full dark:bg-darkContent/70 bg-[#eaeaf7]"  >
            <div className="flex flex-row-reverse gap-2 items-center px-4 py-2 bg-mainBlue/90 h-16 text-white tracking-wide	">
                {data.user.photoURL && <img src={data.user?.photoURL} alt="" className="h-8 w-8 rounded-full object-cover" />}
                <span className="font-semibold">{data.user?.displayName}</span>
            </div>
            {data.chatId !== 'null' ? <>
                <Messages />
                <Input />
            </> :
                <div className="h-[calc(100%-64px)] flex items-center justify-center"><img src="logo_chat.png" className="w-96" /></div>}
        </div>
    )
}
