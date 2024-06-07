import React, { useState } from 'react'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { Wrapper, Title, Label, IconWrapper } from '../newOrder/styles'
import { Input, ContinueButton, ModalContainer } from './styles'
import { verifyOrder } from '../../../../controllers/store/wallet'
import Modal from 'react-modal';
import getUserData from '../../../../controllers/users/getUserData'
Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.75)';
const VerifyOrder = ({ setOrderStep, orderId }) => {
  const [showModal, setShowModal] = useState({
    status: "",
    show: false
  });
  const [response, setResponse] = useState("")
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = e.target.elements.verificationCode.value;
    const response = await verifyOrder(verificationCode, orderId._id);
    setResponse(response);
    if (response.status === "Completed") {
      setShowModal({ status: "success", show: true });
      getUserData();
    } else if (response.statusCode === "Conflict") {
      setShowModal({ status: "used", show: true });
    } else if (response.statusCode === 409) {
      setShowModal({ status: "error", show: true });
    }
  }

  return (
    <Wrapper>
      <Modal
        isOpen={showModal.show}
        onRequestClose={() => setShowModal({ show: false, status: "" })}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {
          showModal.status === "success" ? (
            <ModalContainer>
              <span onClick={() => setShowModal(false)}>✕</span>
              <img src='assets/wallet/success.svg' width={150} alt='success' />
              <h2>Yo have succesfully deposited {(response.balance)/2000} USDT</h2>
              <p>You can see the status of your transaction on the transfer tab.</p>
              <button type='button' onClick={() => setShowModal(false)}>Confirm</button>
            </ModalContainer>
          ) : showModal.status === "error" ? (
            <ModalContainer>
              <span onClick={() => setShowModal(false)}>✕</span>
              <img src='assets/wallet/wallet.svg' width={150} alt='wallet' />
              <h2>This wallet doesn't match your id!</h2>
              <p>Please check your id is the correct one.</p>
              <button type='button' onClick={() => setShowModal(false)}>Try Again</button>
            </ModalContainer>
          ) : (
            // Used as default
            <ModalContainer>
              <span onClick={() => setShowModal(false)}>✕</span>
              <img src='assets/wallet/infoCircle.svg' width={150} alt='used' />
              <h2>This transaction id has already been used!</h2>
              <p>Please try again! in the verification tab.</p>
              <button type='button' onClick={() => setShowModal(false)}>Try Again</button>
            </ModalContainer>
          )
        }
      </Modal>
      <IconWrapper>
        <MdOutlineArrowBackIosNew onClick={() => setOrderStep('newOrder')} />
      </IconWrapper>
      <Title>Validate Transaction</Title>
      <Label>Transaction ID</Label>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Input name="verificationCode" type={"text"} placeholder="Insert your verification code..." />
        <ContinueButton type='submit'>Verify</ContinueButton>
      </form>
    </Wrapper>
  )
}


export default VerifyOrder