import React from 'react'
import { Box, IconButton } from '@material-ui/core'
import styled from 'styled-components'
import searchSvg from 'assets/images/icons/search-svg.svg'
import Icon from 'components/Common/Icon'
const StyledReplayBox = styled(Box)`
  && {
      background: #313334;
      border-radius: 10px;
      border: 1px solid rgba(232, 232, 232, 0.2);
      min-height: 300px;
      padding: 28px 20px;
   }
`
const StyledInput = styled(Box)`
  && {
    border: 1px solid #4D4A4A;
    border-radius: 10px;
    min-height: 48px;
    
    img {
      margin-top: 4px;
    }
    
    input, textarea {
      width: 100%;
      color: white;
      font-weight: normal;
      font-size: 14px;
      font-family: Montserrat;
      &::placeholder,
      &::-webkit-input-placeholder {
        color: white;
      }
    }
    textarea {
      height: 60px;
      resize: none;
    }
  }
`
const StyledReplayButton = styled(Box)`
    background: #7471FF;
    border: 1px solid #7471FF;
    border-radius: 10px;
    button {
       width: 100%;
       padding: 23px;
       text-align: center;
       font-family: Montserrat;
       font-weight: 500;
       font-size: 16px;
       color: #fff;
       cursor: pointer;
    }
`
const StyledArrowIcon = styled(IconButton)`
    && {
      border-left: 1px solid rgba(255,255,255, 0.2);
      border-radius: 0;
      padding: 23px;

    }
`
const ArrowIcon = styled(Icon).attrs( () => ({
  color: '#fff',
  width: 10,
  height: 15
}))``

const ReplayForm = () => (
  <>
    <StyledReplayBox>
      <form action="">
        <StyledInput px={2} display="flex" alignItems="center">
          <Box>
            <img src={searchSvg} alt="search"/>
          </Box>
          <Box flexGrow={1} ml={2}>
            <input type="text" placeholder="Search for Macros by Keyword  ..."/>
          </Box>
        </StyledInput>
        <StyledInput px={2} py={3} mt={2} mb={2}>
          <textarea placeholder="Write a custom response here"/>
        </StyledInput>
        <StyledReplayButton display="flex" alignItems="center">
          <Box flexGrow={1}>
            <button type="button">Submit As</button>
          </Box>
          <Box>
            <StyledArrowIcon>
              <ArrowIcon style={{ transform: 'rotate(90deg)' }} icon="arrow" />
            </StyledArrowIcon>
          </Box>
        </StyledReplayButton>
      </form>
    </StyledReplayBox>
  </>
)

export default ReplayForm
