import React from 'react'
import { Box } from '@material-ui/core'
// styles
import {
  StyledLinkWhiteBox,
  ArrowIcon,
} from './styles'

const UserMetrics = () => (
  <>
    <Box display="flex">
      <Box flexGrow={1}>
        <h1>
          User Metrics
        </h1>
      </Box>
      <Box>
        <StyledLinkWhiteBox>
          Expand All
        </StyledLinkWhiteBox>
      </Box>
    </Box>

    <Box display="flex" mt={3}>
      <Box flexGrow={1}>
        <h2>
          Order Defects
        </h2>
      </Box>
      <Box style={{ width: 13 }}>
        <ArrowIcon style={{ transform: 'rotate(90deg)' }} icon="arrow"/>
      </Box>
    </Box>

    <Box display="flex" mt={3}>
      <Box flexGrow={1}>
        <h2>
          Return Requests
        </h2>
      </Box>
      <Box style={{ width: 13 }}>
        <ArrowIcon style={{ transform: 'rotate(90deg)' }} icon="arrow"/>
      </Box>
    </Box>
    <Box display="flex" mt={3}>
      <Box flexGrow={1}>
        <h2>
          Shipping Performance
        </h2>
      </Box>
      <Box style={{ width: 13 }}>
        <ArrowIcon style={{ transform: 'rotate(90deg)' }} icon="arrow"/>
      </Box>
    </Box>
    <Box display="flex" mt={3}>
      <Box flexGrow={1}>
        <h2>
          Policy
        </h2>
      </Box>
      <Box style={{ width: 13 }}>
        <ArrowIcon style={{ transform: 'rotate(90deg)' }} icon="arrow"/>
      </Box>
    </Box>
    <Box display="flex" mt={3}>
      <Box flexGrow={1}>
        <h2>
          Meet Up
        </h2>
      </Box>
      <Box style={{ width: 13 }}>
        <ArrowIcon style={{ transform: 'rotate(90deg)' }} icon="arrow"/>
      </Box>
    </Box>
  </>
)

export default UserMetrics
