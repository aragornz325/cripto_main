import React from "react";
import {Image, Container, Navigation} from './styles.js';
import NavBar from "../../../components/navigation/NavBar/index.js";

const Header = () => {
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
        <Container>
            <Navigation>
              <NavBar/>
            </Navigation>
            {
              dimensions.width > 650 ?
              <Image src={'assets/home/header/img1.png'} />
              : 
              <Image src={'assets/home/header/imgmobile.png'} />
            }
        </Container>
    )
}


export default Header;