import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 100px);
`

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #FFF;
  text-align: center;
  margin-bottom: 30px;
`

export const Form = styled.form`
  width: min(600px, 95%);
  height: 600px;
  background: #222;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Input = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: calc(100% - 40px);
  margin: 16px 0;
`

export const Label = styled.label`
  font-size: 18px;
  color: #FFF;
  font-weight: 500;
  margin-bottom: 3px;
`

export const TextInput = styled.input`
  width: calc(100% - 24px);
  border-radius: 8px;
  font-size: 14px;
  background: #FFF;
  color: #000;
  border: none;
  outline: none;
  padding: 5px 12px;

  &:focus {
    outline: gold solid 3px;
  }
`

export const LongTextInput = styled.textarea`
  width: calc(100% - 24px);
  font-size: 14px;
  background: #FFF;
  color: #000;
  border: none;
  border-radius: 8px;
  height: 100px;
  padding: 5px 12px;

  &:focus {
    outline: gold solid 3px;
  }
`

export const BtnSubmit = styled.button`
  background: gold;
  padding: 2px 24px;
  font-size: 16px;
  font-weight: 700;
  color: #000;
  border-radius: 6px;
  border: none;
  margin-top: 30px;
`