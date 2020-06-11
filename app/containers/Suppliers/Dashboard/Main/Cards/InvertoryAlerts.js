import React, { useEffect, useState, memo } from 'react'
import { object } from 'prop-types'
import styled from 'styled-components'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { Grid, List, ListItem, ListItemText } from '@material-ui/core'
import { Link } from 'react-router-dom'

import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/Suppliers/Auth/reducer';
import { makeSelectUserInfo } from 'containers/Suppliers/Auth/selectors';
import MainPageCard from 'components/Common/Cards/MainPageCard';
import Icon from 'components/Common/Icon';
import { getInvertoryAlertsService } from '../api';
import messages from '../messages';

const key = 'auth'

const Wrapper = styled.div``

const AdapterLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
))

const StyledItem = styled(ListItem)`
  && {
    padding: 6px;
    transition: all 0.1s ease-in-out;
    padding: 10px 20px;
    .MuiListItemText-primary {
      color: ${({ theme }) => theme.colors.homiWhite};
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
    }
    :hover {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
`

const ItemRightSide = styled.div`
  display: flex;
  align-items: center;
`

const StyledStatus = styled.span`
  color: ${({ theme }) => theme.colors.homiWhite};
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  padding-right: 20px;
`

const ArrowIcon = styled(Icon).attrs(props => ({
  color: props.theme.colors.homiPrimary,
  width: 10,
  height: 15,
}))``

const InvertoryAlert = ({ intl, userInfo }) => {
  useInjectReducer({ key, reducer })
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  useEffect(() => {
    setLoading(true)
    getInvertoryAlertsService(userInfo.id)
      .then(res => setData(res.data.data))
      .finally(() => setLoading(false))
  }, [])

  const renderItem = item => {
    let available = item.availableQuantity
    if (item.availableQuantity === 1)
      available = `${item.availableQuantity} ${intl.formatMessage(
        messages.left
      )}`
    if (item.availableQuantity === 0)
      available = intl.formatMessage(messages.outOfStock)
    return (
      <StyledItem component={AdapterLink} key={item.id} to="/">
        <ListItemText primary={item.title} />
        <ItemRightSide>
          <StyledStatus>{available}</StyledStatus>
          <ArrowIcon icon="arrow" />
        </ItemRightSide>
      </StyledItem>
    )
  }

  return (
    <Grid item md={6}>
      <MainPageCard
        title={intl.formatMessage(messages.invertoryAlerts)}
        fullHeight
        loading={loading}
        bodyStyle={{ padding: 0 }}
        noItem={data.length === 0}
      >
        <Wrapper>
          <List>{data.map(d => renderItem(d))}</List>
        </Wrapper>
      </MainPageCard>
    </Grid>
  )
}

InvertoryAlert.propTypes = {
  intl: object,
  userInfo: object,
}

const mapStateToProps = createStructuredSelector({
  userInfo: makeSelectUserInfo(),
})

const withConnect = connect(mapStateToProps)

export default compose(
  withConnect,
  injectIntl,
  memo
)(InvertoryAlert)
