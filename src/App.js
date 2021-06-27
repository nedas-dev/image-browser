import ImageSearchApp from './components/ImageSearchApp/ImageSearchApp';
import ThemesProvider from './components/ThemesContext/ThemesContext';

function App(props) {
    return (
        <ThemesProvider>
            <ImageSearchApp />
        </ThemesProvider>
    )
}

export default App;