module.exports = {
  userKind: filters => {
    let userKind
    switch(filters.userKind){
      case 'buyer':
        userKind = 'buyer'
        break
      case 'seller':
        userKind = 'seller'
        break
      case 'supplier':
        userKind = 'supplier'
        break
      case 'reseller':
        userKind = 'reseller'
        break
      default:
        return userKind
    }
    return userKind
  }

}
