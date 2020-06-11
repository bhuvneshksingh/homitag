import React from 'react'
import { Box } from '@material-ui/core'
import { string } from 'prop-types'
import {
  StyledBoxHead,
  StyledStatus,
  StatusText,
  StatusState,
} from './styles'

const UserInfoHead = ({ name, id, status}) => (
  <StyledBoxHead p={3}>
    <Box display="flex">
      <Box flexGrow={1}>
        {id &&
        <h2>{name} | {id}</h2>
        }
        {name && !id &&
          <h2>{name}</h2>
        }
      </Box>
      {status &&
      <Box>
        <StyledStatus display="flex">
          <StatusText>Status:</StatusText>
          <Box>
            <StatusState className={status}/>
            <strong>{status}</strong>
          </Box>
        </StyledStatus>
      </Box>
      }
    </Box>
  </StyledBoxHead>
)
UserInfoHead.propTypes = {
  name: string,
  id: string,
  status: string
}
export default UserInfoHead
