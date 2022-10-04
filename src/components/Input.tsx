import React from 'react'
import { BiImageAdd } from "react-icons/bi";

export const Input = () => {
    return (
        <div className="h-14 bg-white p-3 flex justify-between ">
            <input type="text" placeholder="Message" className="w-full outline-none " />
            <div className="flex gap-2 items-center">
                <label htmlFor="file" className="cursor-pointer">
                    <BiImageAdd size={30} className="text-gray-500" />
                </label>
                <input className="hidden" type="file" id="file"></input>
                <button className="bg-[#5d5b8d] px-3 py-1 text-sm text-white/80 cursor-pointer hover:text-white">Send</button>
            </div>
        </div>
    )
}
