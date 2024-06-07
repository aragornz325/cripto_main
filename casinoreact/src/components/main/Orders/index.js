import React, { useState, useEffect } from 'react';
import { Wrapper, Table, THead, ColHead, Row, Col, TransferBtn, TBody, Vector, HeadImg, NewOrder as OrderBtn } from './styles';
import transfer from '../../../controllers/store/transfer';
import getOrders from '../../../controllers/store/getOrders';
import NewOrder from './newOrder';
import VerifyOrder from './verifyOrder';
import ModalComponent from '../../modal/Modal';

const Order = ({ user, selectedWallet, loading }) => {
  const [orders, setOrders] = useState([]);
  const [orderStep, setOrderStep] = useState('orders');
  const [orderId, setOrderId] = useState(null);
  useEffect(() => {
    const a = async () => {
      const newOrders = await getOrders();
      const result = newOrders.myOrders.filter(myOrder => {
        for (let order in newOrders.orders.orders) {
          if (String(myOrder.coingateOrderId) === String(newOrders.orders.orders[order].id)) {
            return true;
          }
        }
        return false;
      })
      setOrders(result);
    }
    a();
  }, [])

  return (
    <>
      {
        // inline switch
        {
          'orders': <Orders selectedWallet={selectedWallet} orders={selectedWallet?.transactions} user={user} setOrderStep={setOrderStep} loading={loading} setOrderId={setOrderId} />,
          'newOrder': <NewOrder user={user} setOrderStep={setOrderStep} selectedWallet={selectedWallet} setOrderId={setOrderId} />,
          'verifyOrder': <VerifyOrder setOrderStep={setOrderStep} orderId={orderId} />,
        }[orderStep]
      }
    </>
  )

}
export default Order;


const Orders = ({ orders, user, setOrderStep, loading, selectedWallet, setOrderId }) => {
  const [showModal, setShowModal] = useState(false);
  const handleCreateOrder = () => {

    if (selectedWallet !== null) {
      setOrderStep('newOrder');
    } else {
      setShowModal(true);
    }
  }

  return (
    <>
      <Wrapper>
        <Table>
          <THead>
              <ColHead>Order Number <HeadImg src="/assets/icons/tables/order.svg" /></ColHead>
              <ColHead>Amount <HeadImg src="/assets/icons/tables/coin.png" /></ColHead>
              <ColHead>Date <HeadImg src="/assets/icons/tables/calendar.png" /></ColHead>
              <ColHead>Status <HeadImg src="/assets/icons/tables/status.png" /></ColHead>
              <ColHead>CV Coins <HeadImg src="/assets/icons/tables/cvcoin.png" /></ColHead>
          </THead>
          <TBody>
            {orders?.length ? orders.map((order, index) => {
              //if (order.userId === user._id) {
              return (
                <Row key={index}>
                  <Col onClick={() => {setOrderStep("verifyOrder"); setOrderId(order._id)}}>
                    <Vector src="./assets/Vector.png" alt="vector" />
                    #{order._id.slice(order._id.length - 4)}
                  </Col>
                  <Col>U$D {order.amount}</Col>
                  <Col>09/28/2022</Col>
                  {/* <Col>{!order.synced && <TransferBtn onClick={async () => { handleTransfer(order); }}>Transfer</TransferBtn>}</Col> */}
                  <Col colored={true} status={order.synced}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</Col>
                  <Col>{order.balance}</Col>
                </Row>
              )
              // }
            }) : ''}
            <Row>
              <Col><OrderBtn disabled={loading || selectedWallet === null } onClick={() => handleCreateOrder()}>New order</OrderBtn></Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
            </Row>
          </TBody>
        </Table>
      </Wrapper>
      <ModalComponent
        icon={"/assets/wallet/infoCircle.svg"}
        title={"Select a wallet"}
        text={"You need to select a wallet to create and order"}
        buttonText={"Ok"}
        setShowModal={setShowModal}
        showModal={showModal} />
    </>
  )
}