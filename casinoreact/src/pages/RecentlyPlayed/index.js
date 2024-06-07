import React from 'react';
import Layout from '../../components/Layout';
import { Wrapper, TitleContainer, TitleIcon, Title, Games, Suggestions, SuggestionsTitle } from './styles';
import Game from '../../components/main/Feed/Game';

const RecentlyPlayed = () => {

  const games = [
    { title: 'Blackjack', url: '/blackjack', big: true },
    { title: 'Poker Online', url: '/rooms' },
    { title: 'Texas Hold\'Em', url: '/poker' },
    { title: 'Poker Online', url: '/rooms', big: true, favourite: true },
  ]

  return (
    <>
      <Wrapper>
        <TitleContainer>
          <TitleIcon src="/assets/icons/recentActive.png" />
          <Title>Recently Played</Title>
        </TitleContainer>
        <Games>
          {games.map(game => <Game title={game.title} url={game.url} big={game.big} favourite={game.favourite} />)}
        </Games>
      </Wrapper>
      <Suggestions>
        <SuggestionsTitle>Suggestions</SuggestionsTitle>
        <Games>
          {games.map(game => <Game title={game.title} url={game.url} big={game.big} favourite={game.favourite} />)}
        </Games>
      </Suggestions>
    </>
  )
}

export default RecentlyPlayed;