import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from "../config/firebase";
import { AuthContext } from "./AuthContext";

interface LayoutProps {
    children: JSX.Element
}
export const ChatContext = createContext<any>(null)

export const ChatContextProvider = ({ children }: LayoutProps) => {
    const currentUser = useContext(AuthContext)
    const INITIAL_STATE = {
        chatId: 'null',
        user: {}
    }
    const chatReducer = (state: any, action: any) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId: currentUser?.uid! > action.payload?.uid ? currentUser?.uid + action.payload?.uid : currentUser?.uid
                }
            default: return state
        }
    }
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)
    return (<ChatContext.Provider value={{ data: state, dispatch }}>
        {children}
    </ChatContext.Provider >)
}
