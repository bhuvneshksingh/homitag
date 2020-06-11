// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from "prop-types";

const Steps =({ components, index }) => components[index]

Steps.propTypes = {
  components: PropTypes.arrayOf(PropTypes.element),
  index: PropTypes.number.isRequired
}

export default Steps;
