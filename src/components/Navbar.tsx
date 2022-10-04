import React from 'react'
export const Navbar = () => {
    return (
        <div className="flex justify-between px-2 bg-[#2f2d52] h-12 items-center" >
            <span className="text-[#5d5b8d] font-semibold ">
                Franco Chat
            </span>
            <div className="flex gap-2">
                <img src='' alt="" className="bg-purple-300 h-6 w-6 rounded-full object-cover" />
                <span>Vitor</span>
                <button className="bg-[#5d5b8d] text-xs px-2 text-white/80 cursor-pointer hover:text-white">Logout</button>
            </div>
        </div>
    )
}
