import React from 'react';
import { Main, Div, Paragraph} from './styles';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailOutlineIcon from '@mui/icons-material/MailOutline';


const Contact= () => {
    return (
        <Main id='contact'>
            <h1 style={{color: '#FFFFFF', fontFamily: 'Poppins'}}>Contact</h1>
            <Paragraph style={{color: '#FFFFFF'}}>Please feel free to contact us If you need some help, we will listen. We won't judge or tell you what to do. If you are having some problems with the platforms send us an email and we will help you as soon as possible.</Paragraph>
            <Div>
                <MailOutlineIcon fontSize='large' style={{'color': '#FFFFFF', 'marginLeft': '3%'}}/>
                <Paragraph style={{':hover': {'color': '#000000'}}}>crypgo@gmail.com</Paragraph>
            </Div>
            <Div>
                <InstagramIcon fontSize='large' style={{'color': '#FFFFFF', 'marginLeft': '3%'}}/>
                <Paragraph>@crypgo</Paragraph>
            </Div>
            <Div>
                <WhatsAppIcon fontSize='large' style={{'color': '#FFFFFF', 'marginLeft': '3%'}}/>
                <Paragraph>0800-9568 5751</Paragraph>
            </Div>
        </Main>
    )
}



export default Contact;