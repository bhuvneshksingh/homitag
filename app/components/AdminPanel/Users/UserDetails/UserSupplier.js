import React, { useState } from 'react'
import { Box, Grid, Container } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import styled from 'styled-components'
import { PDFDownloadLink } from '@react-pdf/renderer'

import Slide from '@material-ui/core/Slide'
import LogoImg from 'assets/images/logo.svg'
import UserIcon from '../Icons'
// additional api
import { getSupplierAgreement } from '../../../../containers/AdminPanel/Dashboard/Users/api'
// pdf
import UserContractAgreement from './UserContractAgreement'
// styles
import {
  ArrowIcon,
  LogoWrapper,
  Logo,
  StyledDialogHeading,
  DialogButton,
  StyledBox,
} from './styles'

const StyledPDFDownloadLink = styled(PDFDownloadLink)`
  && {
    height: 50px;
    width: 50px;
    border-radius: 50px;
    background: #7471FF;
    text-align: center;
    padding-top: 12px;
    display: block;
    &:hover {
      background: #4D4A4A;
    }
  }
`
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const UserSupplier = () => {
  const [agreement, setAgreement] = useState({})
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = React.useState(false)

  const getAgreement = () => {
    setLoading(true)
    getSupplierAgreement()
      .then((res) => {
        setAgreement(res.data.data[0])
        setLoading(false)
      })
  }

  const handleClickOpen = () => {
    setOpen(true)
    getAgreement()
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Box display="flex" alignItems="center" onClick={handleClickOpen} style={{ cursor: 'pointer' }}>
        <Box mr={2} style={{ height: 27 }}>
          <UserIcon icon="doc" color="#7471FF"/>
        </Box>
        <Box flexGrow={1}>
          <p>
            Supplier Agreement
          </p>
        </Box>
        <Box>
          <ArrowIcon icon="arrow"/>
        </Box>
      </Box>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <LogoWrapper>
          <Logo src={LogoImg} alt="Logo"/>
        </LogoWrapper>
        <Grid container>
          <Grid item md={8}>
            <StyledDialogHeading>Supplier Agreement</StyledDialogHeading>
          </Grid>
          <Grid item md={4}>
            <Box display="flex" justifyContent="flex-end" pr={5}>
              {!loading && agreement.length !== 0 &&
              <>
                <Box>
                  <DialogButton onClick={() => window.print()}>
                    <UserIcon icon="print" color="#fff"/>
                  </DialogButton>
                </Box>
                <Box ml={4}>
                  <StyledPDFDownloadLink
                    document={<UserContractAgreement agreement={agreement.content} title="Supplier Agreement"/>}
                    fileName="Supplier-Agreement.pdf">
                    {({ isLoading }) =>
                      (isLoading ? '...' : <UserIcon icon="download" color="#fff"/>
                      )}
                  </StyledPDFDownloadLink>
                </Box>
              </>
              }
              <Box ml={4}>
                <DialogButton onClick={handleClose}>
                  <UserIcon icon="close" color="#fff"/>
                </DialogButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Container>
          {!loading && agreement.length !== 0 &&
          <StyledBox container>
            {agreement.content}
          </StyledBox>
          }
        </Container>
      </Dialog>
    </>
  )
}
export default UserSupplier
