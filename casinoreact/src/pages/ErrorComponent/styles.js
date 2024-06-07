import styled from 'styled-components';
import * as palette from '../../utils/colors/palettes/default';

export const Title = styled.h1`
  color: ${palette.text};
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  margin: 24px 0 0 0;
`

export const Info = styled.p`
  color: ${palette.inputText};
  font-size: 14px;
  text-align: center;
`

export const Link = styled.a`
  color: ${palette.submitPink};
  font-size: 24px;
  font-weight: 600;
  text-align: center;
` 