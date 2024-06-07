import React, { Component } from "react";
import Slider from "react-slick";
import { Game, Item } from "./styles";


const GameCarousel = ({ games }) => {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
    };
    return (
        <Slider {...settings} style={{width: '70vw', height: '200px', background: '#000000', paddingLeft: '2.5vw'}}>
          {games.map((game)=>{
            return (
                <Item href={game.url}>
                 
                  <img src={} style={{width: '10vw', height: '14vh', borderRadius: '1vw'}}/>
                  <p style={{margin: '1vh 0 0 0', textAlign: 'center', fontSize: '.8vw', paddingLeft: '.5vw', paddingRight: '.5vw', fontFamily: 'Poppins'}}>{game.description}</p>
                </Item>
            )
          })}
        </Slider>

    );
}

export default GameCarousel;