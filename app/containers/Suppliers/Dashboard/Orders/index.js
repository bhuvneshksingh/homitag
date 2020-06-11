import React, { useState , useEffect} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { Grid, IconButton } from '@material-ui/core'
import { PageHeader } from 'components/Suppliers/Dashboard/Page'
import SearchBox from 'components/Suppliers/Dashboard/Orders/SearchBox'
import Filters from 'components/Suppliers/Dashboard/Orders/Filters'
import TimerIcon from 'assets/images/icons/timer.png'
import ArrangementIcon from 'assets/images/icons/arrangement.png'
import { Link } from 'react-router-dom'
import { withRouter } from "react-router";

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Cookies from 'universal-cookie'
import { useLocationState } from 'react-router-use-location-state'
import { getOrdersList } from './api'
import TabSection from './TabSection'
import OrdersList from './OrdersList'
import ActionModal from './ActionModal'


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}




const TopSection = styled(Grid).attrs({
  container: true,
  spacing: 1,
})`
  && {
    margin-bottom: 30px;
  }
  
`


const StyledIconButton = styled(IconButton)`
  width: 66px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  && {
    background-color: ${({ theme }) => theme.colors.homiPrimary};
    border-radius: 10px;
  }
`
const StyledImg = styled.img`
  width: 20px;
  height: 18px;
`
const StyledLink = styled(Link)`
  text-decoration: none
`
const StyledAppBar = styled(AppBar)`
&& {
  color: #000;
  background-color: transparent;
  box-shadow: none;
}
&& .MuiTabs-indicator {
  background-color: ${({ theme }) => theme.colors.homiPrimary};
  height: 4px;
}
&& .MuiButtonBase-root {
  font-size: 16px;
  line-height: 20px;
}
&& .MuiButtonBase-root span strong {
    color: ${({ theme }) => theme.colors.homiPrimary};
  }
&& .Mui-selected {
  font-weight: bold;
}
`
const StyledTabPanel = styled(TabPanel)`
&& .MuiBox-root {
  padding 40px 0px;
}
`



const Orders = () => {

 

  const  [searchText, setSearchText] =  useLocationState("searchText",  "");
  const [actionPrompt, setActionPrompt] = useState('')
  const [countExtra, setCountExtra] = useState(0)
  // const [searchText, setSearchText] = useState('')
  const [filtersModal, showFiltersModal] = useState(false)
  const [sortAndFilter, setSortAndFilter] = useLocationState("sortAndFilter" , {
    sort: 'createdAt-desc',
    status: null
  })
  const [shippedTotal, setShippedTotal] = useState({
    shipped: 0
  })
  const [unshippedTotal, setUnshippedTotal] = useState({
    unshipped: 0
  })
  const handleFilters = values => {
    setSortAndFilter(values)
    showFiltersModal(false)

  }
 
  const handleCount = () => {
    setCountExtra(0)
  }
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const getList = (wasShipped,  isArchived) => {
    const cookies = new Cookies()
    getOrdersList({ wasShipped, searchText, sort: sortAndFilter.sort,  isArchived, status: sortAndFilter.status, sellerId: cookies.get('userId')  })
      .then(res => {
        if (wasShipped) {
          setShippedTotal({
            shipped: res.data.total,
          })
        }else{
          setUnshippedTotal({
            unshipped: res.data.total,
          })
        }
      }
      )
  }


  useEffect(() => {
    getList(true, false)
    getList(false, false)
  }, [searchText,sortAndFilter])



  return (
    <>
      <PageHeader pageTitle="Orders" />
      <TabSection 
        sortAndFilter={sortAndFilter} countExtra={countExtra}/>
      <TopSection container spacing={1} wrap="nowrap" >
        <Grid item xs={10}>
          <SearchBox onChange={value => setSearchText(value)} valueSet={searchText}>Search By Order ID, Product Name ...</SearchBox>
        </Grid>
        <Grid container item xs={2} justify="space-evenly" wrap="nowrap">
          <StyledLink to="/suppliers/orders/archived">
            <StyledIconButton>
              <StyledImg src={TimerIcon} />
            </StyledIconButton>
          </StyledLink>
          <StyledIconButton onClick={() => showFiltersModal(true)}>
            <StyledImg src={ArrangementIcon} />
          </StyledIconButton>
        </Grid>
      </TopSection>
      <StyledAppBar position="static">
        <Tabs value={tabValue} onChange={handleChange} >
          <Tab label={<span><strong>{unshippedTotal.unshipped}</strong> Unshipped</span>} {...a11yProps(0)} />
          <Tab label={<span><strong>{shippedTotal.shipped}</strong> Shipped</span>} {...a11yProps(1)} />
        </Tabs>
      </StyledAppBar>
      <StyledTabPanel value={tabValue} index={0}>
        <OrdersList
          searchText={searchText}
          sortAndFilter={sortAndFilter}
          wasShipped={false}
          isArchived={false}
          defaultExpanded
          type="Order"
          showError
          handleCount={handleCount}
        />
      </StyledTabPanel>
      <StyledTabPanel value={tabValue} index={1}>
        <OrdersList
          searchText={searchText}
          sortAndFilter={sortAndFilter}
          wasShipped
          isArchived={false}
          defaultExpanded
          type="Order"
          showError={false}
          handleCount={handleCount}
        />
      </StyledTabPanel>
      
      <ActionModal
        isOpen={!!actionPrompt}
        onClose={() => setActionPrompt('')}
        action={actionPrompt}
      />
      { <Filters
        isOpen={filtersModal}
        onClose={() => showFiltersModal(false)}
        onSubmit={handleFilters}
        onClear={handleFilters}
        sortAndFilter={sortAndFilter}
      /> }
      

    </>
  )
}


export default injectIntl(withRouter(Orders))
