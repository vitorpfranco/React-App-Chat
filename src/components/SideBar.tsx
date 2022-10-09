import React from 'react'
import { Chats } from './Chats'
import { Navbar } from './Navbar'
import { Search } from './Search'

export const SideBar = () => {
    return (

        <div className="bg-[#F5F7FB] dark:bg-darkContent">
            <Navbar />
            <Search />
            <Chats />
        </div>
    )
}
