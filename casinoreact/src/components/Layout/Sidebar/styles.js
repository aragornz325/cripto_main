import styled from "styled-components";
import * as palette from '../../../utils/colors/palettes/default';

export const Container = styled.div`
  background: ${palette.sBackground};
  width: ${(props) => props.open ? '200px' : '50px'};
  min-height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  border-right: 2px solid rgba(249, 249, 249, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: ${palette.tOpen};
  z-index: 100;
`

export const Logo = styled.img`
  width: ${props => props.open ? '75px' : '30px'};
  height: ${props => props.open ? '100px' : '40px'};
  align-self: center;
  margin-top: ${props => props.open ? '24px' : '40px'};
  margin-bottom: ${props => props.open ? '0' : '90px'};
  transition: ${palette.tOpen};
  position: absolute;
  opacity: ${props => props.open ? 1 : 0};
`

export const LogoSmall = styled.img`
  width: ${props => props.open ? '75px' : '30px'};
  height: ${props => props.open ? '100px' : '40px'};
  align-self: center;
  margin-top: ${props => props.open ? '24px' : '40px'};
  margin-bottom: ${props => props.open ? '0' : '90px'};
  transition: ${palette.tOpen};
  position: absolute;
  opacity: ${props => props.open ? 0 : 1};
`

export const CategoryTitle = styled.p`
  display: flex;
  align-items: center;
  height: ${props => props.open ? '20px' : '0'};
  opacity: ${props => props.open ? '20px' : '0'};
  font-size: 16px;
  font-weight: 700;
  color: ${palette.sGrey};
  width: calc(100% - 40px);
  transition: ${palette.tOpen};
  overflow: hidden;
`

export const CloseBtn = styled.button`
  position: absolute;
  right: -18px;
  background: ${palette.sDarkBlue};
  top: 110px;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  color: ${palette.activeText};
  cursor: pointer;
`

export const Spacer = styled.div`
  height: ${props => props.height};
`