import React from 'react'
import Layout from '../../components/Layout';
import Links from '../../components/main/Links';
import Title from '../../components/main/Title';

const Settings = () => {
  return (
    <>
      <Title text="Settings" />
      <Links linkData={
        [
          { text: 'Edit Profile', img: 'profile' },
          // { text: 'Language', img: 'language' },
          { text: 'Password & Security', img: 'security' },
          { text: 'Terms of service', img: 'terms' }
          ]
        } />
    </>
  )
}

export default Settings;