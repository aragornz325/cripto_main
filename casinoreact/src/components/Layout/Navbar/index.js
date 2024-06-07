import React, { useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import { useSession } from '../../../SessionContext';
import { Container, Blobs, Blob, BlobIcon, BlobUserIcon, Username, UserMenu, Arrow, Title, Spacer, Login, Register, Balance, BalanceTitle, BalanceNumber, Titles, TitleContainer, TitleIcon } from './styles'

const Navbar = ({ open, setForm, user }) => {
  
  const { userState, userData } = useSession()
  const [openUserMenu, setOpenUserMenu] = useState(false);

  return (
    <>
      <Spacer />  
      <Container open={open}>
        <Titles>
          <TitleContainer>
            <TitleIcon src="assets/icons/casino.png" />
            <Title onClick={() => window.location = '/'} active={window.location.pathname === '/'}>Casino</Title>
          </TitleContainer>
          {/* <TitleContainer>
            <TitleIcon src="assets/icons/store.png" />
            <Title onClick={() => user && setForm('store')}>Store</Title>
          </TitleContainer> */}
        </Titles>
        <Blobs>
          { 
            userState === 'logged' 
            ? (<>
                {/* <Blob>
                  <BlobIcon src="assets/icons/notification.png" />
                </Blob> */}
                <UserMenu onClick={() => setOpenUserMenu(!openUserMenu)}>
                  <Blob>
                    <BlobUserIcon src="assets/1memoji.png" />
                  </Blob>
                  <Username>{userData?.username}</Username>
                  <Arrow src="assets/icons/arrow.png" open={openUserMenu} />
                {openUserMenu && <Balance>
                  <BalanceTitle>Your Balance</BalanceTitle>
                  <BalanceNumber>{user.balance}</BalanceNumber>
                </Balance>}
                </UserMenu>
            </>) 
              :  userState === 'loading' 
              ? <ClipLoader color='#fff'/>
            : userState === 'not-logged' 
            ? (<>
              <Login onClick={() => setForm('login')}>Login</Login>
              <Register onClick={() => setForm('register')}>Register</Register>
            </>)
            : null
          }
        </Blobs>
      </Container>
    </>
  )
}

export default Navbar