import React, { useState } from 'react'
import { Bold, Form, Input, Label, Required, Submit, Wrapper, ModalContainer } from './styles'
import { withdrawMoney } from '../../../controllers/store/wallet'
import Modal from 'react-modal'
import { useSession } from '../../../SessionContext'
const Withdraw = ({ user, selectedWallet }) => {
  const { getUser } = useSession()
  const [amount, setAmount] = useState("");
  const [showModal, setShowModal] = useState({
    status: "",
    show: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault()
    const amount = e.target.elements.amount.value;
    const walletAddress = selectedWallet.address;
    const response = await withdrawMoney(user._id, walletAddress, amount);
    console.log(response)
    if (response) {
      getUser()
      setShowModal({ status: "success", show: true });
    } else if (response.statusCode === 404) {
      setShowModal({ status: "notFound", show: true });
    } else {
      setShowModal({ status: "error", show: true });
    }
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      background: "linear-gradient(180deg, #12165E 0%, rgba(2, 0, 102, 0.79) 45.83%, rgba(6, 90, 108, 0.51) 100%)",
      border: "1px solid rgba(143, 255, 241, 0.56)",
      boxShadow: "0px 4px 4px 40px rgba(0, 0, 0, 0.05)",
      borderRadius: "20px",
      bottom: 'auto',
      marginRight: '-50%',
      width: "40%",
      transform: 'translate(-50%, -50%)',
    },
  }

  return (
    <Wrapper>
      <Modal isOpen={showModal.show}
        onRequestClose={() => setShowModal({ show: false, status: "" })}
        style={customStyles}>
        {showModal.status === "success" ? (
          <ModalContainer>
            <span onClick={() => setShowModal(false)}>✕</span>
            <img src='assets/wallet/success.svg' width={150} alt='used' />
            <h2>Succsesfull withdraw!</h2>
            <p>You can see the status of your withdraw on the withdraw tab.</p>
            <button type='button' onClick={() => setShowModal(false)}>Continue</button>
          </ModalContainer>
        ) : showModal.status === "notFound" ? (
          <ModalContainer>
            <span onClick={() => setShowModal(false)}>✕</span>
            <img src='assets/wallet/infoCircle.svg' width={150} alt='used' />
            <h2>This wallet seems not associated to user</h2>
            <p>Please try again! Check your address.</p>
            <button type='button' onClick={() => setShowModal(false)}>Try Again</button>
          </ModalContainer>
        ) : (
          <ModalContainer>
            <span onClick={() => setShowModal(false)}>✕</span>
            <img src='assets/wallet/infoCircle.svg' width={150} alt='used' />
            <h2>There was a problem with your withdraw</h2>
            <p>Please try again! Check your address.</p>
            <button type='button' onClick={() => setShowModal(false)}>Try Again</button>
          </ModalContainer>
        )
        }
      </Modal >
      <Form onSubmit={(e) => handleSubmit(e)}>
        {/* <LabelSmall>Currency <Required>*</Required></LabelSmall>
        <InputSmall type="text" placeholder='0.00000' /> */}
        {/* <Label><Bold>USDT</Bold> Address <Required>*</Required></Label>
        <Input type="text" name="walletAddress" placeholder='Insert your wallet address here' /> */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", width: "100%" }}>
          <Label>Amount <Required>*</Required></Label>
          <p style={{ whiteSpace: 'nowrap' }}>{parseFloat(amount) > 0 ? (parseFloat(amount) * 20000) : 0} Coins</p>
        </div>
        <Input name="amount" type="number" placeholder='Insert your amount here' value={amount} max={(user.balance / 20000)} onChange={(e) => setAmount(e.target.value)} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: "end", alignSelf: 'end', marginTop: "24px" }}>
          <Label style={{ width: "fit-content", marginRight: "20px" }}>Network</Label>
          <Input type={"text"} width={100} disabled={true} value={"BSC"} />
        </div>
        <Submit type="submit">Withdraw</Submit>
      </Form>
    </Wrapper >
  )
}

export default Withdraw