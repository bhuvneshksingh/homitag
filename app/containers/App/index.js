import React from 'react'
import { ThemeProvider } from 'styled-components'
import { MuiThemeProvider } from '@material-ui/core/styles'

import Router from 'containers/MainRouter'
import theme from '../../theme'
import GlobalStyle from '../../theme/globalStyles'

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
      <GlobalStyle />
    </MuiThemeProvider>
  )
}
