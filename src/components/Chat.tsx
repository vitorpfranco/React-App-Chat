import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
import { Input } from './Input'
import { Messages } from './Messages'

export const Chat = () => {
    const { data } = useContext(ChatContext)
    return (
        <div className="col-span-2 h-full" >
            <div className="flex gap-2 items-center px-4 py-2 bg-[#2f2d52] h-12 text-white tracking-wide	">
                <img src={data.user?.photo} alt="" className="h-8 w-8 rounded-full object-cover" />
                <span>{data.user?.displayName}</span>
            </div>
            <Messages />
            <Input />
        </div>
    )
}
