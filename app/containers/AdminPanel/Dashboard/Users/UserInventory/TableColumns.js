export const TableColumns = [
  {
    id: 'username',
    header: 'User Name',
    accessor: user => `${user.user.firstName  } ${  user.user.lastName}`,
    show: true,
    width: 180,
    sortable: true,
    sortAsc: 'nameAsc',
    sortDesc: 'nameDesc',
  },
  {
    id: 'message_status',
    header: 'Message Status',
    accessor: user => user.status,
    show: true,
    width: 200,
    sortable: true,
    sortAsc: 'statusAsc',
    sortDesc: 'statusDesc',
  },
  {
    id: 'sent',
    header: 'Sent',
    accessor: user => user.createdAt,
    show: true,
    width: 180,
    field: 'date',
    sortable: true,
    sortAsc: 'createdAtAsc',
    sortDesc: 'createdAtDesc',
  },
  {
    id: 'subject_line',
    header: 'Subject Line',
    accessor: user => user.subject,
    show: true,
    width: 200,
    sortable: true,
    sortAsc: 'subjectAsc',
    sortDesc: 'subjectDesc',
  },
  {
    id: 'order_id',
    header: 'Order ID',
    accessor: user => user.orderId,
    show: true,
    width: 200,
    sortable: true,
    sortAsc: 'orderAsc',
    sortDesc: 'orderDesc',
  },
  {
    id: 'assigned_to',
    header: 'Assigned to',
    accessor: user => `${user.agent.firstName  } ${  user.agent.lastName}`,
    show: true,
    width: 140,
    sortable: true,
    sortAsc: 'assigned_toAsc',
    sortDesc: 'assigned_toDesc',
  },
  {
    id: 'is_buyer',
    header: 'Is Buyer',
    accessor: user => user.kindsUser && user.kindsUser.buyer ? 'YES' : 'NO',
    show: false,
    width: 140
  },
  {
    id: 'is_seller',
    header: 'Is Seller',
    accessor: user => user.kindsUser && user.kindsUser.seller ? 'YES' : 'NO',
    show: false,
    width: 140
  },
  {
    id: 'is_supplier',
    header: 'Is Supplier',
    accessor: user => user.kindsUser && user.kindsUser.supplier ? 'YES' : 'NO',
    show: false,
    width: 140
  },
  {
    id: 'is_reseller',
    header: 'Is Reseller',
    accessor: user => user.kindsUser && user.kindsUser.reseller ? 'YES' : 'NO',
    show: false,
    width: 140
  },
  {
    id: 'order_status',
    header: 'Order Status',
    accessor: user => user.order_status,
    show: false,
    width: 140
  },

]
export default TableColumns
