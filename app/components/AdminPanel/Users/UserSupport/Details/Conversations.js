import React from 'react'
import { Box } from '@material-ui/core'
import styled from 'styled-components'
import { object } from 'prop-types'
import { format, parseISO } from 'date-fns'

const StyledChatUser = styled(Box)`
  && {
    background: ${props => props.bgcolor ? `#${props.bgcolor}` : '#fff'};
    border-radius: 10px;
    padding: 11px 18px;
    width: 400px;
    color: ${props => props.textcolor ? `#${props.textcolor}` : '#313334'};
    position: relative;
    
    &::after {
      content: '';
      background-image: url("data:image/svg+xml,%3Csvg width='25' height='13' viewBox='0 0 25 13' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg %3E%3Cpath d='M397 -10C397 -4.47715 392.523 0 387 0H24.0948C19.8454 0 16.06 2.68563 14.6562 6.6965L13.5 10V10C12.7751 12.7545 8.89957 12.8486 8.04185 10.1325L8 10L5.3494 3.37351C4.53441 1.33603 2.56106 0 0.366621 0V0C-2.59728 0 -5 -2.40272 -5 -5.36662V-120C-5 -125.523 -0.522847 -130 5 -130H387C392.523 -130 397 -125.523 397 -120L397 -10Z' fill='${props => props.bgcolor ? `%23${props.bgcolor}` : 'white'}'/%3E%3C/g%3E%3C/svg%3E%0A");
      height: 13px;
      width: 25px;
      display: block;
      position: absolute;
      bottom: -13px;
      left: 8px;
    }
    
    p {
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
      color: ${props => props.textcolor ? `#${props.textcolor}` : '#313334'};
    }
  }
`
const StyledAvatar = styled.div`
   width: 27px;
   height: 27px;
   border-radius: 27px;
   overflow: hidden;
   img {
      width: 27px;
      height: 27px;
      object-fit: contain;
   }
`
const Conversations = ({ support }) => (
    <>
      <StyledChatUser>
        <Box display="flex" alignItems="center">
          <Box>
            <StyledAvatar>
              <img src="https://randomuser.me/api/portraits/men/15.jpg" alt="user"/>
            </StyledAvatar>
          </Box>
          <Box flexGrow={1} ml={2}>
            User Name
          </Box>
          <Box>
            {format(parseISO(support.createdAt), 'dd/MM/yyyy hh:mm aa')}
          </Box>
        </Box>
        <Box mt={2}>
          <p>
            {support.conversationBuyer}
          </p>
        </Box>
      </StyledChatUser>
      <Box display="flex" justifyContent="flex-end">
        <StyledChatUser mt={5} bgcolor="969696" textcolor="fff">
          <Box display="flex" alignItems="center">
            <Box>
              <StyledAvatar>
                <img src="https://randomuser.me/api/portraits/men/15.jpg" alt="user"/>
              </StyledAvatar>
            </Box>
            <Box flexGrow={1} ml={2}>
              User Name
            </Box>
            <Box>
              {format(parseISO(support.updatedAt), 'dd/MM/yyyy hh:mm aa')}
            </Box>
          </Box>
          <Box mt={2}>
            <p>
              {support.conversationSeller}
            </p>
          </Box>
        </StyledChatUser>
      </Box>
    </>
)
Conversations.propTypes = {
  support: object,
}
export default Conversations
