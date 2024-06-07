import React from 'react'
import Layout from '../../components/Layout';
import Feed from '../../components/main/Feed';
import MobileAlert from '../../components/main/MobileAlert';

const Home = () => {
  if(window.innerWidth < 750){
    return <MobileAlert />
  }

  return <Feed />
}

export default Home;