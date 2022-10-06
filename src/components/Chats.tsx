import { doc, DocumentData, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../config/firebase'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
interface UserInfo {
    displayName: string;
    photoURL: string;
    uid: string;
}

interface chatInfo {
    date: number,
    userInfo: UserInfo
    lastMessage: { text: string }
}
export const Chats = () => {
    const [chats, setChats] = useState<[string, chatInfo][]>([])
    const currentUser = useContext(AuthContext)
    const { dispatch } = useContext(ChatContext)
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

    function handleSelect(user: UserInfo) {
        dispatch({ type: 'CHANGE_USER', payload: user })
    }
    return (

        <div className="mx-2">
            {chats.sort((a, b) => b[1].date - a[1].date).map((chat) => {
                return <div key={chat[0]} className="flex gap-2 items-center mt-4 cursor:pointer" onClick={() => handleSelect(chat[1].userInfo)}>
                    <img src={chat[1].userInfo.photoURL} alt="" className="h-12 w-12 rounded-full object-cover" />
                    <div className="flex flex-col">
                        <span className="text-white font-semibold">{chat[1].userInfo.displayName}</span>
                        <p className="text-sm">{chat[1]?.lastMessage?.text}</p>
                    </div>
                </div>
            })}
        </div>
    )
}
