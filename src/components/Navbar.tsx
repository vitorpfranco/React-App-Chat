import { signOut, User } from 'firebase/auth'
import { useContext } from 'react'
import { auth } from '../config/firebase'
import { AuthContext } from '../context/AuthContext'
import { useAuthState } from 'react-firebase-hooks/auth';
import { BiLogOut } from "react-icons/bi";

export const Navbar = () => {
    const [user] = useAuthState(auth)
    return (
        <div className="flex justify-between px-3 bg-mainBlue h-16 items-center" >
            <span className="text-white font-semibold ml-2">
                VFChat
            </span>
            <div className="flex gap-3 items-center justify-center">
                <img src={user?.photoURL!} alt="" className="bg-purple-300 h-8 w-8 rounded-full object-cover" />
                <span className="text-white">{user?.displayName}</span>
                <button className=" text-white cursor-pointer " onClick={() => { signOut(auth) }}>
                    <BiLogOut size={20}></BiLogOut>
                </button>
            </div>
        </div>
    )
}
