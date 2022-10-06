import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { BiImageAdd } from "react-icons/bi";
import { db } from '../config/firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { v4 as uuid } from 'uuid'
export const Input = () => {
    const [text, setText] = useState("")
/*     const [image, setImage] = useState<File | null>(null)
 */    const currentUser = useContext(AuthContext)
    const { data } = useContext(ChatContext)
    async function handleSend() {
        await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser?.uid,
                date: Timestamp.now()
            })
        })
        setText('')

        await updateDoc(doc(db, "userChats", currentUser?.uid!), {
            [data.chatId + '.lastMessage']: {
                text
            },
            [data.chatId + '.date']: serverTimestamp()
        }
        )
        await updateDoc(doc(db, "userChats", data.user.uid!), {
            [data.chatId + '.lastMessage']: {
                text
            },
            [data.chatId + '.date']: serverTimestamp()
        })
    }
    return (
        <div className="h-14 bg-white p-3 flex justify-between ">
            <input type="text" placeholder="Message" className="w-full outline-none " value={text} onChange={(e) => { setText(e.target.value) }} />
            <div className="flex gap-2 items-center">
                <label htmlFor="file" className="cursor-pointer">
                    <BiImageAdd size={30} className="text-gray-500" />
                </label>
                {/*                 <input className="hidden" type="file" id="file" onChange={(e) => { setImage(e.target.files[0]) }}></input>
 */}                <button type="button" className="bg-[#5d5b8d] px-3 py-1 text-sm text-white/80 cursor-pointer hover:text-white" onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}
