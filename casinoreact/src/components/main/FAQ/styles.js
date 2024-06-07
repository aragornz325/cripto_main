import styled from 'styled-components';

export const Title=styled.h2`
    color: #FFFFFF;
    font-size: large;
    margin-left: 20%;
    text-align:center;
    font-family: 'Poppins';
    @media (max-width: 768px) { 
      margin-left:70px;
     margin-right: 70px;
    }
    &:hover{
        color:#EDBE18;
        
    }
`
export const Paragraph = styled.p`
     color: #FFFFFF;
     margin: 30px;
     margin-left: 180px;
     margin-right: 180px;
     font-family: 'Poppins';
     @media (max-width: 768px) { 
      margin-left: 100px;
     margin-right: 100px;
    }
`
export const Div = styled.div`
  width: 90%;
  max-width: 1000px;
  height: max-content;
  border-radius: 15px;
  padding-right: 30px;
  padding-top: 20px;
  background-color: #212121;
  overflow: hidden;
  @media (max-width: 768px) { 
    width: 100%;
    margin: 0;
    padding:0;
  }
`

export const Wrapper = styled.div`
  width: 90%;
  margin-left: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`