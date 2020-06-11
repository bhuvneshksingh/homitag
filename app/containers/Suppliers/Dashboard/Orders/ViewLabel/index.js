import React, { Fragment, useState, useEffect, useRef } from 'react'
import { injectIntl } from 'react-intl'
import Icon from 'components/Common/Icon'
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components'
import { object } from 'prop-types'
import ReactToPrint from 'react-to-print';
import { Document, Page } from 'react-pdf';
import  printIcon  from "assets/images/icons/printIcon.svg"
import  cloudIcon  from "assets/images/icons/cloudIcon.svg"
import {b64toBlob , downloadBlob} from 'utils/helpers'
import { getOrderDetail } from '../api'
import Loading from '../../../../../components/Common/Loading'
import ArrowBackButton from '../../../../../components/Common/ArrowBackButton'
import OrderDetailSmall from '../../../../../components/Suppliers/Dashboard/Orders/OrderDetail/OrderDetailSmall'


const PackingSlipImage= styled.div`
text-align: center;
width: 229px;
height: 400px;
margin: 50px auto;
display: ${props => props.forPrinter ? 'none' : 'block'};
&& img.fedex {
  border: 1px solid #000;
  transform-origin: bottom left;
  -webkit-transform-origin: bottom left;
  -ms-transform-origin: bottom left;
  width: 400px;
  height: 229px;
  transform: rotate(-90deg) translateY(100%) translateX(-42.5%);
  -webkit-transform: rotate(-90deg) translateY(100%) translateX(-42.5%);
  -ms-transform: rotate(-90deg) translateY(100%) translateX(-42.5%);
}
&& img.ups {
  border: 1px solid #000;
  transform-origin: top left;
  -webkit-transform-origin: top left;
  -ms-transform-origin: top left;
  width: 400px;
  height: 229px;
  transform: rotate(90deg) translateY(-100%);
  -webkit-transform: rotate(90deg) translateY(-100%);
  -ms-transform: rotate(90deg) translateY(-100%);
}
`
const PackingSlipImagePrinter= styled.div`
text-align: center;
padding-top: 40px;
width: 457px;
height: 800px;
margin: auto;
display: ${props => props.forPrinter ? 'none' : 'block'};
&& img {
  border: 1px solid #000;
  transform-origin: top left;
  -webkit-transform-origin: top left;
  -ms-transform-origin: top left;
  width: 800px;
  height: 457px;
  transform: rotate(90deg) translateY(-100%);
  -webkit-transform: rotate(90deg) translateY(-100%);
  -ms-transform: rotate(90deg) translateY(-100%);
}
`

const StyledTitle = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 25px;
`

const ArrowIcon = styled(Icon).attrs(props => ({
  color: props.theme.colors.homiPrimary,
  width: 10,
  height: 15,
}))``

const StyledIcon = styled(Icon).attrs(props => ({
  color: props.theme.colors.homiPrimary,
  width: '53px',
  height: '55px',
}))``

const CloseButton= styled.div`
  width: 20px;
  height: 20px;
  float: right;
  align-self: flex-end;
  margin: 0px 20px;
  &:hover {
    cursor: pointer; 
   }
`
const StyledTextLink = styled.div`
  font-weight: 600;
  margin-bottom: 20px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  float: left;
`
const ButtonWrapper = styled.div`
  display: flex;
`

const ArrowLeft = () => (
  <div style={{ transform: 'rotate(-180deg)' }}>
    <ArrowIcon icon="arrow" />
  </div>
)

const ActionsBox = styled.div`
display: flex;
justify-content: space-evenly;
`

const ActionButton= styled.div`
  width: 70px;
  height: 70px;
  align-self: center;
  color: ${({ theme }) => theme.colors.homiBlack};
  cursor: pointer;
  text-align: center;
`



const EditLabel = ({ match, history }) => {

  const [order, setOrder] = useState({})
  const [loading, setLoading] = useState(false)
  const orderId = match.params.id
  const [imageLabel, setImageLabel] = useState({
    image: '',
    fileExtension: ''
  })

  const handleGoBack  = () => {
    history.goBack()
  }
  const getList = () => {
    setLoading(true)
    getOrderDetail(orderId)
      .then(
        res => {
          setOrder(res.data)
          setImageLabel({
            image: res.data.labelData,
            fileExtension: res.data.labelExtension.toLowerCase()
          }) 
        }
      )
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    getList()
  }, [])

  const handleDownload = (image, fExtension, filename) => {
    const blob = b64toBlob(image, 'application/octet-stream');
    downloadBlob(blob, `label_${filename}.${fExtension}`)
  }



  const componentRef = useRef();


  let imageLabelShow =''
  let imageLabelPrinter = ''
  
  if (order && order.deliveryMethod && order.labelData) {
    const {carrier} = order.deliveryMethod
    switch (carrier) {
      case 'ups': 
        if (imageLabel.image !== '') {
          imageLabelShow = <img src={`${`data:image/${imageLabel.fileExtension};base64, ${  imageLabel.image}`}`} alt='LABEL' className={carrier}/>
          imageLabelPrinter = <img src={`${`data:image/${imageLabel.fileExtension};base64, ${  imageLabel.image}`}`} alt='LABEL FOR PRINTER' className={carrier}/>
        } 
        break
      case 'usps': 
        if (imageLabel.image !== '') {
          imageLabelShow = <Document
            file={`${`data:image/${imageLabel.fileExtension};base64, ${  imageLabel.image}`}`} className="pdfShow"   loading="Loading Label..."
          >
            <Page pageNumber={1} height={350} />
          </Document>
          imageLabelPrinter = <Document
            file={`${`data:image/${imageLabel.fileExtension};base64, ${  imageLabel.image}`}`} loading="Loading Label..."
          >
            <Page pageNumber={1} />
          </Document>
        } 
        break
      case 'fedex': 
        if (imageLabel.image !== '') {
          imageLabelShow = <img src={`${`data:image/${imageLabel.fileExtension};base64, ${  imageLabel.image}`}`} alt='LABEL' className={carrier}/>
          imageLabelPrinter = <img src={`${`data:image/${imageLabel.fileExtension};base64, ${  imageLabel.image}`}`} alt='LABEL FOR PRINTER' className={carrier}/>
        } 
        break
      default:
        return null
    } 
  }

  if (loading) return <Loading pageLoading transparent size={60} />
  if(order && order.id){
    return ( 
      <Fragment>
        <StyledTextLink onClick={handleGoBack}>
          <ButtonWrapper>
            {ArrowLeft()}
          </ButtonWrapper>
        </StyledTextLink>
        <CloseButton onClick={handleGoBack}>
          <StyledIcon icon="cancellationsPurple" width={50} height={50} />
        </CloseButton>
        <StyledTitle>Shipping Label</StyledTitle>
        <Grid container spacing={3}>
          <Grid item xs={4}> 
            
            <OrderDetailSmall order={order}/>
          </Grid>
          <Grid item xs={1}>   </Grid>
          <Grid item xs={7}> 
            <PackingSlipImage>
              {imageLabelShow}
            </PackingSlipImage>
            <div style={{ display: "none" }}><PackingSlipImagePrinter ref={componentRef} >{imageLabelPrinter}</PackingSlipImagePrinter></div>
            
            <StyledTitle>[instructions for shipping label]</StyledTitle>

            <Grid item xs={12}> 
              <ActionsBox>
                <ReactToPrint
                  trigger={() =>  <ActionButton
                  >
                    <img src={printIcon} alt=''/>
                    Print
                  </ActionButton>}
                  content={() => componentRef.current} >
                </ReactToPrint>
                <ActionButton onClick={() => handleDownload(imageLabel.image, imageLabel.fileExtension, order.productInfo.id )}>
                  <img src={cloudIcon} alt=''/>
                  Download
                </ActionButton>
              </ActionsBox>
            </Grid> 
          </Grid>
        </Grid>
        
      </Fragment>
    )
  }
  return (<Fragment>
    <ArrowBackButton title='Orders' backRoute='/suppliers/orders'/>
    <StyledTitle>View Label</StyledTitle>
  </Fragment>)
  

  


}

EditLabel.propTypes = {
  match: object,
  history: object
}
export default injectIntl(EditLabel)
