import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
/* import Poker from '../../../../public/assets/home/carrousel/poker.png';
import Roulette from '../../../../public/assets/home/carrousel/roulette.png';
import Blackjack from '../../../../public/assets/home/carrousel/blackjack.png'; */
import { Img, Div, Overlay, Link } from './Styles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

 function Carrousel ({ items }) {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;

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


  return (
    <div style={{ padding: `0 ${chevronWidth}px`, height: 400 }}>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={dimensions.width > 1650 ? 4 : dimensions.width > 1250 ? 3 : dimensions.width > 850 ? 2 : 1}
        gutter={10}
        leftChevron= {<ArrowBackIosNewIcon style={{'color': '#FFFFFF'}}/>}
        rightChevron={<ArrowForwardIosIcon style={{'color': '#FFFFFF'}}/>}
        showSlither={dimensions.width > 970 ? true : false}
        outsideChevron
        chevronWidth={chevronWidth}
      >
        {items && items.map((item, index) => {
          return <Div key={index}>
            <Link href={`/${item}`}> 
              <Img src={`assets/home/carrousel/${item}.png`}/> 
              <Overlay>{item.toUpperCase()}</Overlay>
            </Link>
          </Div>
        })}       
      </ItemsCarousel>
    </div>
  );
};


export default Carrousel;