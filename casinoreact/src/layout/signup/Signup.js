import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Coins, Coin, CoinImg, CoinLabel, CoinAmount, CoinBtn, Form, Section, BtnSubmit, FormCtn, ImageCtn, Link, Div, Input, Grid } from './styles';
import Navbar from '../../components/navigation/NavBar';
import { usersController } from '../../controllers';
import AlertBar from '../../components/main/AlertBar';
import setAlert from '../../store/actionCreators/setAlert';

const Login = () => {

  const [style, setStyle] = useState({});
  const { register, handleSubmit, formState: { errors }} = useForm();

  const [coins, setCoins] = useState([
    [1, 'one', 0], 
    [5, 'five', 0], 
    [10, 'ten', 0], 
    [25, 'twentyfive', 0], 
    [50, 'fifty', 0], 
    [100, 'hundred', 0], 
    [200, 'twohundred', 0], 
    [1000, 'thousand', 0], 
  ]);

  const onSubmit = async(data) => {
    let coinsObject = { 
      one: 0,
      five: 0,
      ten: 0,
      twentyfive: 0,
      fifty: 0,
      hundred: 0,
      twohundred: 0,
      fivehundred: 0,
      thousand: 0
    }
    coins.forEach(coin => {
      coinsObject[coin[1]] = coin[2];
    })
    data.coins = coinsObject;
    const response = await { usersController }.createUser(data);
    console.log('response',response)
    if(response['error']){
      setStyle({ background: 'red' });
      return setAlert({
        display: true,
        text: response.error,
        color: "red",
      });
    }else if(response['statusCode']){
      setStyle({ background: 'red' });
      return setAlert({
        display: true,
        text: response.message,
        color: "red",
      });
    }else{
      window.location = '/login';
    }
  }

  const remainingCoins = (coinArray) => {
    let sum = 0;
    let c;
    if(!coinArray){
      c = coins;
    }else{
      c = coinArray;
    }
    c.map(coin => {
      return sum += coin[2]*coin[0];
    });
    return 1000 - sum;
  }

  const addCoin = async(coin, amount) => {
    let newCoins = coins;
    console.log(newCoins)
    const response = newCoins.map(newCoin => {
      if(newCoin[0] === coin[0] && newCoin[2] + amount >= 0){
        return [newCoin[0], newCoin[1], newCoin[2] + amount];
      }
      return newCoin;
    });
    if(remainingCoins(response) < 0){
      return;
    }else{
      setCoins(response);
    }
    console.log(coins, remainingCoins(response));
  }
  
  return (
    <>
      <Navbar />
      <Form onSubmit={handleSubmit(onSubmit)}>
      <ImageCtn>
        <img style={{width:'100%', height: '600px'}} src={'assets/home/dice.png'} alt=''/>
      </ImageCtn>
        <Section >
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: '10px'}}>
            <img src='assets/home/navbar/logo.png' alt='' />
            <p style={{color: '#EDBE18', marginLeft: '10px', fontSize: '25px'}}><b style={{color: '#EDBE18'}}>SIGN</b> UP</p>
          </div>
          <Grid>
            <TextField type="text" placeholder="Username" {...register("username")} required={true}/>
            <TextField type="password" placeholder="Password" {...register("password")} required={true}/>
          </Grid>
          <Grid>
            <TextField type="firstName" placeholder="First name" {...register("firstName")} required={true}/>
            <TextField type="lastName" placeholder="Last name" {...register("lastName")} required={true}/>
          </Grid>
          <Grid>
            <TextField type="email" placeholder="Email" {...register("email")} required={true}/>
            <TextField type="phone" placeholder="Phone Number" {...register("phone")} required={true}/>
          </Grid>
          {remainingCoins() === 0 ? 
            <BtnSubmit type="submit" style={style}>SUBMIT</BtnSubmit> :
            <BtnSubmit type="button" style={{ background: '#555' }} onClick={() => setAlert({ display: true, text: 'Add coins to register', color: 'red'})}>SUBMIT</BtnSubmit>
          }
          <p style={{color: 'white', marginTop: '40px', textAlign: 'center'}}>Already registered?  <Link href='/login'>Log In</Link></p>
        </Section>
      </Form>
      <Coins>
        <CoinAmount>${remainingCoins()}</CoinAmount>
        {coins.map((coin, index) => {
          return <Coin key={index}>
            <CoinImg src={`assets/fichas/f${coin[0]}.png`} />
            <CoinLabel>x{coin[2]}</CoinLabel>
            <CoinBtn onClick={() => {addCoin(coin, -1)}} pos="left">-</CoinBtn>
            <CoinBtn onClick={() => {addCoin(coin, 1)}} pos="right">+</CoinBtn>
          </Coin>
        })}
      </Coins>
      <AlertBar />
    </>
  )
}

// export default Login;