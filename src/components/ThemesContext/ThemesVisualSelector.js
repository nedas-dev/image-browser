import { useContext } from 'react';

import {
    ThemesContainer,
    ThemesWrapper,
    CustomTheme,
    ThemesTitle
} from './ThemesVisualSelector.elements'

import { ThemesContext } from './ThemesContext';

const ThemesSelector = () => {
    const { changeTheme } = useContext(ThemesContext);
    return (
        <ThemesContainer>
            <ThemesTitle>Themes</ThemesTitle>
            <ThemesWrapper>
                <CustomTheme color='white' onClick={() => changeTheme('white')} />
                <CustomTheme color='black' onClick={() => changeTheme('black')} />
                <CustomTheme color='dodgerblue' onClick={() => changeTheme('dodgerblue')} />
            </ThemesWrapper>
        </ThemesContainer>
    )
}

export default ThemesSelector
