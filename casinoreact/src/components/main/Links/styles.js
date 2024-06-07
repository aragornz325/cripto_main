import styled from "styled-components";
import * as palette from '../../../utils/colors/palettes/default';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
  width: 100%;
  padding: 20px;
`

export const Icon = styled.img`
  width: 40px;
  height: 40px;
`

export const Text = styled.h1`
  font-size: 24px;
  font-weight: 500;
  color: ${palette.text};
`

export const Link = styled.a`
  width: min(700px, 60%);
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 32px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  text-decoration: none;

  &:hover {
    filter: ${palette.activeTextFilter};
  }
` 

export const Info = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
`

export const Arrow = styled.img`
  width: 15px;
  height: 20px;
`