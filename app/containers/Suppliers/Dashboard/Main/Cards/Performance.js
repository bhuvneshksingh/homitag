import React, { useState, memo, useEffect } from 'react'
import { object, number, array, func } from 'prop-types'
import styled from 'styled-components'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { Grid } from '@material-ui/core'
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/Suppliers/Auth/reducer';
import { makeSelectUserInfo } from 'containers/Suppliers/Auth/selectors';
import MainPageCard from 'components/Common/Cards/MainPageCard';
import ChartButton from 'components/Common/ChartButton';
import { getSalesReportService } from '../api';
import messages from '../messages';

const ChartWrapper = styled.div`
  position: relative;
  overflow: hidden;
`

const ChartButtons = ({ buttons, selected, onClick }) => (
  <Grid container alignItems="center" justify="space-between">
    {buttons.map(b => (
      <ChartButton
        key={b.value}
        onClick={() => onClick({ value: b.value, dayGroup: b.dayGroup })}
        active={b.value === selected.value}
      >
        {b.label}
      </ChartButton>
    ))}
  </Grid>
)

ChartButtons.propTypes = {
  buttons: array,
  selected: number,
  onClick: func,
}

const CustomBar = ({ x, y, width, height }) => (
  <>
    <linearGradient id="gradient" gradientTransform="rotate(90)">
      <stop offset="10%" stopColor="#636363" />
      <stop offset="90%" stopColor="#313334" />
    </linearGradient>
    <rect
      rx="10"
      height={height}
      width={width}
      y={y - 1}
      x={x}
      strokeWidth="0"
      stroke="#000"
      fill="url(#gradient)"
    />
  </>
)

CustomBar.propTypes = {
  x: number,
  y: number,
  width: number,
  height: number,
}

// const filterData = (data, filter) => {
//   const oneDay = 24 * 3600 * 1000;
//   // eslint-disable-next-line prettier/prettier
//   const time = new Date().getTime() - (filter * oneDay);
//   const newData = data.filter(d => new Date(d.date).getTime() >= time);
//   return newData;
// };

const NoItem = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 1;
`

const key = 'auth'

const Performance = ({ intl, userInfo }) => {
  useInjectReducer({ key, reducer })
  const [loading, setLoading] = useState(false)
  // const [originalData, setOriginalData] = useState([{ date: '', order: 0, totalSales: 0 }]);
  const [data, setData] = useState([{ date: '', order: 0, totalSales: 0 }])
  const [filter, setFilter] = useState({ dayGroup: 1, value: 7 })
  const fetchData = params => {
    setLoading(true)
    getSalesReportService(userInfo.id, params)
      .then(res => {
        setData(res.data.data)
      })
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    const date = new Date()
    date.setDate(date.getDate() - filter.value)
    const startDate = date.toISOString().split('T')[0]
    fetchData({ groupByDays: filter.dayGroup, startDate })
  }, [filter])
  return (
    <Grid item md={6}>
      <MainPageCard
        title={intl.formatMessage(messages.performance)}
        fullHeight
        loading={loading}
      >
        <ChartWrapper>
          <BarChart
            width={500}
            height={400}
            data={data}
            margin={{
              right: 30,
              bottom: 5,
            }}
          >
            <Tooltip />
            <YAxis type="number" hide />
            <XAxis
              type="category"
              dataKey="date"
              tick={false}
              tickLine={false}
            />
            <Bar
              dataKey="totalSales"
              shape={<CustomBar />}
              maxBarSize={30}
              minPointSize={5}
            />
          </BarChart>
          {data.length === 0 && (
            <NoItem>{intl.formatMessage(messages.noItem)}</NoItem>
          )}
        </ChartWrapper>
        <ChartButtons
          selected={filter}
          buttons={[
            {
              label: intl.formatMessage(messages.thisWeek),
              dayGroup: 1,
              value: 7,
            },
            {
              label: intl.formatMessage(messages.last2Weeks),
              dayGroup: 1,
              value: 14,
            },
            {
              label: intl.formatMessage(messages.lastMonth),
              dayGroup: 1,
              value: 30,
            },
            {
              label: intl.formatMessage(messages.last6Months),
              dayGroup: 30,
              value: 180,
            },
            {
              label: intl.formatMessage(messages.lastYear),
              dayGroup: 30,
              value: 364,
            },
          ]}
          onClick={f => setFilter(f)}
        />
      </MainPageCard>
    </Grid>
  )
}

Performance.propTypes = {
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
)(Performance)
