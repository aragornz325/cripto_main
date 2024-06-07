import styled from 'styled-components';
import * as palette from '../../utils/colors/palettes/default';

export const Wrapper = styled.div`
  width: 100%;
  height: 450px;
  background: none;
  color: ${palette.text};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin: 0;
  overflow: hidden;
  padding: 2% 0;
`

export const Title = styled.h1`
  font-size: 30px;
  font-weight: 700;
`

export const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Subtitle = styled.p`
  font-size: 25px;
  font-weight: 700;
  margin-right: 12px;
` 

export const Status = styled.h2`
  font-size: 25px;
  font-weight: 700;
  padding: 8px 20px;
  background: ${({status}) => {
    switch(status){
      case 'new':
        return '#4285F4';
      case 'pending':
        return '#FB7B04';
      case 'paid':
        return '#34A853';
      default: 
        return '#424242';
    }
  }};
  border-radius: 16px;
`

export const Info = styled.p`
  font-size: 18px;
  text-align: center;
  max-width: 80%;
`

export const Button = styled.button`
  background: #FFF;
  color: #6E45A1;
  height: 42px;
  width: 216px;
  font-size: 15px;
  border: none;
  border-radius: 10px;
`

export const LineContainer = styled.div`
  display: flex;
  width: 600px;
  max-width: 80%;
  justify-content: space-between;
`

export const LineOn = styled.div`
  height: 8px;
  width: 180px;
  background: #FFF;
  border-radius: 20px;
  max-width: 30%;
`

export const LineOff = styled.div`
  height: 8px;
  width: 180px;
  background: #474747;
  border-radius: 20px;
  max-width: 30%;
`