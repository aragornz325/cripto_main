import React, { useEffect, useState } from 'react'
import { 
  // ExternalBtn, 
  // ExternalBtnImg, 
  // ExternalButtons, 
  // ExternalOptions, 
  // ExternalTitle, 
  // Recovery,
  CloseBtn, Form, Info, Input, InputsContainer, Label, Required, Submit, Switch, SwitchBar, SwitchOption, SwitchTitle, Wrapper } from './styles';
import { useForm } from 'react-hook-form';
import { usersController } from '../../../controllers';
import { useSession } from '../../../SessionContext';

const LoginForm = ({ setForm, startMode }) => {

  const [animation, setAnimation] = useState();
  const [mode, setMode] = useState(startMode);
  const [ errors, setErrors ] =  useState({})
  const { register, handleSubmit } = useForm();
  const { login } = useSession()

  const closeForm = () => {
    setAnimation('fadeOut');
    setTimeout(() => {
      setForm('');
    }, 500);
  }

  useEffect(()=>{
      window.scroll(0,0)
      setAnimation('fadeIn');
  }, [])

  const inputs = mode === 'login' ? [
    { label: 'Username', required: true, name: 'username', placeholder: 'username' },
    { label: 'Password', required: true, name: 'password', placeholder: 'password', type: 'password' },
  ] : mode === 'register' ? [
    { label: 'Username', required: true, name: 'username', placeholder: 'username' },
    // { label: 'First name', required: true, name: 'firstName', placeholder: 'first name' },
    // { label: 'Last name', required: true, name: 'lastName', placeholder: 'last name' },
    { label: 'Password', required: true, name: 'password', placeholder: 'password', type: 'password' },
    { label: 'Email', required: true, name: 'email', placeholder: 'email', type: 'email' },
    // { label: 'Phone', required: true, name: 'phone', placeholder: 'phone' },
    // { label: 'Date of Birth', required: true, name: 'birthday', placeholder: 'birthday', type: 'date' },
    // { label: 'Code', required: false, name: 'code', placeholder: 'code' },
  ] : [];

  const onSubmit = async(data,e) => {
    console.log(e)
    e.preventDefault()
    let response = { error: 'Form mode is not valid.' };
    if (mode === 'login') {
      const response = await login(data)
      if (response.error) {
        console.log({inForm: response})
        setErrors(response)
      }
      else {
        login(data)
        closeForm();
      }
    }
    else if(mode === 'register'){
      response = await usersController.createUser(data);
      if (response.error) {
        console.log(response)
        setErrors(response)
      }
      else {
        login(data)
        closeForm();
      }
    }
  }

  return (
    <Wrapper animation={animation}>
      <Form onSubmit={handleSubmit(onSubmit)} onChange={() => setErrors({})}>
        <CloseBtn src="/assets/icons/close.png" onClick={() => closeForm()} />
        <Switch>
          <SwitchOption onClick={() => setMode('register')}>
            <SwitchTitle selected={mode === 'register'}>Register</SwitchTitle>
            <SwitchBar side="left" selected={mode === 'register'} />
          </SwitchOption>
          <SwitchOption onClick={() => setMode('login')}>
            <SwitchTitle selected={mode === 'login'}>Login</SwitchTitle>
            <SwitchBar side="right" selected={mode === 'login'} />
          </SwitchOption>
        </Switch>
        {
          errors.message && <p style={{ color: 'rgb(255,0,0)', margin: '0' }}>{errors.message}</p>
        }
        <InputsContainer>
          {inputs.map(input => {
            return <>
              <Label>{input.label} {input.required && <Required>*</Required>}</Label>
              <Input name={input.name} placeholder={`Insert your ${input.placeholder} here...`} type={input.type} {...register(input.name)} />
            </>
          })}
        </InputsContainer>
        {mode === 'register' && <Info>By clicking Register, you are indicating that you have read and acknowledge the Terms & Conditions</Info>}
        {mode === 'login' && <Submit type="submit">Sign In</Submit>}
        {mode === 'register' && <Submit type="submit">Register</Submit>}

          <Info centered={true}>This site is protected by hCaptcha and the Captcha Privacy Policy and Terms of Service apply.</Info>
      </Form>
    </Wrapper>
  )
}

export default LoginForm;