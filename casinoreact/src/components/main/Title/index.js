import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'
import { Close, Container, Form, Icon, Input, Inputs, Label, Submit, Text } from './styles';

const Links = ({ text , handleCreateRoom, createRoomBody, handleBody }) => {
  const { pathname } =  useLocation()
  const [openModal,setOpenModal] = useState(false)
  const handleModal = () => setOpenModal(!openModal)
  const handleSubmit = (e) => {
    e.preventDefault()
    handleCreateRoom(e)
    setOpenModal(false)
  }

  console.log({ pathname })

  return (
    <Container>
      <Icon src={`assets/icons/titles/${text.toLowerCase().split(' ').join('')}.png`} />
      <Text>{text}</Text>
      {pathname === '/poker-holdem' && <button 
        onClick={handleModal} 
        style={{
          color: 'white', 
          background: 'none', 
          border: '2px solid white', 
          borderRadius: '12px', 
          padding: '6px 16px', 
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >Create New Room
      </button>}
      {
        openModal ?
        <Form 
          onSubmit={handleSubmit}
          onChange={handleBody}
        >
          <Inputs>
            <Close src="/assets/icons/close.png" onClick={handleModal}/>
            <Label>Entry Price</Label>
            <Input value={createRoomBody.entryPrice} type='number' name='entryPrice' placeholder='Entry price (big blind)'/>
            <Label>Max Players</Label>
            <Input value={createRoomBody.maxPlayers} type='number' name='maxPlayers' placeholder='Max players' disabled={true}/>
            <Label>Start Timeout (s)</Label>
            <Input value={createRoomBody.startTimeout} type='number' name='startTimeout' placeholder='Restart Timeout'/>
            <Label>Turn Timeout (s)</Label>
            <Input value={createRoomBody.turnTimeout} type='number' name='turnTimeout' placeholder='Turn Timeout'/>
            <Submit type='submit'>SEND</Submit>
          </Inputs>
        </Form>
        : <div/>
      } 
    </Container>
  )
}

export default Links;