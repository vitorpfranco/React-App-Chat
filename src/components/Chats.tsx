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

        <div className="mx-2  rounded-lg ">
            {chats.sort((a, b) => b[1].date - a[1].date).map((chat) => {
                const date = new Date(new Date(chat[1].date))
                return <div key={chat[0]} className="flex gap-3 items-center cursor:pointer relative cursor-pointer py-2 px-3 bg-white dark:bg-white/75 dark:hover:bg-white/30 mt-2 rounded-3xl hover:bg-slate-200" onClick={() => handleSelect(chat[1].userInfo)}>
                    <img src={chat[1].userInfo.photoURL} alt="" className="h-12 w-12 rounded-full object-cover" />
                    <div className="flex flex-col">
                        <span className="text-black font-semibold">{chat[1].userInfo.displayName}</span>
                        <p className="text-xs text-gray-500 dark:text-black  ">{chat[1]?.lastMessage?.text}</p>
                    </div>
                    <span className="ml-auto self-start text-xs">{date.getHours()}:{date.getMinutes()}</span>
                </div>
            })}
        </div>
    )
}
