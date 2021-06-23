import { useState, useEffect } from 'react';

import {
    SecondaryContainer,
    Container,
    SearchInputForm,
    SearchInput,
    SearchIcon,
    ImagesContainer,
    Image,
    ImageWrapper,
    InfoAboutImageDiv,
    LeftSideWrapper,
    UsernameDiv,
    LikesDiv,
    UserProfileImage,
    RightSideWrapper,
    HeartLogo
} from './ImageSearchApp.elements';

import LoadingGif from '../../data/loading.gif';
import NotFoundGif from '../../data/notfound.gif';

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
        if (page === 1) {
            loadImages()
        }
        setPage(() => 1)
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

        if (searchInput) {
            url = `${searchContentUrl}?${query}&${currentPage}&${clientId}`
        } else {
            url = `${allContentUrl}?${clientId}&${currentPage}`
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

    useEffect(() => {
        const setPageFunc = (e) => {
            let containerHeight = document.querySelector('.mainContainer').clientHeight
            const currentOffSetY = window.pageYOffset

            if (containerHeight <= currentOffSetY + window.innerHeight + 30) {
                if (!loading) {
                    setPage((prevState) => prevState + 1)
                }
            }
        }

        document.addEventListener('scroll', () => setPageFunc())

        return document.removeEventListener('scroll', () => setPageFunc())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div>
            <SecondaryContainer>
                <Container className='mainContainer'>
                    <SearchInputForm onSubmit={handleSubmit}>
                        <SearchInput name='search' value={searchInput} placeholder='Search' onChange={onChange} />
                        <SearchIcon onClick={handleSubmit} />
                    </SearchInputForm>
                    <ImagesContainer>
                        {!loading && images.length === 0
                            ? <div style={{ textAlign: 'center', margin: 'auto' }}><img width='120px' alt='not found' src={NotFoundGif}></img></div>
                            : images.map((image, index) => {
                                return (
                                    <ImageWrapper key={index}>
                                        <Image alt={image.alt_description} src={image.urls.regular}></Image>
                                        <InfoAboutImageDiv className='showInfo'>
                                            <LeftSideWrapper>
                                                <UsernameDiv>{image.user.name}</UsernameDiv>
                                                <LikesDiv>{image.likes}<HeartLogo /></LikesDiv>
                                            </LeftSideWrapper>
                                            <RightSideWrapper>
                                                <a href={image.user.portfolio_url}>
                                                    <UserProfileImage alt='user profile' src={image.user.profile_image.medium}></UserProfileImage>
                                                </a>
                                            </RightSideWrapper>
                                        </InfoAboutImageDiv>
                                    </ImageWrapper>)
                            })}
                    </ImagesContainer>
                    {loading && <div style={{ textAlign: 'center', margin: 'auto' }}><img alt='loading' src={LoadingGif}></img></div>}
                </Container>
            </SecondaryContainer>
        </div>
    )
}

export default ImageSearchApp;
