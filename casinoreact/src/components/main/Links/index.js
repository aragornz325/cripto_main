import React from 'react';
import { Arrow, Container, Icon, Link, Info, Text } from './styles';

const Links = ({ linkData }) => {
  return (
    <Container>
      {linkData.map((link, i) => {
        return <Link href={link.text.toLowerCase().split(' ').join('')} key={i}>
          <Info>
            <Icon src={`assets/icons/links/${link.img}.png`} />
            <Text>{link.text}</Text>
          </Info>
          <Arrow src="assets/icons/arrowRight.png" />
        </Link>
      })}
    </Container>
  )
}

export default Links;