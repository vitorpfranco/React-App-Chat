import { collection, doc, DocumentData, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import photo from '../assets/profile.jpg'
import { db } from '../config/firebase'
import { AuthContext } from '../context/AuthContext';
interface user {
    displayName: string;
    email: string;
    photo: string;
    uid: string;
}

export const Search = () => {
    const [email, setEmail] = useState<string>('')
    const [user, setUser] = useState<user | null>()
    const [err, setErr] = useState<boolean>(false)
    const currentUser = useContext(AuthContext)

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
        if (currentUser && user) {
            const combinedID = currentUser?.uid > user?.uid ? currentUser?.uid + user?.uid : currentUser?.uid
            const res = await getDoc(doc(db, "chats", combinedID))
            if (!res.exists()) {
                await setDoc(doc(db, "chats", combinedID), { messages: [] })
                await setDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedID]: {
                        userInfo: {
                            uid: user.uid,
                            displayName: user.displayName,
                            photoURL: user.photo
                        },
                        date: serverTimestamp()
                    }
                }, { merge: true })
                await setDoc(doc(db, "userChats", user.uid), {
                    [combinedID]: {
                        userInfo: {
                            uid: currentUser.uid,
                            displayName: currentUser.displayName,
                            photoURL: currentUser.photoURL
                        },
                        date: serverTimestamp()
                    },
                }, { merge: true })
            }
            setUser(null)
            setEmail("")
        }
    }
    return (
        <div className="border-gray-400 border-b px-2 py-2">
            <div className="">
                <input placeholder="Find a user by email" type="text" className="bg-inherit text-white outline-none text-sm" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => handlekey(e)} />
            </div>
            {err && <p>User not found</p>}
            {user && <div className="flex gap-2 items-center mt-3 cursor-pointer hover:bg-[#484672] rounded" onClick={handleSelect}>
                <img src={user?.photo || photo} alt="" className="bg-purple-300 h-12 w-12 rounded-full object-cover" />
                <span className="text-white font-semibold">{user.displayName}</span>
            </div>}
        </div>
    )
}
