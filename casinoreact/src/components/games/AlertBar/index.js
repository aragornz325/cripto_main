import React, { useState } from 'react';
import { Bar, ExitBtn, Text } from './styles.js';
import store from '../../../store/reducers/store';
import setAlert from '../../../store/actionCreators/setAlert.js';

const AlertBar = () => {

  const [isActive, setIsActive] = useState(false);
  
  store.subscribe(()=>{
    setIsActive(store.getState()?.alert?.display);
  })

  return (
    <React.Fragment>
    { isActive ? (
      <Bar onClick={() => setAlert({display: false})}>
        <Text>{store.getState().alert.text}</Text>
        {/* <ExitBtn onClick={() => setAlert({display: false})}>X</ExitBtn> */}
      </Bar>
    ) : ''}
    </React.Fragment>
  )
}

export default AlertBar;
