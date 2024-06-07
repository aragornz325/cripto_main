import React from 'react';
import { StyledLink, LinkIcon, LinkText, Glow } from './styles';

const SideLink = ({ $active, open, text, url, onClick }) => {
  
  let checkedUrl;
  switch(url){
    case 'home':
      checkedUrl = '';
      break;
    case 'exit':
      checkedUrl = '#';
      break;
    default:
      checkedUrl = url;
      break;
  }

  return (
    <StyledLink $active={$active} to={`/${checkedUrl}`} s open={open} onClick={onClick} >
      <LinkIcon src={`assets/icons/${url}.png`} open={open}/>
      <LinkText open={open}>{text}</LinkText>
      <Glow $active={$active} open={open} />
    </StyledLink>
  )
}

export default SideLink;