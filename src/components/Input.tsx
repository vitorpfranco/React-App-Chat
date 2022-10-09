import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { BiImageAdd } from "react-icons/bi";
import { db, storage } from '../config/firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { BiSend } from "react-icons/bi";

import { v4 as uuid } from 'uuid'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
export const Input = () => {
    const [text, setText] = useState("")
    const [image, setImage] = useState<File | null>(null)

    const currentUser = useContext(AuthContext)
    const { data } = useContext(ChatContext)

    async function handleSend() {
        const time = new Date().getTime()
        if (text.length == 0 && !image) return
        if (image) {
            const storageRef = ref(storage, uuid());
            const uploadPhoto = uploadBytesResumable(storageRef, image!);
            uploadPhoto.on('state_changed',
                (snapshot) => {
                },
                (error) => {
                    console.log(error)
                },
                () => {

                    getDownloadURL(uploadPhoto.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chats", data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                photo: downloadURL,
                                senderId: currentUser?.uid,
                                date: time
                            })
                        })
                    })
                })
        } else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser?.uid,
                    date: time
                })
            })
        }
        setText('')

        await updateDoc(doc(db, "userChats", currentUser?.uid!), {
            [data.chatId + '.lastMessage']: {
                text
            },
            [data.chatId + '.date']: time
        }
        )
        await updateDoc(doc(db, "userChats", data.user.uid!), {
            [data.chatId + '.lastMessage']: {
                text
            },
            [data.chatId + '.date']: time
        })
    }

    function handlekey(e: React.KeyboardEvent<HTMLElement>) {
        console.log(e.code)
        e.code === "Enter" && handleSend()
    }
    return (
        <div className="h-14 bg-white p-3 flex justify-between dark:bg-black rounded-full dark:text-white/80 mx-3">
            <input type="text" placeholder="Message" className="w-full outline-none dark:bg-black px-2" value={text} onChange={(e) => { setText(e.target.value) }} onKeyDown={(e) => { handlekey(e) }} />
            <div className="flex gap-2 items-center">
                <label htmlFor="file" className="cursor-pointer">
                    <BiImageAdd size={25} className="dark:text-white/80 hover:text-white" />
                </label>
                <input className="hidden" type="file" id="file" onChange={(e) => { setImage(e.target.files![0]) }}></input>
                <button type="button" className=" dark:text-white/80 cursor-pointer hover:text-white" onClick={handleSend}><BiSend size={25} /></button>
            </div>
        </div>
    )
}
