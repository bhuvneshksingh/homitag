import React, { useEffect, useState } from 'react'
import { Box } from '@material-ui/core'
import { format, parseISO } from 'date-fns'
import { object } from 'prop-types'
import idx from 'idx'
// additional api
import { getBalanceService, getUserReportService } from '../../../../containers/AdminPanel/Dashboard/Users/api'
import UserIcon from '../Icons'
// star rating
import Stars from '../../../Common/Stars'
import UserBalance from './UserBalance'
import {
  IconBox,
  StyledLink,
  StyledStars,
  StyledLinkTo
} from './styles'

const UserInfo = ({ user }) => {
  const [extraInfo, setExtraInfo] = useState({
    balance: {},
    count: {},
  })
  const getUserBalance = () => getBalanceService(user.id)
  const getUserReport = () => getUserReportService(user.id)
  const getAdditional = () => {
    Promise.all([getUserBalance(), getUserReport()])
      .then(([userBalance, userReport]) => {
        setExtraInfo({
          balance: userBalance.data.data,
          count: userReport.data,
        })
      })
  }

  useEffect(() => {
    getAdditional()
  }, [])

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Box mr={3}>
            <p><strong>Verified:</strong></p>
          </Box>
          <IconBox>
            {user.idvalidated &&
            <UserIcon icon="creditCard"/>
            }
            {user.phonenumbervalidated &&
            <UserIcon icon="phone"/>
            }
            {user.emailvalidated &&
            <UserIcon icon="mail"/>
            }
            {user.facebookaccount &&
            <UserIcon icon="facebook"/>
            }
          </IconBox>
        </Box>
        <Box display="flex" alignItems="center">
          <Box mr={3}>
            <StyledStars>
              <Stars initialCount={parseInt(user.rating, 10)}/>
            </StyledStars>
          </Box>
          <p><strong>{user.reviews} Reviews</strong></p>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Box display="flex" alignItems="center">
          <UserBalance info={extraInfo}/>
        </Box>
        <Box display="flex" alignItems="center">
          <p>
            <strong>
              Member since:
            </strong>
            <span>
              {user.createdAt ? format(parseISO(user.createdAt), 'MM/dd/yy') : '-'}
            </span>
          </p>
        </Box>
      </Box>
      <Box display="flex" mt={3}>
        <Box flexGrow={1}>
          <p>
            <strong>
              Address:
            </strong>
            <span>
              {user.location ? user.location.name : '-'}
            </span>
          </p>
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between" mt={3}>
        <Box display="flex">
          <p>
            <strong>
              Buyer:
            </strong>
            <span>{user.kindsUser.buyer ? 'Yes' : 'No'}</span>
          </p>
        </Box>
        <Box display="flex">
          <p>
            <strong>
              Seller:
            </strong>
            <span>{user.kindsUser.seller ? 'Yes' : 'No'}</span>
          </p>
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between" mt={3}>
        <Box display="flex">
          <p>
            <strong>
              Reseller:
            </strong>
            <span>{user.kindsUser.reseller ? 'Yes' : 'No'}</span>
          </p>
        </Box>
        <Box display="flex">
          <p>
            <strong>
              Supplier:
            </strong>
            <span>{user.kindsUser.supplier ? 'Yes' : 'No'}</span>
          </p>
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between" mt={3}>
        <Box display="flex">
          <p>
            <strong>
              Followers
            </strong>
            <span>{user.followersCount}</span>
          </p>
        </Box>
        <Box display="flex">
          <p>
            <strong>
              Following:
            </strong>
            <span>{user.followingCount}</span>
          </p>
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between" mt={3}>
        <Box display="flex">
          <p>
            <strong>
              Email Address:
            </strong>
            <span>{user.email}</span>
          </p>
        </Box>
        <Box display="flex">
          <p>
            <strong>
              Phone Number:
            </strong>
            <span>{user.phonenumber ? user.phonenumber : ''}</span>
          </p>
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between" mt={3}>
        <Box display="flex">
          <p>
            <strong>
              Preffered Language:
            </strong>
            <span>{user.preferredlanguageid ? user.preferredlanguageid : ''}</span>
          </p>
        </Box>
        <Box display="flex">
          <p>
            <strong>
              Preferred Currency:
            </strong>
            <span>{user.preferredcurrencyid ? user.preferredcurrencyid : ''}</span>
          </p>
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between" mt={3}>
        <Box display="flex">
          <StyledLink>
            <p>
              <strong>
                Item Bought:
              </strong>
              <span>{idx(extraInfo.count, _ => _.boughts) || 0}</span>
            </p>
          </StyledLink>
        </Box>
        <Box display="flex">
          <StyledLink>
            <p>
              <strong>
                Item Sold:
              </strong>
              <span>{idx(extraInfo.count, _ => _.orders) || 0}</span>
            </p>
          </StyledLink>
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between" mt={3}>
        <Box display="flex">
          <StyledLinkTo to={`/admin-panel/users/accounts/${user.id}/saved`}>
            <p>
              <strong>
                Items Saved:
              </strong>
              <span>{user.itemsSaved}</span>
            </p>
          </StyledLinkTo>
        </Box>
        <Box display="flex">
          <StyledLinkTo to={`/admin-panel/users/accounts/${user.id}/albums`}>
            <p>
              <strong>
                Albums Created:
              </strong>
              <span>0</span>
            </p>
          </StyledLinkTo>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt={3}>
        <Box display="flex">
          <p>
            <strong>
              Numbers of Reviews Reported:
            </strong>
            <span>0</span>
          </p>
        </Box>
        <Box display="flex">
          <p>
            <strong>
              Number of Times Reported:
            </strong>
            <span>{user.timesReported}</span>
          </p>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt={3}>
        <Box display="flex">
          <p>
            <strong>
              Numbers of Times Blocked:
            </strong>
            <span>{user.timesBlocked}</span>
          </p>
        </Box>
      </Box>
    </>
  )
}

UserInfo.propTypes = {
  user: object,
}

export default UserInfo
