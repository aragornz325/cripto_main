import React from 'react'
import Layout from '../../components/Layout';
import Title from '../../components/main/Title';
import SettingsForm from '../../components/forms/SettingsForm';

const PasswordAndSecurity = () => {
  return (
    <>
      <Title text="Password & Security" />
      <SettingsForm linkData={[
        { label: 'Current Password', required: true, input: { name: 'name' } },
        { label: 'New Password', required: true, input: { name: 'name' } },
        { label: 'Re-type Password', required: true, input: { name: 'name' } },
        { label: 'Wanna set a password hint?', input: { name: 'name' } },
      ]}/>
    </>
  )
}

export default PasswordAndSecurity;