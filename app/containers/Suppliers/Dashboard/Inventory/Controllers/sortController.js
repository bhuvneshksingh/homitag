module.exports = {
  sort: sortAndFilter => {
    let sort
    switch (sortAndFilter.sort) {
      case 'inventory_low_to_high':
        sort = 'lowestInventory'
        break
      case 'inventory_high_to_low':
        sort = 'highestInventory'
        break
      case 'product_name_a_z':
        sort = 'nameAsc'
        break
      case 'product_name_z_a':
        sort = 'nameDesc'
        break
      case 'price_low_to_high':
        sort = 'lowest'
        break
      case 'price_high_to_low':
        sort = 'highest'
        break
      case 'last_update_desc':
        sort = 'newest'
        break
      case 'last_update_asc':
        sort = 'oldest'
        break
      default:
        sort = ''
        return sort
    }
    return sort
  },
  isBoosted: sortAndFilter => {
    let isBoosted
    switch (sortAndFilter.boost) {
      case 'boosted':
        isBoosted = true
        break
      case 'not_boosted':
        isBoosted = false
        break
      default:
        isBoosted = ''
        return isBoosted
    }
    return isBoosted
  },
}
