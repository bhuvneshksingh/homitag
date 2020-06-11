import React, {  useState, useEffect, useRef } from 'react'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'
import {  func, object } from 'prop-types'
import { withRouter } from "react-router";
import Grid from '@material-ui/core/Grid';

import  printIcon  from "assets/images/icons/printIcon.svg"
import  cloudIcon  from "assets/images/icons/cloudIcon.svg"
import ReactToPrint from 'react-to-print';
import { format, addDays } from 'date-fns'
import { Document, Page } from 'react-pdf';
import {b64toBlob , downloadBlob} from 'utils/helpers'
import { PrimaryButton } from '../../../../../components/Common/Button'
import { getOrderLabel, getUserService, getProductDetail, shipOrder } from '../api'
import Loading from '../../../../../components/Common/Loading'

const PackingSlipImage= styled.div`
text-align: center;
width: 229px;
height: 400px;
margin: auto;
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

const StyledSubTitle = styled.div`
  text-align: left;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 25px;
`


const StyledText = styled.div`
  font-weight: 600;
  margin-bottom: 20px;
  color: white;
  font-size: 16px;
`



const FullfillSteps = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
`
const StyledStepText = styled(StyledText)`
  color: ${({ theme }) => theme.colors.homiBlack};
  font-weight: normal;
`


const StyledPrimaryButton = styled(PrimaryButton)`
&& :disabled {
  color: #7471ff;
  /* opacity: 0.5; */
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.homiPrimary};
}
&& :disabled .MuiButton-label * {
  color: ${({ theme }) => theme.colors.homiPrimary};
}
`

const Steps = ({ order,  handleNextStep, fullfillData, handleError }) => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [seller, setSeller] = useState(null)
  const [buyer, setBuyer] = useState(null)
  const [productInfo, setProductInfo] = useState(null)

  const [imageLabel, setImageLabel] = useState({
    image: '',
    fileExtension: ''
  })
  const [submitDisabled, setSubmitDisabled] = useState(true); 

  const carrier = order.deliveryMethod.carrier ? order.deliveryMethod.carrier : 'fedex'
  
  const handleValidation = () => {

    setSubmitDisabled(false)
  }

 


  const handleDownload = (image, fExtension, filename) => {
    const blob = b64toBlob(image, 'application/octet-stream');
    downloadBlob(blob, `label_${filename}.${fExtension}`)
    handleValidation()
  }


  const getUserSeller = (sellerId) => {
    getUserService(sellerId)
      .then(
        (res) => { 
          setSeller({
            name: res.data.name,
            phonenumber: res.data.phonenumber,
            email: res.data.email
          })
        }
      )
  }
  const getUserBuyer = (buyerId) => {
    getUserService(buyerId)
      .then(
        (res) => { 
          setBuyer({
            name: res.data.name,
            phonenumber: res.data.phonenumber,
            email: res.data.email
          })
        }
      )
  }

  const getProduct = (id) => {
    getProductDetail(id)
      .then(
        (res) => { 
          setProductInfo(res.data)
        }
      )
  }

  const showErrorModal = (message) => {
    handleError(message)
  }

  const getLabel= (providerParam) => {
    
    const provider = providerParam
    let body = {}
    switch (provider) {
      case 'ups': 
        body = {
          "service": {
            "Code": "003", // -> fixed
            "Description": "UPS Ground" // -> fixed
          },
          "buyer": {
            "Name": buyer.name,
            "AddressLine": order.deliveryMethod.addressline1,
            "AddressCity": order.deliveryMethod.city,
            "AddressState": order.deliveryMethod.state,
            "AddressZIP": order.deliveryMethod.zipcode,
            "AddressCountry": order.deliveryMethod.country ? order.deliveryMethod.country : "us",
            "Phone": buyer.phonenumber
          },
          "seller": {
            "Name": fullfillData.address.name,
            "AddressLine": (`${fullfillData.address.addressLine1  } ${  fullfillData.address.addressLine2 ? fullfillData.address.addressLine2 : ''}`),
            "AddressCity": fullfillData.address.city,
            "AddressState": fullfillData.address.state,
            "AddressZIP": fullfillData.address.zipCode,
            "AddressCountry": fullfillData.address.country ? fullfillData.address.country : "us",
            "Phone": seller.phonenumber
          },
          "package": {
            "Description": "Package description",
            "PackagingCode": "02",
            "PackagingDescription": "Other Packaging",
            "Length": (productInfo.customProperties && productInfo.customProperties.length) ? productInfo.customProperties.length : '1',
            "Width": (productInfo.customProperties && productInfo.customProperties.width) ? productInfo.customProperties.width : '1',
            "Height": (productInfo.customProperties && productInfo.customProperties.height) ? productInfo.customProperties.height : '1',
            "Weight": (productInfo.customProperties && productInfo.customProperties.weight) ? productInfo.customProperties.weight : '1'
          }
        }
        break;

      case 'usps': 
        body = {
          
          "fromName": seller.name,
          "fromAddressA": fullfillData.address.addressLine1,
          "fromAddressB": fullfillData.address.addressLine2 ?  fullfillData.address.addressLine2 : '-',
          "fromCity": fullfillData.address.city,
          "fromState": fullfillData.address.state,
          "fromZip": fullfillData.address.zipCode,
          "fromPhone": seller.phonenumber ? seller.phonenumber.replace(/\D/g,'').substring(1,11) : "1234567890",
          "toName": buyer.name,
          "toAddressA": order.deliveryMethod.addressline1 ? order.deliveryMethod.addressline1 : "",
          "toAddressB": order.deliveryMethod.addressline2 ? order.deliveryMethod.addressline2 : " - ",
          "toCity": order.deliveryMethod.city ? order.deliveryMethod.city : "",
          "toState": order.deliveryMethod.state ? order.deliveryMethod.state : "",
          "toZip": order.deliveryMethod.zipcode ? order.deliveryMethod.zipcode : "",
          "toPhone": buyer.phonenumber ? buyer.phonenumber.replace(/\D/g,'').substring(1,11) : "1234567890",
          "weightLbs": (productInfo.customProperties && productInfo.customProperties.weight) ? productInfo.customProperties.weight : 1,
          "widthInch": (productInfo.customProperties && productInfo.customProperties.width) ? productInfo.customProperties.width : 1,
          "lengthInch": (productInfo.customProperties && productInfo.customProperties.length) ? productInfo.customProperties.length : 1,
          "heightInch": (productInfo.customProperties && productInfo.customProperties.height) ? productInfo.customProperties.height : 1,
          "serviceType": "Express", // -> fixed
          "container": "FLAT RATE ENVELOPE" // -> fixed
        } 

        
        break;
   

      case 'fedex': 
        body = {
          "buyer": {
            "PersonName": buyer.name.substring(0, 31),
            "CompanyName": " ",
            "PhoneNumber": buyer.phonenumber || '',
            "EMailAddress": buyer.email || "test@test.com",
            "AddressLine": order.deliveryMethod.addressline1,
            "AddressCity": order.deliveryMethod.city,
            "AddressState": order.deliveryMethod.state,
            "AddressZIP": order.deliveryMethod.zipcode,
            "AddressCountry": order.deliveryMethod.country ? order.deliveryMethod.country : "US",
          },
          "seller": {
            "PersonName": seller.name.substring(0, 31),
            "CompanyName": " ",
            "PhoneNumber": seller.phonenumber || '',
            "EMailAddress": seller.email || "test@test.com",
            "AddressLine": (`${fullfillData.address.addressLine1  } ${  fullfillData.address.addressLine2 ? fullfillData.address.addressLine2 : '' }`),
            "AddressCity": fullfillData.address.city,
            "AddressState": fullfillData.address.state,
            "AddressZIP": fullfillData.address.zipCode,
            "AddressCountry": fullfillData.address.country ? fullfillData.address.country : "US", 
          },
          "package": {
            "Weight": (productInfo.customProperties && productInfo.customProperties.weight) ? productInfo.customProperties.weight : "0.5",
            "Length": (productInfo.customProperties && productInfo.customProperties.length) ? productInfo.customProperties.length : "2",
            "Width": (productInfo.customProperties && productInfo.customProperties.width) ? productInfo.customProperties.width : "2",
            "Height": (productInfo.customProperties && productInfo.customProperties.height) ? productInfo.customProperties.height : "2",
            "DropoffType": "REGULAR_PICKUP", // -> fixed
            "PackagingType": "YOUR_PACKAGING", // -> fixed
            "ServiceType": "FEDEX_2_DAY" // -> fixed
          }
        }

        break;

      default:  body = {}
    }

    getOrderLabel(provider, body)
      .then(
        res => {

          let bodyShip = {}
          if (provider === "ups") {
            bodyShip = {
              "trackingId": res.data.data.ShipmentResults.ShipmentIdentificationNumber,
              "labelExtension": res.data.data.ShipmentResults.PackageResults.ShippingLabel.ImageFormat.Code.toLowerCase(),
              "labelData" : res.data.data.ShipmentResults.PackageResults.ShippingLabel.GraphicImage
            }  /**/

            setImageLabel({
              image: res.data.data.ShipmentResults.PackageResults.ShippingLabel.GraphicImage,
              fileExtension: res.data.data.ShipmentResults.PackageResults.ShippingLabel.ImageFormat.Code.toLowerCase()
            }) 
          }

          if (provider === "usps") {

            bodyShip = {
              "trackingId": res.data.data.eVSCertifyResponse.BarcodeNumber._text,
              "labelExtension": 'pdf',
              "labelData" : res.data.data.eVSCertifyResponse.LabelImage._text
            } 
            setImageLabel({
              /* eslint no-underscore-dangle: ["error", { "allow": ["_text"] }] */
              image: res.data.data.eVSCertifyResponse.LabelImage._text,
              fileExtension: 'pdf'
            }) 
          }

          if (provider === "fedex") {
            bodyShip = {
              "trackingId": res.data['SOAP-ENV:Envelope']['SOAP-ENV:Body'].ProcessShipmentReply.CompletedShipmentDetail.MasterTrackingId.TrackingNumber._text,
              "labelExtension": 'png',
              "labelData" : res.data['SOAP-ENV:Envelope']['SOAP-ENV:Body'].ProcessShipmentReply.CompletedShipmentDetail.CompletedPackageDetails.Label.Parts.Image._text,
              
            }
            setImageLabel({
              /* eslint no-underscore-dangle: ["error", { "allow": ["_text"] }] */
              image: res.data['SOAP-ENV:Envelope']['SOAP-ENV:Body'].ProcessShipmentReply.CompletedShipmentDetail.CompletedPackageDetails.Label.Parts.Image._text,
              fileExtension: 'png'
            }) 
          }
          
          // SHIP ORDER
          bodyShip = {...bodyShip , 
            "orderStatus": "buyAccepted",
            "deliveryStatus": "processing",
            "shipBy": format(addDays(new Date(),1), 'yyyy/MM/dd')
          }
          shipOrder(order.id, bodyShip)
            .then(() => {
              handleValidation()
            })
            .catch(() => {
              const errorMessage =  `SHIPPING ERROR`
              setError(true)
              showErrorModal(errorMessage)
            })

        }
      )
      .catch((e) => {
        let errorMessage
        setError(true) 

        if (provider === "ups") {
          if (e.response.data.result.content.message) { 
            errorMessage =  `UPS:  ${  JSON.parse(e.response.data.result.content.message).error.detail.Errors.ErrorDetail.PrimaryErrorCode.Description}`
       
          }else{
            errorMessage =  `UPS: Please Check Shipping Addresses`
       
          }
         
          
        } 

        if (provider === "usps") {  
          if (e.response.data.result.content.fields) { 
            errorMessage = `USPS: ${e.response.data.result.content.fields[0][0]  }`
          }else{
            errorMessage = `USPS: Please Check Shipping Addresses`
          }
        } 

        if (provider === "fedex") {
          if (e.response.data.result.content.fields) {
            errorMessage =  `FEDEX  ${e.response.data.result.content.message  }`
          }else{
            errorMessage = `FEDEX: Please Check Shipping Addresses`
          }
          
        } 
        showErrorModal(errorMessage)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    setLoading(true)
    getUserBuyer(order.buyerId)
    getUserSeller( order.sellerId)
    getProduct(order.postId)
  }, [])

  useEffect(() => {
    if (seller && buyer  && productInfo) {
      getLabel(carrier)
    }
  }, [seller, buyer, productInfo ])

  const  buttonShow = () => (<StyledPrimaryButton subtitle="Drop Off" onClick={() => handleNextStep(3)} disabled={submitDisabled}> Next</StyledPrimaryButton>)
  const componentRef = useRef();

  let imageLabelShow =''
  let imageLabelPrinter = ''
  
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


  if (loading) return <Loading pageLoading transparent size={60} />
  if (!error) {
   
    return ( 
      <FullfillSteps>
        <StyledSubTitle>Shipping Label</StyledSubTitle>
        <StyledStepText> We`ll send a copy of this to your email too.</StyledStepText>
        <Grid container spacing={3}>
          <Grid item xs={12}> 
            <PackingSlipImage>
              {imageLabelShow}
            </PackingSlipImage>
            <div style={{ display: "none" }}><PackingSlipImagePrinter ref={componentRef} >{imageLabelPrinter}</PackingSlipImagePrinter></div>
          </Grid>
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
          <Grid item xs={12}> 
            {buttonShow()}
          </Grid>
        </Grid>
      </FullfillSteps>

    )

  }
  return null
}
  
Steps.propTypes = {
  handleNextStep: func,
  order: object,
  fullfillData: object,
  handleError: func
}
export default injectIntl(withRouter(Steps))
