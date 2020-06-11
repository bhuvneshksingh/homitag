import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Cookies from 'universal-cookie'
import {Link} from 'react-router-dom'
import { PageHeader } from 'components/Suppliers/Dashboard/Page'
import { LightText } from 'components/Suppliers/Dashboard/LightText'
import Pagination from 'components/Common/Pagination'
import Loading from 'components/Common/Loading'
import SearchBox from '../../../../components/Suppliers/Dashboard/Inventory/SearchBox'
import download from '../../../../assets/images/icons/downloadFile.svg'
import upload from '../../../../assets/images/icons/upload.svg'
import { getInventoryList } from '../Inventory/api'
import ProductBrief from './ProductBrief'

const Instruction = styled.div`
  text-align: center;
  margin: auto;
  margin-top: 40px;
  margin-bottom: 20px;
  width: 60%
 `

const SearchBoxContainer = styled.div`
  margin: auto;
  margin-bottom: 40px;
  width: 80%;
`
const FileWrapper = styled.div`
  display: flex;
  justify-content: center;
  justify-content: space-between;
  margin: auto;
  margin-top: 50px;
  width: 40%;
`
const FileContent = styled.div`
  text-align: center;
`
const BoldText = styled.p`
  font-weight: 600;
`
const ShowingInfo = styled(BoldText)`
  width: 300px;
  text-align: center;
  display: block;
  margin: auto;
  margin-bottom: 5px;
`
const DownloadLink = styled.a`
  text-decoration: none;
  color: black;
 `

const PurpleText = styled(Link)`
  color: #7471ff;
  font-weight: 600;
`

const FoundListing = styled.div`
    width: 65% ;
    margin: auto;
`
const NewProduct = () => {
  const [loading, setLoading] = useState(false)
  const [ searchText, setSearchText] = useState('')
  const [ data, setData] = useState([])
  const [page, setPage] = useState(1)
  const perPage = 5

  const getList = () => {
    setLoading(true)
    const search = searchText !== '' ? searchText : null
    const cookies = new Cookies()
    const sellerId = cookies.get('userId')

    const query = { page, perPage, sellerId, searchText: search}
    getInventoryList(query)
      .then(res =>
        setData({
          list: res.data.data,
          total: res.data.total,
        })
      ).finally(() => setLoading(false))
  }
  useEffect(() => {
    getList()
  }, [searchText, page])

  useEffect(() => {
    setPage(1)
  }, [searchText])

  const foundItems = () =>{
    const pagItems = data.list && data.list.map(d => (
        <>
          <ProductBrief product={d}/>
        </>
    ))

    return(
      <>
        <FoundListing>
          <LightText text=' We found this listings in our marketplace already. You can choose one and add it to your inventory to this listing.'/>
        </FoundListing>
        {pagItems}
        <ShowingInfo>{`Showing  ${data && data.list && data.list.length * page} of ${data.total}`}</ShowingInfo>
        <Pagination
          totalCount={data.total}
          onPageChange={newPage => setPage(newPage)}
          perPage={perPage}
          currentPage={page}
        />
      </>
    )
  }
  const listedItems = foundItems()

  const prodSearch = () => {
    let productSearch = ''
    if(searchText === ''){
      productSearch =
        <>
          <Instruction>
            <PurpleText to='/suppliers/new-product/add'> Add products not sold on Homitag</PurpleText>
          </Instruction>
          <PageHeader pageTitle="Bulk Upload"/>
          <Instruction>
            <LightText text='You can upload your inventory in bulk by downloading this spreadsheet and uploading it with your inventory details'/>
          </Instruction>
          <FileWrapper>
            <FileContent>
              <DownloadLink href='https://homitag-web-static.s3.amazonaws.com/bulk_upload/bulk_upload.xlsx' download>
                <img src={download} alt='download'/>
                <BoldText>Download Spreadsheet</BoldText>
              </DownloadLink>
            </FileContent>
            <FileContent>
              <img src={upload} alt='upload'/>
              <BoldText>Upload Spreadsheet</BoldText>
            </FileContent>
          </FileWrapper>
        </>
    }else if(searchText !== '' && loading){
      productSearch = <Loading pageLoading transparent size={60}/>
    }else if(searchText !== '' && data.list.length === 0 ){
      productSearch =
        <>
          <Instruction>
            <PurpleText to='/suppliers/new-product/add'> Add products not sold on Homitag</PurpleText>
          </Instruction>
          <PageHeader pageTitle="Not found products"/>
        </>
    }else if(searchText !== '' && data && data.list && data.list.length === 1 ){
      productSearch =
        <>
          <FoundListing>
            <LightText text=' We found this listing in our marketplace already. You can add your inventory to this listing.'/>
          </FoundListing>
          <ProductBrief product={data.list}/>
        </>
    }else if(searchText !== '' && data && data.list && data.list.length > 1){
      productSearch= listedItems
    }
    return productSearch
  }

  const searchResult = prodSearch()
  return(
    <>
    <PageHeader pageTitle="Add New Product"/>
    <Instruction>
      <LightText text='Search your product to see if it exists on Homitag yet'/>
    </Instruction>
    <SearchBoxContainer>
      <SearchBox onChange={value => setSearchText(value)} type='newProduct'/>
    </SearchBoxContainer>
      {searchResult}
    </>
  )
}

export default NewProduct
