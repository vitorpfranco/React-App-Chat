import { signOut, User } from 'firebase/auth'
import { useContext } from 'react'
import photo from '../assets/profile.jpg'
import { auth } from '../config/firebase'
import { AuthContext } from '../context/AuthContext'
import { useAuthState } from 'react-firebase-hooks/auth';

export const Navbar = () => {
    const [user] = useAuthState(auth)
    return (
        <div className="flex justify-between px-2 bg-[#2f2d52] h-12 items-center" >
            <span className="text-[#5d5b8d] font-semibold ">
                Franco Chat
            </span>
            <div className="flex gap-2">
                <img src={user?.photoURL || photo} alt="" className="bg-purple-300 h-6 w-6 rounded-full object-cover" />
                <span>{user?.displayName}</span>
                <button className="bg-[#5d5b8d] text-xs px-2 text-white/80 cursor-pointer hover:text-white" onClick={() => { signOut(auth) }}>Logout</button>
            </div>
        </div>
    )
}
