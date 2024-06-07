import React, { useState } from 'react';
import buy from '../../../controllers/store/buy';
import { Wrapper, Container, CloseBtn, Item, BuyBtn, Image, Info, Row, Text } from './styles';
import store from '../../../store/reducers/store';
import renderStore from '../../../store/actionCreators/renderStore';
import { useEffect } from 'react';
import { usersController } from '../../../controllers'

const Store = () => {

  const items = [
    { price: 10, img: 'assets/store/coins.png', coins: {one: 3, five: 1}},
    { price: 100, img: 'assets/store/coins.png', coins: {one: 3, five: 1}},
    { price: 500, img: 'assets/store/coins.png', coins: {one: 3, five: 1}},
    { price: 800, img: 'assets/store/coins.png', coins: {one: 3, five: 1}},
    { price: 1000, img: 'assets/store/coins.png', coins: {one: 25, five: 10, ten: 5}},
    { price: 1500, img: 'assets/store/coins.png', coins: {one: 25, five: 10, ten: 5}},
    { price: 2000, img: 'assets/store/coins.png', coins: {one: 25, five: 10, ten: 5}},
    { price: 5000, img: 'assets/store/coins.png', coins: {one: 25, five: 10, ten: 5}},
  ]

  const [render, setRender] = useState(false);

  store.subscribe(() => {
    if(render !== store.getState().renderStore){
      setRender(store.getState().renderStore);
    }
  })

  const [userId, setUserId] = useState(undefined);

  // User data loading
  useEffect(() => {
    const asyncEffect = async () => {
      const result = await usersController.getUserData();
      if(result){
        setUserId(result._id);
      }
    }
    asyncEffect()
  }, []);

  const close = () => {
    renderStore(false);
  }

  const handlePayment = async(item) => {
    if(userId){
      const order = buy(item.price, item.coins, userId);
    }
  }

  return <>
    {render && <Wrapper>
        <Container>
          {items.map((item, index) => {
            return <Item key={index}>
              <Info>{Object.keys(item.coins).map((i, ind) => {
                return <Row key={ind}>
                  <Text>{i[0].toUpperCase() + i.slice(1)}</Text>
                  <Text>{item.coins[i]}</Text>
                </Row>
              })}</Info>
              <Image src={item.img} />
              <BuyBtn onClick={() => handlePayment(item)}>U$D {item.price}</BuyBtn>
            </Item>
          })}
          <CloseBtn onClick={close}>x</CloseBtn>
        </Container>
      </Wrapper>
    })
  </>
}

export default Store