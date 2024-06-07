import React from 'react'
import { Wrapper, Title, Input, Label, Bold, Required, SmallText, Image, TitleIcon, FlexDiv, InputCopy, LightText, ContinueButton, IconWrapper, VioletText } from './styles'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import toast from 'react-hot-toast';
import { createOrder, createWallet } from '../../../../controllers/store/wallet';

const NewOrder = ({ user, setOrderStep, selectedWallet, setOrderId}) => {
  const walletAddr = "0x9E1335a0b0441d226a8F208746297d71d837f1e1"

  const handleCopy = () => {
    toast.success('Copied to clipboard')
    navigator.clipboard.writeText(walletAddr)
  }
  const handleNext = async () => {
    console.log("ESTA ES TU WALLET", selectedWallet.address)
    const orderId = await createOrder(user._id, selectedWallet.address)
    setOrderId(orderId);
    setOrderStep('verifyOrder')
  }

  return (
    <Wrapper>
      <IconWrapper>
        <MdOutlineArrowBackIosNew onClick={() => setOrderStep('orders')} />
      </IconWrapper>
      <Title>New Order</Title>
      <Label><Bold>USDT</Bold> Address <Required>*</Required></Label>
      <InputCopy>
        <Input type={"text"} disabled={true} value={walletAddr} />
        <img onClick={handleCopy} src={"/assets/wallet/clipboard.svg"} width={20} alt={"copy"} />
      </InputCopy>
      <FlexDiv >
        <TitleIcon src="/assets/icons/walletActive.png" />
        <SmallText>The deposit is from: </SmallText>
        <VioletText>&nbsp;{selectedWallet.nickname}</VioletText>
      </FlexDiv>
      <Image src={"/assets/wallet/qr_example.png"} width={300} alt={"qr"} />
      <LightText center={true}>Scan to copy the address</LightText>
      <ContinueButton type='button' onClick={() => handleNext()}>Continue</ContinueButton>
    </Wrapper>
  )
}

export default NewOrder