import React from 'react';
import {Main,Paragraph, Title, NavLink, By} from './styles.js';
import { Link } from 'react-scroll';
//import Logo from '../../../../public/assets/home/footer/logo.png';




const Footer = () => {
    return (
        <Main>
            <Title>
                <img src={'assets/home/footer/logo.png'}/>
                <Paragraph><b>CRYP</b>GO</Paragraph>
            </Title>
            <Title>
            <NavLink href='/'>Home</NavLink>
            <Link to='about' smooth={true} duration={1000}> <NavLink href='/about'>About</NavLink> </Link>
            <Link to='contact' smooth={true} duration={1000}> <NavLink href='/contact'>Contact</NavLink> </Link>
            <NavLink href='#'>Store</NavLink>
            </Title>
            <By>
                <p style={{color :  'white' , marginTop: '40px'}}>© 2021 CRYPGO | Developed by <a href="https://it-techgroup.com" target="_blank" style={{color: '#EDBE18'}}>IT-TECHGROUP</a></p>
            </By>
        </Main>
    )
};


export default Footer;