import styled from "styled-components";
import * as palette from '../../../utils/colors/palettes/default';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  width: 100%;
  gap: 16px;
  padding: 0px 120px;
`

export const Icon = styled.img`
  width: 40px;
  height: 40px;
`

export const Text = styled.h1`
  font-size: 40px;
  font-weight: 800;
  color: ${palette.text};
`

export const Form = styled.form`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const Inputs = styled.div`
  background: ${palette.sDarkBackground};
  padding: 1vw 3vw;
  border-radius: .6vw;
  display: flex;
  flex-direction: column;
  gap: .4vw;
  position: relative;
`

export const Label = styled.p`
  font-size: 1vw;
  color: white;
  font-weight: 600;
  margin: 0;
  margin-top: 2%;
`

export const Input = styled.input`
  border: .15vw white solid;
  border-radius: .6vw;
  width: max(30vw, 600px);
  padding: .6vw .2vw;
  background: ${palette.sBackground};
`

export const Submit = styled.button`
  border: none;
  border-radius: 1vw;
  font-size: 1vw;
  font-weight: 700;
  padding: .4vw 0;
  margin-top: 1.2vw;
  background: ${palette.submitPink};
`

export const Close = styled.img`
  position: absolute;
  top: 1vw;
  right: 1vw;
  width: 1.2vw;
`