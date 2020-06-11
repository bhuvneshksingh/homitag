import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {  number } from 'prop-types'
import { injectIntl } from 'react-intl'
import { Grid } from '@material-ui/core'
import TabNavigation from 'components/Suppliers/Dashboard/Orders/TabNavigation'
import Loading from 'components/Common/Loading'
import Cookies from 'universal-cookie'
import { getOrdersList, getReturnsList, getCancellationsList} from './api'
import Routes from '../../Router/Routes.json'



const TabsSection = styled(Grid).attrs({
  container: true,
  spacing: 1,
})`
  && {
    margin-bottom: 30px;
  }
`


const TabSection = ({countExtra}) => {
  const cookies = new Cookies()

  const [loading, setLoading] = useState(false)

  const [data, setData] = useState({
    total: null,
  })
  const [data2, setData2] = useState({
    total: null,
  })
  const [data3, setData3] = useState({
    total: null,
  })
  const getList = () => {
    setLoading(true)
    getOrdersList({sellerId: cookies.get('userId')})
      .then(res => {
        setData({
          total: res.data.total,
        })
      }
      )
      .finally(() => {
        getList2()
      })
  }
  const getList2 = () => {
    setLoading(true)
    getReturnsList({sellerId: cookies.get('userId')})
      .then(res => {
        setData2({
          total: res.data.total,
        })
      }
      )
      .finally(() => {
        
        getList3()
        setLoading(false)
      })
  }
  const getList3 = () => {
    setLoading(true)
    getCancellationsList({sellerId: cookies.get('userId')})
      .then(res => {
        setData3({
          total: res.data.total,
        })
      }
      )
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    getList()
  }, [countExtra])
  
  const tabItems = [
    {
      "title": "Orders", 
      "count": data.total,
      // "count": countExtra,
      "route": `${Routes.Suppliers}/orders`
    },
    {
      "title": "Returns", 
      "count": data2.total,
      "route": `${Routes.Suppliers}/orders/returns`
    },
    {
      "title": "Cancellations", 
      "count": data3.total,
      "route": `${Routes.Suppliers}/orders/cancellations`
    }
  ]

  

  if (loading) return <Loading pageLoading transparent size={60} />
  return (
    <TabsSection>
      <Grid item xs={12}>
        <TabNavigation tabItems={tabItems}/>
      </Grid>
    </TabsSection>
  )
}


TabSection.propTypes = {
  countExtra: number
}



export default injectIntl(TabSection)
