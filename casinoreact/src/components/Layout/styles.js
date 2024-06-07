import styled from "styled-components";
import * as palette from '../../utils/colors/palettes/default';

export const Wrapper = styled.div`
  background: ${palette.background};
  min-height: 100vh;
  overflow-x: hidden;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`

export const Content = styled.div`
  transition: ${palette.tOpen};
  width: ${props => props.open ? 'calc(100% - 200px)' : 'calc(100% - 50px)'};
  min-height: calc(100vh - 82px);
  background: ${palette.background};
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-bottom: 82px;
`