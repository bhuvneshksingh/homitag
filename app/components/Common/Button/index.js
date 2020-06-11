/* eslint-disable react/button-has-type */
import React from 'react'
import { string, array, object, oneOfType } from 'prop-types'
import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'
import { Button as MuiButton, Typography } from '@material-ui/core'

const StyledButton = styled(MuiButton)`
  border-radius: 10px;
  font-weight: 600;
  font-size: 16px;
  height: 52px;
  max-height: 52px;
  width: 100%;
  font-family: 'Montserrat', 'sans-serif';
  && {
    margin: 10px 0;
    text-transform: none;
    border-radius: 10px;
  }
  .MuiButton-outlined .Mui-disabled {
    border: 0;
}
`

const ButtonTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ButtonTitle = styled(Typography)`
  && {
    font-weight: 600;
    font-size: 16px;
    font-family: 'Montserrat', 'sans-serif';
  }
`

const ButtonSubtitle = styled(ButtonTitle)`
  && {
    font-weight: 600;
    font-size: 13px;
    line-height: 12px;
    color: #7471ff;
    opacity: 0.5;
  }
`

const StyledLink = styled(RouterLink)`
  text-decoration: none;
  color: inherit;
`

const Button = ({ children, subtitle, link, ...props }) => {
  const renderButton = () => (
    <StyledButton {...props}>
      {subtitle ? (
        <ButtonTitleWrapper>
          <ButtonTitle>{children}</ButtonTitle>
          <ButtonSubtitle>{subtitle}</ButtonSubtitle>
        </ButtonTitleWrapper>
      ) : (
        children
      )}
    </StyledButton>
  )
  return link ? (
    <StyledLink to={link}>{renderButton()}</StyledLink>
  ) : (
    renderButton()
  )
}

Button.propTypes = {
  children: oneOfType([string, object, array]),
  subtitle: string,
  link: string,
}

export const PrimaryButton = styled(Button)`
  && {
    background-color: ${({ theme }) => theme.colors.homiPrimary};
    color: ${({ theme }) => theme.colors.homiWhite};
    &:hover {
      background-color: ${({ theme }) => theme.colors.homiPrimary};
      opacity: 0.9;
    }
    &:disabled {
      color: ${({ theme }) => theme.colors.homiWhite};
      opacity: 0.5;
    }
    .MuiTypography-root {
      color: ${({ theme }) => theme.colors.homiWhite};
    }
  }
`
export const DangerButton = styled(Button)`
  && {
    background-color: red;
    color: ${({ theme }) => theme.colors.homiWhite};
    &:hover {
      background-color: red;
      opacity: 0.9;
    }
    &:disabled {
      color: ${({ theme }) => theme.colors.homiWhite};
      opacity: 0.5;
    }
    .MuiTypography-root {
      color: ${({ theme }) => theme.colors.homiWhite};
    }
  }
`
export const OutlinePrimaryButton = styled(Button).attrs({
  variant: 'outlined',
})`
  && {
    color: ${({ theme }) => theme.colors.homiPrimary};
    border: 1px solid ${({ theme }) => theme.colors.homiPrimary};
  }
  && :disabled{
    color: ${({ theme }) => theme.colors.homiPrimary};
    border: 1px solid ${({ theme }) => theme.colors.homiPrimary};
  }
`

export const LinkButton = styled(Button).attrs({
  variant: 'text',
})`
  && {
    color: ${({ theme }) => theme.colors.homiBlack};
  }
`
