import React from 'react';
import { Wrapper, Title, Subtitle, Info, Button, LineContainer, LineOn, LineOff, Status, StatusContainer } from './styles';
import { useLocation } from 'react-router';
import track from '../../controllers/store/track';
import Layout from '../../components/Layout';

const Transaction = () => {

  const [status, setStatus] = React.useState('connecting');
  const [coingateUrl, setCoingateUrl] = React.useState(undefined)

  const {pathname} = useLocation()

  if (pathname === '/transaction') {
    const body = document.querySelector('body')
    body.style.overflowY = 'hidden'
  }

  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  let query = useQuery();

  const description = {
    connecting: 'Connecting to coingate server...',
    new: 'Order succesfully created, payment managed through coingate.',
    pending: 'Payment started, please finish the transaction.',
    paid: 'Thank you for your purchase. Manage it from orders section.'
  }

  const order = query.get('order');

  React.useEffect(()=>{
    const interval = setInterval(()=>{
        async function trigger(){
          const response = await track(order);
          console.log(response)
          setStatus(response.status);
          if(!coingateUrl){
            setCoingateUrl(response.payment_url);
          }
        }
        trigger()
    }, 10000)
  }, [])
  
  return (
    <>
      <Wrapper>
        <Title>Order #{order}</Title>
        <StatusContainer>
          <Subtitle>Status:</Subtitle>
          <Status status={status}>{status.toUpperCase()}</Status>
        </StatusContainer>
        <Info>{description[status]}</Info>
        <LineContainer>
          {(status === 'new' || status === 'pending' || status === 'paid') ? <LineOn /> : <LineOff />}
          {(status === 'pending' || status === 'paid') ? <LineOn /> : <LineOff />}
          {(status === 'paid') ? <LineOn /> : <LineOff />}
        </LineContainer>
        {status !== 'paid' ? <Button onClick={() => { window.open(coingateUrl, '_blank').focus(); }}>Open Coingate</Button> : <Button onClick={() => { window.location = '/wallet' }}>Wallet</Button>}
      </Wrapper>
      
    </>
  )
}

export default Transaction;