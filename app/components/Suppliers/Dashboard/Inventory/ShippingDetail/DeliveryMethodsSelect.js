// import React, { useEffect, useState } from 'react'
// import { func, string, array, bool } from 'prop-types'
// import { getDeliveryMethods } from '../../../../../containers/Suppliers/Dashboard/UserInventory/api'

// import DeliveryMethodOption from './DeliveryMethodOption'

// const DeliveryMethodsSelect = props => {
//   const handleDeliveryUpdate = () => {
//     props.onDeliveryUpdate()
//   }

//   const handleSelectedMethod = method => {
//     setSelectedMethod(method)
//   }

//   const handleAddressSelect = (address) => {
//     props.onAddressSelect(address)
//   }

//   const handleEditAddressSelect = (address) => {
//     props.onEditAddressSelect(address)
//   }

//   const availableMethods = deliveryMethods.filter(method => method.code !== 'pickup' )

//   if (loading) return 'Loading...'
//   console.log('DELIVERY METHODS', availableMethods)
//   if (props.loading) return 'Loading...'

//   const shippingMethods = availableMethods.map(method => (
//     <>
//       <DeliveryMethodOption
//         key={method.code}
//         product={props.product}
//         method={method}
//         onAddressSelect={(address) => handleAddressSelect(address)}
//         isAddressAdded={props.isAddressAdded}
//         addressArray={props.addressArray}
//         onEditAddressSelect={(address) => handleEditAddressSelect(address)}
//         onSelected={() => handleSelectedMethod(selectedMethod)}
//         isSelected={selectedMethod.name}
//         onDeliveryUpdate={handleDeliveryUpdate}
//         onSelectDeliveryMethod={props.onSelectDeliveryMethod}
//       />
//     </>
//   ))

//   return(
//     availableMethods.length && shippingMethods
//   )
// }

// DeliveryMethodsSelect.propTypes = {
//   category: string,
//   selectedCarriers: array,
//   returnAddress: array,
//   handleCarrierSelect: func,
//   onDeliveryUpdate: func,
//   onShowAddAddress: func,
//   isAddressAdded: bool,
//   onShowEditAddress: func,
//   onItemWeightChange: func,
//   addressArray: array
// }
// export default DeliveryMethodsSelect
