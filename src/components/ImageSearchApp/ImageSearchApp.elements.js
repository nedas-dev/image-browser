import styled from 'styled-components';
import { FaSearch, FaHeart } from 'react-icons/fa';

export const SecondaryContainer = styled.div`
margin: 0;
padding: 0;
box-sizing: border-box;
background-color: ${(props) => props.bgColor};
width: 100%;
height: 100vh;
`

export const Container = styled.div`
max-width: 1200px;
margin: auto;
width: 95%;
`

export const SearchInputForm = styled.form`
margin-left: 1rem;
margin-top: 3rem;
padding: 5px;
border-radius: 5px;
width: 50%;
min-width: 200px;
border-bottom: 3px solid grey;
padding-bottom: 0.2rem;
display: flex;
flex-direction: row;
background-color: white;

@media screen and (max-width: 550px){
    width: 85%;
}
`
export const SearchInput = styled.input`
width: 100%;
border: none;
outline: none;
font-size: 1.6rem;
color: grey;
padding-left: 0.2rem;
`

export const SearchIcon = styled(FaSearch)`
font-size: 2rem;
color: grey;
cursor: pointer;
`

export const ImagesContainerDiv = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
margin-top: 4rem;
justify-content: space-between;

@media screen and (max-width: 800px){
    flex-direction: column;
    align-items: center;
}
`

export const ImageWrapper = styled.section`
width: 48%;
height: 250px;
margin-bottom: 2rem;
position: relative;
overflow: hidden;
@media screen and (max-width: 800px){
    width: 95%;
}

@media screen and (min-width: 1200px){
    width: 32%; 
}
&:hover{
    .showInfo{
        visibility: visible;
        opacity: 1;
        transform: translateY(0);
        }
}
`

export const Image = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
`

export const InfoAboutImageDiv = styled.div`
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    color: white;
    background-color: rgba(80,80,80, 0.6);
    padding: 0.8rem 1.2rem;
    box-sizing: border-box;
    align-items: center;
    font-size: 14px;
    visibility: hidden;
    opacity: 0;
    transition: all 0.3s ease-in;
    transform: translateY(100%);
`

export const LeftSideWrapper = styled.div`
`

export const RightSideWrapper = styled.div`
`

export const UsernameDiv = styled.div`
margin-bottom: 1rem;
letter-spacing: 1px;
`

export const LikesDiv = styled.div``

export const UserProfileImage = styled.img`
border-radius: 50%;
object-fit: cover;
width: 40px;
`

export const HeartLogo = styled(FaHeart)`
padding-left: 4px;
font-size: 10px;
color: #ff7e7e;
`

export const NavWrapper = styled.div`
display: flex;
justify-content: space-around;
@media screen and (max-width: 550px){
    flex-direction: column;
}
`