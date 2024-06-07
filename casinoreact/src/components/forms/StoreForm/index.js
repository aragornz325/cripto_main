import React, { useEffect, useState } from 'react'
import { Buy, CloseBtn, Coins, CoinsIcon, CoinsText, Form, Icon, Image, Item, Items, ItemTitle, Title, TitleContainer, Wrapper } from './styles';
import buy from '../../../controllers/store/buy';

const StoreForm = ({ setForm, userId }) => {

  const [animation, setAnimation] = useState();

  const closeForm = () => {
    setAnimation('fadeOut');
    setTimeout(() => {
      setForm('');
    }, 500);
  }

  useEffect(()=>{
      setAnimation('fadeIn');
  }, [])

  const ItemsData = [
    { title: 'One Shot!', img: 'box', coins: 5000, price: 5 },
    { title: 'Twins', img: 'box', coins: 15000, price: 10 },
    { title: 'One Shot!', img: 'box', coins: 30000, price: 15 },
    { title: 'Golden Up!', img: 'box', coins: 450000, price: 50 },
    { title: 'One Shot!', img: 'box', coins: 700000, price: 100 },
    { title: 'One Shot!', img: 'box', coins: 5000, price: 5 },
    { title: 'Twins', img: 'box', coins: 15000, price: 10 },
    { title: 'One Shot!', img: 'box', coins: 30000, price: 15 },
  ]

  return (
    <Wrapper animation={animation}>
      <Form>
        <CloseBtn src="/assets/icons/close.png" onClick={() => closeForm()} />
        <TitleContainer>
          <Icon src="/assets/icons/store.png" />
          <Title>Store</Title>
        </TitleContainer>
        <Items>
          {ItemsData.map((item, i) => {
            return <Item key={i}>
              <ItemTitle>{item.title}</ItemTitle>
              <Image src={`/assets/icons/store/${item.img}.png`} />
              <Coins>
                <CoinsIcon src="/assets/icons/coin.png" />
                <CoinsText>{item.coins}</CoinsText>
              </Coins>
              <Buy type="button" onClick={() => buy(item.price, item.coins, userId)}>{item.price} U$D</Buy>
            </Item>
          })}
        </Items>
      </Form>
    </Wrapper>
  )
}

export default StoreForm;