import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import { Div, Paragraph, Date, Img} from './styles';
/* import News1 from '../../../../public/assets/home/news/news1.png';
import News2 from '../../../../public/assets/home/news/news2.png';
import News3 from '../../../../public/assets/home/news/news3.png'; */
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';





function News () {
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
      <div style={{ padding: `0 ${chevronWidth}px`, height: 780, marginTop: 0 }}>
        <ItemsCarousel
          requestToChangeActive={setActiveItemIndex}
          activeItemIndex={activeItemIndex}
          numberOfCards={dimensions.width > 770 ? 2 : 1}
          gutter={500}
          leftChevron= {<ArrowBackIosNewIcon style={{'color': '#FFFFFF'}}/>}
          rightChevron={<ArrowForwardIosIcon style={{'color': '#FFFFFF'}}/>}
          showSlither={dimensions.width > 970 ? true : false}
          outsideChevron
          chevronWidth={chevronWidth}
        >
          <Div>
              <Img src={'assets/home/news/news1.png'} /> 
              <h2 style={{color: '#FFFFFF', textAlign: 'center',fontFamily: 'Poppins'}}>Fun casino games for Beginners</h2>
              <Paragraph>Online casinos provide fun and exciting games that players can enjoy to their hearts’ content. Additionally, there are ...</Paragraph>
              <Date >19/11/2021</Date>
          </Div>
          <Div>
              <Img   src={'assets/home/news/news2.png'} />
              <h2 style={{color: '#FFFFFF', textAlign: 'center'}}>How to earn crypto from gaming</h2>
              <Paragraph>Digital currencies’ decades of existence proves that no degree of volatility and controversies can show that they ...</Paragraph>
              <Date >07/1/2021</Date>
          </Div>
          <Div>
              <Img src={'assets/home/news/news3.png'}  /> 
              <h2 style={{color: '#FFFFFF', textAlign: 'center'}}>Gamer's checklist: 5 essential it</h2>
              <Paragraph >We all know gamers are a special kind of people. They can be very specific about the item</Paragraph>
              <Date >30/11/2021</Date>
          </Div>
        
          
        </ItemsCarousel>
      </div>
    );
  };
  
  
  export default News;