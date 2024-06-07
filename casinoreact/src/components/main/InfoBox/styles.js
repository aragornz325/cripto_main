import styled, { keyframes } from "styled-components";
import * as palette from '../../../utils/colors/palettes/default';

const fadeIn = keyframes`
    0% { margin-left: 200% }
    100% { margin-left: 0 }
`

export const Wrapper = styled.div`
    border-radius: 8px;
    padding: 4px 12px;
    height: min-content;
    animation: ${fadeIn} ${palette.tFade} forwards ease-in-out 1;
    background: ${props => props.error ? 'grey' : palette.popupBackground};
`

export const Title = styled.p`
    font-size: 16px;
    font-weight: 600;
    color: ${palette.text};
`

export const Text = styled.p`
    font-size: 14px;
    color: ${palette.text};
    max-width: 100%;
    word-break: break-all;
`