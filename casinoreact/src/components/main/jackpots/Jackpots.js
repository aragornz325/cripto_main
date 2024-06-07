import React, { useState, useEffect } from 'react';
import {Jackpot, Main, Img, Paragraph, Banner, BannerImg, SubParagraph, DivParagraph, StartNow} from './styles';
/* import Imagen from '../../../../public/assets/home/jackpots/jackpots.png';
import image from '../../../../public/assets/home/jackpots/banner.png'; */




function Jackpots() {


    const [dimensions, setDimensions] = React.useState({ 
        height: window.innerHeight,
        width: window.innerWidth
      })
      React.useEffect(() => {
        function handleResize() {
          setDimensions({
            height: window.innerHeight,
            width: window.innerWidth
          })
    }
        window.addEventListener('resize', handleResize)
        return _ => {
          window.removeEventListener('resize', handleResize)
    }
      })
    return(
        <Jackpot> 
            <Main>
              <Img src={'assets/home/jackpots/jackpots.png'} />
              <DivParagraph>
                <Paragraph>Will be available soon</Paragraph>
                <SubParagraph>Jackpots are in developing stage. Stay tuned to our socials.</SubParagraph>
              </DivParagraph>
            </Main>     
            <Banner>
              <BannerImg src={'assets/home/jackpots/feedback.png'} />
              <Main style={{width: '50%'}}>
                <DivParagraph style={{alignItems: 'flex-start'}}>
                  <Paragraph>Send Feedback</Paragraph>
                  <SubParagraph>We'll solve any problems you find in the casino</SubParagraph>
                  <StartNow onClick={() => window.location = '/feedback'}>Send</StartNow>
                </DivParagraph>
              </Main>
            </Banner>    
        </Jackpot>
    )
}


export default Jackpots;