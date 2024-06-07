import React, { useState, useEffect } from 'react';
import LoginForm from '../forms/LoginForm';
import StoreForm from '../forms/StoreForm';
import Footer from './Footer';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Wrapper, Content } from './styles';
import { useSession } from '../../SessionContext';

const Layout = ({ selectedLink, children, noNavbar }) => {
  
  const { userData } = useSession()

  const [ open, setOpen ] = useState(true);
  const [ form, setForm ] = useState();
  const [ socket, setSocket ] = useState();

  
  const childrenWithProps = 
      children.length 
    ? children.map((child, index) => 
          React.cloneElement(child, { user: userData, key: index, socket })) 
        : React.cloneElement(children, { user: userData, socket }
      )

  return (
    <Wrapper>
      <Sidebar user={userData} selectedLink={selectedLink} setOpen={setOpen} open={open} />
      <Content open={open}>
        {!noNavbar && <Navbar open={open} setForm={setForm} user={userData} />}
        {childrenWithProps} {/* Adding props to children */}
        <Footer />
        {form === 'login'    && <LoginForm startMode='login' setForm={setForm} />}
        {form === 'register' && <LoginForm startMode='register' setForm={setForm} />}
        {form === 'store'    && <StoreForm setForm={setForm} userId={userData._id} />}
      </Content>
    </Wrapper>
  )
}

export default Layout;