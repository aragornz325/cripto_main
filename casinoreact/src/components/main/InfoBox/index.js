import React from 'react'
import { Text, Title, Wrapper } from './styles'

const InfoBox = ({ title, text, error }) => {
  return (
    <Wrapper error={error}>
        <Title>{title}</Title>
        {text.map(t => <Text>{t}</Text>)}
    </Wrapper>
  )
}

export default InfoBox