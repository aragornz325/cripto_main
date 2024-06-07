import styled from "styled-components";
import * as palette from '../../utils/colors/palettes/default';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
`

export const TitleIcon = styled.img`
  width: 36px;
  height: 36px;
`

export const Title = styled.h1`
  font-size: 36px;
  font-weight: 600;
  color: ${palette.activeText};
  margin: 0;
`

export const Games = styled.div`
  width: min(80%, 850px);
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: space-between;
  flex-wrap: wrap;
`

export const Suggestions = styled.div`
  width: calc(100% - 10vw);
  padding: 3vh 5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8vh;
  background: ${palette.blueGradient};
`

export const SuggestionsTitle = styled.p`
  font-size: 24px;
  color: ${palette.activeText};
  font-weight: 600;
  width: 100%;
`