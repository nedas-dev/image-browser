import { useState, useEffect, useContext } from 'react';

import {
    SecondaryContainer,
    Container,
    SearchInputForm,
    SearchInput,
    SearchIcon,
    NavWrapper
} from './ImageSearchApp.elements';

import ThemesVisualSelector from '../ThemesContext/ThemesVisualSelector';
import { ThemesContext } from '../ThemesContext/ThemesContext';

import ImagesContainer from './components/ImagesContainer';

import LoadingGif from '../../data/loading.gif';

const accessKey = 'uMhmlOS72hs-AtvM6nadBUVwQeTMUvr0x237_ffbpUA'
const allContentUrl = `https://api.unsplash.com/photos`
const searchContentUrl = 'https://api.unsplash.com/search/photos/'

// const accessKeyPexels = '563492ad6f917000010000018e12cec5723e48a6a4c9f565300c71b5'
// const allContentUrl = 'https://api.pexels.com/v1/curated/?page=2&per_page=1'

const ImageSearchApp = () => {
    const [searchInput, setSearchInput] = useState('')
    const [images, setImages] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [isMore, setIsMore] = useState(true)

    const onChange = (e) => {
        if (e.target.name === 'search') {
            setSearchInput(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsMore(true)
        setPage(() => 1)
        setImages([])
        setLoading(true)
        loadImages()
    }

    const loadImages = async () => {
        if (!isMore) {
            return
        }
        setLoading(true)
        let url
        const query = `query=${searchInput}`
        const currentPage = `page=${page}`
        const clientId = `client_id=${accessKey}`
        const perPage = 'per_page=10'
        if (searchInput) {
            url = `${searchContentUrl}?${query}&${currentPage}&${clientId}&${perPage}`
        } else {
            url = `${allContentUrl}?${clientId}&${currentPage}&${perPage}`
        }

        try {
            const response = await fetch(url)
            const data = await response.json()
            if (response.status >= 400) {
                setLoading(false)
                return
            }

            if (page === 1 && searchInput) {
                setImages([...data.results])
            } else if (page === 1 && !searchInput) {
                setImages((prevState) => [...data])
            } else if (searchInput) {
                if (data.total_pages < page) {
                    setIsMore(false)
                } else {
                    setImages((prevState) => [...prevState, ...data.results])
                }
            } else {
                setImages((prevState) => [...prevState, ...data])
            }
        } catch (error) {
            console.log(error)
        }

        setLoading(false)

    }

    useEffect(() => {
        loadImages()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    // Timer for loading more images after specific time (so you couldn't trigger setPage too many times too fast)
    let stop = false
    const restartTimerForLoadingImages = () => {
        stop = true
        setTimeout(() => stop = false, 500)
    }

    useEffect(() => {
        function setPageFunc() {
            let containerHeight = document.querySelector('.mainContainer').clientHeight
            const currentOffSetY = window.pageYOffset
            if (!stop && containerHeight && containerHeight <= currentOffSetY + window.innerHeight + 30) {
                setPage((prevPage) => {
                    restartTimerForLoadingImages()
                    return prevPage + 1
                })
            }
        }

        document.addEventListener('scroll', setPageFunc)

        return () => document.removeEventListener('scroll', setPageFunc)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { bgColor } = useContext(ThemesContext);

    return (
        <div>
            <SecondaryContainer bgColor={bgColor}>
                <Container className='mainContainer'>
                    <NavWrapper>
                        <SearchInputForm onSubmit={handleSubmit}>
                            <SearchInput name='search' value={searchInput} placeholder='Search' onChange={onChange} />
                            <SearchIcon onClick={handleSubmit} />
                        </SearchInputForm>
                        <ThemesVisualSelector />
                    </NavWrapper>
                    <ImagesContainer loading={loading} images={images}>
                    </ImagesContainer>
                    {loading && <div style={{ textAlign: 'center', margin: 'auto' }}><img alt='loading' src={LoadingGif}></img></div>}
                </Container>
            </SecondaryContainer>
        </div>
    )
}

export default ImageSearchApp;
