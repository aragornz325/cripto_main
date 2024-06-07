import styled from 'styled-components';


export const Jackpot = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 850px;
    background: none;
    margin-top: 30px;
    @media (max-width: 768px) {
        left: 0;
        width: 100%;
        height: 500px;
        margin: 0px;
        padding:0;
      }
`

export const Main = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 80%;
    height: 400px;
    background: none;
    @media (max-width: 768px) { 
        height: 200px;
    }
`

export const Banner = styled.div`
    margin-top: 100px;
    width: 80%;
    align-self: center;
    height: 350px;
    display: flex;
    justify-content: space-evenly;
    flex-direction: row;
    align-items: center;
    background: #0C0C0C;
    border-radius: 40px;
    @media (max-width: 768px){
        height: 200px;
    }
`

export const BannerImg = styled.img`
    width: 30%;
`
export const SubParagraph = styled.p`
    font-size: max(10px, 1.2vw);
    max-width: 80%;
    text-align: center;
    color: #FFFFFF;
    font-family: 'Poppins';
    margin: 0;
    margin-bottom: 20px;
`

export const StartNow = styled.button`
transition: 0.5s;
background: #EDBE18;
box-shadow:  0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 10px;
border: 0;

font-family: Poppins;
font-style: normal;
font-weight: normal;
font-size: max(14px, 1.6vw);
line-height: 27px;
padding: 16px 28px;

@media (max-width: 1000px){
    padding: 1px 7px;
}

@media (max-width: 600px){
    margin: 0;
    width: 80%;
}

&:hover {
    transform: scale(1.07);
}
`

export const DivParagraph = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const Paragraph = styled.p`
    font-size: max(16px, 2.5vw);
    text-align: center;
    color: #FFFFFF;
    font-family: 'Poppins';
    margin: 0;
    margin-bottom: 12px;
    max-width: 80%;
`

export const Img = styled.img`
    width: 100%;
    height: 100%;
`

export const BannerPromo = styled.div`
    width: 70vw;
    height: 200px;
    background: black;
`