import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Title from '../../components/main/Title';
import { Room, Text, Wrapper } from './styles';
import io from 'socket.io-client';
import { apiURI } from '../../config/keys'
import { useNavigate, useParams } from 'react-router-dom';

const { REACT_APP_LOCAL_API_URL } = process.env

const Rooms = () => {
  const navigate = useNavigate()

  const [RoomsData, setRoomsData] = useState([]);
  const [newRoomRequested, setNewRoomRequested] = useState(true);
  const [createRoomBody, setCreateRoomBody] = useState({
    type: "PUBLIC",
    entryPrice: 10,
    rakeValue: 0.5,
    maxPlayers: 5,
    startTimeout: 10,
    turnTimeout: 10
  })

  useEffect(()=>{
    const a = async() => {
      var requestOptions = {
        method: 'GET',
        credentials: "include",
        redirect: 'follow',
      };
      const response = await fetch(`${REACT_APP_LOCAL_API_URL}/poker-holdem/room/all`, requestOptions)
      .then((res)=>{
        setNewRoomRequested(false)
        return res.json()
      })
      .catch(error => console.log('## GET ROOMS ERROR ##', error));
      console.log("#### GET ROOMS #### /poker-holdem/room/all", response)
      setRoomsData(response);
    }
    if(newRoomRequested){
      a();
    }
  }, [newRoomRequested]);

  const handleClickPokerRoom = (room) => navigate(`/poker-holdem/${room.roomId||room._id}`)

  // Create new room ## DELETE THIS ##
  const handleCreateRoom = (e) => {
    const body = { ...createRoomBody }

    body.startTimeout = createRoomBody.startTimeout * 1000
    body.turnTimeout = createRoomBody.turnTimeout * 1000

    e.preventDefault()
    fetch(`${REACT_APP_LOCAL_API_URL}/poker-holdem/room`, {
			method: "POST",
      credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body)
		})
    .then(() => setNewRoomRequested(true))
	}

  const handleBody = (e) => {
    setCreateRoomBody( state => {
      return {
        ...state,
        [e.target.name]: parseInt(e.target.value)
      }
    })
  }
  
  return (
    <>
      <Title text="Poker Rooms" handleCreateRoom={handleCreateRoom} createRoomBody={createRoomBody} handleBody={handleBody}/>
      <Wrapper>
        {RoomsData.length && !newRoomRequested ? RoomsData.reverse().map(room => {
          const isFull = room.players.length === room.maxPlayers;
          return <Room onClick={() => !isFull && handleClickPokerRoom(room)}>
            <Text style={{color: `#${room._id.slice(3, 9)}`}}>{room._id.slice(room._id.length - 4)}</Text>
            <Text>{room.type}</Text>
            <Text>{room.startTimeout / 1000}s</Text>
            <Text style={isFull ? {color: 'red'} : {}}>{isFull ? 'FULL' : `${room.players.length}/${room.maxPlayers}`}</Text>
            <Text>${room.entryPrice}</Text>
          </Room>
        }) : <Text>LOADING...</Text>}
      </Wrapper>
    </>
  )
}

export default Rooms;