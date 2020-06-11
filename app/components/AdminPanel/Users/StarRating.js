import React from 'react'
import { func, number } from 'prop-types'
import Box from '@material-ui/core/Box';

import Star from './Star'

const StarRating = ({ count, onClick }) => {
  const onTest = (i) => {
    if(count === i) {
      onClick(i - 1)
    } else {
      onClick(i)
    }
  }
  return (
    <Box display="flex">
      {[...Array(5).keys()].map(i => (
        <Star key={i} isFull={i < count} onClick={() => onTest(i + 1)} />
      ))}
    </Box>
  );
}

StarRating.propTypes = {
  count: number,
  onClick: func,
}

StarRating.defaultProps = {}

export default StarRating
