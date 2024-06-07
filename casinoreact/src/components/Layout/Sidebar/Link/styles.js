import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as palette from '../../../../utils/colors/palettes/default';

export const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  height: 22px;
  margin-bottom: 20px;
  width: ${props => props.open ? '160px' : '22px'};
  position: relative;
  text-decoration: none;
  transition: width ${palette.tOpen};

  filter: ${(props) => props.$active ? palette.activeTextFilter : 'none'};
  
  &:hover {
    filter: ${palette.activeTextFilter};
  }
`

export const LinkIcon = styled.img`
  width: 22px;
  height: 22px;
  margin-right: ${props => props.open ? '10px' : '0'};
`

export const LinkText = styled.p`
  display: ${props => props.open ? 'display' : 'none'};
  width: ${props => props.open ? '100%' : '0'};
  opacity: ${props => props.open ? 1 : 0};
  overflow: hidden;
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
  color: ${palette.text};
`

export const Glow = styled.div`
  display: ${(props) => props.active ? 'display' : 'none'};
  height: 100%;
  width: 2px;
  border-top-left-radius: 1px;
  border-bottom-left-radius: 1px;
  right: ${props => props.open ? '-20px' : '-14px'};
  box-shadow: -2px 0 6px ${palette.activeText};
  background: ${palette.activeText};
  position: absolute;
`