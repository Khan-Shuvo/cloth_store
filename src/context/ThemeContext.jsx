import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext()

export const useTheme = () => {
    const context = useContext(ThemeContext)

    if (!context) {
        throw new Error("useTheme must be used in a theme provider ")
    }
    return context
}


export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme")

        if (savedTheme == "dark") {
            setIsDarkMode(true)
            document.documentElement.classList.add('dark')
        }
    }, [])

    const toggleTheme = () => {
        setIsDarkMode((prev) => {
                const newValu = !prev

                if (newValu) {
                    document.documentElement.classList.add('dark')

                    localStorage.setItem('theme','dark')
                }
                else{
                    document.documentElement.classList.remove('dark')
                    localStorage.setItem('theme','light')
                }

                return newValu
        })
    }

    return (
        <ThemeContext.Provider value={{isDarkMode, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}