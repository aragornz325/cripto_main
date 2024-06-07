import React, { useState } from 'react';
import { Bar, ExitBtn } from './styles.js';
import store from '../../../store/reducers/store';
import setAlert from '../../../store/actionCreators/setAlert.js';

const AlertBar = () => {

  const [isActive, setIsActive] = useState(false);
  
  store.subscribe(()=>{
    setIsActive(store.getState().alert.display);
  })

  return (
    <React.Fragment>
    { isActive ? (
      <Bar style={{background: store.getState().alert.color}} onClick={() => setAlert({display: false})}>
        <p style={{color: 'black'}}>{store.getState().alert.text}</p>
        {/* <ExitBtn onClick={() => setAlert({display: false})}>X</ExitBtn> */}
      </Bar>
    ) : ''}
    </React.Fragment>
  )
}

export default AlertBar;
