import { useContext, createContext, useState, useEffect, Dispatch, SetStateAction } from 'react'

interface LayoutProps {
    children: JSX.Element
}
interface ThemeContextInterface {
    theme: string;
    setTheme: Dispatch<SetStateAction<string>>
}

const ThemeContext = createContext<ThemeContextInterface | null>(null)

export function ThemeContextProvider({ children }: LayoutProps) {
    const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        const root = window.document.documentElement;
        const OldTheme = theme === "dark" ? 'light' : 'dark';
        root.classList.remove(OldTheme)
        root.classList.add(theme)
        localStorage.setItem('theme', theme)
    }, [theme])


    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext)
}
