import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 999999999999999999;
`

export const Container = styled.div`
  background: #222;
  border-radius: 12px;
  display: flex;
  width: 900px;
  height: 600px;
  position: relative;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding-top: 80px;
`

export const CloseBtn = styled.button`
  background: none;
  border: none;
  padding: 0 12px;
  font-size: 28px;
  position: absolute;
  top: 6px;
  right: 6px;
  color: #FFF;
  z-index: 999999999;
`

export const Item = styled.div`
  width: 180px;
  height: 210px;
  background: #111;
  border-radius: 8px;
  box-shadow: 0 0 4px rgba(0, 00, 00, .8);
  padding: 6px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`

export const BuyBtn = styled.button`
  width: 100%;
  height: 20%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, .3);
  border: none;
  color: white;
  font-size: 18px;
  font-weight: 700;
  transition: .5s;

  &:hover {
    background: gold;
    color: black;
  }
`

export const Image = styled.img`
  width: 100%;
  margin-top: 8%;
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(80% - 10px);
  background: #000;
  overflow-y: auto;
  opacity: 0;
  transition: .4s;
  padding-top: 10px;

  &:hover {
    opacity: .925;
  }
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 90%;
`

export const Text = styled.p`
  font-size: 12px;
  color: #FFF;
  margin: 0;
`