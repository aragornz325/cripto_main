import React, { useState } from 'react';
import { Bar, ExitBtn, Text, Link } from './styles.js';
import store from '../../../store/reducers/store';
import setPopup from '../../../store/actionCreators/setPopup.js';
import { useEffect } from 'react';

const Popup = () => {

  const [isActive, setIsActive] = useState(store.getState().feedback);
  
  store.subscribe(()=>{
    setIsActive(store.getState().feedback);
  })

  return (
    <React.Fragment>
    { isActive ? (
      <Bar onClick={() => setPopup(false)}>
        <Text>We want to know <Link href="/feedback">what you think</Link></Text>
      </Bar>
    ) : ''}
    </React.Fragment>
  )
}

export default Popup;
