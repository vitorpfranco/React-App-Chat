import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../config/firebase'
import { ChatContext } from '../context/ChatContext'
import { Message } from './Message'

export const Messages = () => {
    const { data } = useContext(ChatContext)
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages as [])
            console.log(doc.data())
        })
        return () => unsub()
    }
        , [data.chatId])

    return (
        <div className="bg-[#ddddf7] h-[710px] overflow-y-auto p-3">
            {messages.map((m: any) => (
                <Message {...m} key={m.id} />
            ))}

        </div>
    )
}
