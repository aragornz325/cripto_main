import React, { useState } from 'react'
import { Wrapper, Title, Input, Label, Bold, Required, SmallText, Image, TitleIcon, FlexDiv, InputCopy, LightText, ContinueButton, IconWrapper } from './styles'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import toast from 'react-hot-toast';
import { createWallet } from '../../../controllers/store/wallet';
import ModalComponent from '../../modal/Modal';

const CreateWallet = ({ user, setSelected }) => {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const walletNickname = e.target.elements.nickname.value;
    const walletAddress = e.target.elements.walletAddress.value;
    const response = await createWallet(user._id, walletAddress, walletNickname);
    if (response.address) {
      toast.success('Wallet created')
      setSelected("Deposits")
    } else if (response.statusCode === 400) {
      setShowModal(true)
    }
  }
    return (
      <Wrapper>
        <IconWrapper>
          <MdOutlineArrowBackIosNew onClick={() => setSelected('Deposits')} />
        </IconWrapper>
        <Title>New Wallet</Title>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Label>Wallet nickname <Required>*</Required></Label>
          <Input type={"text"} name="nickname" placeholder={"Insert your wallet nickname..."} />

          <Label>Address <Required>*</Required></Label>
          <Input type={"text"} name="walletAddress" placeholder={"Paste your wallet adress..."} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: "end", marginTop: 24 }}>
            <Label style={{ width: "fit-content", marginRight: "20px" }}>Network <Required>*</Required></Label>
            <Input type={"text"} width={100} disabled={true} value={"BSC"} />
          </div>
          <ContinueButton type='submit'>Save</ContinueButton>
        </form>
        <ModalComponent
          icon={"/assets/wallet/infoCircle.svg"}
          title={"Address Invalid"}
          text={"This wallet address seems invalid"}
          buttonText={"Try again"}
          setShowModal={setShowModal}
          showModal={showModal} />
      </Wrapper>
    )
}

export default CreateWallet