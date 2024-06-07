import React from 'react'
import styled from 'styled-components'
import Modal from 'react-modal'

const ModalComponent = ({ showModal, setShowModal, icon, title, text, buttonText  }) => {
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
    <Modal
      isOpen={showModal}
      onRequestClose={() => setShowModal(false)}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <ModalContainer>
        <span onClick={() => setShowModal(false)}>✕</span>
        <img src={icon} width={150} alt='success' />
        <h2>{title}</h2>
        <p>{text}</p>
        <button type='button' onClick={() => setShowModal(false)}>{buttonText}</button>
      </ModalContainer>
    </Modal>
  )
}

export default ModalComponent

export const ModalContainer = styled.div`
  position: relative;
  margin: 0 auto;
  text-align: center;
  h2{
    margin-bottom: 0;
  }
  p{
    margin: 10px 0;
    font-size: 14px;
  }
  button{
    padding: .7rem 2rem;
    width: 250px;
    font-size: 14px;
    border: none;
    background: linear-gradient(99.99deg, #B936F5 -21.45%, #C64C85 100%, #F1005B 100%);
    border-radius: 100px;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }
  span{
    user-select: none;
    font-size: 20px;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
  }
`