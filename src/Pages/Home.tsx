import React from 'react'
import { Chat } from '../components/Chat'
import { SideBar } from '../components/SideBar'

export const Home = () => {
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-slate-300 dark:bg-dark">
            <div className="rounded-xl w-[90%] h-full max-h-[760px] max-w-[1100px] grid grid-cols-3 overflow-hidden shadow-lg">
                <SideBar />
                <Chat />
            </div>
        </div>
    )
}
