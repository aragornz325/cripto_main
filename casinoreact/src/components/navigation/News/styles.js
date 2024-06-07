import styled from 'styled-components';



export const Img = styled.img`
    width: 100%;
    height: 310px;
    @media (max-width: 768px) {
        height: 250px;
      }
` 

export const Paragraph=styled.p`
    color: #FFFFFF;
    margin:30px;
    font-family: 'Poppins';

`

export const Date=styled.p`
    color: #FFFFFF;
    font-family: 'Poppins';
    margin:30px;
   padding-bottom: 40px;
  
   @media (max-width: 768px) {
    margin: 10px;
    padding:10px;
  }
      

`

export const Div = styled.div`
    height: 560px;
    width: 600px;
    background-color:#212121;
    border-radius: 10px;
    overflow-y: hidden;
    @media (max-width: 768px) {
        width: 100%;
        height: max-content;
      }
`
