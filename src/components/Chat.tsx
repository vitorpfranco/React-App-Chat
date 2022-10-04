import React from 'react'
import photo from '../assets/profile.jpg'
import { Input } from './Input'
import { Messages } from './Messages'

export const Chat = () => {
    return (
        <div className="col-span-2 h-full" >
            <div className="flex gap-2 items-center px-4 py-2 bg-[#2f2d52] h-12 text-white tracking-wide	">
                <img src={photo} alt="" className="h-8 w-8 rounded-full object-cover" />
                <span>Vitão</span>
            </div>
            <Messages />
            <Input />
        </div>
    )
}
