import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from "../config/firebase";

interface LayoutProps {
    children: JSX.Element
}
export const AuthContext = createContext<User | null>(null)

export const AuthContextProvider = ({ children }: LayoutProps) => {
    const [currentUser, setCurrentUser] = useState<User | null>({} as User)
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        return () => {
            unsub()
        }
    }, []);

    return (<AuthContext.Provider value={currentUser}>
        {children}
    </AuthContext.Provider >)
}
