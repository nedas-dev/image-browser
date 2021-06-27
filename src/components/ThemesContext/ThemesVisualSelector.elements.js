import styled from 'styled-components';

export const ThemesContainer = styled.div`
width: 200px;
margin: 1rem auto 0rem auto;
border: 1px solid #a7a7a7;
padding: 10px;
border-radius: 5px;
background-color: #e9e9e9;
`
export const ThemesWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
`

export const CustomTheme = styled.div`
background-color: ${(props) => props.color ? props.color : 'white'};
border: 1px solid grey;
width: 20px;
height: 20px;
border-radius: 50%;
cursor: pointer;
`

export const ThemesTitle = styled.div`
color: #7e7e7e;
font-family: Arial, Helvetica, sans-serif;
text-align: center;
padding: 5px 0px 15px 0px;
text-transform: uppercase;
font-size: 12px;
`