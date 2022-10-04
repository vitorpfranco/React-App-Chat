import React from 'react'
import photo from '../assets/profile.jpg'

export const Chats = () => {
    return (
        <div className="mx-2">
            <div className="flex gap-2 items-center mt-4">
                <img src={photo} alt="" className="h-12 w-12 rounded-full object-cover" />
                <div className="flex flex-col">
                    <span className="text-white font-semibold">Vitão</span>
                    <p className="text-sm">Hello!</p>
                </div>
            </div>
            <div className="flex gap-2 items-center mt-4">
                <img src={photo} alt="" className="h-12 w-12 rounded-full object-cover" />
                <div className="flex flex-col">
                    <span className="text-white font-semibold">Vitão</span>
                    <p className="text-sm">Hello!</p>
                </div>
            </div>
            <div className="flex gap-2 items-center  mt-4">
                <img src={photo} alt="" className="h-12 w-12 rounded-full object-cover" />
                <div className="flex flex-col">
                    <span className="text-white font-semibold">Vitão</span>
                    <p className="text-sm">Hello!</p>
                </div>
            </div>
        </div>
    )
}
