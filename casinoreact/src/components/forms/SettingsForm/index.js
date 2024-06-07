import React, { useState, useEffect } from 'react';
import { CancelBtn, SubmitBtn, Buttons, Form, Input, Label, Link, Required } from './styles'

const SettingsForm = ({ linkData, user }) => {

  return (
    <Form>
      {linkData.map((link, i) => {
        return <Link key={i}>
          <Label>{link.label} {link.required && <Required>*</Required>}</Label>
          <Input name={link.input.name} placeholder={link.input.placeholder && `Insert your ${link.input.placeholder} here...`} defaultValue={user && user[link.input.value]}/>
        </Link>
      })}
      <Buttons>
        <CancelBtn href="/settings">Cancel</CancelBtn>
        <SubmitBtn>Save</SubmitBtn>
      </Buttons>
    </Form>
  )
}

export default SettingsForm