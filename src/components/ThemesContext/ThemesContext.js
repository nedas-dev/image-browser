import React, { useState } from 'react'

export const ThemesContext = React.createContext({
    backgroundColor: 'white',
    changeTheme: () => console.log('default themesContext function')
})

const ThemesProvider = (props) => {
    // eslint-disable-next-line
    const [bgColor, setBgColor] = useState('white')
    const changeTheme = (color) => {
        setBgColor(color)
    }

    return (
        <ThemesContext.Provider value={{ bgColor, changeTheme }}>
            {props.children}
        </ThemesContext.Provider>
    )
}

export default ThemesProvider
