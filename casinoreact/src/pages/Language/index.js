import React from 'react'
import SettingsSelect from '../../components/forms/SettingsSelect';
import Title from '../../components/main/Title';

const Language = () => {
  return (
    <>
      <Title text="Language" />
      <SettingsSelect title="language" options={[{ emoji: '🇺🇸', name: 'English', value: 'en' }, { emoji: '🇪🇸', name: 'Spanish', value: 'es' }, { emoji: '🇯🇵', name: 'Japanese', value: 'jp' }, { emoji: '🇮🇹', name: 'Italian', value: 'it' }, ]} />
    </>
  )
}

export default Language;