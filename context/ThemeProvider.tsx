'use client'

import React, { createContext, useContext, useState, useEffect } from "react"

interface ThemeContextType {
    theme: string
    setTheme: React.Dispatch<React.SetStateAction<string>>
    handleThemeChange: () => void
}


const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {

    const [theme, setTheme] = useState('light')

    const handleThemeChange = () => {

        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setTheme('dark')
            document.documentElement.classList.add('dark')
        } else {
            setTheme('light')
            document.documentElement.classList.remove('dark')
        }
    }

    useEffect(() => {
        handleThemeChange()
    }, [theme])

    return (
        <ThemeContext.Provider
            value={{
                theme, handleThemeChange, setTheme
            }}>
            {children}
        </ThemeContext.Provider>
    )
}


export function useTheme() {

    const context = useContext(ThemeContext)

    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }

    return context
}