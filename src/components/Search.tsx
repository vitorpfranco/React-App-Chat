import React from 'react'
import photo from '../assets/profile.jpg'

export const Search = () => {
    return (
        <div className="border-gray-400 border-b px-2 py-2">
            <div className="">
                <input placeholder="Find a user" type="text" className="bg-inherit text-white " />
            </div>
            <div className="flex gap-2 items-center mt-3">
                <img src={photo} alt="" className="bg-purple-300 h-12 w-12 rounded-full object-cover" />
                <span className="text-white font-semibold">Vitão</span>
            </div>
        </div>
    )
}
