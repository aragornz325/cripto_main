import React from 'react'
import Layout from '../../components/Layout';
import Title from '../../components/main/Title';
import { Subtitle, Terms, Text } from './styles';

const TermsOfService = () => {

  const terms = [
    { subtitle: 'CryptoGo.com', text: [`CryptoGo.com is owned and operated by Medium Rare, N.V. (hereinafter "Stake", "We" or "Us"), a company with head office at Fransche Bloemweg 4 Curaçao. Medium Rare is licensed and regulated by the Government of Curaçao under the gaming license 8048/JAZ issued to Antillephone. Some credit card payment processing are handled by its wholly owned subsidiary, Medium Rare Limited.`] },
    { subtitle: 'General', text: [
      `This end user agreement (the "Agreement") should be read by you (the "User" or "you") in its entirety prior to your use of Stake's service or products. Please note that the Agreement constitutes a legally binding agreement between you and Stake.`,
      `These Terms and Conditions come into force as soon as you complete the registration process, which includes checking the box accepting these Terms and Conditions and successfully creating an account. By using any part of the Website following account creation, you agree to these Terms and Conditions applying to the use of the Website.`,
      `You must read these Terms and Conditions carefully in their entirety before creating an account. If you do not agree with any provision of these Terms and Conditions, you must not create an account or continue to use the Website.`,
      `We are entitled to make amendments to these Terms and Conditions at any time and without advanced notice. If we make such amendments, we may take appropriate steps to bring such changes to your attention (such as by email or placing a notice on a prominent position on the Website, together with the amended terms and conditions) but it shall be your sole responsibility to check for any amendments, updates and/or modifications. Your continued use of stake.com services and Website after any such amendment to the Terms and Conditions will be deemed as your acceptance and agreement to be bound by such amendments, updates and/or modifications.`,
      `By clicking the "I Agree" button if and where provided and/or using the Service, you consent to the terms and conditions set forth in this Agreement.`,
      `These Terms and Conditions may be published in several languages for informational purposes and ease of access by players. The English version is the only legal basis of the relationship between you and us and in the case of any discrepancy with respect to a translation of any kind, the English version of these Terms and Conditions shall prevail.`,
    ]},
  ]

  return (
    <>
      <Title text="Terms of service" />
      <Terms>
        {terms.map(term => {
          return <>
            <Subtitle>{term.subtitle}</Subtitle>
            {term.text.map((text, index) => <Text key={index}>{text}</Text>)}
          </>
        })}
      </Terms>
    </>
  )
}

export default TermsOfService;