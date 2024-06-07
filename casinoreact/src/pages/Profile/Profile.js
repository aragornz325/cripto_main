import React, { useState, useEffect } from 'react';
import { BtnSubmit, Title, Email, Container, Wrapper, Coin, CoinImg, CoinLabel, ButtonContainer, Info, Coins, Picture, Col, ColHead, Row, TBody, THead, Table, TransferBtn, Vector } from './styles';
import { usersController } from '../../controllers';
import delete_cookie from '../../functions/deleteCookie';
import Navbar from '../../components/navigation/NavBar';
import stringToNumber from '../../functions/stringToNumber';
import transfer from '../../controllers/store/transfer';
import getOrders from '../../controllers/store/getOrders'
import Store from '../../components/main/Store';

function Profile() {
 
  const [user, setUser] = useState(undefined);
  const [coins, setCoins] = useState('');
  const [orders, setOrders] = useState([]);

  // User data loading
  useEffect(() => {
    const asyncEffect = async () => {
      const result = await usersController.getUserData();
      const {coins, ...user} = result;
      setUser(user);
      let newCoins = [];
      if(coins){
        for(let coin in coins){
          newCoins.push([]);
          newCoins[newCoins.length-1][0] = coin;
          newCoins[newCoins.length-1][1] = coins[coin];
        }
      }
      setCoins(newCoins);
    }
    asyncEffect()
  }, []);

  // Redirect if not logged in
  if(user && user['error']){
    window.location = '/login';
  }

  useEffect(() => {
    const a = async() => {
        const newOrders = await getOrders();
        const result = newOrders.myOrders.filter(myOrder => {
            for(let order in newOrders.orders.orders){
                if(String(myOrder.coingateOrderId) === String(newOrders.orders.orders[order].id)){
                    return true;
                }
            }
            return false;
        })
        console.log(result)
        setOrders(result);
    }
    a();
  }, [])

  const handleTransfer = async(order) => {
    const response = await transfer(user._id, order.coins, order._id); 
    console.log(response.order, response.user)
    window.location = '/';
    return false;
  }

  return (
    <>
    <Store />
    <Navbar />
    <Wrapper>
      {user ? (
        <Container>
          <Info>
            <Picture src="https://devshift.biz/wp-content/uploads/2017/04/profile-icon-png-898.png" />
            <div>
              <Title>{user.firstName} {user.lastName}</Title>
              <Email>{user.email}</Email>
            </div>
          </Info>
          <hr style={{color: '#999', width: '40%'}}/>
          <Coins>
            {coins && coins.length ? coins.map((coin)=>{
              return (
                <Coin>
                  <CoinImg src={`/assets/fichas/f${stringToNumber(coin[0])}.png`} />
                  <CoinLabel>x{Math.floor(coin[1])}</CoinLabel>
                </Coin>
              )
            }) : <h1>NO COINS</h1>}
          </Coins>
          <ButtonContainer>
            <BtnSubmit type="button" onClick={async() => {console.log(await usersController.logout()); delete_cookie('connect.sid'); window.location = '/login'}}>LOGOUT</BtnSubmit>
          </ButtonContainer> 
        </Container>
      ) : <h1 style={{color: 'gold', fontSize: '3vw'}}>LOADING...</h1>}
      <Table>
          <THead>
              <ColHead>Nº order</ColHead>
              <ColHead>Transfered</ColHead>
              <ColHead>Amount</ColHead>
              <ColHead></ColHead>
          </THead>
          <TBody>
              {orders.length ? orders.map((order, index) => {
                  if(order.userId === user._id){
                    console.log('order', order)
                      return (
                          <Row key={index}>
                              <Col onClick={() => window.open(`/transaction?order=${order.coingateOrderId}`)}> <Vector src="./assets/Vector.png" alt="vector" />  #{order.coingateOrderId}</Col>
                              <Col>{order.synced ? 'YES' : 'NO'}</Col>
                              <Col>U$D {order.paidAmount}</Col>
                              <Col>{!order.synced && <TransferBtn onClick={ async() => { handleTransfer(order); } }>Transfer</TransferBtn>}</Col>
                          </Row>
                      )
                  }
              }) : ''}
          </TBody>
      </Table>
    </Wrapper>
    </>
  )
}

export default Profile;