import React from 'react';
import { Dialog, Image } from './styles';

const Croupier = ({ dialog }) => {
  return (
    <>
      <Image src="/assets/croupier.png" />
      {dialog && <Dialog src={`/assets/${dialog}Dialog.png`} />}
    </>
  )
}

export default Croupier