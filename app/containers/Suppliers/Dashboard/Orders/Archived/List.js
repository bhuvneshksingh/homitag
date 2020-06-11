import React from 'react'
import {  object, bool, string, func } from 'prop-types'
import { injectIntl } from 'react-intl'
import ListItem from './ListItem'
import ListHeader from './ListHeader'


const List = ({data, shipped, isArchived, type, onClose }) => (
    <>
      <ListHeader />
      {data.list.map(item => (
        <ListItem
          shipped={shipped}
          isArchived={isArchived}
          item={item}
          key={item.id}
          type={type}
          onClose={() => onClose()}
        />
      ))}
     
    </>
)

List.propTypes = {
  data: object,
  shipped: bool,
  isArchived: bool,
  type: string,
  onClose: func
}

List.defaultProps = {
  data: {
    
  }
}

export default injectIntl(List)
