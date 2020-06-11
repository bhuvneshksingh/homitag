import { defineMessages } from 'react-intl'

export const scope = 'Suppliers.Dashboard.Main'

export default defineMessages({
  RETURNED_ITEM_NO_RECEIVED: {
    id: `${scope}.RETURNED_ITEM_NO_RECEIVED`,
    defaultMessage: 'Returned Item No received'
  },
  RETURNED_ITEM_DAMAGED: {
    id: `${scope}.RETURNED_ITEM_DAMAGED`,
    defaultMessage: 'Returned Item Damaged'
  },
  RETURNER_WRONG_ITEM: {
    id: `${scope}.RETURNER_WRONG_ITEM`,
    defaultMessage: 'Returned Wrong Item'
  },
  RETURNED_ITEM_MISSING_PARTS: {
    id: `${scope}.RETURNED_ITEM_MISSING_PARTS`,
    defaultMessage: 'Returned Item Missing Parts'
  },
  NO_ACTION_FROM_CUSTOMER: {
    id: `${scope}.NO_ACTION_FROM_CUSTOMER`,
    defaultMessage: 'No Action From Customer'
  },
  SENDING_CUSTOMER_REPLACEMENT: {
    id: `${scope}.SENDING_CUSTOMER_REPLACEMENT`,
    defaultMessage: 'Sending Customer Replacement'
  },
  ITEM_PREV_REFUNDED: {
    id: `${scope}.ITEM_PREV_REFUNDED`,
    defaultMessage: 'Item Previously Refunded'
  },
  UNABLE_SHIP: {
    id: `${scope}.UNABLE_SHIP`,
    defaultMessage: 'Unable Ship'
  },
  CANT_PICK_UP: {
    id: `${scope}.CANT_PICK_UP`,
    defaultMessage: "Cant't Pick Up"
  },
  BUYER_CANCELLED: {
    id: `${scope}.BUYER_CANCELLED`,
    defaultMessage: 'Buyer Cancelled'
  },
  ITEM_RETURNED: {
    id: `${scope}.ITEM_RETURNED`,
    defaultMessage: 'Item Returned'
  },
  REFUSED_DELIVERY: {
    id: `${scope}.REFUSED_DELIVERY`,
    defaultMessage: 'Refused Delivery'
  },
  ITEM_NO_RECEIVED: {
    id: `${scope}.ITEM_NO_RECEIVED`,
    defaultMessage: 'Item No Received'
  },
  ITEM_NO_AVAILABLE: {
    id: `${scope}.ITEM_NO_AVAILABLE`,
    defaultMessage: 'Item No Available'
  },
  PRICE_ERROR: {
    id: `${scope}.PRICE_ERROR`,
    defaultMessage: 'Price Error'
  },
  UNDELIVERABLE_SHIPPING_ADDRESS: {
    id: `${scope}.UNDELIVERABLE_SHIPPING_ADDRESS`,
    defaultMessage: 'Undeliverable Shipping Address'
  },
  ITEM_DAMAGED: {
    id: `${scope}.ITEM_DAMAGED`,
    defaultMessage: 'Item Damaged'
  },
  productActions: {
    id: `${scope}.productActions`,
    defaultMessage: 'Product Actions',
  },
  returnActions: {
    id: `${scope}.returnActions`,
    defaultMessage: 'Return Actions',
  }, 
  orderActions: {
    id: `${scope}.orderActions`,
    defaultMessage: 'Order Actions',
  }, 
  archiveActions: {
    id: `${scope}.archiveActions`,
    defaultMessage: 'Archive Actions',
  }, 
  cancellationActions: {
    id: `${scope}.cancellationActions`,
    defaultMessage: 'Cancellation Actions',
  }, 
  editLabel: {
    id: `${scope}.editLabel`,
    defaultMessage: 'Edit Label',
  },
  viewLabel: {
    id: `${scope}.viewLabel`,
    defaultMessage: 'View Label',
  },
  resendLabel: {
    id: `${scope}.resendLabel`,
    defaultMessage: 'Resend Label',
  },
  viewPackingSlip: {
    id: `${scope}.viewPackingSlip`,
    defaultMessage: 'View Packing Slip',
  },
  fullfillOrder: {
    id: `${scope}.fullfillOrder`,
    defaultMessage: 'Fullfill Order',
  },
  closeReturn: {
    id: `${scope}.closeReturn`,
    defaultMessage: 'Close ',
  },
  closeReturnPromptDesc: {
    id: `${scope}.closeReturnPromptDesc`,
    defaultMessage:
      `Please Note: If this return is active it will immediately be deactivated and the buyer will be notified`,
  },
  closeReturnConfirmationDesc: {
    id: `${scope}.closeReturnConfirmationDesc`,
    defaultMessage: 'This return has been closed and moved to your archived folder',
  },
  closeReturnFormLabelTitle: {
    id: `${scope}.closeReturnFormOptions`,
    defaultMessage: 'Please select a reason for closing the return'
  },
  closeReturnFormOptionsReason1: {
    id: `${scope}.closeReturnFormOptionsReason1`,
    defaultMessage: 'Reason 1'
  },
  closeReturnFormOptionsReason2: {
    id: `${scope}.closeReturnFormOptionsReason2`,
    defaultMessage: 'Reason 2'
  },
  closeReturnFormOptionsReason3: {
    id: `${scope}.closeReturnFormOptionsReason3`,
    defaultMessage: 'Reason 3'
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel',
  },
  cancelPromptDesc: {
    id: `${scope}.cancelPromptDesc`,
    defaultMessage:
      `Are you sure you want to cancel this order? The buyer will be notified and their funds
      will be released immediately.`,
  },
  cancelConfirmationDesc: {
    id: `${scope}.cancelConfirmationDesc`,
    defaultMessage: 'Your {type} is now canceled.',
  },
  archiveReturn: {
    id: `${scope}.archive`,
    defaultMessage: 'Archive Return',
  },
  archiveReturnPromptDesc: {
    id: `${scope}.archiveReturnPromptDesc`,
    defaultMessage:
      'Archiving this will remove it from your active inventory and place it in archives. Please confirm to continue.',
  },
  archiveReturnConfirmationDesc: {
    id: `${scope}.archiveReturnConfirmationDesc`,
    defaultMessage:
      'This {type} has been archived and removed from your active feed.',
  },
  archive: {
    id: `${scope}.archive`,
    defaultMessage: 'Archive',
  },
  archivePromptDesc: {
    id: `${scope}.archivePromptDesc`,
    defaultMessage:
      'Archiving this will remove it from your active inventory and place it in archives. Please confirm to continue.',
  },
  archiveConfirmationDesc: {
    id: `${scope}.archiveConfirmationDesc`,
    defaultMessage:
      'This {type} has been archived and removed from your active feed.',
  },
  dearchive: {
    id: `${scope}.dearchive`,
    defaultMessage: 'Dearchivate',
  },
  dearchivePromptDesc: {
    id: `${scope}.dearchivePromptDesc`,
    defaultMessage:
      'Archiving this will remove it from your archive and place it in your active inventory . Please confirm to continue.',
  },
  dearchiveConfirmationDesc: {
    id: `${scope}.dearchiveConfirmationDesc`,
    defaultMessage:
      'This {type} has been dearchiveted and add to your active feed.',
  },
  contactBuyer: {
    id: `${scope}.contactBuyer`,
    defaultMessage: 'Contact Buyer',
  },
  refundOrder: {
    id: `${scope}.refundOrder`,
    defaultMessage: 'Refund Order',
  },
  refundBuyer: {
    id: `${scope}.refundBuyer`,
    defaultMessage: 'Refund Buyer',
  },
  help: {
    id: `${scope}.help`,
    defaultMessage: 'Help',
  },
  deactivate: {
    id: `${scope}.deactivate`,
    defaultMessage: 'Deactivate',
  },
  deactivateListing: {
    id: `${scope}.deactivateListing`,
    defaultMessage: 'Deactivate Listing',
  },
  delete: {
    id: `${scope}.delete`,
    defaultMessage: 'Delete',
  },
  deleteListing: {
    id: `${scope}.deleteListing`,
    defaultMessage: 'Delete Listing',
  },
  bulkAction: {
    id: `${scope}.bulkAction`,
    defaultMessage: 'Bulk Action',
  },
  actionPromptTitle: {
    id: `${scope}.actionPromptTitle`,
    defaultMessage: '{action}  {type}?',
  },
  promptButtonTitle: {
    id: `${scope}.promptButtonTitle`,
    defaultMessage: 'Yes, {action} {type}',
  },
  confirmationTitle: {
    id: `${scope}.confirmationTitle`,
    defaultMessage: '{type} {action}!',
  },
  activate: {
    id: `${scope}.activate`,
    defaultMessage: 'Activate',
  },
  activatePromptDesc: {
    id: `${scope}.activatePromptDesc`,
    defaultMessage:
      'Activating this {type} will make it go live in the marketplace immediately. Do you want to proceed?',
  },
  activateConfirmationDesc: {
    id: `${scope}.activateConfirmationDesc`,
    defaultMessage: 'Your {type} is now live in the marketplace.',
  },
  editPhotos: {
    id: `${scope}.editPhotos`,
    defaultMessage: 'Edit Post Photos'
  },
  saveChanges: {
    id: `${scope}.editPhotos`,
    defaultMessage: 'Save Changes'
  },
  deleteRecord: {
    id: `${scope}.deleteRecord`,
    defaultMessage: 'Delete'
  },
  editPhotosDesc: {
    id: `${scope}.editPhotos`,
    defaultMessage:
      'Delete existing photos or upload new photos by clicking below. There\'s a max of X photos per listing.',
  },
  deactivatePromptDesc: {
    id: `${scope}.deactivatePromptDesc`,
    defaultMessage:
      'Deactivating these {type} will delist them from the marketplace immediately. You can always reactivate them later.',
  },
  deactivateConfirmationDesc: {
    id: `${scope}.deactivateConfirmationDesc`,
    defaultMessage: 'You can reactivate this {type} again if you wish later.',
  },
  deletePromptDesc: {
    id: `${scope}.deletePromptDesc`,
    defaultMessage:
      'Deleting this listing will remove it permanently from your inventory. Please confirm below.',
  },
  deleteConfirmationDesc: {
    id: `${scope}.deleteConfirmationDesc`,
    defaultMessage: 'This {type} has been deleted from your inventory.',
  },
  orderStatus_created: {
    id: `${scope}.orderStatus_created`,
    defaultMessage: 'Created',
  },
  orderStatus_inTransit: {
    id: `${scope}.orderStatus_inTransit`,
    defaultMessage: 'In Transit',
  },
  orderStatus_accepted: {
    id: `${scope}.orderStatus_accepted`,
    defaultMessage: 'Accepted',
  },
  orderStatus_buyAccepted: {
    id: `${scope}.orderStatus_buyAccepted`,
    defaultMessage: 'Accepted',
  },
  orderStatus_declined: {
    id: `${scope}.orderStatus_declined`,
    defaultMessage: 'Declined',
  },
  orderStatus_counteredseller: {
    id: `${scope}.orderStatus_counteredseller`,
    defaultMessage: 'Countered Seller',
  },
  orderStatus_counteredbuyer: {
    id: `${scope}.orderStatus_counteredbuyer`,
    defaultMessage: 'Countered Buyer',
  },
  orderStatus_pendingexchange: {
    id: `${scope}.orderStatus_pendingexchange`,
    defaultMessage: 'Pending Exchange',
  },
  orderStatus_pendingbuyerconfirmation: {
    id: `${scope}.orderStatus_pendingbuyerconfirmation`,
    defaultMessage: 'Requested',
  },
  orderStatus_transactioncomplete: {
    id: `${scope}.orderStatus_transactioncomplete`,
    defaultMessage: 'Transaction Complete',
  },
  orderStatus_transactioncancelled: {
    id: `${scope}.orderStatus_transactioncancelled`,
    defaultMessage: 'Transaction Cancelled',
  },
  orderStatus_delivered: {
    id: `${scope}.orderStatus_delivered`,
    defaultMessage: 'Delivered',
  },
  orderStatus_processing: {
    id: `${scope}.orderStatus_processing`,
    defaultMessage: 'Proccesing',
  },
  cancellationStatus_cancelled: {
    id: `${scope}.cancellationStatus_cancelled`,
    defaultMessage: 'Cancelled',
  },
  cancellationStatus_requested: {
    id: `${scope}.cancellationStatus_requested`,
    defaultMessage: 'Requested',
  },
  cancellationStatus_denied: {
    id: `${scope}.cancellationStatus_denied`,
    defaultMessage: 'Denied',
  },
  returnStatus_requested: {
    id: `${scope}.returnStatus_requested`,
    defaultMessage: 'Requested',
  },
  returnStatus_accepted: {
    id: `${scope}.returnStatus_accepted`,
    defaultMessage: 'Accepted',
  },
  returnStatus_refundnoreturnedrequested: {
    id: `${scope}.returnStatus_refundnoreturnedrequested`,
    defaultMessage: 'Refund No Returned Requested',
  },
  returnStatus_refundreturnedrequested: {
    id: `${scope}.returnStatus_refundreturnedrequested`,
    defaultMessage: 'Refund Returned Requested',
  },
  returnStatus_refundednoreturned: {
    id: `${scope}.returnStatus_refundednoreturned`,
    defaultMessage: 'Refunded No Returned',
  },
  returnStatus_refundedreturned: {
    id: `${scope}.returnStatus_refundedreturned`,
    defaultMessage: 'Refunded Returned',
  },
  returnStatus_cancelled: {
    id: `${scope}.returnStatus_cancelled`,
    defaultMessage: 'Cancelled',
  },
  returnStatus_declined: {
    id: `${scope}.returnStatus_declined`,
    defaultMessage: 'Declined',
  },
  returnStatus_closed: {
    id: `${scope}.returnStatus_closed`,
    defaultMessage: 'Closed',
  },
  returnStatus_returned: {
    id: `${scope}.returnStatus_returned`,
    defaultMessage: 'Delivered',
  },
  returnStatus_labelShared: {
    id: `${scope}.returnStatus_labelShared`,
    defaultMessage: 'Label Shared',
  },
  returnStatus_inTransit: {
    id: `${scope}.returnStatus_inTransit`,
    defaultMessage: 'In Transit',
  }

  

  
})