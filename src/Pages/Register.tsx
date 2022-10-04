import React from 'react'
import { Link } from 'react-router-dom'
import { BiImageAdd } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from '../config/firebase';
import { doc, setDoc } from "firebase/firestore";


interface registerForm {
    displayName: string;
    email: string;
    password: string;
    photo: File;
}
export const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<registerForm>();
    const navigate = useNavigate()
    async function handleOnRegister(data: registerForm) {
        const authRes = await createUserWithEmailAndPassword(auth, data.email, data.password)
        const storageRef = ref(storage, authRes.user.uid);
        const uploadPhoto = uploadBytesResumable(storageRef, data.photo);
        uploadPhoto.on('state_changed',
            (error) => {
            },
            async () => {
                const downloadUrl = await getDownloadURL(uploadPhoto.snapshot.ref);
                await updateProfile(authRes.user, {
                    displayName: data.displayName,
                    photoURL: downloadUrl
                });
                try {
                    await setDoc(doc(db, "users", authRes.user.uid), {
                        uid: authRes.user.uid,
                        displayName: data.displayName,
                        email: data.email,
                        photo: downloadUrl
                    });
                } catch (err) {
                    console.log(err)

                }

                navigate('./login')

            }
        );

    }
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-[#a7bcff]">
            <div className="bg-white/90 py-5 px-12 rounded-lg shadow-lg flex flex-col gap-3 items-center">
                <span className="text-[#5d5b8d] font-semibold text-3xl">Franco Chat</span>
                <h1 className=" text-[#5d5b8d] font-medium text-lg">Register</h1>
                <form className="flex flex-col gap-4 w-72" onSubmit={handleSubmit(handleOnRegister)}>
                    <input className="p-4 bg-inherit border-b border-[#a7bcff] placeholder:text-black/70" type="text" placeholder="Display name" {...register("displayName")} />
                    <input className="p-4 bg-inherit border-b border-[#a7bcff] placeholder:text-black/70" type="email" placeholder="Email" {...register("email")} />
                    <input className="p-4 bg-inherit border-b border-[#a7bcff] placeholder:text-black/70" type="password" placeholder="Password" {...register("password")} />
                    <label htmlFor="file" className="flex items-center gap-2 cursor-pointer">
                        <BiImageAdd size={40} className="text-[#7b96ec]" />
                        <span>Add an avatar</span>
                    </label>
                    <input className="hidden" type="file" id="file" {...register("photo")}></input>
                    <button className="text-white p-3 font-bold bg-[#7b96ec] hover:bg-[#516cc5]">Sign Up</button>
                </form>
                <p className="text-sm mt-2" >Do you have an account? <Link className="text-[#5d5b8d] hover:text-[#2f2f4e]" to="/login">Login</Link></p>
            </div>

        </div >
    )
}
