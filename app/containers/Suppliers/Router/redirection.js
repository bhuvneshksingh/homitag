import Routes from './Routes.json'

export function canAccessDashboard(userObject) {
  const mainFields = ['phonenumber']
  const userBusinessFields = ['businessName', 'acceptSellerAgreement']
  const businessInfoFields = [
    'businessStructure',
    'sellerType',
    'taxId',
    'annualOnlineRevenue',
  ]
  if (
    !userObject.UserBusiness ||
    mainFields.some(f => userObject[f] === '') ||
    userBusinessFields.some(
      f => userObject.UserBusiness[f] === '' || !userObject.UserBusiness[f]
    ) ||
    businessInfoFields.some(f => userObject.UserBusiness.businessInfo[f] === '')
  )
    return false
  return true
}

export function loginRedirection(userObject) {
  if (canAccessDashboard(userObject)) return Routes.Suppliers + Routes.Dashboard
  // if (!canAccessDashboard(userObject)) return Routes.Suppliers
  // if (Object.keys(userObject).length === 0 && userObject.constructor === Object) { return Routes.Suppliers  + Routes.Logout }
  return Routes.Suppliers + Routes.Onboarding + Routes.AboutYou
}