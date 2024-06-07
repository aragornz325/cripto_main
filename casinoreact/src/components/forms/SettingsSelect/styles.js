import styled from "styled-components";
import * as palette from '../../../utils/colors/palettes/default';

export const Wrapper = styled.div`
    width: min(600px, 90%);
    align-self: center;
    display: flex;
    flex-direction: column;
    gap: 16px;
`

export const Label = styled.div`
    color: ${palette.text};
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 15px;
`

export const Select = styled.div`
    width: calc(100% - 48px);
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    border-radius: 12px;
    background: ${palette.sDarkBackground};
    cursor: pointer;
`

export const SelectLabel = styled.p`
    font-size: 20px;
    color: ${palette.sPlaceholder};
`

export const SelectIcon = styled.img`
    width: 30px;
    height: 30px;
`

export const Options = styled.div`
    width: 100%;
    max-height: ${props => props.open ? '300px' : 0};
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    overflow: hidden;
    transition: ${palette.tFocus};
`
    
export const Option = styled.div`
    padding: 0 24px;
    width: calc(100% - 48px);
    height: ${props => props.active ? '70px' : '70px'};
    flex-grow: 0;
    flex-shrink: 0;
    background: ${props => props.active ? palette.sBackground : palette.sDarkBackground};
    border-bottom: 2px solid ${palette.background};
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: inherit;
    cursor: pointer;
`

export const OptionText = styled.p`
    color: ${palette.inputText};
    font-size: ${props => props.active ? '18px' : '17px'};
    transition: inherit;
`

export const OptionIcon = styled.img`
    opacity: ${props => props.active ? 1 : 0};
    width: ${props => props.active ? '20px' : 0};
    transition: inherit;
`