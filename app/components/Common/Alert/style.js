import { Box } from '@material-ui/core'
import styled from 'styled-components'

export const StyledAlert = styled(Box)`
   background: #969696;
   padding: 20px;
   border-radius: 10px;
   position: relative;
`
export const StyledIcon = styled.img`
   width: 20px;
   height: 20px;
`
export const StyledText = styled.h6`
    margin: 0;
    font-size: 16px;
    line-height: 20px;
    color: #FFFFFF;
    margin-left: 16px;
`
export const StyledUndo = styled.button`
    position: absolute;
    display: block;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    color:white;
    text-decoration: underline;
    cursor: pointer
`
