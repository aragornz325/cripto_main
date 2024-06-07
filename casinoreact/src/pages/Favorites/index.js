import React from 'react';
import Layout from '../../components/Layout';
import { Wrapper, TitleContainer, TitleIcon, Title, Games, Suggestions, SuggestionsTitle } from './styles';
import Game from '../../components/main/Feed/Game';

const Favorites = () => {

  const games = [
    { title: 'Blackjack', url: '/blackjack', big: true, favourite: true },
    { title: 'Poker Online', url: '/rooms', favourite: true },
    { title: 'Texas Hold\'Em', url: '/poker', favourite: true },
    { title: 'Poker Online', url: '/rooms', big: true, favourite: true },
    { title: 'Poker Online', url: '/rooms', favourite: true },
    { title: 'Blackjack', url: '/blackjack', big: true, favourite: true },
    { title: 'Poker Online', url: '/rooms', big: true, favourite: true },
    { title: 'Texas Hold\'Em', url: '/poker', favourite: true },
  ]

  return (
    <>
      <Wrapper>
        <TitleContainer>
          <TitleIcon src="/assets/icons/favoritesActive.png" />
          <Title>Favorites</Title>
        </TitleContainer>
        <Games>
          {games.map(game => <Game title={game.title} url={game.url} big={game.big} favourite={game.favourite} />)}
        </Games>
      </Wrapper>
    </>
  )
}

export default Favorites;