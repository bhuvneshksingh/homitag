import { defineMessages } from 'react-intl'

export const scope = 'Suppliers.Dashboard.Main'

export default defineMessages({
  productActions: {
    id: `${scope}.productActions`,
    defaultMessage: 'Product Actions',
  },
  boost: {
    id: `${scope}.boost`,
    defaultMessage: 'Boost',
  },
  boostListing: {
    id: `${scope}.boostListing`,
    defaultMessage: 'Choose a Boost Package',
  },
  boostPromptDesc: {
    id: `${scope}.boostPromptDesc`,
    defaultMessage:
      `Boosting your listing will help it sell faster by getting it in front of more potential buyers. The more you boost the faster it'll sell.`,
  },
  archive: {
    id: `${scope}.archive`,
    defaultMessage: 'Archive',
  },
  archiveListing: {
    id: `${scope}.archiveListing`,
    defaultMessage: 'Archive Listing',
  },
  archiveListings: {
    id: `${scope}.archiveListings`,
    defaultMessage: 'Archive Listings',
  },
  activateListing: {
    id: `${scope}.activateListing`,
    defaultMessage: 'Activate Listing',
  },
  activateListings: {
    id: `${scope}.activateListings`,
    defaultMessage: 'Activate Listings',
  },
  unarchive: {
    id: `${scope}.unarchive`,
    defaultMessage: 'Reactivate',
  },
  unarchiveListing: {
    id: `${scope}.unarchiveListing`,
    defaultMessage: 'Reactivate Listing',
  },
  unarchiveListings: {
    id: `${scope}.unarchiveListings`,
    defaultMessage: 'Reactivate Listings',
  },
  deactivate: {
    id: `${scope}.deactivate`,
    defaultMessage: 'Deactivate',
  },
  deactivateListing: {
    id: `${scope}.deactivateListing`,
    defaultMessage: 'Deactivate Listing',
  },
  deactivateListings: {
    id: `${scope}.deactivateListings`,
    defaultMessage: 'Deactivate Listings',
  },
  delete: {
    id: `${scope}.delete`,
    defaultMessage: 'Delete',
  },
  deleteListing: {
    id: `${scope}.deleteListing`,
    defaultMessage: 'Delete Listing',
  },
  deleteListings: {
    id: `${scope}.deleteListings`,
    defaultMessage: 'Delete Listings',
  },
  help: {
    id: `${scope}.help`,
    defaultMessage: 'Help',
    destination: `/suppliers/help`
  },
  bulkAction: {
    id: `${scope}.bulkAction`,
    defaultMessage: 'Bulk Action',
  },
  actionPromptTitle: {
    id: `${scope}.actionPromptTitle`,
    defaultMessage: '{action} this {type}?',
  },
  promptButtonTitle: {
    id: `${scope}.promptButtonTitle`,
    defaultMessage: '{action} {type}',
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
  archivePromptDesc: {
    id: `${scope}.archivePromptDesc`,
    defaultMessage:
      'Archiving this {type} will remove it from your active inventory and place it in archives. Please confirm to continue.',
  },
  archiveConfirmationDesc: {
    id: `${scope}.archiveConfirmationDesc`,
    defaultMessage:
      'This {type} has been archived and removed from your active feed.',
  },
  unarchivePromptDesc: {
    id: `${scope}.unarchivePromptDesc`,
    defaultMessage:
      'Reactivating this {type} will remove it from your active inventory and place it in archives. Please confirm to continue.',
  },
  unarchiveConfirmationDesc: {
    id: `${scope}.unarchiveConfirmationDesc`,
    defaultMessage:
      'This {type} has been reactivated and removed from your inactive feed.',
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
})
