import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const AdminTitle = styled.h1`
  font-size: 38px;
  font-weight: 700;
  text-align: center;
  width: 100%;
  color: #FFF;
  margin: 50px 0;
`

export const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: auto;
  width: 80vw;
  box-shadow: 0 0 4px #FFF;
  border-radius: 12px;
  background: #0C0C0C;
  margin-bottom: 10px;
`

export const Stat = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #FFF;
  width: calc(100% - 48px);
  margin: 0;
  padding: 0 24px;
` 

export const StatItem = styled.p`
  width: 100%;
  text-align: center;
  font-size: min(18px, 1vw);

  @media (max-width: 650px){
    display: none;
  }
`

export const StatItemMobile = styled.p`
  width: 100%;
  text-align: center;
  font-size: min(18px, 1vw);
  @media (max-width: 650px){
    font-size: 18px;
  }
`

export const StatBox = styled.div`
  width: 250px;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 4px #FFF;
  border-radius: 12px;
  background: #0C0C0C;
  margin: 24px;
`

export const StatBoxTitle = styled.p`
  color: #FFF;
  font-size: 28px;
  margin: 0;
`

export const StatBoxInfo = styled.p`
  color: #CCC;
  font-size: 22px;
  margin: 0;
`

export const StatBoxPercent = styled.p`
  color: #555;
  font-size: 16px;
  margin:0;
`

export const Tools = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 32px;
`

export const Tool = styled.div`
  background: ${props => props.selected ? '#222' : '#000'};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 0;
  border-radius: 6px;
  margin-right: 10px;
  cursor: pointer;
`

export const ToolIcon = styled.img`
  margin-right: 3px;
  width: 22px;
  height: 22px;
  margin-left: 8px;
`

export const ToolText = styled.p`
  color: #FFF;
  font-size: 15px;
  margin: 0;
  margin-right: 16px;
`

export const Earnings = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
`

export const Feedbacks = styled.div`
  width: calc(80% - 24px);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 4px #FFF;
  border-radius: 12px;
  background: #0C0C0C;
  margin: 24px;
  padding: 0px 12px;
  max-height: 150px;
  overflow: auto;
`

export const Feedback = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`

export const FeedbackText = styled.div`
  text-align: center;
  width: 20%;
  overflow-wrap: break-word;
  color: #FFF;
  margin: 10px 0;
`

export const FeedbackTitle = styled.h3`
  color: #FFF;
  font-size: 26px;
  width: 100%;
  text-align: center;
  margin-bottom: 4px;
`

export const Balances = styled.div`
  width: calc(80% - 24px);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 4px #FFF;
  border-radius: 12px;
  background: #0C0C0C;
  margin: 24px;
  padding: 0px 12px;
  max-height: 150px;
  overflow: auto;
  overflow-x: hidden;
`

export const Balance = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`

export const BalanceText = styled.div`
  text-align: center;
  width: 45%;
  overflow-wrap: break-word;
  color: #FFF;
  margin: 10px 0;
`