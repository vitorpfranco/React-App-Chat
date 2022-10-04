import React from 'react'
import { Chats } from './Chats'
import { Navbar } from './Navbar'
import { Search } from './Search'

export const SideBar = () => {
    return (

        <div className="bg-[#3e3c61]">
            <Navbar />
            <Search />
            <Chats />
        </div>
    )
}
