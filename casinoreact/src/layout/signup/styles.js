import styled from 'styled-components';

export const Form =styled.form `
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row-reverse;
  height: 550px;
  width: 70vw;
  margin-left: 15vw;
  border-radius: 20px;
  background-color: #212121;  
  overflow: hidden;
  @media (max-width: 768px){
    width: 100vw;
    margin-left: 0;
    border-radius: 0;
  }
`

export const ImageCtn =styled.div `
  width: 100%;
  margin-right: 0px; 
  padding: 0;
  background-color: #212121;
  @media (max-width: 768px) {
    display: none;
  }
` 


export const FormCtn = styled.div`  
background-color: #FFFFFF;
display: flex;
justify-content: center;

align-items: center;
flex-direction: column;
height: 100%;

`
export const Input= styled.input`
background-color: blue;
border-radius: 3px;
border: none;
height: 40px;
font-size: 1.6vw;
transition: 1s;
color: #EEEEEE;
margin-top: 50px;
width: 45%;
&:hover {
  transform: scale(1.05);
}

`

export const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-left: 0px;
  padding: 0;
  width: 600px;
  background-color: #212121;
  @media (max-width: 768px) {
    width: 100%;
  }

`

export const Grid= styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
`

export const BtnSubmit = styled.button`
  width: 65%;
  height: 45px;
  margin-top: 50px;
  margin-left: 0;
  transition: 0.5s;
  top: 19px;
  background: #EDBE18;
  box-shadow:  0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 0;
  border-radius: 5px;
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 27px;  
  
`

export const Link= styled.a`
  text-decoration: none;
  color: #EDBE18;
`

export const Coins = styled.div`
  width: 70vw;
  margin-left: 15vw;
  background-color: #161616;  
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 16px;
  flex-wrap: wrap;
  @media (max-width: 768px){
    width: 100vw;
    margin-left: 0;
    border-radius: 0;
  }
`

export const Coin = styled.div`
  padding: 14px 20px;
  position: relative;
`

export const CoinImg = styled.img`
  width: max(56px, 4vw);
`

export const CoinLabel = styled.p`
  text-align: center;
  font-size: 16px;
  color: white;
  margin: 0;
  margin-top: 4px;
`

export const CoinAmount = styled.p`
  width: 100%;
  color: white;
  font-size: 24px;
  text-align: center;
  margin: 0;
  margin-top: 8px;
`

export const CoinBtn = styled.button`
  position: absolute;
  width: 24px;
  left: ${({pos}) => pos === 'right' ? 'calc(100% - 24px)' : '0%'};
  height: 100%;
  top: 0;
  font-size: 24px;
  padding-top: 50%;
  text-align: center;
  color: white;
  background: none;
  border: none;
`


export const TextField = styled.input`
  width: 40%;
  height: 46px;
  margin-top: 32px;
  border-radius: 4px;
  border: none;
  outline: none;
  padding-left: 10px;
  font-size: 14px;
  background: #FFF;

  &:focus {
    outline: 2px solid gold;
  }
`