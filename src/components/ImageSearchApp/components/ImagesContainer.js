import {
    ImagesContainerDiv,
    Image,
    ImageWrapper,
    InfoAboutImageDiv,
    LeftSideWrapper,
    UsernameDiv,
    LikesDiv,
    UserProfileImage,
    RightSideWrapper,
    HeartLogo
} from '../ImageSearchApp.elements';

import NotFoundGif from '../../../data/notfound.gif';

const ImagesContainer = ({ loading, images }) => {
    return (
        <ImagesContainerDiv>
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
                        </ImageWrapper>);
                })}
        </ImagesContainerDiv>
    )
}

export default ImagesContainer