import React from 'react'
import { Link } from 'react-router-dom'

export const Login = () => {
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-[#a7bcff]">
            <div className="bg-white/90 py-5 px-12 rounded-lg shadow-lg flex flex-col gap-3 items-center">
                <span className="text-[#5d5b8d] font-semibold text-3xl">Franco Chat</span>
                <h1 className=" text-[#5d5b8d] font-medium text-lg">Login</h1>
                <form className="flex flex-col gap-4 w-72">
                    <input className="p-4 bg-inherit border-b border-[#a7bcff] placeholder:text-black/70" type="email" placeholder="Email" />
                    <input className="p-4 bg-inherit border-b border-[#a7bcff] placeholder:text-black/70" type="password" placeholder="Password" />
                    <button className="text-white p-3 font-bold bg-[#7b96ec] hover:bg-[#516cc5]">Sign Up</button>
                </form>
                <p className="text-sm mt-2" >Don't you have an account? <Link className="text-[#5d5b8d] hover:text-[#2f2f4e]" to="/register">Register</Link></p>
            </div>

        </div >
    )
}
