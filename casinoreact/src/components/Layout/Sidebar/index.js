import React from 'react'
import { CategoryTitle, Container, Logo, LogoSmall, CloseBtn, Spacer } from './styles'
import SideLink from './Link';
import { BsArrowBarLeft, BsArrowBarRight } from 'react-icons/bs'
import { useSession } from '../../../SessionContext';
import { useLocation } from 'react-router-dom';

const Sidebar = ({ setOpen, open, resetUser, user }) => {
  
  const { logout } = useSession()
  const { pathname } = useLocation()

  return (
    <Container open={open}>

      <Logo src={`assets/icons/logo.png`} open={open} />
      <LogoSmall src={`assets/icons/logoSmall.png`} open={open} />
      <CloseBtn onClick={() => setOpen(!open)} >
        {
          open ? <BsArrowBarLeft /> : <BsArrowBarRight /> 
        }
      </CloseBtn>

      <Spacer height="130px" />

      {/* Links */}

      {
        user?.isAdmin ? 
          <>
            <CategoryTitle open={open}>Menu</CategoryTitle>
            <SideLink text="Stats"   url="stats"  $active={pathname === '/stats'} open={open} />
            <SideLink text="Log Out" url="exit" $active={pathname === '/exit'} open={open} onClick={logout} />
          </> : 
          <>
          {/* Menu Category */}
          <CategoryTitle open={open}>Menu</CategoryTitle>
          <SideLink text="Home"      url="home"   $active={pathname === '/'} open={open} />
          <SideLink text="My wallet" url="wallet" $active={pathname === '/wallet'} open={open} />
          {/* <SideLink text="Points"    url="points" $active={pathname === '/points'} open={open} /> */}
    
          {/* Games Category */}
          {/* <CategoryTitle open={open}>Games</CategoryTitle> */}
          {/* <SideLink text="Recently Played" url="recent" $active={pathname === "/recent"} open={open} /> */}
          {/* <SideLink text="Top Rated" url="rating" $active={pathname === "/rating"} open={open} /> */}
          {/* <SideLink text="Favorites" url="favorites" $active={pathname === "/favorites"} open={open} /> */}
    
          {/* General Category */}
          {
            user  ? 
              <>
                <CategoryTitle open={open}>General</CategoryTitle>
                <SideLink text="Settings" url="settings" $active={pathname === "/settings"} open={open} />
                {/* <SideLink text="Stats" url="stats" $active={pathname === "/stats"} open={open} /> */}
                <SideLink text="Log Out" url="exit" $active={pathname === "/exit"} open={open} onClick={logout} />
              </> : null 
          } 
          
          </>
      }
    </Container>
  )
}

export default Sidebar