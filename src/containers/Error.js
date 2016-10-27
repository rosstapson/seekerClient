// components/Dashboard.js

import React, { Component, PropTypes } from 'react'

export default class Error extends Component {

  render() {
    const { errorMessage } = this.props

    return (
      <div>
        <h2> Error </h2>
        {errorMessage}
      </div>
    )
  }

  
}

Error.propTypes = {
  
  errorMessage: PropTypes.string
}
