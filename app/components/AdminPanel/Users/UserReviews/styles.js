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
export const StyledMore = styled.img`
  width: 26px;
  height: 6px;
`
export const StyledLink = styled.div`
  cursor: pointer;
  > p {
    color: #00BDAA;
    border-bottom: 1px solid #00BDAA;
    line-height: 16px;
  }
`
export const ArrowIcon = styled(Icon).attrs(props => ({
  color: props.theme.colors.homiPrimary,
  width: 10,
  height: 15,
}))``

export const StyledButton = styled.button`
  && {
    font-weight: 600;
    text-decoration-line: underline;
    cursor: pointer
  }
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
      min-height: 320px;
      height: 100%;
      position: relative;
      
      margin-bottom: 16px;
    }
    p {
      font-weight: 500;
      font-size: 12px; 
      line-height: 24px;
    }
`
export const ReviewHead = styled(Box)`
  && {
    border-bottom: 1px solid #373838;
    padding: 18px 24px;
    h3 {
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
      text-transform: capitalize;
    }
    svg {
      margin-right: 4px;
      width: 16px;
      height: 16px;
    }
  }
`
export const ReviewBody = styled(Box)`
    && {
       padding: 13px 24px 96px;
    }
`
export const ReviewUser = styled(Box)`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 18px 24px;
    border-top: 1px solid #373838;
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
  width: 46px;
  height: 46px;
  border-radius: 46px;
  overflow: hidden;
  ::before {
    content: '';
  }
  img {
    width: 46px;
    height: 46px;
    object-fit: cover;
  }
`
