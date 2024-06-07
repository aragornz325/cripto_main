import React, { useState } from 'react';
import { Drawls, DrawlInfo, Buttons, Favourite, FavIcon, Button, SlideSelector, SlideSelect, Division, Carousel, CarouselItem } from './styles';

const Drawl = () => {

  const [selected, setSelected] = useState(0);

  return (
    <div></div>
    // <Drawls>
    //     <DrawlInfo>Lucky drawls!</DrawlInfo>
    //     <Carousel>
    //       { selected === 0 ? <>
    //         <CarouselItem src="/assets/drawl1.png" />
    //         <CarouselItem src="/assets/drawl2.png" />
    //         <CarouselItem src="/assets/drawl1.png" />
    //       </> : selected === 1 ? <>
    //         <CarouselItem src="/assets/drawl2.png" />
    //         <CarouselItem src="/assets/drawl1.png" />
    //         <CarouselItem src="/assets/drawl2.png" />
    //       </> : <>
    //         <CarouselItem src="/assets/drawl2.png" />
    //         <CarouselItem src="/assets/drawl2.png" />
    //         <CarouselItem src="/assets/drawl1.png" />
    //       </>}
    //     </Carousel>
    //     <Buttons>
    //       <Division>
    //         <Favourite><FavIcon src="/assets/icons/heartFull.png" /> Add to favourites</Favourite>
    //       </Division>
    //       <Division>
    //         <SlideSelector>
    //           <SlideSelect selected={selected === 0} onClick={() => setSelected(0)} />
    //           <SlideSelect selected={selected === 1} onClick={() => setSelected(1)} />
    //           <SlideSelect selected={selected === 2} onClick={() => setSelected(2)} />
    //         </SlideSelector>
    //       </Division>
    //       <Division>
    //         <Button>Bet</Button>
    //       </Division>
    //     </Buttons>
    //   </Drawls>
  )
}

export default Drawl