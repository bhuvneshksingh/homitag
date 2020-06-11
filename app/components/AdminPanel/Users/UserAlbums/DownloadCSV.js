import React from 'react'
import { Box, IconButton } from '@material-ui/core'
import { string, number} from 'prop-types'
import { format } from "date-fns"
import styled from 'styled-components'

import Cloud from 'assets/images/icons/cloudIcon.svg'
import {getUserAlbumCSV} from './api'

const StyledDownloadButton = styled(IconButton)`
    && {
      width: 50px;
      height: 50px;
      background: none;
      padding: 0;
    }
`
const DownloadCSV = ({page, perPage, searchText, userId}) => {
  const handleDownloadCSV = () => {
    getUserAlbumCSV(userId,{
      page,
      perPage,
      searchText
    })
      .then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `user_albums_${format(new Date(), 'dd/MM/yyyy hh:mm:ss')}.csv`)
        document.body.appendChild(link)
        link.click()
      })
  }
  return(
    <Box display="flex" justifyContent="flex-end">
      <StyledDownloadButton onClick={() => handleDownloadCSV()}>
        <img src={Cloud} alt=""/>
      </StyledDownloadButton>
    </Box>
  )
}

DownloadCSV.propTypes = {
  page: number,
  perPage: number,
  searchText: string,
  userId: string
}
export default DownloadCSV
