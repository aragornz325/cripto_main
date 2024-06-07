import React from 'react'
import { UserBalance, UserCardContainer, UserIcon, UserInfoBox, UserName } from './styles'

const Users = ({ players }) => {
  const positions = [
    {
      top: '42%',
      left: '12.5%',
      color: '#D869CF',
      active: true
    },
    {
      top: '15%',
      left: '24%',
      color: '#03A0A3'
    },
    {
      top: '15%',
      left: '58%',
      color: '#D869CF'
    },
    {
      top: '42%',
      left: '69%',
      color: '#03A0A3'
    },
  ]
  console.log(players)
  return (
    <>
      {positions.map((p, index) => {
        return <UserCardContainer key={index} top={p.top} left={p.left}>
          <UserIcon src="/assets/3memoji.png" color={p.color} active={p.active} />
          <UserInfoBox color={p.color}>
            <UserName>{players[index]?.user || 'Available seat'}</UserName>
            <UserBalance>1234567890</UserBalance>
          </UserInfoBox>
        </UserCardContainer>
      })}
    </>
  )
}

export default Users