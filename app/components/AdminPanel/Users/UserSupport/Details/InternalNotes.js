import React from 'react'
import styled from 'styled-components'
import { Box } from '@material-ui/core'
import { string } from 'prop-types'
const StyledBox = styled(Box)`
  && {
    background: #313334;
    border: 1px solid #4D4A4A;
    border-radius: 10px;
    p {
      font-weight: normal;
      font-size: 14px;
      line-height: 17px;
      color: white;
    }
  }
`
const StyledHead = styled(Box)`
   && {
      padding: 24px 28px;
      border-bottom: 1px solid #4D4A4A;
      h4 {
        color: #fff;
        font-size: 16px;
        
        font-weight: 500
      }
   }
`
const InternalNotes = ({note}) => (
    <>
      <StyledBox mb={4}>
        <StyledHead>
          <h4>Internal Notes</h4>
        </StyledHead>
        <StyledBox p={3} m={3} style={{ minHeight: '260px' }}>
          <p>
            {note}
          </p>
        </StyledBox>
      </StyledBox>
    </>
)
InternalNotes.propTypes = {
  note: string,
}
export default InternalNotes;
