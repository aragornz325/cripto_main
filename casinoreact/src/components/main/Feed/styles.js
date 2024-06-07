import styled from 'styled-components';
import * as palette from '../../../utils/colors/palettes/default';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 35px;
`

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: min(80%, 850px);
  gap: 3%;
`

export const Title = styled.h2`
  color: ${palette.activeText};
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  width: 325px;
`

export const Search = styled.div`
  width: min(55%, 600px);
  height: 52px;
  border-radius: 30px;
  padding: 0 12px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: ${palette.search};
`

export const SearchIcon = styled.img`
  width: 24px;
  height: 24px;
`

export const Input = styled.input`
  width: 70%;
  height: 70%;
  background: none;
  border: none;
  color: ${palette.inputText};
  font-size: 16px;
  outline: none;
  transition: ${palette.tFocus};

  &:focus {
    font-size: 17px;
  }
`

export const FilterIcon = styled.img`
  width: 26px;
  height: 26px;
`

export const Games = styled.div`
  width: min(80%, 850px);
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: space-between;
  flex-wrap: wrap;
`

export const Selector = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  width: min(80%, 850px);
`

export const Option = styled.button`
  color: ${palette.text};
  font-size: 17px;
  font-weight: ${props => props.selected ? 700 : 500};;
  padding: 10px 0;
  background: ${props => props.selected ? palette.submitPurple : palette.softBackground};
  border: none;
  border-radius: 24px;
  transition: ${palette.tHover};
  width: ${props => 100 / props.items}%;
  cursor: pointer;

  &:hover{
    box-shadow: 0 0 4px ${palette.sDarkPink};
  }
`