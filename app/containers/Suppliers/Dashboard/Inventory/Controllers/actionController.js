module.exports = {
  getPostStatusId: action => {
    let postStatusId
    switch(action){
      case 'deactivate':
        postStatusId = '3efb5c11-d55c-40f5-9cb7-1b61e1da4738'
        break
      case 'activate':
        postStatusId = '3c50efb7-419a-4446-8cb8-c8f45e1bcb8c'
        break
      case 'archive':
        postStatusId = '89651c60-4e1d-477e-be4e-ed773e2e3176'
        break
      default:
        postStatusId = ''
        return postStatusId
    }
    return postStatusId
  }
}
