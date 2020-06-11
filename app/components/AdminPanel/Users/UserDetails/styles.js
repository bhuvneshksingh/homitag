import styled from 'styled-components'
import { Box, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'

import Icon from '../../../Common/Icon'
// layout
export const TopSection = styled(Grid).attrs({
  container: true,
  spacing: 1,
})`
  && {
    margin-bottom: 24px;
  }
`
export const StyledHeading = styled.h1`
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  font-weight: bold;
  color: #313334;
`
export const StyledMore = styled.img`
  width: 26px;
  height: 6px;
`
export const StyledBoxHead = styled(Box)`
  && {
    border-bottom: 1px solid #4D4A4A;
    h2 {
       color: #fff;
       font-weight: 600;
       font-size: 16px;
    }
  }
`
export const StyledStatus = styled(Box)`
  && {
    color: white;
    strong {
      text-transform: capitalize
    }
  }
`
export const StyledStars = styled(Box)`
  && {
    svg {
      width: 22px;
      height: 22px;
      margin-right: 12px;
    }
  }
`
export const StatusText = styled.div`
  text-transform: uppercase;
  font-size: 14px;
  font-weight: normal;
  margin-right: 10px;
`
export const StatusState = styled.span`
  display: inline-block;
  height: 10px;
  width: 10px;
  margin-right: 10px;
  border-radius: 10px;
  &.deactivated {
    box-shadow: 0px 0px 2px #EC4B4C;
    background: #FF5556;
    border: 1px solid #EC4B4C;
  }
  &.inactive {
    background: #C4C4C4;
    border: 1px solid #A6A6A6;
    box-shadow: 0px 0px 2px #C4C4C4;
  }
  &.active {
    background: #27AE60;
    border: 1px solid #219653;
    box-shadow: 0px 0px 2px rgba(58, 234, 108, 0.25);
  }
`
export const StyledLink = styled.div`
  cursor: pointer;
  > p {
    color: #00BDAA;
    border-bottom: 1px solid #00BDAA;
    line-height: 16px;
  }
`
export const StyledLinkTo = styled(Link)`
  cursor: pointer;
  color: #00BDAA;
  text-decoration: none;
  > p {
    border-bottom: 1px solid #00BDAA;
    line-height: 16px;
  }
`
export const IconBox = styled(Box)`
  && {
    svg {
      margin-right: 16px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
`
export const StyledLinkWhiteBox = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #7471FF;
  text-decoration: underline;
  cursor: pointer;
`
export const ArrowIcon = styled(Icon).attrs(props => ({
  color: props.theme.colors.homiPrimary,
  width: 10,
  height: 15,
}))``

export const StyledNote = styled(Box)`
  && {
    border: 1px solid #454748;
    color: white;
    border-radius: 4px;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
  }
`
export const ReviewHeading = styled(Box)`
  && {
    margin: 32px 0 24px;
    h2 {
      font-size: 20px;
      line-height: 24px;
      color: #313334;
      font-weight: 700;
    }
    button {
      color: #7471FF;
      font-size: 14px;
      line-height: 17px;
    }
  }
`
export const StyledButton = styled.button`
  && {
    font-weight: 600;
    text-decoration-line: underline;
    cursor: pointer
  }
`
export const StyledRouteLink = styled(Link)`
    font-weight: 600;
    text-decoration-line: underline;
    cursor: pointer
`
export const StyledLinkButton = styled(Link)`
    color: #00BDAA;
    font-size: 12px;
    line-height: 12px;
    font-weight: 500;
`
export const ReviewBox = styled(Box)`
    && {
      color: white;
      background: #313334;
      border: 1px solid #4D4A4A;
      border-radius: 10px;
      min-height: 100px;
      
      margin-bottom: 16px;
    }
`
export const ReviewHead = styled(Box)`
  && {
    border-bottom: 1px solid #373838;
    padding: 12px 16px;
    h3 {
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;
      text-transform: capitalize;
    }
    svg {
      margin-right: 2px;
      width: 12px;
    }
  }
`
export const ReviewBody = styled(Box)`
    && {
       padding: 8px 16px 24px;
       p {
          font-weight: 500;
          font-size: 12px; 
          line-height: 24px;
       }
    }
`
export const ReviewUser = styled(Box)`
   && {
    h6 {
        font-weight: 500;
        font-size: 12px;
        line-height: 12px;    
    }
    button {
        color: #00BDAA;
        font-size: 12px;
        line-height: 12px;
      }
   }
`
export const ImgWrapper = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 32px;
  overflow: hidden;
  ::before {
    content: '';
  }
  img {
    width: 32px;
    height: 32px;
    object-fit: cover;
  }
`
export const ReviewFooter = styled.div`
  padding: 22px 16px;
  border-top: 1px solid #373838;
  > p {
    font-weight: 500;
    font-size: 12px;
    line-height: 12px;
  }
`
export const LogoWrapper = styled.div`
    display: 'flex';
    align-items: 'center';
    padding: 27px 80px;
    @media print and (min-width: 480px) {
        padding: 16px;
    }
    height: 86px;
`
export const Logo = styled.img`
    width: 130px;
    height: 32px;
`
export const StyledDialogHeading = styled.h5`
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  padding-left: 50%;
  
  @media print and (min-width: 480px) {
      padding: 0 16px;
  }
`
export const DialogButton = styled.button`
  height: 50px;
  width: 50px;
  border-radius: 50px;
  background: #7471FF;
  cursor: pointer;
  &:hover {
    background: #4D4A4A;
  }
  `
export const StyledBox = styled(Box)`
  && {
    background: #313334;
    border: 1px solid #4D4A4A;
    border-radius: 10px;
    padding: 24px;
    font-size: 16px;
    line-height: 22px;
    color: white;
    margin-top: 60px;
    @media print and (min-width: 480px) {
        padding: 0;
        border: none;
        background: #fff;
        margin-top: 20px;
        color: black;
    }
  }
`
export const StyledP = styled.p`
  margin: 0;
  font-size: 12px;
  font-style: italic;
`
