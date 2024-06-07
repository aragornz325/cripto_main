import styled from 'styled-components';
import * as palette from '../../../utils/colors/palettes/default';

export const Wrapper = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
`

export const Links = styled.div`
  display: flex;
  gap: 16px;
  margin-left: 24px;
`

export const Link = styled.a`
  color: ${palette.sFooterLink};
`

export const Socials = styled.div`
  display: flex;
  gap: 16px;
  margin-right: 24px;
`

export const Social = styled.img`
  width: 14px;
  height: 14px;
  cursor: pointer;
`