import React from 'react';
import { Wrapper, SubText, Text, Icon, Icons, WrapperImg } from './styles';

const MobileAlert = () => {
  return (
    <Wrapper>
      {/* <WrapperImg src="/assets/icons/pc.png" /> */}
      <Text>Only web version available now</Text>
      {/* <SubText>Mobile version coming soon</SubText> */}
      <Icons>
        <Icon src="/assets/icons/chrome.png" />
        <Icon src="/assets/icons/safari.jpg" />
      </Icons>
    </Wrapper>
  )
}

export default MobileAlert;