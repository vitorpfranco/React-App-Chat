import React from 'react'
import { Chat } from '../components/Chat'
import { SideBar } from '../components/SideBar'

export const Home = () => {
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-[#a7bcff]">
            <div className="border-white border rounded-xl w-3/5 h-5/6 grid grid-cols-3 overflow-hidden">
                <SideBar />
                <Chat />
            </div>
        </div>
    )
}
