import React, { useState } from 'react';
import Drawl from './Drawl';
import Game from './Game';
import { FilterIcon, Search, Input, SearchIcon, Actions, Games, Option, Selector, Title, Wrapper } from './styles';

const Feed = () => {

  const games = [
    { title: 'Poker Online', path: '/poker-holdem' },
    { title: 'Roulette', path: '/roulette', favourite: true },
    { title: 'Blackjack', path: '/blackjack' },
    // { title: 'Texas Hold\'Em', path: '/poker' },
    // { title: 'Poker Online', path: '/rooms', big: true, favourite: true },
    // { title: 'Roulette', path: '/roulette2' },
    // { title: 'Blackjack', path: '/blackjack' },
    // { title: 'Texas Hold\'Em', path: '/poker' },
  ]

  const tags = [
    { name: 'All the games' },
    // { name: 'Hot bids', value: 'hot' },
    // { name: 'Popular games', value: 'popular' },
    // { name: 'Slots', value: 'slot' },
  ]
  const [category, setCategory] = useState();
  const [filter, setFilter] = useState('');

  return (
    <Wrapper>
      <Drawl />
      <Actions>
        <Title>{tags.map(tag => tag.value === category && tag.name)}</Title>
        <Search>
          <SearchIcon src="assets/icons/search.png" />
          <Input placeholder='Search for games...' value={filter} onChange={e => setFilter(e.target.value)} />
          {/* <FilterIcon src="assets/icons/filter.png" /> */}
        </Search>
      </Actions>
      <Selector>
        {tags.map((tag, i) => <Option key={i} selected={category === tag.value} onClick={() => setCategory(tag.value)} items={tags.length}>{tag.name}</Option>)}
      </Selector>
      <Games>
        {/* remove favourite={game.favourite} in Game becouse a candy of chocolate its sound now */}
        {games.map(game => game.title.toLowerCase().includes(filter.toLowerCase()) && <Game title={game.title} path={game.path} big={game.big} />)} 
      </Games>
    </Wrapper>
  )
}

export default Feed;