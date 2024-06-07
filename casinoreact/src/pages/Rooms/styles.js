import styled from 'styled-components';
import * as palette from '../../utils/colors/palettes/default';

export const Wrapper = styled.div`
  width: 65vw;
  height: calc(65vw * 9 / 16);
  background-color: ${palette.background};
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  overflow-y: scroll;
`

export const Room = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  border: solid 2px ${palette.text};
  height: 60px;
  width: 90%;
  padding: 0px 8px;
  transition: ${palette.tHover};

  &:hover {
    border: solid 2px ${palette.activeText};
  }
`

export const Text = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: ${palette.text};
  width: 18%;
  text-align: center;
`