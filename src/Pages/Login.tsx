import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../config/firebase';
interface loginForm {
    email: string;
    password: string;
}
export const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<loginForm>();
    const navigate = useNavigate()
    async function handleOnLogin(data: loginForm) {
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
            navigate('/')
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-slate-300 dark:bg-dark ">
            <div className="bg-white/90 py-5 px-12 rounded-lg shadow-lg flex flex-col gap-3 items-center dark:bg-darkContent">
                <span className="text-mainBlue font-semibold text-3xl flex items-center gap-2 ">
                    <img src="vite.svg" className="h-12" />VF Chat
                </span>
                <h1 className=" text-black  text-xl dark:text-white font-semibold">Login</h1>
                <form className="flex flex-col gap-6 w-72 dark:text-white/75" onSubmit={handleSubmit(handleOnLogin)}>
                    <input className="py-2 px-4 bg-inherit border-b border-[#a7bcff] placeholder:text-black/70 dark:placeholder:text-white/75 outline-none" type="email" placeholder="Email" {...register("email")} />
                    <input className="py-2 px-4 bg-inherit border-b border-[#a7bcff] placeholder:text-black/70 dark:placeholder:text-white/75 outline-none" type="password" placeholder="Password" {...register("password")} />
                    <button className="text-white p-3 font-bold bg-[#7b96ec] hover:bg-[#516cc5] dark:bg-sky-700 dark:hover:bg-sky-900">Sign Up</button>
                </form>
                <p className="text-sm mt-2 dark:text-white" >Don't you have an account? <Link className="text-[#5d5b8d] hover:text-[#2f2f4e] dark:text-sky-700" to="/register">Register</Link></p>
            </div>

        </div >
    )
}
