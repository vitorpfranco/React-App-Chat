import React from 'react'
import photo from '../assets/profile.jpg'

export const Message = () => {
    return (
        <div className="flex gap-3 mt-2 text-center items-center">
            <div>
                <img src={photo} alt="" className="h-12 w-12 rounded-full object-cover" />
                <span>Just Now</span>
            </div>
            <div className="m-w-[80%] flex flex-col gap-2 ">
                {/* <img src={photo} alt="" className="w-32" /> */}
                <p className="bg-white px-4 py-2 rounded-lg rounded-tl-none w-fit">testaaa</p>

            </div>
        </div>
    )
}
