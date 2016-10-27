// components/Dashboard.js

import React, { Component, PropTypes } from 'react'

export default class Dashboard extends Component {

  render() {
    const { errorMessage } = this.props

    return (
      <div>
        <h2> Dashboard </h2>
        {errorMessage}
      </div>
    )
  }

  
}

Dashboard.propTypes = {
  
  errorMessage: PropTypes.string
}
