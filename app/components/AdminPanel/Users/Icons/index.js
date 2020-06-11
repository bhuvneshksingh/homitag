import React from 'react'
import PropTypes from 'prop-types'

import { ICONS } from './icons'

const UserIcon = ({ icon, color, strokeColor, width, height, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || ICONS[icon].width}
    height={height || ICONS[icon].height}
    viewBox={ICONS[icon].viewBox}
    fill="none"
    {...props}
  >
    {ICONS[icon].paths.map(p => (
      <path key={p} d={p} fill={color} stroke={strokeColor} />
    ))}
  </svg>
)

UserIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  strokeColor: PropTypes.string,
}

UserIcon.defaultProps = {
  color: '#00BDAA',
}

export default UserIcon
