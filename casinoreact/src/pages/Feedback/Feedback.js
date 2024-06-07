import React from 'react';
import { 
  // Form, TextInput, LongTextInput, Input, Label, Title, BtnSubmit
  Wrapper
} from './styles';
import NavBar from '../../components/navigation/NavBar';
import { useForm } from 'react-hook-form';
import { feedbackController } from '../../controllers';
import setAlert from '../../store/actionCreators/setAlert';
import AlertBar from '../../components/main/AlertBar';

const Feedback = () => {

  const { register, handleSubmit, formState: { errors }} = useForm();
  
  const onSubmit = async(data) => {
    const response = await feedbackController.sendFeedback(data);
    console.log(response);
    if(response && response['error']){
      setAlert({
        display: true,
        color: 'red',
        text: response['error']
      });
    } else {
      window.location = '/';
    }
  }

  return (
    <>
      <NavBar />
      <AlertBar />
      <Wrapper>
        {/* <Form onSubmit={handleSubmit(onSubmit)}>
          <Title>FEEDBACK</Title>
          <Input>
            <Label>Name</Label>
            <TextInput type="text" {...register("name")} required={true} />
          </Input>
          <Input>
            <Label>Email</Label>
            <TextInput type="text" {...register("email")} required={true} />
          </Input>
          <Input>
            <Label>Message</Label>
            <LongTextInput {...register("message")} required={true} />
          </Input>
          <BtnSubmit type="submit">SUBMIT</BtnSubmit>
        </Form> */}
        <iframe class="airtable-embed" src="https://airtable.com/embed/shrzYdplpkkR6gB6c?backgroundColor=yellow" frameborder="0" onmousewheel="" width="100%" height="100%" style={{background: 'transparent', border: '1px solid #ccc'}}></iframe>
      </Wrapper>
    </>
  )
}

export default Feedback