import { collection, doc, DocumentData, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { db } from '../config/firebase'
import { AuthContext } from '../context/AuthContext';
import { AiOutlineSearch, AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { ChatContext } from '../context/ChatContext';

interface user {
    displayName: string;
    email: string;
    photoURL: string;
    uid: string;
}

export const Search = () => {
    const [email, setEmail] = useState<string>('')
    const [user, setUser] = useState<user | null>()
    const [err, setErr] = useState<boolean>(false)
    const currentUser = useContext(AuthContext)
    const { dispatch } = useContext(ChatContext)

    async function handleSearch() {
        const querry = query(collection(db, 'users'), where("email", "==", email))
        try {
            const querySnapshot = await getDocs(querry)
            if (querySnapshot.empty) { return setErr(true) }
            querySnapshot.forEach((doc) => {
                setUser(doc.data() as user)
            })
            setErr(false)

        } catch (err) {
            setErr(true)
        }
    }
    function handlekey(e: React.KeyboardEvent<HTMLElement>) {
        e.code === "Enter" && handleSearch()
    }
    async function handleSelect() {
        const time = new Date().getTime()
        if (currentUser && user) {
            const combinedID = currentUser?.uid > user?.uid ? currentUser?.uid + user?.uid : user?.uid + currentUser?.uid
            const res = await getDoc(doc(db, "chats", combinedID))
            if (!res.exists()) {
                await setDoc(doc(db, "chats", combinedID), { messages: [] })
                await setDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedID]: {
                        userInfo: {
                            uid: user.uid,
                            displayName: user.displayName,
                            photoURL: user.photoURL
                        },
                        date: time
                    }
                }, { merge: true })
                await setDoc(doc(db, "userChats", user.uid), {
                    [combinedID]: {
                        userInfo: {
                            uid: currentUser.uid,
                            displayName: currentUser.displayName,
                            photoURL: currentUser.photoURL
                        },
                        date: time
                    },
                }, { merge: true })
            }
            setUser(null)
            setEmail("")
            dispatch({ type: 'CHANGE_USER', payload: user })

        }
    }
    return (
        <div className="px-2 pt-2">
            <div className="flex gap-2 relative rounded-full px-3 py-3 bg-white">
                <label htmlFor="search"><AiOutlineSearch size={20} /></label>
                <input placeholder="Find a user by email" type="text" className="bg-inherit  outline-none text-sm w-full " id="search" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => handlekey(e)} />
                {email.length > 0 && <AiOutlineClose size={14} className="absolute right-4 top-4 cursor-pointer z-10" onClick={() => { setEmail(''); setUser(null) }} />}
            </div>
            {err && <p>User not found</p>}
            {user && <><div className="flex gap-3 items-center cursor:pointer relative cursor-pointer py-2 px-3 bg-white dark:bg-white/75 mt-2 rounded-3xl hover:bg-slate-200" onClick={handleSelect}>
                <img src={user?.photoURL} alt="" className="bg-purple-300 h-12 w-12 rounded-full object-cover" />
                <span className="font-semibold">{user.displayName}</span>
                <AiOutlinePlus size={20} className="ml-auto" />
            </div>
            </>
            }
        </div>
    )
}
