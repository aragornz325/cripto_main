import styled from 'styled-components';
import * as palette from '../../../utils/colors/palettes/default';

export const Container = styled.div`
  width: ${props => props.open ? 'calc(100% - 200px)' : 'calc(100% - 50px)'};
  position: fixed;
  top: 0;
  right: 0;
  height: 120px;
  background: ${palette.background};
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: ${palette.tOpen};
  z-index: 99;
  border-bottom: 2px solid ${palette.sDarkBlue};
`

export const Spacer = styled.div`
  height: 120px;
  width: 100%;
`

export const Titles = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
  margin-left: 10%;
`

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

export const TitleIcon = styled.img`
  width: 28px;
  height: 28px;
`

export const Title = styled.p`
  font-size: 26px;
  font-weight: 700;
  color: ${props => props.active ? palette.activeText : palette.text};
  transition: ${palette.tHover};
  cursor: pointer;
  margin: 0;

  &:hover {
    color: ${palette.activeText};
  }
`

export const Blobs = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 12px;
  margin-right: 10%;
`

export const Blob = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${palette.sLightGrey};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const BlobIcon = styled.img`
  width: 22px;
`

export const BlobUserIcon = styled.img`
  width: 100%;
  height: 100%;
`

export const UserMenu = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  position: relative;
`

export const Username = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: ${palette.text};
`

export const Arrow = styled.img`
  width: 14px;
  transition: ${palette.tOpen};
  transform: ${props => props.open ? 'scaleY(-1)' : 'scaleY(1)'};
`

export const Balance = styled.div`
  padding: 16px;
  position: absolute;
  top: 77px;
  left: 0;
  background: ${palette.sBackground};
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
  width: 100%;
`

export const BalanceTitle = styled.p`
  color: ${palette.inputText};
  font-size: 22px;
  font-weight: 500;
  margin: 0;
`

export const BalanceNumber = styled.p`
  color: ${palette.activeText};
  font-size: 26px;
  font-weight: 600;
  margin: 0;
`

export const Login = styled.button`
  border: none;
  background: none;
  font-size: 20px;
  color: ${palette.text};
  font-weight: 800;
  cursor: pointer;
  transition: ${palette.tHover};

  &:hover {
    color: ${palette.activeText};
    transform: scale(1.05);
  }
`

export const Register = styled.button`
  border: none;
  background: ${palette.submitPink};
  font-size: 20px;
  font-weight: 800;
  color: ${palette.text};
  padding: 6px 16px;
  border-radius: 24px;
  cursor: pointer;
  transition: ${palette.tHover};

  &:hover {
    transform: scale(1.05);
  }
`