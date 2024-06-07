import styled from 'styled-components';

export const Div = styled.div`
    height: 250px;
    width: 375px;
    overflow-y: hidden;
    position: relative;
    overflow: hidden;
    margin: 0;
    padding: 0;
    border-radius: 16px;
    @media(max-width: 850px){
        width: 100%;
        height: 60vw;
    }
`

export const Img = styled.img`
    margin: 0;
    padding: 0;
    height: 110%;
    width: 110%;
    margin-left: -5%;
`

export const Overlay = styled.p`
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 0;
    height: 15%;
    background: rgba(0, 0, 0, .8);
    width: 100%;
    text-align: center;
    color: white;
    padding: 14px 0 6px 0;
    font-size: 20px;
`

export const Link = styled.a`
    margin: 0;
    padding: 0;
`