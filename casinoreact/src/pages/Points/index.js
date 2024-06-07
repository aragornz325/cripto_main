import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { Amount, Balance, BalanceContainer, BalanceTitle, ExchangeButton, Item, ItemDescription, ItemImg, ItemInfo, ItemsContainer, ItemTitle, Title, TitleContainer, TitleIcon, Wrapper } from './styles'

const Points = () => {

  const pointsData = [
    { amount: 500, title: '500 points up!', description: '10 TEMPLATES', image: '/assets/icons/points/coinsBag.png', color: '#FDD65B' },
    { amount: 30, title: '30 points up!', description: 'Change your avatar this month', image: '/assets/icons/points/coinsBag.png', color: '#FFF' },
    { amount: 30, title: '30 points up!', description: 'Change your avatar this month', image: '/assets/icons/points/coinsBag.png', color: '#FFF' },
    { amount: 500, title: '500 points up!', description: '10 TEMPLATES', image: '/assets/icons/points/coinsBag.png', color: '#FDD65B' },
    { amount: 500, title: '500 points up!', description: '10 TEMPLATES', image: '/assets/icons/points/coinsBag.png', color: '#FDD65B' },
    { amount: 30, title: '30 points up!', description: 'Change your avatar this month', image: '/assets/icons/points/coinsBag.png', color: '#FFF' },
  ]

  return (
    <>
      <Wrapper>
        <TitleContainer>
          <TitleIcon src="/assets/icons/pointsActive.png" />
          <Title>Points</Title>
        </TitleContainer>
        <BalanceContainer>
          <BalanceTitle>Total points</BalanceTitle>
          <Balance>1202</Balance>
        </BalanceContainer>
        <ItemsContainer>
          {pointsData.map((item, index) => {
            return <Item key={index}>
              <Amount color={item.color}>{item.amount}</Amount>
              <ItemInfo>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemDescription>{item.description}</ItemDescription>
                <ItemImg src={item.image} />
                <ExchangeButton>Exchange</ExchangeButton>
              </ItemInfo>
            </Item>
          })}
        </ItemsContainer>
      </Wrapper>
    </>
  )
}

export default Points;