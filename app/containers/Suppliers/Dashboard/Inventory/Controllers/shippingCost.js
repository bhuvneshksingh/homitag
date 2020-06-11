const getOptionSelected = itm => itm.selected

module.exports = {
  getShippingCost: item => {
    let cost = 0
    const deliveryObj = item.DeliveryMethods.filter(
      itm => itm.code !== 'pickup'
    )
    const selectedDeliveryMethod = deliveryObj[0] || {}
    const deliveryMethodPerPost =
      selectedDeliveryMethod.DeliveryMethodPerPost || {}
    const customProperties = deliveryMethodPerPost.customProperties || {}

    const isFreeShipping =
      customProperties.freeOption && customProperties.freeOption.valueSelected

    if (isFreeShipping) {
      return 0
    }

    const isHomitagShipping = selectedDeliveryMethod.code === 'homitagshipping'
    const isShipIndependently =
      selectedDeliveryMethod.code === 'shipindependently'

    if (isHomitagShipping && customProperties) {
      const selectedOption =
        customProperties.optionsAvailable &&
        customProperties.optionsAvailable.find(getOptionSelected)

      if (selectedOption) {
        const selectedProviders = selectedOption.providers.filter(
          getOptionSelected
        )
        if (selectedProviders.length > 0) {
          cost = Math.min(...selectedProviders.map(itm => Number(itm.cost)))
        }
      }
    }
    if (isShipIndependently && customProperties) {
      return (customProperties.shippingCost &&  Number(customProperties.shippingCost)) || 0
    }
    return cost
  },
}
