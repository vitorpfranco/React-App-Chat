import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BiImageAdd } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from '../config/firebase';
import { doc, setDoc } from "firebase/firestore";
import noPhoto from '../assets/imgs/no-profile.png'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';


interface registerForm {
    displayName: string;
    email: string;
    password: string;
}
const schema = yup.object({
    displayName: yup.string().required('Required field!'),
    email: yup.string().email('E-mail not valid').required('Required field!'),
    password: yup.string().min(6, "Your password must have at least 6 letters.").required('Required field!')
});
export const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<registerForm>({ resolver: yupResolver(schema) });
    const [previewImg, setPreviewImg] = useState<string>()
    const [file, setFile] = useState<File>()
    const navigate = useNavigate()

    async function handleOnRegister(data: registerForm) {
        const authRes = await createUserWithEmailAndPassword(auth, data.email, data.password)
        if (!file) {
            await updateProfile(authRes.user, {
                displayName: data.displayName
            });
            await setDoc(doc(db, "users", authRes.user.uid), {
                uid: authRes.user.uid,
                displayName: data.displayName,
                email: data.email,
                photoURL: ''
            });
            navigate('/login')
            return
        }
        const storageRef = ref(storage, authRes.user.uid);
        const uploadPhoto = uploadBytesResumable(storageRef, file!);
        uploadPhoto.on('state_changed',
            (snapshot) => {
            },
            (error) => {
                console.log(error)
            },
            () => {

                getDownloadURL(uploadPhoto.snapshot.ref).then(async (downloadURL) => {
                    await updateProfile(authRes.user, {
                        displayName: data.displayName,
                        photoURL: downloadURL
                    });
                    await setDoc(doc(db, "users", authRes.user.uid), {
                        uid: authRes.user.uid,
                        displayName: data.displayName,
                        email: data.email,
                        photoURL: downloadURL
                    });
                    navigate('/login')
                })
            })
    }

    function getImg(file: File) {
        if (!file) return
        setFile(file)
        setPreviewImg(URL.createObjectURL(file))
    }
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-slate-300 dark:bg-dark">
            <div className="bg-white/90 py-5 px-12 rounded-lg shadow-lg flex flex-col gap-3 items-center dark:bg-darkContent">

                <h1 className=" text-[#5d5b8d] font-semibold text-3xl dark:text-white">Register</h1>
                <form className="flex flex-col gap-4 w-72" onSubmit={handleSubmit(handleOnRegister)}>
                    <div className="relative">
                        <img src={previewImg || noPhoto} className="h-32 w-32 rounded-full mx-auto object-cover " />
                        <label htmlFor="file" className="cursor-pointer absolute bottom-0  ml-8 left-1/2">
                            <BiImageAdd size={30} className="dark:text-white" />
                        </label>
                        <input className="hidden" type="file" id="file" onChange={(e) => getImg(e.target.files![0])}></input>

                    </div>
                    <div className='w-full'>
                        <input className="p-2 bg-inherit border-b border-[#a7bcff] placeholder:text-black/70 dark:text-white dark:placeholder:text-white w-full outline-none" type="text" placeholder="Display name" {...register("displayName")} />
                        <p className="mt-1 text-red-600 text-sm">{errors.displayName?.message}</p>
                    </div>
                    <div className='w-full'>
                        <input className="p-4 bg-inherit border-b border-[#a7bcff] placeholder:text-black/70 dark:text-white dark:placeholder:text-white w-full outline-none" type="email" placeholder="E-mail" {...register("email")} />
                        <p className="mt-1 text-red-600 text-sm">{errors.email?.message}</p>
                    </div>
                    <div className='w-full'>
                        <input className="p-4 bg-inherit border-b border-[#a7bcff] placeholder:text-black/70 dark:text-white dark:placeholder:text-white w-full outline-none" type="password" placeholder="Password" {...register("password")} />
                        <p className="mt-1 text-red-600 text-sm">{errors.password?.message}</p>
                    </div>

                    <button className="text-white p-3 font-bold bg-[#7b96ec] hover:bg-[#516cc5] dark:bg-sky-700 dark:hover:bg-sky-900">Sign Up</button>
                </form>
                <p className="text-sm mt-2 dark:text-white" >Do you have an account? <Link className="text-[#5d5b8d] hover:text-[#2f2f4e] dark:text-sky-700" to="/login">Login</Link></p>
            </div>

        </div >
    )
}
