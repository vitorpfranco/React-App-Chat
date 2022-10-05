import { doc, DocumentData, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import photo from '../assets/profile.jpg'
import { db } from '../config/firebase'
import { AuthContext } from '../context/AuthContext'
interface UserInfo {
    displayName: string;
    photoURL: string;
    uid: string;
}
interface dateInfo {
    nanoseconds: number;
    seconds: number;
}
interface chatInfo {
    date: dateInfo,
    userInfo: UserInfo
}
export const Chats = () => {
    const [chats, setChats] = useState<[string, chatInfo][]>([])
    const currentUser = useContext(AuthContext)
    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser?.uid!), (doc) => {
                const chatsData: [string, chatInfo][] = Object.entries(doc.data() as {});
                setChats(chatsData)
            })
            return () => unsub()
        }

        currentUser?.uid && getChats()
    }
        , [currentUser?.uid])

    return (

        <div className="mx-2">
            {chats.map((chat) => {
                return <div key={chat[0]} className="flex gap-2 items-center mt-4">
                    <img src={chat[1].userInfo.photoURL} alt="" className="h-12 w-12 rounded-full object-cover" />
                    <div className="flex flex-col">
                        <span className="text-white font-semibold">{chat[1].userInfo.displayName}</span>
                        <p className="text-sm">Hello!</p>
                    </div>
                </div>
            })}
        </div>
    )
}
