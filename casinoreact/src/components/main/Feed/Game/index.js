import { get } from 'jquery'
import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../../../../SessionContext'
import LoginForm from '../../../forms/LoginForm'
import { Coin, Container, GameBG, GameButton, GameButtons, GameContent, GameFav, GameInfo, GameOptions, GamePlayers, GamePreview, GamePrice, GameTitle, Wrapper } from './styles'

const Game = ({ title, path, big, favourite }) => {
  const navigate = useNavigate()
  const { userData } = useSession()

  const handleClickPlay = () => {
      userData 
    ? navigate(path)
    : toast.error("You need to log in")
    
  }

  return (
      <Container big={big}>
        {/* <GameBG src="/assets/gameBG.png" /> */}
        <GameContent>
          <GameTitle>{title}</GameTitle>
          <GamePreview src={`/assets/preview/${path}.png`} />
          <GameOptions>
            <GameInfo>
              {/* <GamePlayers>6 Players</GamePlayers>
              <GamePrice><Coin src="/assets/icons/coinC.png"/> 0.67</GamePrice> */}
            </GameInfo>
            <GameButtons>
              {/* <GameFav src={favourite ? '/assets/icons/favouriteOn.png' : '/assets/icons/favouriteOff.png' } /> */}
              <GameButton onClick={handleClickPlay}>Play</GameButton>
            </GameButtons>
          </GameOptions>
        </GameContent>
      </Container>
  )
}

export default Game