import styled from 'styled-components';



export const Main= styled.div`
    width: 70%;
    background-color: transparent;
    height: 800px;
    margin-left: 15%;
    display: flex;
    justify-content: center;
    align-items:center;
    flex-direction: column;
    @media (max-width: 768px) {
        
        width: 100%;
        margin: 0;
        padding:0;
      }
`   

export const Paragraph= styled.p`
    text-align: center;
    margin-left: 10%;
    margin-right: 10%;
    color: #FFFFFF;
    font-family: 'Poppins';
    &:hover{
        color: black;   
    }
`


export const Div= styled.div`
    width: 90%;
    height: 90px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;    
    background-color:#212121;
    margin: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: 0.4s;
    &:hover {
        background-color: #EDBE18;
        color: black
      }
    

`