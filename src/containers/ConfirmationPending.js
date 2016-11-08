// components/ConfirmationPending.js

import React, { Component, PropTypes } from 'react'

export default class ConfirmationPending extends Component {

  render() {
    const { errorMessage } = this.props

    return (
      <div>
        <h2> Confirmation Pending </h2>
        Thank you for signing up with SeekerDNA! Please note that a confirmation email has been sent to the address you provided.
        {errorMessage}
      </div>
    )
  }

  
}

ConfirmationPending.propTypes = {
  
  errorMessage: PropTypes.string
}
