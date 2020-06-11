export const TableColumns = [
  {
    id: 'profilepictureurl',
    header: 'Prof Pic',
    accessor: user => user.profilepictureurl,
    show: true,
    field: 'img',
    width: 90
  },
  {
    id: 'name',
    header: 'User Name',
    accessor: user => `${user.firstName} ${user.lastName}`,
    show: true,
    width: 180,
    sortable: true,
    sortAsc: 'nameAsc',
    sortDesc: 'nameDesc'
  },
  {
    id: 'id',
    header: 'User ID',
    accessor: user => `${user.id.slice(0, 4)}...${  user.id.slice(-4)}`,
    show: true,
    width: 140
  },
  {
    id: 'rating',
    header: 'Rating',
    accessor: user => Number(user.rating),
    show: true,
    field: 'star',
    width: 140
  },
  {
    id: 'compliance',
    header: 'Compliance',
    accessor: user => user.compliance ? user.compliance : '',
    show: false,
    width: 140
  },
  {
    id: 'date_joined',
    header: 'Date Joined',
    accessor: user => user.createdAt,
    show: true,
    field: 'date',
    width: 140,
    sortable: true,
    sortAsc: 'dateAsc',
    sortDesc: 'dateDesc'
  },
  {
    id: 'buyer',
    header: 'Buyer',
    accessor: user => user.kindsUser && user.kindsUser.buyer ? 'YES' : 'NO',
    show: true,
    width: 72
  },
  {
    id: 'seller',
    header: 'Seller',
    accessor: user => user.kindsUser && user.kindsUser.seller ? 'YES' : 'NO',
    show: true,
    width: 72
  },
  {
    id: 'supplier',
    header: 'Supplier',
    accessor: user => user.kindsUser && user.kindsUser.supplier ? 'YES' : 'NO',
    show: true,
    width: 100
  },
  {
    id: 'reseller',
    header: 'Reseller',
    accessor: user => user.kindsUser && user.kindsUser.reseller ? 'YES' : 'NO',
    show: true,
    width: 100
  },
  {
    id: 'user_status',
    header: 'User Status',
    accessor: user => user.status,
    show: false,
    width: 140
  },
  {
    id: 'followers',
    header: '# Followers',
    accessor: user => user.followers,
    show: false,
    width: 140
  },
  {
    id: 'following',
    header: '# Following',
    accessor: user => user.following,
    show: false,
    width: 140
  },
  {
    id: 'items_bought',
    header: '# Items Bought',
    accessor: user => user.itemsBought,
    show: false,
    width: 160
  },
  {
    id: 'items_saved',
    header: '# Items Saved',
    accessor: user => user.itemsSaved,
    show: false,
    width: 160
  },
  {
    id: 'times_reported',
    header: '# Times Reported',
    accessor: user => user.timesReported,
    show: false,
    width: 160
  },
  {
    id: 'times_blocked',
    header: '# Times Blocked',
    accessor: user => user.timesBlocked,
    show: false,
    width: 160
  },
  {
    id: 'last_login',
    header: 'Last Login',
    accessor: user => user.lastLogin,
    show: false,
    width: 160
  },
  {
    id: 'more_button',
    header: '',
    show: true,
    field: 'button',
    width: 50,
  },
]
export default TableColumns;
